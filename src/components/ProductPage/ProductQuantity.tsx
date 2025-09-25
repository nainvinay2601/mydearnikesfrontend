// "use client";
// import { Minus, Plus } from "lucide-react";
// import { SimpleProduct, ProductVariant } from "@/types/shopify";
// import { useState } from "react";
// import { Button } from "../ui/button";
// import { useCartStore } from "@/store/cartStore";

// interface ProductQuantityProps {
//   product: SimpleProduct;
//   selectedVariant?: ProductVariant | null;
// }

// const ProductQuantity = ({
//   product,
//   selectedVariant,
// }: ProductQuantityProps) => {
//   const [quantity, setQuantity] = useState(1);
//   const { addToCart, isLoading, error, clearError } = useCartStore();

//   const increment = () => setQuantity((prev) => prev + 1);
//   const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

//   // Handle adding item to cart with validation
//   const handleAddToBag = async () => {
//     // Validate that user has selected a variant
//     if (!selectedVariant) {
//       alert("Please select size and color first");
//       return;
//     }

//     // Check if selected variant is in stock
//     if (!selectedVariant.availableForSale) {
//       alert("This variant is currently out of stock");
//       return;
//     }

//     try {
//       clearError();
//       // Add to cart using Zustand store
//       await addToCart(selectedVariant, quantity, product.title);
//       alert(`Added ${quantity} × ${product.title} to cart!`);
//       setQuantity(1); // Reset quantity after successful add
//     } catch (error) {
//       console.error("Add to cart error:", error);
//       alert("Failed to add item to cart. Please try again.");
//     }
//   };

//   // Determine button state and text
//   const isOutOfStock =
//     !product.availableForSale ||
//     (selectedVariant && !selectedVariant.availableForSale);
//   const needsSelection =
//     !selectedVariant && (product.variants?.length || 0) > 1;

//   return (
//     <div className="flex justify-between items-center px-[8px] pt-6 gap-3">
//       {/* Quantity Controls */}
//       <div className="rounded-none w-[25%] border-[0.25px] border-[#aeadad] text-sm px-2 py-2 flex justify-between items-center">
//         <button onClick={decrement} disabled={quantity <= 1 || isLoading}>
//           <Minus size={12} />
//         </button>
//         <span>{quantity}</span>
//         <button onClick={increment} disabled={isLoading}>
//           <Plus size={12} />
//         </button>
//       </div>
//       {/* Add to Cart Button */}
//       <div className="addToCart w-[75%]">
//         <Button
//           className="w-full rounded-none py-2 border-[0.25px] border-[#aeadad]"
//           variant={"outline"}
//           onClick={handleAddToBag}
//           disabled={isOutOfStock || needsSelection || isLoading}
//         >
//           {isLoading
//             ? "Adding..."
//             : isOutOfStock
//             ? "Out of Stock"
//             : needsSelection
//             ? "Select Options"
//             : "Add To Bag"}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default ProductQuantity;
"use client";
import { Minus, Plus } from "lucide-react";
import { SimpleProduct, ProductVariant } from "@/types/shopify";
import { useState } from "react";
import { Button } from "../ui/button";
import { useCartStore } from "@/store/cartStore";

interface ProductQuantityProps {
  product: SimpleProduct;
  selectedVariant?: ProductVariant | null;
  quantity: number;
  setQuantity: (quantity: number) => void;
}

const ProductQuantity = ({ product, selectedVariant, quantity, setQuantity }: ProductQuantityProps) => {
  const { addToCart, isLoading, error, clearError } = useCartStore();

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  // Handle adding item to cart with validation
  const handleAddToBag = async () => {
    // Validate that user has selected a variant
    if (!selectedVariant) {
      alert("Please select size and color first");
      return;
    }

    // Check if selected variant is in stock
    if (!selectedVariant.availableForSale) {
      alert("This variant is currently out of stock");
      return;
    }

    try {
      clearError();
      // Add to cart using Zustand store with selected quantity
      await addToCart(selectedVariant, quantity, product.title, product.id);
      alert(`Added ${quantity} × ${product.title} to cart!`);
      // Don't reset quantity after adding to cart - let user keep selecting more
    } catch (error) {
      console.error('Add to cart error:', error);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  // Determine button state and text
  const isOutOfStock = !product.availableForSale || (selectedVariant && !selectedVariant.availableForSale);
  const needsSelection = !selectedVariant && (product.variants?.length || 0) > 1;

  return (
    <div className="flex justify-between items-center px-[8px] pt-6 gap-3">
      {/* Quantity Controls */}
      <div className="rounded-none w-[25%] border-[0.25px] border-[#aeadad] text-sm px-2 py-2 flex justify-between items-center">
        <button 
          onClick={decrement} 
          disabled={quantity <= 1 || isLoading}
          className="hover:bg-gray-100 rounded p-1"
        >
          <Minus size={12} />
        </button>
        <span className="font-medium">{quantity}</span>
        <button 
          onClick={increment} 
          disabled={isLoading}
          className="hover:bg-gray-100 rounded p-1"
        >
          <Plus size={12} />
        </button>
      </div>
      {/* Add to Cart Button */}
      <div className="addToCart w-[75%]">
        <Button 
          className="w-full rounded-none py-2 border-[0.25px] border-[#aeadad]" 
          variant={"outline"}
          onClick={handleAddToBag}
          disabled={isOutOfStock || needsSelection || isLoading}
        >
          {isLoading ? "Adding..." : 
           isOutOfStock ? "Out of Stock" : 
           needsSelection ? "Select Options" : 
           `Add ${quantity} To Bag`}
        </Button>
      </div>
    </div>
  );
};

export default ProductQuantity;