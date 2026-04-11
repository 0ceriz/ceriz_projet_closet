import { z } from 'zod';
import {
  clothingIdParamSchema,
  createClothingItemSchema,
  updateClothingItemSchema,
} from '../schemas/clothes.schema';

// export interface ClothingType {
//   category: (typeof CLOTHING_CATEGORIES)[number];
//   subcategory: string;
// }

// export interface ClothingItem {
//   id: string;
//   name: string;
//   type: ClothingType;
//   style: (typeof CLOTHING_STYLES)[number];
//   color: string;
//   isFavorite: boolean;
//   comment?: string;
// }

// export type CreateClothingItemDTO = Omit<ClothingItem, 'id'>;

export type ClothingIdParams = z.infer<typeof clothingIdParamSchema>;
export type ClothingId = ClothingIdParams['id'];

export type CreateClothingItemDTO = z.infer<typeof createClothingItemSchema>;
export type UpdateClothingItemDTO = z.infer<typeof updateClothingItemSchema>;

export type ClothingItem = CreateClothingItemDTO & {
  id: ClothingId;
};

export interface Closet {
  isOpen: boolean;
  clothes: ClothingItem[];
}
