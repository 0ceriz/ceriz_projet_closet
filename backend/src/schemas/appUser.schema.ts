import { z } from 'zod';

export const appUserIdParamSchema = z.object({
  id: z.uuid('Invalid app user ID'),
});

export const createAppUserSchema = z
  .object({
    pseudo: z
      .string()
      .trim()
      .min(3, 'Pseudo must contain at least 3 characters')
      .max(255, 'Pseudo must contain at most 255 characters'),

    email: z
      .email('Invalid email format')
      .max(255, 'Email must contain at most 255 characters'),

    password: z.string().min(8, 'Password must contain at least 8 characters'),

    pictureUrl: z
      .url('Invalid picture URL')
      .max(255, 'Picture URL must contain at most 255 characters')
      .optional()
      .nullable(),
  })
  .strict();

export const updateAppUserSchema = createAppUserSchema.partial();
