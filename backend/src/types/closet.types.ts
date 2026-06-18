import { z } from 'zod';
import {
  closetIdParamSchema,
  createClosetSchema,
  updateClosetSchema,
} from '../schemas/closet.schema';
import { AppUserId } from './appUser.types';

export type ClosetIdParams = z.infer<typeof closetIdParamSchema>;
export type ClosetId = ClosetIdParams['id'];

// CreateClosetDTO and UpdateClosetDTO represent the expected shape of the data when creating or updating a closet, respectively.
export type CreateClosetDTO = z.infer<typeof createClosetSchema>;
export type UpdateClosetDTO = z.infer<typeof updateClosetSchema>;

export interface Closet {
  id: ClosetId;
  name: string;
  description?: string;
  user_id: AppUserId;
  created_at: Date;
  updated_at: Date | null;
}

// CreateClosetRepositoryData
export interface CreateClosetRepositoryData {
  user_id: AppUserId;
  name: string;
  description?: string;
}
