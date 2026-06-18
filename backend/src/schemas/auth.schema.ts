import { z } from 'zod';

export const loginSchema = z
  .object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(8),
  })
  .strict();

export const registerSchema = z
  .object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(8),
    name: z.string().min(2).max(100),
  })
  .strict();
