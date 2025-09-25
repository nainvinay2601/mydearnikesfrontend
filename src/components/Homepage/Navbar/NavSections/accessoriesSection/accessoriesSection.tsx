import React from "react";
import Link from "next/link";

const AccessoriesComponent = () => {
  const accessoryCategories = [
    { name: "All Accessories", href: "/category/all-accessories", isActive: true },
    { name: "Tumbler", href: "/category/tumbler" },
    { name: "Caps", href: "/category/caps" },
    { name: "Tote Bags", href: "/category/tote-bags" },
  ];

  return (
    <div className="py-3 bg-white">
      <nav className="flex flex-col px-[8px] py-3 gap-2 border-b-[0.5px] border-[#aeadad]">
        {accessoryCategories.map((category, index) => (
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

export default AccessoriesComponent;