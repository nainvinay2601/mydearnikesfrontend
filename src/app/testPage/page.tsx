import { X } from "lucide-react";
import { useState } from "react";

//Type Definition -> keeps var -> assign type to each

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  size: string[];
  color: string;
}

interface FilterState {
  category: string[];
  size: string[];
  sort: string;
  color: string[];
}

interface FilterChip {
  type: keyof FilterState;
  value: string;
  display: string;
}

interface FilterOptions {
  categories: string[];
  sizes: string[];
  sortOptions: string[];
  colors: string[];
}

const EcommerceFilter: React.FC = () => {
  //Mock Products for development testing
  const mockProducts: Product[] = [
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

  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    category: [],
    size: [],
    sort: "",
    color: [],
  });

  // Filter options
  const filterOptions: FilterOptions = {
    categories: ["Baby Tees", "Fitted Tees", "Oversized Tees", "Blanks"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    sortOptions: ["High - Low Price", "Low - High Price"],
    colors: ["Pink", "White", "Black"],
  };

  // Convert selected filters into a chip format
  const getActiveFilterChips = (): FilterChip[] => {
    const chips: FilterChip[] = [];

    selectedFilters.category.forEach((cat: string) =>
      chips.push({ type: "category", value: cat, display: cat })
    );

    selectedFilters.size.forEach((size: string) =>
      chips.push({ type: "size", value: size, display: size })
    );

    if (selectedFilters.sort) {
      chips.push({
        type: "sort",
        value: selectedFilters.sort,
        display: selectedFilters.sort,
      });
    }

    selectedFilters.color.forEach((color: string) =>
      chips.push({ type: "color", value: color, display: color })
    );

    return chips;
  };

  // Remove Individual Filter
  const removeFilter = (
    chipType: keyof FilterState,
    chipValue: string
  ): void => {
    setSelectedFilters((prev: FilterState) => {
      const updated: FilterState = { ...prev };

      if (chipType === "sort") {
        updated.sort = "";
      } else {
        // type safe handling array
        if (chipType === "category") {
          updated.category = updated.category.filter(
            (item: string) => item !== chipValue
          );
        } else if (chipType === "size") {
          updated.size = updated.size.filter(
            (item: string) => item !== chipValue
          );
        } else if (chipType === "color") {
          updated.color = updated.color.filter(
            (item: string) => item !== chipValue
          );
        }
      }

      return updated;
    });
  };

  // Clear all filters
  const clearAllFilters = (): void => {
    setSelectedFilters({
      category: [],
      size: [],
      sort: "",
      color: [],
    });
  };

  // handle category selection
  const toggleCategory = (category: string): void => {
    setSelectedFilters((prev: FilterState) => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter((c: string) => c !== category)
        : [...prev.category, category],
    }));
  };

  // Handle Sort Selection (radio button)

  const selectSort = (sortOption: string): void => {
    setSelectedFilters((prev: FilterState) => ({
      ...prev,
      sort: prev.sort === sortOption ? "" : sortOption,
    }));
  };

  // Handle color
  const toggleColor = (color: string): void => {
    setSelectedFilters((prev: FilterState) => ({
      ...prev,
      color: prev.color.includes(color)
        ? prev.color.filter((c: string) => c !== color)
        : [...prev.color, color],
    }));
  };

  // Handle Modal Close 
  const closeModal  = ():void =>  { 
    setShowFilterModal(false);
  }

  // handle modal open 
  const openModal = ():void => { 
    setShowFilterModal(true)
  }

  // active chips state 
  const activeChips: FilterChip[] = getActiveFilterChips(); 
  const hasActiveFilters: boolean  = activeChips.length > 0;

  // ============ end of states ===================
  return(
    <div>
      {/* filter section  */}
      <div className="mb-6">
        { 
          hasActiveFilters ? (
            // Show filter chips  when filters are active
            <div className="bg-white/80  backdrop-blur-sm  border-gray-800  rounded-lg p-4 shadow-sm">
              <div className="flex flex-wrap gap-2 items-center">
                {activeChips.map((chip:FilterChip, index:number)=>(
                  <div key={`${chip.type}-${chip.value}-${index}`}  className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm">
                    <span> {chip.display}</span>
                    <button></button>
                    </div>
                ))}
                </div> 
              </div>
          )
        }
      </div>
    </div>
  )
 
  // end
};
export default EcommerceFilter;