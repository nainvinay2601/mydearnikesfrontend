// import { Metadata } from "next";
// import {
//   getCollectionInfo,
//   getProductsByCollection,
// } from "@/lib/shopify/client";

// import Link from "next/link";
// import ProductGrid from "@/components/major/ProductGrid";


// interface CategoryPageProps {
//   params: Promise<{
//     category: string;
//   }>;
// }

// export async function generateMetadata({
//   params,
// }: CategoryPageProps): Promise<Metadata> {
//   try {
//     const { category } = await params; // Await params here
//     const collection = await getCollectionInfo(category); // Use the awaited category
//     return {
//       title: `${collection.title} - MyDearNikes`,
//       description:
//         collection.description || `Shop ${collection.title} Collection`,
//       openGraph: {
//         title: collection.title,
//         description:
//           collection.description || `Shop ${collection.handle} collection`,
//         images: collection.image ? [collection.image.url] : [],
//       },
//     };
//   } catch (error) {
//     console.log("No category found", error);
//     return {
//       title: "Category Not Found",
//       description: "The Requested Category Could not be found",
//     };
//   }
// }

// // Category page main , export
// export default async function CategoryPage({ params }: CategoryPageProps) {

//   try {
//     // Await params at the beginning
//     const { category } = await params;

//     // Fetch both collection info and products in parallel using the awaited category
//     const [products, collection] = await Promise.all([
//       getProductsByCollection(category),
//       getCollectionInfo(category),
//     ]);

//     // If the product length is zero -> no product in this category
//     if (!products || products.length === 0) {
//       return (
//         <div className="container mx-auto px-4  py-8">
//           <h1 className="text-3xl font-bold mb-6 capitalize ">
//             {collection.title || category.replace("-", " ")}
//           </h1>
//           <div className="text-center py-12">
//             <h2 className="text-xl font-semibold mb-4  ">No Products Found</h2>
//             <p className="text-gray-600 mb-6">
//               We could not find any products in this category at the moment :/.
//             </p>
//             <Link
//               href="/"
//               className="inline-block bg-black text-white  px-6  py-3 rounded hover:bg-gray-800 transition-colors"
//             >
//               {" "}
//               Continue Shopping
//             </Link>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="  pt-16">
//         {/* Category Header */}
//         <div className="headingClass py-4 px-[8px] tracking-tight   flex  flex-col items-center justify-center gap-0 py-8">
//           <div className="flex justify-center items-center font-bebas text-[64px] md:text-[96px] font-semibold leading-15">
//             {collection?.title || category.replace("-", " ")}
//           </div>
//           {
//             // <p className="text-gray-600 max-w-2xl">{collection.description}</p>
//             <p className="text-gray-600 max-w-2xl text-xs font-medium uppercase">
//               Core This, Core That, Just Wear It.
//             </p>
//           }

//           {/* <div className="mt-4  text-sm  text-gray-500">
//             {products.length}
//             {products.length === 1 ? "product" : "products"}
//           </div> */}
//         </div>
//         <ProductGrid products={products} />
//       </div>
//     );
//   } catch (error) {
//     console.log("Error naawahhahahahaha", error);
//     // You should return some error UI here
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-6">Error</h1>
//         <div className="text-center py-12">
//           <h2 className="text-xl font-semibold mb-4">Something went wrong</h2>
//           <p className="text-gray-600 mb-6">
//             We encountered an error while loading this category.
//           </p>
//           <Link
//             href="/"
//             className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
//           >
//             Return to Home
//           </Link>
//         </div>
//       </div>
//     );
//   }
// }


// import { Metadata } from "next";
// import {
//   getCollectionInfo,
//   getProductsByCollection,
// } from "@/lib/shopify/client";

// import Link from "next/link";
// import ProductGrid from "@/components/major/ProductGrid";

// interface CategoryPageProps {
//   params: Promise<{
//     category: string;
//   }>;
// }

// export async function generateMetadata({
//   params,
// }: CategoryPageProps): Promise<Metadata> {
//   try {
//     const { category } = await params;
//     const collection = await getCollectionInfo(category);
//     return {
//       title: `${collection.title} - MyDearNikes`,
//       description:
//         collection.description || `Shop ${collection.title} Collection`,
//       openGraph: {
//         title: collection.title,
//         description:
//           collection.description || `Shop ${collection.handle} collection`,
//         images: collection.image ? [collection.image.url] : [],
//       },
//     };
//   } catch (error) {
//     console.log("No category found", error);
//     return {
//       title: "Category Not Found",
//       description: "The Requested Category Could not be found",
//     };
//   }
// }

// // Category page main, export
// export default async function CategoryPage({ params }: CategoryPageProps) {
//   try {
//     const { category } = await params;
    
//     const [products, collection] = await Promise.all([
//       getProductsByCollection(category),
//       getCollectionInfo(category),
//     ]);

//     // Categories array
//     const categories = [
//       { name: "All Products", href: "/category/all-products", slug: "all-products" },
//       { name: "New Arrivals", href: "/category/new-arrivals", slug: "new-arrivals" },
//       { name: "Oversized Tees", href: "/category/oversized-unisex-tees", slug: "oversized-unisex-tees" },
//       { name: "Fitted Tees", href: "/category/regular-fits", slug: "regular-fits" },
//       { name: "Baby Tees", href: "/category/baby-tees", slug: "baby-tees" },
//       { name: "Hoodies", href: "/category/hoodies", slug: "hoodies" },
//       { name: "Bottoms", href: "/category/bottoms", slug: "bottoms" },
//     ];
    
