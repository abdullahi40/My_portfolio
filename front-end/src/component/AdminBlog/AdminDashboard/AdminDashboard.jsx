// Importing necessary modules and libraries
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";
import ReactPaginate from "react-paginate";
import { Axios } from "../Axios/Axios";
import { BLOGS, DELETE_BLOG, EDIT_BLOG } from "../../Api/Api";

export default function AdminDashboard() {
  // State variables to store blog data, loading status, and pagination
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const blogsPerPage = 6; // Number of blogs to show per page

  // Fetch blogs from API when component mounts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // GET request to fetch all blogs
        const response = await Axios.get(`/${BLOGS}`);
        const data = await response.data; // Use .data instead of .json() when using Axios

        // Sort blogs by creation date (newest first)
        setBlogs(
          data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        );
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false); // Stop loading when request finishes
      }
    };

    fetchBlogs(); // Call the function
  }, []);

  // Calculate pagination data
  const offset = currentPage * blogsPerPage;
  const currentBlogs = blogs.slice(offset, offset + blogsPerPage);
  const pageCount = Math.ceil(blogs.length / blogsPerPage);

  // Handle pagination page click
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected); // Set the new page
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
  };

  // Delete blog by ID
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      `Are you sure you want to delete this blog?\nBlog ID: ${id}\nSlug: ${
        blogs.find((blog) => blog.id === id)?.slug
      }`
    );
    if (!confirm) return;

    try {
      // DELETE request to API
      await Axios.delete(`${DELETE_BLOG}/${id}`);
      // Remove the deleted blog from state
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (err) {
      console.error("Failed to delete blog:", err);
    }
  };

  // Show loading text if data is still loading
  if (loading) {
    return <h2 className="admin-loading">Loading blogs...</h2>;
  }

  return (
    <div className="blogs-wrapper">
      <div className="blogs-header">
        {/* Admin section heading */}
        <h1>Admin Panel - Manage Blogs</h1>
      </div>

      <div className="blogs-grid">
        {/* Loop through current page blogs and display each blog card */}
        {currentBlogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            {/* Link to the blog detail page */}
            <Link to={`/blog/${blog.slug}`} className="blog-link">
              <img
                src={blog.image_url}
                alt={blog.title}
                className="blog-image"
              />
              <div className="blog-content">
                <h2 className="blog-title">{blog.title}</h2>
                {/* Show short preview of the blog content */}
                <p className="blog-snippet">
                  {blog.content.length > 100
                    ? blog.content.slice(0, 100) + "..."
                    : blog.content}
                </p>
                <span className="blog-author">By {blog.author}</span>
              </div>
            </Link>

            {/* Action buttons for edit and delete */}
            <div className="blog-actions">
              {/* Link to edit page for the blog */}
              <Link to={`/${EDIT_BLOG}/${blog.slug}`} className="edit-btn">
                Edit
              </Link>

              {/* Delete button */}
              <button
                onClick={() => handleDelete(blog.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination component */}
      <ReactPaginate
        previousLabel={"← Prev"}
        nextLabel={"Next →"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active-page"}
      />
    </div>
  );
}
