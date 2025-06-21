// LoadingDots.jsx
import React from "react";
import "./LoadingDots.css"; // CSS-keena waa mid gaar ah

const LoadingDots = () => {
  return (
    // this div contains three dots that will animate to create a loading effect
    <div className="dots-loading">
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </div>
  );
};

export default LoadingDots;
