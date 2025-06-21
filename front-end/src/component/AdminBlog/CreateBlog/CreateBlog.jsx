// Import React and useState for state management
import React, { useState } from "react";

// Import useNavigate to programmatically navigate after form submission
import { useNavigate } from "react-router-dom";

// Import CSS file for styling the blog creation form
import "./CreateBlog.css";

// Import the Axios instance configured with baseURL and token handling
import { Axios } from "../Axios/Axios";
import { CREATE_BLOG } from "../../Api/Api";

// Define and export the CreateBlog component
export default function CreateBlog() {
  // Initialize navigation hook
  const navigate = useNavigate();

  // Initialize blog state to hold form input values
  const [blog, setBlog] = useState({
    title: "", // Blog title
    content: "", // Blog content
    image_url: "", // Image URL (optional)
    author: "", // Author name
    slug: "", // Blog slug (URL identifier)
  });

  // Error state for displaying any submission errors
  const [error, setError] = useState("");

  // Handle form input changes and update the corresponding state
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from the event
    setBlog({ ...blog, [name]: value }); // Update the corresponding property in blog state
  };

  // Handle form submission when the user clicks "Create Blog"
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    try {
      // Send POST request to create a new blog
      const response = await Axios.post(`/${CREATE_BLOG}`, blog);

      // Log success response in the console
      console.log("Created Blog:", response.data);

      // Redirect to the blog list page after successful creation
      navigate("/admin/blogs");
    } catch (err) {
      // Log and show an error if something goes wrong
      console.error("Error creating blog:", err);
      setError("Failed to create blog");
    }
  };

  // Return the JSX (UI) of the component
  return (
    <div className="create-blog-container">
      {/* Page title */}
      <h2>Create New Blog</h2>

      {/* Show error if any exists */}
      {error && <div className="error">{error}</div>}

      {/* Blog creation form */}
      <form onSubmit={handleSubmit}>
        {/* Blog title field */}
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            name="title"
            value={blog.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Blog content field */}
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            name="content"
            rows="10"
            value={blog.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Image URL field (optional) */}
        <div className="form-group">
          <label htmlFor="image_url">Image URL:</label>
          <input
            type="text"
            name="image_url"
            value={blog.image_url}
            onChange={handleChange}
          />
        </div>

        {/* Author name field */}
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            name="author"
            value={blog.author}
            onChange={handleChange}
            required
          />
        </div>

        {/* Slug (URL identifier) field */}
        <div className="form-group">
          <label htmlFor="slug">Slug:</label>
          <input
            type="text"
            name="slug"
            value={blog.slug}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit button */}
        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
}
