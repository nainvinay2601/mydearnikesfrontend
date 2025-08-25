import React from "react";

const TeesComponent = () => {
  return (
    <>
      <nav className="flex flex-col px-[8px] py-3 gap-2 border-b-[0.5px] border-[#aeadad]">
        <a className="text-xl font-semibold tracking-tight underline underline-offset-4">
          All Tees
        </a>
        <a className="text-xl font-semibold tracking-tight">Oversized Tees</a>
        <a className="text-xl font-semibold tracking-tight">Fitted Tees</a>
        <a className="text-xl font-semibold tracking-tight">Baby Tees</a>
        <a className="text-xl font-semibold tracking-tight">Blanks</a>
      </nav>
    </>
  );
};

export default TeesComponent;
