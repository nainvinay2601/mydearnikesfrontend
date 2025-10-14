"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import SearchComponent from "../Homepage/Navbar/SearchComponent/SearchComp";
import TeesComponent from "../Homepage/Navbar/NavSections/teesSection/teesSection";
import NewInComponent from "../Homepage/Navbar/NavSections/newinSection/newInSection";
import HelpBar from "../Homepage/Navbar/NavSections/helpBar/HelpBar";

import { useCartStore } from "@/store/cartStore";
import CartDrawer from "../cart/SlideOutDrawer";

type ActiveState = null | "tees" | "hoodies" | "sweatpants" | "all" | "newin" | "search";

const Header = () => {
  const router = useRouter();
  const [active, setActive] = useState<ActiveState>(null);
  const { totalItems } = useCartStore();
  const [cartOpen, setCartOpen] = useState(false);

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);
  const toggle = () => setActive((prev) => (prev ? null : "tees"));
  const closeMenu = () => setActive(null);

  const handleNavigation = (key: string) => {
    if (key === "all") {
      setActive(null);
      router.push("/category/all-products");
    } else if (key === "newin") {
      setActive(null);
      router.push("/category/new-arrivals");
    } else if (key === "hoodies") {
      setActive(null);
      router.push("/category/hoodies");
    } else if (key === "sweatpants") {
      setActive(null);
      router.push("/category/sweatpants");
    } else if (key === "search") {
      setActive("search");
    } else {
      const validKeys: ActiveState[] = [
        "tees",
        "all",
        "newin",
        "search",
      ];
      if (validKeys.includes(key as ActiveState)) {
        setActive(key as ActiveState);
      } else {
        setActive(null);
      }
    }
  };

  const menuItems = [
    { key: "all", label: "All Products" },
    { key: "newin", label: "New In" },
    { key: "tees", label: "Tees" },
    { key: "hoodies", label: "Hoodies & Sweats" },
    { key: "sweatpants", label: "Sweatpants" },
    { key: "search", label: "Search" },
  ];

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

        {/* Sliding window with AnimatePresence */}
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-full left-0 right-0 overflow-hidden"
            >
              <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-white flex items-center overflow-x-auto gap-2 scrollbar-hide px-[8px] py-[16px] border-b-[0.5px] border-[#aeadad]"
              >
                {menuItems.map(({ key, label }, index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.2 + (index * 0.1),
                      ease: "easeOut"
                    }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className={`rounded-full px-3 text-sm border-b-[0.5px] border-[#aeadad] hover:bg-gray-100 transition-colors ${
                        active === key ? "bg-black text-white hover:bg-black" : ""
                      }`}
                      onClick={() => handleNavigation(key)}
                    >
                      {label}
                    </Button>
                  </motion.div>
                ))}
              </motion.nav>

              {/* Section bodies with animations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                {active === "tees" && <TeesComponent onClose={closeMenu} />}
                {active === "newin" && <NewInComponent />}
                {active === "search" && <SearchComponent onClose={closeMenu} />}

                {/* Help Bar */}
                <HelpBar onClose={closeMenu} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Backdrop overlay with blur and animation */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>

      {/* Cart Drawer Component */}
      <CartDrawer isOpen={cartOpen} onClose={closeCart} />
    </>
  );
};

export default Header;