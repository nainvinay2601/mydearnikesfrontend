// import { CartItem } from "@/store/cartStore";
// const SHOPIFY_STOREFRONT_URL = `https://mydearnikes.myshopify.com/api/2024-07/graphql.json`;
// const STOREFRONT_ACCESS_TOKEN =
//   process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

// // Modern Cart Create Mutation
// const CART_CREATE_MUTATION = `
//   mutation cartCreate($input: CartInput!) {
//     cartCreate(input: $input) {
//       cart {
//         id
//         checkoutUrl
//         totalQuantity
//         cost {
//           totalAmount {
//             amount
//             currencyCode
//           }
//         }
//         lines(first: 10) {
//           edges {
//             node {
//               id
//               quantity
//               merchandise {
//                 ... on ProductVariant {
//                   id
//                   title
//                   product {
//                     title
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//       userErrors {
//         field
//         message
//       }
//     }
//   }
// `;

// // Make GraphQL request
// async function makeGraphQLRequest(query: string, variables: unknown = {}) {
//   try {
//     console.log("Making GraphQL request to:", SHOPIFY_STOREFRONT_URL);
//     console.log("Variables:", variables);

//     const response = await fetch(SHOPIFY_STOREFRONT_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
//       },
//       body: JSON.stringify({
//         query,
//         variables,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();

//     if (data.errors) {
//       console.error("GraphQL errors:", data.errors);
//       throw new Error(
//         `GraphQL Error: ${data.errors[0]?.message || "Unknown error"}`
//       );
//     }

//     return data.data;
//   } catch (error) {
//     console.error("GraphQL request failed:", error);
//     throw error;
//   }
// }

// // Create cart with item using modern Cart API
// export const createCartCheckout = async (
//   variantId: string,
//   quantity: number
// ) => {
//   try {
//     console.log("Creating cart via Cart API for variant:", variantId);

//     // Ensure variantId is in GraphQL format
//     let graphqlVariantId = variantId;
//     if (!variantId.startsWith("gid://shopify/ProductVariant/")) {
//       graphqlVariantId = `gid://shopify/ProductVariant/${variantId}`;
//     }

//     console.log("Using GraphQL variant ID:", graphqlVariantId);

//     // Create cart input with modern Cart API structure
//     const cartInput = {
//       lines: [
//         {
//           merchandiseId: graphqlVariantId,
//           quantity: quantity,
//         },
//       ],
//       // Add buyer identity for better checkout experience
//       buyerIdentity: {
//         countryCode: "IN",
//       },
//     };

//     console.log("Cart input:", cartInput);

//     // Make the GraphQL mutation
//     const result = await makeGraphQLRequest(CART_CREATE_MUTATION, {
//       input: cartInput,
//     });

//     console.log("Cart API result:", result);

//     if (result.cartCreate.userErrors.length > 0) {
//       const errors = result.cartCreate.userErrors;
//       console.error("Cart creation errors:", errors);
//       throw new Error(`Cart error: ${errors[0].message}`);
//     }

//     const cart = result.cartCreate.cart;
//     console.log("Cart created successfully:", cart.checkoutUrl);

//     return {
//       id: cart.id,
//       checkoutUrl: cart.checkoutUrl,
//       totalQuantity: cart.totalQuantity,
//       cost: cart.cost,
//       lines: cart.lines,
//     };
//   } catch (error) {
//     console.error("Cart checkout creation failed:", error);
//     throw error;
//   }
// };

// // Create cart with multiple items (for full cart checkout)
// export const createCartWithItems = async (cartItems: CartItem[]) => {
//   try {
//     console.log("Creating cart with multiple items:", cartItems);

//     const lines = cartItems.map((item) => {
//       // Extract clean variant ID from the cart item ID if variantId doesn't exist
//       const cleanVariantId = item.variantId || item.id.split("-")[0];

//       console.log(`Item ID: ${item.id}, Clean variant ID: ${cleanVariantId}`);

