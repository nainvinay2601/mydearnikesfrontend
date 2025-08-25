import Image from "next/image";
import React from "react";

const LatestDropHero = () => {
  return (
    <>
    <div className="heading px-[8px] py-4">
        <h1 className="uppercase text-2xl font-medium">Latest Drop</h1>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 bg-gray-100  ">
      {/* Card 1 */}
      <div className="border-t-[0.25px] border-l-[0.25px] border-gray-400  flex flex-col justify-between">
        <div className="aspect-square  bg-gray-100">
          <Image
            src="/images/MDNPink.webp"
            alt="Neon Tee"
            width={180}
            height={180}
            className="w-full h-full object-cover px-1"
          />
        </div>
        <div className="px-2 bg-white py-1 flex border-t-[0.5px] border-gray-200  justify-between items-center text-sm">
          <h3 className="font-inter text-xs font-normal">Hello Nike</h3>
          <p className="font-inter text-xs font-normal tracking-tight">₹1,299</p>
        </div>
      </div>

      {/* Card 2 */}
      <div className="border-t-[0.25px] border-l-[0.25px] border-gray-400  flex flex-col">
        <div className="aspect-square bg-gray-100">
          <Image
            src="/images/MDNPink.webp"
            alt="Neon Tee"
            width={180}
            height={180}
            className="w-full h-full object-cover px-1"
          />
        </div>
         <div className="px-2 bg-white py-1 flex border-t-[0.5px] border-gray-200  justify-between items-center text-sm">
          <h3 className="font-inter text-xs font-normal">Hello Nike</h3>
          <p className="font-inter text-xs font-normal tracking-tight">₹1,299</p>
        </div>
      </div>

      {/* Card 3 */}
      <div className="border-t-[0.25px] border-l-[0.25px] border-gray-400  flex flex-col  ">
        <div className="aspect-square bg-gray-100">
          <Image
            src="/images/MDNPink.webp"
            alt="Neon Tee"
            width={180}
            height={180}
            className="w-full h-full object-cover px-1"
          />
        </div>
         <div className="px-2 bg-white py-1 flex border-t-[0.5px] border-gray-200  justify-between items-center text-sm">
          <h3 className="font-inter text-xs font-normal">Hello Nike</h3>
          <p className="font-inter text-xs font-normal tracking-tight">₹1,299</p>
        </div>
      </div>
      {/* Card 4 */}

      <div className="border-t-[0.25px] border-l-[0.25px] border-gray-400  flex flex-col">
        <div className="aspect-square bg-gray-100">
          <Image
            src="/images/MDNPink.webp"
            alt="Neon Tee"
            width={180}
            height={180}
            className="w-full h-full object-cover px-1"
          />
        </div>
         <div className="px-2 bg-white py-1 flex border-t-[0.5px] border-gray-200  justify-between items-center text-sm">
          <h3 className="font-inter text-xs font-normal">Hello Nike</h3>
          <p className="font-inter text-xs font-normal tracking-tight">₹1,299</p>
        </div>
      </div>

      {/* Add more static cards here */}
    </div>
    </>
  );
};

export default LatestDropHero;
