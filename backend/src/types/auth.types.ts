import { z } from 'zod';
import { loginSchema, registerSchema } from '../schemas/auth.schema';

export type LoginDTO = z.infer<typeof loginSchema>;
export type RegisterDTO = z.infer<typeof registerSchema>;
