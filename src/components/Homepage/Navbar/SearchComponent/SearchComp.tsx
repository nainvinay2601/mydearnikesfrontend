

// "use client";

// import React, { useState, useEffect } from "react";
// import SearchBar from "../SearchBar/SearchBar";
// import NavCarousel from "../NavImageCarousel/NavCarousel";
// import { SimpleProduct } from "@/types/shopify";
// import { getLatestProducts, searchProducts } from "@/lib/shopify/client";

// const RECENT_KEY = "recent-searches";

// interface SearchComponentProps {
//   onClose?: () => void; // Add this prop to receive close handler from parent
// }

// const SearchComponent = ({ onClose }: SearchComponentProps) => {
//   const [query, setQuery] = useState("");
//   const [products, setProducts] = useState<SimpleProduct[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [recents, setRecents] = useState<string[]>(() => {
//     if (typeof window === "undefined") return [];
//     try {
//       return JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
//     } catch {
//       return [];
//     }
//   });

//   // Load latest products on mount if no recents
//   useEffect(() => {
//     if (recents.length === 0 && !query) {
//       loadLatestProducts();
//     }
//   }, []);

//   // Search products when query changes
//   useEffect(() => {
//     if (!query.trim()) {
//       if (recents.length === 0) {
//         loadLatestProducts();
//       } else {
//         setProducts([]);
//       }
//       return;
//     }

//     const debounceTimer = setTimeout(async () => {
//       setLoading(true);
//       try {
//         const results = await searchProducts(query, 20);
//         setProducts(results);
//       } catch (error) {
//         console.error("Search error:", error);
//         setProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     }, 300);

//     return () => clearTimeout(debounceTimer);
//   }, [query, recents.length]);

//   const loadLatestProducts = async () => {
//     setLoading(true);
//     try {
//       const latest = await getLatestProducts(10);
//       setProducts(latest);
//     } catch (error) {
//       console.error("Error loading latest products:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addRecent = (term: string) => {
//     if (typeof window === "undefined") return;
//     const next = [term, ...recents.filter((r) => r !== term)].slice(0, 3);
//     setRecents(next);
//     localStorage.setItem(RECENT_KEY, JSON.stringify(next));
//   };

//   const handleProductClick = () => {
//     // Save the search query as recent if there is one
//     if (query.trim()) {
//       addRecent(query.trim());
//     }
//     // Close the search menu
//     onClose?.();
//   };

//   return (
//     <div className="bg-white">
//       <SearchBar
//         query={query}
//         setQuery={setQuery}
//         recents={recents}
//         addRecent={addRecent}
//       />
//       <NavCarousel 
//         products={products} 
//         loading={loading}
//         showRecents={!query && recents.length > 0}
//         onProductClick={handleProductClick}
//       />
//     </div>
//   );
// };

// export default SearchComponent;

"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import NavCarousel from "../NavImageCarousel/NavCarousel";
import { SimpleProduct } from "@/types/shopify";
import { getLatestProducts, searchProducts } from "@/lib/shopify/client";
import { motion, AnimatePresence, Variants } from "framer-motion";

const RECENT_KEY = "recent-searches";

interface SearchComponentProps {
  onClose?: () => void;
}

const SearchComponent = ({ onClose }: SearchComponentProps) => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<SimpleProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [recents, setRecents] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
    } catch {
      return [];
    }
  });

  // Animation variants with proper typing
  const containerVariants: Variants = {
    hidden: { 
      opacity: 0,
      scale: 0.98
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  const searchBarVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: -30 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const carouselVariants: Variants = {
    hidden: { 
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const loadingVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  // Load latest products on mount if no recents
  useEffect(() => {
    if (recents.length === 0 && !query) {
      loadLatestProducts();
    }
  }, []);

  // Search products when query changes
  useEffect(() => {
    if (!query.trim()) {
      if (recents.length === 0) {
        loadLatestProducts();
      } else {
        setProducts([]);
      }
      return;
    }

    const debounceTimer = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await searchProducts(query, 20);
        setProducts(results);
      } catch (error) {
        console.error("Search error:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query, recents.length]);

  const loadLatestProducts = async () => {
    setLoading(true);
    try {
      const latest = await getLatestProducts(10);
      setProducts(latest);
    } catch (error) {
      console.error("Error loading latest products:", error);
    } finally {
      setLoading(false);
    }
  };

  const addRecent = (term: string) => {
    if (typeof window === "undefined") return;
    const next = [term, ...recents.filter((r) => r !== term)].slice(0, 3);
    setRecents(next);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  };

  const handleProductClick = () => {
    if (query.trim()) {
      addRecent(query.trim());
    }
    onClose?.();
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="bg-white"
      >
        <motion.div variants={searchBarVariants}>
          <SearchBar
            query={query}
            setQuery={handleQueryChange}
            recents={recents}
            addRecent={addRecent}
          />
        </motion.div>
        
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              variants={loadingVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex justify-center items-center py-8"
            >
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              variants={carouselVariants}
              initial="hidden"
              animate="visible"
            >
              <NavCarousel 
                products={products} 
                loading={loading}
                showRecents={!query && recents.length > 0}
                onProductClick={handleProductClick}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchComponent;