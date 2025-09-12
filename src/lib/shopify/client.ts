// // lib/shopify/client.ts
// const SHOPIFY_STORE_URL = process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL!;
// const SHOPIFY_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

// if (!SHOPIFY_STORE_URL || !SHOPIFY_ACCESS_TOKEN) {
//   throw new Error('Missing Shopify environment variables');
// }

// export async function queryShopify<T = any>(query: string, variables?: any): Promise<T> {
//   console.log("====================================");
//   console.log("URL:", SHOPIFY_STORE_URL);
//   console.log("TOKEN:", SHOPIFY_ACCESS_TOKEN.substring(0, 10) + "...");
//   console.log("====================================");

//   const response = await fetch(SHOPIFY_STORE_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN,
//     },
//     body: JSON.stringify({ query, variables }),
//     cache: "no-store",
//   });

//   console.log("RESPONSE STATUS:", response.status);
//   const text = await response.text();
//   console.log("Response Text", text);

//   if (!response.ok) {
//     throw new Error(`Shopify API Error: ${response.status} - ${text}`);
//   }

//   const data = JSON.parse(text);
//   if (data.errors) {
//     throw new Error(`GraphQL Error: ${JSON.stringify(data.errors)}`);
//   }

//   return data;
// }

import {
  Product,
  Collection,
  SimpleProduct,
  SimpleCollection,
  ShopifyProductResponse,
  ShopifyProductsResponse,
  ShopifyCollectionResponse,
  ShopifyCollectionsResponse,
  ProductVariables,
  CollectionVariables,
} from "@/types/shopify";

const endpoint = process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL!;
const storefrontAccessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

// Main fetch function
async function shopifyFetch<T>({
  query,
  variables = {},
}: {
  query: string;
  variables?: any;
}): Promise<T> {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // tells shopify the request body is json
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken, // authenticates our request using our access token
    },
    body: JSON.stringify({ query, variables }), // convert em into json and send it as request body
  });

  if (!response.ok) {
    throw new Error(`Shopify API Error: ${response.status}`);
  }

  const { data, errors } = await response.json();

  if (errors) {
    throw new Error(`Graphql  errors:${JSON.stringify(errors)}`);
  }

  return data;
}

//* ==== Helper function to transform shopify product into simple product ======
function transformProduct(product: Product): SimpleProduct {
  return {
    id: product.id,
    title: product.title,
    handle: product.handle,
    description: product.description,
    images: product.images.edges.map((edge) => edge.node),
    variants: product.variants.edges.map((edge) => edge.node),
    price: product.priceRange.minVariantPrice,
    compareAtPrice:
      product.compareAtPriceRange.minVariantPrice.amount !== "0.0"
        ? product.compareAtPriceRange.minVariantPrice
        : undefined,
    availableForSale: product.availableForSale,
    tags: product.tags,
    productType: product.productType,
    vendor: product.vendor,
    featuredImage: product.featuredImage,
  };
}

//* ========== Helpfer function to transform shopify collection to simple collection ========

function transformCollection(collection: Collection): SimpleCollection {
  return {
    id: collection.id,
    title: collection.title,
    handle: collection.handle,
    description: collection.description,
    image: collection.image,
    products: collection.products.edges.map((edge) =>
      transformProduct(edge.node)
    ),
  };
}

//*========================== GRAPHQL QUERY - GET COLLECTIONS  ==================================

const GET_COLLECTIONS_QUERY = `
  query getCollections {
    collections(first: 20) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            id
            url
            altText
            width
            height
          }
          seo {
            title
            description
          }
          updatedAt
        }
      }
    }
  }
`;

//*========================== GRAPHQL QUERY - GET COLLECTION WITH  PRODUCTS ==================================

