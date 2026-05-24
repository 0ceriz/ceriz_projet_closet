import { appUserRepository } from '../repositories/appUser.repository';
import { AppUserPublic } from '../types/appUser.types';

const getAll = async (): Promise<AppUserPublic[]> => {
  const users = await appUserRepository.findAll();
  return users.map((user) => ({
    id: user.id,
    pseudo: user.pseudo,
    email: user.email,
    pictureUrl: user.picture_url,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
  }));
};

export const appUserService = {
  getAll,
};
