// Import core React functionality
import React from "react";

// Import CSS styles specific to portfolio details page
import "./portfolioDetails.css";

// Import useParams to extract URL parameters
import { useParams } from "react-router-dom";

// Import project data source
import { portfolioData } from "../ProjectDetails";

// Import Swiper carousel and modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Define the PortfolioDetails component
const PortfolioDetails = () => {
  // Extract the 'id' parameter from the URL
  const { id } = useParams();

  // Find the project in the data array that matches the ID
  const project = portfolioData.find((item) => item.id.toString() === id);

  // If project not found, return error message
  if (!project) {
    return <div className="portfolio-details">Project not found.</div>;
  }

  return (
    <div className="portfolio-details">
      {/* Project title */}
      <h2 className="title">{project.title}</h2>

      {/* Swiper image carousel for project screenshots */}
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={1}
        className="project-swiper"
      >
        {/* Loop through images and display them in slides */}
        {project.images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img src={img} alt={`Slide ${idx + 1}`} className="project-image" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Description and demo link section */}
      <div className="details-body">
        {/* Show project description or fallback message */}
        <p>
          {project.description || "No description available for this project."}
        </p>

        {/* Display Live Demo button if available, else message */}
        <button className="case-study-btn">
          {project.link === "no Link" ? (
            <span>No demo available</span>
          ) : (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#000", textDecoration: "none" }}
            >
              Live Demo
            </a>
          )}
        </button>
      </div>
    </div>
  );
};

// Export the component for external use
export default PortfolioDetails;
