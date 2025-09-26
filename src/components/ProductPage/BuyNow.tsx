// "use client";

// import React from "react";
// import { SimpleProduct, ProductVariant } from "@/types/shopify";
// import { useCartStore } from "@/store/cartStore";
// import { Button } from "../ui/button";
// import { createCartCheckout } from "@/lib/shopify/checkout";

// interface BuyNowProps {
//   product: SimpleProduct;
//   selectedVariant?: ProductVariant | null;
// }

// const BuyNow = ({ product, selectedVariant }: BuyNowProps) => {
//   const { addToCart, isLoading, clearError } = useCartStore();
//   const [checkoutLoading, setCheckoutLoading] = React.useState(false);

//   const handleBuyNow = async () => {
//     if (!selectedVariant) {
//       alert("Please select size and color first");
//       return;
//     }

//     if (!selectedVariant.availableForSale) {
//       alert("This variant is currently out of stock");
//       return;
//     }

//     try {
//       setCheckoutLoading(true);
//       clearError();

//       const itemPrice = parseFloat(selectedVariant.price.amount);

//       // Add to local cart
//       await addToCart(selectedVariant, 1, product.title);

//       const confirmed = confirm(
//         `Proceed to Shopify checkout?\n\nItem: ${product.title}\nVariant: ${
//           selectedVariant.title
//         }\nPrice: ₹${itemPrice.toFixed(2)}\n\nUsing modern Cart API`
//       );

//       if (confirmed) {
//         console.log(
//           "Creating Cart API checkout for variant:",
//           selectedVariant.id
//         );

//         // Use Cart API instead of deprecated checkout
//         const cart = await createCartCheckout(selectedVariant.id, 1);

//         console.log("Cart created with checkout URL:", cart.checkoutUrl);

//         // Redirect to Shopify checkout
//         window.location.href = cart.checkoutUrl;
//       }
//     } catch (error) {
//       console.error("Cart API Buy now failed:", error);
//       alert(
//         `Checkout failed: ${
//           error.message || error
//         }\n\nCheck console for details.`
//       );
//     } finally {
//       setCheckoutLoading(false);
//     }
//   };

//   const isOutOfStock =
//     !product.availableForSale ||
//     (selectedVariant && !selectedVariant.availableForSale);
//   const needsSelection =
//     !selectedVariant && (product.variants?.length || 0) > 1;

//   return (
//     <div className="pt-3 px-[8px]">
//       <Button
//         className="rounded-none w-full"
//         onClick={handleBuyNow}
//         disabled={
//           isOutOfStock || needsSelection || isLoading || checkoutLoading
//         }
//       >
//         {checkoutLoading
//           ? "Creating Cart..."
//           : isLoading
//           ? "Adding to Cart..."
//           : isOutOfStock
//           ? "Out of Stock"
//           : needsSelection
//           ? "Select Options"
//           : "Buy Now"}
//       </Button>
//     </div>
//   );
// };

// export default BuyNow;

// "use client";

// import React from "react";
// import { SimpleProduct, ProductVariant } from "@/types/shopify";
// import { useCartStore } from "@/store/cartStore";
// import { Button } from "../ui/button";
// import { createCartCheckout } from "@/lib/shopify/checkout";

// interface BuyNowProps {
//   product: SimpleProduct;
//   selectedVariant?: ProductVariant | null;
//   quantity: number; // Add quantity prop
// }

// const BuyNow = ({ product, selectedVariant, quantity }: BuyNowProps) => {
//   const { addToCart, isLoading, clearError } = useCartStore();
//   const [checkoutLoading, setCheckoutLoading] = React.useState(false);

//   const handleBuyNow = async () => {
//     if (!selectedVariant) {
//       alert("Please select size and color first");
//       return;
//     }

//     if (!selectedVariant.availableForSale) {
//       alert("This variant is currently out of stock");
//       return;
//     }

//     try {
//       setCheckoutLoading(true);
//       clearError();

//       console.log("About to call createCartCheckout with quantity:", quantity);

//       // Use a local variable to be absolutely sure
//       const quantityToSend = Number(quantity);
//       console.log("Quantity after Number conversion:", quantityToSend);

//       const itemPrice = parseFloat(selectedVariant.price.amount);
//       const totalPrice = itemPrice * quantity;

