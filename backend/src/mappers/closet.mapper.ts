import { Closet } from '../types/closet.types';

interface ClosetDb {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  created_at: Date;
  updated_at: Date | null;
}

export const mapClosetDbToCloset = (closet: ClosetDb): Closet => ({
  id: closet.id,
  userId: closet.user_id,
  name: closet.name,
  ...(closet.description ? { description: closet.description } : {}),
  createdAt: closet.created_at,
  updatedAt: closet.updated_at,
});
