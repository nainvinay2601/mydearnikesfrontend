"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center py-3 px-[8px] b border-[#aeadad] border-b-[0.5px]">
        <Button
          variant="outline"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`rounded-full text-white ${
            isMenuOpen ? "bg-black text-white border-none" : "bg-white text-black"
          }`}
        >
          {isMenuOpen ? "Close" : "Menu"}
        </Button>

        <div className="logo font-ispire text-3xl">MYDEARNIKES</div>

        <div className="cart">
          <Button variant={"outline"} className=" rounded-full">
            0
          </Button>
        </div>
      </div>
      {/* Sliding window  */}

      <div
        className={`transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-[50vh]" : "hidden"
        } overflow-hidden    `}
      >
        <nav className="flex  items-center  overflow-x-auto gap-2 scrollbar-hide px-[8px] py-[16px] border-b-[0.5px] border-[#aeadad] ">
          <Button variant={"outline"} className="rounded-full px-3 text-sm">
            {" "}
            New In
          </Button>
          <Button variant={"outline"} className="rounded-full px-3 text-sm">
            {" "}
            Tees
          </Button>
          <Button variant={"outline"} className="rounded-full px-3 text-sm">
            {" "}
            Bottoms
          </Button>
          <Button variant={"outline"} className="rounded-full px-3 text-sm">
            {" "}
            Accessories
          </Button>
          <Button variant={"outline"} className="rounded-full px-3 text-sm">
            {" "}
            Search
          </Button>
        </nav>
      </div>
    </>
  );
};

export default Header;
