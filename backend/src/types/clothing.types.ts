import { z } from "zod";
import {
  clothingIdParamSchema,
  createClothingItemSchema,
  updateClothingItemSchema,
} from "../schemas/clothes.schema";

export type ClothingIdParams = z.infer<typeof clothingIdParamSchema>;
export type ClothingId = ClothingIdParams["id"];

export type CreateClothingItemDTO = z.infer<typeof createClothingItemSchema>;
export type UpdateClothingItemDTO = z.infer<typeof updateClothingItemSchema>;

export type ClothingItem = CreateClothingItemDTO & {
  id: ClothingId;
};
