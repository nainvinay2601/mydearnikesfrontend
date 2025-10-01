

// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useState, useEffect } from "react";
// import { SimpleProduct } from "@/types/shopify";
// import { getLatestProducts } from "@/lib/shopify/client";

// const LatestDrop = () => {
//   const [products, setProducts] = useState<SimpleProduct[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [visibleItems, setVisibleItems] = useState(4); // Start with 4 visible items

//   useEffect(() => {
//     const fetchLatestProducts = async () => {
//       try {
//         setLoading(true);
//         const latestProducts = await getLatestProducts(12); // Fetch more than initially needed
//         setProducts(latestProducts);
//       } catch (err) {
//         setError('Failed to fetch latest products');
//         console.error('Error fetching latest products:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLatestProducts();
//   }, []);

//   const loadMore = () => {
//     setVisibleItems((prev) => Math.min(prev + 4, products.length));
//   };

//   const formatPrice = (price: { amount: string; currencyCode: string }) => {
//     const amount = parseFloat(price.amount);
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: price.currencyCode,
//     }).format(amount);
//   };

//   const visibleProducts = products.slice(0, visibleItems);
//   const hasMore = visibleItems < products.length;

//   if (loading) {
//     return (
//       <>
//         <div className="heading px-[8px] py-4">
//           <h1 className="uppercase text-2xl font-medium">Latest Drop</h1>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-3 bg-gray-100 border-t-[0.25px] border-[#aeadad] auto-rows-fr">
//           {[...Array(4)].map((_, index) => (
//             <div
//               key={index}
//               className="border-b-[0.25px] border-r-[0.25px] border-gray-400 flex flex-col"
//             >
//               <div className="flex-1 bg-gray-100 flex justify-center items-center p-2 animate-pulse">
//                 <div className="w-full h-64 bg-gray-300"></div>
//               </div>
//               <div className="px-2 bg-white py-1 flex border-t-[0.5px] border-gray-200 justify-between items-center text-sm">
//                 <div className="h-4 bg-gray-300 rounded w-3/4"></div>
//                 <div className="h-4 bg-gray-300 rounded w-1/4"></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <div className="heading px-[8px] py-4">
//           <h1 className="uppercase text-2xl font-medium">Latest Drop</h1>
//         </div>
//         <div className="p-4 text-red-500 text-center">
//           {error}
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <div className="heading px-[8px] py-4">
//         <h1 className="uppercase text-2xl font-medium">Latest Drop</h1>
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-3 bg-gray-100 border-t-[0.25px] border-[#aeadad] auto-rows-fr">
//         {visibleProducts.map((product, index) => (
//           <Link
//             key={product.id}
//             href={`/product/${product.handle}`}
//             className="border-b-[0.25px] border-r-[0.25px] border-gray-400 flex flex-col group cursor-pointer hover:bg-gray-50 transition-colors duration-200"
//           >
//             <div className="flex-1 bg-gray-100 flex justify-center items-center p-2 group-hover:bg-gray-200 transition-colors duration-200">
//               {product.featuredImage ? (
//                 <Image
//                   src={product.featuredImage.url}
//                   alt={product.featuredImage.altText || product.title}
//                   width={400}
//                   height={400}
//                   sizes="(max-width: 768px) 50vw, 33vw"
//                   quality={90}
//                   className="object-contain group-hover:scale-105 transition-transform duration-300"
//                   priority={index < 4} // Only prioritize first 4 images
//                 />
//               ) : (
//                 <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
//                   <span className="text-gray-500">No Image</span>
//                 </div>
//               )}
//             </div>
//             <div className="px-2 bg-white py-1 flex border-t-[0.5px] border-gray-200 justify-between items-center text-sm group-hover:bg-gray-50 transition-colors duration-200">
//               <h3 className="font-inter text-xs font-normal group-hover:text-gray-700 transition-colors duration-200 truncate">
//                 {product.title}
//               </h3>
//               <p className="font-inter text-xs font-normal tracking-tight group-hover:text-gray-700 transition-colors duration-200">
//                 {formatPrice(product.price)}
//               </p>
//             </div>
//           </Link>
//         ))}
//       </div>

//       {hasMore && (
//         <div className="flex justify-center py-4">
//           <button
//             onClick={loadMore}
//             className="bg-black text-white px-3 py-2 text-sm font-medium tracking-tight hover:bg-gray-800 transition-colors duration-200"
//           >
//             Explore More
//           </button>
//         </div>
//       )}
//     </>
//   );
// };

// export default LatestDrop;
// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useState, useEffect } from "react";
// import { SimpleProduct } from "@/types/shopify";
// import { getLatestProducts } from "@/lib/shopify/client";

// const LatestDrop = () => {
//   const [products, setProducts] = useState<SimpleProduct[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [visibleItems, setVisibleItems] = useState(6); // Start with 6 visible items

//   useEffect(() => {
//     const fetchLatestProducts = async () => {
//       try {
//         setLoading(true);
//         const latestProducts = await getLatestProducts(12); // Fetch exactly 12 products
//         setProducts(latestProducts);
//       } catch (err) {
//         setError('Failed to fetch latest products');
//         console.error('Error fetching latest products:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLatestProducts();
//   }, []);

//   const loadMore = () => {
//     setVisibleItems((prev) => Math.min(prev + 6, 12)); // Load 6 more, max 12
//   };

//   const formatPrice = (price: { amount: string; currencyCode: string }) => {
//     const amount = parseFloat(price.amount);
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: price.currencyCode,
//     }).format(amount);
//   };

//   const visibleProducts = products.slice(0, visibleItems);
//   const hasMore = visibleItems < 12 && products.length >= 12; // Check against 12 limit
//   const showExploreButton = visibleItems >= 12; // Show explore button when all 12 are visible

//   if (loading) {
//     return (
//       <>
//         <div className="heading px-[8px] py-4">
//           <h1 className="uppercase text-2xl font-medium">Latest Drop</h1>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-3 bg-gray-100 border-t-[0.25px] border-[#aeadad] auto-rows-fr">
//           {[...Array(6)].map((_, index) => (
//             <div
//               key={index}
//               className="border-b-[0.25px] border-r-[0.25px] border-gray-400 flex flex-col"
//             >
//               <div className="flex-1 bg-gray-100 flex justify-center items-center p-2 animate-pulse">
//                 <div className="w-full h-64 bg-gray-300"></div>
//               </div>
//               <div className="px-2 bg-white py-1 flex border-t-[0.5px] border-gray-200 justify-between items-center text-sm">
//                 <div className="h-4 bg-gray-300 rounded w-3/4"></div>
//                 <div className="h-4 bg-gray-300 rounded w-1/4"></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <div className="heading px-[8px] py-4">
//           <h1 className="uppercase text-2xl font-medium">Latest Drop</h1>
//         </div>
//         <div className="p-4 text-red-500 text-center">
//           {error}
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <div className="heading px-[8px] py-4 ">
//         <h1 className="uppercase text-2xl  font-bebas font-medium">Latest Drop</h1>
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-3 bg-gray-100 border-t-[0.25px] border-[#aeadad] auto-rows-fr">
//         {visibleProducts.map((product, index) => (
//           <Link
//             key={product.id}
//             href={`/product/${product.handle}`}
//             className="border-b-[0.25px] border-r-[0.25px] border-gray-400 flex flex-col group cursor-pointer hover:bg-gray-50 transition-colors duration-200"
//           >
//             <div className="flex-1 bg-gray-100 flex justify-center items-center p-2 group-hover:bg-gray-200 transition-colors duration-200">
//               {product.featuredImage ? (
//                 <Image
//                   src={product.featuredImage.url}
//                   alt={product.featuredImage.altText || product.title}
//                   width={400}
//                   height={400}
//                   sizes="(max-width: 768px) 50vw, 33vw"
//                   quality={90}
//                   className="object-contain group-hover:scale-105 transition-transform duration-300"
//                   priority={index < 6} // Prioritize first 6 images
//                 />
//               ) : (
//                 <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
//                   <span className="text-gray-500">No Image</span>
//                 </div>
//               )}
//             </div>
//             <div className="px-2 bg-white py-1 flex border-t-[0.5px] border-gray-200 justify-between items-center text-sm group-hover:bg-gray-50 transition-colors duration-200">
//               <h3 className="font-inter text-xs font-normal group-hover:text-gray-700 transition-colors duration-200 truncate uppercase">
//                 {product.title}
//               </h3>
//               <p className="font-inter text-xs font-normal tracking-tight group-hover:text-gray-700 transition-colors duration-200">
//                 {formatPrice(product.price)}
//               </p>
//             </div>
//           </Link>
//         ))}
//       </div>

//       {/* Load More button - shows when there are more items to load (6 → 12) */}
//       {hasMore && (
//         <div className="flex justify-center py-4">
//           <button
//             onClick={loadMore}
//             className="bg-black text-white px-3 py-2 text-sm font-medium tracking-tight hover:bg-gray-800 transition-colors duration-200"
//           >
//             Explore More
//           </button>
//         </div>
//       )}

//       {/* Final Explore Button - shows when all 12 items are visible */}
//       {showExploreButton && (
//         <div className="flex justify-center py-8">
//           <Link
//             href="/category/new-arrivals"
//             className="bg-black text-white px-8 py-3 text-sm font-medium tracking-tight hover:bg-gray-800 transition-colors duration-200 rounded-none border-none"
//           >
//             View All New Arrivals
//           </Link>
//         </div>
//       )}
//     </>
//   );
// };

// export default LatestDrop;
"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { SimpleProduct } from "@/types/shopify";
import { getLatestProducts } from "@/lib/shopify/client";

const LatestDrop = () => {
  const [products, setProducts] = useState<SimpleProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        setLoading(true);
        const latestProducts = await getLatestProducts(6); // Only fetch 6 products
        setProducts(latestProducts);
      } catch (err) {
        setError('Failed to fetch latest products');
        console.error('Error fetching latest products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProducts();
  }, []);

  const formatPrice = (price: { amount: string; currencyCode: string }) => {
    const amount = parseFloat(price.amount);
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: price.currencyCode,
    }).format(amount);
  };

  if (loading) {
    return (
      <>
        <div className="heading px-[8px] py-4">
          <h1 className="uppercase text-2xl font-bebas font-medium">Latest Drop</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 bg-gray-100 border-t-[0.25px] border-[#aeadad] auto-rows-fr">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="border-b-[0.25px] border-r-[0.25px] border-gray-400 flex flex-col"
            >
              <div className="flex-1 bg-gray-100 flex justify-center items-center p-2 animate-pulse">
                <div className="w-full h-64 bg-gray-300"></div>
              </div>
              <div className="px-2 bg-white py-1 flex border-t-[0.5px] border-gray-200 justify-between items-center text-sm">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="heading px-[8px] py-4">
          <h1 className="uppercase text-2xl font-bebas font-medium">Latest Drop</h1>
        </div>
        <div className="p-4 text-red-500 text-center">
          {error}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="heading px-[8px] py-4">
        <h1 className="uppercase text-2xl font-bebas font-medium">Latest Drop</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 bg-gray-100 border-t-[0.25px] border-[#aeadad]">
        {products.map((product, index) => (
          <Link
            key={product.id}
            href={`/product/${product.handle}`}
            className="border-b-[0.25px] border-r-[0.25px] border-gray-400 flex flex-col group cursor-pointer hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="relative aspect-square bg-gray-100 overflow-hidden group-hover:bg-gray-200 transition-colors duration-200">
              {product.featuredImage ? (
                <Image
                  src={product.featuredImage.url}
                  alt={product.featuredImage.altText || product.title}
                  width={500}
                  height={500}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  quality={90}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  priority={index < 6}
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

      {/* Explore More Button - always show, links to new arrivals page */}
      <div className="flex justify-center py-8">
        <Link
          href="/category/new-arrivals"
          className="bg-black text-white px-8 py-3 text-sm font-medium tracking-tight hover:bg-gray-800 transition-colors duration-200 rounded-none border-none"
        >
          Explore More
        </Link>
      </div>
    </>
  );
};

export default LatestDrop;