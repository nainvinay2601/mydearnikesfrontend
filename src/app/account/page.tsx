"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function AccountPage() {
  const router = useRouter();
  const {
    customer,
    isAuthenticated,
    logout,
    refreshCustomer,
    checkAndRenewToken,
  } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    checkAndRenewToken();
    refreshCustomer();
  }, [isAuthenticated, router, refreshCustomer, checkAndRenewToken]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case "FULFILLED":
        return "bg-green-100 text-green-800";
      case "UNFULFILLED":
        return "bg-yellow-100 text-yellow-800";
      case "PARTIALLY_FULFILLED":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getFinancialStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "REFUNDED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!customer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-[60px] px-8">
        <div className="max-w-full mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-10 bg-gray-200 rounded w-1/3"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="h-48 bg-gray-200 rounded-lg"></div>
              <div className="h-48 bg-gray-200 rounded-lg lg:col-span-2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-16 px-[8px]">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-5">
          <h1 className="text-xl sm:text-xl font-semibold text-gray-900 mb-0 pt-4 font-inter tracking-tighter">
            Welcome back, {customer.firstName || customer.displayName}!
          </h1>
          <p className="text-gray-600 text-sm">{customer.email}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Account Info Card */}
          {/* <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <h2 className="text-sm font-semibold  text-gray-900 mb-4 flex items-center font-inter tracking-tight">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Account Info
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1 font-inter tracking-tight">
                  Contact
                </h3>
                <p className="text-gray-900 text-xs">{customer.email}</p>
                {customer.phone && (
                  <p className="text-gray-600">{customer.phone}</p>
                )}
              </div>
            </div>
          </div> */}

          {/* Default Address Card */}
          {customer.defaultAddress && (
            <div className="   ">
              <h2 className="text-sm font-semibold  text-gray-900 mb-2 flex items-center font-inter tracking-tight ">
                {/* <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg> */}
                Default Address
              </h2>
              <div className="text-gray-900 text-xs ">
                <p className="font-medium text-md ">
                  {customer.defaultAddress.firstName}{" "}
                  {customer.defaultAddress.lastName}
                </p>
                <p className="text-gray-600 mt-1 ">
                  {customer.defaultAddress.address1}
                </p>
                {customer.defaultAddress.address2 && (
                  <p className="text-gray-600">
                    {customer.defaultAddress.address2}
                  </p>
                )}
                <p className="text-gray-600">
                  {customer.defaultAddress.city},{" "}
                  {customer.defaultAddress.province}{" "}
                  {customer.defaultAddress.zip}
                </p>
                <p className="text-gray-600">
                  {customer.defaultAddress.country}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-8 border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900 mb-6 flex items-center font-inter tracking-tight ">
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            Recent Orders
          </h2>

          {customer.orders.edges.length > 0 ? (
            <div className="space-y-4">
              {customer.orders.edges.slice(0, 10).map(({ node: order }) => {
                const isCancelledOrClosed =
                  order.canceledAt || order.cancelledAt || order.closed;

                return (
                  <div
                    key={order.id}
                    className="border border-gray-200 rounded-lg p-4 sm:p-2 hover:border-gray-300 transition-all hover:shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <p className="text-sm font-bold text-gray-900">
                            Order #{order.orderNumber}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <span
                              className={`text-xs px-2.5 py-1 rounded-full font-medium ${getOrderStatusColor(
                                order.fulfillmentStatus
                              )}`}
                            >
                              {order.fulfillmentStatus || "Processing"}
                            </span>
                            <span
                              className={`text-xs px-2.5 py-1 rounded-full font-medium ${getFinancialStatusColor(
                                order.financialStatus
                              )}`}
                            >
                              {order.financialStatus}
                            </span>
                            {isCancelledOrClosed && (
                              <span className="text-xs px-2.5 py-1 rounded-full bg-red-100 text-red-800 font-medium">
                                {order.closed ? "Archived" : "Cancelled"}
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {new Date(order.processedAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-md font-medium text-gray-900">
                          ₹{parseFloat(order.totalPrice.amount).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Product Images */}
                    <div className="flex gap-3 mb-4 overflow-x-auto pb-2">
                      {order.lineItems.edges
                        .slice(0, 4)
                        .map(({ node: item }, index) => (
                          <div
                            key={`${order.id}-${item.title}-${index}`}
                            className="flex-shrink-0"
                          >
                            {item.variant.image ? (
                              <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                                <Image
                                  src={item.variant.image.url}
                                  alt={item.variant.image.altText || item.title}
                                  fill
                                  className="object-cover"
                                  sizes="80px"
                                />
                              </div>
                            ) : (
                              <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                                <svg
                                  className="w-8 h-8 text-gray-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                        ))}
                      {order.lineItems.edges.length > 4 && (
                        <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">
                            +{order.lineItems.edges.length - 4}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Show cancelled/archived status */}
                    {isCancelledOrClosed && (
                      <p className="text-sm text-gray-500">
                        {order.closed ? "Archived" : "Cancelled"} on{" "}
                        {new Date(
                          order.canceledAt ||
                            order.cancelledAt ||
                            order.processedAt
                        ).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 text-gray-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <p className="text-gray-600 text-lg mb-4">
                You have not placed any orders yet
              </p>
              <button
                onClick={() => router.push("/")}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Start Shopping
              </button>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <div className="mt-8 flex justify-center pb-8">
          <Button
          variant={"default"}
            onClick={handleLogout}
            // className="px-8 py-3 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}