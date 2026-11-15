import { Router } from "express";
import { validateBody } from "../../middlewares/validateSchema";
import { authMiddleware } from "../../middlewares/auth.middlewares";

import { authController } from "../../controllers/auth.controller";
import { loginSchema, forgotPasswordSchema } from "../../schemas/auth.schema";
import { registerSchema } from "../../schemas/appUser.schema";

const authRoutes = Router();

// Public routes

// POST /api/v1/auth/register
authRoutes.post(
  "/register",
  validateBody(registerSchema),
  authController.register,
);

// POST /api/v1/auth/login
authRoutes.post("/login", validateBody(loginSchema), authController.login);

// POST /api/v1/auth/forgot-password
authRoutes.post(
  "/forgot-password",
  validateBody(forgotPasswordSchema),
  authController.forgotPassword,
);

// Protected routes

// POST /api/v1/auth/logout
authRoutes.post("/logout", authMiddleware, authController.logout);

// GET /api/v1/auth/me
authRoutes.get("/me", authMiddleware, authController.me);

export default authRoutes;
