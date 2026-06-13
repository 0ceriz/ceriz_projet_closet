import { ConflictError, NotFoundError } from '../errors/AppError';
import { appUserRepository } from '../repositories/appUser.repository';
import {
  AppUserDb,
  AppUserId,
  AppUserPublic,
  CreateAppUserDTO,
} from '../types/appUser.types';

const mapAppUserDbToPublic = (user: AppUserDb): AppUserPublic => {
  return {
    id: user.id,
    pseudo: user.pseudo,
    email: user.email,
    pictureUrl: user.picture_url,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
  };
};

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
  const passwordHash = data.password;

  // Create the user
  const createdUser = await appUserRepository.create({
    pseudo: data.pseudo,
    email: data.email,
    passwordHash,
    pictureUrl: data.pictureUrl ?? null,
  });

  return mapAppUserDbToPublic(createdUser);
};

const deleteById = async (id: AppUserId): Promise<void> => {
  const hasDeletedUser = await appUserRepository.deleteById(id);
  if (!hasDeletedUser) throw new NotFoundError('app_user', id);
  return;
};

export const appUserService = {
  getAll,
  getById,
  create,
  deleteById,
};
