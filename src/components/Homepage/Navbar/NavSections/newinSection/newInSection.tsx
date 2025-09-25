import React from "react";
import Link from "next/link";

const NewInComponent = () => {
  const newInCategories = [
    { name: "Latest Arrivals", href: "/category/new-arrivals", isActive: true },
    { name: "Crop Tops", href: "/category/crop-tops" },
    { name: "MDN Pants", href: "/category/mdn-pants" },
    { name: "Rockstar Energy Drink", href: "/category/rockstar-energy" },
  ];

  return (
    <div className="bg-white py-2">
      <nav className="flex flex-col px-[8px] py-3 gap-2 border-b-[0.5px] border-[#aeadad]">
        {newInCategories.map((category, index) => (
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

export default NewInComponent;