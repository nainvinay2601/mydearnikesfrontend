import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  getCollectionInfo,
  getProductsByCollection,
} from "@/lib/shopify/client";
// import ProductGrid from "@/components/major/newProductCard";

import { SimpleProduct, SimpleCollection } from "@/types/shopify";
import Link from "next/link";
import ProductGrid from "@/components/major/ProductGrid";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  try {
    const collection = await getCollectionInfo(params.category);
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

// Category page main , export
export default async function CategoryPage({ params }: CategoryPageProps) {
  try {
    //Fetch both collection info and products in parallel
    const [products, collection] = await Promise.all([
      getProductsByCollection(params.category),
      getCollectionInfo(params.category),
    ]);
    //If the product length is zero -> no product in this category
    if (!products || products.length === 0) {
      return (
        <div className="container mx-auto px-4  py-8">
          <h1 className="text-3xl font-bold mb-6 capitalize">
            {collection.title || params.category.replace("-", " ")}
          </h1>
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-4  ">No Products Found</h2>
            <p className="text-gray-600 mb-6">
              We could not find any products in this category at the moment :/.
            </p>
            <Link
              href="/"
              className="inline-block bg-black text-white  px-6  py-3 rounded hover:bg-gray-800 transition-colors"
            >
              {" "}
              Continue Shopping
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="  pt-16">
        {/* Category Header */}
        <div className="headingClass py-4 px-[8px] tracking-tight font-semibold tetx-md">
          <div className="">
            {collection?.title || params.category.replace("-", " ")}
          </div>
          {collection?.description && (
            <p className="text-gray-600 max-w-2xl">{collection.description}</p>
          )}

          {/* <div className="mt-4  text-sm  text-gray-500">
            {products.length}
            {products.length === 1 ? "product" : "products"}
          </div> */}
        </div>
        <ProductGrid products={products} />
      </div>
    );
  } catch (error) {
    console.log("Error naawahhahahahaha", error);
  }
}
