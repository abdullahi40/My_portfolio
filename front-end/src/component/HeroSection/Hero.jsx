import React from "react";
import "./Hero.css";
import profileImage from "../../assets/HerroSectionImageMe/me-4.png";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="text-content">
          <h1>
            Hello, I’m <span>Abdullahi Suleiman</span>
          </h1>
          <p>
            I’m a UX/UI designer who specializes in creating beautiful and
            functional digital experiences. Let’s build something great together.
          </p>
          <div className="hero-buttons">
            <button className="btn primary">Download CV</button>
            <button className="btn outline">Say Hello</button>
          </div>
          <div className="stats">
            <div>
              <h2>2+</h2>
              <p>Years Experience</p>
            </div>
            <div>
              <h2>10+</h2>
              <p>Completed Projects</p>
            </div>
            <div>
              <h2>4</h2>
              <p>Happy Clients</p>
            </div>
          </div>
        </div>
        <div className="image-content">
          <img src={profileImage} alt="Brooklyn Gilbert" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
