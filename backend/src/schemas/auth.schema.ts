import { z } from "zod";

export const jwtPayloadSchema = z.object({
  userId: z.uuid("Invalid user ID"),
  email: z.email("Invalid email format"),
});

export const loginSchema = z
  .object({
    email: z.email("Invalid email format"),
    password: z.string().min(8),
  })
  .strict();

export const forgotPasswordSchema = z
  .object({
    email: z.email("Adresse email invalide"),
  })
  .strict();
