// import React, { useState } from "react";
// import Image from "next/image";
// import { X, Minus, Plus } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useCartStore } from "@/store/cartStore";
// import { createCartWithItems } from "@/lib/shopify/checkout";

// interface CartDrawerProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
//   const {
//     items,
//     totalItems,
//     updateQuantity,
//     removeItem,
//     getTotalPrice,
//     clearCart,
//   } = useCartStore();
//   const [checkoutLoading, setCheckoutLoading] = useState(false);
//   const [discountCode, setDiscountCode] = useState("");

//   const formatPrice = (amount: number) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//     }).format(amount);
//   };

//   const handleShopifyCheckout = async () => {
//     if (items.length === 0) {
//       alert("Your cart is empty");
//       return;
//     }

//     try {
//       setCheckoutLoading(true);

//       console.log("Creating Shopify cart with items:", items);

//       const shopifyCart = await createCartWithItems(items);
//       console.log("Cart created successfully:", shopifyCart.checkoutUrl);

//       // Clear local cart and close drawer
//       clearCart();
//       onClose();

//       // Redirect to Shopify checkout
//       window.location.href = shopifyCart.checkoutUrl;
//     } catch (error) {
//       console.error("Checkout failed:", error);
//       const errorMessage =
//         error instanceof Error ? error.message : String(error);
//       alert(`Checkout failed: ${errorMessage}\n\nCheck console for details.`);
//     } finally {
//       setCheckoutLoading(false);
//     }
//   };

//   const applyDiscount = () => {
//     // Placeholder for discount functionality
//     alert("Discount codes will be applied at checkout");
//   };

//   return (
//     <>
//       {/* Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
//           onClick={onClose}
//         />
//       )}

//       {/* Cart Drawer */}
//       <div
//         className={`fixed top-0 right-0 h-[90vh] w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b">
//           <h2 className="text-lg font-semibold">Cart ({totalItems})</h2>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Cart Content */}
//         <div className="flex flex-col h-full">
//           {items.length === 0 ? (
//             /* Empty Cart */
//             <div className="flex-1 flex items-center justify-center p-8">
//               <div className="text-center">
//                 <div className="mb-4 text-6xl text-gray-300">🛒</div>
//                 <p className="text-gray-600 mb-4">Your cart is empty</p>
//                 <Button onClick={onClose} variant="outline">
//                   Continue Shopping
//                 </Button>
//               </div>
//             </div>
//           ) : (
//             <>
//               {/* Cart Items - Fixed height with scroll */}
//               <div
//                 className="flex-1 overflow-y-auto px-4 pt-4"
//                 style={{ maxHeight: "calc(100vh - 200px)" }}
//               >
//                 <div className="space-y-4 pb-4">
//                   {items.map((item) => (
//                     <div
//                       key={item.id}
//                       className="flex gap-3 pb-4 border-b border-gray-100"
//                     >
//                       {/* Product Image */}
//                       {item.image && (
//                         <div className="relative w-16 h-16 flex-shrink-0">
//                           <Image
//                             src={item.image.url}
//                             alt={item.image.altText || item.productTitle}
//                             fill
//                             className="object-cover rounded"
//                           />
//                         </div>
//                       )}

//                       {/* Product Details */}
//                       <div className="flex-1 min-w-0">
//                         <p className="font-medium text-sm truncate ">
//                           {item.productTitle}
//                         </p>
//                         <p className="text-xs text-gray-600 mb-1">
//                           {item.variantTitle}
//                         </p>

//                         {/* Selected Options */}

//                         {/* Price and Quantity Controls */}
//                         <div className="flex items-center justify-between">
//                           <span className="font-medium text-sm">
//                             {formatPrice(parseFloat(item.price.amount))}
//                           </span>

//                           {/* Quantity Controls */}
//                           <div className="flex items-center gap-2">
//                             <button
//                               onClick={() =>
//                                 updateQuantity(item.id, item.quantity - 1)
//                               }
//                               className="w-6 h-6 border rounded flex items-center justify-center hover:bg-gray-100 text-xs"
//                               disabled={item.quantity <= 1}
//                             >
//                               <Minus size={10} />
//                             </button>
//                             <span className="w-8 text-center text-sm font-medium">
//                               {item.quantity}
//                             </span>
//                             <button
//                               onClick={() =>
//                                 updateQuantity(item.id, item.quantity + 1)
//                               }
//                               className="w-6 h-6 border rounded flex items-center justify-center hover:bg-gray-100 text-xs"
//                             >
//                               <Plus size={10} />
//                             </button>
//                           </div>
//                         </div>

