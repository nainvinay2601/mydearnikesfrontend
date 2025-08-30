"use client";
import { Minus, Plus } from "lucide-react";

import { useState } from "react";
import { Button } from "../ui/button";

export default function ProductQuantity() {
  const [quantity, setQuantity] = useState(1);
  const increment = () => {
    setQuantity((prev) => prev + 1);
  };
  const decrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };
  return (
    <div className="flex justify-between items-center  px-[8px] pt-6 gap-3 ">
      <div className="rounded-none  w-[25%]    border-[0.25px] border-[#aeadad]  text-sm px-2 py-2   flex justify-between items-center  ">
        <button onClick={decrement}>
          <Minus size={12} />
        </button>
        <span>{quantity}</span>
        <button onClick={increment}>
          <Plus size={12} />
        </button>
      </div>
      <div className="addToCart w-[75%]">
        <Button className="w-full rounded-none py-2  border-[0.25px] border-[#aeadad]" variant={"outline"}>
            Add To Bag
        </Button>
      </div>
    
    </div>
  );
}
