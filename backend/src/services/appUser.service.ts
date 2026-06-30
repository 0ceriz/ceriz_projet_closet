import { ConflictError, NotFoundError } from '../errors/AppError';
import bcrypt from 'bcrypt';
import { appUserRepository } from '../repositories/appUser.repository';
import {
  AppUserId,
  AppUserPublic,
  CreateAppUserDTO,
} from '../types/appUser.types';
import { mapAppUserDbToPublic } from '../mappers/appUser.mapper';
import {
  UpdateAppUserDTO,
  UpdateAppUserRepositoryData,
} from '../types/appUser.types';
import { ForbiddenError } from '../errors/AppError';
import { hashPassword } from '../utils/hash';

const getAll = async (): Promise<AppUserPublic[]> => {
  const users = await appUserRepository.findAll();
  return users.map((user) => mapAppUserDbToPublic(user));
};

const getById = async (id: AppUserId): Promise<AppUserPublic> => {
  const user = await appUserRepository.findById(id);
  if (!user) {
    throw new NotFoundError(`app_user`, id);
  }
  return mapAppUserDbToPublic(user);
};

const create = async (data: CreateAppUserDTO): Promise<AppUserPublic> => {
  // Check if the user already exists
  const existingUserByEmail = await appUserRepository.findByEmail(data.email);
  if (existingUserByEmail)
    throw new ConflictError(`Email already used: ${data.email}`);
  const existingUserByPseudo = await appUserRepository.findByPseudo(
    data.pseudo
  );
  if (existingUserByPseudo)
    throw new ConflictError(`Pseudo already used: ${data.pseudo}`);

  // TODO: Hash the password
  const passwordHash = await bcrypt.hash(data.password, 10);

  // Create the user
  const createdUser = await appUserRepository.create({
    pseudo: data.pseudo,
    email: data.email,
    passwordHash,
    pictureUrl: data.pictureUrl ?? null,
  });

  return mapAppUserDbToPublic(createdUser);
};

const updateById = async (
  id: AppUserId,
  data: UpdateAppUserDTO,
  authenticatedUserId: AppUserId
): Promise<AppUserPublic> => {
  // Check if the user exists
  const existingUser = await appUserRepository.findById(id);
  if (!existingUser) {
    throw new NotFoundError('app_user', id);
  }

  // Check that the authenticated user owns this account
  if (id !== authenticatedUserId) {
    throw new ForbiddenError('You are not allowed to update this user');
  }

  // Check if the email is already used by another user
  if (data.email && data.email !== existingUser.email) {
    const existingUserByEmail = await appUserRepository.findByEmail(data.email);

    if (existingUserByEmail && existingUserByEmail.id !== id) {
      throw new ConflictError(`Email already used: ${data.email}`);
    }
  }

  // Check if the pseudo is already used by another user
  if (data.pseudo && data.pseudo !== existingUser.pseudo) {
    const existingUserByPseudo = await appUserRepository.findByPseudo(
      data.pseudo
    );

    if (existingUserByPseudo && existingUserByPseudo.id !== id) {
      throw new ConflictError(`Pseudo already used: ${data.pseudo}`);
    }
  }

  // Hash the password if provided
  let passwordHash: string | undefined;

  if (data.password !== undefined) {
    passwordHash = await hashPassword(data.password);
  }

  // Build the update payload
  const updatePayload: UpdateAppUserRepositoryData = {};

  if (data.pseudo !== undefined) {
    updatePayload.pseudo = data.pseudo;
  }

  if (data.email !== undefined) {
    updatePayload.email = data.email;
  }

  if (passwordHash !== undefined) {
    updatePayload.passwordHash = passwordHash;
  }

  if (data.pictureUrl !== undefined) {
    updatePayload.pictureUrl = data.pictureUrl;
  }

  try {
    // Update the user
    const updatedUser = await appUserRepository.updateById(id, updatePayload);

    if (!updatedUser) {
      throw new NotFoundError('app_user', id);
    }

    return mapAppUserDbToPublic(updatedUser);
  } catch (error: unknown) {
    // PostgreSQL UNIQUE constraint violation (error code 23505).
    // This can happen if two concurrent requests update the same
    // email or pseudo at the same time.
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === '23505'
    ) {
      throw new ConflictError('Email or pseudo already used');
    }

    throw error;
  }
};

const deleteById = async (
  id: AppUserId,
  authenticatedUserId: AppUserId
): Promise<void> => {
  if (id !== authenticatedUserId) {
    throw new ForbiddenError('You are not allowed to delete this user');
  }

  const deleted = await appUserRepository.deleteById(id);

  if (!deleted) {
    throw new NotFoundError('app_user', id);
  }
};

export const appUserService = {
  getAll,
  getById,
  create,
  deleteById,
  updateById,
};
