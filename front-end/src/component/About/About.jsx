// Importing necessary dependencies
import React from "react";
import Me from "../../assets/HerroSectionImageMe/me-4.png"; // Profile image
import { FaFacebook, FaLinkedin, FaXTwitter, FaStackOverflow, FaGithub, FaWhatsapp } from "react-icons/fa"; // Social media icons
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
              href="https://www.facebook.com/AbdullahiSuleiman44/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={24} />
            </a>

            {/* LinkedIn icon with external link */}
            <a
              href="https://www.linkedin.com/in/abdulllahi-suleiman-5a993037b/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={24} />
            </a>
            
        {/* X icon with external link */}
          <a
          href="https://x.com/ABDULLAHIS85349"
          target="_blank"
          rel="noopener noreferrer">
          <FaXTwitter size={24} />
           </a>
            
        {/* stackoverflow icon with external link */}
            <a
          href="https://stackoverflow.com/users/25478222/abdullahi-suleiman"
          target="_blank"
          rel="noopener noreferrer">
          <FaStackOverflow size={24} />
            </a>

            {/* GitHub icon with external link */}
            <a
              href="https://github.com/abdullahi40"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={24} />
            </a>

            <a
            href="https://wa.me/252905442462"
           target="_blank"
          rel="noopener noreferrer">
         <FaWhatsapp size={24} />
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
      I'm Abdullahi, a Full-Stack, AI, and Web3 Developer specializing in React.js, Node.js, Express.js,
      PostgreSQL, ICP, Motoko, and Local LLM solutions. I build fast, 
      scalable, and modern web applications with a focus on performance, security, and user experience.
          </p>

          {/* Additional experience info */}
          <p>
      With over 3 years of hands-on experience, I have worked on a variety of real-world projects and continue to explore innovative
      technologies that solve business challenges and create meaningful digital experiences.
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
