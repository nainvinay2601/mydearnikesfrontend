// "use client";
// import { useState } from "react";

// import { X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";

// // Type definitions
// interface Product {
//   id: number;
//   name: string;
//   alt: string;
//   image: string;
//   price: number;
//   category: string;
//   size: string[];
//   color: string;
// }

// interface FilterState {
//   category: string[];
//   size: string[];
//   sort: string;
//   color: string[];
// }

// interface FilterChip {
//   type: keyof FilterState;
//   value: string;
//   display: string;
// }

// interface FilterOptions {
//   categories: string[];
//   sizes: string[];
//   sortOptions: string[];
//   colors: string[];
// }

// const EcommerceFilter: React.FC = () => {
//   // Mock products for demonstration
//   const mockProducts: Product[] = [
//     {
//       id: 1,
//       name: "PC Race Master",
//       alt: "Product Image1",
//       image: "/images/pcrace.webp",
//       price: 1299,
//       category: "Baby Tees",
//       size: ["S", "M", "L"],
//       color: "White",
//     },
//     {
//       id: 2,
//       name: "Blood Edition",
//       alt: "Product Image1",
//       image: "/images/blood.webp",
//       price: 1199,
//       category: "Fitted Tees",
//       size: ["M", "L", "XL"],
//       color: "Black",
//     },
//     {
//       id: 3,
//       name: "Baby Tee",
//       alt: "Product Image1",
//       image: "/images/mdn.webp",
//       price: 999,
//       category: "Oversized Tees",
//       size: ["L", "XL", "XXL"],
//       color: "White",
//     },
//     {
//       id: 4,
//       name: "Classic Blank",
//       alt: "Product Image1",
//       image: "/images/MDNPink.webp",
//       price: 799,
//       category: "Blanks",
//       size: ["S", "M"],
//       color: "Pink",
//     },
  
//   ];

//   const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
//   const [products, setProducts] = useState<Product[]>(mockProducts);
//   const [selectedFilters, setSelectedFilters] = useState<FilterState>({
//     category: [],
//     size: [],
//     sort: "",
//     color: [],
//   });

//   // Filter options
//   const filterOptions: FilterOptions = {
//     categories: ["Baby Tees", "Fitted Tees", "Oversized Tees", "Blanks"],
//     sizes: ["XS", "S", "M", "L", "XL", "XXL"],
//     sortOptions: ["High - Low", "Low - High"],
//     colors: ["Pink", "White", "Black"],
//   };

//   // Convert selected filters to chip format
//   const getActiveFilterChips = (): FilterChip[] => {
//     const chips: FilterChip[] = [];

//     selectedFilters.category.forEach((cat: string) =>
//       chips.push({ type: "category", value: cat, display: cat })
//     );

//     selectedFilters.size.forEach((size: string) =>
//       chips.push({ type: "size", value: size, display: size })
//     );

//     if (selectedFilters.sort) {
//       chips.push({
//         type: "sort",
//         value: selectedFilters.sort,
//         display: selectedFilters.sort,
//       });
//     }

//     selectedFilters.color.forEach((color: string) =>
//       chips.push({ type: "color", value: color, display: color })
//     );

//     return chips;
//   };

//   // Remove individual filter
//   const removeFilter = (
//     chipType: keyof FilterState,
//     chipValue: string
//   ): void => {
//     setSelectedFilters((prev: FilterState) => {
//       const updated: FilterState = { ...prev };

//       if (chipType === "sort") {
//         updated.sort = "";
//       } else {
//         // Type-safe handling of array fields
//         if (chipType === "category") {
//           updated.category = updated.category.filter(
//             (item: string) => item !== chipValue
//           );
//         } else if (chipType === "size") {
//           updated.size = updated.size.filter(
//             (item: string) => item !== chipValue
//           );
//         } else if (chipType === "color") {
//           updated.color = updated.color.filter(
//             (item: string) => item !== chipValue
//           );
//         }
//       }

//       return updated;
//     });
//   };

//   // Clear all filters
//   const clearAllFilters = (): void => {
//     setSelectedFilters({
//       category: [],
//       size: [],
//       sort: "",
//       color: [],
//     });
//   };

