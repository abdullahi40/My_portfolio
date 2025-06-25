import React from "react";
import "./Portfolio.css";
import { portfolioData } from "./ProjectDetails.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: index * 0.1,
      ease: "easeOut",
    },
  }),
};

const Portfolio = () => {
  return (
    <section className="portfolio-section" id="portfolio-projects">
      <div className="portfolio-header">
        <h2>Portfolio</h2>
        <p>
          Explore a collection of my featured projects — from modern UI to
          full-stack apps.
        </p>
      </div>

      <div className="portfolio-grid">
        {portfolioData.map((item, index) => (
          <motion.div
            className="portfolio-card"
            key={item.id}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={variants}
          >
            <Link
              to={`/portfolio/${item.id}`}
              style={{ color: "#fff", textDecoration: "none" }}
            >
              <Swiper spaceBetween={10} slidesPerView={1}>
                {item.images.map((img) => (
                  <SwiperSlide key={img}>
                    <img src={img} alt={item.title} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Link>

            <div className="portfolio-card-body">
              <Link
                to={`/portfolio/${item.id}`}
                style={{ color: "#fff", textDecoration: "none" }}
              >
                <h4>{item.title}</h4>
                <p className="description">
                  {item.description.length > 80
                    ? item.description.slice(0, 80) + "..."
                    : item.description}
                </p>
              </Link>

              <button className="case-study-btn">
                {item.link === "no Link" ? (
                  <Link
                    to={`/portfolio/${item.id}`}
                    style={{ color: "#000", textDecoration: "none" }}
                  >
                    no demo
                  </Link>
                ) : (
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
        ))}
      </div>

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

export default Portfolio;
