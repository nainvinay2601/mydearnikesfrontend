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

// * shopify customer part comes here 

// Customer Types
// export interface ShopifyCustomer {
//   id: string;
//   email: string;
//   firstName: string | null;
//   lastName: string | null;
//   phone: string | null;
//   displayName: string;
//   defaultAddress?: ShopifyAddress;
//   addresses: {
//     edges: Array<{
//       node: ShopifyAddress;
//     }>;
//   };
//   orders: {
//     edges: Array<{
//       node: ShopifyOrder;
//     }>;
//   };
//   createdAt: string;
//   updatedAt: string;
// }

// export interface ShopifyAddress {
//   id: string;
//   firstName: string | null;
//   lastName: string | null;
//   company: string | null;
//   address1: string | null;
//   address2: string | null;
//   city: string | null;
//   province: string | null;
//   country: string | null;
//   zip: string | null;
//   phone: string | null;
// }

// // export interface ShopifyOrder {
// //   id: string;
// //   orderNumber: number;
// //   processedAt: string;
// //   financialStatus: string;
// //   fulfillmentStatus: string;
// //   totalPrice: ShopifyMoney;
// //   lineItems: {
// //     edges: Array<{
// //       node: {
// //         title: string;
// //         quantity: number;
// //         variant: {
// //           image: ShopifyImage;
// //           price: ShopifyMoney;
// //         };
// //       };
// //     }>;
// //   };
// // }


// export interface ShopifyOrder {
//   id: string;
//   orderNumber: number;
//   processedAt: string;
//   canceledAt: string | null; // Make sure this exists
//   cancelReason?: string | null; // Add if missing
//   financialStatus: string;
//   fulfillmentStatus: string;
//   totalPrice: ShopifyMoney;
//   lineItems: {
//     edges: Array<{
//       node: {
//         id: string; // Add this for key prop
//         title: string;
//         quantity: number;
//         variant: {
//           id: string; // Add this
//           image?: ShopifyImage; // Make optional
//           price: ShopifyMoney;
//         };
//       };
//     }>;
//   };
// }

// export interface CustomerAccessToken {
//   accessToken: string;
//   expiresAt: string;
// }

// // API Response Types
// export interface CustomerCreateResponse {
//   customerCreate: {
//     customer: ShopifyCustomer | null;
//     customerUserErrors: Array<{
//       field: string[] | null;
//       message: string;
//     }>;
//   };
// }

// export interface CustomerAccessTokenCreateResponse {
//   customerAccessTokenCreate: {
//     customerAccessToken: CustomerAccessToken | null;
//     customerUserErrors: Array<{
//       field: string[] | null;
//       message: string;
//     }>;
//   };
// }

// export interface CustomerResponse {
//   customer: ShopifyCustomer | null;
// }

// export interface CustomerAccessTokenRenewResponse {
//   customerAccessTokenRenew: {
//     customerAccessToken: CustomerAccessToken | null;
//     userErrors: Array<{
//       field: string[] | null;
//       message: string;
//     }>;
//   };
// }



// //! order cancel 
// export interface OrderCancelResponse {
//   orderCancel: {
//     order: {
//       id: string;
//       canceledAt: string | null;
//       cancelReason: string | null;
//       financialStatus: string;
//       fulfillmentStatus: string;
//     };
//     userErrors: Array<{
//       field: string[];
//       message: string;
//     }>;
//   };
// }

export interface ShopifyCustomer {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  displayName: string;
  defaultAddress?: ShopifyAddress;
  addresses: {
    edges: Array<{
      node: ShopifyAddress;
    }>;
  };
  orders: {
    edges: Array<{
      node: ShopifyOrder;
    }>;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ShopifyAddress {
  id: string;
  firstName: string | null;
  lastName: string | null;
  company: string | null;
  address1: string | null;
  address2: string | null;
  city: string | null;
  province: string | null;
  country: string | null;
  zip: string | null;
  phone: string | null;
}

// export interface ShopifyOrder {
//   id: string;
//   orderNumber: number;
//   processedAt: string;
//   financialStatus: string;
//   fulfillmentStatus: string;
//   totalPrice: ShopifyMoney;
//   lineItems: {
//     edges: Array<{
//       node: {
//         title: string;
//         quantity: number;
//         variant: {
//           image: ShopifyImage;
//           price: ShopifyMoney;
//         };
//       };
//     }>;
//   };
// }

export interface ShopifyOrder {
  id: string;
  orderNumber: number;
  processedAt: string;
  cancelledAt?: string | null;
  canceledAt?: string | null;
  cancelReason?: string | null;
  closed?: boolean;
  financialStatus: string;
  fulfillmentStatus: string;
  totalPrice: ShopifyMoney;
  lineItems: {
    edges: Array<{
      node: {
        id?: string; // Make this optional since Storefront API doesn't have it
        title: string;
        quantity: number;
        variant: {
          id: string;
          image?: ShopifyImage;
          price: ShopifyMoney;
        };
      };
    }>;
  };
}
export interface CustomerAccessToken {
  accessToken: string;
  expiresAt: string;
}

// API Response Types
export interface CustomerCreateResponse {
  customerCreate: {
    customer: ShopifyCustomer | null;
    customerUserErrors: Array<{
      field: string[] | null;
      message: string;
    }>;
  };
}

export interface CustomerAccessTokenCreateResponse {
  customerAccessTokenCreate: {
    customerAccessToken: CustomerAccessToken | null;
    customerUserErrors: Array<{
      field: string[] | null;
      message: string;
    }>;
  };
}

export interface CustomerResponse {
  customer: ShopifyCustomer | null;
}

export interface CustomerAccessTokenRenewResponse {
  customerAccessTokenRenew: {
    customerAccessToken: CustomerAccessToken | null;
    userErrors: Array<{
      field: string[] | null;
      message: string;
    }>;
  };
}