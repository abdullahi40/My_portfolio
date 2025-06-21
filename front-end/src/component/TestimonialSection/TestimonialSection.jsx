// Import React to create the component
import React from "react";

// Import motion for animation support from Framer Motion
import { motion } from "framer-motion";

// Import component-specific CSS styles
import "./TestimonialSection.css";

// Import client logo images
import GoogleImg from "../../assets/Testmonial/google.png";
import DribbbleImg from "../../assets/Testmonial/dribbble.png";
import LinkedInImg from "../../assets/Testmonial/linkedin.png";
import AmazonImg from "../../assets/Testmonial/amazon.png";
import MediumImg from "../../assets/Testmonial/medium.png";
import SpotifyImg from "../../assets/Testmonial/spotify.png";

// Array of client logos to be displayed
const clientLogos = [
  GoogleImg,
  DribbbleImg,
  LinkedInImg,
  AmazonImg,
  MediumImg,
  SpotifyImg,
];

// Animation variants for the client logos with staggered fade-in and slide-up effect
const logoVariants = {
  hidden: { opacity: 0, y: 30 }, // Initial state: invisible and shifted down
  visible: (i) => ({
    opacity: 1, // Fully visible
    y: 0, // In place
    transition: {
      delay: i * 0.15, // Stagger animations by index
      duration: 0.6, // Duration of animation
      type: "spring", // Spring animation for natural motion
    },
  }),
};

// Main TestimonialSection functional component
const TestimonialSection = () => {
  return (
    // Animated section container with fade-in when in viewport
    <motion.section
      className="testimonial-wrapper"
      initial="hidden" // Start hidden
      whileInView="visible" // Show when in viewport
      viewport={{ once: true }} // Animate only once
      style={{ overflow: "hidden" }} // Hide overflow during animation
    >
      {/* Clients section with slide-in from left and fade-in */}
      <motion.div
        className="clients"
        initial={{ x: -80, opacity: 0 }} // Start off to the left and invisible
        whileInView={{ x: 0, opacity: 1 }} // Slide to place and fade in
        viewport={{ once: true }}
        transition={{ duration: 0.8 }} // Animation duration
      >
        <h2>Happy Clients</h2>
        <p>
          While I’m still early in my freelance journey, I’ve crafted several
          professional-grade projects as part of my portfolio. My focus is on
          delivering real value, attention to detail, and a user-first
          experience — qualities I plan to bring to every future collaboration.
        </p>

        {/* Client logos displayed with individual animations */}
        <div className="logos">
          {clientLogos.map((logo, index) => (
            <motion.img
              key={logo} // Unique key for each logo
              src={logo} // Image source
              alt={`Client logo ${index + 1}`} // Accessibility alt text
              className="client-logo"
              custom={index} // Pass index for stagger animation
              variants={logoVariants} // Use defined animation variants
            />
          ))}
        </div>
      </motion.div>

      {/* Testimonial text block with slide-in from right */}
      <motion.div
        className="testimonial"
        initial={{ x: 80, opacity: 0 }} // Start off to the right and invisible
        whileInView={{ x: 0, opacity: 1 }} // Slide to place and fade in
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }} // Slight delay for stagger effect
      >
        <h2>Testimonial</h2>
        <p>
          Here’s a sample testimonial reflecting the experience I aim to provide
          every client: clear communication, quality work, and on-time delivery.
        </p>

        {/* Actual testimonial quote */}
        <blockquote>
          “Working with Abdullahi feels like working with a seasoned pro. His
          passion, consistency, and eye for design stand out in every project.
          I’m confident that he’s going places.”
        </blockquote>

        {/* Author details for the testimonial */}
        <div className="author">
          <strong>Sample Client</strong>
          <span>Freelance Project Reference</span>
        </div>

        {/* Pagination dots for testimonial slider (if multiple testimonials added later) */}
        <motion.div
          className="dot_s"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <span className="dot- active"></span>
          <span className="dott"></span>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

// Export the component for use in the app
export default TestimonialSection;
