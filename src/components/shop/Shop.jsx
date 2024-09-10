import React, { useState } from "react";
import "./shop.css";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa";
import ProductList from "./ProductList";

function Shop() {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);

  return (
    <>
      <div className="shopMain">
        <div className="shopHero">
          BOOKS <br />
          <span className="shopSubHeading">Home &gt; Books </span>
        </div>
      </div>
      <div className="navbars">
        <div className={`sideBar ${isOpenSideBar ? "openNav" : ""}`}></div>
        <div className="topBar">
          <div className="itemNumber">13 Items</div>
          <div className="sortBy">Sort by <FaAngleDown /></div>
          <div className="searchBox">
            <input
              type="text"
              placeholder="Search..."
              className="searchInput"
            />
            <FiSearch className="searchIcon" />
          </div>
          <div
            className="toggle"
            onClick={() => setIsOpenSideBar(!isOpenSideBar)}
          >
            <span>
              <HiBars3CenterLeft />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
