import {
  CustomerCreateResponse,
  CustomerAccessTokenCreateResponse,
  CustomerResponse,
  CustomerAccessTokenRenewResponse,
  ShopifyCustomer,
  CustomerAccessToken,
} from "@/types/shopify";

const endpoint = process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL!;
const storefrontAccessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

// Main fetch function
async function shopifyAuthFetch<T>({
  query,
  variables = {},
}: {
  query: string;
  variables?: unknown;
}): Promise<T> {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API Error: ${response.status}`);
  }

  const { data, errors } = await response.json();

  if (errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(errors)}`);
  }

  return data;
}

// Customer Create Mutation
const CUSTOMER_CREATE_MUTATION = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
        firstName
        lastName
        displayName
      }
      customerUserErrors {
        field
        message
      }
    }
  }
`;

// Customer Access Token Create (Login)
const CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION = `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        field
        message
      }
    }
  }
`;

// Get Customer Query
const GET_CUSTOMER_QUERY = `
  query getCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      email
      firstName
      lastName
      displayName
      phone
      defaultAddress {
        id
        firstName
        lastName
        company
        address1
        address2
        city
        province
        country
        zip
        phone
      }
      addresses(first: 10) {
        edges {
          node {
            id
            firstName
            lastName
            company
            address1
            address2
            city
            province
            country
            zip
            phone
          }
        }
      }
      orders(first: 10, sortKey: PROCESSED_AT, reverse: true) {
        edges {
          node {
            id
            orderNumber
            processedAt
            canceledAt
            cancelReason
            financialStatus
            fulfillmentStatus
            totalPrice {
              amount
              currencyCode
            }
            lineItems(first: 10) {
              edges {
                node {
                  title
                  quantity
                  variant {
                    id
                    image {
                      url
                      altText
                      width
                      height
                    }
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
      createdAt
      updatedAt
    }
  }
`;

// Customer Access Token Renew
const CUSTOMER_ACCESS_TOKEN_RENEW_MUTATION = `
  mutation customerAccessTokenRenew($customerAccessToken: String!) {
    customerAccessTokenRenew(customerAccessToken: $customerAccessToken) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// Customer Access Token Delete (Logout)
const CUSTOMER_ACCESS_TOKEN_DELETE_MUTATION = `
  mutation customerAccessTokenDelete($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
      deletedAccessToken
      deletedCustomerAccessTokenId
      userErrors {
        field
        message
      }
    }
  }
`;

// Customer Recover (Password Reset Request)
const CUSTOMER_RECOVER_MUTATION = `
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        field
        message
      }
    }
  }
`;

// API FUNCTIONS

// Sign Up - Create Customer
export async function signUpCustomer(
  email: string,
  password: string,
  firstName?: string,
  lastName?: string
): Promise<{
  customer: ShopifyCustomer | null;
  errors: string[];
}> {
  try {
    const response = await shopifyAuthFetch<CustomerCreateResponse>({
      query: CUSTOMER_CREATE_MUTATION,
      variables: {
        input: {
          email,
          password,
          firstName,
          lastName,
          acceptsMarketing: false,
        },
      },
    });

    const errors = response.customerCreate.customerUserErrors.map(
      (err) => err.message
    );

    return {
      customer: response.customerCreate.customer,
      errors,
    };
  } catch (error) {
    console.error("Error creating customer:", error);
    throw new Error("Failed to create customer");
  }
}

// Login - Create Access Token
export async function loginCustomer(
  email: string,
  password: string
): Promise<{
  accessToken: CustomerAccessToken | null;
  errors: string[];
}> {
  try {
    const response = await shopifyAuthFetch<CustomerAccessTokenCreateResponse>({
      query: CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION,
      variables: {
        input: {
          email,
          password,
        },
      },
    });

    const errors = response.customerAccessTokenCreate.customerUserErrors.map(
      (err) => err.message
    );

    return {
      accessToken: response.customerAccessTokenCreate.customerAccessToken,
      errors,
    };
  } catch (error) {
    console.error("Error logging in customer:", error);
    throw new Error("Failed to login");
  }
}

// Get Customer Details
export async function getCustomer(
  customerAccessToken: string
): Promise<ShopifyCustomer | null> {
  try {
    console.log('🔍 Fetching customer with token...');
    const response = await shopifyAuthFetch<CustomerResponse>({
      query: GET_CUSTOMER_QUERY,
      variables: { customerAccessToken },
    });

    console.log('✅ Customer fetched successfully');
    return response.customer;
  } catch (error) {
    console.error("❌ Error fetching customer:", error);
    return null;
  }
}

// Renew Access Token
export async function renewAccessToken(
  customerAccessToken: string
): Promise<CustomerAccessToken | null> {
  try {
    const response = await shopifyAuthFetch<CustomerAccessTokenRenewResponse>({
      query: CUSTOMER_ACCESS_TOKEN_RENEW_MUTATION,
      variables: { customerAccessToken },
    });

    if (response.customerAccessTokenRenew.userErrors.length > 0) {
      console.error(
        "Token renewal errors:",
        response.customerAccessTokenRenew.userErrors
      );
      return null;
    }

    return response.customerAccessTokenRenew.customerAccessToken;
  } catch (error) {
    console.error("Error renewing token:", error);
    return null;
  }
}

// Logout - Delete Access Token
export async function logoutCustomer(
  customerAccessToken: string
): Promise<boolean> {
  try {
    await shopifyAuthFetch({
      query: CUSTOMER_ACCESS_TOKEN_DELETE_MUTATION,
      variables: { customerAccessToken },
    });

    return true;
  } catch (error) {
    console.error("Error logging out:", error);
    return false;
  }
}

// Password Recovery
export async function recoverPassword(email: string): Promise<string[]> {
  try {
    const response = await shopifyAuthFetch<{
      customerRecover: {
        customerUserErrors: Array<{ message: string }>;
      };
    }>({
      query: CUSTOMER_RECOVER_MUTATION,
      variables: { email },
    });

    return response.customerRecover.customerUserErrors.map(
      (err) => err.message
    );
  } catch (error) {
    console.error("Error recovering password:", error);
    throw new Error("Failed to send recovery email");
  }
}

// Helper: Check if token is expired
export function isTokenExpired(expiresAt: string): boolean {
  const expiryDate = new Date(expiresAt);
  const now = new Date();
  // Check if token expires in next 5 minutes
  const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60000);
  return expiryDate <= fiveMinutesFromNow;
}