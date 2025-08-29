"use client";
import React, { useState } from "react";


const data = [
  { title: "Overview", content: "This is the overview of the product...." },
  { title: "Fit", content: "This is the overview of the product2...." },
  { title: "Print", content: "This is the overview of the product3...." },
  { title: "Care", content: "This is the overview of the product4...." },
];
export default function ProductAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <>
      <div className="mt-7  focus:outline-none">
        {data.map((item, idx) => (
          <div key={idx} className="py-1 px-[8px] ">
            <button onClick={() => toggleAccordion(idx)} className=" w-full flex  justify-start itens-center  border-t-[0.25px] border-[#aeadad] pt-2  text-lg font-semibold">
              <span > {item.title} </span>
              <span className="ml-2">{openIndex === idx ? "-" : "+"}</span>
            </button>
            {/* content */}
            {openIndex === idx && (
              <div>
                <p className="text-xs text-gray-500 pb-1 pt-[3px]">{item.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
