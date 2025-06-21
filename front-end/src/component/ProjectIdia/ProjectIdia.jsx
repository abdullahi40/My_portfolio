// Import React for component creation
import React from "react";

// Import component-specific CSS
import "./ProjectIdia.css";

// Import motion from Framer Motion for animations
import { motion } from "framer-motion";

// Define the ProjectIdia functional component
function ProjectIdia() {
  return (
    // Main container with fade-in and slide-up animation
    <motion.div
      className="project-idia"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.4 }} // Animate once when 40% is in view
    >
      {/* Text content block with scale and fade-in animation */}
      <motion.div
        className="project-idia-container"
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {/* Section heading */}
        <h2>
          Do you have a project idea?
          <br /> Let's discuss your project!
        </h2>

        {/* Description paragraph */}
        <p>
          Every great project starts with a simple idea — and with the right
          team, that idea can grow into something powerful.
          <br /> Let's collaborate to turn your vision into a meaningful digital
          experience that truly stands out.
        </p>
      </motion.div>

      {/* Button container with slide-up and fade-in animation */}
      <motion.div
        className="project-idia-btn"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        {/* Smooth scroll to contact section */}
        <a href="#contact">
          <button className="btn">Let's Work Together →</button>
        </a>
      </motion.div>
    </motion.div>
  );
}

// Export the component for use in other parts of the app
export default ProjectIdia;
