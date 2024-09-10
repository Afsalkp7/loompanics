// ProductList.js
import React from 'react';
import './productList.css'
import { CiHeart } from "react-icons/ci";
import RatingComponent from './RatingComponent';

function ProductList({ products }) {
    if (products.length === 0) {
        return (
          <div className="product-list">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="product-card"></div>
            ))}
          </div>
        );
      }

  return (
    
    
    <div className="product-list">
      {products.map((product) => (
        <div key={product._id} className="product-card">
          <img className='product-image' src={product.primaryImageUrl} alt='product' />
          
          <span className='product-category'><div>{product.categoryId.categoryName}</div><div><CiHeart /></div></span><br/>
          <span className='product-title'>{product.title.toUpperCase()}</span><br />
          <RatingComponent />
          <span className={`product-price ${!product.discound?'activePrice':''}`}>₹ {product.discound?<span className='product-last-price'>{product.originalPrice - product.discound}</span>:product.originalPrice} /- </span>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
