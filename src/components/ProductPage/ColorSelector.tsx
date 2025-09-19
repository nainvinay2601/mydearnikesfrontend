// "use client";
// import { ChevronDown } from "lucide-react";
// import React, { useState } from "react";



// import { SimpleProduct } from "@/types/shopify";

// interface ColorSelectorProps {
//   product: SimpleProduct;
//   onColorChange?: (color: string, variant?: any) => void;
// }

// const ColorSelector = ({ product, onColorChange }: ColorSelectorProps) => {
//   const [selectedColor, setSelectedColor] = useState("");

//   // Extract colors from product variants
//   const extractColors = () => {
//     if (!product.variants || product.variants.length === 0) {
//       return ["White", "Black", "Pinkk"];
//     }

//     const colors = product.variants
//       .filter((variant) => variant.availableForSale)
//       .map((variant) => {
//         const colorOption = variant.selectedOptions?.find((option) =>
//           option.name.toLowerCase().includes("color")
//         );
//         return colorOption?.value || "Default";
//       })
//       .filter((color, index, arr) => arr.indexOf(color) === index);
//     return colors.length > 0 ? colors : ["White", "Black", "Pinkk"];
//   };

//   const colors = extractColors();
//   const handleColorChange = (color: string) => {
//     setSelectedColor(color);

//     // Find matching variant for the selected color
//     const matchingVariant = product.variants?.find((variant) => {
//       const colorOption = variant.selectedOptions?.find((option) =>
//         option.name.toLowerCase().includes("color")
//       );
//       return colorOption?.value === color;
//     });

//     // Call parent callback if provided
//     if (onColorChange) {
//       onColorChange(color, matchingVariant);
//     }
//   };

//   return (
//     <div className="mt-4 px-[8px] flex items-center  gap-3">
//       <label htmlFor="color-select" className="text-xs">
//         {" "}
//         Colors
//       </label>
//       <div className="selector relative inline-block">
//         <select
//           name="colorSelect"
//           id="color-select"
//           value={selectedColor}
//           onChange={(e) => handleColorChange(e.target.value)}
//           className="text-xs border-[0.25px] border-[#e5e5e5] border-opacity-25 w-50 p-[8px] focus:outline-0 appearance-none rounded-md relative"
//         >
//           <option value=""> Select Color </option>
//           {colors.map((color, idx) => (
//             <option key={idx} value={color} className="text-[2px]">
//               {color}
//             </option>
//           ))}
//         </select>
//         <ChevronDown
//           className=" absolute right-2  top-1/2 -translate-x-1/2 pointer-events-none text-gray-500"
//           size={12}
//         />
//       </div>
//     </div>
//   );
// };

// export default ColorSelector;
"use client";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

import { SimpleProduct } from "@/types/shopify";

interface ColorSelectorProps {
  product: SimpleProduct;
  selectedColor: string;
  onColorChange: (color: string) => void;
}
const ColorSelector = ({
  product,
  selectedColor,
  onColorChange,
}: ColorSelectorProps) => {
  // Extract available colors
  const extractColors = () => {
    // Fallback to default color if no variants
    if (!product.variants || product.variants.length === 0) {
      return ["White", "Black", "Pink"];
    }
    const colors = product.variants
      .filter((variant) => variant.availableForSale)
      .map((variant) => {
        // Look for colors in selectedColors
        const colorOption = variant.selectedOptions?.find((option) =>
          option.name.toLowerCase().includes("color")
        );
        // fallback to first part of the variant if no color option found
        return colorOption?.value || variant.title.split(" / ")[0];
      })
      .filter((color, index, arr) => arr.indexOf(color) === index);
    return colors.length > 0 ? colors : ["White", "Black", "Pink"];
    // Only show colors that are in stock
  };

  const colors = extractColors();
  return (
    <div className="mt-4 px-[8px] flex items-center gap-3">
      <label htmlFor="color-select" className="text-xs">
        Colors
      </label>
      <div className="selector relative inline-block">
        <select
          name="colorSelect"
          id="color-select"
          value={selectedColor}
          onChange={(e) => onColorChange(e.target.value)}
          className="text-xs border-[0.25px] border-[#e5e5e5] border-opacity-25 w-50 p-[8px] focus:outline-0 appearance-none rounded-md relative"
        >
          <option value="">Select Color</option>
          {colors.map((color, idx) => (
            <option key={idx} value={color}>
              {color}
            </option>
          ))}
        </select>
        {/* Dropdown arrow icon */}
        <ChevronDown
          className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
          size={12}
        />
      </div>
    </div>
  );
};
export default ColorSelector;
