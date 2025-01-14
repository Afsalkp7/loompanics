import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // useLocation will help identify the current path
import './bottomNav.css';

function BottomNav({ isOpenBottomNav, setIsOpenBottomNav, scrolled }) {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current path
  const [activeItem, setActiveItem] = useState('');

  // Effect to set the active item based on the current location
  useEffect(() => {
    const currentPath = location.pathname;

    switch (currentPath) {
      case '/':
        setActiveItem('HOME');
        break;
      case '/books':
        setActiveItem('BOOKS');
        break;
      case '/about':
        setActiveItem('ABOUT US');
        break;
      case '/contact':
        setActiveItem('CONTACT US');
        break;
      case '/membership':
        setActiveItem('MEMBERSHIP');
        break;
      default:
        setActiveItem('');
    }
  }, [location.pathname]); // Update whenever the path changes

  const handleNavigation = (item, path) => {
    setActiveItem(item);
    if (window.innerWidth < 585) {
      setIsOpenBottomNav(!isOpenBottomNav);
    }
    navigate(path);
  };

  return (
    isOpenBottomNav && (
      <div className={`bottomNav ${scrolled ? 'scrolled' : ''}`}>
        <ul>
          <li
            className={activeItem === 'HOME' ? 'active' : ''}
            onClick={() => handleNavigation('HOME', '/')}
          >
            HOME
          </li>
          <li
            className={activeItem === 'BOOKS' ? 'active' : ''}
            onClick={() => handleNavigation('BOOKS', '/books')}
          >
            BOOKS
          </li>
          <li
            className={activeItem === 'ABOUT US' ? 'active' : ''}
            onClick={() => handleNavigation('ABOUT US', '/about')}
          >
            ABOUT US
          </li>
          <li
            className={activeItem === 'CONTACT US' ? 'active' : ''}
            onClick={() => handleNavigation('CONTACT US', '/contact')}
          >
            CONTACT US
          </li>
          <li
            className={activeItem === 'MEMBERSHIP' ? 'active' : ''}
            onClick={() => handleNavigation('MEMBERSHIP', '/membership')}
          >
            MEMBERSHIP
          </li>
        </ul>
      </div>
    )
  );
}

export default BottomNav;
