
"use client";
import React, { useState, useEffect, useCallback } from "react";
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
  itemsPerPage = 12,
}: ProductGridProps) {
  const [visibleItems, setVisibleItems] = useState(itemsPerPage);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // 🔥 Auto-load more products when scrolling near bottom
  const loadMore = useCallback(() => {
    if (isLoadingMore || visibleItems >= products.length) return;
    
    setIsLoadingMore(true);
    
    // Simulate loading delay (remove if not needed)
    setTimeout(() => {
      setVisibleItems((prev) => Math.min(prev + 8, products.length));
      setIsLoadingMore(false);
    }, 500);
  }, [isLoadingMore, visibleItems, products.length]);

  // 🔥 Intersection Observer for infinite scroll
  useEffect(() => {
    if (visibleItems >= products.length || products.length === 0) return;

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
        rootMargin: '400px', // Start loading 400px before bottom
        threshold: 0.1
      }
    );

    // Observe the loading trigger element
    const loadTrigger = document.getElementById('product-grid-load-trigger');
    if (loadTrigger) {
      observer.observe(loadTrigger);
    }

    return () => observer.disconnect();
  }, [loadMore, visibleItems, isLoadingMore, products.length]);

  const visibleProducts = products.slice(0, visibleItems);
  const hasMore = visibleItems < products.length;

  return (
    <>
      {title && (
        <div className="heading px-[8px] py-1">
          {/* <h1 className="uppercase text-2xl font-medium">{title}</h1> */}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-gray-100 border-[0.25px] border-b-[0.125px] border-[#aeadad] auto-rows-fr">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* 🔥 Loading trigger - always present when more items can be loaded */}
      {hasMore && (
        <div 
          id="product-grid-load-trigger" 
          className="h-20 flex items-center justify-center"
        >
          {isLoadingMore ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
              {/* <span className="text-sm text-gray-600">Loading more products...</span> */}
            </div>
          ) : (
            <div className="text-sm text-gray-400">Scroll to load more...</div>
          )}
        </div>
      )}

      {/* 🔥 End message when all products are loaded */}
      {!hasMore && products.length > itemsPerPage && (
        <div className="flex justify-center py-8">
          <p className="text-sm text-gray-500 capitalize">You Have seen all products in this category.</p>
        </div>
      )}
    </>
  );
}