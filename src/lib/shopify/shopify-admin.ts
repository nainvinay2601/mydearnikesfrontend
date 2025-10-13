const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!;
const SHOPIFY_ADMIN_API_ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN!;
const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION || '2024-10';

const ADMIN_API_URL = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`;

// Admin API GraphQL fetch function
async function shopifyAdminFetch<T>({
  query,
  variables = {},
}: {
  query: string;
  variables?: unknown;
}): Promise<T> {
  const response = await fetch(ADMIN_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': SHOPIFY_ADMIN_API_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify Admin API Error: ${response.status}`);
  }

  const { data, errors } = await response.json();

  if (errors) {
    console.error('Admin API errors:', errors);
    throw new Error(`GraphQL errors: ${JSON.stringify(errors)}`);
  }

  return data;
}

// Cancel Order Mutation
const CANCEL_ORDER_MUTATION = `
  mutation orderCancel($orderId: ID!, $reason: OrderCancelReason!, $refund: Boolean!, $restock: Boolean!) {
    orderCancel(orderId: $orderId, reason: $reason, refund: $refund, restock: $restock) {
      job {
        id
        done
      }
      orderCancelUserErrors {
        field
        message
      }
    }
  }
`;

// Close Order Mutation (for unpaid/pending orders)
const CLOSE_ORDER_MUTATION = `
  mutation orderClose($id: ID!) {
    orderClose(input: { id: $id }) {
      order {
        id
        closed
        closedAt
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// Get Order Query
const GET_ORDER_QUERY = `
  query getOrder($orderId: ID!) {
    order(id: $orderId) {
      id
      name
      cancelledAt
      cancelReason
      displayFinancialStatus
      displayFulfillmentStatus
      totalPriceSet {
        shopMoney {
          amount
          currencyCode
        }
      }
    }
  }
`;

// API Functions

export interface CancelOrderResult {
  success: boolean;
  errors: string[];
  order?: {
    id: string;
    cancelledAt: string | null;
    cancelReason: string | null;
  };
}

export async function cancelOrder(
  orderId: string,
  reason: 'CUSTOMER' | 'INVENTORY' | 'FRAUD' | 'DECLINED' | 'OTHER' = 'CUSTOMER',
  refund: boolean = true,
  restock: boolean = true
): Promise<CancelOrderResult> {
  try {
    // Ensure orderId is in GraphQL format
    let graphqlOrderId = orderId;
    if (!orderId.startsWith('gid://shopify/Order/')) {
      graphqlOrderId = `gid://shopify/Order/${orderId}`;
    }

    const response = await shopifyAdminFetch<{
      orderCancel: {
        job: {
          id: string;
          done: boolean;
        } | null;
        orderCancelUserErrors: Array<{
          field: string[] | null;
          message: string;
        }>;
      };
    }>({
      query: CANCEL_ORDER_MUTATION,
      variables: {
        orderId: graphqlOrderId,
        reason,
        refund,
        restock,
      },
    });

    const errors = response.orderCancel.orderCancelUserErrors.map((err) => err.message);

    if (errors.length > 0) {
      return {
        success: false,
        errors,
      };
    }

    return {
      success: true,
      errors: [],
      order: {
        id: graphqlOrderId,
        cancelledAt: new Date().toISOString(),
        cancelReason: reason,
      },
    };
  } catch (error) {
    console.error('Error canceling order:', error);
    return {
      success: false,
      errors: [error instanceof Error ? error.message : 'Failed to cancel order'],
    };
  }
}

export async function closeOrder(orderId: string): Promise<CancelOrderResult> {
  try {
    // Ensure orderId is in GraphQL format
    let graphqlOrderId = orderId;
    if (!orderId.startsWith('gid://shopify/Order/')) {
      graphqlOrderId = `gid://shopify/Order/${orderId}`;
    }

    const response = await shopifyAdminFetch<{
      orderClose: {
        order: {
          id: string;
          closed: boolean;
          closedAt: string | null;
        } | null;
        userErrors: Array<{
          field: string[] | null;
          message: string;
        }>;
      };
    }>({
      query: CLOSE_ORDER_MUTATION,
      variables: {
        id: graphqlOrderId,
      },
    });

    const errors = response.orderClose.userErrors.map((err) => err.message);

    if (errors.length > 0) {
      return {
        success: false,
        errors,
      };
    }

    return {
      success: true,
      errors: [],
      order: {
        id: graphqlOrderId,
        cancelledAt: response.orderClose.order?.closedAt || new Date().toISOString(),
        cancelReason: 'CUSTOMER',
      },
    };
  } catch (error) {
    console.error('Error closing order:', error);
    return {
      success: false,
      errors: [error instanceof Error ? error.message : 'Failed to close order'],
    };
  }
}

export async function getOrderDetails(orderId: string) {
  try {
    // Ensure orderId is in GraphQL format
    let graphqlOrderId = orderId;
    if (!orderId.startsWith('gid://shopify/Order/')) {
      graphqlOrderId = `gid://shopify/Order/${orderId}`;
    }

    const response = await shopifyAdminFetch<{
      order: {
        id: string;
        name: string;
        cancelledAt: string | null;
        cancelReason: string | null;
        displayFinancialStatus: string;
        displayFulfillmentStatus: string;
        totalPriceSet: {
          shopMoney: {
            amount: string;
            currencyCode: string;
          };
        };
      } | null;
    }>({
      query: GET_ORDER_QUERY,
      variables: { orderId: graphqlOrderId },
    });

    return response.order;
  } catch (error) {
    console.error('Error fetching order details:', error);
    return null;
  }
}

// Helper: Check if order can be cancelled
export function canCancelOrder(order: {
  cancelledAt?: string | null;
  displayFulfillmentStatus?: string;
  displayFinancialStatus?: string;
}): boolean {
  // Can't cancel if already cancelled
  if (order.cancelledAt) {
    return false;
  }

  // Can't cancel if already fulfilled
  if (
    order.displayFulfillmentStatus === 'FULFILLED' ||
    order.displayFulfillmentStatus === 'DELIVERED'
  ) {
    return false;
  }

  // Can cancel if pending or partially fulfilled
  return true;
}