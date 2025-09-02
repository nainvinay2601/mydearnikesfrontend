"use client";
import { X } from "lucide-react";
import React, { useState } from "react";

// Types 
type Product= { 
  id:number; 
    name:string; 
    price:string; 
    category:string;
    size:string[];
    color:string;

}

  type FilterType = 'category' | 'size' | 'sort' | 'color';

type SelectedFilters = {
  category: string[];
  size: string[];
  sort: string;
  color: string[];
};

//Mock Products Data - id, name, price, category, size, color
const mockProducts = Product[]= [
  {
    id: 1,
    name: "PC Race Master",
    price: 1299,
    category: "Baby Tees",
    size: ["S", "M", "L"],
    color: "White",
  },
  {
    id: 2,
    name: "Blood Edition",
    price: 1199,
    category: "Fitted Tees",
    size: ["M", "L", "XL"],
    color: "Black",
  },
  {
    id: 3,
    name: "Modern Tee",
    price: 999,
    category: "Oversized Tees",
    size: ["L", "XL", "XXL"],
    color: "White",
  },
  {
    id: 4,
    name: "Classic Blank",
    price: 799,
    category: "Blanks",
    size: ["S", "M"],
    color: "Pink",
  },
];

export default function Filer() {
  // States -> one to toggle modal, other to show the products based that will be filtered using filter, and the selectedFilter -> to make chips and load the products based on the filter
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [products, setProducts] = useState(mockProducts);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    category: [],
    size: [],
    sort: "",
    color: [],
  });

  // Filter Options
  const filterOptions = {
    categories: ["Baby Tees", "Fitted Tees", "Oversized Tees", "Blanks"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    sortOptions: ["High - Low Price", "Low - High Price"],
    colors: ["Pink", "White", "Black"],
  };

  // Convert selected filter into chips ( better UI and it helps to cross the filter that user dont need)
  const getActiveFilterChips = () => {
    const chips = [];

    // go through all the fields from selectedFilter.category and convert each item into UI chips
    selectedFilters.category.forEach((cat) =>
      chips.push({ type: "category", value: cat, display: cat })
    );
    selectedFilters.size.forEach((size) =>
      chips.push({ type: "size", value: size, display: size })
    );

    if (selectedFilters.sort) {
      chips.push({
        type: "sort",
        value: selectedFilters.sort,
        display: selectedFilters.sort,
      });
    }

    selectedFilters.color.forEach((color) =>
      chips.push({ type: "color", value: color, display: color })
    );

    return chips;
  };

  // Remove individual filter based on clicks -> we are just going to use the filter method to just filter selectedFilter!item that was crossed
  const removalFilter = (chipType, chipValue) => {
    setSelectedFilters((prev) => {
      const updated = { ...prev };

      if (chipType === "sort") {
        updated.sort = "";
      } else {
        updated[chipType] = updated[chipType].filter(
          (item) => item !== chipValue
        );
      }
      return updated;
    });
  };

  return <div className="pt-16">Hello filter</div>;
}
