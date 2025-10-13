import { NextRequest, NextResponse } from 'next/server';
import { cancelOrder, closeOrder, getOrderDetails } from '@/lib/shopify/shopify-admin';
import { getCustomer } from '@/lib/shopify/shopify-auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, customerAccessToken, reason = 'CUSTOMER' } = body;

    console.log('📥 Cancel order request received:', {
      orderId,
      reason,
      hasToken: !!customerAccessToken
    });

    // Validate required fields
    if (!orderId || !customerAccessToken) {
      console.error('❌ Missing required fields');
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify customer owns this order
    console.log('🔐 Fetching customer details...');
    const customer = await getCustomer(customerAccessToken);
    
    if (!customer) {
      console.error('❌ Customer not found or invalid token');
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('✅ Customer authenticated:', {
      customerId: customer.id,
      email: customer.email
    });

    // Extract numeric ID from Shopify GID format and remove query params
    const numericOrderId = orderId.split('/').pop()?.split('?')[0];

    if (!numericOrderId) {
      console.error('❌ Invalid order ID format:', orderId);
      return NextResponse.json(
        { success: false, error: 'Invalid order ID format' },
        { status: 400 }
      );
    }

    console.log('🔢 Extracted order ID:', {
      original: orderId,
      numeric: numericOrderId
    });

    // Get order details to verify ownership
    console.log('📦 Fetching order details from Admin API...');
    const orderDetails = await getOrderDetails(numericOrderId);

    if (!orderDetails) {
      console.error('❌ Order not found in Admin API');
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    console.log('✅ Order details fetched:', {
      orderId: orderDetails.id,
      name: orderDetails.name,
      financialStatus: orderDetails.displayFinancialStatus,
      fulfillmentStatus: orderDetails.displayFulfillmentStatus,
      cancelledAt: orderDetails.cancelledAt
    });

    // Verify customer owns this order by checking if order exists in customer's orders
    const customerOwnsOrder = customer.orders.edges.some(
      ({ node }) => node.id === orderId // Match the full GID format
    );

    console.log('🔍 Order ownership check:', {
      orderId,
      numericOrderId,
      orderName: orderDetails.name,
      customerOwnsOrder,
      customerOrderIds: customer.orders.edges.map(({ node }) => node.id)
    });

    if (!customerOwnsOrder) {
      console.error('❌ Customer does not own this order');
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Order does not belong to customer' },
        { status: 403 }
      );
    }

    console.log('✅ Order ownership verified');

    // Check if order can be cancelled
    if (orderDetails.cancelledAt) {
      console.error('❌ Order already cancelled at:', orderDetails.cancelledAt);
      return NextResponse.json(
        { success: false, error: 'Order already cancelled' },
        { status: 400 }
      );
    }

    if (
      orderDetails.displayFulfillmentStatus === 'FULFILLED' ||
      orderDetails.displayFulfillmentStatus === 'DELIVERED'
    ) {
      console.error('❌ Order already fulfilled/delivered');
      return NextResponse.json(
        { success: false, error: 'Cannot cancel fulfilled or delivered orders' },
        { status: 400 }
      );
    }

    // Determine which method to use based on payment status
    let result;
    if (orderDetails.displayFinancialStatus === 'PENDING') {
      console.log('💡 Using orderClose for pending payment');
      result = await closeOrder(numericOrderId);
    } else {
      console.log('💡 Using orderCancel with refund');
      result = await cancelOrder(numericOrderId, reason, true, true);
    }

    console.log('📋 Cancel/Close result:', {
      success: result.success,
      errors: result.errors,
      order: result.order
    });

    if (result.success) {
      console.log('✅ Order cancelled/closed successfully');
      return NextResponse.json({
        success: true,
        message: 'Order cancelled successfully',
        order: result.order,
      });
    } else {
      console.error('❌ Cancel/Close failed with errors:', result.errors);
      return NextResponse.json(
        { success: false, error: result.errors.join(', ') },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('💥 Cancel order API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}