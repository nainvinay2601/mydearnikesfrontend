// // app/product/[handle]/page.tsx
// import { notFound } from 'next/navigation';
// import { Metadata } from 'next';
// import Image from 'next/image';

// import { SimpleProduct } from '@/types/shopify';
// import { getProductByHandle } from '@/lib/shopify/client';

// interface ProductPageProps {
//   params: {
//     handle: string;
//   };
// }

// export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
//   try {
//     const product = await getProductByHandle(params.handle);

//     return {
//       title: `${product.title} - Your Store Name`,
//       description: product.description,
//       openGraph: {
//         title: product.title,
//         description: product.description,
//         images: product.images.map(img => img.url),
//       },
//     };
//   } catch (error) {
//     return {
//       title: 'Product Not Found - Your Store Name',
//       description: 'The requested product could not be found.',
//     };
//   }
// }

// export default async function ProductPage({ params }: ProductPageProps) {
//   let product: SimpleProduct;

//   try {
//     product = await getProductByHandle(params.handle);
//   } catch (error) {
//     console.error('Error loading product:', error);
//     notFound();
//   }

//   const hasDiscount = product.compareAtPrice && product.compareAtPrice.amount !== "0.0" &&
//     parseFloat(product.compareAtPrice.amount) > parseFloat(product.price.amount);
//   const discountPercentage = hasDiscount
//     ? Math.round(((parseFloat(product.compareAtPrice!.amount) - parseFloat(product.price.amount)) / parseFloat(product.compareAtPrice!.amount)) * 100)
//     : 0;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//         {/* Product Images */}
//         <div className="space-y-4">
//           {/* Main Image */}
//           <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
//             <Image
//               src={product.featuredImage.url}
//               alt={product.featuredImage.altText || product.title}
//               fill
//               className="object-cover"
//               priority
//             />
//             {hasDiscount && (
//               <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
//                 -{discountPercentage}%
//               </div>
//             )}
//           </div>

//           {/* Additional Images */}
//           {product.images.length > 1 && (
//             <div className="grid grid-cols-4 gap-2">
//               {product.images.slice(1, 5).map((image, index) => (
//                 <div key={index} className="aspect-square relative bg-gray-100 rounded overflow-hidden">
//                   <Image
//                     src={image.url}
//                     alt={image.altText || `${product.title} ${index + 2}`}
//                     fill
//                     className="object-cover hover:opacity-80 transition-opacity cursor-pointer"
//                   />
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Product Info */}
//         <div className="space-y-6">
//           <div>
//             <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
//             <div className="flex items-center space-x-3">
//               <span className="text-2xl font-bold">
//                 ${parseFloat(product.price.amount).toFixed(2)}
//               </span>
//               {hasDiscount && (
//                 <span className="text-lg text-gray-500 line-through">
//                   ${parseFloat(product.compareAtPrice!.amount).toFixed(2)}
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Product Description */}
//           <div className="prose prose-sm max-w-none">
//             <p className="text-gray-700 leading-relaxed">
//               {product.description}
//             </p>
//           </div>

//           {/* Variants */}
//           {product.variants.length > 1 && (
//             <div className="space-y-4">
//               <h3 className="font-semibold">Options:</h3>
//               <div className="space-y-3">
//                 {/* Size Selection */}
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Size</label>
//                   <div className="flex flex-wrap gap-2">
//                     {product.variants.map((variant, index) => (
//                       <button
//                         key={variant.id}
//                         className={`px-4 py-2 border rounded transition-colors ${
//                           index === 0
//                             ? 'border-black bg-black text-white'
//                             : 'border-gray-300 hover:border-gray-400'
//                         }`}
//                       >
//                         {variant.title}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Add to Cart Section */}
//           <div className="space-y-4">
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center border rounded">
//                 <button className="px-3 py-2 hover:bg-gray-100 transition-colors">
//                   -
//                 </button>
//                 <input
//                   type="number"
//                   min="1"
//                   defaultValue="1"
//                   className="w-16 text-center py-2 border-none outline-none"
//                 />
//                 <button className="px-3 py-2 hover:bg-gray-100 transition-colors">
//                   +
//                 </button>
//               </div>
//             </div>

//             <button className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 transition-colors">
//               Add to Cart
//             </button>

