"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ShopByCategory = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const categories = [
    {
      href: "/category/oversized-unisex-tees",
      image: "/images/over.webp",
      title: "Oversized Tees"
    },
    {
      href: "/category/regular-fits",
      image: "/images/fitted.webp",
      title: "Fitted Tees"
    },
    {
      href: "/category/baby-tees",
      image: "/images/babyTeeco.webp",
      title: "Baby Tees"
    },
    {
      href: "/category/hoodies",
      image: "/images/fitted.webp",
      title: "Hoodies"
    },
    {
      href: "/category/all-products",
      image: "/images/allCover.png",
      title: "All Products"
    }
  ];

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="heading px-[8px] py-4 lg:py-8 border-t-[0.5px] border-b-[0.25px] border-[#aeadad]"
      >
        <h1 className="uppercase text-2xl lg:text-4xl font-medium">Explore Mydearnikes</h1>
      </motion.div>

      {/* Categories */}
      <div 
        ref={ref}
        className="categoriesSwiper overflow-x-auto w-full scrollbar-hide"
      >
        <div className="flex gap-[1px] min-w-max">
          {categories.map((category, index) => (
            <motion.div
              key={category.href}
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{
                duration: 0.6,
                delay: inView ? index * 0.1 : 0,
                ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
              }}
            >
              <Link 
                href={category.href}
                className="category bg-gray-100 w-[300px] lg:w-[500px] h-[450px] lg:h-[700px] bg-cover bg-center flex justify-center items-end group relative overflow-hidden"
                style={{ backgroundImage: `url('${category.image}')` }}
              >
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="shopText font-inter text-sm tracking-tight text-white mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300">
                  {category.title}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShopByCategory;