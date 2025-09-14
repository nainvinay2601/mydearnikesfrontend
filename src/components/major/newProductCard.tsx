// components/ProductGrid.tsx
"use client";

import Image from "next/image";
import React from "react";

// Sample product data
const dummyProducts = [
  {
    id: "1",
    image: "https://mydearnikes.com/cdn/shop/files/Mock-It-Los_Angeles_Apparel_1203GD_Garment_Dyed_T-Shirt_1.png?v=1757681658&width=3840",
    alt: "Product 1",
    name: "Product 1",
    price: "19.99",
  },
  {
    id: "2",
    image: "https://mydearnikes.com/cdn/shop/files/Mock-It-Los_Angeles_Apparel_1203GD_Garment_Dyed_T-Shirt_1.png?v=1757681658&width=3840",
    alt: "Product 2",
    name: "Product 2",
    price: "29.99",
  },
  {
    id: "3",
    image: "https://mydearnikes.com/cdn/shop/files/Mock-It-Los_Angeles_Apparel_1203GD_Garment_Dyed_T-Shirt_1.png?v=1757681658&width=3840",
    alt: "Product 3",
    name: "Product 3",
    price: "39.99",
  },
  {
    id: "4",
    image: "https://mydearnikes.com/cdn/shop/files/Mock-It-Los_Angeles_Apparel_1203GD_Garment_Dyed_T-Shirt_1.png?v=1757681658&width=3840",
    alt: "Product 4",
    name: "Product 4",
    price: "49.99",
  },
];

interface Product {
  id: string;
  image: string;
  alt: string;
  name: string;
  price: string;
}

const ProductGrids = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 bg-gray-100 border-[0.25px] border-b-[0.125px] border-[#aeadad] auto-rows-fr">
      {dummyProducts.map((product: Product) => (
        <div
          key={product.id}
          className="border-b-[0.25px] border-r-[0.25px] border-gray-400 flex flex-col"
        >
          <div className="flex-1 bg-gray-100 flex justify-center items-center p-2">
            <Image
              src={product.image}
              alt={product.alt}
              width={400}
              height={400}
              sizes="(max-width: 768px) 50vw, 33vw"
              quality={90}
              className="object-contain"
              // priority={ 4}
            />
          </div>
          <div className="px-2 bg-white py-1 flex border-t-[0.5px] border-gray-200 justify-between items-center text-sm">
            <h3 className="font-inter text-xs font-normal">{product.name}</h3>
            <p className="font-inter text-xs font-normal tracking-tight">
              ₹ {product.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrids;