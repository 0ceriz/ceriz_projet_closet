import { AppUserDb, AppUserPublic } from '../types/appUser.types';

export const mapAppUserDbToPublic = (user: AppUserDb): AppUserPublic => {
  return {
    id: user.id,
    pseudo: user.pseudo,
    email: user.email,
    pictureUrl: user.picture_url,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
  };
};
