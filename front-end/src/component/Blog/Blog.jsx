import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import axios from "axios"; // ✅ Axios for HTTP requests
import "swiper/css";
import "swiper/css/pagination";
import "./Blog.css";
import LoadingDots from "../LoderDots/LoadingDots";
import { API_URL, BLOGS } from "../Api/Api";

export default function Blog() {
  // State to store the list of blogs
  const [blogs, setBlogs] = useState([]);

  // State to track loading status
  const [loading, setLoading] = useState(true);

  // Fetch blogs when component mounts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Send GET request using axios
        const response = await axios.get(`${API_URL}/${BLOGS}`);
        const data = response.data;

        // Check if the response data is an array
        if (Array.isArray(data)) {
          const latestBlogs = data
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 10);
          setBlogs(latestBlogs);
        } else {
          console.error("API response is not an array:", data);
          setBlogs([]); // set empty in case of error
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false); // Stop loading state
      }
    };

    fetchBlogs();
  }, []);

  // Show loading screen while data is being fetched
  if (loading) {
    return (
      <div className="blog-section">
        <div className="blog-container">
          <h2 className="blog-title">Loading Blogs</h2>
          <LoadingDots />
        </div>
      </div>
    );
  }

  // Main return with blog content
  return (
    <motion.div
      className="blog-section"
      id="blog"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="blog-container">
        {/* Blog section title */}
        <motion.h1
          className="blog-title"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Latest Blogs
        </motion.h1>

        {/* Blog subtitle */}
        <motion.p
          className="blog-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Check out our latest articles and tutorials.
        </motion.p>

        {/* Swiper carousel for blog posts */}
        <Swiper
          spaceBetween={30}
          pagination={{ clickable: true }}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          modules={[Autoplay, Pagination]}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {/* Loop through each blog and display it */}
          <>
            {blogs.map((blog, index) => (
              <SwiperSlide key={blog.id || index}>
                <div className="blog-card">
                  <Link to={`/blog/${blog.slug}`} className="blog-card-link">
                    {/* Blog Image */}
                    <div className="blog-card-image">
                      <img
                        src={blog.image_url || "default.jpg"}
                        alt={blog.title || "Blog"}
                      />
                    </div>
                    {/* Blog Content */}
                    <div className="blog-card-content">
                      <h2>
                        {blog.title?.length > 20
                          ? `${blog.title.substring(0, 20)}...`
                          : blog.title}
                      </h2>
                      <p>
                        {blog.content?.length > 100
                          ? `${blog.content.substring(0, 100)}...`
                          : blog.content}
                      </p>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </>
        </Swiper>

        {/* Link to view all blogs */}
        <Link to={"/blogs"} className="blog-link">
          <motion.button
            className="blog-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All Blogs
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}
