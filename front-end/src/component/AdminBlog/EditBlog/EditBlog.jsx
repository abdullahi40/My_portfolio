// Import necessary hooks from React and React Router
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Import CSS styles specific to this component
import "./EditBlog.css";

// Import the configured Axios instance
import { Axios } from "../Axios/Axios";

// Import API endpoint constant
import { EDIT_BLOG } from "../../Api/Api";

// Main component for editing a blog post
export default function EditBlog() {
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Extract slug parameter from the URL
  const { slug } = useParams();

  // Define initial state for the blog fields
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    image_url: "",
    author: "",
    slug: "",
  });

  // Loading state to show loading message while data is being fetched
  const [loading, setLoading] = useState(true);

  // useEffect hook to fetch blog data by slug when the component mounts
  useEffect(() => {
    // Async function to fetch the blog data
    const fetchBlogBySlug = async () => {
      try {
        // Send GET request to fetch blog by slug
        const response = await Axios.get(`/admin/blogs/${slug}`);
        setBlog(response.data); // Update blog state with fetched data
        setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error fetching blog:", error);
        setLoading(false); // Stop loading even if there's an error
      }
    };

    // Call the fetch function
    fetchBlogBySlug();
  }, [slug]); // Re-run effect if slug changes

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update only the changed field in the blog state
    setBlog({ ...blog, [name]: value });
  };

  // Handle form submission to update the blog
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form reload

    try {
      // Send PUT request to update the blog using slug
      await Axios.put(`/${EDIT_BLOG}/${slug}`, blog);
      console.log("Blog updated successfully");

      // Navigate to the new blog URL based on the updated slug
      navigate(`/blog/${blog.slug}`);
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  // If blog data is still loading, show loading message
  if (loading) {
    return <div className="edit-blog-container">Loading...</div>;
  }

  // Render the blog editing form
  return (
    <div className="edit-blog-container">
      <h2>Edit Blog: {blog.slug}</h2>

      {/* Form to edit blog fields */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={blog.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Content:</label>
          <textarea
            name="content"
            rows="10"
            value={blog.content}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="text"
            name="image_url"
            value={blog.image_url}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={blog.author}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Slug:</label>
          <input
            type="text"
            name="slug"
            value={blog.slug}
            onChange={handleChange}
          />
        </div>

        {/* Button to submit the updated blog */}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
