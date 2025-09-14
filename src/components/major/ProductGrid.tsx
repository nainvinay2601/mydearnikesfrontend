// components/ProductGrid.tsx
"use client";
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { SimpleProduct } from "@/types/shopify";

interface ProductGridProps {
  products: SimpleProduct[];
  title?: string;
  itemsPerPage?: number;
}

export default function ProductGrid({
  products,
  title = "Explore Products",
  itemsPerPage = 4,
}: ProductGridProps) {
  const [visibleItems, setVisibleItems] = useState(itemsPerPage);

  const loadMore = () => {
    setVisibleItems((prev) => Math.min(prev + 4, products.length));
  };

  const visibleProducts = products.slice(0, visibleItems);
  const hasMore = visibleItems < products.length;

  return (
    <>
      {title && (
        <div className="heading px-[8px] py-1">
          {/* <h1 className="uppercase text-2xl font-medium">{title}</h1> */}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 bg-gray-100 border-[0.25px] border-b-[0.125px] border-[#aeadad] auto-rows-fr">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center py-4">
          <button
            onClick={loadMore}
            className="bg-black text-white px-3 py-2 text-sm font-medium tracking-tight hover:bg-gray-800 transition-colors duration-200"
          >
            Explore More
          </button>
        </div>
      )}
    </>
  );
}