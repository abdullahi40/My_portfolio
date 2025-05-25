import React from "react";
import "./Portfolio.css";
import { portfolioData } from "./ProjectDetails.jsx";
// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const Portfolio = () => {
  return (
    <section className="portfolio-section">
      <div className="portfolio-header">
        <h2>Portfolio</h2>
        <p>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration.
        </p>
      </div>

      <div className="portfolio-grid">
        {portfolioData.map((item) => (
          <div className="portfolio-card" key={item.id}>
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={10}
              slidesPerView={1}
            >
              {item.images.map((img) => (
                <SwiperSlide key={img}>
                  <img src={img} alt={`${item.title}`} />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="portfolio-card-body">
              <h4>{item.title}</h4>
              <p>
                Various selected clients work from the creative portfolio
                section.
              </p>
              <button className="case-study-btn">Case Study</button>
            </div>
          </div>
        ))}
      </div>

      <div className="portfolio-footer">
        <button className="more-projects-btn">More Projects</button>
      </div>
    </section>
  );
};
export default Portfolio;
