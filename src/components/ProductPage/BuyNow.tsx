"use client";
import { SimpleProduct, ProductVariant } from "@/types/shopify";
import { useCartStore } from "@/store/cartStore";
import { Button } from "../ui/button";

interface BuyNowProps {
  product: SimpleProduct;
  selectedVariant?: ProductVariant | null;
}

const BuyNow = ({ product, selectedVariant }: BuyNowProps) => {
  const { addToCart, items, getTotalPrice, isLoading, clearError } =
    useCartStore();

  // Handle buy now flow: add to cart + checkout
  const handleBuyNow = async () => {
    // Validate variant selection
    if (!selectedVariant) {
      alert("Please select size and color first");
      return;
    }

    if (!selectedVariant.availableForSale) {
      alert("This variant is currently out of stock");
      return;
    }

    try {
      clearError();
      // Add item to cart
      // await addToCart(selectedVariant, 1, product.title);

      // Calculate total and show checkout confirmation
      const itemPrice = parseFloat(selectedVariant.price.amount);
      // add item to cart
      await addToCart(selectedVariant, 1, product.title);

      const confirmed = confirm(
        `Proceed to checkout?\nTotal: ₹${itemPrice.toFixed(2)}`
      );

      if (confirmed) {
        alert(
          "Redirecting to checkout... (In real app, this would go to Shopify checkout)"
        );

        const checkoutUrl = createShopifyCheckoutUrl(selectedVariant.id, 1);
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Buy now error:", error);
      alert("Failed to proceed to checkout. Please try again.");
    }
  };

  const createShopifyCheckoutUrl = (variantId: string, quantity: number) => {
    const shopDomain = "mydearnikess.myshopify.com";
    return `https://${shopDomain}/cart/${variantId}:${quantity}`;
  };

  // Determine button state
  const isOutOfStock =
    !product.availableForSale ||
    (selectedVariant && !selectedVariant.availableForSale);
  const needsSelection =
    !selectedVariant && (product.variants?.length || 0) > 1;

  return (
    <div className="pt-3 px-[8px]">
      <Button
        className="rounded-none w-full"
        onClick={handleBuyNow}
        disabled={isOutOfStock || needsSelection || isLoading}
      >
        {isLoading
          ? "Processing..."
          : isOutOfStock
          ? "Out of Stock"
          : needsSelection
          ? "Select Options"
          : "Buy Now"}
      </Button>
    </div>
  );
};

export default BuyNow;
