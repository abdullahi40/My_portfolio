// Importing React Router's hook to get the slug from URL parameters
import { useParams } from "react-router-dom";

// Importing React hooks for state management and side effects
import { useEffect, useState } from "react";

// Importing ReactMarkdown to render markdown content
import ReactMarkdown from "react-markdown";

// Importing custom CSS styles for the blog detail page
import "./BlogDetail.css";

// Importing Footer component to show at the bottom of the page
import Footer from "../../Footer/Footer";

// Importing a loading animation component
import LoadingDots from "../../LoderDots/LoadingDots";

// Importing Axios for making HTTP requests
import axios from "axios";

// This is the API URL for fetching blog data
import { API_URL, BLOGS } from "../../Api/Api";

export default function BlogDetail() {
  // Get the blog slug from the route URL
  const { slug } = useParams();

  // State to store blog data
  const [blog, setBlog] = useState(null);

  // State to track loading status
  const [loading, setLoading] = useState(true);

  // useEffect to fetch blog data when component mounts or slug changes
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // Send GET request using Axios to fetch the blog by slug
        const res = await axios.get(`${API_URL}/${BLOGS}/${slug}`);

        // Store the blog data in state
        setBlog(res.data);
      } catch (err) {
        // Log error if request fails
        console.error("Error fetching blog details:", err);
      } finally {
        // Stop loading once request completes
        setLoading(false);
      }
    };

    // Fetch only if slug is present
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  // Show loading UI while blog is being fetched
  if (loading) {
    return (
      <div className="blog-detail-loading">
        <h2 className="loading-text">Loading Blog</h2>
        <LoadingDots />
      </div>
    );
  }

  // Show error message if blog is not found
  if (!blog) {
    return (
      <div className="blog-detail-loading">
        <h2 className="loading-text">Blog not found</h2>
      </div>
    );
  }

  // Render the blog detail content
  return (
    <>
      <div className="blog-detail-container">
        <div className="blog-detail-content">
          {/* Blog title */}
          <h1 className="blog-detail-title">{blog.title}</h1>

          {/* Blog image */}
          <img
            src={blog.image_url}
            alt={blog.title}
            className="blog-detail-image"
          />

          {/* Blog author */}
          <p>
            by: <strong>{blog.author}</strong>
          </p>
          {/* Blog creation and update date */}
          <p style={{ color: "rgba(255, 255, 255, 0.8)" }}>
            {blog.created_at === blog.updated_at ? (
              <span>
                Published on:{" "}
                <strong>
                  {new Date(blog.created_at).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </strong>
              </span>
            ) : (
              <span>
                Last updated:{" "}
                <strong>
                  {new Date(blog.updated_at).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </strong>
              </span>
            )}
          </p>

          {/* Blog content in markdown format */}
          <div className="blog-detail-text">
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </div>
        </div>
      </div>

      {/* Footer component */}
      <Footer />
    </>
  );
}
