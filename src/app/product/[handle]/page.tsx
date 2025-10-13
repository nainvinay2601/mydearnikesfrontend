

// "use client";
// import { notFound } from "next/navigation";
// import { getProductByHandle, getRandomProducts } from "@/lib/shopify/client";
// import { SimpleProduct, ProductVariant } from "@/types/shopify";
// import ImageCarousel from "@/components/ProductPage/ImageCarousel";
// import ProductInfo from "@/components/ProductPage/ProductInfo";
// import SizeSelector from "@/components/ProductPage/SizeSelector";
// import ColorSelector from "@/components/ProductPage/ColorSelector";
// import ProductQuantity from "@/components/ProductPage/ProductQuantity";
// import ProductAccordion from "@/components/ProductPage/ProductAccordion";
// import BuyNow from "@/components/ProductPage/BuyNow";
// import ProductCarousel from "@/components/ProductPage/ProductCarousel";
// import { useEffect, useState, useCallback } from "react";
// import { 
//   addRecentlyViewed, 
//   getRecentlyViewedExcluding, 
//   RecentProduct,
//   convertRecentToSimpleProduct 
// } from "@/lib/shopify/recentlyViewed";
// import RecentlyViewedCarousel from "@/components/ProductPage/RecentlyViewedCarousel";

// interface ProductPageProps {
//   params: Promise<{
//     handle: string;
//   }>;
// }

// // Beautiful Skeleton Loading Component
// const ProductPageSkeleton = () => {
//   return (
//     <div className="min-h-screen animate-pulse">
//       {/* Mobile Skeleton - Simple and Clean */}
//       <div className="block lg:hidden pt-16">
//         {/* Image Skeleton */}
//         <div className="w-full aspect-square bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 bg-[length:200%_100%] animate-pulse"></div>
        
//         {/* Content Skeleton */}
//         <div className="p-4 space-y-6">
//           {/* Title & Price */}
//           <div className="space-y-3">
//             <div className="h-7 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-3/4 bg-[length:200%_100%]"></div>
//             <div className="h-6 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-1/4 bg-[length:200%_100%]"></div>
//           </div>

//           {/* Size Selector */}
//           <div className="space-y-3">
//             <div className="h-5 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-1/3 bg-[length:200%_100%]"></div>
//             <div className="flex gap-2 overflow-x-auto pb-2">
//               {[1, 2, 3, 4].map((i) => (
//                 <div key={i} className="h-10 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-16 flex-shrink-0 bg-[length:200%_100%]"></div>
//               ))}
//             </div>
//           </div>

//           {/* Color Selector */}
//           <div className="space-y-3">
//             <div className="h-5 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-1/3 bg-[length:200%_100%]"></div>
//             <div className="flex gap-2 overflow-x-auto pb-2">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="h-10 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded-full w-10 flex-shrink-0 bg-[length:200%_100%]"></div>
//               ))}
//             </div>
//           </div>

//           {/* Buy Button */}
//           <div className="h-12 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-full bg-[length:200%_100%]"></div>

//           {/* Accordion */}
//           <div className="space-y-4 pt-4">
//             {[1, 2, 3].map((i) => (
//               <div key={i} className="space-y-2">
//                 <div className="h-6 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-1/2 bg-[length:200%_100%]"></div>
//                 <div className="h-4 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-full bg-[length:200%_100%]"></div>
//                 <div className="h-4 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-2/3 bg-[length:200%_100%]"></div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Desktop Skeleton - Detailed */}
//       <div className="hidden lg:flex pt-15 flex-row justify-between gap-8 px-8">
//         {/* Image Gallery */}
//         <div className="w-1/2 h-[80vh]">
//           <div className="w-full h-full bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded-lg bg-[length:200%_100%]"></div>
//         </div>

//         {/* Product Info */}
//         <div className="w-1/2 flex flex-col justify-between h-[80vh] py-4">
//           <div className="space-y-6">
//             {/* Title & Price */}
//             <div className="space-y-3">
//               <div className="h-8 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-3/4 bg-[length:200%_100%]"></div>
//               <div className="h-7 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-1/4 bg-[length:200%_100%]"></div>
//             </div>

