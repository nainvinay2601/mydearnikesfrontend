"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import ProductGrid from "@/components/major/ProductGrid";
import { SimpleProduct, SimpleCollection } from "@/types/shopify";
import {
  getCollectionInfo,
  getProductsByCollection,
} from "@/lib/shopify/client";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [category, setCategory] = useState<string>("");
  const [products, setProducts] = useState<SimpleProduct[]>([]);
  // const [collection, setCollection] = useState<any>(null);
  const [collection, setCollection] = useState<Omit<SimpleCollection, "products"> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedSort, setSelectedSort] = useState<string>("");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const { category: cat } = await params;
        setCategory(cat);

        const [productsData, collectionData] = await Promise.all([
          getProductsByCollection(cat),
          getCollectionInfo(cat),
        ]);

        setProducts(productsData);
        setCollection(collectionData);
      } catch (err) {
        console.error("Error loading category", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [params]);

  // Categories array
  const allCategories = [
    {
      name: "All Products",
      href: "/category/all-products",
      slug: "all-products",
    },
    {
      name: "New Arrivals",
      href: "/category/new-arrivals",
      slug: "new-arrivals",
    },
    {
      name: "Oversized Tees",
      href: "/category/oversized-unisex-tees",
      slug: "oversized-unisex-tees",
    },
    {
      name: "Fitted Tees",
      href: "/category/regular-fits",
      slug: "regular-fits",
    },
    { name: "Baby Tees", href: "/category/baby-tees", slug: "baby-tees" },
    { name: "Hoodies", href: "/category/hoodies", slug: "hoodies" },
    { name: "Bottoms", href: "/category/bottoms", slug: "bottoms" },
  ];

  // Move active category to first position
  const activeIndex = allCategories.findIndex((cat) => cat.slug === category);
  const categories =
    activeIndex !== -1
      ? [
          allCategories[activeIndex],
          ...allCategories.filter((_, i) => i !== activeIndex),
        ]
      : allCategories;

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...products];

    switch (selectedSort) {
      case "price-asc":
        return sorted.sort(
          (a, b) => parseFloat(a.price.amount) - parseFloat(b.price.amount)
        );
      case "price-desc":
        return sorted.sort(
          (a, b) => parseFloat(b.price.amount) - parseFloat(a.price.amount)
        );
      case "newest":
        return sorted;
      default:
        return sorted;
    }
  }, [products, selectedSort]);

  // const sortOptions = [
  //   { label: "Price: Low to High", value: "price-asc" },
  //   { label: "Price: High to Low", value: "price-desc" },
  //   { label: "Newest", value: "newest" },
  // ];

  // Close dropdown when clicking outside - REMOVED since we're using native select

  if (loading) {
    return (
      <div className="pt-16 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 pt-16">
        <h1 className="text-3xl font-bold mb-6">Error</h1>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-6">
            We encountered an error while loading this category.
          </p>
          <Link
            href="/"
            className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 pt-16">
        <h1 className="text-3xl font-bold mb-6 capitalize">
          {collection?.title || category.replace("-", " ")}
        </h1>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-4">No Products Found</h2>
          <p className="text-gray-600 mb-6">
            We could not find any products in this category at the moment :/.
          </p>
          <Link
            href="/"
            className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Category Header */}
      <div className="headingClass py-4 px-[8px] tracking-tight flex flex-col items-center justify-center gap-0 py-8">
        <div className="flex justify-center items-center font-bebas text-[64px] md:text-[96px] font-semibold leading-none">
          {collection?.title || category.replace("-", " ")}
        </div>
        <p className="text-gray-600 max-w-2xl text-xs font-medium uppercase mt-2">
          Core This, Core That, Just Wear It.
        </p>

        {/* Category Navigation Menu with Sort */}
        <nav className="flex gap-2 mt-6 overflow-x-auto scrollbar-hide  w-full justify-start md:justify-center relative">
          {/* Filter Dropdown */}
          <div className="relative">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className={`px-4 py-2 text-xs font-medium rounded-full transition-all duration-200 whitespace-nowrap appearance-none pr-8 cursor-pointer border-[0.125px] ${
                selectedSort
                  ? "bg-[#FCCEE9] text-black border-black"
                  : " text-black border-black"
              }`}
              style={{ outline: "none" }}
            >
              <option value="">Filter</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                className={`w-3 h-3 ${
                  selectedSort ? "text-black" : "text-black"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {categories.map((cat) => {
            const isActive = cat.slug === category;
            return (
              <Link
                key={cat.href}
                href={cat.href}
                className={`px-4 py-2 text-xs font-medium border rounded-full transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-300 hover:bg-gray-100"
                }`}
              >
                {cat.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Product Grid */}
      <ProductGrid products={sortedProducts} />
    </div>
  );
}
