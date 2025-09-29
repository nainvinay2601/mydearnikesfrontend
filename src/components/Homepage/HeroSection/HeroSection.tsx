import React from "react";
import Link from "next/link";


const HeroSection = () => {
  return (
    <>
      <div className="bg-[url('/images/heroImg.png')] pt-16 bg-cover bg-center h-[95vh] lg:hidden flex justify-center items-center  ">
        <div className="buttonBox flex flex-col h-[80vh]  justify-between items-center ">
          <div className="subText text-white border-[#ffffff] uppercase font-normal text-sm border-[0.5px] inline-block px-2 py-1 rounded-full ">
            Graphics for the chronically online{" "}
          </div>

          <Link href="/category/all-products">
            <button className="font-bebas text-3xl border-1 border-white px-3 pb-2 pt-3 text-white rounded-lg tracking-[0.5px] leading-none flex justify-center items-center hover:bg-black hover:text-white  hover:border-0">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HeroSection;