//                         {/* Remove Button */}
//                         <button
//                           onClick={() => removeItem(item.id)}
//                           className="text-xs text-red-500 hover:text-red-700 mt-1"
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Fixed Bottom Section */}
//               <div className="flex-shrink-0 bg-white border-t">
//                 {/* Discount Code Section */}
//                 <div className="p-4 border-b border-gray-100">
//                   <div className="flex gap-2">
//                     <input
//                       type="text"
//                       placeholder="Discount code"
//                       value={discountCode}
//                       onChange={(e) => setDiscountCode(e.target.value)}
//                       className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-black"
//                     />
//                     <Button
//                       onClick={applyDiscount}
//                       variant="outline"
//                       size="sm"
//                       className="text-xs"
//                     >
//                       APPLY
//                     </Button>
//                   </div>
//                 </div>

//                 {/* Cart Summary */}
//                 <div className="p-4 bg-gray-50">
//                   <div className="space-y-2 mb-4">
//                     <div className="flex justify-between text-sm">
//                       <span>Subtotal</span>
//                       <span>{formatPrice(getTotalPrice())}</span>
//                     </div>
//                     <div className="text-xs text-gray-600">
//                       Free express shipping. Duties and taxes will be calculated
//                       at checkout.
//                     </div>
//                   </div>

//                   {/* Checkout Button */}
//                   <Button
//                     onClick={handleShopifyCheckout}
//                     className="w-full"
//                     disabled={checkoutLoading}
//                   >
//                     {checkoutLoading
//                       ? "Creating Checkout..."
//                       : "Proceed to checkout →"}
//                   </Button>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default CartDrawer;
import React, { useState } from "react";
import Image from "next/image";
import { X, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { createCartWithItems } from "@/lib/shopify/checkout";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const {
    items,
    totalItems,
    updateQuantity,
    removeItem,
    getTotalPrice,
    clearCart,
  } = useCartStore();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [discountCode, setDiscountCode] = useState("");

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const handleShopifyCheckout = async () => {
    if (items.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
      setCheckoutLoading(true);

      console.log("Creating Shopify cart with items:", items);

      const shopifyCart = await createCartWithItems(items);
      console.log("Cart created successfully:", shopifyCart.checkoutUrl);

      // Clear local cart and close drawer
      clearCart();
      onClose();

      // Redirect to Shopify checkout
      window.location.href = shopifyCart.checkoutUrl;
    } catch (error) {
      console.error("Checkout failed:", error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      alert(`Checkout failed: ${errorMessage}\n\nCheck console for details.`);
    } finally {
      setCheckoutLoading(false);
    }
  };

  const applyDiscount = () => {
    // Placeholder for discount functionality
    alert("Discount codes will be applied at checkout");
  };

  return (
    <>
      {/* Backdrop overlay with blur */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 ${
          items.length === 0 ? "h-screen" : "h-[92vh]"
        } w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className=" text-[28px] md:text-[36px] font-semibold">Cart ({totalItems})</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            /* Empty Cart */
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center">
                <div className="mb-4 text-6xl text-gray-300">🛒</div>
                <p className="text-gray-600 mb-4">Your cart is empty</p>
                <Button onClick={onClose} variant="outline">
                  Continue Shopping
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Cart Items - Fixed height with scroll */}
              <div
                className="flex-1 overflow-y-auto px-4 pt-4"
                style={{ maxHeight: "calc(100vh - 100px)" }}
              >
                <div className="space-y-4 pb-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 pb-4 border-b border-gray-100"
                    >
                      {/* Product Image */}
                      {item.image && (
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={item.image.url}
                            alt={item.image.altText || item.productTitle}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                      )}

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate ">
                          {item.productTitle}
                        </p>
                        <p className="text-xs text-gray-600 mb-1">
                          {item.variantTitle}
                        </p>

                        {/* Price and Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">
                            {formatPrice(parseFloat(item.price.amount))}
                          </span>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-6 h-6 border rounded flex items-center justify-center hover:bg-gray-100 text-xs"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={10} />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-6 h-6 border rounded flex items-center justify-center hover:bg-gray-100 text-xs"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-xs text-red-500 hover:text-red-700 mt-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fixed Bottom Section */}
              <div className="flex-shrink-0 bg-white border-t">
                {/* Discount Code Section */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Discount code"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    <Button
                      onClick={applyDiscount}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      APPLY
                    </Button>
                  </div>
                </div>

                {/* Cart Summary */}
                <div className="p-4 bg-gray-50">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>{formatPrice(getTotalPrice())}</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Free express shipping. Duties and taxes will be calculated
                      at checkout.
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Button
                    onClick={handleShopifyCheckout}
                    className="w-full"
                    disabled={checkoutLoading}
                  >
                    {checkoutLoading
                      ? "Creating Checkout..."
                      : "Proceed to checkout →"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;