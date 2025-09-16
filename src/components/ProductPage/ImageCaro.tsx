

"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide,  } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
  { src: "/images/pcrace.webp", alt: "Pic1" },
  { src: "/images/blood.webp", alt: "pic2" },
  { src: "/images/mdn.webp", alt: "pic2" },
  { src: "/images/babyTee.webp", alt: "pic2" },
];

// Custom Bullet

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

export default function ImageCaro() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className=" relative mb-2 ">
      <Swiper
        // pagination={{ type: "bullets" }}
        modules={[Autoplay]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false, // Continues after user interaction
        }}
        // loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="h-96 w-full rounded-none "
      >
        {images.map((item, key) => (
          <SwiperSlide key={key}>
            <div className=" flex h-full w-full items-center justify-center">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="block h-full w-full object-cover relative"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20">
        <CustomBullet total={images.length} activeIndex={activeIndex} />
      </div>
    </div>
  );
}