//             <button className="w-full border border-gray-300 py-3 rounded font-semibold hover:bg-gray-50 transition-colors">
//               Buy it now
//             </button>
//           </div>

//           {/* Product Details */}
//           <div className="border-t pt-6 space-y-4">
//             <div className="space-y-2">
//               <h4 className="font-semibold">Product Details</h4>
//               <ul className="text-sm text-gray-600 space-y-1">
//                 <li>• Available: {product.availableForSale ? 'In Stock' : 'Out of Stock'}</li>
//                 <li>• Product Type: {product.productType || 'General'}</li>
//                 {product.tags.length > 0 && (
//                   <li>• Tags: {product.tags.join(', ')}</li>
//                 )}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// app/product/[handle]/page.tsx
// import { notFound } from "next/navigation";
// import { Metadata } from "next";
// import Image from "next/image";
// import { SimpleProduct } from "@/types/shopify";
// import { getProductByHandle } from "@/lib/shopify/client";
// import ProductInteractions from "@/components/ProductInteractions"; // Adjust path as needed

// interface ProductPageProps {
//   params: {
//     handle: string;
//   };
// }

// export async function generateMetadata({
//   params,
// }: ProductPageProps): Promise<Metadata> {
//   try {
//     const product = await getProductByHandle(params.handle);

//     return {
//       title: `${product.title} - Your Store Name`,
//       description: product.description,
//       openGraph: {
//         title: product.title,
//         description: product.description,
//         images:
//           product.images?.map((img) => img.url) ||
//           [product.featuredImage?.url].filter(Boolean),
//       },
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       title: "Product Not Found - Your Store Name",
//       description: "The requested product could not be found.",
//     };
//   }
// }

// export default async function ProductPage({ params }: ProductPageProps) {
//   let product: SimpleProduct;

//   try {
//     product = await getProductByHandle(params.handle);
//   } catch (error) {
//     console.error("Error loading product:", error);
//     notFound();
//   }

//   const hasDiscount =
//     product.compareAtPrice &&
//     product.compareAtPrice.amount !== "0.0" &&
//     parseFloat(product.compareAtPrice.amount) >
//       parseFloat(product.price.amount);
//   const discountPercentage = hasDiscount
//     ? Math.round(
//         ((parseFloat(product.compareAtPrice!.amount) -
//           parseFloat(product.price.amount)) /
//           parseFloat(product.compareAtPrice!.amount)) *
//           100
//       )
//     : 0;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//         {/* Product Images */}
//         <div className="space-y-4">
//           {/* Main Image */}
//           <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
//             {product.featuredImage?.url ? (
//               <Image
//                 src={product.featuredImage.url}
//                 alt={product.featuredImage.altText || product.title}
//                 fill
//                 className="object-cover"
//                 priority
//               />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center text-gray-400">
//                 No image available
//               </div>
//             )}
//             {hasDiscount && (
//               <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
//                 -{discountPercentage}%
//               </div>
//             )}
//           </div>

//           {/* Additional Images */}
//           {product.images && product.images.length > 1 && (
//             <div className="grid grid-cols-4 gap-2">
//               {product.images.slice(1, 5).map((image, index) => (
//                 <div
//                   key={index}
//                   className="aspect-square relative bg-gray-100 rounded overflow-hidden"
//                 >
//                   <Image
//                     src={image.url}
//                     alt={image.altText || `${product.title} ${index + 2}`}
//                     fill
//                     className="object-cover hover:opacity-80 transition-opacity cursor-pointer"
//                   />
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Product Info */}
//         <div className="space-y-6">
//           <div>
//             <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
//             <div className="flex items-center space-x-3">
//               <span className="text-2xl font-bold">
//                 {product.price?.currencyCode || "$"}
//                 {parseFloat(product.price.amount).toFixed(2)}
//               </span>
//               {hasDiscount && (
//                 <span className="text-lg text-gray-500 line-through">
//                   {product.compareAtPrice?.currencyCode || "$"}
//                   {parseFloat(product.compareAtPrice!.amount).toFixed(2)}
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Product Description */}
//           <div className="prose prose-sm max-w-none">
//             <p className="text-gray-700 leading-relaxed">
//               {product.description || "No description available."}
//             </p>
//           </div>

//           {/* Interactive Components - This will be a client component */}
//           <ProductInteractions product={product} />

