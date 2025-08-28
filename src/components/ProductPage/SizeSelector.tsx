"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { RulerDimensionLine } from "lucide-react";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const SizeSelector = () => {
  const [selectedSize, setSelectedSize] = useState<string | null>('S');
  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
  };
  return (
    <div className="flex  items-center mt-7 px-[8px] w-full justify-between  ">
      <div className="container flex  items-center gap-3">
        <div className="heading text-[12px] font-regular">Size</div>
        <div className="sizeContainer ">
          {sizes.map((size) => (
            <Button
              variant={"outline"}
              key={size}
              className={`rounded-sm text-[10px] px-3 py-2 mr-3 ${
                selectedSize === size
                  ? "bg-black text-white"
                  : "bg-white text-black border-[0.25px]  border-[#aeadad] border-opacity-25 "
              } `}
              onClick={() => handleSizeClick(size)}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>
      <div className="sizeChart text-xs  ">
        <RulerDimensionLine size={18} strokeWidth={1}/> 
      </div>
    </div>
  );
};

export default SizeSelector;
