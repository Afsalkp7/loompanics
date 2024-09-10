import React, { useEffect, useState } from "react";
import "./shop.css";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa";
import ProductList from "./ProductList"; // Ensure this component lists your products
import API from "../../utils/api"; // Your API utility for making requests

function Shop() {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await API.get("/shop");
        setProducts(response.data);
      } catch (err) {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to run only on component mount

  // Render Loading or Error States
  if (loading) return (
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
              <div className="itemNumber">00 Items</div>

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
                <span
                  onClick={() => {
                    setIsSearchBoxOpen(false);
                    setIsOpenSideBar(!isOpenSideBar);
                  }}
                >
                  <HiBars3CenterLeft />
                </span>
              </div>
            </div>

            {/* Product Section */}
            <div className="productSection">
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
              {/* Pass products to ProductList component */}
              <ProductList products={products} />
            </div>
          </div>
        </div>
      </div>
    </>

  );
  if (error) return <div>{error}</div>;

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
              <div className="itemNumber">{products.length} Items</div>

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
                <span
                  onClick={() => {
                    setIsSearchBoxOpen(false);
                    setIsOpenSideBar(!isOpenSideBar);
                  }}
                >
                  <HiBars3CenterLeft />
                </span>
              </div>
            </div>

            {/* Product Section */}
            <div className="productSection">
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
              {/* Pass products to ProductList component */}
              <ProductList products={products} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
