// import React from 'react'

// const ProductInfo = () => {
//   return (
//     < >
//         <div className='flex justify-between items-center px-[8px]  py-1'>
//         <div className="productName capitalize font-medium text-md ">PC Race Master</div>
//         <div className="productPrice text-sm">₹1299</div>
//         </div>
//         <div className="description text-[8px] px-[8px] py-1 ">
//             <p>100% Cotton & 250 GSM</p>
//             <p>Street Ready Look</p>
//         </div>
      
//     </>
//   )
// }

// export default ProductInfo

// components/ProductInfo.tsx
import React from 'react';
import { SimpleProduct } from '@/types/shopify';

interface ProductInfoProps {
  product: SimpleProduct;
  currencySymbol?: string;
  showDescription?: boolean;
  className?: string;
}

const ProductInfo = ({ 
  product, 
  currencySymbol = '₹',
  showDescription = true,
  className = ''
}: ProductInfoProps) => {
  
  // Format price to show proper decimals
  const formatPrice = (amount: string) => {
    const price = parseFloat(amount);
    return price % 1 === 0 ? price.toString() : price.toFixed(2);
  };

  // Extract description lines - you can customize this logic
  const getDescriptionLines = () => {
    if (!product.description) return [];
    
    // Split by line breaks or periods, filter empty lines
    const lines = product.description
      .split(/[\n\r\.]/)
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .slice(0, 2); // Take first 2 lines only
    
    return lines;
  };

  const descriptionLines = getDescriptionLines();

  return (
    <div className={className}>
      {/* Product Name and Price */}
      <div className='flex justify-between items-center px-[8px] py-1'>
        <div className="productName capitalize font-medium text-md">
          {product.title}
        </div>
        <div className="productPrice text-sm">
          {currencySymbol}{formatPrice(product.price.amount)}
        </div>
      </div>

      {/* Product Description */}
      {showDescription && (
        <div className="description text-[8px] px-[8px] py-1">
          {descriptionLines.length > 0 ? (
            descriptionLines.map((line, index) => (
              <p key={index}>{line}</p>
            ))
          ) : (
            // Fallback description lines
            <>
              <p>Premium Quality Product</p>
              <p>Street Ready Look</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductInfo;

