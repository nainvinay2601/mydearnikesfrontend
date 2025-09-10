'use client'; // Mark as Client Component
import React, { useEffect, useState } from 'react';

// Define a type for your product data
type ProductEdge = {
  node: {
    id: string;
    title: string;
  };
};

export default function ClientProductsPage() {
  const [products, setProducts] = useState<ProductEdge[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/test')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        return res.json();
      })
      .then((data) => {
        // Ensure the data structure matches what you expect
        if (data.data?.products?.edges) {
          setProducts(data.data.products.edges);
        } else {
          throw new Error('Unexpected data structure');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch products:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      {products.length === 0 ? (
        <div>No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map(({ node }) => (
            <div key={node.id} className="border p-4 rounded-lg">
              <h2 className="text-lg font-semibold">{node.title}</h2>
              <p className="text-gray-600">ID: {node.id}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
