import React, { useState } from "react";
import "./shop.css";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa";
import ProductList from "./ProductList"; // Ensure this component lists your products

function Shop() {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);

  return (
    <>
      {/* Hero Section */}
      <div className="shopMain">
        <div className="shopHero">
          BOOKS <br />
          <span className="shopSubHeading">Home &gt; Books </span>
        </div>
      </div>

      {/* Layout Container */}
      <div className="products">
        <div className="navbars">
          {/* Sidebar */}
          <div className={`sideBar ${isOpenSideBar ? "openNav" : ""}`}></div>

          {/* Main Content */}
          <div className="mainContent">
            {/* Top Bar */}
            <div className="topBar">
              <div className="itemNumber">13 Items</div>
              <div className="sortBy">
                Sort by <FaAngleDown />
              </div>

              {/* Search Box */}
              <div
                className={`searchBox ${
                  isSearchBoxOpen ? "openSearch" : "closeSearch"
                }`}
              >
                <input
                  type="text"
                  placeholder="Search..."
                  className="searchInput"
                />
                <FiSearch className="searchIcon" />
              </div>

              {/* Toggle Buttons for Small Screens */}
              <div className="toggle">
                <div
                  className="searchOnSmall"
                  onClick={() => setIsSearchBoxOpen(!isSearchBoxOpen)}
                >
                  <FiSearch />
                </div>
                <div className="sortOnSmall">
                  <FaAngleDown />
                </div>
                <span onClick={() => {
                    setIsSearchBoxOpen(false)
                    setIsOpenSideBar(!isOpenSideBar)
                }}>
                  <HiBars3CenterLeft />
                </span>
              </div>
            </div>

            {/* Product Section */}
            <div className="productSection">
              <ProductList /> {/* Product list component */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
