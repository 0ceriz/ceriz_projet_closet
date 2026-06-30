import { Router } from 'express';
import { validateBody } from '../../middlewares/validateSchema';
import { authMiddleware } from '../../middlewares/auth.middlewares';

import { authController } from '../../controllers/auth.controller';
import { loginSchema } from '../../schemas/auth.schema';
import { registerSchema } from '../../schemas/appUser.schema';

const authRoutes = Router();

//Public routes

// POST /api/v1/auth/register
authRoutes.post(
  '/register',
  validateBody(registerSchema),
  authController.register
);

// POST /api/v1/auth/login
authRoutes.post('/login', validateBody(loginSchema), authController.login);

// Protected routes
authRoutes.post('/logout', authMiddleware, authController.logout);

authRoutes.get('/me', authMiddleware, authController.me);

export default authRoutes;
