



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
          <Link href="/category/all-products" className="category  bg-gray-100 w-[300px] lg:w-[500px]  h-[450px] lg:h-[700px] bg-[url('/images/overX3.png')] bg-cover bg-center flex justify-center items-end">


              <div className="shopText  font-inter text-sm tracking-tight text-white mb-6">Oversized Tees</div>

          </Link>
          {/* category-2 */}
          <Link href="/category/hoodies" className="category  bg-gray-100 w-[300px] lg:w-[500px]  h-[450px] lg:h-[700px]  bg-[url('/images/fashionTee.png')] bg-cover bg-center flex justify-center items-end">
           

              <div className="shopText  font-inter text-sm tracking-tight text-white mb-6">Fitted Tees</div>

          </Link>
          {/* category-3 */}
          <Link href="/category/all-products" className="category  bg-gray-100 w-[300px] lg:w-[500px]  h-[450px] lg:h-[700px]  bg-[url('/images/newIn.png')] bg-cover bg-center flex justify-center items-end ">
           

              <div className="shopText  font-inter text-sm tracking-tight text-white mb-6">Baby Tees</div>

          </Link>
          {/* Category-4 */}
          <Link href="/category/new-arrivals" className="category  bg-gray-100 w-[300px] lg:w-[500px]  h-[450px] lg:h-[700px]  bg-[url('/images/fashionTee.png')] bg-cover bg-center flex justify-center items-end">
           

              <div className="shopText  font-inter text-sm tracking-tight text-white mb-6">Hoodies</div>

          </Link>
          {/* Category-4 */}
          <Link href="/category/all-products" className="category  bg-gray-100 w-[300px] lg:w-[500px]  h-[450px] lg:h-[700px]  bg-[url('/images/allProducts.jpg')] bg-cover bg-center flex justify-center items-end">
           

              <div className="shopText  font-inter text-sm tracking-tight text-white mb-6">All Products</div>

          </Link>
        </div>
      </div>
    </>
  );
};

export default ShopByCategory;