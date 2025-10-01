
"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";

import { SimpleProduct } from "@/types/shopify";
import { getBestSellingProducts } from "@/lib/shopify/client";

const ExploreMDN = () => {
  const [products, setProducts] = useState<SimpleProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleItems, setVisibleItems] = useState(6); // Start with 6 items
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const fetchBestSellingProducts = async () => {
      try {
        setLoading(true);
        const bestSellingProducts = await getBestSellingProducts(18); // Only fetch 18 products
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

  // 🔥 Auto-load more products when scrolling near bottom
  const loadMore = useCallback(() => {
    if (isLoadingMore || visibleItems >= 18) return; // Max 18 items
    
    setIsLoadingMore(true);
    
    // Simulate loading delay (remove if not needed)
    setTimeout(() => {
      setVisibleItems((prev) => Math.min(prev + 6, 18)); // Load 6 more, max 18
      setIsLoadingMore(false);
    }, 500);
  }, [isLoadingMore, visibleItems]);

  // 🔥 Intersection Observer to auto-load only when section is visible
  useEffect(() => {
    if (visibleItems >= 18 || products.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoadingMore) {
            loadMore();
          }
        });
      },
      {
        root: null,
        rootMargin: '300px', // Start loading 300px before bottom
        threshold: 0.1
      }
    );

    // Observe the loading trigger element
    const loadTrigger = document.getElementById('bestsellers-load-trigger');
    if (loadTrigger) {
      observer.observe(loadTrigger);
    }

    return () => observer.disconnect();
  }, [loadMore, visibleItems, isLoadingMore, products.length]);

  const formatPrice = (price: { amount: string; currencyCode: string }) => {
    const amount = parseFloat(price.amount);
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: price.currencyCode,
    }).format(amount);
  };

  const visibleProducts = products.slice(0, visibleItems);
  const hasMore = visibleItems < 18 && products.length >= 18; // Check against 18 limit
  const showExploreButton = visibleItems >= 18; // Show explore button when all 18 are visible

  if (loading) {
    return (
      <div className="px-[8px] py-4">
        <h1 className="uppercase text-2xl font-medium mb-4">Bestsellers</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 bg-gray-100 border-[0.25px] border-b-[0.125px] border-[#aeadad] auto-rows-fr">
          {[...Array(6)].map((_, i) => (
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
                  priority={index < 6}
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

      {/* Loading trigger - always present when more items can be loaded */}
      {visibleItems < 18 && products.length > visibleItems && (
        <div 
          id="bestsellers-load-trigger" 
          className="h-20 flex items-center justify-center"
        >
          {isLoadingMore ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
              {/* <span className="text-sm text-gray-600"></span> */}
            </div>
          ) : (
            <div className="text-sm text-gray-400">Scroll to load more...</div>
          )}
        </div>
      )}

      {/*  Explore More button when all 18 items are shown */}
      {showExploreButton && (
        <div className="flex justify-center py-8">
          <Link
            href="/category/all-products"
            className="bg-black text-white px-8 py-3 text-sm font-medium tracking-tight hover:bg-gray-800 transition-colors duration-200 rounded-none border-none"
          >
            Explore More Products
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreMDN;