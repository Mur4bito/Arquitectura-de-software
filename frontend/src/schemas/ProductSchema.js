import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  price: z.coerce.number().positive('El precio debe ser un número positivo'),
  stock: z.coerce.number().int('El stock debe ser un número entero').min(0, 'El stock no puede ser negativo'),
});