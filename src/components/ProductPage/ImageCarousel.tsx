


"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SimpleProduct } from "@/types/shopify";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ImageCarouselProps {
  product: SimpleProduct;
}

const CustomBullet = ({
  total,
  activeIndex,
}: {
  total: number;
  activeIndex: number;
}) => {
  return (
    <div className="flex justify-center gap-1 mt-4">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          className={`h-[4px] w-[4px] rounded-full transition-all duration-300 
           ${i === activeIndex ? "bg-black scale-125" : "bg-gray-300"}`}
        />
      ))}
    </div>
  );
};

export default function ImageCarousel({ product }: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Use images otherwise just show the placeholder for unforsaken
  const images =
    product.images && product.images.length > 0
      ? product.images
      : [
          {
            url: "https://i.pinimg.com/736x/e7/70/53/e7705364ba1bd55d9ad9818609dbbb03.jpg",
            altText: product.title,
          },
        ];

  return (
    <div className="relative mb-2">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="h-[50vh] w-full md:h-[110vh] lg:h-[90vh] rounded-none"
      >
        {images.map((item, key) => (
          <SwiperSlide key={key}>
            <div className="flex h-full w-full items-center justify-center">
              <Image
                src={item.url}
                alt={item.altText || product.title}
                fill
                className=" h-full w-full object-cover md:object-cover relative"
                priority={key === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute bottom-2  left-1/2  -translate-x-1/2 z-20 ">
        <CustomBullet total={images.length} activeIndex={activeIndex} />
      </div>
    </div>
  );
}
