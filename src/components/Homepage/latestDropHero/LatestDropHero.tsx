"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { SimpleProduct } from "@/types/shopify";
import { getLatestProducts } from "@/lib/shopify/client";

// Skeleton loader component
const ProductSkeleton = () => (
  <div className="border-b-[0.25px] border-r-[0.25px] border-gray-400 flex flex-col animate-pulse">
    <div className="relative aspect-square bg-gray-100 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 animate-shimmer"></div>
    </div>
    <div className="px-2 bg-white py-1 flex border-t-[0.5px] border-gray-200 justify-between items-center text-sm gap-6">
      <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded-md w-1/4 flex-shrink-0"></div>
    </div>
  </div>
);

const LatestDrop = () => {
  const [products, setProducts] = useState<SimpleProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        setLoading(true);
        const latestProducts = await getLatestProducts(8);
        setProducts(latestProducts);
      } catch (err) {
        setError('Failed to fetch latest products');
        console.error('Error fetching latest products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProducts();
  }, []);

  const formatPrice = (price: { amount: string; currencyCode: string }) => {
    const amount = parseFloat(price.amount);
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: price.currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (error) {
    return (
      <>
        <div className="heading px-[8px] py-4">
          <h1 className="uppercase text-2xl font-bebas font-medium">Latest Drop</h1>
        </div>
        <div className="p-4 text-red-500 text-center">
          {error}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="heading px-[8px] py-4 lg:py-8">
        <h1 className="uppercase text-2xl lg:text-4xl font-bebas font-medium">Latest Drop</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-gray-100 border-t-[0.25px] border-[#aeadad]">
        {loading
          ? [...Array(8)].map((_, index) => (
              <ProductSkeleton key={`skeleton-${index}`} />
            ))
          : products.map((product, index) => (
              <Link
                key={product.id}
                href={`/product/${product.handle}`}
                className="border-b-[0.25px] border-r-[0.25px] border-gray-400 flex flex-col group cursor-pointer hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="relative aspect-square bg-gray-100 overflow-hidden group-hover:bg-gray-200 transition-colors duration-200">
                  {product.featuredImage ? (
                    <Image
                      src={product.featuredImage.url}
                      alt={product.featuredImage.altText || product.title}
                      width={500}
                      height={500}
                      sizes="(max-width: 768px) 50vw, 33vw"
                      quality={90}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      priority={index < 8}
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                </div>
                <div className="px-2 bg-white py-1 flex border-t-[0.5px] border-gray-200 justify-between items-center text-sm group-hover:bg-gray-50 transition-colors duration-200 gap-6">
                  <h3 className="font-inter text-xs font-normal group-hover:text-gray-700 transition-colors duration-200 truncate uppercase">
                    {product.title}
                  </h3>
                  <p className="font-inter text-xs font-normal tracking-tight group-hover:text-gray-700 transition-colors duration-200">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </Link>
            ))}
      </div>

      {/* Explore More Button */}
      <div className="flex justify-center py-8">
        <Link
          href="/category/new-arrivals"
          className="bg-black text-white px-8 py-3 text-sm font-medium tracking-tight hover:bg-gray-800 transition-colors duration-200 rounded-none border-none"
        >
          Explore More
        </Link>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </>
  );
};

export default LatestDrop;