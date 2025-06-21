// Import React library
import React from "react";

// Import CSS for styling this component
import "./NotFound.css";

// Import 404 error image
import NotFoundImage from "../../assets/404.png";

// Functional component to display 404 Page Not Found screen
export default function NotFound() {
  return (
    <div className="notfound-container">
      {/* 404 image */}
      <img
        src={NotFoundImage}
        alt="Page Not Found"
        className="notfound-image"
      />

      {/* Text section for the error message */}
      <div className="notfound-text">
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>

        {/* Link to navigate back to homepage */}
        <a href="/" className="home-button">
          Go Home
        </a>
      </div>
    </div>
  );
}
