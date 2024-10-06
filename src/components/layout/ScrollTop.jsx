import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation(); // Get the current path
  
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, [pathname]); // This effect will run every time the route changes (i.e., pathname changes)

  return null; // This component doesn't render anything
};

export default ScrollToTop;
