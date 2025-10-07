import React from "react";
import { SimpleProduct } from "@/types/shopify";
import Image from "next/image";
import Link from "next/link";

interface NavCarouselProps {
  products: SimpleProduct[];
  loading?: boolean;
  showRecents?: boolean;
  onProductClick?: () => void;
}

const NavCarousel = ({ products, loading, showRecents, onProductClick }: NavCarouselProps) => {
  const formatPrice = (amount: string, currencyCode: string) => {
    const price = parseFloat(amount);
    if (currencyCode === "INR") {
      return `₹${price.toLocaleString("en-IN")}`;
    }
    return `$${price.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="px-[8px] py-3 flex items-center justify-center h-[280px]">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (showRecents) {
    return (
      <div className="px-[8px] py-3">
        <p className="text-sm text-gray-500 mb-2">Your recent searches</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="px-[8px] py-3 flex items-center justify-center h-[280px]">
        <p className="text-gray-500">No products found</p>
      </div>
    );
  }

  return (
    <div className="px-[8px] py-3 overflow-x-auto scrollbar-hide border-b-[0.5px] border-[#aeadad] bg-white">
      <div className="inline-flex gap-2  border-[#aeadad] ">
        {products.map((product) => {
          const mainImage = product.featuredImage || product.images[0];
          const displayPrice = formatPrice(
            product.price.amount,
            product.price.currencyCode
          );

          return (
            <Link
              key={product.id}
              href={`/product/${product.handle}`}
              onClick={onProductClick}
              className="flex-shrink-0 w-[220px] md:w-[350px] border-[0.25px] border-gray-400 flex flex-col group relative"
            >
              <div className="relative aspect-square bg-gray-100 overflow-hidden group-hover:bg-gray-200 transition-colors duration-200">
                {mainImage ? (
                  <Image
                    src={mainImage.url}
                    alt={mainImage.altText || product.title}
                    width={500}
                    height={500}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center absolute inset-0">
                    <span className="text-gray-400 text-sm">No Image</span>
                  </div>
                )}
              </div>
              <div className="px-2 bg-white py-2 flex border-t-[0.5px] border-gray-200 justify-between items-center text-sm">
                <h3 className="font-inter text-xs font-normal truncate uppercase flex-1">
                  {product.title}
                </h3>
                <p className="font-inter text-xs font-normal tracking-tight ml-2">
                  {displayPrice}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NavCarousel;