//       let graphqlVariantId = cleanVariantId;
//       if (!cleanVariantId.startsWith("gid://shopify/ProductVariant/")) {
//         graphqlVariantId = `gid://shopify/ProductVariant/${cleanVariantId}`;
//       }

//       return {
//         merchandiseId: graphqlVariantId,
//         quantity: item.quantity,
//       };
//     });

//     const cartInput = {
//       lines: lines,
//       buyerIdentity: {
//         countryCode: "IN",
//       },
//     };

//     const result = await makeGraphQLRequest(CART_CREATE_MUTATION, {
//       input: cartInput,
//     });

//     if (result.cartCreate.userErrors.length > 0) {
//       const errors = result.cartCreate.userErrors;
//       throw new Error(`Cart error: ${errors[0].message}`);
//     }

//     return result.cartCreate.cart;
//   } catch (error) {
//     console.error("Multi-item cart creation failed:", error);
//     throw error;
//   }
// };


// lib/checkout.ts - REPLACE YOUR EXISTING FILE WITH THIS

// import { CartItem } from "@/store/cartStore";

// const SHOPIFY_STOREFRONT_URL = `https://mydearnikes.myshopify.com/api/2024-07/graphql.json`;
// const STOREFRONT_ACCESS_TOKEN =
//   process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

// // Modern Cart Create Mutation with optional customer token
// const CART_CREATE_MUTATION = `
//   mutation cartCreate($input: CartInput!) {
//     cartCreate(input: $input) {
//       cart {
//         id
//         checkoutUrl
//         totalQuantity
//         cost {
//           totalAmount {
//             amount
//             currencyCode
//           }
//         }
//         lines(first: 10) {
//           edges {
//             node {
//               id
//               quantity
//               merchandise {
//                 ... on ProductVariant {
//                   id
//                   title
//                   product {
//                     title
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//       userErrors {
//         field
//         message
//       }
//     }
//   }
// `;

// // Make GraphQL request
// async function makeGraphQLRequest(query: string, variables: unknown = {}) {
//   try {
//     console.log("Making GraphQL request to:", SHOPIFY_STOREFRONT_URL);
//     console.log("Variables:", variables);

//     const response = await fetch(SHOPIFY_STOREFRONT_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
//       },
//       body: JSON.stringify({
//         query,
//         variables,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();

//     if (data.errors) {
//       console.error("GraphQL errors:", data.errors);
//       throw new Error(
//         `GraphQL Error: ${data.errors[0]?.message || "Unknown error"}`
//       );
//     }

//     return data.data;
//   } catch (error) {
//     console.error("GraphQL request failed:", error);
//     throw error;
//   }
// }

// // UPDATED: Create cart with item using modern Cart API
// export const createCartCheckout = async (
//   variantId: string,
//   quantity: number,
//   customerAccessToken?: string // NEW: Optional customer token
// ) => {
//   try {
//     console.log("Creating cart via Cart API for variant:", variantId);

//     // Ensure variantId is in GraphQL format
//     let graphqlVariantId = variantId;
//     if (!variantId.startsWith("gid://shopify/ProductVariant/")) {
//       graphqlVariantId = `gid://shopify/ProductVariant/${variantId}`;
//     }

//     console.log("Using GraphQL variant ID:", graphqlVariantId);

//     // Create cart input with modern Cart API structure
//     const cartInput: {
//       lines: Array<{ merchandiseId: string; quantity: number }>;
//       buyerIdentity: {
//         countryCode: string;
//         customerAccessToken?: string;
//       };
//     } = {
//       lines: [
//         {
//           merchandiseId: graphqlVariantId,
//           quantity: quantity,
//         },
//       ],
//       buyerIdentity: {
//         countryCode: "IN",
//       },
//     };

//     // NEW: Add customer access token if logged in
//     if (customerAccessToken) {
//       cartInput.buyerIdentity.customerAccessToken = customerAccessToken;
//       console.log("Creating cart for authenticated customer");
//     } else {
//       console.log("Creating guest cart");
//     }

