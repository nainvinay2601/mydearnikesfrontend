"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";

const Header = () => {
  // 1️⃣  single state: null (closed) or section name
  const [active, setActive] = useState<null | "tees" | "bottoms" | "accessories" | "newin" | "search">(null);

  // 2️⃣  open/close menu, default to Tees
  const toggle = () => setActive((prev) => (prev ? null : "tees"));

  return (
    <>
      {/* Header bar */}
      <div className="flex justify-between items-center py-3 px-[8px] border-[#aeadad] border-b-[0.5px]">
        <Button
          variant="outline"
          onClick={toggle}
          className={`rounded-full text-white ${
            active ? "bg-black text-white border-none" : "bg-white text-black"
          }`}
        >
          {active ? "Close" : "Menu"}
        </Button>

        <div className="logo font-ispire text-3xl">MYDEARNIKES</div>

        <Button variant="outline" className="rounded-full">
          0
        </Button>
      </div>

      {/* Sliding window */}
      {active && (
        <>
          <nav className="flex items-center overflow-x-auto gap-2 scrollbar-hide px-[8px] py-[16px] border-b-[0.5px] border-[#aeadad]">
            {[
              { key: "newin", label: "New In" },
              { key: "tees", label: "Tees" },
              { key: "bottoms", label: "Bottoms" },
              { key: "accessories", label: "Accessories" },
              { key: "search", label: "Search" },
            ].map(({ key, label }) => (
              <Button
                key={key}
                variant="outline"
                size="sm"
                className={`rounded-full px-3 text-sm border-b-[0.5px] border-[#aeadad] ${
                  active === key ? "bg-black text-white" : ""
                }`}
                onClick={() => setActive(key)}
              >
                {label}
              </Button>
            ))}
          </nav>

          {/* Section bodies */}
          {active === "tees" && (
            <nav className="flex flex-col px-[8px] py-3 gap-2 border-b-[0.5px] border-[#aeadad]">
              <a className="text-xl font-semibold tracking-tight underline underline-offset-4">
                All Tees
              </a>
              <a className="text-xl font-semibold tracking-tight">Oversized Tees</a>
              <a className="text-xl font-semibold tracking-tight">Fitted Tees</a>
              <a className="text-xl font-semibold tracking-tight">Baby Tees</a>
              <a className="text-xl font-semibold tracking-tight">Blanks</a>
            </nav>
          )}

          {active === "newin" && <div className="px-[8px] py-2">
            <nav className="flex flex-col px-[8px] py-3 gap-2 border-b-[0.5px] border-[#aeadad]">
              <a className="text-xl font-semibold tracking-tight underline underline-offset-4">
                Crop Tops
              </a>
              <a className="text-xl font-semibold tracking-tight">MDN Pants</a>
              <a className="text-xl font-semibold tracking-tight">Rockstar Energy Drink</a>
            
            </nav>
            </div>}
          {active === "bottoms" && <div className="px-[8px] py-3">
              <nav className="flex flex-col px-[8px] py-3 gap-2 border-b-[0.5px] border-[#aeadad]">
              <a className="text-xl font-semibold tracking-tight underline underline-offset-4">
                All Bottoms
              </a>
              <a className="text-xl font-semibold tracking-tight">Shorts</a>
              <a className="text-xl font-semibold tracking-tight">Pants</a>
            
            </nav>
            </div>}
          {active === "accessories" && <div className="px-[8px] py-3">
              <nav className="flex flex-col px-[8px] py-3 gap-2 border-b-[0.5px] border-[#aeadad]">
              <a className="text-xl font-semibold tracking-tight underline underline-offset-4">
                All Accessories
              </a>
              <a className="text-xl font-semibold tracking-tight">Tumbler</a>
              <a className="text-xl font-semibold tracking-tight">Caps</a>
              <a className="text-xl font-semibold tracking-tight">Tote Bags</a>
            
            </nav>
            </div>}
          {active === "search" && <div className="px-[8px] py-3">Hello Search</div>}

          {/* Help Bar */}
          <nav className="flex items-center overflow-x-auto gap-2 scrollbar-hide px-[8px] py-[16px] border-b-[0.5px] border-[#aeadad] rounded-b-3xl">
            <Button variant="outline" className="rounded-full px-3 text-sm">
              Help
            </Button>
            <Button variant="outline" className="rounded-full px-3 text-sm">
              Login
            </Button>
          </nav>
        </>
      )}
    </>
  );
};

export default Header;