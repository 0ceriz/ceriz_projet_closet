import bcrypt from 'bcrypt';

import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
} from '../errors/AppError';

import { appUserRepository } from '../repositories/appUser.repository';

import {
  AppUserId,
  AppUserPublic,
  CreateAppUserDTO,
  UpdateAppUserDTO,
  UpdateAppUserRepositoryData,
} from '../types/appUser.types';

import { mapAppUserDbToPublic } from '../mappers/appUser.mapper';
import { hashPassword } from '../utils/hash';

const getAll = async (): Promise<AppUserPublic[]> => {
  const users = await appUserRepository.findAll();

  return users.map((user) => mapAppUserDbToPublic(user));
};

const getById = async (id: AppUserId): Promise<AppUserPublic> => {
  const user = await appUserRepository.findById(id);

  if (!user) {
    throw new NotFoundError('app_user', id);
  }

  return mapAppUserDbToPublic(user);
};

const create = async (data: CreateAppUserDTO): Promise<AppUserPublic> => {
  // Vérifier si l'adresse email existe déjà
  const existingUserByEmail = await appUserRepository.findByEmail(data.email);

  if (existingUserByEmail) {
    throw new ConflictError(`Email already used: ${data.email}`);
  }

  // Vérifier si le pseudo existe déjà
  const existingUserByPseudo = await appUserRepository.findByPseudo(
    data.pseudo
  );

  if (existingUserByPseudo) {
    throw new ConflictError(`Pseudo already used: ${data.pseudo}`);
  }

  // Hasher le mot de passe
  const passwordHash = await hashPassword(data.password);

  // Créer l'utilisateur
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
  const existingUser = await appUserRepository.findById(id);

  if (!existingUser) {
    throw new NotFoundError('app_user', id);
  }

  // Vérifier que l'utilisateur modifie son propre compte
  if (id !== authenticatedUserId) {
    throw new ForbiddenError('You are not allowed to update this user');
  }

  // Vérifier l'unicité de l'adresse email
  if (data.email && data.email !== existingUser.email) {
    const existingUserByEmail = await appUserRepository.findByEmail(data.email);

    if (existingUserByEmail && existingUserByEmail.id !== id) {
      throw new ConflictError(`Email already used: ${data.email}`);
    }
  }

  // Vérifier l'unicité du pseudo
  if (data.pseudo && data.pseudo !== existingUser.pseudo) {
    const existingUserByPseudo = await appUserRepository.findByPseudo(
      data.pseudo
    );

    if (existingUserByPseudo && existingUserByPseudo.id !== id) {
      throw new ConflictError(`Pseudo already used: ${data.pseudo}`);
    }
  }

  // Préparer les données à mettre à jour
  const updatePayload: UpdateAppUserRepositoryData = {};

  if (data.pseudo !== undefined) {
    updatePayload.pseudo = data.pseudo;
  }

  if (data.email !== undefined) {
    updatePayload.email = data.email;
  }

  if (data.pictureUrl !== undefined) {
    updatePayload.pictureUrl = data.pictureUrl;
  }

  // Le mot de passe ne doit être traité que par son endpoint dédié
  // PATCH /users/me/password

  try {
    const updatedUser = await appUserRepository.updateById(id, updatePayload);

    if (!updatedUser) {
      throw new NotFoundError('app_user', id);
    }

    return mapAppUserDbToPublic(updatedUser);
  } catch (error: unknown) {
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

// Supprimer un compte utilisateur
const deleteById = async (
  id: AppUserId,
  authenticatedUserId: AppUserId
): Promise<void> => {
  // Vérifier que l'utilisateur supprime uniquement son propre compte
  if (id !== authenticatedUserId) {
    throw new ForbiddenError('You are not allowed to delete this user');
  }

  // Vérifier que le compte existe
  const existingUser = await appUserRepository.findById(id);

  if (!existingUser) {
    throw new NotFoundError('app_user', id);
  }

  // Supprimer le compte
  const deleted = await appUserRepository.deleteById(id);

  if (!deleted) {
    throw new NotFoundError('app_user', id);
  }
};

// Modifier le mot de passe
const changePassword = async (
  userId: AppUserId,
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  const user = await appUserRepository.findById(userId);

  if (!user) {
    throw new NotFoundError('User not found');
  }

  const isPasswordValid = await bcrypt.compare(
    currentPassword,
    user.password_hash
  );

  if (!isPasswordValid) {
    throw new UnauthorizedError('Current password is incorrect');
  }

  const passwordHash = await hashPassword(newPassword);

  await appUserRepository.updateById(userId, {
    passwordHash,
  });
};

export const appUserService = {
  changePassword,
  getAll,
  getById,
  create,
  deleteById,
  updateById,
};