//             {/* Accordion */}
//             <div className="space-y-4">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="space-y-2">
//                   <div className="h-6 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-1/3 bg-[length:200%_100%]"></div>
//                   <div className="h-4 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-full bg-[length:200%_100%]"></div>
//                   <div className="h-4 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-4/5 bg-[length:200%_100%]"></div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Selectors & Actions */}
//           <div className="space-y-6">
//             {/* Size Selector */}
//             <div className="space-y-3">
//               <div className="h-5 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-1/4 bg-[length:200%_100%]"></div>
//               <div className="flex gap-3">
//                 {[1, 2, 3, 4, 5].map((i) => (
//                   <div key={i} className="h-12 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-16 bg-[length:200%_100%]"></div>
//                 ))}
//               </div>
//             </div>

//             {/* Color Selector */}
//             <div className="space-y-3">
//               <div className="h-5 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-1/4 bg-[length:200%_100%]"></div>
//               <div className="flex gap-3">
//                 {[1, 2, 3, 4].map((i) => (
//                   <div key={i} className="h-12 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded-full w-12 bg-[length:200%_100%]"></div>
//                 ))}
//               </div>
//             </div>

//             {/* Quantity & Button */}
//             <div className="space-y-3">
//               <div className="h-5 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-1/4 bg-[length:200%_100%]"></div>
//               <div className="flex gap-4">
//                 <div className="h-12 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-24 bg-[length:200%_100%]"></div>
//                 <div className="h-12 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded flex-1 bg-[length:200%_100%]"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Carousel Skeletons */}
//       <div className="px-4 lg:px-8 py-8 space-y-8">
//         {/* You May Also Like Skeleton */}
//         <div className="space-y-4">
//           <div className="h-7 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-48 mx-auto text-center bg-[length:200%_100%]"></div>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {[1, 2, 3, 4].map((i) => (
//               <div key={i} className="space-y-3">
//                 <div className="aspect-square bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded bg-[length:200%_100%]"></div>
//                 <div className="h-4 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-3/4 bg-[length:200%_100%]"></div>
//                 <div className="h-4 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-1/2 bg-[length:200%_100%]"></div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function ProductPage({ params }: ProductPageProps) {
//   const [product, setProduct] = useState<SimpleProduct | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedSize, setSelectedSize] = useState("");
//   const [selectedColor, setSelectedColor] = useState("");
//   const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
//   const [quantity, setQuantity] = useState(1);
//   const [relatedProducts, setRelatedProducts] = useState<SimpleProduct[]>([]);
//   const [recentlyViewed, setRecentlyViewed] = useState<SimpleProduct[]>([]);

//   // Memoized function to find matching variant
//   const findMatchingVariant = useCallback((product: SimpleProduct, size: string, color: string) => {
//     if (!product.variants) return null;

//     return product.variants.find((variant) => {
//       const variantSize = variant.selectedOptions?.find((opt) =>
//         opt.name.toLowerCase().includes("size")
//       )?.value;

//       const variantColor = variant.selectedOptions?.find((opt) =>
//         opt.name.toLowerCase().includes("color")
//       )?.value;

//       const sizeMatches = !size || variantSize === size;
//       const colorMatches = !color || variantColor === color;

//       return sizeMatches && colorMatches;
//     }) || null;
//   }, []);

//   // Fetch product
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const resolvedParams = await params;
//         const productData = await getProductByHandle(resolvedParams.handle);
        
//         if (!productData) {
//           notFound();
//           return;
//         }

//         setProduct(productData);
        
//         // Auto select the first available variant
//         if (productData.variants && productData.variants.length > 0) {
//           const variant = productData.variants[0];
//           setSelectedVariant(variant);

//           const sizeOption = variant.selectedOptions?.find((opt) =>
//             opt.name.toLowerCase().includes("size")
//           );
//           const colorOption = variant.selectedOptions?.find((opt) =>
//             opt.name.toLowerCase().includes("color")
//           );

//           if (sizeOption) setSelectedSize(sizeOption.value);
//           if (colorOption) setSelectedColor(colorOption.value);
//         }
//       } catch (error) {
//         console.error("Error loading product:", error);
//         notFound();
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchProduct();
//   }, [params]);

//   // Track recently viewed and fetch related products
//   useEffect(() => {
//     if (!product) return;
    
//     // Add to recently viewed
//     const recentProduct: RecentProduct = {
//       id: product.id,
//       handle: product.handle,
//       title: product.title,
//       price: product.price,
//       featuredImage: product.featuredImage,
//       viewedAt: Date.now()
//     };
    
//     addRecentlyViewed(recentProduct);
    
//     // Get recently viewed (excluding current) and convert to SimpleProduct
//     const recent = getRecentlyViewedExcluding(product.id)
//       .map(convertRecentToSimpleProduct);
    
//     setRecentlyViewed(recent);
    
