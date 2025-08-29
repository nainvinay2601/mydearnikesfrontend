import ColorSelector from "@/components/ProductPage/ColorSelector";
import ImageCarousel from "@/components/ProductPage/ImageCarousel";
import ProductInfo from "@/components/ProductPage/ProductInfo";
import SizeSelector from "@/components/ProductPage/SizeSelector";
import React from "react";
import ProductQuantity from "@/components/ProductPage/ProductQuantity";
import BuyNow from "@/components/ProductPage/BuyNow";
import ProductAccordion from "@/components/ProductPage/ProductAccordion";


const page = () => {
  return (
    <div className="pt-15 pb-4">
      <ImageCarousel />
      <ProductInfo />
      <SizeSelector />
      <ColorSelector />
      <ProductQuantity />
      <BuyNow/>
      <ProductAccordion/>

    </div>
  );
};

export default page;
