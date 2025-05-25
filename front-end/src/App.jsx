import "./App.css";
import React, { useEffect, useState } from "react";
import Headers from "./component/Header/Header.jsx";
import Hero from "./component/HeroSection/Hero.jsx";
import About from "./component/About/About.jsx";
import WorkProcess from "./component/WorkProcess/workProcess.jsx";
import Portfolio from "./component/Portfolio/Portfolio.jsx";
import ProjectIdia from "./component/ProjectIdia/ProjectIdia.jsx";
import Blog from "./component/Blog/Blog.jsx";
import WhatIDo from "./component/WhatIDo/WhatIDo.jsx";
import TestimonialSection from "./component/TestimonialSection/TestimonialSection.jsx";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className="App">
      <Headers darkMode={darkMode} toggleTheme={toggleTheme} />
      <Hero />
      <About />
      <WorkProcess />
      <Portfolio />
      <ProjectIdia />
      <Blog />
      <WhatIDo />
      <TestimonialSection />
    </div>
  );
}

export default App;
