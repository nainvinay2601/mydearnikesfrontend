// "use client"

// import { ChevronDown } from 'lucide-react';
// import React, { useState } from 'react'

// const Colors = ["White", "Black", "Pink"]

// const ColorSelector = () => {
//     const [selectedColor, setSelectedColor] = useState("");
//   return (
//     < div className='mt-4 px-[8px] flex items-center gap-3 '>
//     <label htmlFor="color-select" className='text-xs'>Colors</label>
//     <div className="selector relative inline-block">

//     <select name="colorSelect" id="color-select" onChange={(e)=> setSelectedColor(e.target.value)} className=' text-xs border-[0.25px]  border-[#e5e5e5] border-opacity-25  w-50  p-[8px] focus:outline-0 appearance-none rounded-md relative'>
//         {
//             Colors.map((color,idx)=>(
//                 <option key={idx} value={color.toLowerCase()} className='text-[2px]'>
//                     {color}
//                 </option>
//             ))
//         }
//     </select>
//      <ChevronDown
//         className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
//         size={12} // controls size of the chevron
//       />
//         </div>

//     </div>
//   )
// }

// export default ColorSelector

"use client";

import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
  price: {
    amount: string;
    currencyCode: string;
  };
}

interface ColorSelectorProps {
  variants: ProductVariant[];
  onColorSelect?: (variant: ProductVariant) => void;
  className?: string;
}

const ColorSelector = ({
  variants,
  onColorSelect,
  className = "",
}: ColorSelectorProps) => {
  // Extract unique color value from variants
  const uniqueColors = Array.from(
    new Set(
      variants
        .map((variant) => {
          const colorOption = variant.selectedOptions.find(
            (option) => option.name.toLowerCase() === "color"
          );
          return colorOption ? colorOption.value : null;
        })
        .filter(Boolean) // Remove the null/umdefined
    )
  );

  // Filter variants to include one per unique color
  const colorVariants = uniqueColors
    .map((color) => {
      return variants.find((variant) =>
        variant.selectedOptions.some(
          (option) =>
            option.name.toLowerCase() === "color" && option.value === color
        )
      );
    })
    .filter(Boolean) as ProductVariant[];

  // Initialise selectedColorVariant with the first color variant
  const [selectedColorVariant, setSelectedColorVariant] =
    useState<ProductVariant>(colorVariants[0]);

  const handleColorChange = (variant: ProductVariant) => {
    setSelectedColorVariant(variant);
    onColorSelect?.(variant);
  };

  // Early return if no color variants
  if (colorVariants.length === 0) {
    return null;
  }

  return (
    <div className={`mt-4 px-[8px] flex items-center  gap-3 ${className}`}>
      <label htmlFor="color-select" className="text-xs">
        Colors
      </label>
      <div className="selector relative inline-block">
        <select
          name="colorSelect"
          id="color-select"
          value={
            selectedColorVariant?.selectedOptions.find(
              (opt) => opt.name.toLowerCase() === "color"
            )?.value
          }
          onChange={(e) => {
            const selectedColor = e.target.value;
            const selectedVariant = colorVariants.find((variant) =>
              variant.selectedOptions.some(
                (opt) =>
                  opt.name.toLowerCase() === "color" &&
                  opt.value === selectedColor
              )
            );
            if (selectedVariant) {
              handleColorChange(selectedVariant);
            }
          }}
          className="text-xs border-[0.25px] border-[#e5e5e5] border-opacity-25 w-20 p-[8px] focus:outline-0 appearance-none rounded-md pr-6"
        >
          {colorVariants.map((variant, idx) => {
            const colorOption = variant.selectedOptions.find(
              (opt) => opt.name.toLowerCase() === "color"
            );
            return (
              <option key={idx} value={colorOption?.value} className="text-xs">
                {colorOption?.value}
              </option>
            );
          })}
        </select>
        <ChevronDown
          className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
          size={12}
        />
      </div>
    </div>
  );
};


export default ColorSelector;