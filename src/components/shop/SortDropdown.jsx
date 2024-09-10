// SortDropdown.js
import React from 'react';
import './sortDropdown.css'; // Create this file for custom styles

const SortDropdown = ({ onSort }) => {
  return (
    <div className="sort-dropdown">
      <ul>
        <li onClick={() => onSort('priceAsc')}>Price: Low to High</li>
        <li onClick={() => onSort('priceDesc')}>Price: High to Low</li>
        <li onClick={() => onSort('newest')}>Newest Arrivals</li>
        <li onClick={() => onSort('rating')}>Top Rated</li>
      </ul>
    </div>
  );
};

export default SortDropdown;
