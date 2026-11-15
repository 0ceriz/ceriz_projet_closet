import { z } from "zod";
import {
  CLOTHING_CATEGORIES,
  CLOTHING_STYLES,
} from "../constants/clothes.constants";

// Validation de l'identifiant
export const clothingIdParamSchema = z.object({
  id: z.uuid("Invalid clothing item ID"),
});

// Validation des champs
export const clothingCategorySchema = z.enum(CLOTHING_CATEGORIES);

export const clothingStyleSchema = z.enum(CLOTHING_STYLES);

export const clothingTypeSchema = z.object({
  category: clothingCategorySchema,
  subcategory: z.string().optional(),
});

// Schéma de création
export const createClothingItemSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    type: clothingTypeSchema,
    style: clothingStyleSchema.optional(),
    color: z.string().optional(),
    isFavorite: z.boolean().optional().default(false),
    comment: z.string().optional(),
  })
  .strict();

// Schéma de mise à jour
export const updateClothingItemSchema = z
  .object({
    name: z.string().min(1, "Name cannot be empty").optional(),
    type: clothingTypeSchema.optional(),
    style: clothingStyleSchema.optional(),
    color: z.string().optional(),
    isFavorite: z.boolean().optional(),
    comment: z.string().optional(),
  })
  .strict()
  .refine(
    (data) => Object.keys(data).length > 0,
    "At least one field must be provided for update",
  );
