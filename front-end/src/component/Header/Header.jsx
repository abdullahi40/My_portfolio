// Importing React core functions
import React, { useEffect, useState } from "react";

// Importing icons from react-icons library
import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";

// Importing PropTypes for type checking of props
import PropTypes from "prop-types";

// Importing CSS styles specific to Header
import "./Header.css";

// Importing logo image
import Logo from "../../assets/images/logo.png";

// Importing Framer Motion for animations
import { motion, AnimatePresence } from "framer-motion";

// Header component definition
const Header = ({ darkMode, toggleTheme }) => {
  // State to control mobile menu open/close
  const [menuOpen, setMenuOpen] = useState(false);

  // State to show/hide header on scroll
  const [isVisible, setIsVisible] = useState(true);

  // Store previous scroll position
  const [lastScrollY, setLastScrollY] = useState(0);

  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Toggle mobile menu
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Close mobile menu
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    // Function to check token and update login state
    const checkLogin = () => {
      const token = localStorage.getItem("admin-auth");
      setIsLoggedIn(!!token);
    };

    // Run on mount
    checkLogin();

    // Listen for custom login event
    window.addEventListener("login-success", checkLogin);

    // Cleanup event on unmount
    return () => {
      window.removeEventListener("login-success", checkLogin);
    };
  }, []);

  // Listen to scroll events and hide/show header
  useEffect(() => {
    const controlHeader = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false); // hide on scroll down
      } else {
        setIsVisible(true); // show on scroll up
      }
      setLastScrollY(window.scrollY); // update scroll position
    };

    window.addEventListener("scroll", controlHeader);
    return () => window.removeEventListener("scroll", controlHeader);
  }, [lastScrollY]);

  // Handle logout by clearing token and refreshing page
  const logout = () => {
    localStorage.removeItem("admin-auth");
    setIsLoggedIn(false);
    window.location.reload();
  };

  // List of navigation links
  const links = [
    { name: "home", path: "/" },
    { name: "about", path: "#about" },
    { name: "certificates", path: "#certificates" },
    { name: "blog", path: "#blog" },
    { name: "projects", path: "#portfolio-projects" },
    { name: "contact", path: "#contact" },
  ];

  // If user is logged in, add admin and logout links
  if (isLoggedIn) {
    links.push({ name: "admin", path: "/admin" });
    links.push({ name: "logout", path: "/logout", action: logout });
  }

  return (
    // AnimatePresence enables exit animations when the component unmounts
    <AnimatePresence>
      {isVisible && (
        <motion.header
          className="header"
          initial={{ y: -80, opacity: 0 }} // slide from top and fade in
          animate={{ y: 0, opacity: 1 }} // visible position
          exit={{ y: -80, opacity: 0 }} // exit animation
          transition={{ duration: 0.4, ease: "easeInOut" }} // smooth transition
        >
          {/* Logo section */}
          <div className="logo">
            <div className="logo-img">
              {/* Clicking logo scrolls to top */}
              <button
                type="button"
                className="logo-link"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Go to top"
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                <img src={Logo} alt="Logo" />
              </button>
            </div>
            <h2>Abdullahi</h2>
          </div>

          {/* Navigation menu */}
          <nav className={`nav ${menuOpen ? "open" : ""}`}>
            {links.map(({ name, path, action }) => (
              <a
                key={name}
                href={path}
                onClick={(e) => {
                  if (action) {
                    e.preventDefault(); // prevent default navigation
                    action(); // trigger logout
                  } else {
                    closeMenu(); // close menu on link click
                  }
                }}
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </a>
            ))}
          </nav>

          {/* Right-side icons: theme toggle and menu toggle */}
          <div className="right-icons">
            {/* Toggle between light and dark mode */}
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            {/* Toggle mobile menu open/close */}
            <button
              className="menu-icon"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

// Define prop types for the component
Header.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

// Export the Header component
export default Header;
