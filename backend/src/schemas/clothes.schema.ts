import { z } from 'zod';

export const CreateClothingItemSchema = z.object ({
    name: z.string().min(1, 'Names is Required'),
    type: z.object ({
        category: z.enum (['top', 'bottom', 'shoes', 'accessory'], 'Invalidate category'
        ),subcategory: z.string().optional(),
    }),
    style: z.enum(['sportware', 'chic', 'classic', 'casual']).optional(),
    color: z.string().optional(),
    isFavorite: z.boolean().optional().default(false),
    comment: z.string().optional(),

});