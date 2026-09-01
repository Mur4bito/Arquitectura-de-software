import { z } from 'zod';

export const productSchema = z.object({
    name: z.string().min(3),
    price: z.number().positive(),
    stock: z.number().int().min(0),
});

export const productUpdateSchema = productSchema.partial();