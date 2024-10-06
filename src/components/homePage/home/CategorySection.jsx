import React, { useEffect, useState } from "react";
import "./categorySection.css";
import { IoIosRocket } from "react-icons/io";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
import API from "../../../utils/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function CategorySection() {
  const [categories, setCategories] = useState([]);
  const [showAll, setShowAll] = useState(false); // State to toggle between showing 8 or all categories
  const [isAnimating, setIsAnimating] = useState(false); // State to manage closing animation
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await API.get("user/category");

        // Sort categories by books array length (descending)
        const sortedCategories = response.data.sort(
          (a, b) => (b.books?.length || 0) - (a.books?.length || 0)
        );

        setCategories(sortedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Function to toggle showing all categories
  const handleShowAll = () => {
    if (showAll) {
      // When collapsing, start the animation first and delay the modal close
      setIsAnimating(true);
      setTimeout(() => {
        setShowAll(false);
        setIsAnimating(false);
       
      }, 800); // Match the timeout with the CSS transition duration
    } else {
      setShowAll(true);
    }
  };

  return (
    <>
      <div className="categoryHead">
        <span className="headMain">Browse Books Categories</span> <br />
        <span className="headSub">
          Choose from a wide range of categories to find the perfect books for
          you here.
        </span>
      </div>

      <div
        className={`categories-container ${showAll ? "open" : ""} ${
          isAnimating ? "closing" : ""
        }`}
      >
        {categories.length == 0 ? (
          <div className="skeleton-wrapper">
            <Skeleton width="100%" height="400px" className="skelton-square"/>
          </div>
        ) : (
          categories
            .slice(0, showAll ? categories.length : 8)
            .map((category, index) => (
              <div key={index} className="category-square">
                <div className="category-icon">
                  <IoIosRocket />
                </div>
                <div className="category-name">{category.categoryName}</div>
                <div className="product-count">
                  {category?.books?.length} products
                </div>
              </div>
            ))
        )}
      </div>

      
      <div className="category_button-div">
        <button className="category-button" onClick={handleShowAll}>
          {showAll ? "Show Less Categories" : "Browse All Categories"}
          {showAll ? <FaArrowCircleUp /> : <FaArrowCircleDown />}{" "}
          
        </button>
      </div>
    </>
  );
}

export default CategorySection;