//     console.log("Cart input:", cartInput);

//     // Make the GraphQL mutation
//     const result = await makeGraphQLRequest(CART_CREATE_MUTATION, {
//       input: cartInput,
//     });

//     console.log("Cart API result:", result);

//     if (result.cartCreate.userErrors.length > 0) {
//       const errors = result.cartCreate.userErrors;
//       console.error("Cart creation errors:", errors);
//       throw new Error(`Cart error: ${errors[0].message}`);
//     }

//     const cart = result.cartCreate.cart;
//     console.log("Cart created successfully:", cart.checkoutUrl);

//     return {
//       id: cart.id,
//       checkoutUrl: cart.checkoutUrl,
//       totalQuantity: cart.totalQuantity,
//       cost: cart.cost,
//       lines: cart.lines,
//     };
//   } catch (error) {
//     console.error("Cart checkout creation failed:", error);
//     throw error;
//   }
// };

// // UPDATED: Create cart with multiple items (for full cart checkout)
// export const createCartWithItems = async (
//   cartItems: CartItem[],
//   customerAccessToken?: string // NEW: Optional customer token
// ) => {
//   try {
//     console.log("Creating cart with multiple items:", cartItems);

//     const lines = cartItems.map((item) => {
//       // Extract clean variant ID from the cart item ID if variantId doesn't exist
//       const cleanVariantId = item.variantId || item.id.split("-")[0];

//       console.log(`Item ID: ${item.id}, Clean variant ID: ${cleanVariantId}`);

//       let graphqlVariantId = cleanVariantId;
//       if (!cleanVariantId.startsWith("gid://shopify/ProductVariant/")) {
//         graphqlVariantId = `gid://shopify/ProductVariant/${cleanVariantId}`;
//       }

//       return {
//         merchandiseId: graphqlVariantId,
//         quantity: item.quantity,
//       };
//     });

//     const cartInput: {
//       lines: Array<{ merchandiseId: string; quantity: number }>;
//       buyerIdentity: {
//         countryCode: string;
//         customerAccessToken?: string;
//       };
//     } = {
//       lines: lines,
//       buyerIdentity: {
//         countryCode: "IN",
//       },
//     };

//     // NEW: Add customer access token if logged in
//     if (customerAccessToken) {
//       cartInput.buyerIdentity.customerAccessToken = customerAccessToken;
//       console.log("Creating cart for authenticated customer");
//     } else {
//       console.log("Creating guest cart");
//     }

//     const result = await makeGraphQLRequest(CART_CREATE_MUTATION, {
//       input: cartInput,
//     });

//     if (result.cartCreate.userErrors.length > 0) {
//       const errors = result.cartCreate.userErrors;
//       throw new Error(`Cart error: ${errors[0].message}`);
//     }

//     return result.cartCreate.cart;
//   } catch (error) {
//     console.error("Multi-item cart creation failed:", error);
//     throw error;
//   }
// };


// lib/checkout.ts - REPLACE YOUR EXISTING FILE WITH THIS

import { CartItem } from "@/store/cartStore";

const SHOPIFY_STOREFRONT_URL = `https://mydearnikes.myshopify.com/api/2024-07/graphql.json`;
const STOREFRONT_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

// Modern Cart Create Mutation with optional customer token
const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// Make GraphQL request
async function makeGraphQLRequest(query: string, variables: unknown = {}) {
  try {
    console.log("Making GraphQL request to:", SHOPIFY_STOREFRONT_URL);
    console.log("Variables:", variables);

    const response = await fetch(SHOPIFY_STOREFRONT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      console.error("GraphQL errors:", data.errors);
      throw new Error(
        `GraphQL Error: ${data.errors[0]?.message || "Unknown error"}`
      );
    }

    return data.data;
  } catch (error) {
    console.error("GraphQL request failed:", error);
    throw error;
  }
}

