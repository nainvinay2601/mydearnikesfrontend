// import { notFound } from "next/navigation";

// import { Metadata } from "next";
// import { getProductByHandle } from "@/lib/shopify/client";
// import { SimpleProduct } from "@/types/shopify";
// import ImageCarousel from "@/components/ProductPage/ImageCarousel";
// import ProductInfo from "@/components/ProductPage/ProductInfo";
// import SizeSelector from "@/components/ProductPage/SizeSelector";
// import ColorSelector from "@/components/ProductPage/ColorSelector";
// import ProductQuantity from "@/components/ProductPage/ProductQuantity";
// import ProductAccordion from "@/components/ProductPage/ProductAccordion";
// import BuyNow from "@/components/ProductPage/BuyNow";

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

//     if (!product) {
//       return {
//         title: "Product Not Found - MyDearNikes",
//         description: "The requested product could not be found",
//       };
//     }

//     return {
//       title: `${product.title} - MyDearNikes`,
//       description: product.description || `Shop - ${product.title}`,
//       openGraph: {
//         title: product.title,
//         description: product.description || `Shop - ${product.title}`,
//         images: product.images?.map((img) => img.url) || [],
//       },
//     };
//   } catch (error) {
//     console.log("Error generating metadata", error);
//     return {
//       title: "Products Not Found",
//       description: "The requested productws could not be found",
//     };
//   }
// }

// export default async function ProductPage({ params }: ProductPageProps) {
//   try {
//     const product = await getProductByHandle(params.handle);
//     if (!product) {
//       notFound();
//     }

//     return (
//       <div className="pt-16">
//         <ImageCarousel product={product} />
//         <ProductInfo product={product} />
//         <SizeSelector product={product} />
//         <ColorSelector product={product} />
//         <ProductQuantity product={product}   />
//         <BuyNow product={product} />
//         <ProductAccordion product={product} />
//       </div>
//     );
//   } catch (error) {
//     console.error("Error Loading Products", error);
//     notFound();
//   }
// }
"use client";
import { notFound } from "next/navigation";

import { Metadata } from "next";
import { getProductByHandle } from "@/lib/shopify/client";
import { SimpleProduct, ProductVariant } from "@/types/shopify";
import ImageCarousel from "@/components/ProductPage/ImageCarousel";
import ProductInfo from "@/components/ProductPage/ProductInfo";
import SizeSelector from "@/components/ProductPage/SizeSelector";
import ColorSelector from "@/components/ProductPage/ColorSelector";
import ProductQuantity from "@/components/ProductPage/ProductQuantity";
import ProductAccordion from "@/components/ProductPage/ProductAccordion";
import BuyNow from "@/components/ProductPage/BuyNow";
import { useEffect, useState } from "react";

interface ProductPageProps {
  params: Promise<{
    handle: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<SimpleProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null
  );

  // Fetch products
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
        // auto select the first available variant if only one variant
        if (productData.variants && productData.variants.length === 1) {
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
        console.error("Error loading products:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params]);

  // find matching variants when  size/color changes
  useEffect(() => {
    if (!product || !product.variants) return;

    const matchingVariant = product.variants.find((variant) => {
      const variantSize = variant.selectedOptions?.find((opt) =>
        opt.name.toLowerCase().includes("size")
      )?.value;

      const variantColor = variant.selectedOptions?.find((opt) =>
        opt.name.toLowerCase().includes("color")
      )?.value;

      const sizeMatches = !selectedSize || variantSize === selectedSize;
      const colorMatches = !selectedColor || variantColor === selectedColor;

      return sizeMatches && colorMatches;
    });

    setSelectedVariant(matchingVariant || null);
  }, [selectedSize, selectedColor, product]);

  if (loading) {
    return (
      <div className="pt-16 flex justify-between items-center  h-96">
        {" "}
        Loading ...{" "}
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="pt-16">
      <ImageCarousel product={product} />
      <ProductInfo product={product} selectedVariant={selectedVariant} />
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
      <ProductQuantity product={product} selectedVariant={selectedVariant} />
      <BuyNow product={product} selectedVariant={selectedVariant} />
      <ProductAccordion product={product} />
    </div>
  );
}
