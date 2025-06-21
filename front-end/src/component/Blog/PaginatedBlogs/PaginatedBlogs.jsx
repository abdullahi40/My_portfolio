// Import useEffect and useState hooks from React
import { useEffect, useState } from "react";

// Import Link for navigation between pages
import { Link } from "react-router-dom";

// Import ReactPaginate for pagination UI
import ReactPaginate from "react-paginate";

// Import a custom loading animation component
import LoadingDots from "../../LoderDots/LoadingDots";

// Import custom CSS styles for this component
import "./PaginatedBlogs.css";

// Import Axios for making HTTP requests
import axios from "axios";
import { API_URL, BLOGS } from "../../Api/Api";

export default function PaginatedBlogs() {
  // State to store all blogs
  const [blogs, setBlogs] = useState([]);

  // State to track loading status
  const [loading, setLoading] = useState(true);

  // State to track current pagination page
  const [currentPage, setCurrentPage] = useState(0);

  // Number of blogs per page
  const blogsPerPage = 6;

  // Fetch blogs when component mounts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Send GET request to fetch blogs using Axios
        const response = await axios.get(`${API_URL}/${BLOGS}`);

        // Sort blogs by date (newest first) and update state
        setBlogs(
          response.data.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          )
        );
      } catch (err) {
        // Log error if fetch fails
        console.error("Failed to fetch blogs:", err);
      } finally {
        // Stop loading once fetch is done
        setLoading(false);
      }
    };

    // Trigger the fetch
    fetchBlogs();
  }, []);

  // Calculate index for slicing current page blogs
  const offset = currentPage * blogsPerPage;

  // Get only the blogs for the current page
  const currentBlogs = blogs.slice(offset, offset + blogsPerPage);

  // Calculate total number of pages
  const pageCount = Math.ceil(blogs.length / blogsPerPage);

  // Handle pagination page change
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Show loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="blogs-loading">
        <h2>Loading Blogs...</h2>
        <LoadingDots />
      </div>
    );
  }

  // Render blog posts and pagination
  return (
    <div className="blogs-wrapper">
      {/* Page header */}
      <div className="blogs-header">
        <h1>Welcome Software Engineering Articles</h1>
      </div>

      {/* Blog cards grid */}
      <div className="blogs-grid">
        {currentBlogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            {/* Each blog card is clickable and links to its detail page */}
            <Link to={`/blog/${blog.slug}`} className="blog-link">
              <img
                src={blog.image_url}
                alt={blog.title}
                className="blog-image"
              />
              <div className="blog-content">
                <h2 className="blog-title">{blog.title}</h2>
                <p className="blog-snippet">
                  {blog.content.length > 100
                    ? blog.content.slice(0, 100) + "..."
                    : blog.content}
                </p>
                <span className="blog-author">By {blog.author}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <ReactPaginate
        previousLabel={"← Prev"} // Label for previous button
        nextLabel={"Next →"} // Label for next button
        breakLabel={"..."} // Label when skipping pages
        pageCount={pageCount} // Total pages
        marginPagesDisplayed={1} // Pages shown on each side of active
        pageRangeDisplayed={2} // How many pages in range to show
        onPageChange={handlePageClick} // Handle page change
        containerClassName={"pagination"} // CSS class for container
        activeClassName={"active-page"} // CSS class for active page
      />
    </div>
  );
}
