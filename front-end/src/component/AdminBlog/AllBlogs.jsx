// src/pages/AllBlogs.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("/api/blogs").then((res) => setBlogs(res.data));
  }, []);

  const deleteBlog = async (id) => {
    if (window.confirm("Ma hubtaa inaad tirtirayso?")) {
      await axios.delete(`/api/blogs/${id}`);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    }
  };

  return (
    <div>
      <h2>Dhammaan Blog-yada</h2>
      {blogs.map((blog) => (
        <div key={blog.id} style={blogStyle}>
          <h3>{blog.title}</h3>
          <img src={blog.image_url} width="100" />
          <p>
            <b>Author:</b> {blog.author}
          </p>
          <div>
            <Link to={`/edit/${blog.id}`} style={btnStyle}>
              Edit
            </Link>
            <button onClick={() => deleteBlog(blog.id)} style={btnStyle}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const blogStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  marginBottom: "10px",
};

const btnStyle = {
  marginRight: "10px",
  padding: "5px 10px",
  background: "#444",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};

export default AllBlogs;
