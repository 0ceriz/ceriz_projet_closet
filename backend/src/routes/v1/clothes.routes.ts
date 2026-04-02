
import { Router } from 'express';
import { clothesController } from '../../controllers/clothes.controller';
import {
  clothingIdParamSchema,
  createClothingItemSchema,
  updateClothingItemSchema,
} from '../../schemas/clothes.schema';
import { validateBody, validateParams } from '../../middlewares/validateSchema';

const clothesRoutes = Router();

clothesRoutes.get('/', clothesController.getAll);

clothesRoutes.get(
  '/:id',
  validateParams(clothingIdParamSchema),
  clothesController.getById
);

clothesRoutes.post(
  '/',
  validateBody(createClothingItemSchema),
  clothesController.create
);

clothesRoutes.put(
  '/:id',
  validateParams(clothingIdParamSchema),
  validateBody(updateClothingItemSchema),
  clothesController.updateById
);

clothesRoutes.delete(
  '/:id',
  validateParams(clothingIdParamSchema),
  clothesController.deleteById
);

export default clothesRoutes;
