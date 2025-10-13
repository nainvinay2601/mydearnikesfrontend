

// "use client";

// import React from "react";
// import { SimpleProduct, ProductVariant } from "@/types/shopify";
// import { useCartStore } from "@/store/cartStore";
// import { useAuthStore } from "@/store/authStore"; // NEW IMPORT
// import { Button } from "../ui/button";
// import { createCartCheckout } from "@/lib/shopify/checkout";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { toast } from "sonner";

// interface BuyNowProps {
//   product: SimpleProduct;
//   selectedVariant?: ProductVariant | null;
//   quantity: number;
// }

// const BuyNow = ({ product, selectedVariant, quantity }: BuyNowProps) => {
//   const { addToCart, isLoading, clearError } = useCartStore();
//   const { accessToken, isAuthenticated, checkAndRenewToken } = useAuthStore(); // NEW
//   const [checkoutLoading, setCheckoutLoading] = React.useState(false);
//   const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);

//   const handleBuyNow = async () => {
//     if (!selectedVariant) {
//       toast.error("Please select size and color first");
//       return;
//     }

//     if (!selectedVariant.availableForSale) {
//       toast.error("This variant is currently out of stock");
//       return;
//     }

//     try {
//       clearError();

//       // NEW: Check and renew token if authenticated
//       if (isAuthenticated) {
//         await checkAndRenewToken();
//       }

//       // Add to local cart with selected quantity
//       await addToCart(selectedVariant, quantity, product.title, product.id);

//       // Show confirmation dialog
//       setShowConfirmDialog(true);
//     } catch (error) {
//       console.error("Failed to add to cart:", error);
//       toast.error("Failed to add item to cart");
//     }
//   };

//   const proceedToCheckout = async () => {
//     if (!selectedVariant) return;

//     try {
//       setCheckoutLoading(true);
//       setShowConfirmDialog(false);

//       console.log(
//         `Creating Cart checkout for ${quantity}x variant:`,
//         selectedVariant.id
//       );

//       // NEW: Pass customer access token if authenticated
//       const cart = await createCartCheckout(
//         selectedVariant.id,
//         quantity,
//         isAuthenticated ? accessToken || undefined : undefined
//       );

//       console.log("Cart created with checkout URL:", cart.checkoutUrl);

//       // Show info about checkout type
//       if (isAuthenticated) {
//         toast.success("Redirecting to checkout with your account info");
//       } else {
//         toast.info("Proceeding as guest. Login for faster checkout!");
//       }

//       // Redirect to Shopify checkout
//       window.location.href = cart.checkoutUrl;
//     } catch (error) {
//       console.error("Cart API Buy now failed:", error);
//       const errorMessage =
//         error instanceof Error ? error.message : String(error);
//       toast.error(`Checkout failed: ${errorMessage}`);
//       setCheckoutLoading(false);
//     }
//   };

//   const isOutOfStock =
//     !product.availableForSale ||
//     (selectedVariant && !selectedVariant.availableForSale);
//   const needsSelection =
//     !selectedVariant && (product.variants?.length || 0) > 1;

//   const itemPrice = selectedVariant
//     ? parseFloat(selectedVariant.price.amount)
//     : 0;
//   const totalPrice = itemPrice * quantity;

//   return (
//     <>
//       <div className="pt-3 px-[8px]">
//         <Button
//           className="rounded-none w-full"
//           onClick={handleBuyNow}
//           disabled={
//             isOutOfStock || needsSelection || isLoading || checkoutLoading
//           }
//         >
//           {checkoutLoading
//             ? "Creating Cart..."
//             : isLoading
//             ? "Adding to Cart..."
//             : isOutOfStock
//             ? "Out of Stock"
//             : needsSelection
//             ? "Select Options"
//             : `Buy Now (${quantity})`}
//         </Button>
//       </div>

//       <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle className="font-inter tracking-tight">
//               Proceed to Checkout?
//             </AlertDialogTitle>
//             <AlertDialogDescription className="space-y-2">
//               <div className="pt-1 space-y-1">
//                 <p>
//                   <span className="font-medium text-black">Item:</span>{" "}
//                   <span className="capitalize">{product.title}</span>
//                 </p>
//                 <p>
//                   <span className="font-medium text-black">Variant:</span>{" "}
//                   {selectedVariant?.title}
//                 </p>
//                 <p>
//                   <span className="font-medium text-black">Quantity:</span> {quantity}
//                 </p>
//                 <p className="text-md text-black font-semibold pt-2">
//                   Total: ₹{totalPrice.toFixed(2)}
//                 </p>
                
