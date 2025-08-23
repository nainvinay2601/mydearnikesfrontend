"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTees, setShowTees] = useState(false);
  const [showBottoms, setShowBottoms] = useState(false);
  const [showAccessories, setShowAccessories] = useState(false);
  const [showNewIn, setShowNewIn] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center py-3 px-[8px]   border-[#aeadad] border-b-[0.5px]">
        <Button
          variant="outline"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
            setShowTees(!showTees);
            setShowBottoms(false);
            setShowAccessories(false);
            setShowNewIn(false);
            setShowSearch(false);
          }}
          className={`rounded-full text-white ${
            isMenuOpen
              ? "bg-black text-white border-none"
              : "bg-white text-black"
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
          <Button
            variant={"outline"}
            className="rounded-full px-3 text-sm border-b-[0.5px] border-[#aeadad]"
            onClick={() => {
              setShowTees(false);
              setShowBottoms(false);
              setShowAccessories(false);
              setShowNewIn(!showNewIn);
              setShowSearch(false);
            }}
          >
            {" "}
            New In
          </Button>
          <Button
            variant={"outline"}
            className={`rounded-full px-3 text-sm border-b-[0.5px] border-[#aeadad] ${
          showTees ? "bg-black text-white" : "bg-white text-black"
        } `}
            onClick={() => {
              setShowTees(!showTees);
              setShowBottoms(false);
              setShowAccessories(false);
              setShowNewIn(false);
              setShowSearch(false);
            }}
          >
            {" "}
            Tees
          </Button>
          <Button
            variant={"outline"}
            className="rounded-full px-3 text-sm border-b-[0.5px] border-[#aeadad]"
            onClick={() => {
              setShowTees(false);
              setShowBottoms(!showBottoms);
              setShowAccessories(false);
              setShowNewIn(false);
              setShowSearch(false);
            }}
          >
            {" "}
            Bottoms
          </Button>
          <Button
            variant={"outline"}
            className="rounded-full px-3 text-sm border-b-[0.5px] border-[#aeadad]"
            onClick={() => {
              setShowTees(false);
              setShowBottoms(false);
              setShowAccessories(!showAccessories);
              setShowNewIn(false);
              setShowSearch(false);
            }}
          >
            {" "}
            Accessories
          </Button>
          <Button
            variant={"outline"}
            className="rounded-full px-3 text-sm border-b-[0.5px] border-[#aeadad]"
            onClick={() => {
              setShowTees(false);
              setShowBottoms(false);
              setShowAccessories(false);
              setShowNewIn(false);
              setShowSearch(!showSearch);
            }}
          >
            {" "}
            Search
          </Button>
        </nav>
      </div>
      {/*  ======= tees Section ===========  */}

      <div
        className={`transition-all duration-300 ease-in-out ${
          showTees ? "max-h-[50vh]" : "hidden"
        } overflow-hidden    `}
      >
        <nav className="flex flex-col px-[8px] py-3 gap-2 border-b-[0.5px] border-[#aeadad] ">
          <a
            href=""
            className="text-xl font-semibold   tracking-tight underline underline-offset-4 "
          >
            All Tees
          </a>
          <a href="" className="text-xl font-semibold   tracking-tight  ">
            Oversized Tees
          </a>
          <a href="" className="text-xl font-semibold   tracking-tight ">
            Fitted Tees
          </a>
          <a href="" className="text-xl font-semibold   tracking-tight ">
            Baby Tees
          </a>
          <a href="" className="text-xl font-semibold   tracking-tight ">
            Blanks
          </a>
        </nav>
      </div>
      {/*  ======= New In Section ===========  */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          showNewIn ? "max-h-[50vh]" : "hidden"
        } overflow-hidden    `}
      >
        Hello New In
      </div>
      {/*  ======= Accessories Section ===========  */}

      <div
        className={`transition-all duration-300 ease-in-out ${
          showAccessories ? "max-h-[50vh]" : "hidden"
        } overflow-hidden    `}
      >
        Hello Accessories
      </div>
      {/*  ======= Bottoms Section ===========  */}

      <div
        className={`transition-all duration-300 ease-in-out ${
          showBottoms ? "max-h-[50vh]" : "hidden"
        } overflow-hidden    `}
      >
        Hello Bottoms
      </div>
      {/*  ======= Search Section ===========  */}

      <div
        className={`transition-all duration-300 ease-in-out ${
          showSearch ? "max-h-[50vh]" : "hidden"
        } overflow-hidden    `}
      >
        Hello Search
      </div>

      {/* Help Bar */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-[50vh]" : "hidden"
        } overflow-hidden    `}
      >
        <nav className="flex  items-center  overflow-x-auto gap-2 scrollbar-hide px-[8px] py-[16px] border-b-[0.5px] border-[#aeadad]  rounded-b-3xl  ">
          <Button variant={"outline"} className="rounded-full  px-3 text-sm border-b-[0.5px] border-[#aeadad]">
            {" "}
            Help
          </Button>
          <Button variant={"outline"} className="rounded-full px-3 text-sm border-b-[0.5px] border-[#aeadad]">
            {" "}
            Login
          </Button>
        </nav>
      </div>
    </>
  );
};

export default Header;
