/*  NOTE:  THIS FILE DESCRIBE THE DATA COMING FROM THE SHOPIFY
- Can group them into  sections 
1. Core shopify types -> basic building block like ShopifyImage and ShopifyMoney -> almost every product, variant, collection will have em 
2. Main Entities like -> Product Variant, Product, Collection -> these basically directly map to GraphQL Objects(products , Collection etc)
-> each time we fetch we convert the raw data into the json and this define the json data strucutre 
3. API Response Wrapper -> These match the graphql response format -> returns data in edges and nodes
4. Simplified type -> we can use them directly for the UI as they are flattened data and we dont have to deal with edges and node more than once.
5. Cart & Utitlity Types -> shape of the cart although it doesnt directly comes from the shopify and we have to use zustand here btw for state management 
6. GraphQL Variables Types -> types represent the variable passed to graphl query 
*/
// Core Shopify Types
export interface ShopifyImage {
  id: string;
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  price: ShopifyMoney;
  compareAtPrice?: ShopifyMoney;
  availableForSale: boolean;
  quantityAvailable: number;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  image?: ShopifyImage;
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  images: {
    edges: Array<{
      node: ShopifyImage;
    }>;
  };
  variants: {
    edges: Array<{
      node: ProductVariant;
    }>;
  };
  priceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  compareAtPriceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  availableForSale: boolean;
  tags: string[];
  productType: string;
  vendor: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  options: Array<{
    id: string;
    name: string;
    values: string[];
  }>;
  featuredImage?: ShopifyImage;
  seo: {
    title: string;
    description: string;
  };
}

export interface Collection {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  image?: ShopifyImage;
  products: {
    edges: Array<{
      node: Product;
    }>;
  };
  seo: {
    title: string;
    description: string;
  };
  updatedAt: string;
}

// API Response Wrappers
export interface ShopifyProductResponse {
  product: Product;
}

export interface ShopifyProductsResponse {
  products: {
    edges: Array<{
      node: Product;
    }>;
  };
}

export interface ShopifyCollectionResponse {
  collection: Collection;
}

export interface ShopifyCollectionsResponse {
  collections: {
    edges: Array<{
      node: Collection;
    }>;
  };
}

// Simplified Types for Components (easier to work with)
export interface SimpleProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  images: ShopifyImage[];
  variants: ProductVariant[];
  price: ShopifyMoney;
  compareAtPrice?: ShopifyMoney;
  availableForSale: boolean;
  tags: string[];
  productType: string;
  vendor: string;
  featuredImage?: ShopifyImage;
}

export interface SimpleCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image?: ShopifyImage;
  products: SimpleProduct[];
}

// Utility Types
export interface CartItem {
  variantId: string;
  productId: string;
  title: string;
  price: ShopifyMoney;
  quantity: number;
  image?: ShopifyImage;
  selectedOptions: {
    name: string;
    value: string;
  }[];
}

export interface Cart {
  id: string;
  items: CartItem[];
  totalQuantity: number;
  totalPrice: ShopifyMoney;
}

// GraphQL Variables Types
export interface ProductVariables {
  handle: string;
}

export interface CollectionVariables {
  handle: string;
  first?: number;
  after?: string;
}

export interface ProductsVariables {
  first?: number;
  after?: string;
  query?: string;
  sortKey?: 'CREATED_AT' | 'UPDATED_AT' | 'PRICE' | 'BEST_SELLING';
  reverse?: boolean;
}

export interface SearchProductsVariables {
  query: string;
  first?: number;
}