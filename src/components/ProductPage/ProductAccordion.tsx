// "use client";
// import { useState } from "react";
// import { SimpleProduct } from "@/types/shopify";

// interface ProductAccordionProps {
//   product: SimpleProduct;
// }

// const ProductAccordion = ({ product }: ProductAccordionProps) => {
//   const [openIndex, setOpenIndex] = useState<number | null>(null);

//   const data = [
//     {
//       title: "Overview",
//       content:
//         product.description ||
//         "This premium product offers exceptional quality and style.",
//     },
//     {
//       title: "Fit",
//       content:
//         "Regular fit with comfortable sizing. Check our size guide for the perfect fit.",
//     },
//     {
//       title: "Material",
//       content: "Made from high-quality materials for durability and comfort.",
//     },
//     {
//       title: "Care",
//       content:
//         "Machine wash cold with similar colors. Tumble dry low. Do not bleach.",
//     },
//   ];

//   return (
//     <div className="mt-7  focus:outline-none">
//       {data.map((item, idx) => (
//         <div key={idx} className="py-1 px-[8px]">
//           <button
//             onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
//             className="w-full flex justify-start items-center border-t-[0.25px] border-[#aeadad] pt-2 text-lg font-semibold"
//           >
//             <span>{item.title}</span>
//             <span className="ml-2">{openIndex === idx ? "-" : "+"} </span>
//           </button>
//           {openIndex === idx && (
//             <div>
//               <p className="text-xs text-gray-500 pb-1 pt-[3px]">
//                 {item.content}
//               </p>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductAccordion;
"use client";
import { useState } from "react";
import { SimpleProduct } from "@/types/shopify";
import ProductCarousel from "@/components/ProductPage/ProductCarousel";

interface ProductAccordionProps {
  product: SimpleProduct;
  relatedProducts?: SimpleProduct[];
}

const ProductAccordion = ({ product, relatedProducts = [] }: ProductAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const data = [
    {
      title: "Overview",
      content:
        product.description ||
        "This premium product offers exceptional quality and style.",
      type: "text"
    },
    {
      title: "Fit",
      content:
        "Regular fit with comfortable sizing. Check our size guide for the perfect fit.",
      type: "text"
    },
    {
      title: "Material",
      content: "Made from high-quality materials for durability and comfort.",
      type: "text"
    },
    {
      title: "Care",
      content:
        "Machine wash cold with similar colors. Tumble dry low. Do not bleach.",
      type: "text"
    },
    {
      title: "You May Also Like",
      content: null,
      type: "carousel",
      mobileOnly: true // Add this flag
    }
  ];

  return (
    <div className="mt-7 focus:outline-none">
      {data.map((item, idx) => (
        <div key={idx} className={`py-1 px-[8px] ${item.mobileOnly ? 'lg:hidden' : ''}`}>
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full flex justify-start items-center border-t-[0.25px] border-[#aeadad] pt-2 text-lg font-semibold"
          >
            <span>{item.title}</span>
            <span className="ml-2">{openIndex === idx ? "-" : "+"}</span>
          </button>
          {openIndex === idx && (
            <div className="mt-2">
              {item.type === "text" ? (
                <p className="text-xs text-gray-500 pb-1 pt-[3px]">
                  {item.content}
                </p>
              ) : (
                <div className="-mx-[8px]">
                  <ProductCarousel products={relatedProducts} title="" />
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductAccordion;