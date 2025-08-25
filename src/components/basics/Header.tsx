"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";

import SearchComponent from "../Homepage/Navbar/SearchComponent/SearchComp";
import TeesComponent from "../Homepage/Navbar/NavSections/teesSection/teesSection";
import NewInComponent from "../Homepage/Navbar/NavSections/newinSection/newInSection";
import BottomComponent from "../Homepage/Navbar/NavSections/bottomSection/bottomSection";
import AccessoriesComponent from "../Homepage/Navbar/NavSections/accessoriesSection/accessoriesSection";
import HelpBar from "../Homepage/Navbar/NavSections/helpBar/HelpBar";

const Header = () => {
  // 1️⃣  single state: null (closed) or section name
  const [active, setActive] = useState<
    null | "tees" | "bottoms" | "accessories" | "newin" | "search"
  >(null);

  // 2️⃣  open/close menu, default to Tees
  const toggle = () => setActive((prev) => (prev ? null : "tees"));

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white  borde-b-[0.5px]  border-[#aeadad]">
        {/* Header bar */}
        <div className="flex justify-between items-center py-3 px-[8px] border-[#aeadad] border-b-[0.5px]  ">
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
          <div className="absolute  top-full  left-0 right-0 bg-white shadow-md">
            <nav className="flex items-center overflow-x-auto gap-2 scrollbar-hide px-[8px] py-[16px] border-b-[0.5px] border-[#aeadad] ">
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
            {active === "tees" && <TeesComponent />}

            {active === "newin" && <NewInComponent />}
            {active === "bottoms" && <BottomComponent />}
            {active === "accessories" && <AccessoriesComponent />}
            {active === "search" && <SearchComponent />}

            {/* Help Bar */}
            <HelpBar />
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
