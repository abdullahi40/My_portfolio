// Import core React functionality
import React from "react";

// Import CSS styles specific to Portfolio
import "./Portfolio.css";

// Import the project data array
import { portfolioData } from "./ProjectDetails.jsx";

// Import Swiper components for carousel functionality
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import Swiper modules for navigation and pagination
import { Navigation, Pagination } from "swiper/modules";

// Import Framer Motion for animation effects
import { motion } from "framer-motion";

// Import Link for internal navigation (React Router)
import { Link } from "react-router-dom";

// Animation variants for card entry from different directions
const variants = {
  hidden: (direction) => {
    // Define initial position based on direction
    switch (direction) {
      case "left":
        return { opacity: 0, x: -100, scale: 0.5 };
      case "right":
        return { opacity: 0, x: 100, scale: 0.5 };
      case "up":
        return { opacity: 0, y: 100, scale: 0.5 };
      case "down":
        return { opacity: 0, y: -100, scale: 0.5 };
      default:
        return { opacity: 0, y: 30, scale: 0.5 };
    }
  },
  visible: ([direction, index]) => ({
    // Final visible state with smooth transition
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: "easeInOut",
      delay: index * 0.3,
    },
  }),
};

// Directions used to animate cards in sequence
const directions = ["left", "right", "up", "down"];

// Portfolio component
const Portfolio = () => {
  return (
    <section className="portfolio-section" id="portfolio-projects">
      {/* Section Header */}
      <div className="portfolio-header">
        <h2>Portfolio</h2>
        <p>
          Here you’ll find a collection of my featured projects, each carefully
          designed and developed to solve real-world problems.
          <br />
          From modern UI designs to fully functional full-stack applications,
          explore the work that showcases my skills and passion for building
          great digital experiences.
        </p>
      </div>

      {/* Portfolio project cards in a grid layout */}
      <div className="portfolio-grid">
        {portfolioData.map((item, index) => {
          // Determine animation direction based on index
          const direction = directions[index % directions.length];

          return (
            <motion.div
              className="portfolio-card"
              key={item.id}
              custom={[direction, index]} // pass custom props to animation
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={variants}
            >
              {/* Clicking the image swiper navigates to project detail page */}
              <Link
                to={`/portfolio/${item.id}`}
                style={{ color: "#fff", textDecoration: "none" }}
              >
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation
                  pagination={{ clickable: true }}
                  spaceBetween={10}
                  slidesPerView={1}
                >
                  {/* Render project images in a Swiper carousel */}
                  {item.images.map((img) => (
                    <SwiperSlide key={img}>
                      <img src={img} alt={`${item.title}`} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Link>

              {/* Project title, short description, and demo button */}
              <div className="portfolio-card-body">
                <Link
                  to={`/portfolio/${item.id}`}
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  <h4>{item.title}</h4>
                  <p className="description">
                    {/* Trim long descriptions to 80 characters */}
                    {item.description.length > 80
                      ? item.description.slice(0, 80) + "..."
                      : item.description}
                  </p>
                </Link>

                {/* Button to external live demo or fallback to detail page */}
                <button className="case-study-btn">
                  {item.link === "no Link" ? (
                    // If no live link, navigate to details page
                    <Link
                      to={`/portfolio/${item.id}`}
                      style={{ color: "#000", textDecoration: "none" }}
                    >
                      no demo
                    </Link>
                  ) : (
                    // If live link exists, open it in a new tab
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#000", textDecoration: "none" }}
                    >
                      Live Demo
                    </a>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Button to view more projects on GitHub */}
      <div className="portfolio-footer">
        <a
          href="https://github.com/abdullahi40"
          target="_blank"
          rel="noreferrer"
        >
          <button className="case-study-btn">More Projects</button>
        </a>
      </div>
    </section>
  );
};

// Export the Portfolio component
export default Portfolio;
