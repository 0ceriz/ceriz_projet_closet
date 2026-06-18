import { Router } from 'express';
import { validateBody, validateParams } from '../../middlewares/validateSchema';
import { closetController } from '../../controllers/closet.controller';
import { authMiddleware } from '../../middlewares/auth.middlewares';
import {
  closetIdParamSchema,
  createClosetSchema,
  updateClosetSchema,
} from '../../schemas/closet.schema';

const closetRoutes = Router();

closetRoutes.get('/me', authMiddleware, closetController.getMyClosets);

closetRoutes.get('/', closetController.getAll);

closetRoutes.get(
  '/:id',
  validateParams(closetIdParamSchema),
  closetController.getById
);

closetRoutes.patch(
  '/:id',
  validateParams(closetIdParamSchema),
  validateBody(updateClosetSchema),
  closetController.updateById
);

closetRoutes.delete(
  '/:id',
  validateParams(closetIdParamSchema),
  closetController.deleteById
);

closetRoutes.post(
  '/',
  authMiddleware,
  validateBody(createClosetSchema),
  closetController.create
);

export default closetRoutes;
