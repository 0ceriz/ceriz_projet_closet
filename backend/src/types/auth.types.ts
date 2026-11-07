import { z } from 'zod';
import {
  loginSchema,
  registerSchema,
  jwtPayloadSchema,
} from '../schemas/auth.schema';

export type LoginDTO = z.infer<typeof loginSchema>;
export type RegisterDTO = z.infer<typeof registerSchema>;

export type JwtPayload_spe = z.infer<typeof jwtPayloadSchema>;
