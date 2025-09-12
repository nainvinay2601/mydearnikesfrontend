"use client";

import { useState } from "react";

import { SimpleProduct } from "@/types/shopify";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: SimpleProduct[];
  title?: string;
  itemsPerPage?: number;
  showLoadMore?: boolean;
}

export default function ProductGrid({
  products,
  title = "Products",
  itemsPerPage = 8,
  showLoadMore = true,
}: ProductGridProps) {
  const [visibleItems, setVisibleItems] = useState(itemsPerPage);
  const loadMore = () => {
    setVisibleItems((prev) => Math.min(prev + itemsPerPage, products.length));
  };

  const visibleProducts = products.slice(0, visibleItems);
  const hasMore = visibleItems < products.length;
  if (products.length === 0) {
    return (
      <div className="flex flex-col  items-center  justify-center py-12">
        <h2 className="text-xl  font-medium  mb-4 "> No Products Found</h2>
        <p className="text-gray-600  text-sm  ">
          {" "}
          try Adjusting your search on filters{" "}
        </p>
      </div>
    );
  }
  return (
    <>
      {title && (
        <div className="heading px-[8px]  py-4">
          <h1 className="uppercase text-2xl  font-medium">{title}</h1>
        </div>
      )}

      <div className="grid grid-cols-2  md:grid-cols-3  lg:grid-cols-3 bg-gray-100 border-[0.25px] border-b-[0.125px]  border-[#aeadad] auto-rows-fr">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {showLoadMore && hasMore && (
        <div className="flex justify-center py-4">
          <button
            onClick={loadMore}
            className="bg-black text-white  px-3  py-2  text-sm font-medium tracking-tight hover:bg-gray-800 transition-colors  duration-200"
          >
            Load More ({products.length - visibleItems} remaining)
          </button>
        </div>
      )}

      {/* Show total count */}

      <div className="text-center py-2  text-xs  text-gray-600">
        Showing {visibleProducts.length} of {products.length} products
      </div>
    </>
  );
  //   end scene
}
