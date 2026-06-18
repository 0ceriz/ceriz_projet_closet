import { Router } from 'express';
import { validateBody } from '../../middlewares/validateSchema';
import { authMiddleware } from '../../middlewares/auth.middlewares';

import { authController } from '../../controllers/auth.controller';
import { loginSchema } from '../../schemas/auth.schema';
import { createAppUserSchema } from '../../schemas/appUser.schema';

const authRoutes = Router();

// POST /api/v1/auth/register
authRoutes.post(
  '/register',
  validateBody(createAppUserSchema),
  authController.register
);

// POST /api/v1/auth/login
authRoutes.post('/login', validateBody(loginSchema), authController.login);

// GET /api/v1/auth/me
authRoutes.get('/me', authMiddleware, authController.me);

export default authRoutes;
