
"use client";
import { ChevronDown } from "lucide-react";
import React from "react";

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
      return ["Default"];
    }

    // First, check if any variant actually has a color option
    const hasColorVariants = product.variants.some(variant =>
      variant.selectedOptions?.some(option =>
        option.name.toLowerCase().includes("color") ||
        option.name.toLowerCase().includes("colour")
      )
    );

    // If no color variants exist, return default
    if (!hasColorVariants) {
      return ["Default"];
    }

    // Extract actual colors from variants that have color options
    const colors = product.variants
      .filter((variant) => variant.availableForSale)
      .map((variant) => {
        // Look for colors in selectedOptions
        const colorOption = variant.selectedOptions?.find((option) =>
          option.name.toLowerCase().includes("color") ||
          option.name.toLowerCase().includes("colour")
        );
        return colorOption?.value;
      })
      .filter((color): color is string => color !== undefined) // Remove undefined values
      .filter((color, index, arr) => arr.indexOf(color) === index); // Remove duplicates

    // If no actual colors found after filtering, return default
    return colors.length > 0 ? colors : ["Default"];
  };

  const colors = extractColors();
  const hasRealColors = colors.length > 1 || colors[0] !== "Default";

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
          disabled={!hasRealColors} // Disable if only default color
        >
          {hasRealColors ? (
            <>
              <option value="">Select Color</option>
              {colors.map((color, idx) => (
                <option key={idx} value={color}>
                  {color}
                </option>
              ))}
            </>
          ) : (
            <option value="Default">Default</option>
          )}
        </select>
        {/* Dropdown arrow icon */}
        <ChevronDown
          className={`absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 ${
            !hasRealColors ? 'opacity-50' : ''
          }`}
          size={12}
        />
      </div>
    </div>
  );
};

export default ColorSelector;