//   // Handle category selection
//   const toggleCategory = (category: string): void => {
//     setSelectedFilters((prev: FilterState) => ({
//       ...prev,
//       category: prev.category.includes(category)
//         ? prev.category.filter((c: string) => c !== category)
//         : [...prev.category, category],
//     }));
//   };

//   // Handle size selection
//   const toggleSize = (size: string): void => {
//     setSelectedFilters((prev: FilterState) => ({
//       ...prev,
//       size: prev.size.includes(size)
//         ? prev.size.filter((s: string) => s !== size)
//         : [...prev.size, size],
//     }));
//   };

//   // Handle sort selection (radio)
//   const selectSort = (sortOption: string): void => {
//     setSelectedFilters((prev: FilterState) => ({
//       ...prev,
//       sort: prev.sort === sortOption ? "" : sortOption,
//     }));
//   };

//   // Handle color selection
//   const toggleColor = (color: string): void => {
//     setSelectedFilters((prev: FilterState) => ({
//       ...prev,
//       color: prev.color.includes(color)
//         ? prev.color.filter((c: string) => c !== color)
//         : [...prev.color, color],
//     }));
//   };

//   // Apply filters and close modal
//   const applyFilters = (): void => {
//     // Here you would typically call your API or filter logic
//     console.log("Applying filters:", selectedFilters);
//     setShowFilterModal(false);
//   };

//   // Handle modal close
//   const closeModal = (): void => {
//     setShowFilterModal(false);
//   };

//   // Handle modal open
//   const openModal = (): void => {
//     setShowFilterModal(true);
//   };

//   const activeChips: FilterChip[] = getActiveFilterChips();
//   const hasActiveFilters: boolean = activeChips.length > 0;

//   return (
//     <div className=" pt-16 bg-gray-50 relative ">
//       {/* heading Section */}
//       <div className="headingClass py-4 px-[8px] tracking-tight font-semibold tetx-md">
//         <div>Today's Agenda: Tees</div>
//       </div>
//       {/* Filter Section */}
//       <div className="mb-3 fixed bottom-8 left-2 right-2 ">
//         {hasActiveFilters ? (

//           <div className="bg-black/10 backdrop-blur-lg border-[0.5px] border-[#aeadad] rounded-3xl px-2 py-4  w-full shadow-sm  ">
//             <div className="flex flex-wrap gap-2 items-center justify-center">
//               {activeChips.map((chip: FilterChip, index: number) => (
//                 <div
//                   key={`${chip.type}-${chip.value}-${index}`}
//                   className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm"
//                 >
//                   <span>{chip.display}</span>
//                   <button
//                     onClick={() => removeFilter(chip.type, chip.value)}
//                     className="w-4 h-4 bg-gray-300 hover:bg-gray-400 rounded-full flex items-center justify-center transition-colors"
//                     aria-label={`Remove ${chip.display} filter`}
//                   >
//                     <X size={8} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <div className="buttonBox flex justify-center items-center pt-4 ">
//               <Button
//                 variant={"outline"}
//                 onClick={openModal}
//                 className=" bg-[#FCCEE9] text-black py-2 border border-black rounded-full    hover:bg-pink-500 transition-colors "
//               >
//                 Filter & Sort
//               </Button>
//             </div>
//           </div>
//         ) : (
//           // Show filter button when no filters active
//           <Button
//             onClick={openModal}
//             variant={"outline"}
//             className="bg-black border  rounded-full shadow-sm hover:shadow-md transition-shadow fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-10 
//              text-white py-6 px-6 text-sm
//             "
//           >
//             Filter & Sort
//           </Button>
//         )}
//       </div>

//       {/* Product Grid */}

