import { z } from 'zod';
import {
  appUserIdParamSchema,
  registerSchema,
  updateAppUserSchema,
} from '../schemas/appUser.schema';

export type AppUserIdParams = z.infer<typeof appUserIdParamSchema>;
export type AppUserId = AppUserIdParams['id'];

// CreateAppUserDTO and UpdateAppUserDTO represent the expected shape of the data when creating or updating an app user, respectively.
export type CreateAppUserDTO = z.infer<typeof registerSchema>;
export type UpdateAppUserDTO = z.infer<typeof updateAppUserSchema>;

// UpdateAppUserRepositoryData represents the shape of the data when updating an app user in the repository. It allows for partial updates, meaning that not all fields are required.
export type UpdateAppUserRepositoryData = Partial<CreateAppUserRepositoryData>;

// AppUserDb represents the shape of the app user data stored in the database.
export interface AppUserDb {
  id: AppUserId;
  pseudo: string;
  email: string;
  password_hash: string;
  picture_url: string | null;
  created_at: Date;
  updated_at: Date | null;
}

// AppUserPublic represents the shape of the app user data that can be safely exposed to clients, without sensitive information like password hashes.
export interface AppUserPublic {
  id: AppUserId;
  pseudo: string;
  email: string;
  pictureUrl: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}

// CreateAppUserRepositoryData
export interface CreateAppUserRepositoryData {
  pseudo: string;
  email: string;
  passwordHash: string;
  pictureUrl?: string | null;
}
