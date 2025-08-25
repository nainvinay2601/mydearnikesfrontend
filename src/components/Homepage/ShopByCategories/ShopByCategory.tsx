
import React from "react";

const ShopByCategory = () => {
  return (
    <>
      <div className="heading px-[8px] py-4 border-t-[0.5px] border-b-[0.25px] border-[#aeadad]">
        <h1 className="uppercase text-2xl font-medium">Explore Mydearnikes</h1>
      </div>
      {/* Categories */}
      <div className="categoriesSwiper  overflow-x-auto w-full">
        <div className="flex gap-[1px]  min-w-max">
          {/* category-1 */}
          <div className="category relative bg-pink-100 w-[300px] h-[450px] bg-[url('/images/fashionTee.png')] bg-cover bg-center">
            <div className="numberButton font-ispire border-[1px] border-white inline-block px-3 py-1 font-normal  text-3xl absolute top-[8px] left-[8px] text-white">
              01
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
              <div className="shopText font-ispire font-normal text-3xl  text-white">Tees</div>
            </div>
          </div>
          {/* category-2 */}
          <div className="category relative bg-pink-100 w-[300px] h-[450px] bg-[url('/images/accessories.png')] bg-cover bg-center">
            <div className="numberButton font-ispire border-[1px] border-white inline-block px-3 py-1 font-normal  text-3xl absolute top-[8px] left-[8px] text-white">
              02
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
              <div className="shopText font-ispire font-normal text-3xl  text-white">Accessories</div>
            </div>
          </div>
          {/* category-3 */}
          <div className="category relative bg-pink-100 w-[300px] h-[450px] bg-[url('/images/newIn.png')] bg-cover bg-center">
            <div className="numberButton font-ispire border-[1px] border-white inline-block px-3 py-1 font-normal  text-3xl absolute top-[8px] left-[8px] text-white">
              03
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
              <div className="shopText font-ispire font-normal text-3xl  text-white">New In</div>
            </div>
          </div>
          {/* Category-4 */}
          <div className="category relative bg-pink-100 w-[300px] h-[450px] bg-[url('/images/fashionTee.png')] bg-cover bg-center">
            <div className="numberButton font-ispire border-[1px] border-white inline-block px-3 py-1 font-normal  text-3xl absolute top-[8px] left-[8px] text-white">
              04
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
              <div className="shopText font-ispire font-normal text-3xl  text-white">Bottoms</div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default ShopByCategory;
