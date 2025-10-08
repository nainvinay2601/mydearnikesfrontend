  

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
  return (
    <div className="pt-16 flex justify-center items-center h-96">
      <div className="flex flex-col items-center gap-3">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <div className="text-sm text-gray-600">Loading product...</div>
      </div>
    </div>
  );
}

  if (!product) {
    notFound();
  }

  return (
    <>
      <div className="pt-15 flex flex-col md:flex-col lg:flex-row justify-between gap-2">
        <div className="lg:w-1/2 md:h-[110vh] lg:h-[90vh]">
          <ImageCarousel product={product} />
        </div>

        <div className="lg:w-1/2 flex flex-col justify-between lg:h-[90vh]">
          <div className="">
            <ProductInfo product={product} selectedVariant={selectedVariant} />
            
            {/* Mobile selectors and actions */}
            <div className="lg:hidden ">
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

            <ProductAccordion product={product} />
          </div>

          {/* Desktop selectors and actions */}
          <div className="hidden lg:block">
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
    </>
  );
}