import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productSchema } from '../schemas/ProductSchema.js';
import { createProduct } from '../api/products';

export default function ProductForm() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(productSchema),
  });

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      reset();
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
      <div>
        <input {...register('name')} placeholder="Nombre" />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <input {...register('price')} type="number" step="0.01" placeholder="Precio" />
        {errors.price && <p>{errors.price.message}</p>}
      </div>
      <div>
        <input {...register('stock')} type="number" placeholder="Stock" />
        {errors.stock && <p>{errors.stock.message}</p>}
      </div>
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Creando...' : 'Crear producto'}
      </button>
      {mutation.isError && <p>Error: {mutation.error.message}</p>}
      {mutation.isSuccess && <p>Producto creado correctamente</p>}
    </form>
  );
}