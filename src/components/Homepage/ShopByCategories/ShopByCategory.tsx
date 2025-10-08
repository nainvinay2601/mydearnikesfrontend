


import React from "react";
import Link from "next/link";

const ShopByCategory = () => {
  return (
    <>
      <div className="heading px-[8px] py-4 lg:py-8 border-t-[0.5px] border-b-[0.25px] border-[#aeadad]">
        <h1 className="uppercase text-2xl lg:text-4xl font-medium ">Explore Mydearnikes</h1>
      </div>
      {/* Categories */}
      <div className="categoriesSwiper overflow-x-auto w-full scrollbar-hide">
        <div className="flex gap-[1px] min-w-max">
          {/* category-1 */}
          <Link href="/category/all-products" className="category relative bg-pink-100 w-[300px] lg:w-[500px]  h-[450px] lg:h-[700px] bg-[url('/images/over3.jpg')] bg-cover bg-center">
            <div className="numberButton font-ispire border-[1px] border-white inline-block px-3 py-1 font-normal text-3xl absolute top-[8px] left-[8px] text-white">
              01
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
              <div className="shopText font-ispire font-normal text-3xl text-white">Oversized Tees</div>
            </div>
          </Link>
          {/* category-2 */}
          <Link href="/category/hoodies" className="category relative bg-pink-100 w-[300px] lg:w-[500px]  h-[450px] lg:h-[700px]  bg-[url('/images/fashionTee.png')] bg-cover bg-center">
            <div className="numberButton font-ispire border-[1px] border-white inline-block px-3 py-1 font-normal text-3xl absolute top-[8px] left-[8px] text-white">
              02
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
              <div className="shopText font-ispire font-normal text-3xl text-white">Fitted Tees</div>
            </div>
          </Link>
          {/* category-3 */}
          <Link href="/category/all-products" className="category relative bg-pink-100 w-[300px] lg:w-[500px]  h-[450px] lg:h-[700px]  bg-[url('/images/newIn.png')] bg-cover bg-center">
            <div className="numberButton font-ispire border-[1px] border-white inline-block px-3 py-1 font-normal text-3xl absolute top-[8px] left-[8px] text-white">
              03
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
              <div className="shopText font-ispire font-normal text-3xl text-white">Baby Tees</div>
            </div>
          </Link>
          {/* Category-4 */}
          <Link href="/category/new-arrivals" className="category relative bg-pink-100 w-[300px] lg:w-[500px]  h-[450px] lg:h-[700px]  bg-[url('/images/fashionTee.png')] bg-cover bg-center">
            <div className="numberButton font-ispire border-[1px] border-white inline-block px-3 py-1 font-normal text-3xl absolute top-[8px] left-[8px] text-white">
              04
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
              <div className="shopText font-ispire font-normal text-3xl text-white">Hoodies</div>
            </div>
          </Link>
          {/* Category-4 */}
          <Link href="/category/all-products" className="category relative bg-pink-100 w-[300px] lg:w-[500px]  h-[450px] lg:h-[700px]  bg-[url('/images/allProducts.jpg')] bg-cover bg-center">
            <div className="numberButton font-ispire border-[1px] border-white inline-block px-3 py-1 font-normal text-3xl absolute top-[8px] left-[8px] text-white">
              05
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
              <div className="shopText font-ispire font-normal text-3xl text-white">All Products</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ShopByCategory;