//     // Fetch random products for "You May Also Like"
//     const fetchRandomProducts = async () => {
//       try {
//         const random = await getRandomProducts(product.id, 8);
//         setRelatedProducts(random);
//       } catch (error) {
//         console.error("Error fetching random products:", error);
//       }
//     };
    
//     fetchRandomProducts();
//   }, [product]);

//   // Find matching variants when size/color changes
//   useEffect(() => {
//     if (!product) return;
    
//     const matchingVariant = findMatchingVariant(product, selectedSize, selectedColor);
//     setSelectedVariant(matchingVariant);
//   }, [selectedSize, selectedColor, product, findMatchingVariant]);

//   // Reset selections when product changes
//   useEffect(() => {
//     if (product) {
//       setSelectedSize("");
//       setSelectedColor("");
//       setSelectedVariant(null);
//       setQuantity(1);
//     }
//   }, [product]);

//   if (loading) {
//     return <ProductPageSkeleton />;
//   }

//   if (!product) {
//     notFound();
//   }

//   return (
//     <div className="max-w-[100vw] overflow-x-hidden">
//       <div className="pt-15 flex flex-col md:flex-col lg:flex-row justify-between lg:justify-between lg:items-center gap-2 ">
//         <div className="lg:w-1/2 md:h-[110vh] lg:h-[93vh]">
//           <ImageCarousel product={product} />
//         </div>

        

//         <div className="lg:w-1/3 flex flex-col justify-between  lg:h-[93vh]">
//           <div className="">
//             <ProductInfo product={product} selectedVariant={selectedVariant} />
            
//             {/* Mobile selectors and actions */}
//             <div className="lg:hidden ">
//               <SizeSelector
//                 product={product}
//                 selectedSize={selectedSize}
//                 onSizeChange={setSelectedSize}
//               />
//               <ColorSelector
//                 product={product}
//                 selectedColor={selectedColor}
//                 onColorChange={setSelectedColor}
//               />
//               <ProductQuantity
//                 product={product}
//                 selectedVariant={selectedVariant}
//                 quantity={quantity}
//                 setQuantity={setQuantity}
//               />
//               <BuyNow
//                 product={product}
//                 selectedVariant={selectedVariant}
//                 quantity={quantity}
//               />
//             </div>

//             <ProductAccordion product={product} />
//           </div>

//           {/* Desktop selectors and actions */}
//           <div className="hidden lg:block ">
//             <SizeSelector
//               product={product}
//               selectedSize={selectedSize}
//               onSizeChange={setSelectedSize}
//             />
//             <ColorSelector
//               product={product}
//               selectedColor={selectedColor}
//               onColorChange={setSelectedColor}
//             />
//             <ProductQuantity
//               product={product}
//               selectedVariant={selectedVariant}
//               quantity={quantity}
//               setQuantity={setQuantity}
//             />
//             <BuyNow
//               product={product}
//               selectedVariant={selectedVariant}
//               quantity={quantity}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Product carousels */}
//       <div className="mb-4">
//         {relatedProducts.length > 0 && (
//           <ProductCarousel 
//             products={relatedProducts} 
//             title="You May Also Like" 
//           />
//         )}
        
//         {recentlyViewed.length > 0 && (
//           <RecentlyViewedCarousel 
//             products={recentlyViewed} 
//             title="Recently Viewed" 
//             minItems={2}
//           />
//         )}
//       </div>
//     </div>
//   );
// }





"use client";
import { notFound } from "next/navigation";
import { getProductByHandle, getRandomProducts } from "@/lib/shopify/client";
import { SimpleProduct, ProductVariant } from "@/types/shopify";
import ImageCarousel from "@/components/ProductPage/ImageCarousel";
import ProductInfo from "@/components/ProductPage/ProductInfo";
import SizeSelector from "@/components/ProductPage/SizeSelector";
import ColorSelector from "@/components/ProductPage/ColorSelector";
import ProductQuantity from "@/components/ProductPage/ProductQuantity";
import ProductAccordion from "@/components/ProductPage/ProductAccordion";
import BuyNow from "@/components/ProductPage/BuyNow";
import ProductCarousel from "@/components/ProductPage/ProductCarousel";
import { useEffect, useState, useCallback } from "react";
import { 
  addRecentlyViewed, 
  getRecentlyViewedExcluding, 
  RecentProduct,
  convertRecentToSimpleProduct 
} from "@/lib/shopify/recentlyViewed";
import RecentlyViewedCarousel from "@/components/ProductPage/RecentlyViewedCarousel";
import PaymentMethods from "@/components/ProductPage/PaymentMethods";

interface ProductPageProps {
  params: Promise<{
    handle: string;
  }>;
}

// Beautiful Skeleton Loading Component
const ProductPageSkeleton = () => {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Mobile Skeleton - Simple and Clean */}
      <div className="block lg:hidden pt-16">
        {/* Image Skeleton */}
        <div className="w-full aspect-square bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 bg-[length:200%_100%] animate-pulse"></div>
        
        {/* Content Skeleton */}
        <div className="p-4 space-y-6">
          {/* Title & Price */}
          <div className="space-y-3">
            <div className="h-7 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-3/4 bg-[length:200%_100%]"></div>
            <div className="h-6 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-1/4 bg-[length:200%_100%]"></div>
          </div>

          {/* Size Selector */}
          <div className="space-y-3">
            <div className="h-5 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-1/3 bg-[length:200%_100%]"></div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-16 flex-shrink-0 bg-[length:200%_100%]"></div>
              ))}
            </div>
          </div>

          {/* Color Selector */}
          <div className="space-y-3">
            <div className="h-5 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-1/3 bg-[length:200%_100%]"></div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded-full w-10 flex-shrink-0 bg-[length:200%_100%]"></div>
              ))}
            </div>
          </div>

          {/* Buy Button */}
          <div className="h-12 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-full bg-[length:200%_100%]"></div>

          {/* Accordion */}
          <div className="space-y-4 pt-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-6 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-1/2 bg-[length:200%_100%]"></div>
                <div className="h-4 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-full bg-[length:200%_100%]"></div>
                <div className="h-4 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-2/3 bg-[length:200%_100%]"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Skeleton - Detailed */}
      <div className="hidden lg:flex pt-15 flex-row justify-between gap-8 px-8">
        {/* Image Gallery */}
        <div className="w-1/2 h-[80vh]">
          <div className="w-full h-full bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded-lg bg-[length:200%_100%]"></div>
        </div>

        {/* Product Info */}
        <div className="w-1/2 flex flex-col justify-between h-[80vh] py-4">
          <div className="space-y-6">
            {/* Title & Price */}
            <div className="space-y-3">
              <div className="h-8 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-3/4 bg-[length:200%_100%]"></div>
              <div className="h-7 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-1/4 bg-[length:200%_100%]"></div>
            </div>

            {/* Accordion */}
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-6 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-1/3 bg-[length:200%_100%]"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-full bg-[length:200%_100%]"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-4/5 bg-[length:200%_100%]"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Selectors & Actions */}
          <div className="space-y-6">
            {/* Size Selector */}
            <div className="space-y-3">
              <div className="h-5 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-1/4 bg-[length:200%_100%]"></div>
              <div className="flex gap-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-12 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-16 bg-[length:200%_100%]"></div>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div className="space-y-3">
              <div className="h-5 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-1/4 bg-[length:200%_100%]"></div>
              <div className="flex gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-12 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded-full w-12 bg-[length:200%_100%]"></div>
                ))}
              </div>
            </div>

            {/* Quantity & Button */}
            <div className="space-y-3">
              <div className="h-5 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-1/4 bg-[length:200%_100%]"></div>
              <div className="flex gap-4">
                <div className="h-12 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-24 bg-[length:200%_100%]"></div>
                <div className="h-12 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded flex-1 bg-[length:200%_100%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Skeletons */}
      <div className="px-4 lg:px-8 py-8 space-y-8">
        {/* You May Also Like Skeleton */}
        <div className="space-y-4">
          <div className="h-7 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-48 mx-auto text-center bg-[length:200%_100%]"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-square bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded bg-[length:200%_100%]"></div>
                <div className="h-4 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-3/4 bg-[length:200%_100%]"></div>
                <div className="h-4 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded w-1/2 bg-[length:200%_100%]"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<SimpleProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<SimpleProduct[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<SimpleProduct[]>([]);

  // Memoized function to find matching variant
  const findMatchingVariant = useCallback((product: SimpleProduct, size: string, color: string) => {
    if (!product.variants) return null;

    return product.variants.find((variant) => {
      const variantSize = variant.selectedOptions?.find((opt) =>
        opt.name.toLowerCase().includes("size")
      )?.value;

      const variantColor = variant.selectedOptions?.find((opt) =>
        opt.name.toLowerCase().includes("color")
      )?.value;

      const sizeMatches = !size || variantSize === size;
      const colorMatches = !color || variantColor === color;

      return sizeMatches && colorMatches;
    }) || null;
  }, []);

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const resolvedParams = await params;
        const productData = await getProductByHandle(resolvedParams.handle);
        
        if (!productData) {
          notFound();
          return;
        }

        setProduct(productData);
        
        // Auto select the first available variant
        if (productData.variants && productData.variants.length > 0) {
          const variant = productData.variants[0];
          setSelectedVariant(variant);

          const sizeOption = variant.selectedOptions?.find((opt) =>
            opt.name.toLowerCase().includes("size")
          );
          const colorOption = variant.selectedOptions?.find((opt) =>
            opt.name.toLowerCase().includes("color")
          );

          if (sizeOption) setSelectedSize(sizeOption.value);
          if (colorOption) setSelectedColor(colorOption.value);
        }
      } catch (error) {
        console.error("Error loading product:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [params]);

  // Track recently viewed and fetch related products
  useEffect(() => {
    if (!product) return;
    
    // Add to recently viewed
    const recentProduct: RecentProduct = {
      id: product.id,
      handle: product.handle,
      title: product.title,
      price: product.price,
      featuredImage: product.featuredImage,
      viewedAt: Date.now()
    };
    
    addRecentlyViewed(recentProduct);
    
    // Get recently viewed (excluding current) and convert to SimpleProduct
    const recent = getRecentlyViewedExcluding(product.id)
      .map(convertRecentToSimpleProduct);
    
    setRecentlyViewed(recent);
    
    // Fetch random products for "You May Also Like"
    const fetchRandomProducts = async () => {
      try {
        const random = await getRandomProducts(product.id, 8);
        setRelatedProducts(random);
      } catch (error) {
        console.error("Error fetching random products:", error);
      }
    };
    
    fetchRandomProducts();
  }, [product]);

  // Find matching variants when size/color changes
  useEffect(() => {
    if (!product) return;
    
    const matchingVariant = findMatchingVariant(product, selectedSize, selectedColor);
    setSelectedVariant(matchingVariant);
  }, [selectedSize, selectedColor, product, findMatchingVariant]);

  // Reset selections when product changes
  useEffect(() => {
    if (product) {
      setSelectedSize("");
      setSelectedColor("");
      setSelectedVariant(null);
      setQuantity(1);
    }
  }, [product]);

  if (loading) {
    return <ProductPageSkeleton />;
  }

  if (!product) {
    notFound();
  }

  return (
  <div className="max-w-[100vw] overflow-x-hidden">
    <div className="pt-15 flex flex-col lg:flex-row justify-between lg:justify-center  lg:items-start gap-8  ">
      {/* Image Carousel - Adjusted width */}
      <div className="w-full lg:w-[50%] h-[50vh] md:h-[110vh] lg:h-[93vh]">
        <ImageCarousel product={product} />
      </div>

      {/* Product Info - Adjusted width */}
      <div className="w-full lg:w-[30%] flex flex-col justify-between lg:h-[93vh]">
        <div className="">
          <ProductInfo product={product} selectedVariant={selectedVariant} />
          
          {/* Mobile selectors and actions */}
          <div className="">
            <SizeSelector
              product={product}
              selectedSize={selectedSize}
              onSizeChange={setSelectedSize}
            />
            <ColorSelector
              product={product}
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
            />
            <ProductQuantity
              product={product}
              selectedVariant={selectedVariant}
              quantity={quantity}
              setQuantity={setQuantity}
            />
            <BuyNow
              product={product}
              selectedVariant={selectedVariant}
              quantity={quantity}
            />
          </div>
          <PaymentMethods/>
          <ProductAccordion product={product} />
        </div>

        {/* Desktop selectors and actions */}
        <div className="hidden ">
          <SizeSelector
            product={product}
            selectedSize={selectedSize}
            onSizeChange={setSelectedSize}
          />
          <ColorSelector
            product={product}
            selectedColor={selectedColor}
            onColorChange={setSelectedColor}
          />
          <ProductQuantity
            product={product}
            selectedVariant={selectedVariant}
            quantity={quantity}
            setQuantity={setQuantity}
          />
          <BuyNow
            product={product}
            selectedVariant={selectedVariant}
            quantity={quantity}
          />
        </div>
      </div>
    </div>

    {/* Product carousels */}
    <div className="mb-4">
      {relatedProducts.length > 0 && (
        <ProductCarousel 
          products={relatedProducts} 
          title="You May Also Like" 
        />
      )}
      
      {recentlyViewed.length > 0 && (
        <RecentlyViewedCarousel 
          products={recentlyViewed} 
          title="Recently Viewed" 
          minItems={2}
        />
      )}
    </div>
  </div>
);
}

