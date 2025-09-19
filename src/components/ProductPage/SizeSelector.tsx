"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { RulerDimensionLine } from "lucide-react";
import { SimpleProduct, ProductVariant } from "@/types/shopify";

interface SizeSelectorProps {
  product: SimpleProduct;
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

const SizeSelector = ({
  product,
  selectedSize,
  onSizeChange,
}: SizeSelectorProps) => {
  // Extract sizes from variants and track availability
  const extractSizes = () => {
    // Fallback to default sizes if no variants
    if (!product.variants || product.variants.length === 0) {
      return { sizes: ["XS", "S", "M", "L", "XL", "XXL"], availability: {} };
    }

    const sizeData: {
      [key: string]: { available: boolean; variant: ProductVariant };
    } = {};

    // Process each variant to extract size options
    product.variants.forEach((variant) => {
      const sizeOption = variant.selectedOptions?.find((option) =>
        option.name.toLowerCase().includes("size")
      );

      if (sizeOption) {
        const size = sizeOption.value;
        if (!sizeData[size]) {
          sizeData[size] = { available: false, variant };
        }
        // Mark as available if any variant with this size is in stock
        if (variant.availableForSale) {
          sizeData[size].available = true;
        }
      }
    });

    const sizes = Object.keys(sizeData);
    const availability = Object.fromEntries(
      Object.entries(sizeData).map(([size, data]) => [size, data.available])
    );

    return sizes.length > 0
      ? { sizes, availability }
      : { sizes: ["XS", "S", "M", "L", "XL", "XXL"], availability: {} };
  };

  const { sizes, availability } = extractSizes();

  const handleSizeClick = (size: string) => {
    // Don't allow selection of unavailable sizes
    if (availability[size] === false) return;
    onSizeChange(size);
  };

  return (
    <div className="flex items-center mt-5 px-[8px] w-full justify-between">
      <div className="container flex items-center gap-3">
        <div className="heading text-[12px] font-regular">Size</div>
        <div className="sizeContainer">
          {sizes.map((size) => {
            const isAvailable = availability[size] !== false;
            const isSelected = selectedSize === size;

            return (
              <Button
                variant={"outline"}
                key={size}
                className={`rounded-sm text-[10px] px-3 py-2 mr-3 transition-all ${
                  isSelected
                    ? "bg-black text-white"
                    : isAvailable
                    ? "bg-white text-black border-[0.25px] border-[#aeadad] border-opacity-25 hover:border-gray-400"
                    : "bg-gray-100 text-gray-400 border-[0.25px] border-gray-300 cursor-not-allowed"
                }`}
                onClick={() => handleSizeClick(size)}
                disabled={!isAvailable}
              >
                {size}
              </Button>
            );
          })}
        </div>
      </div>
      {/* Size chart icon - could link to size guide modal */}
      <div className="sizeChart text-xs">
        <RulerDimensionLine size={18} strokeWidth={1} />
      </div>
    </div>
  );
};
export default SizeSelector;
