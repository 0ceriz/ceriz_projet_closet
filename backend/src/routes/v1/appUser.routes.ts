import { Router } from 'express';
import { validateBody, validateParams } from '../../middlewares/validateSchema';
import { appUserController } from '../../controllers/appUser.controller';
import {
  appUserIdParamSchema,
  createAppUserSchema,
  updateAppUserSchema,
} from '../../schemas/appUser.schema';

const appUserRoutes = Router();

appUserRoutes.get('/', appUserController.getAll);

appUserRoutes.get(
  '/:id',
  validateParams(appUserIdParamSchema),
  appUserController.getById
);

appUserRoutes.post(
  '/',
  validateBody(createAppUserSchema),
  appUserController.create
);

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
