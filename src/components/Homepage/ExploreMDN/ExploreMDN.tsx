// import Image from "next/image";
// import React from "react";

// const ExploreMDN = () => {
//   return (
//     <>
//       <div className="heading px-[8px] py-4">
//         <h1 className="uppercase text-2xl font-medium">Explore Mydearnikes</h1>
//       </div>
//       <div className="grid grid-cols-2 md:grid-cols-3 bg-gray-100">
//         {/* Card 1 */}
//         <div className="border-t-[0.25px] border-l-[0.25px] border-gray-400 flex flex-col h-[280px]">
//           <div className="flex-1 bg-gray-100 flex justify-center items-center p-2">
//             <Image
//               src="/images/mdn.webp"
//               alt="Neon Tee"
//               width={200}
//               height={240}
//               className="w-full h-full object-contain"
//               priority
//             />
//           </div>
//           <div className="px-2 bg-white py-1 flex border-t-[0.5px] border-gray-200 justify-between items-center text-sm">
//             <h3 className="font-inter text-xs font-normal">Hello Nike</h3>
//             <p className="font-inter text-xs font-normal tracking-tight">₹1,299</p>
//           </div>
//         </div>

//         {/* Card 2 */}
//         <div className="border-t-[0.25px] border-l-[0.25px] border-gray-400 flex flex-col h-[280px]">
//           <div className="flex-1 bg-gray-100 flex justify-center items-center p-2">
//             <Image
//               src="/images/pcrace.webp"
//               alt="PC Race Tee"
//               width={200}
//               height={240}
//               className="w-full h-full object-contain"
//               priority
//             />
//           </div>
//           <div className="px-2 bg-white py-1 flex border-t-[0.5px] border-gray-200 justify-between items-center text-sm">
//             <h3 className="font-inter text-xs font-normal">Hello Nike</h3>
//             <p className="font-inter text-xs font-normal tracking-tight">₹1,299</p>
//           </div>
//         </div>

//         {/* Card 3 */}
//         <div className="border-t-[0.25px] border-l-[0.25px] border-gray-400 flex flex-col h-[280px]">
//           <div className="flex-1 bg-gray-100 flex justify-center items-center p-2">
//             <Image
//               src="/images/HRU.webp"
//               alt="MDN Pink Tee"
//               width={200}
//               height={240}
//               className="w-full h-full object-contain"
//               priority
//             />
//           </div>
//           <div className="px-2 bg-white py-1 flex border-t-[0.5px] border-gray-200 justify-between items-center text-sm">
//             <h3 className="font-inter text-xs font-normal">Hello Nike</h3>
//             <p className="font-inter text-xs font-normal tracking-tight">₹1,299</p>
//           </div>
//         </div>

//         {/* Card 4 */}
//         <div className="border-t-[0.25px] border-l-[0.25px] border-gray-400 flex flex-col h-[280px]">
//           <div className="flex-1 bg-gray-100 flex justify-center items-center p-2">
//             <Image
//               src="/images/blood.webp"
//               alt="MDN Pink Tee"
//               width={200}
//               height={240}
//               className="w-full h-full object-contain"
//               priority
//             />
//           </div>
//           <div className="px-2 bg-white py-1 flex border-t-[0.5px] border-gray-200 justify-between items-center text-sm">
//             <h3 className="font-inter text-xs font-normal">Hello Nike</h3>
//             <p className="font-inter text-xs font-normal tracking-tight">₹1,299</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ExploreMDN;

"use client";
import Image from "next/image";
import React, { useState } from "react";

const ExploreMDN = () => {
  // Sample product data - replace with your actual data
  const allProducts = [
    {
      id: 1,
      name: "Hello Nike",
      price: "₹1,299",
      image: "/images/mdn.webp",
      alt: "Neon Tee",
    },
    {
      id: 2,
      name: "Hello Nike",
      price: "₹1,299",
      image: "/images/pcrace.webp",
      alt: "PC Race Tee",
    },
    {
      id: 3,
      name: "Hello Nike",
      price: "₹1,299",
      image: "/images/MDNPink.webp",
      alt: "MDN Pink Tee",
    },
    {
      id: 4,
      name: "Hello Nike",
      price: "₹1,299",
      image: "/images/MDNPink.webp",
      alt: "MDN Pink Tee",
    },
    {
      id: 5,
      name: "Hello Nike",
      price: "₹1,299",
      image: "/images/mdn.webp",
      alt: "Neon Tee",
    },
    {
      id: 6,
      name: "Hello Nike",
      price: "₹1,299",
      image: "/images/pcrace.webp",
      alt: "PC Race Tee",
    },
    {
      id: 7,
      name: "Hello Nike",
      price: "₹1,299",
      image: "/images/MDNPink.webp",
      alt: "MDN Pink Tee",
    },
    {
      id: 8,
      name: "Hello Nike",
      price: "₹1,299",
      image: "/images/mdn.webp",
      alt: "Neon Tee",
    },
  ];

  const [visibleItems, setVisibleItems] = useState(4);

  const loadMore = () => {
    setVisibleItems((prev) => Math.min(prev + 4, allProducts.length));
  };

  const visibleProducts = allProducts.slice(0, visibleItems);
  const hasMore = visibleItems < allProducts.length;

  return (
    <>
      <div className="heading px-[8px] py-4">
        <h1 className="uppercase text-2xl font-medium">Explore Mydearnikes</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 bg-gray-100 border-[0.25px] border-b-[0.125px] border-[#aeadad] auto-rows-fr">
        {visibleProducts.map((product) => (
          <div
            key={product.id}
            className="border-b-[0.25px] border-r-[0.25px] border-gray-400 flex flex-col "
          >
            <div className="flex-1 bg-gray-100 flex justify-center items-center p-2">
              {/* <Image
                src={product.image}
                alt={product.alt}
                width={400}
                height={480}
                className=" "
                priority={product.id <= 4} // Only prioritize first 4 images
              /> */}
              <Image
                src={product.image}
                alt={product.alt}
                width={400}
                height={400}
                sizes="(max-width: 768px) 50vw, 33vw" // <-- helps Next.js pick the right src
                quality={90} // <-- sharper
                className="object-contain"
                priority={product.id <=4} //Only prioritize the first 4 
              />
            </div>
            <div className="px-2 bg-white py-1 flex border-t-[0.5px] border-gray-200 justify-between items-center text-sm">
              <h3 className="font-inter text-xs font-normal">{product.name}</h3>
              <p className="font-inter text-xs font-normal tracking-tight">
                {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center py-4">
          <button
            onClick={loadMore}
            className="bg-black text-white px-3 py-2 text-sm font-medium  tracking-tight hover:bg-gray-800 transition-colors duration-200"
          >
            Explore More
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreMDN;
