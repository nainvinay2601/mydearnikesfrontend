export interface ShopifyImage {
  url: string;
  altText: string | null;
}

export interface ShopifyMoney {
  amount: string;
  currentCode: string;
}

export interface ShopifySelectedOption {
  name: string;
  value: string;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  price: ShopifyMoney;
  selectedOption: ShopifySelectedOption[];
}

export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  tags: string[];
  featuredImage: ShopifyImage;
  variants: {
    edges: Array<{
      node: ShopifyVariant;
    }>;
  };
}

export interface ShopifyProductsResponse {
  data: {
    products: {
      edges: Array<{
        node: ShopifyProduct;
      }>;
    };
  };
}
