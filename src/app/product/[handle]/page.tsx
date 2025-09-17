import { notFound } from "next/navigation";

import { Metadata } from "next";
import { getProductByHandle } from "@/lib/shopify/client";
import { SimpleProduct } from "@/types/shopify";
import ImageCarousel from "@/components/ProductPage/ImageCarousel";
import ProductInfo from "@/components/ProductPage/ProductInfo";
import SizeSelector from "@/components/ProductPage/SizeSelector";
import ColorSelector from "@/components/ProductPage/ColorSelector";
import ProductQuantity from "@/components/ProductPage/ProductQuantity";
import ProductAccordion from "@/components/ProductPage/ProductAccordion";
import BuyNow from "@/components/ProductPage/BuyNow";

interface ProductPageProps {
  params: {
    handle: string;
  };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  try {
    const product = await getProductByHandle(params.handle);

    if (!product) {
      return {
        title: "Product Not Found - MyDearNikes",
        description: "The requested product could not be found",
      };
    }

    return {
      title: `${product.title} - MyDearNikes`,
      description: product.description || `Shop - ${product.title}`,
      openGraph: {
        title: product.title,
        description: product.description || `Shop - ${product.title}`,
        images: product.images?.map((img) => img.url) || [],
      },
    };
  } catch (error) {
    console.log("Error generating metadata", error);
    return {
      title: "Products Not Found",
      description: "The requested productws could not be found",
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    const product = await getProductByHandle(params.handle);
    if (!product) {
      notFound();
    }

    return (
      <div className="pt-16">
        <ImageCarousel product={product} />
        <ProductInfo product={product} />
        <SizeSelector product={product} />
        <ColorSelector product={product} />
        {/* <ProductQuantity product={product} /> */}
        {/* <ProductAccordion product={product} /> */}
        {/* <BuyNow product={product} /> */}
      </div>
    );
  } catch (error) {
    console.error("Error Loading Products", error);
    notFound();
  }
}
