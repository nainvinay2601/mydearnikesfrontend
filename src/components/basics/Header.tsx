"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import SearchComponent from "../Homepage/Navbar/SearchComponent/SearchComp";
import TeesComponent from "../Homepage/Navbar/NavSections/teesSection/teesSection";
import NewInComponent from "../Homepage/Navbar/NavSections/newinSection/newInSection";
import BottomComponent from "../Homepage/Navbar/NavSections/bottomSection/bottomSection";
import AccessoriesComponent from "../Homepage/Navbar/NavSections/accessoriesSection/accessoriesSection";
import HelpBar from "../Homepage/Navbar/NavSections/helpBar/HelpBar";

import { useCartStore } from "@/store/cartStore";
import CartDrawer from "../cart/SlideOutDrawer";

const Header = () => {
  const router = useRouter();

  // 1️⃣ single state: null (closed) or section name
  const [active, setActive] = useState<
    null | "tees" | "bottoms" | "all" | "newin" | "search"
  >(null);

  const { totalItems } = useCartStore();
  const [cartOpen, setCartOpen] = useState(false);

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  // 2️⃣ open/close menu, default to Tees
  const toggle = () => setActive((prev) => (prev ? null : "tees"));

  // Handle navigation
  // Handle navigation
  const handleNavigation = (key: string) => {
    if (key === "all") {
      // Close menu and navigate to All Products page
      setActive(null);
      router.push("/category/all-products");
    } else if (key === "newin") {
      // Close menu and navigate to New In page
      setActive(null);
      router.push("/category/new-arrivals");
    } else if (key === "search") {
      // Show search component
      setActive("search" as any);
    } else {
      // Show other components (tees, bottoms, etc.)
      setActive(key as any);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white borde-b-[0.5px] border-[#aeadad]">
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

          <div
            className="logo font-ispire text-3xl cursor-pointer"
            onClick={() => router.push("/")}
          >
            MYDEARNIKES
          </div>

          {/* Cart button with visual counter */}
          <Button
            variant="outline"
            className="rounded-full relative min-w-[60px] transition-all duration-200"
            onClick={openCart}
          >
            {totalItems > 0 ? (
              <div className="flex items-center justify-center">
                <span className="font-medium">{totalItems}</span>
              </div>
            ) : (
              <span>Cart</span>
            )}
            {totalItems > 0 && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-black rounded-full animate-pulse"></div>
            )}
          </Button>
        </div>

        {/* Sliding window */}
        {active && (
          <div className="absolute top-full left-0 right-0  ">
            <nav className="bg-white flex items-center overflow-x-auto gap-2 scrollbar-hide px-[8px] py-[16px] border-b-[0.5px] border-[#aeadad]">
              {[
                { key: "all", label: "All Products", href: "/category/all" },
                {
                  key: "newin",
                  label: "New In",
                  href: "/category/new-arrivals",
                },
                { key: "tees", label: "Tees" }, // No href = show component
                { key: "bottoms", label: "Bottoms" }, // No href = show component
                { key: "search", label: "Search" }, // No href = show component
              ].map(({ key, label, href }) => (
                <Button
                  key={key}
                  variant="outline"
                  size="sm"
                  className={`rounded-full px-3 text-sm border-b-[0.5px] border-[#aeadad] hover:bg-gray-100 transition-colors ${
                    active === key ? "bg-black text-white hover:bg-black" : ""
                  }`}
                  onClick={() => handleNavigation(key, href)}
                >
                  {label}
                </Button>
              ))}
            </nav>

            {/* Section bodies - only show when not navigating */}
            {active === "tees" && <TeesComponent />}
            {active === "newin" && <NewInComponent />}
            {active === "bottoms" && <BottomComponent />}
            {/* {active === "all" && <AccessoriesComponent />} */}
            {active === "search" && <SearchComponent />}

            {/* Help Bar */}
            <HelpBar />
          </div>
        )}
      </header>

      {/* Cart Drawer Component */}
      <CartDrawer isOpen={cartOpen} onClose={closeCart} />
    </>
  );
};

export default Header;
