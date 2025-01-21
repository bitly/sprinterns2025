import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = () => {
  const [DropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");


  const toggleDropdown = () => {
    setDropdownVisible(!DropdownVisible);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setDropdownVisible(false);
  };

  return (
    <div className="search-bar">
        <div className="dropdown">
            <div className="dropdown-text" onClick={toggleDropdown}>
                <span>{selectedCategory || "Select a category"}</span>
            </div>
                {DropdownVisible && (
                    <ul className={`dropdown-list ${DropdownVisible ? "show" : ""}`}>
                        <li className="dropdown-list-item" onClick={() => selectCategory("All")}>  All </li>
                        <li className="dropdown-list-item" onClick={() => selectCategory("Social")}> Social </li>
                        <li className="dropdown-list-item" onClick={() => selectCategory("Business")}> Business </li>
                        <li className="dropdown-list-item" onClick={() => selectCategory("Education")}> Education </li>
                        <li className="dropdown-list-item" onClick={() => selectCategory("Recreation")}> Recreation </li>
                    </ul>
                )}
            </div>
            {/* </div> */}

      {/* Search Input Section */}
        <div className="search-box">
        <input
            type="text"
            placeholder={selectedCategory ? `Search ${selectedCategory}` : "Search"}
        />
        </div>
    </div>
  );
};

export default SearchBar;
