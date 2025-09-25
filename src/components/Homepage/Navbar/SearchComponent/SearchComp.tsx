import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import NavCarousel from "../NavImageCarousel/NavCarousel";

const SearchComponent = () => {
  return (
    <div className="bg-white">
      <SearchBar />
      <NavCarousel />
    </div>
  );
};

export default SearchComponent;
