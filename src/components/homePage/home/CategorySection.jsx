import React from 'react'
import './categorySection.css'
import { IoIosRocket } from "react-icons/io";
import { FaArrowCircleRight } from "react-icons/fa";



function CategorySection() {
  const categories = [
    { categoryName: "Drama", products: ["Product 1", "Product 2"] },
    { categoryName: "Comedy", products: ["Product 1"] },
    { categoryName: "Thriller", products: ["Product 1", "Product 2", "Product 3"] },
    { categoryName: "Romance", products: ["Product 1", "Product 2"] },
    { categoryName: "Science Fiction", products: ["Product 1", "Product 2", "Product 3", "Product 4"] },
    { categoryName: "Horror", products: ["Product 1"] },
    { categoryName: "Mystery", products: [] },
    { categoryName: "Fantasy", products: ["Product 1", "Product 2"] }
  ];
  return (
    <>
    <div className='categoryHead'>
        <span className='headMain'>Browse Books Categories</span> <br />
        <span className='headSub'>Choose from a wide range of categories to find the perfect books for you here.</span>
    </div>
    <div className="categories-container">
      {categories.map((category, index) => (
        <div key={index} className="category-square">
          <div className="category-icon"><IoIosRocket /></div>
          <div className="category-name">{category.categoryName}</div>
          <div className="product-count">{category.products.length} products</div>
        </div>
      ))}
      <div className="category_button-div">
      <   button className='category-button'>Browse All Categories <FaArrowCircleRight/></button>
      </div>
      
    </div>
    </>
    
  )
}

export default CategorySection