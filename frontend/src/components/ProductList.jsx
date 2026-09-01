import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/products';

export default function ProductList() {
  const { data: products, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p>Cargando productos...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {products.map((product) => (
        <li key={product._id}>
          {product.name} — ${product.price} — Stock: {product.stock}
        </li>
      ))}
    </ul>
  );
}