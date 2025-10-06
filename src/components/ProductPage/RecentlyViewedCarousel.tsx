import { SimpleProduct } from "@/types/shopify";
import Image from "next/image";
import Link from "next/link";

interface RecentlyViewedCarouselProps {
  products: SimpleProduct[];
  title?: string;
  minItems?: number;
}

export default function RecentlyViewedCarousel({ 
  products, 
  title = "Recently Viewed",
  minItems = 2 // Only show if at least 2 products
}: RecentlyViewedCarouselProps) {
  if (products.length < minItems) return null;

  const formatPrice = (amount: string, currencyCode: string) => {
    const price = parseFloat(amount);
    if (currencyCode === "INR") {
      return `₹${price.toLocaleString("en-IN")}`;
    }
    return `$${price.toLocaleString()}`;
  };

  return (
    <div className="mt-8 w-full mx-[8px] lg:mx-[8px]">
      <h2 className="text-[36px] lg:text-[48px] font-bold">{title}</h2>
      
      {/* Prevent body scroll with max-w-full and overflow containment */}
      <div className="max-w-full overflow-hidden">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="inline-flex min-w-max bg-gray-100 border-[0.25px] border-b-[0.125px] border-[#aeadad]">
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
                  className="w-[50vw] md:w-[33.33vw] lg:w-[25vw] border-b-[0.25px] border-r-[0.25px] border-gray-400 flex flex-col group relative flex-shrink-0"
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
    </div>
  );
}