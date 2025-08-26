import Image from "next/image";
import React from "react";

const LatestDropHero = () => {
  const latestProducts = [
    {
      id: 1,
      name: "Hello Nike",
      price: "₹1,299",
      image: "/images/mdn.webp",
      alt: "Neon Tee",
    },
    {
      id: 2,
      name: "Hello Nike",
      price: "₹1,299",
      image: "/images/pcrace.webp",
      alt: "PC Race Tee",
    },
    {
      id: 3,
      name: "Hello Nike",
      price: "₹1,299",
      image: "/images/HRU.webp",
      alt: "HRU Tee",
    },
    {
      id: 4,
      name: "Hello Nike",
      price: "₹1,299",
      image: "/images/blood.webp",
      alt: "Blood Tee",
    },
  ];

  return (
    <>
      <div className="heading px-[8px] py-4">
        <h1 className="uppercase text-2xl font-medium">Latest Drop</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 bg-gray-100 border-t-[0.25px]  border-[#aeadad] auto-rows-fr">
        {latestProducts.map((product) => (
          <div
            key={product.id}
            className="border-b-[0.25px] border-r-[0.25px] border-gray-400 flex flex-col "
          >
            <div className="flex-1 bg-gray-100 flex justify-center items-center p-2">
              <Image
                src={product.image}
                alt={product.alt}
                width={400}
                height={400}
                sizes="(max-width: 768px) 50vw, 33vw" // <-- helps Next.js pick the right src
                quality={90} // <-- sharper
                className="object-contain"
                priority
              />
            </div>
            <div className="px-2 bg-white py-1 flex border-t-[0.5px] border-gray-200 justify-between items-center text-sm">
              <h3 className="font-inter text-xs font-normal">{product.name}</h3>
              <p className="font-inter text-xs font-normal tracking-tight">
                {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LatestDropHero;
