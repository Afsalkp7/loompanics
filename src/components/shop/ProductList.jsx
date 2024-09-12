import React, { useState } from 'react';
import './productList.css';
import { useNavigate } from 'react-router-dom';
import { CiHeart } from "react-icons/ci";
import RatingComponent from './RatingComponent';

const itemsPerPage = 10; // Number of items to display per page

function ProductList({ products }) {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate()
    // Calculate the start and end indices for slicing the products array
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = products.slice(startIndex, endIndex);

    // Calculate the total number of pages
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

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
        <div>
            <div className="product-list">
                {paginatedProducts.map((product) => (
                    <div key={product._id} className="product-card"  onClick={()=>navigate(`/books/${product._id}`)} >
                        <img className='product-image' src={product.primaryImageUrl} alt='product' />
                        
                        <span className='product-category'>
                            <div>{product.categoryId.categoryName}</div>
                            <div><CiHeart /></div>
                        </span>
                        <br />
                        <span className='product-title'>{product.title.toUpperCase()}</span>
                        <br />
                        <RatingComponent />
                        <span className={`product-price ${!product.discound ? 'activePrice' : ''}`}>
                            ₹ {product.discound ? <span className='product-last-price'>{product.originalPrice - product.discound}</span> : product.originalPrice} /- 
                        </span>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="pagination-controls">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={index + 1 === currentPage ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default ProductList;
