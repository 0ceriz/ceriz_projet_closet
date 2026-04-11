import { z } from 'zod';
import {
  CLOTHING_CATEGORIES,
  CLOTHING_STYLES,
} from '../constants/clothes.constants';

export const clothingIdParamSchema = z.object({
  id: z.uuid('Invalid clothing item ID'),
});

export const clothingCategorySchema = z.enum(CLOTHING_CATEGORIES);
export const clothingStyleSchema = z.enum(CLOTHING_STYLES).optional();

export const clothingTypeSchema = z.object({
  category: clothingCategorySchema,
  subcategory: z.string().optional(),
});

export const createClothingItemSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    type: clothingTypeSchema,
    style: clothingStyleSchema,
    color: z.string().optional(),
    isFavorite: z.boolean().optional().default(false),
    comment: z.string().optional(),
  })
  .strict();

export const updateClothingItemSchema = createClothingItemSchema;

// export const updateClothingItemSchema = createClothingItemSchema
//   .partial()
//   .refine(
//     (data) => Object.keys(data).length > 0,
//     'At least one field must be provided for update'
//   );
