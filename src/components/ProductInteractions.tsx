'use client';

import { useState } from 'react';
import { SimpleProduct } from '@/types/shopify';

interface ProductInteractionsProps {
  product: SimpleProduct;
}

export default function ProductInteractions({ product }: ProductInteractionsProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  const handleAddToCart = () => {
    // Implement your cart logic here
    console.log('Adding to cart:', {
      product: product.id,
      variant: selectedVariant?.id,
      quantity
    });
  };

  const handleBuyNow = () => {
    // Implement your buy now logic here
    console.log('Buy now:', {
      product: product.id,
      variant: selectedVariant?.id,
      quantity
    });
  };

  return (
    <>
      {/* Variants */}
      {product.variants && product.variants.length > 1 && (
        <div className="space-y-4">
          <h3 className="font-semibold">Options:</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-2">
                {product.variants[0]?.title.includes('Size') ? 'Size' : 'Variant'}
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    disabled={!variant.availableForSale}
                    className={`px-4 py-2 border rounded transition-colors ${
                      selectedVariant?.id === variant.id
                        ? 'border-black bg-black text-white' 
                        : variant.availableForSale
                        ? 'border-gray-300 hover:border-gray-400'
                        : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {variant.title}
                    {!variant.availableForSale && ' (Out of Stock)'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add to Cart Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center border rounded">
            <button 
              onClick={decrementQuantity}
              className="px-3 py-2 hover:bg-gray-100 transition-colors"
            >
              -
            </button>
            <input 
              type="number" 
              min="1" 
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 text-center py-2 border-none outline-none"
            />
            <button 
              onClick={incrementQuantity}
              className="px-3 py-2 hover:bg-gray-100 transition-colors"
            >
              +
            </button>
          </div>
        </div>
        
        <button 
          onClick={handleAddToCart}
          disabled={!product.availableForSale || (selectedVariant && !selectedVariant.availableForSale)}
          className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {!product.availableForSale || (selectedVariant && !selectedVariant.availableForSale) 
            ? 'Out of Stock' 
            : 'Add to Cart'
          }
        </button>
        
        <button 
          onClick={handleBuyNow}
          disabled={!product.availableForSale || (selectedVariant && !selectedVariant.availableForSale)}
          className="w-full border border-gray-300 py-3 rounded font-semibold hover:bg-gray-50 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          Buy it now
        </button>
      </div>
    </>
  );
}