//           {/* Product Details */}
//           <div className="border-t pt-6 space-y-4">
//             <div className="space-y-2">
//               <h4 className="font-semibold">Product Details</h4>
//               <ul className="text-sm text-gray-600 space-y-1">
//                 <li>
//                   • Available:{" "}
//                   {product.availableForSale ? "In Stock" : "Out of Stock"}
//                 </li>
//                 <li>• Product Type: {product.productType || "General"}</li>
//                 {product.tags && product.tags.length > 0 && (
//                   <li>• Tags: {product.tags.join(", ")}</li>
//                 )}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// app/product/[handle]/page.tsx
// import { notFound } from "next/navigation";
// import { Metadata } from "next";

// import { getProductByHandle } from "@/lib/shopify/client";

// import { SimpleProduct } from "@/types/shopify";
// import ImageCarousel from "@/components/ProductPage/ImageCarousel";
// import ProductInfo from "@/components/ProductPage/ProductInfo";
// import SizeSelector from "@/components/ProductPage/SizeSelector";

// interface ProductPageProps {
//   params: {
//     handle: string;
//   };
// }

// export async function generateMetadata({
//   params,
// }: ProductPageProps): Promise<Metadata> {
//   try {
//     const product = await getProductByHandle(params.handle);

//     return {
//       title: `${product.title} - Your Store Name`,
//       description: product.description,
//       openGraph: {
//         title: product.title,
//         description: product.description,
//         images: product.images.map((img) => img.url),
//       },
//     };
//   } catch (error) {
//     return {
//       title: "Product Not Found - Your Store Name",
//       description: "The requested product could not be found.",
//     };
//   }
// }

// export default async function ProductPage({ params }: ProductPageProps) {
//   let product: SimpleProduct;

//   try {
//     product = await getProductByHandle(params.handle);
//   } catch (error) {
//     console.error("Error loading product:", error);
//     notFound();
//   }

//   const hasDiscount =
//     product.compareAtPrice &&
//     product.compareAtPrice.amount !== "0.0" &&
//     parseFloat(product.compareAtPrice.amount) >
//       parseFloat(product.price.amount);
//   const discountPercentage = hasDiscount
//     ? Math.round(
//         ((parseFloat(product.compareAtPrice!.amount) -
//           parseFloat(product.price.amount)) /
//           parseFloat(product.compareAtPrice!.amount)) *
//           100
//       )
//     : 0;

//   return (
//     <div className="container mx-auto px-0 py-8">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//         {/* Dynamic Image Carousel - Replaces static image grid */}
//         <ImageCarousel
//           product={product}
//           autoplay={true}
//           autoplayDelay={4000}
//           showBullets={true}
//           showDiscount={true}
//           height="h-96"
//         />

//         {/* Product Info Section */}

//         <ProductInfo
//           product={product}
//           currencySymbol="₹"
//           showDescription={true}
//           className=""
//         />

//           <SizeSelector
//         variants={product.variants}
//         onSizeSelect={handleVariantSelect}
//       />
//         <div className="space-y-6">
//           <div>
//             <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
//             <div className="flex items-center space-x-3">
//               <span className="text-2xl font-bold">
//                 ${parseFloat(product.price.amount).toFixed(2)}
//               </span>
//               {hasDiscount && (
//                 <span className="text-lg text-gray-500 line-through">
//                   ${parseFloat(product.compareAtPrice!.amount).toFixed(2)}
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Product Description */}
//           <div className="prose prose-sm max-w-none">
//             <p className="text-gray-700 leading-relaxed">
//               {product.description}
//             </p>
//           </div>

//           {/* Variants */}
//           {product.variants.length > 1 && (
//             <div className="space-y-4">
//               <h3 className="font-semibold">Options:</h3>
//               <div className="space-y-3">
//                 {/* Size Selection */}
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Size</label>
//                   <div className="flex flex-wrap gap-2">
//                     {product.variants.map((variant, index) => (
//                       <button
//                         key={variant.id}
//                         className={`px-4 py-2 border rounded transition-colors ${
//                           index === 0
//                             ? "border-black bg-black text-white"
//                             : "border-gray-300 hover:border-gray-400"
//                         }`}
//                       >
//                         {variant.title}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Add to Cart Section */}
//           <div className="space-y-4">
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center border rounded">
//                 <button className="px-3 py-2 hover:bg-gray-100 transition-colors">
//                   -
//                 </button>
//                 <input
//                   type="number"
//                   min="1"
//                   defaultValue="1"
//                   className="w-16 text-center py-2 border-none outline-none"
//                 />
//                 <button className="px-3 py-2 hover:bg-gray-100 transition-colors">
//                   +
//                 </button>
//               </div>
//             </div>

