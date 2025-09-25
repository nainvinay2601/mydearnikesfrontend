

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

//*========================== GRAPHQL QUERY - GET BEST SELLING PRODUCTS  ==================================

const GET_BEST_SELLING_PRODUCTS_QUERY = `
  query getBestSellingProducts($first: Int!) {
    products(first: $first, sortKey: BEST_SELLING) {
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
  }
`;

//*========================== GRAPHQL QUERY - GET LATEST PRODUCTS  ==================================


const GET_LATEST_PRODUCTS_QUERY = `
  query getLatestProducts($first: Int!) {
    products(first: $first, sortKey: CREATED_AT, reverse: true) {
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
// Get best selling products
export async function getBestSellingProducts(first: number = 20): Promise<SimpleProduct[]> {
  try {
    const response = await shopifyFetch<ShopifyProductsResponse>({
      query: GET_BEST_SELLING_PRODUCTS_QUERY,
      variables: { first },
    });

    return response.products.edges.map((edge) => transformProduct(edge.node));
  } catch (error) {
    console.error("Error fetching best-selling products:", error);
    throw new Error("Failed to fetch best-selling products");
  }
}

// Get Latest Products
export async function getLatestProducts(first: number = 4): Promise<SimpleProduct[]> {
  try {
    const response = await shopifyFetch<ShopifyProductsResponse>({
      query: GET_LATEST_PRODUCTS_QUERY,
      variables: { first },
    });

    return response.products.edges.map((edge) => transformProduct(edge.node));
  } catch (error) {
    console.error("Error fetching latest products:", error);
    throw new Error("Failed to fetch latest products");
  }
}