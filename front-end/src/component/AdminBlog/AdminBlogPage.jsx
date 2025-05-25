import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminBlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("/api/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/blogs/${id}`);
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (err) {
      console.error("Failed to delete blog:", err);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Admin Blog Page</h2>
      <button onClick={() => navigate("/add-blog")}>➕ Add New Blog</button>

      <ul>
        {blogs.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
          blogs.map((blog) => (
            <li
              key={blog._id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginTop: "10px",
              }}
            >
              <h3>{blog.title}</h3>
              <p>By: {blog.author}</p>
              <button onClick={() => navigate(`/edit-blog/${blog._id}`)}>
                ✏️ Edit
              </button>
              <button onClick={() => handleDelete(blog._id)}>🗑️ Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default AdminBlogPage;
