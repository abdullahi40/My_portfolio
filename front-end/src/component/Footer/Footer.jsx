// Importing React
import React from "react";

// Importing component-specific CSS styles
import "./Footer.css";

// Importing Framer Motion for animations
import { motion } from "framer-motion";

// Importing logo image
import Logo from "../../assets/images/logo.png";

// Animation variant for fade-in with upward motion
const fadeInUp = {
  hidden: { opacity: 0, y: 30 }, // initial hidden state
  visible: (i = 0) => ({
    opacity: 1, // final visible state
    y: 0,
    transition: {
      delay: i * 0.1, // staggered animation based on index
      duration: 0.5,
    },
  }),
};

// Footer functional component
const Footer = () => {
  // Get the current year dynamically
  const currentYear = new Date().getFullYear();

  // Navigation links to be shown in the footer
  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "#about" },
    { name: "Blog", path: "#blog" },
    { name: "Projects", path: "#portfolio-projects" },
    { name: "Contact", path: "#contact" },
  ];

  // Return the JSX for the footer section
  return (
    <motion.footer
      className="footer"
      initial="hidden" // animation starts hidden
      whileInView="visible" // becomes visible when in view
      viewport={{ once: true }} // animation runs only once
    >
      {/* Footer main content container */}
      <motion.div className="footer-content" variants={fadeInUp}>
        {/* Left section: logo and brand name */}
        <motion.div className="footer-left" variants={fadeInUp}>
          <div className="logo-f">
            <a href="/#home">
              <img src={Logo} alt="logo" />
            </a>
          </div>
          <div className="brand">Abdullahi</div>
        </motion.div>

        {/* Footer navigation links */}
        <motion.ul className="footer-links">
          {links.map(({ name, path }, index) => (
            <motion.li key={name} custom={index} variants={fadeInUp}>
              <a href={path}>{name}</a>
            </motion.li>
          ))}
        </motion.ul>

        {/* Copyright section */}
        <motion.p className="copyright" variants={fadeInUp}>
          &copy; {currentYear} <strong>Abdullahi</strong> — All rights reserved.
        </motion.p>
      </motion.div>
    </motion.footer>
  );
};

// Exporting the Footer component for use in other parts of the app
export default Footer;
