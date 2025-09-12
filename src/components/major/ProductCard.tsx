"use client";
import Image from "next/image";
import Link from "next/link";
import { SimpleProduct } from "@/types/shopify";

interface ProductCardProps {
  product: SimpleProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Get main product image
  const mainImage = product.featuredImage || product.images[0];
  // Format the price
  const formatPrice = (amount: string, currencyCode: string) => {
    const price = parseFloat(amount);
    if (currencyCode === "INR") {
      return `₹${price.toLocaleString("en-IN")}`;
    }
    return `${price.toLocaleString()}`;
  };

  const displayPrice = formatPrice(
    product.price.amount,
    product.price.currencyCode
  );

  //   Check if the product is on the sale or not
  const isOnSale =
    product.compareAtPrice &&
    parseFloat(product.compareAtPrice.amount) >
      parseFloat(product.price.amount);

  const compareAtPriceDisplay = product.compareAtPrice
    ? formatPrice(
        product.compareAtPrice.amount,
        product.compareAtPrice.currencyCode
      )
    : null;

  return (
    <Link
      href={`/product/${product.handle}`}
      className="border-b-[0.25px] border-r-[0.25px] border-gray-400  flex flex-col group relative"
    >
      <div className="flex-1 bg-gray-100 flex justify-center  items-center p-2">
        {mainImage ? (
          <Image
            src={mainImage.url}
            alt={mainImage.altText || product.title}
            width={400}
            height={400}
            sizes="(max-width:768px) 50vw, 33vw"
            quality={90}
            className="object-contain group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-64  bg-gray-200 flex items-center justify-center">
            <span>No Image</span>
          </div>
        )}
      </div>
      {/* price & title  */}
      <div className="px-2 bg-white  py-1 flex border-t-[0.5px]  border-gray-200 justify-between items-center text-sm ">
        <h3 className="font-inter text-xs  font-normal truncate flex-1 mr-2">
          {product.title}
        </h3>
        <div className="flex flex-col items-end">
          {isOnSale && compareAtPriceDisplay && (
            <p className="font-inter text-[10px] text-gray-400 line-through ">
              {compareAtPriceDisplay}
            </p>
          )}
          <p className="font-inter  text-xs  font-normal tracking-tight">
            {displayPrice}
          </p>
        </div>
      </div>

      {!product.availableForSale && (
        <div className="absolute  inset-0     bg-opacity-20 flex  items-center  justify-center ">
          <span>Out Of Stock </span>
        </div>
      )}
    </Link>
  );
}
