import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
} from '../errors/AppError';
import { closetRepository } from '../repositories/closet.repository';
import { AppUserId } from '../types/appUser.types';
import {
  Closet,
  ClosetId,
  CreateClosetDTO,
  CreateClosetRepositoryData,
  UpdateClosetDTO,
  UpdateClosetRepositoryData,
} from '../types/closet.types';

const getAll = async (): Promise<Closet[]> => {
  const closets = await closetRepository.findAll();
  return closets;
};

const getById = async (id: ClosetId): Promise<Closet> => {
  const closet = await closetRepository.findById(id);
  if (!closet) {
    throw new NotFoundError(`closet`, id);
  }
  return closet;
};

const create = async (
  data: CreateClosetDTO,
  authenticatedUserId: AppUserId
): Promise<Closet> => {
  // Check if the closet name is already used for this user
  const existingClosetByName = await closetRepository.findByNameAndUserId(
    data.name,
    authenticatedUserId
  );

  if (existingClosetByName) {
    throw new ConflictError(`Name already used: ${data.name}`);
  }

  // Build repository payload
  const createPayload: CreateClosetRepositoryData = {
    name: data.name,
    user_id: authenticatedUserId,
  };

  if (data.description !== undefined) {
    createPayload.description = data.description;
  }

  try {
    const createdCloset = await closetRepository.create(createPayload);

    return createdCloset;
  } catch (error: unknown) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === '23505'
    ) {
      throw new ConflictError(
        `You already have a closet named "${data.name}".`
      );
    }

    throw error;
  }
};

const updateById = async (
  id: ClosetId,
  data: UpdateClosetDTO,
  authenticatedUserId: AppUserId
): Promise<Closet> => {
  // 1. Check if closet exists
  const existingCloset = await closetRepository.findById(id);

  if (!existingCloset) {
    throw new NotFoundError('closet', id);
  }

  // 2. Check ownership (IMPORTANT pour le TODO auth)
  if (existingCloset.userId !== authenticatedUserId) {
    throw new ForbiddenError('You are not allowed to update this closet');
  }

  // 3. Build update payload
  const updatePayload: UpdateClosetRepositoryData = {};

  if (data.name !== undefined) {
    updatePayload.name = data.name;
  }

  if (data.description !== undefined) {
    updatePayload.description = data.description;
  }

  // 4. Update in DB
  const updatedCloset = await closetRepository.updateById(id, updatePayload);

  if (!updatedCloset) {
    throw new NotFoundError('closet', id);
  }

  return updatedCloset;
};

const deleteById = async (
  id: ClosetId,
  authenticatedUserId: AppUserId
): Promise<void> => {
  // Check if the closet exists
  const existingCloset = await closetRepository.findById(id);

  if (!existingCloset) {
    throw new NotFoundError('closet', id);
  }

  // Check ownership
  if (existingCloset.userId !== authenticatedUserId) {
    throw new ForbiddenError('You are not allowed to delete this closet');
  }

  // Delete the closet
  const hasDeletedCloset = await closetRepository.deleteById(id);

  if (!hasDeletedCloset) {
    throw new NotFoundError('closet', id);
  }
};

const getByUserId = async (userId: string): Promise<Closet[]> => {
  return await closetRepository.findByUserId(userId);
};

export const closetService = {
  getAll,
  getById,
  create,
  deleteById,
  getByUserId,
  updateById,
};
