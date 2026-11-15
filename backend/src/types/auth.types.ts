import { z } from "zod";
import { loginSchema, jwtPayloadSchema } from "../schemas/auth.schema";

export type LoginDTO = z.infer<typeof loginSchema>;
export type JwtPayload_spe = z.infer<typeof jwtPayloadSchema>;
