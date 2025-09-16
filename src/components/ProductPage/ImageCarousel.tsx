

// "use client";
// import React, { useState } from "react";
// import { Swiper, SwiperSlide,  } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import Image from "next/image";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// const images = [
//   { src: "/images/pcrace.webp", alt: "Pic1" },
//   { src: "/images/blood.webp", alt: "pic2" },
//   { src: "/images/mdn.webp", alt: "pic2" },
//   { src: "/images/babyTee.webp", alt: "pic2" },
// ];

// // Custom Bullet

// const CustomBullet = ({
//   total,
//   activeIndex,
// }: {
//   total: number;
//   activeIndex: number;
// }) => {
//   return (
//     <div className="flex justify-center gap-1 mt-4">
//       {Array.from({ length: total }).map((_, i) => (
//         <button
//           key={i}
//           className={`h-[4px] w-[4px] rounded-full transition-all duration-300 
//           ${i === activeIndex ? "bg-black scale-125" : "bg-gray-300"}`}
//         />
//       ))}
//     </div>
//   );
// };

// export default function ImageCarousel() {
//   const [activeIndex, setActiveIndex] = useState(0);
//   return (
//     <div className=" relative mb-2 ">
//       <Swiper
//         // pagination={{ type: "bullets" }}
//         modules={[Autoplay]}
//         autoplay={{
//           delay: 4000,
//           disableOnInteraction: false, // Continues after user interaction
//         }}
//         // loop={true}
//         onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
//         className="h-96 w-full rounded-none "
//       >
//         {images.map((item, key) => (
//           <SwiperSlide key={key}>
//             <div className=" flex h-full w-full items-center justify-center">
//               <Image
//                 src={item.src}
//                 alt={item.alt}
//                 fill
//                 className="block h-full w-full object-cover relative"
//               />
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//       <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20">
//         <CustomBullet total={images.length} activeIndex={activeIndex} />
//       </div>
//     </div>
//   );
// }


// components/ImageCarousel.tsx
"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SimpleProduct } from '@/types/shopify';

interface ImageCarouselProps {
  product: SimpleProduct;
  autoplay?: boolean;
  autoplayDelay?: number;
  showBullets?: boolean;
  showDiscount?: boolean;
  height?: string;
  className?: string;
}

// Custom Bullet Component
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
           ${i === activeIndex ? "bg-white scale-125" : "bg-white/50"}`}
        />
      ))}
    </div>
  );
};

export default function ImageCarousel({
  product,
  autoplay = true,
  autoplayDelay = 4000,
  showBullets = true,
  showDiscount = true,
  height = "h-96",
  className = "",
}: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Get all product images, starting with featuredImage if it exists
  const getAllImages = () => {
    const allImages = [];
    
    // Add featured image first if it exists and is not already in images array
    if (product.featuredImage) {
      const featuredExists = product.images.some(img => img.url === product.featuredImage!.url);
      if (!featuredExists) {
        allImages.push(product.featuredImage);
      }
    }
    
    // Add all other images
    allImages.push(...product.images);
    
    return allImages;
  };

  const images = getAllImages();

  // Calculate discount info
  const hasDiscount = product.compareAtPrice && 
    product.compareAtPrice.amount !== "0.0" && 
    parseFloat(product.compareAtPrice.amount) > parseFloat(product.price.amount);
    
  const discountPercentage = hasDiscount 
    ? Math.round(((parseFloat(product.compareAtPrice!.amount) - parseFloat(product.price.amount)) / parseFloat(product.compareAtPrice!.amount)) * 100)
    : 0;

  // Handle empty images array
  if (!images || images.length === 0) {
    return (
      <div className={`${height} w-full bg-gray-100 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-gray-400 text-center">
          <div className="text-4xl mb-2">📷</div>
          <p>No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative mb-2 ${className}`}>
      <Swiper
        modules={[Autoplay]}
        autoplay={autoplay ? {
          delay: autoplayDelay,
          disableOnInteraction: false,
        } : false}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className={`${height} w-full rounded-lg overflow-hidden`}
      >
        {images.map((image, key) => (
          <SwiperSlide key={key}>
            <div className="flex h-full w-full items-center justify-center relative">
              <Image
                src={image.url}
                alt={image.altText || product.title}
                fill
                className="block h-full w-full object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={key === 0}
              />
              
              {/* Discount Badge - only show on first image */}
              {showDiscount && hasDiscount && key === 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                  -{discountPercentage}%
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom Bullets */}
      {showBullets && images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20">
          <CustomBullet total={images.length} activeIndex={activeIndex} />
        </div>
      )}
    </div>
  );
}


