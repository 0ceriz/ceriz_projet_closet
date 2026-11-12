import { Router } from 'express';
import { validateBody, validateParams } from '../../middlewares/validateSchema';
import { authMiddleware } from '../../middlewares/auth.middlewares';
import { appUserController } from '../../controllers/appUser.controller';
import {
  appUserIdParamSchema,
  changePasswordSchema,
  updateAppUserSchema,
} from '../../schemas/appUser.schema';

const appUserRoutes = Router();

// All /users routes require authentication
appUserRoutes.use(authMiddleware);

appUserRoutes.get('/', appUserController.getAll);

appUserRoutes.get(
  '/:id',
  validateParams(appUserIdParamSchema),
  appUserController.getById
);

appUserRoutes.patch(
  '/me',
  validateBody(updateAppUserSchema),
  appUserController.updateMe
);

appUserRoutes.patch(
  '/me/password',
  validateBody(changePasswordSchema),
  appUserController.changePassword
);

appUserRoutes.delete('/me', appUserController.deleteMe);

appUserRoutes.patch(
  '/:id',
  validateParams(appUserIdParamSchema),
  validateBody(updateAppUserSchema),
  appUserController.updateById
);

appUserRoutes.delete(
  '/:id',
  validateParams(appUserIdParamSchema),
  appUserController.deleteById
);

export default appUserRoutes;
