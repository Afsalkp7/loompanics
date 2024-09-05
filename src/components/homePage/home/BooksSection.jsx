import React, { useRef, useState } from "react";
import "./booksSection.css";
const BooksSection = () => {
  // State to track the active button
  const [activeIndex, setActiveIndex] = useState();
  const buttonRefs = useRef([]);

  const buttons = ['Trending', 'Featured Books', 'New Arrival', 'Most Rated' , 'Most Selled'];

  const handleClick = (index) => {
    setActiveIndex(index);
  };

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
          {buttons.map((label, index) => (
            <button
              key={index}
              ref={(el) => (buttonRefs.current[index] = el)}
              onClick={() => handleClick(index)}
              className={`button ${activeIndex === index ? 'active' : ''}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
      </div>
      <div className="books"></div>
    </div>
  );
};

export default BooksSection;
