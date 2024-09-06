import React from "react";
import "./contactus.css";
import {
  MdLocationPin,
  MdOutlineCall,
  MdOutlineMailOutline,
} from "react-icons/md";
import { IoIosGlobe } from "react-icons/io";

import logo from "../../assets/logo_without_bg.png";
function ContactUs() {
  return (
    <>
      <div className="contactMain">
        <div className="contactHero">
          Contact Us <br />
          <span className="contactSubHeading">Home &gt; Contact Us</span>
        </div>
      </div>
      <div className="contact">
        <div className="contactLeft">
          {/* Wrap content in a div to manage layering */}
          <div className="contactLeftContent">
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
        <div className="contactRight">
        <span className="addReviewSection">
          <span className="aboutRightFirstHeading">Send Your Messages and feedback</span>
          <form className="responsiveForm">
      {/* Full width name field */}
      <div className="formGroup fullWidth">
        <input type="text" id="name" name="name" placeholder="Type your name" required />
      </div>

      {/* Email and Subject in one line */}
      <div className="formGroup halfWidthContainer">
        <div className="halfWidth">
          <input type="email" id="email" name="email" placeholder="Enter your email" required />
        </div>
        <div className="halfWidth">
          <input type="text" id="subject" name="subject" placeholder="Enter subject" required />
        </div>
      </div>

      {/* Review Text Area */}
      <div className="formGroup fullWidth">
        <textarea id="review" name="review" rows="4" placeholder="Write your review..." required></textarea>
      </div>

      {/* Submit Button */}
      <button type="submit" className="submitButton">Submit</button>
    </form>
          </span>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