//       // Add to local cart with selected quantity
//       await addToCart(selectedVariant, quantity, product.title);

//       const confirmed = confirm(
//         `Proceed to Shopify checkout?\n\nItem: ${product.title}\nVariant: ${
//           selectedVariant.title
//         }\nQuantity: ${quantity}\nTotal: ₹${totalPrice.toFixed(2)}`
//       );

//       if (confirmed) {
//         console.log(
//           `Creating Cart checkout for ${quantity}x variant:`,
//           selectedVariant.id
//         );

//         // Use Cart API with selected quantity
//         const cart = await createCartCheckout(selectedVariant.id, quantity);

//         console.log("Cart created with checkout URL:", cart.checkoutUrl);

//         // Redirect to Shopify checkout
//         window.location.href = cart.checkoutUrl;
//       }
//     } catch (error) {
//       console.error("Cart API Buy now failed:", error);
//       alert(
//         `Checkout failed: ${
//           error.message || error
//         }\n\nCheck console for details.`
//       );
//     } finally {
//       setCheckoutLoading(false);
//     }
//   };

//   const isOutOfStock =
//     !product.availableForSale ||
//     (selectedVariant && !selectedVariant.availableForSale);
//   const needsSelection =
//     !selectedVariant && (product.variants?.length || 0) > 1;

//   return (
//     <div className="pt-3 px-[8px]">
//       <Button
//         className="rounded-none w-full"
//         onClick={handleBuyNow}
//         disabled={
//           isOutOfStock || needsSelection || isLoading || checkoutLoading
//         }
//       >
//         {checkoutLoading
//           ? "Creating Cart..."
//           : isLoading
//           ? "Adding to Cart..."
//           : isOutOfStock
//           ? "Out of Stock"
//           : needsSelection
//           ? "Select Options"
//           : `Buy Now (${quantity})`}
//       </Button>
//     </div>
//   );
// };

// export default BuyNow;
"use client";

import React from "react";
import { SimpleProduct, ProductVariant } from "@/types/shopify";
import { useCartStore } from "@/store/cartStore";
import { Button } from "../ui/button";
import { createCartCheckout } from "@/lib/shopify/checkout";

interface BuyNowProps {
  product: SimpleProduct;
  selectedVariant?: ProductVariant | null;
  quantity: number; // Add quantity prop
}

const BuyNow = ({ product, selectedVariant, quantity }: BuyNowProps) => {
  const { addToCart, isLoading, clearError } = useCartStore();
  const [checkoutLoading, setCheckoutLoading] = React.useState(false);

  const handleBuyNow = async () => {
    if (!selectedVariant) {
      alert("Please select size and color first");
      return;
    }

    if (!selectedVariant.availableForSale) {
      alert("This variant is currently out of stock");
      return;
    }

    try {
      setCheckoutLoading(true);
      clearError();

      const itemPrice = parseFloat(selectedVariant.price.amount);
      const totalPrice = itemPrice * quantity;

      // Add to local cart with selected quantity
      await addToCart(selectedVariant, quantity, product.title, product.id);

      const confirmed = confirm(
        `Proceed to Shopify checkout?\n\nItem: ${product.title}\nVariant: ${
          selectedVariant.title
        }\nQuantity: ${quantity}\nTotal: ₹${totalPrice.toFixed(2)}`
      );

      if (confirmed) {
        console.log(
          `Creating Cart checkout for ${quantity}x variant:`,
          selectedVariant.id
        );

        // Use Cart API with selected quantity
        const cart = await createCartCheckout(selectedVariant.id, quantity);

        console.log("Cart created with checkout URL:", cart.checkoutUrl);

        // Redirect to Shopify checkout
        window.location.href = cart.checkoutUrl;
      }
    } catch (error) {
      console.error("Cart API Buy now failed:", error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      alert(`Checkout failed: ${errorMessage}\n\nCheck console for details.`);
    } finally {
      setCheckoutLoading(false);
    }
  };

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
        disabled={
          isOutOfStock || needsSelection || isLoading || checkoutLoading
        }
      >
        {checkoutLoading
          ? "Creating Cart..."
          : isLoading
          ? "Adding to Cart..."
          : isOutOfStock
          ? "Out of Stock"
          : needsSelection
          ? "Select Options"
          : `Buy Now (${quantity})`}
      </Button>
    </div>
  );
};

export default BuyNow;
