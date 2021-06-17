import React from "react";

function SearchBar({ value, onChange }) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      class="searchbar"
      placeholder="search by keywords"
      value={value}
      onChange={handleChange}
    />
  );
}

export default SearchBar;
