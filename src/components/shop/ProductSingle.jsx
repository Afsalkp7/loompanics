import React, { useEffect, useState } from "react";
import "./productSingle.css";
import RatingComponent from "./RatingComponent";
import {
  MdLocationPin,
  MdOutlineCall,
  MdOutlineMailOutline,
} from "react-icons/md";
import { FaBookOpenReader } from "react-icons/fa6";

import { IoIosGlobe } from "react-icons/io";
import { useParams } from "react-router-dom";
import API from "../../utils/api";
import logo from "../../assets/logo_without_bg.png";
import BookSlider from "./BookSlider";
function ProductSingle() {
  const { _id } = useParams(); // Capture the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch product details
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/shop/${_id}`);
        setProduct(response.data);
      } catch (err) {
        setError("Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <>
      <div className="shopMain">
        <div className="shopHero">
          BOOKS <br />
          <span className="shopSubHeading">Home &gt; Books </span>
        </div>
      </div>
      <div className="productSingleMain">
        <div className="leftSection">
          <div className="leftHeroSection">
            <div className="productImageSection">
              <div className="productImage">
                <img src={product.primaryImageUrl} />
              </div>
              {product.secondaryImageUrl ? (
                <div className="productImage">
                  <img src={product.secondaryImageUrl} />
                </div>
              ) : (
                ""
              )}
              {product.thirdImageUrl ? (
                <div className="productImage">
                  <img src={product.thirdImageUrl} />
                </div>
              ) : (
                ""
              )}
            </div>
            <span className="productTitle">{product.title}</span>
            <br />
            <span className="productAuthor">
              {product.authorId.firstName + " " + product.authorId.lastName}
            </span>
            <RatingComponent />
            <div className="productDetails">
              <div className="price">
                <span>Price</span> <br />
                <span>
                  ₹{" "}
                  {product.discound
                    ? product.originalPrice - product.discound
                    : product.originalPrice}{" "}
                  /-
                </span>
              </div>
              <div className="category">
                <span>Category</span>
                <br />
                <span>{product.categoryId.categoryName}</span>
              </div>
              <div className="author">
                <span>Author</span> <br />
                <span>
                  {product.authorId.firstName + product.authorId.lastName}
                </span>
              </div>
              <div className="edition">
                <span>Edition</span> <br />
                <span>{product.edition}</span>
              </div>
            </div>
          </div>
          <div className="descriptionSection">
            <div className="description">
              <span className="descriptionTitle">Description</span> <br />
              <span>{product.description}</span>
            </div>
            {product.awards.length > 1 ? (
              <div className="awards">
                <span className="awardsTitle">Awards</span>
                <br />
                <span>
                  The book {product.title} won several award like{" "}
                  {product.awards[0]} , somes are give below
                </span>{" "}
                <br />
                <ul>
                  {product.awards.map((award, index) => (
                    <li key={index}> {award.awardTitle + "-" + award.year}</li>
                  ))}
                </ul>
              </div>
            ) : (
              ""
            )}

            <div className="authorDescription">
              <span className="authorTitle">
                {product.authorId.firstName + " " + product.authorId.lastName}{" "}
                (Author)
              </span>
              <br />
              <div className="authorImage">
                <img src={product.authorId.image} alt="author image" />
              </div>
              <span> <span className="dataTitle">Pen Name :</span> <span className="dataSubContent"> {product.authorId.penName}</span></span>
              <br />
              <span> <span className="dataTitle">Occupation :</span><span className="dataSubContent"> {product.authorId.occupation} </span></span>
              <br />
              <span> <span className="dataTitle">Notable Works :</span></span>
              <br />
              {product.authorId.notableWorks[0]
                .split(",")
                .map((work, index) => (
                  <span className="dataContent" key={index}>
                    {work}
                    <br />
                  </span>
                ))}
                
              {product.authorId.awards.length > 0 ? (
                <>
                  <span><span className="dataTitle">Awards: </span></span>
                  <br />
                  {product.authorId.awards.map((award, index) => (
                    <span className="dataContent" key={award._id}>
                      {award.awardTitle + " " + award.awardYear}
                      <br />
                    </span>
                    
                  ))}
                </>
              ) : (
                ""
              )}
              <span className="booksFrom">
                    Books From This Author
                </span> <br />
                <BookSlider books = {product.authorId.books} />
            </div>
            <div className="categoryDescription">
              <span className="categoryTitle">{product.categoryId.categoryName} (category)</span> <br />
              <span>{product.categoryId.description}</span>
            </div>
            <span className="booksFrom">
                    Books From This Category
                </span> <br />
                <BookSlider books = {product.categoryId.books} />
          </div>
        </div>
        <div className="rightSection">
          <div className="bookOverView">
            <div>Book Overview</div>
            <div className="overView">
                <div className="overIcon">
                    <FaBookOpenReader />
                </div>
                <div className="overContent">
                    <span>Book Title</span> <br />
                    <span>{product.title}</span>
                </div>
            </div>
            <div className="overView">
                <div className="overIcon">
                    <FaBookOpenReader />
                </div>
                <div className="overContent">
                    <span>Book Title</span> <br />
                    <span>{product.title}</span>
                </div>
            </div>
            <div className="overView">
                <div className="overIcon">
                    <FaBookOpenReader />
                </div>
                <div className="overContent">
                    <span>Book Title</span> <br />
                    <span>{product.title}</span>
                </div>
            </div>
            <div className="overView">
                <div className="overIcon">
                    <FaBookOpenReader />
                </div>
                <div className="overContent">
                    <span>Book Title</span> <br />
                    <span>{product.title}</span>
                </div>
            </div>
            <div className="overView">
                <div className="overIcon">
                    <FaBookOpenReader />
                </div>
                <div className="overContent">
                    <span>Book Title</span> <br />
                    <span>{product.title}</span>
                </div>
            </div>
            <div className="overView">
                <div className="overIcon">
                    <FaBookOpenReader />
                </div>
                <div className="overContent">
                    <span>Book Title</span> <br />
                    <span>{product.title}</span>
                </div>
            </div>
            <div className="overView">
                <div className="overIcon">
                    <FaBookOpenReader />
                </div>
                <div className="overContent">
                    <span>Book Title</span> <br />
                    <span>{product.title}</span>
                </div>
            </div>
            
          </div>
          <div className="loompanicsSection">
            <img className="loompanicsImage" alt="logo image" src={logo} />
            <div className="loompanicsLinks">
              <span className="loompanicsName">
                Loompanics Online Books Store
              </span>
              <span className="loompanicsDetail">Since July 2017</span>
              <br />
              <ul>
                <li>
                  <MdOutlineCall />
                  <span></span>
                </li>
                <li>
                  <MdOutlineMailOutline />
                </li>
                <li>
                  <IoIosGlobe />
                </li>
                <li>
                  <MdLocationPin />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductSingle;