// UPDATED: Create cart with item using modern Cart API
export const createCartCheckout = async (
  variantId: string,
  quantity: number,
  customerAccessToken?: string // NEW: Optional customer token
) => {
  try {
    console.log("Creating cart via Cart API for variant:", variantId);

    // Ensure variantId is in GraphQL format
    let graphqlVariantId = variantId;
    if (!variantId.startsWith("gid://shopify/ProductVariant/")) {
      graphqlVariantId = `gid://shopify/ProductVariant/${variantId}`;
    }

    console.log("Using GraphQL variant ID:", graphqlVariantId);

    // Create cart input with modern Cart API structure
    const cartInput: {
      lines: Array<{ merchandiseId: string; quantity: number }>;
      buyerIdentity: {
        countryCode: string;
        customerAccessToken?: string;
      };
    } = {
      lines: [
        {
          merchandiseId: graphqlVariantId,
          quantity: quantity,
        },
      ],
      buyerIdentity: {
        countryCode: "IN",
      },
    };

    // NEW: Add customer access token if logged in
    if (customerAccessToken) {
      cartInput.buyerIdentity.customerAccessToken = customerAccessToken;
      console.log("Creating cart for authenticated customer");
    } else {
      console.log("Creating guest cart");
    }

    console.log("Cart input:", cartInput);

    // Make the GraphQL mutation
    const result = await makeGraphQLRequest(CART_CREATE_MUTATION, {
      input: cartInput,
    });

    console.log("Cart API result:", result);

    if (result.cartCreate.userErrors.length > 0) {
      const errors = result.cartCreate.userErrors;
      console.error("Cart creation errors:", errors);
      throw new Error(`Cart error: ${errors[0].message}`);
    }

    const cart = result.cartCreate.cart;
    console.log("Cart created successfully:", cart.checkoutUrl);

    return {
      id: cart.id,
      checkoutUrl: cart.checkoutUrl,
      totalQuantity: cart.totalQuantity,
      cost: cart.cost,
      lines: cart.lines,
    };
  } catch (error) {
    console.error("Cart checkout creation failed:", error);
    throw error;
  }
};

// UPDATED: Create cart with multiple items (for full cart checkout)
export const createCartWithItems = async (
  cartItems: CartItem[],
  customerAccessToken?: string // NEW: Optional customer token
) => {
  try {
    console.log("Creating cart with multiple items:", cartItems);

    const lines = cartItems.map((item) => {
      // Extract clean variant ID from the cart item ID if variantId doesn't exist
      const cleanVariantId = item.variantId || item.id.split("-")[0];

      console.log(`Item ID: ${item.id}, Clean variant ID: ${cleanVariantId}`);

      let graphqlVariantId = cleanVariantId;
      if (!cleanVariantId.startsWith("gid://shopify/ProductVariant/")) {
        graphqlVariantId = `gid://shopify/ProductVariant/${cleanVariantId}`;
      }

      return {
        merchandiseId: graphqlVariantId,
        quantity: item.quantity,
      };
    });

    const cartInput: {
      lines: Array<{ merchandiseId: string; quantity: number }>;
      buyerIdentity: {
        countryCode: string;
        customerAccessToken?: string;
      };
    } = {
      lines: lines,
      buyerIdentity: {
        countryCode: "IN",
      },
    };

    // NEW: Add customer access token if logged in
    if (customerAccessToken) {
      cartInput.buyerIdentity.customerAccessToken = customerAccessToken;
      console.log("Creating cart for authenticated customer");
    } else {
      console.log("Creating guest cart");
    }

    const result = await makeGraphQLRequest(CART_CREATE_MUTATION, {
      input: cartInput,
    });

    if (result.cartCreate.userErrors.length > 0) {
      const errors = result.cartCreate.userErrors;
      throw new Error(`Cart error: ${errors[0].message}`);
    }

    return result.cartCreate.cart;
  } catch (error) {
    console.error("Multi-item cart creation failed:", error);
    throw error;
  }
};