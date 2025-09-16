"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { RulerDimensionLine } from "lucide-react";

interface ProductVariant {
  id: string;
  title: string;
  availableForSale?: boolean;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;

  price: {
    amount: string;
    currencyCode: string;
  };
}

interface SizeSelectorProps {
  variants: ProductVariant[];
  onSizeSelect?: (variant: ProductVariant) => void;
  className?: string;
}

const SizeSelector = ({
  variants,
  onSizeSelect,
  className,
}: SizeSelectorProps) => {
  // Extract each unique size value from the array
  const uniqueSizes = Array.from(
    new Set(
      variants.map((variant) => {
        const sizeOption = variant.selectedOptions.find(
          (option) => option.name.toLowerCase() === "size"
        );
        return sizeOption ? sizeOption.value : null;
      })
      .filter(Boolean)//Remove null / undefined 
    )
  );


  // Filter variants to only include one per unique size 
};

export default SizeSelector;
