import React, { useEffect, useState } from "react";
import "./productSingle.css";
import RatingComponent from "./RatingComponent";
import {
  MdLocationPin,
  MdOutlineCall,
  MdOutlineMailOutline,
} from "react-icons/md";
import { toast } from 'react-hot-toast';
import { FaBookOpenReader } from "react-icons/fa6";
import { CiPen } from "react-icons/ci";
import { SiGradleplaypublisher } from "react-icons/si";
import { FiDollarSign } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import { RiPagesLine } from "react-icons/ri";
import { CiCalendarDate } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { IoIosGlobe } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../utils/api";
import logo from "../../assets/logo_without_bg.png";
import BookSlider from "./BookSlider";
import Skeleton from "react-loading-skeleton";
import NotFound from "../layout/NotFound";
import Error from "../layout/Error";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from "../../redux/cartSlice.js";

function ProductSingle() {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate()
  const dispatch = useDispatch();
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
  const handleAddToCart = () => {
    const isAlreadyInCart = cartItems.some((item) => item.bookId === product._id);
    if (isAlreadyInCart) {
      toast.error("This item is already in your cart.");
    } else {
      dispatch(addToCart({ bookId: product._id, quantity: 1 }));
    }
    // dispatch(addToCart({ bookId: product._id, quantity: 1 }));
  };

  const handleBuyNow = () => {
    navigate(`/checkout?productId=${product._id}`);
  };

  if (loading) {
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
                  <Skeleton className="skelton"/>
                </div>
              </div>
            </div>
          </div>
          <div className="rightSection">
          <div className="bookOverView">
            <div className="overViewTite">Book Overview</div>
            <div className="overView">
              <div className="overIcon">
                <FaBookOpenReader />
              </div>
              <div className="overContent">
                <span>Book Title</span> <br />
                <span><Skeleton /></span>
              </div>
            </div>
            <div className="overView">
              <div className="overIcon">
                <CiPen />
              </div>
              <div className="overContent">
                <span>Author</span> <br />
                <span>
                <Skeleton />
                </span>
              </div>
            </div>
            <div className="overView">
              <div className="overIcon">
                <SiGradleplaypublisher />
              </div>
              <div className="overContent">
                <span>Publisher</span> <br />
                <span><Skeleton /></span>
              </div>
            </div>
            <div className="overView">
              <div className="overIcon">
                <FiDollarSign />
              </div>
              <div className="overContent">
                <span>Original price</span> <br />
                <span><Skeleton /></span>
              </div>
            </div>
            <div className="overView">
              <div className="overIcon">
                <FiDollarSign />
              </div>
              <div className="overContent">
                <span>Discount</span> <br />
                <span><Skeleton /></span>
              </div>
            </div>
            <div className="overView">
              <div className="overIcon">
                <BiCategory />
              </div>
              <div className="overContent">
                <span>Category</span> <br />
                <span><Skeleton /></span>
              </div>
            </div>
            <div className="overView">
              <div className="overIcon">
                <RiPagesLine />
              </div>
              <div className="overContent">
                <span>Pages</span> <br />
                <span><Skeleton /></span>
              </div>
            </div>
            <div className="overView">
              <div className="overIcon">
                <CiCalendarDate />
              </div>
              <div className="overContent">
                <span>Published date</span> <br />
                <span><Skeleton /></span>
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
  if (error) return <div><Error errorMessage={error} /></div>;
  if (!product) return <div><NotFound/></div>;

  return (
    <>
      {/* <div className="shopMain">
        <div className="shopHero">
          BOOKS <br />
          <span className="shopSubHeading">Home &gt; Books </span>
        </div>
      </div> */}
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
            {/* <RatingComponent /> */}

            <div className="productDetails">
              {/* <div className="price offerPrice">
                <span>Offer Price</span> <br />
                <span>
                  ₹{" "}
                  {product.discount
                    ? product.originalPrice - product.discount
                    : product.originalPrice}{" "}
                  /-
                </span>
              </div>
              <div className="price ogPrice">
                <span>Original Price</span> <br />
                <span>₹ {product.originalPrice} /-</span>
              </div> */}

              {/* <div className="category">
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
              </div> */}
              <div className="price ogPrice">
                <span>₹ {product.originalPrice} /-</span><br/>{product.discount && <span className="discountAknowledgment">Buy Now and get ₹ {product.discount} /- Extra discount</span>}
              </div>
            </div>

            <div className="buttons">
              <button  onClick={handleAddToCart}>
                <IoCartOutline />
              </button>
              <button>
                <CiHeart />
              </button>
              <button onClick={handleBuyNow}>Buy now</button>
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
                {product.authorId.firstName + " " + product.authorId?.lastName}{" "}
                (Author)
              </span>
              <br />
              <div className="authorImage">
                <img src={product.authorId.image} alt="author image" />
              </div>
              <span>
                {" "}
                <span className="dataTitle">Pen Name :</span>{" "}
                <span className="dataSubContent">
                  {" "}
                  {product.authorId.penName}
                </span>
              </span>
              <br />
              <span>
                {" "}
                <span className="dataTitle">Occupation :</span>
                <span className="dataSubContent">
                  {" "}
                  {product.authorId.occupation}{" "}
                </span>
              </span>
              <br />
              <span>
                {" "}
                <span className="dataTitle">Notable Works :</span>
              </span>
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
                  <span>
                    <span className="dataTitle">Awards: </span>
                  </span>
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
              <span className="booksFrom">Books From This Author</span> <br />
              <BookSlider books={product.authorId.books} />
            </div>
            <div className="categoryDescription">
              <span className="categoryTitle">
                {product.categoryId.categoryName} (category)
              </span>{" "}
              <br />
              <span>{product.categoryId.description}</span>
            </div>
            <span className="booksFrom">Books From This Category</span> <br />
            <BookSlider books={product.categoryId.books} />
          </div>
        </div>
        <div className="rightSection">
          <div className="bookOverView">
            <div className="overViewTite">Book Overview</div>
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
                <CiPen />
              </div>
              <div className="overContent">
                <span>Author</span> <br />
                <span>
                  {product.authorId.firstName + " " + product.authorId.lastName}
                </span>
              </div>
            </div>
            <div className="overView">
              <div className="overIcon">
                <SiGradleplaypublisher />
              </div>
              <div className="overContent">
                <span>Publisher</span> <br />
                <span>{product.publisherId.publisherName}</span>
              </div>
            </div>
            <div className="overView">
              <div className="overIcon">
                <FiDollarSign />
              </div>
              <div className="overContent">
                <span>Original price</span> <br />
                <span>{product.originalPrice}</span>
              </div>
            </div>
            <div className="overView">
              <div className="overIcon">
                <FiDollarSign />
              </div>
              <div className="overContent">
                <span>Discount</span> <br />
                <span>{product.discount}</span>
              </div>
            </div>
            <div className="overView">
              <div className="overIcon">
                <BiCategory />
              </div>
              <div className="overContent">
                <span>Category</span> <br />
                <span>{product.categoryId.categoryName}</span>
              </div>
            </div>
            <div className="overView">
              <div className="overIcon">
                <RiPagesLine />
              </div>
              <div className="overContent">
                <span>Pages</span> <br />
                <span>{product.pages}</span>
              </div>
            </div>
            <div className="overView">
              <div className="overIcon">
                <CiCalendarDate />
              </div>
              <div className="overContent">
                <span>Published date</span> <br />
                <span>{product.publicationDate.split("T")[0]}</span>
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
