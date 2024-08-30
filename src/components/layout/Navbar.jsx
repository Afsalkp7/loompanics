import React, { useState } from 'react';
import './navbar.css';
import { RiWhatsappFill } from "react-icons/ri";
import { AiFillInstagram } from "react-icons/ai";
import { TiSocialYoutube } from "react-icons/ti";
import { HiBars3 } from "react-icons/hi2";
import { IoCartOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";

import logo from '../../assets/logo_without_bg.png'
function Navbar() {
    const [isOpenBottomNav,setIsOpenBottomNav] = useState(false)
  return (
    <>
    <div className="navbarMain">
        <div className="socialDiv">
            <ul>
                <li><TiSocialYoutube /></li>
                <li><AiFillInstagram /></li>
                <li><RiWhatsappFill /></li>
            </ul>
        </div>
        <div className="logoDiv">
            <img src={logo} />
            <span>Loompanics</span>
        </div>
        <div className="navListDiv">
        {/* <ul>
          <li>HOME</li>
          <li>BOOKS</li>
          <li>ABOUT US</li>
          <li>CONTACT US</li>
          <li>MEMBERSHIP</li>
        </ul> */}
        </div>
        <div className="navItemDiv">
            <ul>
                <li><CiSearch /></li>
                <li><IoCartOutline /></li>
                <li onClick={()=>setIsOpenBottomNav(!isOpenBottomNav)}><HiBars3 /></li>
            </ul>
        </div>
    </div>
    {isOpenBottomNav&&(
        <div className='bottonNav'>
    <ul>
          <li>HOME</li>
          <li>BOOKS</li>
          <li>ABOUT US</li>
          <li>CONTACT US</li>
          <li>MEMBERSHIP</li>
        </ul>
    </div>
    )}
    
    </>
  );
}

export default Navbar;
