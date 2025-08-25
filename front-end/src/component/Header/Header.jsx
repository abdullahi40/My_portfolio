import React, { useEffect, useState, useRef } from "react";
import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import PropTypes from "prop-types";
import "./Header.css";
import Logo from "../../assets/images/logo.png";
import { motion, AnimatePresence } from "framer-motion";

const Header = ({ darkMode, toggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Toggle mobile menu
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Close mobile menu
  const closeMenu = () => setMenuOpen(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  // Check login status
  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("admin-auth");
      setIsLoggedIn(!!token);
    };
    checkLogin();
    window.addEventListener("login-success", checkLogin);
    return () => window.removeEventListener("login-success", checkLogin);
  }, []);

  // Hide/show header on scroll (optimized)
  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    const throttledControl = throttle(controlHeader, 100); // 100ms throttle
    window.addEventListener("scroll", throttledControl);
    return () => window.removeEventListener("scroll", throttledControl);
  }, []);

  // Logout function
  const logout = () => {
    localStorage.removeItem("admin-auth");
    setIsLoggedIn(false);
    window.location.reload();
  };

  const links = [
    { name: "home", path: "/" },
    { name: "about", path: "#about" },
    { name: "certificates", path: "#certificates" },
    { name: "blog", path: "#blog" },
    { name: "projects", path: "#portfolio-projects" },
    { name: "contact", path: "#contact" },
  ];

  if (isLoggedIn) {
    links.push({ name: "admin", path: "/admin" });
    links.push({ name: "logout", path: "/logout", action: logout });
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          className="header"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <div className="logo">
            <div className="logo-img">
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

          <nav className={`nav ${menuOpen ? "open" : ""}`}>
            {links.map(({ name, path, action }) => (
              <a
                key={name}
                href={path}
                onClick={(e) => {
                  if (action) {
                    e.preventDefault();
                    action();
                  } else {
                    closeMenu();
                  }
                }}
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </a>
            ))}
          </nav>

          <div className="right-icons">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

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

// Prop types
Header.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

// Throttle function to limit scroll events
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function (...args) {
    const context = this;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

export default Header;
