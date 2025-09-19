"use client";

// React and Next.js imports
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Library imports
import { Minus, Plus } from "lucide-react";

// Internal imports
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  // Get cart state and actions from Zustand store
  const {
    items,
    totalItems,
    updateQuantity,
    removeItem,
    getTotalPrice,
    clearCart,
  } = useCartStore();
  const router = useRouter();

  // Format price to Indian Rupees
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  // Handle checkout process (mock implementation)
  const handleCheckout = () => {
    const total = getTotalPrice();
    const confirmed = confirm(
      `Proceed to checkout?\nTotal: ${formatPrice(total)}`
    );

    if (confirmed) {
      alert("Redirecting to Shopify checkout...");
      // In real app: window.location.href = shopifyCheckoutUrl;
      clearCart(); // Clear cart after successful checkout
      router.push("/thank-you");
    }
  };

  // Show empty cart message if no items
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        <p className="text-gray-600 mb-6">Your cart is empty</p>
        <Button onClick={() => router.push("/")}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Your Cart ({totalItems} items)
      </h1>

      {/* Cart Items List */}
      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 border rounded-lg"
          >
            {/* Product Image */}
            {item.image && (
              <Image
                src={item.image.url}
                alt={item.image.altText || item.productTitle}
                width={80}
                height={80}
                className="rounded object-cover"
              />
            )}

            {/* Product Info */}
            <div className="flex-1">
              <h3 className="font-semibold">{item.productTitle}</h3>
              <p className="text-sm text-gray-600">{item.variantTitle}</p>
              <p className="font-medium">
                {formatPrice(parseFloat(item.price.amount))}
              </p>

              {/* Selected Options (Size, Color, etc.) */}
              <div className="text-xs text-gray-500 mt-1">
                {item.selectedOptions.map((option) => (
                  <span key={option.name} className="mr-2">
                    {option.name}: {option.value}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 border rounded flex items-center justify-center"
                disabled={item.quantity <= 1}
              >
                <Minus size={12} />
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 border rounded flex items-center justify-center"
              >
                <Plus size={12} />
              </button>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500 hover:text-red-700 ml-2 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Cart Summary and Checkout */}
      <div className="border-t pt-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-xl font-bold">
            {formatPrice(getTotalPrice())}
          </span>
        </div>

        <div className="space-y-3">
          <Button onClick={handleCheckout} className="w-full">
            Proceed to Checkout
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="w-full"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}
