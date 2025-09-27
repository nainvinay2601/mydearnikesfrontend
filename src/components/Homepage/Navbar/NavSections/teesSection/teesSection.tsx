
import React from "react";
import Link from "next/link";

interface TeesComponentProps {
  onClose: () => void; 
}

const TeesComponent: React.FC<TeesComponentProps> = ({ onClose }) => {
  const teeCategories = [
    { name: "Oversized Tees", href: "/category/oversized-unisex-tees", isActive: true },
    { name: "Fitted Tees", href: "/category/regular-fits" },
    { name: "Baby Tees", href: "/category/baby-tees" },
    { name: "Hoodies", href: "/category/hoodies" },
  ];

  return (
    <nav className="flex flex-col px-[8px] py-3 gap-2 border-b-[0.5px] border-[#aeadad] bg-white">
      {teeCategories.map((category, index) => (
        <Link
          key={index}
          href={category.href}
          className={`text-xl font-semibold tracking-tight transition-colors hover:text-gray-600 ${
            category.isActive
              ? "underline underline-offset-4"
              : "hover:underline hover:underline-offset-4"
          }`}
          onClick={onClose} 
        >
          {category.name}
        </Link>
      ))}
    </nav>
  );
};

export default TeesComponent;