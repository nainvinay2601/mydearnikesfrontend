"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

import { SimpleProduct } from "@/types/shopify";
import { getBestSellingProducts } from "@/lib/shopify/client";

const ExploreMDN = () => {
  const [products, setProducts] = useState<SimpleProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleItems, setVisibleItems] = useState(4);

  useEffect(() => {
    const fetchBestSellingProducts = async () => {
      try {
        setLoading(true);
        const bestSellingProducts = await getBestSellingProducts(20);
        setProducts(bestSellingProducts);
      } catch (err) {
        setError('Failed to fetch best-selling products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellingProducts();
  }, []);

  const loadMore = () => {
    setVisibleItems((prev) => Math.min(prev + 4, products.length));
  };

  const formatPrice = (price: { amount: string; currencyCode: string }) => {
    const amount = parseFloat(price.amount);
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: price.currencyCode,
    }).format(amount);
  };

  const visibleProducts = products.slice(0, visibleItems);
  const hasMore = visibleItems < products.length;

  if (loading) {
    return (
      <div className="px-[8px] py-4">
        <h1 className="uppercase text-2xl font-medium mb-4">Bestsellers</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 bg-gray-100 border-[0.25px] border-b-[0.125px] border-[#aeadad] auto-rows-fr">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="border-b-[0.25px] border-r-[0.25px] border-gray-400 flex flex-col">
              <div className="flex-1 bg-gray-100 flex justify-center items-center p-2 animate-pulse">
                <div className="w-full h-64 bg-gray-300"></div>
              </div>
              <div className="px-2 bg-white py-1 flex border-t-[0.5px] border-gray-200 justify-between items-center text-sm">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-[8px] py-4">
        <h1 className="uppercase text-2xl font-medium">Bestsellers</h1>
        <p className="text-red-500 mt-4">{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="heading px-[8px] py-4">
        <h1 className="uppercase text-2xl font-medium">Bestsellers</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 bg-gray-100 border-[0.25px] border-b-[0.125px] border-[#aeadad] auto-rows-fr">
        {visibleProducts.map((product, index) => (
          <Link 
            key={product.id} 
            href={`/product/${product.handle}`}
            className="border-b-[0.25px] border-r-[0.25px] border-gray-400 flex flex-col group cursor-pointer hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex-1 bg-gray-100 flex justify-center items-center p-2 group-hover:bg-gray-200 transition-colors duration-200">
              {product.featuredImage ? (
                <Image
                  src={product.featuredImage.url}
                  alt={product.featuredImage.altText || product.title}
                  width={400}
                  height={400}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  quality={90}
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                  priority={index < 4}
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
            </div>
            <div className="px-2 bg-white py-1 flex border-t-[0.5px] border-gray-200 justify-between items-center text-sm group-hover:bg-gray-50 transition-colors duration-200">
              <h3 className="font-inter text-xs font-normal group-hover:text-gray-700 transition-colors duration-200 truncate ">
                {product.title}
              </h3>
              <p className="font-inter text-xs font-normal tracking-tight group-hover:text-gray-700 transition-colors duration-200">
                {formatPrice(product.price)}
              </p>
            </div>
          </Link>
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
};

export default ExploreMDN;