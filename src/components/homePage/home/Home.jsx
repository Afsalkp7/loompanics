import React from "react";
import "./Home.css";
import bookReadingKids from '../../../assets/bookReadingKids.png'
import CategorySection from "./CategorySection";
import BooksSection from "./BooksSection";
import HowToRead from "./HowToRead";
import BrowseBooksSection from "./BrowseBooksSection";
function Home() {
  return (
    <>
      <div className="hero">
        <div className="heroText">
          <span className="heroTextFirst">WE HAVE 1500+ BOOKS.</span><br />
            <span className="heroTextSecond">Find your dream books <br /> from LOOMPANICS</span><br />
            <span className="heroTextThird">
              Find books, create membership and take your favourite<br/>
              books.Carefully Buy after analyzing the needs of different geners.
            </span><br />
          <button className="heroTextBtn">Explore Books World</button>
        </div>
        <div className="HeroImage">
          <img src={bookReadingKids} alt="Book reading kids" />
        </div>
      </div>
      <CategorySection />
      <BooksSection />
      <HowToRead />
      <BrowseBooksSection />
    </>
  );
}

export default Home;
