// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // Get the current location object from React Router
  const { pathname } = useLocation();

  useEffect(() => {
    // When the 'pathname' (route) changes, scroll the window to the top (0, 0)
    window.scrollTo(0, 0);
  }, [pathname]); // Re-run effect whenever the route changes

  // This component doesn't render anything, it just manages a side effect.
  return null;
};

export default ScrollToTop;