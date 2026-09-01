const API_URL = 'http://localhost:3000';

export async function fetchProducts() {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) {
    throw new Error('Error al obtener los productos');
  }
  const data = await res.json();
  return data.products;
}

export async function createProduct(product) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(product),
  });
  if (!res.ok) {
    const errorData = await res.json();
    const message = Array.isArray(errorData.error)
      ? errorData.error.map((e) => e.message).join(', ')
      : errorData.error;
    throw new Error(message || 'Error al crear el producto');
  }
  return res.json();
}