const GET_COLLECTION_WITH_PRODUCTS_QUERY = `
  query getCollectionWithProducts($handle: String!) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      image {
        id
        url
        altText
        width
        height
      }
      products(first: 100) {
        edges {
          node {
            id
            title
            handle
            description
            descriptionHtml
            availableForSale
            tags
            productType
            vendor
            createdAt
            updatedAt
            publishedAt
            featuredImage {
              id
              url
              altText
              width
              height
            }
            images(first: 10) {
              edges {
                node {
                  id
                  url
                  altText
                  width
                  height
                }
              }
            }
            variants(first: 100) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  quantityAvailable
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                  image {
                    id
                    url
                    altText
                    width
                    height
                  }
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            options {
              id
              name
              values
            }
            seo {
              title
              description
            }
          }
        }
      }
      seo {
        title
        description
      }
      updatedAt
    }
  }
`;

//*========================== GRAPHQL QUERY - GET PRODUCT  BY HANDLE ==================================

const GET_PRODUCT_BY_HANDLE_QUERY = `
  query getProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      availableForSale
      tags
      productType
      vendor
      createdAt
      updatedAt
      publishedAt
      featuredImage {
        id
        url
        altText
        width
        height
      }
      images(first: 20) {
        edges {
          node {
            id
            url
            altText
            width
            height
          }
        }
      }
      variants(first: 100) {
        edges {
          node {
            id
            title
            availableForSale
            quantityAvailable
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
            image {
              id
              url
              altText
              width
              height
            }
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      options {
        id
        name
        values
      }
      seo {
        title
        description
      }
    }
  }
`;

//*========================== GRAPHQL QUERY - GET COLLECTION INFO  ==================================

const GET_COLLECTION_INFO_QUERY = `
  query getCollectionInfo($handle: String!) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      image {
        id
        url
        altText
        width
        height
      }
      seo {
        title
        description
      }
      updatedAt
    }
  }
`;

//*========================== API FUNCTIONS ==================================

// GetCollections
export async function getCollections(): Promise<SimpleCollection[]> {
  try {
    const response = await shopifyFetch<ShopifyCollectionsResponse>({
      query: GET_COLLECTIONS_QUERY,
    });

    return response.collections.edges.map((edge) => ({
      id: edge.node.id,
      title: edge.node.title,
      handle: edge.node.handle,
      description: edge.node.description,
      image: edge.node.image,
      products: [], // Collections endpoint doesn't include products
    }));
  } catch (error) {
    console.error("Error fetching collections:", error);
    throw new Error("Failed to fetch collections");
  }
}

// Get Products By Collections
export async function getProductsByCollection(
  handle: string
): Promise<SimpleProduct[]> {
  try {
    const response = await shopifyFetch<ShopifyCollectionResponse>({
      query: GET_COLLECTION_WITH_PRODUCTS_QUERY,
      variables: { handle },
    });

    if (!response.collection) {
      throw new Error(`Collection with handle "${handle}" not found`);
    }

    return response.collection.products.edges.map((edge) =>
      transformProduct(edge.node)
    );
  } catch (error) {
    console.error(`Error fetching products for collection "${handle}":`, error);
    throw new Error(`Failed to fetch products for collection "${handle}"`);
  }
}
// Get product by handle
export async function getProductByHandle(
  handle: string
): Promise<SimpleProduct> {
  try {
    const response = await shopifyFetch<ShopifyProductResponse>({
      query: GET_PRODUCT_BY_HANDLE_QUERY,
      variables: { handle },
    });
    if (!response.product) {
      throw new Error(`Product with handle "${handle}" not found :/`);
    }

    return transformProduct(response.product);
  } catch (error) {
    console.error(`Error fetching product "${handle}":`, error);
    throw new Error(`Failed to fetch product "${handle}"`);
  }
}

// Get collection info

export async function getCollectionInfo(
  handle: string
): Promise<Omit<SimpleCollection, "products">> {
  try {
    const response = await shopifyFetch<ShopifyCollectionResponse>({
      query: GET_COLLECTION_INFO_QUERY,
      variables: { handle },
    });

    if (!response.collection) {
      throw new Error(`Collection with handle "${handle}" not found`);
    }

    return {
      id: response.collection.id,
      title: response.collection.title,
      handle: response.collection.handle,
      description: response.collection.description,
      image: response.collection.image,
    };
  } catch (error) {
    console.error(`Error fetching collection info "${handle}":`, error);
    throw new Error(`Failed to fetch collection info "${handle}"`);
  }
}
