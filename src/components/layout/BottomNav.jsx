// BottomNav.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './bottomNav.css';

function BottomNav({ isOpenBottomNav, setIsOpenBottomNav, scrolled }) {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('HOME'); // State to keep track of the active item

  const handleNavigation = (item, path) => {
    setActiveItem(item);
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
