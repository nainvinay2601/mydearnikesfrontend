import React from "react";
import Link from "next/link";

const BottomComponent = () => {
  const bottomCategories = [
    { name: "All Bottoms", href: "/category/all-bottoms", isActive: true },
    { name: "Shorts", href: "/category/shorts" },
    { name: "Pants", href: "/category/pants" },
  ];

  return (
    <div className="bg-white py-3">
      <nav className="flex flex-col px-[8px] py-3 gap-2 border-b-[0.5px] border-[#aeadad]">
        {bottomCategories.map((category, index) => (
          <Link
            key={index}
            href={category.href}
            className={`text-xl font-semibold tracking-tight transition-colors hover:text-gray-600 ${
              category.isActive 
                ? "underline underline-offset-4" 
                : "hover:underline hover:underline-offset-4"
            }`}
          >
            {category.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default BottomComponent;