//       <div className="grid grid-cols-2 md:grid-cols-3 bg-gray-100 border-[0.25px] border-b-[0.125px] border-[#aeadad] auto-rows-fr">
//         {products.map((product: Product) => (
//           <div
//             key={product.id}
//             className="border-b-[0.25px] border-r-[0.25px] border-gray-400 flex flex-col "
//           >
//             <div className="flex-1 bg-gray-100 flex justify-center items-center p-2">
//               <Image
//                 src={product.image}
//                 alt={product.alt}
//                 width={400}
//                 height={400}
//                 sizes="(max-width: 768px) 50vw, 33vw" // <-- helps Next.js pick the right src
//                 quality={90} // <-- sharper
//                 className="object-contain"
//                 priority={product.id <= 4} //Only prioritize the first 4
//               />
//             </div>
//             <div className="px-2 bg-white py-1 flex border-t-[0.5px] border-gray-200 justify-between items-center text-sm">
//               <h3 className="font-inter text-xs font-normal">{product.name}</h3>
//               <p className="font-inter text-xs font-normal tracking-tight">
//                 ₹ {product.price}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Filter Modal */}
//       {showFilterModal && (
//         <div className=" fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full  z-50">
//           <div className="bg-white  rounded-3xl px-[12px] py-4 overflow-y-auto border-[0.25px] border-[#aeadad]   mx-[8px] mb-2">
//             <div className="flex items-center justify-center mb-2">
//               <h3 className="text-2xl tracking-tight">TEES</h3>
//             </div>
//             <button
//               onClick={closeModal}
//               className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center absolute right-7 top-5"
//               aria-label="Close filter modal"
//             >
//               <X size={16} />
//             </button>

//             {/* Category Filter */}
//             <div className="mb-5 ">
//               <div className="text-sm tracking-tight font-medium  mb-2">
//                 Category
//               </div>
//               <div className="flex flex-wrap gap-3">
//                 {filterOptions.categories.map((category: string) => (
//                   <Button
//                     key={category}
//                     variant={"outline"}
//                     onClick={() => toggleCategory(category)}
//                     className={`px-2 py-2 rounded-full text-sm border transition-colors ${
//                       selectedFilters.category.includes(category)
//                         ? "bg-black text-white border-black"
//                         : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
//                     }`}
//                   >
//                     {category}
//                   </Button>
//                 ))}
//               </div>
//             </div>

//             {/* Size Filter */}
//             <div className="mb-5">
//               <div className="text-sm tracking-tight font-medium mb-2">
//                 Size
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 {filterOptions.sizes.map((size: string) => (
//                   <Button
//                     key={size}
//                     variant={"outline"}
//                     onClick={() => toggleSize(size)}
//                     className={` rounded-2xl text-sm border transition-colors p-2 w-12 h-8 ${
//                       selectedFilters.size.includes(size)
//                         ? "bg-black text-white border-black"
//                         : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
//                     }`}
//                   >
//                     {size}
//                   </Button>
//                 ))}
//               </div>
//             </div>

//             {/* Sort Filter */}
//             <div className="mb-5">
//               <div className="text-sm tracking-tight font-medium mb-2">
//                 Sort
//               </div>
//               <div className=" flex gap-2 ">
//                 {filterOptions.sortOptions.map((sortOption: string) => (
//                   <Button
//                     key={sortOption}
//                     variant={"outline"}
//                     onClick={() => selectSort(sortOption)}
//                     className={` px-4 py-4 text-sm rounded-2xl  transition-colors ${
//                       selectedFilters.sort === sortOption
//                         ? "bg-black text-white"
//                         : "bg-white text-black hover:bg-gray-200"
//                     }`}
//                   >
//                     {sortOption}
//                   </Button>
//                 ))}
//               </div>
//             </div>

//             {/* Color Filter */}

//             <div className="mb-5">
//               <div className="text-sm tracking-tight font-medium mb-2">
//                 Color
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 {filterOptions.colors.map((color: string) => (
//                   <Button
//                     key={color}
//                     variant={"outline"}
//                     onClick={() => toggleColor(color)}
//                     className={`rounded-2xl text-sm border transition-colors px-4 h-8 ${
//                       selectedFilters.color.includes(color)
//                         ? "bg-black text-white border-black"
//                         : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
//                     }`}
//                   >
//                     {color}
//                   </Button>
//                 ))}
//               </div>
//             </div>

//             {/* Apply Button */}
//             <div>
//               <Button
//                 variant={"outline"}
//                 onClick={applyFilters}
//                 className=" bg-[#FCCEE9] text-black py-4 border border-black rounded-full   hover:bg-black hover:text-white transition-colors "
//               >
//                 Filter & Sort
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EcommerceFilter;
