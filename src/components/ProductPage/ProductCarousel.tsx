// import { SimpleProduct } from "@/types/shopify";
// import ProductCard from "@/components/major/ProductCard";

// interface ProductCarouselProps {
//   products: SimpleProduct[];
//   title?: string;
// }

// export default function ProductCarousel({ products, title = "You May Also Like" }: ProductCarouselProps) {
//   if (products.length === 0) return null;

//   return (
//     <div className="mt-12 w-full">
//       <h2 className="text-2xl lg:text-3xl font-medium px-[8px] mb-4">{title}</h2>
      
//       <div className="overflow-x-auto scrollbar-hide px-[8px]">
//         <div className="flex gap-0 pb-4 border-[0.125px]  bg-gray-100">
//           {products.map((product) => (
//             <div key={product.id} className="flex-shrink-0 w-[50vw] md:w-[33.33vw] lg:w-[25vw]">
//               <ProductCard product={product} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import { SimpleProduct } from "@/types/shopify";
import Image from "next/image";
import Link from "next/link";

interface ProductCarouselProps {
  products: SimpleProduct[];
  title?: string;
}

export default function ProductCarousel({ products, title = "You May Also Like" }: ProductCarouselProps) {
  if (products.length === 0) return null;

  const formatPrice = (amount: string, currencyCode: string) => {
    const price = parseFloat(amount);
    if (currencyCode === "INR") {
      return `₹${price.toLocaleString("en-IN")}`;
    }
    return `$${price.toLocaleString()}`;
  };

  return (
    <div className="mt-0 w-full mx-[8px] lg:mx-0 ">
      <h2 className="text-2xl lg:text-3xl font-medium px-[8px] ">{title}</h2>
      
      <div className="overflow-x-auto scrollbar-hide ">
        <div className="inline-grid grid-cols-1 grid-rows-1 grid-flow-col gap-0 bg-gray-100 border-[0.25px] border-b-[0.125px] border-[#aeadad] auto-cols-[50vw] md:auto-cols-[33.33vw] lg:auto-cols-[25vw]">
          {products.map((product) => {
            const mainImage = product.featuredImage || product.images[0];
            const displayPrice = formatPrice(
              product.price.amount,
              product.price.currencyCode
            );

            return (
              <Link
                key={product.id}
                href={`/product/${product.handle}`}
                className="border-b-[0.25px] border-r-[0.25px] border-gray-400 flex flex-col group relative"
              >
                <div className="relative aspect-square bg-gray-100 overflow-hidden group-hover:bg-gray-200 transition-colors duration-200">
                  {mainImage ? (
                    <Image
                      src={mainImage.url}
                      alt={mainImage.altText || product.title}
                      width={500}
                      height={500}
                      sizes="(max-width: 768px) 50vw, 33vw"
                      quality={90}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center absolute inset-0">
                      <span className="text-gray-400 text-sm">No Image</span>
                    </div>
                  )}
                </div>
                <div className="px-2 bg-white py-1 flex border-t-[0.5px] border-gray-200 justify-between items-center text-sm">
                  <h3 className="font-inter text-xs font-normal truncate uppercase">
                    {product.title}
                  </h3>
                  <p className="font-inter text-xs font-normal tracking-tight">
                    {displayPrice}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}