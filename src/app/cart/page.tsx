// "use client";

// // React and Next.js imports
// import React from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

// // Library imports
// import { Minus, Plus } from "lucide-react";

// // Internal imports
// import { useCartStore } from "@/store/cartStore";
// import { Button } from "@/components/ui/button";

// export default function CartPage() {
//   // Get cart state and actions from Zustand store
//   const {
//     items,
//     totalItems,
//     updateQuantity,
//     removeItem,
//     getTotalPrice,
//     clearCart,
//   } = useCartStore();
//   const router = useRouter();

//   // Format price to Indian Rupees
//   const formatPrice = (amount: number) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//     }).format(amount);
//   };

//   // Handle checkout process (mock implementation)
//   const handleCheckout = () => {
//     const total = getTotalPrice();
//     const confirmed = confirm(
//       `Proceed to checkout?\nTotal: ${formatPrice(total)}`
//     );

//     if (confirmed) {
//       alert("Redirecting to Shopify checkout...");
//       // In real app: window.location.href = shopifyCheckoutUrl;
//       clearCart(); // Clear cart after successful checkout
//       router.push("/thank-you");
//     }
//   };

//   // Show empty cart message if no items
//   if (items.length === 0) {
//     return (
//       <div className="container mx-auto px-4 py-16 text-center">
//         <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
//         <p className="text-gray-600 mb-6">Your cart is empty</p>
//         <Button onClick={() => router.push("/")}>Continue Shopping</Button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">
//         Your Cart ({totalItems} items)
//       </h1>

//       {/* Cart Items List */}
//       <div className="space-y-4 mb-8">
//         {items.map((item) => (
//           <div
//             key={item.id}
//             className="flex items-center gap-4 p-4 border rounded-lg"
//           >
//             {/* Product Image */}
//             {item.image && (
//               <Image
//                 src={item.image.url}
//                 alt={item.image.altText || item.productTitle}
//                 width={80}
//                 height={80}
//                 className="rounded object-cover"
//               />
//             )}

//             {/* Product Info */}
//             <div className="flex-1">
//               <h3 className="font-semibold">{item.productTitle}</h3>
//               <p className="text-sm text-gray-600">{item.variantTitle}</p>
//               <p className="font-medium">
//                 {formatPrice(parseFloat(item.price.amount))}
//               </p>

//               {/* Selected Options (Size, Color, etc.) */}
//               <div className="text-xs text-gray-500 mt-1">
//                 {item.selectedOptions.map((option) => (
//                   <span key={option.name} className="mr-2">
//                     {option.name}: {option.value}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Quantity Controls */}
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                 className="w-8 h-8 border rounded flex items-center justify-center"
//                 disabled={item.quantity <= 1}
//               >
//                 <Minus size={12} />
//               </button>
//               <span className="w-8 text-center">{item.quantity}</span>
//               <button
//                 onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                 className="w-8 h-8 border rounded flex items-center justify-center"
//               >
//                 <Plus size={12} />
//               </button>
//             </div>

//             {/* Remove Button */}
//             <button
//               onClick={() => removeItem(item.id)}
//               className="text-red-500 hover:text-red-700 ml-2 text-sm"
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Cart Summary and Checkout */}
//       <div className="border-t pt-6">
//         <div className="flex justify-between items-center mb-4">
//           <span className="text-lg font-semibold">Total:</span>
//           <span className="text-xl font-bold">
//             {formatPrice(getTotalPrice())}
//           </span>
//         </div>

//         <div className="space-y-3">
//           <Button onClick={handleCheckout} className="w-full">
//             Proceed to Checkout
//           </Button>
//           <Button
//             variant="outline"
//             onClick={() => router.push("/")}
//             className="w-full"
//           >
//             Continue Shopping
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import { createCartWithItems } from '@/lib/shopify/checkout';

export default function CartPage() {
  const { items, totalItems, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore();
  const router = useRouter();
  const [checkoutLoading, setCheckoutLoading] = React.useState(false);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const handleShopifyCheckout = async () => {
    if (items.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
      setCheckoutLoading(true);
      
      const total = getTotalPrice();
      const itemCount = totalItems;
      
      console.log("Cart items for checkout:", items);
      
      const confirmed = confirm(
        `Proceed to Shopify checkout?\n\nItems: ${itemCount}\nTotal: ${formatPrice(total)}\n\nYou will be redirected to secure Shopify checkout.`
      );
      
      if (confirmed) {
        console.log('Creating Shopify cart with all items:', items);
        
        // Create Shopify cart with all items using Cart API
        const shopifyCart = await createCartWithItems(items);
        
        console.log('Shopify cart created successfully:', shopifyCart.checkoutUrl);
        
        // Clear local cart after successful checkout creation
        clearCart();
        
        // Redirect to Shopify checkout
        window.location.href = shopifyCart.checkoutUrl;
      }
      
    } catch (error) {
      console.error('Shopify checkout failed:', error);
      alert(`Checkout failed: ${error.message || 'Please try again'}\n\nCheck console for details.`);
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        <p className="text-gray-600 mb-6">Your cart is empty</p>
        <Button onClick={() => router.push('/')}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart ({totalItems} items)</h1>
      
      {/* Cart Items List */}
      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
            {item.image && (
              <Image 
                src={item.image.url} 
                alt={item.image.altText || item.productTitle}
                width={80}
                height={80}
                className="rounded object-cover"
              />
            )}
            
            <div className="flex-1">
              <h3 className="font-semibold">{item.productTitle}</h3>
              <p className="text-sm text-gray-600">{item.variantTitle}</p>
              <p className="font-medium">
                {formatPrice(parseFloat(item.price.amount))} each
              </p>
              <p className="text-sm text-gray-500">
                Subtotal: {formatPrice(parseFloat(item.price.amount) * item.quantity)}
              </p>
              
              <div className="text-xs text-gray-500 mt-1">
                {item.selectedOptions.map(option => (
                  <span key={option.name} className="mr-2">
                    {option.name}: {option.value}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100"
                disabled={item.quantity <= 1}
              >
                <Minus size={12} />
              </button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100"
              >
                <Plus size={12} />
              </button>
            </div>
            
            <button 
              onClick={() => removeItem(item.id)}
              className="text-red-500 hover:text-red-700 ml-2 text-sm underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      
      {/* Cart Summary and Checkout */}
      <div className="border-t pt-6">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center text-sm">
            <span>Items ({totalItems}):</span>
            <span>{formatPrice(getTotalPrice())}</span>
          </div>
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total:</span>
            <span>{formatPrice(getTotalPrice())}</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <Button 
            onClick={handleShopifyCheckout} 
            className="w-full text-lg py-3"
            disabled={checkoutLoading}
          >
            {checkoutLoading ? "Creating Checkout..." : "Proceed to Shopify Checkout"}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => router.push('/')} 
            className="w-full"
          >
            Continue Shopping  
          </Button>
          <button
            onClick={clearCart}
            className="w-full text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}