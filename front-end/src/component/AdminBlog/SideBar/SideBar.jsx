// src/components/Sidebar.jsx
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      style={{
        width: "200px",
        height: "100vh",
        backgroundColor: "#222",
        color: "#fff",
        padding: "20px",
        position: "fixed",
      }}
    >
      <h2>Admin Panel</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <Link style={linkStyle} to="/">
            All Blogs
          </Link>
        </li>
        <li>
          <Link style={linkStyle} to="/add">
            Add Blog
          </Link>
        </li>
      </ul>
    </div>
  );
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  display: "block",
  margin: "10px 0",
};

export default Sidebar;
