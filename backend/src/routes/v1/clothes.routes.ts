import { Router } from "express";
import { clothesController } from "../../controllers/clothes.controller";
import {
  clothingIdParamSchema,
  createClothingItemSchema,
  updateClothingItemSchema,
} from "../../schemas/clothes.schema";
import { validateBody, validateParams } from "../../middlewares/validateSchema";
import { authMiddleware } from "../../middlewares/auth.middlewares";

const clothesRoutes = Router();

// Toutes les routes nécessitent une authentification
clothesRoutes.use(authMiddleware);

clothesRoutes.get("/", clothesController.getAll);

clothesRoutes.get(
  "/:id",
  validateParams(clothingIdParamSchema),
  clothesController.getById,
);

clothesRoutes.post(
  "/",
  validateBody(createClothingItemSchema),
  clothesController.create,
);

clothesRoutes.put(
  "/:id",
  validateParams(clothingIdParamSchema),
  validateBody(updateClothingItemSchema),
  clothesController.updateById,
);

clothesRoutes.delete(
  "/:id",
  validateParams(clothingIdParamSchema),
  clothesController.deleteById,
);

export default clothesRoutes;
