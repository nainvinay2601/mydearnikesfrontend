import Image from "next/image";
import React from "react";

const ImageCarousel = () => {
  return (
    <div className="w-full bg-white h-[40vh] flex justify-center items-center md:hidden px-0">
      <Image
        alt="PC Race Edition tees"
        src={"/images/pcrace.webp"}

        sizes="(max-width:768px) 100vw, 50vw"
        width={800}
        height={860}
        quality={90}
        className="  w-full h-full  object-cover px-[8px] "
        priority
      />
    </div>
  );
};

export default ImageCarousel;