//     if (!products || products.length === 0) {
//       return (
//         <div className="container mx-auto px-4 py-8">
//           <h1 className="text-3xl font-bold mb-6 capitalize">
//             {collection.title || category.replace("-", " ")}
//           </h1>
//           <div className="text-center py-12">
//             <h2 className="text-xl font-semibold mb-4">No Products Found</h2>
//             <p className="text-gray-600 mb-6">
//               We could not find any products in this category at the moment :/.
//             </p>
//             <Link
//               href="/"
//               className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
//             >
//               Continue Shopping
//             </Link>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="pt-16">
//         {/* Category Header */}
//         <div className="headingClass px-[8px] tracking-tight flex flex-col items-center justify-center gap-0 py-8">
//           <div className="flex justify-center items-center font-bebas text-[64px] md:text-[96px] font-semibold leading-none">
//             {collection?.title || category.replace("-", " ")}
//           </div>
//           <p className="text-gray-600 max-w-2xl text-xs font-medium uppercase mt-2">
//             Core This, Core That, Just Wear It.
//           </p>

//           {/* Category Navigation Menu */}
//           <nav className="flex gap-2 mt-6 overflow-x-auto scrollbar-hide  w-full justify-start md:justify-center">
//             {categories.map((cat) => {
//               const isActive = cat.slug === category;
//               return (
//                 <Link
//                   key={cat.href}
//                   href={cat.href}
//                   className={`px-4 py-2 text-xs  border rounded-full transition-all duration-200 whitespace-nowrap ${
//                     isActive
//                       ? "bg-black text-white border-black"
//                       : "bg-white text-black border-gray-300 hover:bg-gray-100"
//                   }`}
//                 >
//                   {cat.name}
//                 </Link>
//               );
//             })}
//           </nav>
//         </div>
//         <ProductGrid products={products} />
//       </div>
//     );
//   } catch (error) {
//     console.log("Error loading category", error);
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-6">Error</h1>
//         <div className="text-center py-12">
//           <h2 className="text-xl font-semibold mb-4">Something went wrong</h2>
//           <p className="text-gray-600 mb-6">
//             We encountered an error while loading this category.
//           </p>
//           <Link
//             href="/"
//             className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
//           >
//             Return to Home
//           </Link>
//         </div>
//       </div>
//     );
//   }
// }


import { Metadata } from "next";
import {
  getCollectionInfo,
  getProductsByCollection,
} from "@/lib/shopify/client";

import Link from "next/link";
import ProductGrid from "@/components/major/ProductGrid";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  try {
    const { category } = await params;
    const collection = await getCollectionInfo(category);
    return {
      title: `${collection.title} - MyDearNikes`,
      description:
        collection.description || `Shop ${collection.title} Collection`,
      openGraph: {
        title: collection.title,
        description:
          collection.description || `Shop ${collection.handle} collection`,
        images: collection.image ? [collection.image.url] : [],
      },
    };
  } catch (error) {
    console.log("No category found", error);
    return {
      title: "Category Not Found",
      description: "The Requested Category Could not be found",
    };
  }
}

// Category page main, export
export default async function CategoryPage({ params }: CategoryPageProps) {
  try {
    const { category } = await params;
    
    const [products, collection] = await Promise.all([
      getProductsByCollection(category),
      getCollectionInfo(category),
    ]);

    // Categories array
    const allCategories = [
      { name: "All Products", href: "/category/all-products", slug: "all-products" },
      { name: "New Arrivals", href: "/category/new-arrivals", slug: "new-arrivals" },
      { name: "Oversized Tees", href: "/category/oversized-unisex-tees", slug: "oversized-unisex-tees" },
      { name: "Fitted Tees", href: "/category/regular-fits", slug: "regular-fits" },
      { name: "Baby Tees", href: "/category/baby-tees", slug: "baby-tees" },
      { name: "Hoodies", href: "/category/hoodies", slug: "hoodies" },
      { name: "Bottoms", href: "/category/bottoms", slug: "bottoms" },
    ];

    // Move active category to first position
    const activeIndex = allCategories.findIndex(cat => cat.slug === category);
    const categories = activeIndex !== -1
      ? [allCategories[activeIndex], ...allCategories.filter((_, i) => i !== activeIndex)]
      : allCategories;
    
    if (!products || products.length === 0) {
      return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 capitalize">
            {collection.title || category.replace("-", " ")}
          </h1>
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-4">No Products Found</h2>
            <p className="text-gray-600 mb-6">
              We could not find any products in this category at the moment :/.
            </p>
            <Link
              href="/"
              className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="pt-16">
        {/* Category Header */}
        <div className="headingClass py-4 px-[8px] tracking-tight flex flex-col items-center justify-center gap-0 py-8">
          <div className="flex justify-center items-center font-bebas text-[64px] md:text-[96px] font-semibold leading-none">
            {collection?.title || category.replace("-", " ")}
          </div>
          <p className="text-gray-600 max-w-2xl text-xs font-medium uppercase mt-2">
            Core This, Core That, Just Wear It.
          </p>

          {/* Category Navigation Menu */}
          <nav className="flex gap-2 mt-6 overflow-x-auto scrollbar-hide  w-full justify-start md:justify-center">
            {categories.map((cat) => {
              const isActive = cat.slug === category;
              return (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className={`px-4 py-2 text-xs  border rounded-full transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <ProductGrid products={products} />
      </div>
    );
  } catch (error) {
    console.log("Error loading category", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Error</h1>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-6">
            We encountered an error while loading this category.
          </p>
          <Link
            href="/"
            className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }
}