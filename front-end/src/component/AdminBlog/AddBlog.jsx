// src/pages/AddBlog.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddBlog = () => {
  const [form, setForm] = useState({
    title: "",
    image_url: "",
    content: "",
    author: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/blogs/add", form);
    navigate("/");
  };

  return (
    <div>
      <h2>Add New Blog</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />
        <br />
        <input
          name="image_url"
          placeholder="Image URL"
          value={form.image_url}
          onChange={handleChange}
        />
        <br />
        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
        ></textarea>
        <br />
        <input
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddBlog;
