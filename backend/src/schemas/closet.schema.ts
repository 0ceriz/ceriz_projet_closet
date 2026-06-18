import { z } from 'zod';

export const closetIdParamSchema = z.object({
  id: z.uuid('Invalid closet ID'),
});

export const createClosetSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, 'Name must contain at least 3 characters')
      .max(255, 'Name must contain at most 255 characters'),

    description: z
      .string()
      .trim()
      .min(1, 'Description must contain at least 1 character')
      .max(255, 'Description must contain at most 255 characters')
      .optional(),
  })
  .strict();

export const updateClosetSchema = createClosetSchema.partial();