//             <button className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 transition-colors">
//               Add to Cart
//             </button>

//             <button className="w-full border border-gray-300 py-3 rounded font-semibold hover:bg-gray-50 transition-colors">
//               Buy it now
//             </button>
//           </div>

//           {/* Product Details */}
//           <div className="border-t pt-6 space-y-4">
//             <div className="space-y-2">
//               <h4 className="font-semibold">Product Details</h4>
//               <ul className="text-sm text-gray-600 space-y-1">
//                 <li>
//                   • Available:{" "}
//                   {product.availableForSale ? "In Stock" : "Out of Stock"}
//                 </li>
//                 <li>• Product Type: {product.productType || "General"}</li>
//                 {product.tags.length > 0 && (
//                   <li>• Tags: {product.tags.join(", ")}</li>
//                 )}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// app/product/[handle]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";

import { getProductByHandle } from "@/lib/shopify/client";
import { SimpleProduct } from "@/types/shopify";
import ImageCarousel from "@/components/ProductPage/ImageCarousel";
import ProductInfo from "@/components/ProductPage/ProductInfo";
import SizeSelector from "@/components/ProductPage/SizeSelector";
import ColorSelector from "@/components/ProductPage/ColorSelector";

interface ProductPageProps {
  params: { handle: string };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  try {
    const product = await getProductByHandle(params.handle);
    return {
      title: `${product.title} - Your Store Name`,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: product.images.map((img) => img.url),
      },
    };
  } catch {
    return {
      title: "Product Not Found - Your Store Name",
      description: "The requested product could not be found.",
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductByHandle(params.handle).catch(() => null);
  // DEBUG: Log all variants and their selectedOptions
  console.log("All variants:", JSON.stringify(product?.variants, null, 2));
  if (!product) notFound();

  // Filtet variant to check the color options exist
  const colorVariants = product.variants.filter((variant) =>
    variant.selectedOptions.some((opt) => opt.name.toLowerCase() === "color")
  );

  const hasColors = colorVariants.length > 0;

  // Filter only variants that have a "size" option
  const sizeVariants = product.variants.filter((v) =>
    v.selectedOptions.some((opt) => opt.name.toLowerCase() === "size")
  );

  const hasSizes = sizeVariants.length > 0;

  return (
    <div className="container mx-auto px-0 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Image Carousel */}
        <ImageCarousel
          product={product}
          autoplay
          autoplayDelay={4000}
          showBullets
          showDiscount
          height="h-96"
        />

        {/* Right: Info + Options */}
        <div className="space-y-6">
          <ProductInfo product={product} currencySymbol="₹" showDescription />

          {/* Size Selector (only if sizes exist) */}
          {hasSizes && (
            <SizeSelector
              variants={product.variants}
              onSizeSelect={(variant) => {
                console.log("Selected size variant:", variant);
                // You can update the product image, price, etc. based on the selected size variant
              }}
            />
          )}
          {hasColors && (
            <ColorSelector
              variants={product.variants}
              onColorSelect={(variant) => {
                console.log("Selected color variant:", variant);
              }}
            />
          )}

          {/* Add to Cart Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded">
                <button className="px-3 py-2 hover:bg-gray-100">-</button>
                <input
                  type="number"
                  min="1"
                  defaultValue="1"
                  className="w-16 text-center py-2 border-none outline-none"
                />
                <button className="px-3 py-2 hover:bg-gray-100">+</button>
              </div>
            </div>

            <button className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-800">
              Add to Cart
            </button>
            <button className="w-full border border-gray-300 py-3 rounded font-semibold hover:bg-gray-50">
              Buy it now
            </button>
          </div>

          {/* Product Details */}
          <div className="border-t pt-6 space-y-2">
            <h4 className="font-semibold">Product Details</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>
                • Available:{" "}
                {product.availableForSale ? "In Stock" : "Out of Stock"}
              </li>
              <li>• Product Type: {product.productType || "General"}</li>
              {product.tags.length > 0 && (
                <li>• Tags: {product.tags.join(", ")}</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
