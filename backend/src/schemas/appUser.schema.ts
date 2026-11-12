import { z } from 'zod';

export const appUserIdParamSchema = z.object({
  id: z.uuid('Invalid app user ID'),
});

export const registerSchema = z
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

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, 'Le mot de passe actuel est obligatoire'),
    newPassword: z
      .string()
      .min(8, 'Le nouveau mot de passe doit contenir au moins 8 caractères'),
  })
  .strict()
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "Le nouveau mot de passe doit être différent de l'ancien",
    path: ['newPassword'],
  });

export const updateAppUserSchema = registerSchema.partial();
