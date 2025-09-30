"use client";
import { useState, useMemo, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { SimpleProduct } from "@/types/shopify";
// import { useSearchParams, useRouter } from "next/navigation"; // Uncomment for URL persistence

interface FilterState {
  size: string[];
  sort: string;
  color: string[];
  priceRange: string[];
}

interface FilterChip {
  type: keyof FilterState;
  value: string;
  display: string;
}

interface ProductFilterProps {
  products: SimpleProduct[];
  categoryTitle: string;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ products, categoryTitle }) => {
  // const searchParams = useSearchParams(); // Uncomment for URL persistence
  // const router = useRouter(); // Uncomment for URL persistence

  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    size: [],
    sort: "",
    color: [],
    priceRange: [],
  });

  // ========== URL PERSISTENCE (COMMENTED) ==========
  // Uncomment this entire block to enable filter persistence via URL
  /*
  useEffect(() => {
    // Load filters from URL on mount
    const urlSizes = searchParams.get('size')?.split(',').filter(Boolean) || [];
    const urlColors = searchParams.get('color')?.split(',').filter(Boolean) || [];
    const urlPriceRanges = searchParams.get('price')?.split(',').filter(Boolean) || [];
    const urlSort = searchParams.get('sort') || '';

    setSelectedFilters({
      size: urlSizes,
      color: urlColors,
      priceRange: urlPriceRanges,
      sort: urlSort,
    });
  }, [searchParams]);

  const updateURL = (filters: FilterState) => {
    const params = new URLSearchParams();
    
    if (filters.size.length > 0) params.set('size', filters.size.join(','));
    if (filters.color.length > 0) params.set('color', filters.color.join(','));
    if (filters.priceRange.length > 0) params.set('price', filters.priceRange.join(','));
    if (filters.sort) params.set('sort', filters.sort);

    const queryString = params.toString();
    router.push(`?${queryString}`, { scroll: false });
  };
  */

  // Extract available sizes from all product variants
  const availableSizes = useMemo(() => {
    const sizes = new Set<string>();
    const validSizePattern = /^(XXS|XS|S|M|L|XL|XXL|XXXL|2XL|3XL|4XL)$/i; // Only accept standard clothing sizes
    
    products.forEach(product => {
      product.variants.forEach(variant => {
        const sizeOption = variant.selectedOptions?.find(
          opt => opt.name.toLowerCase() === 'size'
        );
        // Only add if it matches standard size pattern
        if (sizeOption && validSizePattern.test(sizeOption.value)) {
          sizes.add(sizeOption.value.toUpperCase());
        }
      });
    });
    
    const sizesArray = Array.from(sizes);
    // Sort sizes in proper order
    return sizesArray.sort((a, b) => {
      const sizeOrder = ['XXS', 'XS', 'S', 'M', 'L', 'XL', '2XL', 'XXL', '3XL', 'XXXL', '4XL'];
      return sizeOrder.indexOf(a) - sizeOrder.indexOf(b);
    });
  }, [products]);

  // Extract available colors from all product variants
  const availableColors = useMemo(() => {
    const colors = new Set<string>();
    const sizeValues = new Set(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']); // Common size values to exclude
    
    products.forEach(product => {
      product.variants.forEach(variant => {
        const colorOption = variant.selectedOptions?.find(
          opt => {
            const optionName = opt.name.toLowerCase();
            return optionName === 'color' || optionName === 'colour';
          }
        );
        
        // Only add if it's actually a color option AND not a size value
        if (colorOption && !sizeValues.has(colorOption.value.toUpperCase())) {
          colors.add(colorOption.value);
        }
      });
    });
    
    return Array.from(colors).sort();
  }, [products]);

  // Price ranges
  const priceRanges = [
    { label: "Under ₹500", min: 0, max: 500, value: "0-500" },
    { label: "₹500 - ₹1000", min: 500, max: 1000, value: "500-1000" },
    { label: "₹1000 - ₹1500", min: 1000, max: 1500, value: "1000-1500" },
    { label: "₹1500 - ₹2000", min: 1500, max: 2000, value: "1500-2000" },
    { label: "Above ₹2000", min: 2000, max: Infinity, value: "2000+" },
  ];

  // Sort options
  const sortOptions = [
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Newest First", value: "newest" },
  ];

  // Apply filters to products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by size
    if (selectedFilters.size.length > 0) {
      filtered = filtered.filter(product =>
        product.variants.some(variant =>
          variant.selectedOptions?.some(
            opt =>
              opt.name.toLowerCase() === 'size' &&
              selectedFilters.size.includes(opt.value)
          )
        )
      );
    }

    // Filter by color
    if (selectedFilters.color.length > 0) {
      filtered = filtered.filter(product =>
        product.variants.some(variant =>
          variant.selectedOptions?.some(
            opt =>
              (opt.name.toLowerCase() === 'color' || opt.name.toLowerCase() === 'colour') &&
              selectedFilters.color.includes(opt.value)
          )
        )
      );
    }

    // Filter by price range
    if (selectedFilters.priceRange.length > 0) {
      filtered = filtered.filter(product => {
        const price = parseFloat(product.price.amount);
        return selectedFilters.priceRange.some(range => {
          const priceRange = priceRanges.find(pr => pr.value === range);
          if (!priceRange) return false;
          return price >= priceRange.min && price < priceRange.max;
        });
      });
    }

    // Sort products
    if (selectedFilters.sort) {
      filtered.sort((a, b) => {
        const priceA = parseFloat(a.price.amount);
        const priceB = parseFloat(b.price.amount);

        switch (selectedFilters.sort) {
          case "price-asc":
            return priceA - priceB;
          case "price-desc":
            return priceB - priceA;
          case "newest":
            // Assuming products are already sorted by newest from API
            return 0;
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [products, selectedFilters]);

  // Convert selected filters to chip format
  const getActiveFilterChips = (): FilterChip[] => {
    const chips: FilterChip[] = [];

    selectedFilters.size.forEach((size: string) =>
      chips.push({ type: "size", value: size, display: `Size: ${size}` })
    );

    selectedFilters.color.forEach((color: string) =>
      chips.push({ type: "color", value: color, display: color })
    );

    selectedFilters.priceRange.forEach((range: string) => {
      const priceRange = priceRanges.find(pr => pr.value === range);
      if (priceRange) {
        chips.push({ type: "priceRange", value: range, display: priceRange.label });
      }
    });

    if (selectedFilters.sort) {
      const sortOption = sortOptions.find(opt => opt.value === selectedFilters.sort);
      if (sortOption) {
        chips.push({ type: "sort", value: selectedFilters.sort, display: sortOption.label });
      }
    }

    return chips;
  };

  // Remove individual filter
  const removeFilter = (chipType: keyof FilterState, chipValue: string): void => {
    setSelectedFilters((prev: FilterState) => {
      const updated: FilterState = { ...prev };

      if (chipType === "sort") {
        updated.sort = "";
      } else {
        updated[chipType] = updated[chipType].filter(
          (item: string) => item !== chipValue
        );
      }

      // updateURL(updated); // Uncomment for URL persistence
      return updated;
    });
  };

  // Clear all filters
  const clearAllFilters = (): void => {
    const clearedFilters = {
      size: [],
      sort: "",
      color: [],
      priceRange: [],
    };
    setSelectedFilters(clearedFilters);
    // updateURL(clearedFilters); // Uncomment for URL persistence
  };

  // Toggle size
  const toggleSize = (size: string): void => {
    setSelectedFilters((prev: FilterState) => ({
      ...prev,
      size: prev.size.includes(size)
        ? prev.size.filter((s: string) => s !== size)
        : [...prev.size, size],
    }));
  };

  // Toggle color
  const toggleColor = (color: string): void => {
    setSelectedFilters((prev: FilterState) => ({
      ...prev,
      color: prev.color.includes(color)
        ? prev.color.filter((c: string) => c !== color)
        : [...prev.color, color],
    }));
  };

  // Toggle price range
  const togglePriceRange = (range: string): void => {
    setSelectedFilters((prev: FilterState) => ({
      ...prev,
      priceRange: prev.priceRange.includes(range)
        ? prev.priceRange.filter((r: string) => r !== range)
        : [...prev.priceRange, range],
    }));
  };

  // Select sort
  const selectSort = (sortOption: string): void => {
    setSelectedFilters((prev: FilterState) => ({
      ...prev,
      sort: prev.sort === sortOption ? "" : sortOption,
    }));
  };

  // Apply filters and close modal
  const applyFilters = (): void => {
    // updateURL(selectedFilters); // Uncomment for URL persistence
    setShowFilterModal(false);
  };

  const formatPrice = (price: { amount: string; currencyCode: string }) => {
    const amount = parseFloat(price.amount);
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: price.currencyCode,
    }).format(amount);
  };

  const activeChips: FilterChip[] = getActiveFilterChips();
  const hasActiveFilters: boolean = activeChips.length > 0;

  return (
    <div className=" bg-gray-50 relative">
      {/* Heading Section */}
   

      {/* Filter Section */}
      <div className="mb-3 fixed bottom-8 left-2 right-2 z-40">
        {hasActiveFilters ? (
          <div className="bg-black/10 backdrop-blur-lg border-[0.5px] border-[#aeadad] rounded-3xl px-2 py-4 w-full shadow-sm">
            <div className="flex flex-wrap gap-2 items-center justify-center">
              {activeChips.map((chip: FilterChip, index: number) => (
                <div
                  key={`${chip.type}-${chip.value}-${index}`}
                  className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm"
                >
                  <span>{chip.display}</span>
                  <button
                    onClick={() => removeFilter(chip.type, chip.value)}
                    className="w-4 h-4 bg-gray-300 hover:bg-gray-400 rounded-full flex items-center justify-center transition-colors"
                    aria-label={`Remove ${chip.display} filter`}
                  >
                    <X size={8} />
                  </button>
                </div>
              ))}
            </div>
            <div className="buttonBox flex justify-center items-center gap-2 pt-4">
              <Button
                variant="outline"
                onClick={clearAllFilters}
                className="bg-white text-black py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors text-xs"
              >
                Clear All
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowFilterModal(true)}
                className="bg-[#FCCEE9] text-black py-2 border border-black rounded-full hover:bg-pink-500 transition-colors"
              >
                Filter & Sort
              </Button>
            </div>
          </div>
        ) : (
          <Button
            onClick={() => setShowFilterModal(true)}
            variant="outline"
            className="bg-black border rounded-full shadow-sm hover:shadow-md transition-shadow fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-10 text-white py-6 px-6 text-sm"
          >
            Filter & Sort
          </Button>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 bg-gray-100 border-[0.25px] border-b-[0.125px] border-[#aeadad] auto-rows-fr">
        {filteredProducts.map((product: SimpleProduct) => (
          <Link
            key={product.id}
            href={`/product/${product.handle}`}
            className="border-b-[0.25px] border-r-[0.25px] border-gray-400 flex flex-col group cursor-pointer hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex-1 bg-gray-100 flex justify-center items-center p-2 group-hover:bg-gray-200 transition-colors duration-200 min-h-[300px] md:min-h-[400px]">
              {product.featuredImage ? (
                <Image
                  src={product.featuredImage.url}
                  alt={product.featuredImage.altText || product.title}
                  width={400}
                  height={400}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  quality={90}
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
            </div>
            <div className="px-2 bg-white py-1 flex border-t-[0.5px] border-gray-200 justify-between items-center text-sm group-hover:bg-gray-50 transition-colors duration-200">
              <h3 className="font-inter text-xs font-normal group-hover:text-gray-700 transition-colors duration-200 truncate uppercase">
                {product.title}
              </h3>
              <p className="font-inter text-xs font-normal tracking-tight group-hover:text-gray-700 transition-colors duration-200">
                {formatPrice(product.price)}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* No Results Message */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No products found with the selected filters</p>
          <Button
            onClick={clearAllFilters}
            variant="outline"
            className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800"
          >
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full z-50">
          <div className="bg-white rounded-3xl px-[12px] py-4 overflow-y-auto border-[0.25px] border-[#aeadad] mx-[8px] mb-2 max-h-[98vh]">
            <div className="flex items-center justify-center mb-2">
              <h3 className="text-2xl tracking-tight uppercase">{categoryTitle}</h3>
            </div>
            <button
              onClick={() => setShowFilterModal(false)}
              className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center absolute right-7 top-5"
              aria-label="Close filter modal"
            >
              <X size={16} />
            </button>

            {/* Size Filter */}
            {availableSizes.length > 0 && (
              <div className="mb-5">
                <div className="text-sm tracking-tight font-medium mb-2">Size</div>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size: string) => (
                    <Button
                      key={size}
                      variant="outline"
                      onClick={() => toggleSize(size)}
                      className={`rounded-2xl text-sm border transition-colors p-2 w-12 h-8 ${
                        selectedFilters.size.includes(size)
                          ? "bg-black text-white border-black"
                          : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Filter */}
            {availableColors.length > 0 && (
              <div className="mb-5">
                <div className="text-sm tracking-tight font-medium mb-2">Color</div>
                <div className="flex flex-wrap gap-2">
                  {availableColors.map((color: string) => (
                    <Button
                      key={color}
                      variant="outline"
                      onClick={() => toggleColor(color)}
                      className={`rounded-2xl text-sm border transition-colors px-4 h-8 ${
                        selectedFilters.color.includes(color)
                          ? "bg-black text-white border-black"
                          : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Price Range Filter */}
            <div className="mb-5">
              <div className="text-sm tracking-tight font-medium mb-2">Price Range</div>
              <div className="flex flex-wrap gap-2">
                {priceRanges.map((range) => (
                  <Button
                    key={range.value}
                    variant="outline"
                    onClick={() => togglePriceRange(range.value)}
                    className={`rounded-2xl text-sm border transition-colors px-4 h-8 ${
                      selectedFilters.priceRange.includes(range.value)
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {range.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Sort Filter */}
            <div className="mb-5">
              <div className="text-sm tracking-tight font-medium mb-2">Sort By</div>
              <div className="flex flex-col gap-2">
                {sortOptions.map((sortOption) => (
                  <Button
                    key={sortOption.value}
                    variant="outline"
                    onClick={() => selectSort(sortOption.value)}
                    className={`px-4 py-4 text-sm rounded-2xl transition-colors ${
                      selectedFilters.sort === sortOption.value
                        ? "bg-black text-white"
                        : "bg-white text-black hover:bg-gray-200"
                    }`}
                  >
                    {sortOption.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Apply Button */}
            <div>
              <Button
                variant="outline"
                onClick={applyFilters}
                className="bg-[#FCCEE9] text-black py-4 border border-black rounded-full hover:bg-black hover:text-white transition-colors w-full"
              >
                Apply Filters ({filteredProducts.length})
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilter;