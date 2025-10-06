// const RECENT_KEY = "recently-viewed-products";
// const MAX_RECENT = 10;

// export interface RecentProduct {
//   id: string;
//   handle: string;
//   title: string;
//   price: {
//     amount: string;
//     currencyCode: string;
//   };
//   featuredImage?: {
//     url: string;
//     altText: string | null;
//   };
//   viewedAt: number;
// }

// export function addRecentlyViewed(product: RecentProduct): void {
//   if (typeof window === "undefined") return;

//   try {
//     const existing = getRecentlyViewed();
//     const filtered = existing.filter(p => p.id !== product.id);
//     const updated = [
//       { ...product, viewedAt: Date.now() },
//       ...filtered
//     ].slice(0, MAX_RECENT);
    
//     localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
//   } catch (error) {
//     console.error("Error saving recently viewed:", error);
//   }
// }

// export function getRecentlyViewed(): RecentProduct[] {
//   if (typeof window === "undefined") return [];

//   try {
//     const data = localStorage.getItem(RECENT_KEY);
//     return data ? JSON.parse(data) : [];
//   } catch (error) {
//     console.error("Error reading recently viewed:", error);
//     return [];
//   }
// }

// export function getRecentlyViewedExcluding(excludeId: string): RecentProduct[] {
//   return getRecentlyViewed().filter(p => p.id !== excludeId);
// }

// export function convertRecentToSimpleProduct(recent: RecentProduct) {
//   return {
//     id: recent.id,
//     handle: recent.handle,
//     title: recent.title,
//     price: recent.price,
//     featuredImage: recent.featuredImage,
//     description: "",
//     images: recent.featuredImage ? [recent.featuredImage] : [],
//     variants: [],
//     compareAtPrice: undefined,
//     availableForSale: true,
//     tags: [],
//     productType: "",
//     vendor: "",
//     createdAt: ""
//   };
// }

import { ShopifyImage } from "@/types/shopify";

const RECENT_KEY = "recently-viewed-products";
const MAX_RECENT = 10;

export interface RecentProduct {
  id: string;
  handle: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  featuredImage?: ShopifyImage; // Changed from custom type to ShopifyImage
  viewedAt: number;
}

export function addRecentlyViewed(product: RecentProduct): void {
  if (typeof window === "undefined") return;

  try {
    const existing = getRecentlyViewed();
    const filtered = existing.filter(p => p.id !== product.id);
    const updated = [
      { ...product, viewedAt: Date.now() },
      ...filtered
    ].slice(0, MAX_RECENT);
    
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Error saving recently viewed:", error);
  }
}

export function getRecentlyViewed(): RecentProduct[] {
  if (typeof window === "undefined") return [];

  try {
    const data = localStorage.getItem(RECENT_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading recently viewed:", error);
    return [];
  }
}

export function getRecentlyViewedExcluding(excludeId: string): RecentProduct[] {
  return getRecentlyViewed().filter(p => p.id !== excludeId);
}

export function convertRecentToSimpleProduct(recent: RecentProduct) {
  return {
    id: recent.id,
    handle: recent.handle,
    title: recent.title,
    price: recent.price,
    featuredImage: recent.featuredImage,
    description: "",
    images: recent.featuredImage ? [recent.featuredImage] : [],
    variants: [],
    compareAtPrice: undefined,
    availableForSale: true,
    tags: [],
    productType: "",
    vendor: "",
    createdAt: ""
  };
}