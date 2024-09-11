import React, { useEffect, useState } from "react";
import "./shop.css";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa";
import ProductList from "./ProductList"; // Ensure this component lists your products
import API from "../../utils/api"; // Your API utility for making requests
import SortDropdown from "./SortDropdown";

function Shop() {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [accordionState, setAccordionState] = useState({
    categories: false,
    authors: false,
    priceRanges: false,
  });

  useEffect(() => {
    // Function to fetch products, categories, and authors from API
    const fetchProducts = async () => {
      try {
        const response = await API.get("/shop");
        const data = response.data;
        
        setProducts(data);
        setFilteredResults(data);

        // Create unique categories from the products data
        const categoryMap = new Map();
        data.forEach(product => {
          const { categoryId } = product;
          if (!categoryMap.has(categoryId._id)) {
            categoryMap.set(categoryId._id, {
              ...categoryId
            });
          }
        });
        setCategories(Array.from(categoryMap.values()));

        // Create unique authors from the products data
        const authorMap = new Map();
        data.forEach(product => {
          const { authorId } = product;
          const authorKey = `${authorId._id}`; // Use ID for uniqueness
          if (!authorMap.has(authorKey)) {
            authorMap.set(authorKey, {
              ...authorId
            });
          }
        });
        setAuthors(Array.from(authorMap.values()));

      } catch (err) {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle search input changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter results based on search term
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(value.toLowerCase()) ||
        (product.authorId.firstName + " " + product.authorId.lastName)
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        product.categoryId.categoryName.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredResults(filtered);
  };

  // Handle category selection for filtering
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    const updatedCategories = e.target.checked
      ? [...selectedCategories, value]
      : selectedCategories.filter((category) => category !== value);
    setSelectedCategories(updatedCategories);
    applyFilters(updatedCategories, selectedAuthors, selectedPriceRanges);
  };

  // Handle author selection for filtering
  const handleAuthorChange = (e) => {
    const value = e.target.value;
    const updatedAuthors = e.target.checked
      ? [...selectedAuthors, value]
      : selectedAuthors.filter((author) => author !== value);
    setSelectedAuthors(updatedAuthors);
    applyFilters(selectedCategories, updatedAuthors, selectedPriceRanges);
  };

  // Handle price range selection for filtering
  const handlePriceRangeChange = (e) => {
    const value = e.target.value;
    const updatedPriceRanges = e.target.checked
      ? [...selectedPriceRanges, value]
      : selectedPriceRanges.filter((range) => range !== value);
    setSelectedPriceRanges(updatedPriceRanges);
    applyFilters(selectedCategories, selectedAuthors, updatedPriceRanges);
  };

  // Apply all filters to the products list
  const applyFilters = (categories, authors, priceRanges) => {
    let filtered = products;

    // Filter by selected categories
    if (categories.length) {
      filtered = filtered.filter((product) =>
        categories.includes(product.categoryId._id)
      );
    }

    // Filter by selected authors
    if (authors.length) {
      filtered = filtered.filter((product) =>
        authors.includes(product.authorId._id)
      );
    }

    // Filter by selected price ranges
    if (priceRanges.length) {
      filtered = filtered.filter((product) => {
        return priceRanges.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return product.originalPrice >= min && product.originalPrice <= max;
        });
      });
    }

    setFilteredResults(filtered);
  };

  // Handle sorting
  const handleSort = (sortType) => {
    let sortedProducts = [...filteredResults];
    switch (sortType) {
      case "priceAsc":
        sortedProducts.sort((a, b) => a.originalPrice - b.originalPrice);
        break;
      case "priceDesc":
        sortedProducts.sort((a, b) => b.originalPrice - a.originalPrice);
        break;
      case "newest":
        sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "rating":
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    setFilteredResults(sortedProducts);
  };

  // Toggle accordion sections
  const toggleAccordion = (section) => {
    setAccordionState((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (loading) return <div>Loading...</div>;
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
          <div className={`sideBar ${isOpenSideBar ? "openNav" : ""}`}>
            {/* Category Filter Accordion */}
            <div className="accordion" style={{ display: isOpenSideBar ? 'block' : 'none' }}>
              <h3 onClick={() => toggleAccordion("categories")}>
                Filter By Categories
              </h3>
              {accordionState.categories && (
                <div className="accordionContent">
                  {categories.map((category) => (
                    <><label key={category._id}>
                      <input
                        type="checkbox"
                        value={category._id}
                        onChange={handleCategoryChange}
                      />
                      {category.categoryName} ({category.books.length})
                    </label><br /></>
                  ))}
                </div>
              )}
            </div>

            {/* Author Filter Accordion */}
            <div className="accordion" style={{ display: isOpenSideBar ? 'block' : 'none' }}>
              <h3 onClick={() => toggleAccordion("authors")}>
                Filter By Authors
              </h3>
              {accordionState.authors && (
                <div className="accordionContent">
                  {authors.map((author) => (
                    <><label key={author._id}>
                      <input
                        type="checkbox"
                        value={author._id}
                        onChange={handleAuthorChange}
                      />
                      {author.firstName} {author.lastName} ({author.books.length})
                    </label><br /></>
                  ))}
                </div>
              )}
            </div>

            {/* Price Filter Accordion */}
            <div className="accordion" style={{ display: isOpenSideBar ? 'block' : 'none' }}>
              <h3 onClick={() => toggleAccordion("priceRanges")}>
                Filter By Price
              </h3>
              {accordionState.priceRanges && (
                <div className="accordionContent">
                  {[
                    "0-100",
                    "100-200",
                    "200-300",
                    "300-400",
                    "400-500",
                    "500-600",
                    "600-700",
                    "700-800",
                    "800-900",
                    "900-1000",
                  ].map((range) => (
                    <><label key={range}>
                      <input
                        type="checkbox"
                        value={range}
                        onChange={handlePriceRangeChange}
                      />
                      {range}
                    </label><br /></>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="mainContent">
            {/* Top Bar */}
            <div className="topBar">
              <div className="itemNumber">{filteredResults.length} Items</div>

              {/* Toggle Buttons for Small Screens */}
              <div className="toggle">
                <div
                  className="searchOnSmall"
                  onClick={() => setIsSearchBoxOpen(!isSearchBoxOpen)}
                >
                  <FiSearch />
                </div>
                <div
                  className="sortOnSmall"
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                >
                  <FaAngleDown />
                  {showSortDropdown && <SortDropdown onSort={handleSort} />}
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
              {/* Search Box */}
              <div
                className={`searchBox ${
                  isSearchBoxOpen ? "openSearch" : "closeSearch"
                }`}
              >
                <input
                  type="text"
                  placeholder="Search by author, category, or title..."
                  className="searchInput"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <button className="searchBtn" onClick={() => {}}>
                  <FiSearch />
                </button>
              </div>

              {/* Product List */}
              <ProductList products={filteredResults} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
