import { ConflictError, NotFoundError } from '../errors/AppError';
import { closetRepository } from '../repositories/closet.repository';
import { Closet, ClosetId, CreateClosetDTO } from '../types/closet.types';

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

const create = async (data: CreateClosetDTO): Promise<Closet> => {
  const existingClosetByName = await closetRepository.findByName(data.name);

  if (existingClosetByName) {
    throw new ConflictError(`Name already used: ${data.name}`);
  }

  const createdCloset = await closetRepository.create({
    user_id: data.user_id,
    name: data.name,
    description: data.description ?? null,
  });

  return createdCloset;
};

const deleteById = async (id: ClosetId): Promise<void> => {
  const hasDeletedCloset = await closetRepository.deleteById(id);
  if (!hasDeletedCloset) throw new NotFoundError('closet', id);
  return;
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
};
