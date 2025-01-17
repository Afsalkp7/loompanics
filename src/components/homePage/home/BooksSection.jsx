import { useEffect, useRef, useState } from "react";
import "./booksSection.css";
import API from "../../../utils/api";
import Slider from "../../modules/Slider";

const BooksSection = () => {
  // State to track the active button
  const [activeIndex, setActiveIndex] = useState(0);
  const [books, setBooks] = useState([]); // State to store books data
  const buttonRefs = useRef([]);

  const buttons = [
    { label: "Trending", key: "isTrending" },
    { label: "Featured Books", key: "isFeatured" },
    { label: "New Arrival", key: "newArrival" },
    { label: "Most Rated", key: "mostRate" },
    { label: "Most Selled", key: "mostSelled" },
  ];

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      if (activeIndex !== undefined) {
        try {
          const key = buttons[activeIndex].key;
          // Send the key as a query parameter
          const response = await API.get(`/shop?${key}=true`);
          setBooks(response.data);
        } catch (error) {
          console.error("Error fetching books data:", error);
        }
      }
    };

    fetchBooks();
  }, [activeIndex]);

  return (
    <div className="booksSection">
      <div className="booksHead">
        <span className="booksHeadMain">New & Random Books</span> <br />
        <span className="booksHeadSub">
          Unlock knowledge, adventure, and imagination with every page you turn.
        </span>{" "}
        <br /> <br />
        <div className="main-container">
          <div className="inner-container">
            <div className="button-chain">
              <div
                className="highlight"
                style={{
                  left: buttonRefs.current[activeIndex]?.offsetLeft || 0,
                  width: buttonRefs.current[activeIndex]?.offsetWidth || 0,
                }}
              ></div>
              {buttons.map((button, index) => (
                <button
                  key={index}
                  ref={(el) => (buttonRefs.current[index] = el)}
                  onClick={() => handleClick(index)}
                  className={`button ${activeIndex === index ? "active" : ""}`}
                >
                  {button.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="books">
        {books.length > 0 ? (
          <Slider data={books}/>
        ) : (
          <p>No books available.</p>
        )}
      </div>
    </div>
  );
};

export default BooksSection;
