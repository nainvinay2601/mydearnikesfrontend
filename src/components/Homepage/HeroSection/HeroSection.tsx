

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

interface HeroSlide {
  id: number;
  bgImage: string;
  productImage: string;
  productName: string;
  productPrice: string;
  productLink: string;
}

interface MobileHeroSlide {
  id: number;
  bgImage: string;
}

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Desktop slides (landscape images)
  const heroSlides: HeroSlide[] = [
    {
      id: 1,
      bgImage: "/images/bigBg.jpg",
      productImage: "/images/mock.webp",
      productName: "Meant Nothing?",
      productPrice: "₹1,299",
      productLink: "/product/oversized-unisex-tee-2",
    },
    {
      id: 2,
      bgImage: "/images/heroNew.jpg",
      productImage: "/images/HRU.webp",
      productName: "How Are You Feeling Today",
      productPrice: "₹1,299",
      productLink: "/product/unisex-oversized-classic-t-shirt-2?variant=46535005241562",
    },
    {
      id: 3,
      bgImage: "/images/pinkBlunt.jpg",
      productImage: "/images/soMany.webp",
      productName: "so many bad bitches",
      productPrice: "₹699",
      productLink: "/product/crop-top-2?variant=46209917452506",
    },
  ];

  // Mobile slides (portrait images)
  const mobileHeroSlides: MobileHeroSlide[] = [
    {
      id: 1,
      bgImage: "/images/bigBg.jpg",
    },
    {
      id: 2,
      bgImage: "/images/heroImageNonBlur.jpg",
    },
    {
      id: 3,
      bgImage: "/images/heroNew.jpg",
    },
  ];

  // Auto-rotate slides on desktop
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroSlides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const currentSlide = heroSlides[activeIndex];

  return (
    <>
      {/* MOBILE VERSION */}
      <div className="lg:hidden relative h-[95vh] pt-15 overflow-hidden">
        {/* Background Image Carousel (slides in/out) */}
        <div className="absolute inset-0 w-full h-full">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="w-full h-full"
          >
            {mobileHeroSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div
                  className="bg-cover bg-center h-full w-full"
                  style={{ backgroundImage: `url('${slide.bgImage}')` }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Fixed Text and Button (stays in place) - Higher z-index */}
        <div className="absolute inset-0 z-20 flex justify-center items-center pointer-events-none">
          <div className="buttonBox flex flex-col h-[80vh] justify-between items-center pt-4 pointer-events-auto">
            <div className="subText text-white border-[#ffffff] uppercase font-normal text-sm border-[0.5px] inline-block px-2 py-1 rounded-full bg-black/20 backdrop-blur-sm">
              Graphics for the chronically online
            </div>

            <Link href="/category/all-products">
              <button className="font-bebas text-3xl border-1 border-white px-3 pb-2 pt-3 text-white rounded-lg tracking-[0.5px] leading-none flex justify-center items-center hover:bg-black hover:text-white hover:border-0 bg-black/20 backdrop-blur-sm">
                Shop Now
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile Slide Indicators - Even higher z-index */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
          {mobileHeroSlides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-white w-8"
                  : "bg-white/50 w-2 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* DESKTOP VERSION */}
      <div className="hidden lg:flex gap-[8px] pt-15">
        {/* Left Side - Main Hero Image */}
        <div className="w-[60vw] h-[94vh] relative py-10  mt-4 mx-[8px]">
          <div>
            <div
              className="w-full h-full bg-cover bg-center absolute inset-0 border-[0.125px] border-[#000000]"
              style={{ backgroundImage: `url('${currentSlide.bgImage}')` }}
            />

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "bg-black w-8"
                      : "bg-gray-400 w-2 hover:bg-gray-600"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Product Preview + Content */}
        <div className="w-[40vw] h-[94vh] px-[8px] mt-4">
          {/* Product Image - Clickable */}
          <Link href={currentSlide.productLink}>
            <div className="h-[65vh] border-[0.125px] border-[#000000] relative overflow-hidden cursor-pointer group">
              {/* Product Image */}
              <div
                className="w-full h-full bg-cover bg-center absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${currentSlide.productImage}')` }}
              />
              
              {/* Product Info Bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t-[0.125px] border-[#000000] px-[8px] py-1 flex justify-between items-center">
                <div className="font-normal text-black text-base uppercase">
                  {currentSlide.productName}
                </div>
                <div className=" text-sm font-normal">
                  {currentSlide.productPrice}
                </div>
              </div>
            </div>
          </Link>

          {/* Bottom Section */}
          <div className="h-[30vh] pt-2 flex flex-col justify-between">
            <div className="subheading pt-6">
              <div className="subText text-black border-[#000000] uppercase font-normal text-lg border-[0.5px] inline-block px-2 py-1 rounded-full">
                Graphics for the chronically online
              </div>
            </div>

            <div className="headingAndCta flex justify-between items-end">
              <div className="heading font-bebas text-[98px] leading-20 mt-2">
                <p>NOT FOR</p>
                <p>EVERYONE</p>
              </div>
              <div className="cta mb-2">
                <Link href="/category/all-products">
                  <button className="font-bebas text-3xl border-1 border-black px-3 pb-2 pt-3 text-black rounded-lg tracking-[0.5px] leading-none flex justify-center items-center hover:bg-black hover:text-white hover:border-0">
                    Shop Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;