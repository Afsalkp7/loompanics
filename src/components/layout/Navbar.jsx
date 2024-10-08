import React, { useState, useEffect } from 'react';
import './navbar.css';
import { RiWhatsappFill } from "react-icons/ri";
import { AiFillInstagram } from "react-icons/ai";
import { TiSocialYoutube } from "react-icons/ti";
import { HiBars3 } from "react-icons/hi2";
import { IoCartOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import logo from '../../assets/logo_without_bg.png';
import { useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav';
import { useSelector } from 'react-redux';
import { selectCartItemCount } from '../../redux/cartSlice';

function Navbar() {
  const [isOpenBottomNav, setIsOpenBottomNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cartItemCount = useSelector(selectCartItemCount);
  const [activeItem, setActiveItem] = useState("HOME");
  const navigate = useNavigate();

  // Function to handle navigation and setting the active item
  const handleNavigation = (item, path) => {
    setActiveItem(item);
    navigate(path);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`navbarMain ${scrolled ? 'scrolled' : ''}`}>
        <div className="socialDiv">
          <ul>
            <li><TiSocialYoutube /></li>
            <li><AiFillInstagram /></li>
            <li><RiWhatsappFill /></li>
          </ul>
        </div>
        <div className="logoDiv" onClick={()=>navigate("/")}>
          <img src={logo} alt="Logo" />
          <span>Loompanics</span>
        </div>
        <div className="navListDiv">
          
        </div>
        <div className="navItemDiv">
          <ul>
            <li onClick={()=>navigate("/user")}><CiUser /></li>
            <li className='cart'><IoCartOutline /> <div className="countDiv">{cartItemCount}</div> </li>
            <li onClick={() => setIsOpenBottomNav(!isOpenBottomNav)}><HiBars3 /></li>
          </ul>
        </div>
      </div>
      {isOpenBottomNav && (
        <BottomNav isOpenBottomNav={isOpenBottomNav} setIsOpenBottomNav={setIsOpenBottomNav} scrolled={scrolled}/>
      )}
    </>
  );
}

export default Navbar;
