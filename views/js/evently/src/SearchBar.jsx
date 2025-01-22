import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ events, onSearch }) => {
  const [DropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  
  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);

    // Filter events by title
    const filtered = events.filter((event) =>
      event.title.toLowerCase().includes(value)
    );

    // Pass the filtered events back to the parent component
    onSearch(filtered);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropDownVisible);
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
                {dropDownVisible && (
                    <ul className={`dropdown-list ${dropDownVisible ? "show" : ""}`}>
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
          data-search
          placeholder={selectedCategory ? `Search ${selectedCategory}` : "Search"}
          value={searchValue}
          onChange={handleInputChange}
        />
        </div>
    </div>
  );
};

export default SearchBar;
