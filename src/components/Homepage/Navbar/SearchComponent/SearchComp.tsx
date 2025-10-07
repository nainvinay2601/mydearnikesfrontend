

"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import NavCarousel from "../NavImageCarousel/NavCarousel";
import { SimpleProduct } from "@/types/shopify";
import { getLatestProducts, searchProducts } from "@/lib/shopify/client";

const RECENT_KEY = "recent-searches";

interface SearchComponentProps {
  onClose?: () => void; // Add this prop to receive close handler from parent
}

const SearchComponent = ({ onClose }: SearchComponentProps) => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<SimpleProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [recents, setRecents] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
    } catch {
      return [];
    }
  });

  // Load latest products on mount if no recents
  useEffect(() => {
    if (recents.length === 0 && !query) {
      loadLatestProducts();
    }
  }, []);

  // Search products when query changes
  useEffect(() => {
    if (!query.trim()) {
      if (recents.length === 0) {
        loadLatestProducts();
      } else {
        setProducts([]);
      }
      return;
    }

    const debounceTimer = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await searchProducts(query, 20);
        setProducts(results);
      } catch (error) {
        console.error("Search error:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query, recents.length]);

  const loadLatestProducts = async () => {
    setLoading(true);
    try {
      const latest = await getLatestProducts(10);
      setProducts(latest);
    } catch (error) {
      console.error("Error loading latest products:", error);
    } finally {
      setLoading(false);
    }
  };

  const addRecent = (term: string) => {
    if (typeof window === "undefined") return;
    const next = [term, ...recents.filter((r) => r !== term)].slice(0, 3);
    setRecents(next);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  };

  const handleProductClick = () => {
    // Save the search query as recent if there is one
    if (query.trim()) {
      addRecent(query.trim());
    }
    // Close the search menu
    onClose?.();
  };

  return (
    <div className="bg-white">
      <SearchBar
        query={query}
        setQuery={setQuery}
        recents={recents}
        addRecent={addRecent}
      />
      <NavCarousel 
        products={products} 
        loading={loading}
        showRecents={!query && recents.length > 0}
        onProductClick={handleProductClick}
      />
    </div>
  );
};

export default SearchComponent;