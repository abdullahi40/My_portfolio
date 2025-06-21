// Importing necessary dependencies
import React from "react";
import Me from "../../assets/HerroSectionImageMe/me-4.png"; // Profile image
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa"; // Social media icons
import "./About.css"; // Custom CSS for styling
import { motion } from "framer-motion"; // For animations

// About component definition
export default function About() {
  return (
    <section className="about" id="about">
      {/* Main container for About section */}
      <div className="about-content" style={{ overflow: "hidden" }}>
        {/* Left section: Image and social icons */}
        <motion.div
          className="about-img-wrapper"
          initial={{ x: -100, opacity: 0 }} // Start animation: slide from left
          whileInView={{ x: 0, opacity: 1 }} // End animation: to position
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Profile image */}
          <div className="about-img">
            <img src={Me} alt="Abdullahi Suleiman" />
          </div>

          {/* Animated social media icons */}
          <motion.div
            className="about-icons"
            initial={{ scale: 0 }} // Start: hidden
            whileInView={{ scale: 1 }} // Scale up when in view
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {/* Facebook icon with external link */}
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={24} />
            </a>

            {/* LinkedIn icon with external link */}
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={24} />
            </a>

            {/* GitHub icon with external link */}
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={24} />
            </a>
          </motion.div>
        </motion.div>

        {/* Right section: Text content */}
        <motion.div
          className="about-text"
          initial={{ x: 100, opacity: 0 }} // Start animation: slide from right
          whileInView={{ x: 0, opacity: 1 }} // Animate to center
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Section heading */}
          <h1>About Me</h1>

          {/* Description paragraph */}
          <p>
            I'm <strong>Abdullahi</strong>, a Full-Stack JavaScript Developer
            who builds fast and responsive web apps using{" "}
            <strong>React.js</strong>, <strong>Node.js</strong>,{" "}
            <strong>Express</strong>, and <strong>PostgreSQL</strong>. I enjoy
            crafting sleek UIs and robust backends with tools like{" "}
            <strong>Tailwind CSS</strong>, <strong>Vite</strong>, and{" "}
            <strong>Git</strong>. I'm currently working on real-world projects
            and open to freelance or remote opportunities.
          </p>

          {/* Additional experience info */}
          <p>
            With over 2 years of experience in the field, I have worked on a
            variety of projects...
          </p>

          {/* Buttons for Projects and Contact */}
          <motion.div
            className="about-btns"
            initial={{ y: 20, opacity: 0 }} // Start below and fade in
            whileInView={{ y: 0, opacity: 1 }} // Slide into view
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            {/* Button to scroll to portfolio projects */}
            <a href="#portfolio-projects" className="btn primary">
              My Projects
            </a>

            {/* Button to send email */}
            <a
              href="mailto:abdullahisuleiman6683@gmail.com?subject=Hello%20Abdullahi&body=I%20just%20wanted%20to%20say%20hi!"
              className="btn outline"
            >
              Say Hello
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
