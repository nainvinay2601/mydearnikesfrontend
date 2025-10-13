
// "use client";

// import React from 'react';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import { Minus, Plus } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { useCartStore } from '@/store/cartStore';
// import { createCartWithItems } from '@/lib/shopify/checkout';

// export default function CartPage() {
//   const { items, totalItems, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore();
//   const router = useRouter();
//   const [checkoutLoading, setCheckoutLoading] = React.useState(false);

//   const formatPrice = (amount: number) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//     }).format(amount);
//   };

//   const handleShopifyCheckout = async () => {
//     if (items.length === 0) {
//       alert("Your cart is empty");
//       return;
//     }

//     try {
//       setCheckoutLoading(true);
      
//       const total = getTotalPrice();
//       const itemCount = totalItems;
      
//       console.log("Cart items for checkout:", items);
      
//       const confirmed = confirm(
//         `Proceed to Shopify checkout?\n\nItems: ${itemCount}\nTotal: ${formatPrice(total)}\n\nYou will be redirected to secure Shopify checkout.`
//       );
      
//       if (confirmed) {
//         console.log('Creating Shopify cart with all items:', items);
        
//         // Create Shopify cart with all items using Cart API
//         const shopifyCart = await createCartWithItems(items);
        
//         console.log('Shopify cart created successfully:', shopifyCart.checkoutUrl);
        
//         // Clear local cart after successful checkout creation
//         clearCart();
        
//         // Redirect to Shopify checkout
//         window.location.href = shopifyCart.checkoutUrl;
//       }
      
//     } catch (error) {
//       console.error('Shopify checkout failed:', error);
//      const errorMessage = error instanceof Error ? error.message : 'Please try again';
//     alert(`Checkout failed: ${errorMessage}\n\nCheck console for details.`);
//     } finally {
//       setCheckoutLoading(false);
//     }
//   };

//   if (items.length === 0) {
//     return (
//       <div className="container mx-auto px-4 py-16 text-center">
//         <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
//         <p className="text-gray-600 mb-6">Your cart is empty</p>
//         <Button onClick={() => router.push('/')}>Continue Shopping</Button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Your Cart ({totalItems} items)</h1>
      
//       {/* Cart Items List */}
//       <div className="space-y-4 mb-8">
//         {items.map((item) => (
//           <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
//             {item.image && (
//               <Image 
//                 src={item.image.url} 
//                 alt={item.image.altText || item.productTitle}
//                 width={80}
//                 height={80}
//                 className="rounded object-cover"
//               />
//             )}
            
//             <div className="flex-1">
//               <h3 className="font-semibold">{item.productTitle}</h3>
//               <p className="text-sm text-gray-600">{item.variantTitle}</p>
//               <p className="font-medium">
//                 {formatPrice(parseFloat(item.price.amount))} each
//               </p>
//               <p className="text-sm text-gray-500">
//                 Subtotal: {formatPrice(parseFloat(item.price.amount) * item.quantity)}
//               </p>
              
//               <div className="text-xs text-gray-500 mt-1">
//                 {item.selectedOptions.map(option => (
//                   <span key={option.name} className="mr-2">
//                     {option.name}: {option.value}
//                   </span>
//                 ))}
//               </div>
//             </div>
            
//             <div className="flex items-center gap-2">
//               <button 
//                 onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                 className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100"
//                 disabled={item.quantity <= 1}
//               >
//                 <Minus size={12} />
//               </button>
//               <span className="w-8 text-center font-medium">{item.quantity}</span>
//               <button 
//                 onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                 className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100"
//               >
//                 <Plus size={12} />
//               </button>
//             </div>
            
//             <button 
//               onClick={() => removeItem(item.id)}
//               className="text-red-500 hover:text-red-700 ml-2 text-sm underline"
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//       </div>
      
//       {/* Cart Summary and Checkout */}
//       <div className="border-t pt-6">
//         <div className="space-y-2 mb-4">
//           <div className="flex justify-between items-center text-sm">
//             <span>Items ({totalItems}):</span>
//             <span>{formatPrice(getTotalPrice())}</span>
//           </div>
//           <div className="flex justify-between items-center text-lg font-bold">
//             <span>Total:</span>
//             <span>{formatPrice(getTotalPrice())}</span>
//           </div>
//         </div>
        
//         <div className="space-y-3">
//           <Button 
//             onClick={handleShopifyCheckout} 
//             className="w-full text-lg py-3"
//             disabled={checkoutLoading}
//           >
//             {checkoutLoading ? "Creating Checkout..." : "Proceed to Shopify Checkout"}
//           </Button>
//           <Button 
//             variant="outline" 
//             onClick={() => router.push('/')} 
//             className="w-full"
//           >
//             Continue Shopping  
//           </Button>
//           <button
//             onClick={clearCart}
//             className="w-full text-sm text-gray-500 hover:text-gray-700 underline"
//           >
//             Clear Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// app/cart/page.tsx - UPDATE YOUR EXISTING FILE

"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore'; // NEW IMPORT
import { createCartWithItems } from '@/lib/shopify/checkout';
import { toast } from 'sonner'; // NEW IMPORT

export default function CartPage() {
  const { items, totalItems, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore();
  const { accessToken, isAuthenticated, customer, checkAndRenewToken } = useAuthStore(); // NEW
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
      toast.error("Your cart is empty");
      return;
    }

    try {
      setCheckoutLoading(true);

      // NEW: Check and renew token if authenticated
      if (isAuthenticated) {
        await checkAndRenewToken();
      }
      
      const total = getTotalPrice();
      const itemCount = totalItems;
      
      console.log("Cart items for checkout:", items);
      
      // Show different messages for authenticated vs guest
      const checkoutMessage = isAuthenticated
        ? `Proceed to checkout as ${customer?.email}?\n\nItems: ${itemCount}\nTotal: ${formatPrice(total)}\n\nYour saved addresses will be available.`
        : `Proceed to guest checkout?\n\nItems: ${itemCount}\nTotal: ${formatPrice(total)}\n\nTip: Login for faster checkout with saved info.`;
      
      const confirmed = confirm(checkoutMessage);
      
      if (confirmed) {
        console.log('Creating Shopify cart with all items:', items);
        
        // NEW: Pass customer access token if authenticated
        const shopifyCart = await createCartWithItems(
          items,
          isAuthenticated ? accessToken || undefined : undefined
        );
        
        console.log('Shopify cart created successfully:', shopifyCart.checkoutUrl);
        
        // Show success message
        if (isAuthenticated) {
          toast.success("Redirecting to checkout with your account");
        } else {
          toast.info("Proceeding as guest");
        }
        
        // Clear local cart after successful checkout creation
        clearCart();
        
        // Redirect to Shopify checkout
        window.location.href = shopifyCart.checkoutUrl;
      }
      
    } catch (error) {
      console.error('Shopify checkout failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Please try again';
      toast.error(`Checkout failed: ${errorMessage}`);
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Cart ({totalItems} items)</h1>
        
        {/* NEW: Show login status */}
        {!isAuthenticated && (
          <div className="text-sm text-gray-600">
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>{" "}
            for faster checkout
          </div>
        )}
      </div>
      
      {/* NEW: Show customer info if logged in */}
      {isAuthenticated && customer && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
          <p className="text-sm text-blue-800">
            ✓ Checking out as <strong>{customer.email}</strong>
          </p>
        </div>
      )}
      
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