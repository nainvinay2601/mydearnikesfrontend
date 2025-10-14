"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
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
        <motion.button
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: i === activeIndex ? 1.25 : 1 }}
          transition={{ duration: 0.3 }}
          className={`h-[4px] w-[4px] rounded-full transition-all duration-300
            ${i === activeIndex ? "bg-black" : "bg-gray-300"}`}
        />
      ))}
    </div>
  );
};

export default function ImageCarousel({ product }: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

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
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative mb-2"
    >
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="h-[50vh] w-full md:h-[110vh] lg:h-[93vh] rounded-none"
      >
        {images.map((item, key) => (
          <SwiperSlide key={key}>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex h-full w-full items-center justify-center"
            >
              <Image
                src={item.url}
                alt={item.altText || product.title}
                fill
                className="h-full w-full object-cover md:object-cover relative"
                priority={key === 0}
              />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20"
      >
        <CustomBullet total={images.length} activeIndex={activeIndex} />
      </motion.div>
    </motion.div>
  );
}