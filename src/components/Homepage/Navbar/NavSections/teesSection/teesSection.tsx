"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface TeesComponentProps {
  onClose: () => void;
}

const TeesComponent: React.FC<TeesComponentProps> = ({ onClose }) => {
  const teeCategories = [
    { name: "Oversized Tees", href: "/category/oversized-unisex-tees" },
    { name: "Fitted Tees", href: "/category/regular-fits" },
    { name: "Baby Tees", href: "/category/baby-tees" },
  ];

  return (
    <nav className="flex flex-col px-[8px] py-3 gap-2 border-b-[0.5px] border-[#aeadad] bg-white">
      {teeCategories.map((category, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.4, 
            delay: index * 0.15,
            ease: "easeOut"
          }}
        >
          <Link
            href={category.href}
            className="text-xl font-semibold tracking-tight transition-colors hover:text-gray-600 hover:underline hover:underline-offset-4 block"
            onClick={onClose}
          >
            {category.name}
          </Link>
        </motion.div>
      ))}
    </nav>
  );
};

export default TeesComponent;