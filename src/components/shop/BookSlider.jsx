import React, { useEffect, useState } from "react";
import './bookSlider.css'
import { useNavigate } from "react-router-dom";
function BookSlider({books}) {

   const navigate = useNavigate()
    
  return (
    <div className="explore-menu" id="explore-menu">
      <div className="explore-menu-list">
        {books.map((item) => (
          <div
            onClick={()=>navigate(`/books/${item._id}`)}
            key={item._id} // Correctly placed the key attribute here
            className="explore-menu-list-item"
          >
            <img src={item.primaryImageUrl} alt={item.title} />
            <p>{item.title}</p>
            <span>₹ {item.originalPrice} /-</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookSlider;
