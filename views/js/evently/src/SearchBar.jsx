import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [dropDownVisible, setDropdownVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const toggleDropdown = () => {
    setDropdownVisible(!dropDownVisible);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setDropdownVisible(false);
    onSearch("", category)
  };

  return (
    <div className="search-bar-community">
        <div className="dropdown">
            <div className="dropdown-text" onClick={toggleDropdown}>
                <span>{selectedCategory || "Select a category"}</span>
            </div>
                {dropDownVisible && (
                    <ul className={`dropdown-list ${dropDownVisible ? "show" : ""}`}>
                        <li className="dropdown-list-item" onClick={() => selectCategory("All")}>  All </li>
                        <li className="dropdown-list-item" onClick={() => selectCategory("Social")}> Social </li>
                        <li className="dropdown-list-item" onClick={() => selectCategory("Business")}> Business </li>
                        <li className="dropdown-list-item" onClick={() => selectCategory("Education")}> Education </li>
                        <li className="dropdown-list-item" onClick={() => selectCategory("Arts & Recreation")}> Arts & Recreation </li>
                    </ul>
                )}
            </div>
            {/* </div> */}

      {/* Search Input Section */}
        <div className="search-box">
        <input
          type="text"
          placeholder={selectedCategory ? `Search ${selectedCategory}` : "Search"}
          onChange={(e) => onSearch(e.target.value, selectedCategory)}
        />
        </div>
    </div>
  );
};

export default SearchBar;
