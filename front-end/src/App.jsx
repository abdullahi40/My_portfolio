import "./App.css";
import React, { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Header must load early (no lazy)
import Headers from "./component/Header/Header.jsx";
import Footer from "./component/Footer/Footer.jsx";
import LoadingDots from "./component/LoderDots/LoadingDots.jsx";
import Certificates from "./component/Certificates/Certificates.jsx";

// Lazy load all heavy sections and pages
const Hero = lazy(() => import("./component/HeroSection/Hero.jsx"));
const About = lazy(() => import("./component/About/About.jsx"));
const WorkProcess = lazy(() =>
  import("./component/WorkProcess/workProcess.jsx")
);
const Portfolio = lazy(() => import("./component/Portfolio/Portfolio.jsx"));
const ProjectIdia = lazy(() =>
  import("./component/ProjectIdia/ProjectIdia.jsx")
);
const Blog = lazy(() => import("./component/Blog/Blog.jsx"));
const WhatIDo = lazy(() => import("./component/WhatIDo/WhatIDo.jsx"));
const TestimonialSection = lazy(() =>
  import("./component/TestimonialSection/TestimonialSection.jsx")
);
const ContactSection = lazy(() =>
  import("./component/ContactSection/ContactSection.jsx")
);
const PortfolioDetails = lazy(() =>
  import("./component/Portfolio/PortfolioDetails/portfolioDetails.jsx")
);
const BlogDetail = lazy(() =>
  import("./component/Blog/BlogDetails/BlogDetail.jsx")
);
const PaginatedBlogs = lazy(() =>
  import("./component/Blog/PaginatedBlogs/PaginatedBlogs.jsx")
);
const SideBar = lazy(() => import("./component/AdminBlog/Sidebar/Sidebar.jsx"));
const AdminDashboard = lazy(() =>
  import("./component/AdminBlog/AdminDashboard/AdminDashboard.jsx")
);
const EditBlog = lazy(() =>
  import("./component/AdminBlog/EditBlog/EditBlog.jsx")
);
const CreateBlog = lazy(() =>
  import("./component/AdminBlog/CreateBlog/CreateBlog.jsx")
);
const AdminLogin = lazy(() =>
  import("./component/AdminBlog/AdminPassword/AdminLogin.jsx")
);
const PrivateRoute = lazy(() =>
  import("./component/AdminBlog/AdminPassword/PrivateRoute .jsx")
);
const NotFound = lazy(() => import("./component/404 eror/NotFound.jsx"));

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    // Default: dark mode if no theme is saved
    if (!savedTheme) {
      localStorage.setItem("theme", "dark");
      return true;
    }

    return savedTheme === "dark";
  });

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <Router>
      <div className="App">
        <Headers darkMode={darkMode} toggleTheme={toggleTheme} />

        {/* Lazy loading fallback UI */}
        <Suspense fallback={<div className="loading">Loading...</div>} />
        <Suspense fallback={<LoadingDots />}>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<LoadingDots />}>
                  <Hero />
                  <About />
                  <Certificates />
                  <WorkProcess />
                  <Portfolio />
                  <ProjectIdia />
                  <Blog />
                  <WhatIDo />
                  <TestimonialSection />
                  <ContactSection />
                  <Footer />
                </Suspense>
              }
            />

            <Route path="/portfolio/:id" element={<PortfolioDetails />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/blogs" element={<PaginatedBlogs />} />
            <Route path="/admin-login" element={<AdminLogin />} />

            <Route path="/admin" element={<PrivateRoute />}>
              <Route path="" element={<SideBar />}>
                <Route path="blogs" element={<AdminDashboard />} />
                <Route path="edit/:slug" element={<EditBlog />} />
                <Route path="blog/create" element={<CreateBlog />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