//                 {/* NEW: Show login hint for guest users */}
//                 {!isAuthenticated && (
//                   <p className="text-xs text-blue-600 pt-2">
//                     💡 Tip: <a href="/login" className="underline">Login</a> for faster checkout with saved addresses
//                   </p>
//                 )}
//               </div>
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction onClick={proceedToCheckout}>
//               Continue to Checkout
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </>
//   );
// };

// export default BuyNow;

"use client";

import React from "react";
import { SimpleProduct, ProductVariant } from "@/types/shopify";
import { useAuthStore } from "@/store/authStore";
import { Button } from "../ui/button";
import { createCartCheckout } from "@/lib/shopify/checkout";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface BuyNowProps {
  product: SimpleProduct;
  selectedVariant?: ProductVariant | null;
  quantity: number;
}

const BuyNow = ({ product, selectedVariant, quantity }: BuyNowProps) => {
  const { accessToken, isAuthenticated, checkAndRenewToken } = useAuthStore();
  const [checkoutLoading, setCheckoutLoading] = React.useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);

  const handleBuyNow = async () => {
    if (!selectedVariant) {
      toast.error("Please select size and color first");
      return;
    }

    if (!selectedVariant.availableForSale) {
      toast.error("This variant is currently out of stock");
      return;
    }

    try {
      // Check and renew token if authenticated
      if (isAuthenticated) {
        await checkAndRenewToken();
      }

      // Show confirmation dialog without adding to cart
      setShowConfirmDialog(true);
    } catch (error) {
      console.error("Failed to prepare checkout:", error);
      toast.error("Failed to prepare checkout");
    }
  };

  const proceedToCheckout = async () => {
    if (!selectedVariant) return;

    try {
      setCheckoutLoading(true);
      setShowConfirmDialog(false);

      console.log(
        `Creating direct checkout for ${quantity}x variant:`,
        selectedVariant.id
      );

      // Create checkout directly without adding to persistent cart
      const cart = await createCartCheckout(
        selectedVariant.id,
        quantity,
        isAuthenticated ? accessToken || undefined : undefined
      );

      console.log("Checkout created with URL:", cart.checkoutUrl);

      // Show info about checkout type
      if (isAuthenticated) {
        toast.success("Redirecting to checkout with your account info");
      } else {
        toast.info("Proceeding as guest. Login for faster checkout!");
      }

      // Redirect to Shopify checkout
      window.location.href = cart.checkoutUrl;
    } catch (error) {
      console.error("Buy now checkout failed:", error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      toast.error(`Checkout failed: ${errorMessage}`);
      setCheckoutLoading(false);
    }
  };

  const isOutOfStock =
    !product.availableForSale ||
    (selectedVariant && !selectedVariant.availableForSale);
  const needsSelection =
    !selectedVariant && (product.variants?.length || 0) > 1;

  const itemPrice = selectedVariant
    ? parseFloat(selectedVariant.price.amount)
    : 0;
  const totalPrice = itemPrice * quantity;

  return (
    <>
      <div className="pt-3 px-[8px]">
        <Button
          className="rounded-none w-full"
          onClick={handleBuyNow}
          disabled={isOutOfStock || needsSelection || checkoutLoading}
        >
          {checkoutLoading
            ? "Creating Checkout..."
            : isOutOfStock
            ? "Out of Stock"
            : needsSelection
            ? "Select Options"
            : `Buy Now (${quantity})`}
        </Button>
      </div>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-inter tracking-tight">
              Proceed to Checkout?
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <div className="pt-1 space-y-1">
                <p>
                  <span className="font-medium text-black">Item:</span>{" "}
                  <span className="capitalize">{product.title}</span>
                </p>
                <p>
                  <span className="font-medium text-black">Variant:</span>{" "}
                  {selectedVariant?.title}
                </p>
                <p>
                  <span className="font-medium text-black">Quantity:</span> {quantity}
                </p>
                <p className="text-md text-black font-semibold pt-2">
                  Total: ₹{totalPrice.toFixed(2)}
                </p>
                
                {!isAuthenticated && (
                  <p className="text-xs text-blue-600 pt-2">
                    💡 Tip: <a href="/login" className="underline">Login</a> for faster checkout with saved addresses
                  </p>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={proceedToCheckout}>
              Continue to Checkout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BuyNow;