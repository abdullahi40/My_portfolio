// Import main CSS file for global styles
import "./App.css";

// Import React and required hooks
import React, { useEffect, useState } from "react";

// Import routing utilities from react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import all page and component files
import Headers from "./component/Header/Header.jsx";
import Hero from "./component/HeroSection/Hero.jsx";
import About from "./component/About/About.jsx";
import WorkProcess from "./component/WorkProcess/workProcess.jsx";
import Portfolio from "./component/Portfolio/Portfolio.jsx";
import PortfolioDetails from "./component/Portfolio/PortfolioDetails/portfolioDetails.jsx";
import ProjectIdia from "./component/ProjectIdia/ProjectIdia.jsx";
import Blog from "./component/Blog/Blog.jsx";
import WhatIDo from "./component/WhatIDo/WhatIDo.jsx";
import TestimonialSection from "./component/TestimonialSection/TestimonialSection.jsx";
import ContactSection from "./component/ContactSection/ContactSection.jsx";
import Footer from "./component/Footer/Footer.jsx";
import BlogDetail from "./component/Blog/BlogDetails/BlogDetail.jsx";
import PaginatedBlogs from "./component/Blog/PaginatedBlogs/PaginatedBlogs.jsx";

// Admin Panel Components
import Sidebar from "./component/AdminBlog/Sidebar/Sidebar.jsx";
import AdminDashboard from "./component/AdminBlog/AdminDashboard/AdminDashboard.jsx";
import EditBlog from "./component/AdminBlog/EditBlog/EditBlog.jsx";
import CreateBlog from "./component/AdminBlog/CreateBlog/CreateBlog.jsx";
import AdminLogin from "./component/AdminBlog/AdminPassword/AdminLogin.jsx";
import PrivateRoute from "./component/AdminBlog/AdminPassword/PrivateRoute .jsx";

// 404 Page
import NotFound from "./component/404 eror/NotFound.jsx";

function App() {
  // Manage dark mode state from localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  // Apply theme based on darkMode state
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Function to toggle dark/light theme
  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    // Wrap the entire app in a router for page navigation
    <Router>
      <div className="App">
        {/* Header with theme toggle functionality */}
        <Headers darkMode={darkMode} toggleTheme={toggleTheme} />

        {/* Define all route paths */}
        <Routes>
          {/* Home Page Route: Shows all main sections */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <About />
                <WorkProcess />
                <Portfolio />
                <ProjectIdia />
                <Blog />
                <WhatIDo />
                <TestimonialSection />
                <ContactSection />
                <Footer />
              </>
            }
          />

          {/* Portfolio project detail page */}
          <Route path="/portfolio/:id" element={<PortfolioDetails />} />

          {/* Single blog post by slug */}
          <Route path="/blog/:slug" element={<BlogDetail />} />

          {/* Paginated blog list page */}
          <Route path="/blogs" element={<PaginatedBlogs />} />

          {/* Public route for admin login page */}
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* Protected admin routes */}
          <Route path="/admin" element={<PrivateRoute />}>
            <Route path="" element={<Sidebar />}>
              <Route path="blogs" element={<AdminDashboard />} />
              <Route path="edit/:slug" element={<EditBlog />} />
              <Route path="blog/create" element={<CreateBlog />} />
            </Route>
          </Route>

          {/* 404 Not Found route for all unknown paths */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

// Export the App component as the default export
export default App;
