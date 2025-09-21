
const SHOPIFY_STOREFRONT_URL = `https://mydearnikess.myshopify.com/api/2024-07/graphql.json`;
const STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

// Modern Cart Create Mutation
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
async function makeGraphQLRequest(query: string, variables: any = {}) {
  try {
    console.log("Making GraphQL request to:", SHOPIFY_STOREFRONT_URL);
    console.log("Variables:", variables);
    
    const response = await fetch(SHOPIFY_STOREFRONT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
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
      throw new Error(`GraphQL Error: ${data.errors[0]?.message || 'Unknown error'}`);
    }

    return data.data;
  } catch (error) {
    console.error("GraphQL request failed:", error);
    throw error;
  }
}

// Create cart with item using modern Cart API
export const createCartCheckout = async (variantId: string, quantity: number) => {
  try {
    console.log("Creating cart via Cart API for variant:", variantId);
    
    // Ensure variantId is in GraphQL format
    let graphqlVariantId = variantId;
    if (!variantId.startsWith('gid://shopify/ProductVariant/')) {
      graphqlVariantId = `gid://shopify/ProductVariant/${variantId}`;
    }
    
    console.log("Using GraphQL variant ID:", graphqlVariantId);
    
    // Create cart input with modern Cart API structure
    const cartInput = {
      lines: [
        {
          merchandiseId: graphqlVariantId,
          quantity: quantity,
        }
      ],
      // Add buyer identity for better checkout experience
      buyerIdentity: {
        countryCode: "IN"
      }
    };
    
    console.log("Cart input:", cartInput);
    
    // Make the GraphQL mutation
    const result = await makeGraphQLRequest(CART_CREATE_MUTATION, {
      input: cartInput
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
      lines: cart.lines
    };
    
  } catch (error) {
    console.error("Cart checkout creation failed:", error);
    throw error;
  }
};

// Create cart with multiple items (for full cart checkout)
export const createCartWithItems = async (cartItems: any[]) => {
  try {
    console.log("Creating cart with multiple items:", cartItems);
    
    const lines = cartItems.map(item => {
      let graphqlVariantId = item.id;
      if (!item.id.startsWith('gid://shopify/ProductVariant/')) {
        graphqlVariantId = `gid://shopify/ProductVariant/${item.id}`;
      }
      
      return {
        merchandiseId: graphqlVariantId,
        quantity: item.quantity,
      };
    });
    
    const cartInput = {
      lines: lines,
      buyerIdentity: {
        countryCode: "IN"
      }
    };
    
    const result = await makeGraphQLRequest(CART_CREATE_MUTATION, {
      input: cartInput
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

