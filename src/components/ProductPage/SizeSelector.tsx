// "use client";

// import { useState } from "react";
// import { Button } from "../ui/button";
// import { RulerDimensionLine } from "lucide-react";

// import { SimpleProduct } from "@/types/shopify";

// interface SizeSelectorProps {
//   product: SimpleProduct;
//   onSizeChange?: (size: string, variant?: any) => void;
// }

// const SizeSelector = ({ product, onSizeChange }: SizeSelectorProps) => {
//   const [selectedSize, setSelectedSize] = useState<string>("");
//   // Extract sizes from product variants
//   const extractSizes = () => {
//     if (!product.variants || product.variants.length === 0) {
//       return ["XS", "S", "M", "L", "XL", "XXL"];
//     }

//     const sizes = product.variants
//       .filter((variants) => variants.availableForSale)
//       .map((variant) => {
//         // Check if the size in selectedOptions
//         const sizeOption = variant.selectedOptions?.find((option) =>
//           option.name.toLowerCase().includes("sizes")
//         );
//         return sizeOption?.value || variant.title.split("/")[0]; // fallback to first part of the title
//       })
//       .filter((size, index, arr) => arr.indexOf(size) === index); // remove the duplicates

//     return sizes.length > 0 ? sizes : ["XS", "S", "M", "L", "XL", "XXL"];
//   };

//   const sizes = extractSizes();
//   const handleSizeClick = (size: string) => {
//     setSelectedSize(size);
//     // Find the matching size for the selected size
//     const matchingVariant = product.variants?.find((variant) => {
//       const sizeOption = variant.selectedOptions?.find((option) =>
//         option.name.toLowerCase().includes("size")
//       );
//       return sizeOption?.value === size || variant.title.includes(size);
//     });

//     // call parent callback if provided
//     if (onSizeChange) {
//       onSizeChange(size, matchingVariant);
//     }
//   };

//   return (
//     <>
//       <div className="flex items-center  mt-5  px-[8px] w-full justify-between">
//         <div className="container flex items-center gap-3">
//           <div className="heading text-[12px] font-regular">Size</div>
//           <div className="sizeContainer">
//             {sizes.map((size) => (
//               <Button
//                 variant={"outline"}
//                 key={size}
//                 className={`rounded-sm text-[10px] px-3 py-2 mr-3 ${
//                   selectedSize === size
//                     ? "bg-black text-white"
//                     : "bg-white text-black border-[0.25px] border-[#aeadad] border-opacity-25"
//                 }`}
//                 onClick={() => handleSizeClick(size)}
//               >
//                 {size}
//               </Button>
//             ))}
//           </div>
//         </div>
//         <div className="sizeChart text-xs">
//           <RulerDimensionLine size={18} strokeWidth={1} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default SizeSelector;
"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { RulerDimensionLine } from "lucide-react";
// import { SimpleProduct } from "@/types/shopify";
import { SimpleProduct } from "@/types/shopify";

interface SizeSelectorProps {
  product: SimpleProduct;
  onSizeChange?: (size: string, variant?: any) => void;
}

const SizeSelector = ({ product, onSizeChange }: SizeSelectorProps) => {
  const [selectedSize, setSelectedSize] = useState<string>('');

  // Debug: Log the variants to see what we're getting
  console.log("Product variants in SizeSelector:", product.variants);
  console.log("Variants length:", product.variants?.length);

  // Extract sizes from product variants
  const extractSizes = () => {
    // Debug fallback first
    if (!product.variants || product.variants.length === 0) {
      console.log("No variants found, using fallback sizes");
      return ["XS", "S", "M", "L", "XL", "XXL"];
    }
    
    console.log("Processing variants:", product.variants);
    
    const sizes = product.variants
      .filter(variant => {
        console.log("Checking variant availability:", variant.availableForSale, variant);
        return variant.availableForSale;
      })
      .map(variant => {
        console.log("Processing variant for size:", variant);
        console.log("Variant selectedOptions:", variant.selectedOptions);
        
        // Check if size is in selectedOptions
        const sizeOption = variant.selectedOptions?.find(option => {
          console.log("Checking option:", option);
          return option.name.toLowerCase().includes('size');
        });
        
        console.log("Found size option:", sizeOption);
        
        if (sizeOption) {
          return sizeOption.value;
        }
        
        // Fallback: try to extract from title (common Shopify pattern)
        // Titles like "Red / M" or "Blue - Large"
        const titleParts = variant.title.split(/[\s\/\-]+/);
        console.log("Title parts:", titleParts);
        
        // Look for common size patterns
        const sizePattern = /^(XXS|XS|S|M|L|XL|XXL|XXXL|\d+)$/i;
        const foundSize = titleParts.find(part => sizePattern.test(part.trim()));
        
        console.log("Found size from title:", foundSize);
        return foundSize || variant.title;
      })
      .filter((size, index, arr) => {
        // Remove duplicates and empty values
        return size && arr.indexOf(size) === index;
      });
    
    console.log("Extracted sizes:", sizes);
    return sizes.length > 0 ? sizes : ["XS", "S", "M", "L", "XL", "XXL"];
  };

  const sizes = extractSizes();
  console.log("Final sizes array:", sizes);

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
    
    // Find matching variant for the selected size
    const matchingVariant = product.variants?.find(variant => {
      const sizeOption = variant.selectedOptions?.find(option => 
        option.name.toLowerCase().includes('size')
      );
      return sizeOption?.value === size || variant.title.includes(size);
    });
    
    console.log("Matching variant for size", size, ":", matchingVariant);
    
    // Call parent callback if provided
    if (onSizeChange) {
      onSizeChange(size, matchingVariant);
    }
  };

  return (
    <div className="flex items-center mt-5 px-[8px] w-full justify-between">
      <div className="container flex items-center gap-3">
        <div className="heading text-[12px] font-regular">Size</div>
        <div className="sizeContainer">
          {sizes.map((size) => (
            <Button
              variant={"outline"}
              key={size}
              className={`rounded-sm text-[10px] px-3 py-2 mr-3 ${
                selectedSize === size
                  ? "bg-black text-white"
                  : "bg-white text-black border-[0.25px] border-[#aeadad] border-opacity-25"
              }`}
              onClick={() => handleSizeClick(size)}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>
      <div className="sizeChart text-xs">
        <RulerDimensionLine size={18} strokeWidth={1}/>
      </div>
    </div>
  );
};

export default SizeSelector;
