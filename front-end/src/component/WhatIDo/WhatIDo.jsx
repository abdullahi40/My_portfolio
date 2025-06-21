// Import React for building the component
import React from "react";

// Import motion from framer-motion to add animations
import { motion } from "framer-motion";

// Import component-specific CSS styles
import "./WhatIDo.css";

// Array of service objects, each describing a skill or service offered
const services = [
  {
    title: "User Experience (UX)",
    description:
      "I craft seamless digital experiences that prioritize users' needs, emotions, and behaviors—turning complexity into clarity and satisfaction.",
  },
  {
    title: "User Interface (UI)",
    description:
      "I design modern, responsive, and visually appealing interfaces that not only catch the eye but also enhance usability and engagement.",
  },
  {
    title: "Web Development",
    description:
      "I build fast, scalable, and secure websites using the latest technologies—translating creative ideas into real-world, high-performing digital products.",
  },
];

// Animation variants for the service cards with staggered fade and slide-up effect
const cardVariants = {
  hidden: { opacity: 0, y: 50 }, // Initial state: invisible and shifted down
  visible: (i) => ({
    opacity: 1, // Fully visible
    y: 0, // In original position
    transition: { delay: i * 0.3, duration: 0.6, type: "spring" }, // Delay based on index for stagger effect, with spring motion
  }),
};

// Main functional component describing "What I Do"
const WhatIDo = () => {
  return (
    // Animated section container fading in on mount
    <motion.section
      className="what-i-do"
      initial={{ opacity: 0 }} // Start invisible
      animate={{ opacity: 1 }} // Fade in fully
      transition={{ duration: 1 }} // Animation lasts 1 second
    >
      {/* Left side content: heading, description, and button */}
      <motion.div
        className="left"
        initial={{ x: -100, opacity: 0 }} // Start shifted left and invisible
        whileInView={{ x: 0, opacity: 1 }} // Slide in and fade when in viewport
        viewport={{ once: true }} // Animate only once
        transition={{ duration: 0.8 }} // Animation duration
      >
        <h2>What I do?</h2>
        <p>
          I specialize in building digital solutions that not only look great
          but also function smoothly. Whether it's crafting elegant interfaces
          or building full-stack applications, I combine design thinking with
          code to create user-centered experiences.
        </p>
        <p>
          Passionate about solving problems through technology, I bring
          creativity, performance, and scalability to every project I work on.
        </p>

        {/* Animated button with scale effect on hover and tap */}
        <motion.button
          className="say-hello-btn"
          whileHover={{ scale: 1.1 }} // Slightly enlarge on hover
          whileTap={{ scale: 0.95 }} // Slightly shrink on tap/click
        >
          Say Hello!
        </motion.button>
      </motion.div>

      {/* Right side: service cards with animations */}
      <div className="right">
        {services.map((service, index) => (
          <motion.div
            key={service.title} // Unique key for each card
            className={`card ${index === 0 ? "active" : ""}`} // Add 'active' class to first card
            custom={index} // Pass index to control animation delay
            initial="hidden" // Start hidden
            whileInView="visible" // Animate visible on scroll into view
            viewport={{ once: true }} // Animate only once
            variants={cardVariants} // Use defined card animation variants
            whileHover={{ scale: 1.05 }} // Slightly enlarge card on hover
          >
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

// Export the component so it can be used elsewhere
export default WhatIDo;
