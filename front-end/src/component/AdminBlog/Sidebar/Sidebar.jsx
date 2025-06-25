// Import React hook for managing component state
import { useState } from "react";

// Import NavLink for navigation and Outlet to render nested routes
import { NavLink, Outlet } from "react-router-dom";

// Import icons from react-icons library
import { FaRegNewspaper, FaPlusCircle, FaEdit, FaBars } from "react-icons/fa";

// Import sidebar-specific CSS styles
import "./Sidebar.css";

// Define and export the Sidebar component
export default function Sidebar() {
  // State to track whether the sidebar is collapsed or expanded
  const [collapsed, setCollapsed] = useState(false);

  // Function to toggle the sidebar collapse state
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    // Apply collapsed class conditionally based on state
    <div className={`sidebar-layout ${collapsed ? "collapsed" : ""}`}>
      {/* Sidebar section */}
      <aside className="sidebar">
        {/* Header of the sidebar with toggle button and logo */}
        <div className="sidebar-header">
          {/* Button to collapse/expand sidebar */}
          <button className="toggle-btn" onClick={toggleSidebar}>
            <FaBars />
          </button>
          {/* Logo text shown only when sidebar is not collapsed */}
          <h2 className={`logo ${collapsed ? "hide" : ""}`}>AdminBlog</h2>
        </div>

        {/* Navigation menu links */}
        <nav className="sidebar-menu">
          {/* Link to all blog posts */}
          <NavLink to="/admin/blogs" className="menu-item">
            <FaRegNewspaper className="toggle-btn" />
            <span className="menu-text">All Blogs</span>
          </NavLink>

          {/* Link to create a new blog post */}
          <NavLink to="/admin/blog/create" className="menu-item">
            <FaPlusCircle className="toggle-btn" />
            <span className="menu-text">Create Blog</span>
          </NavLink>

          {/* Link to edit a blog post by slug */}
          <NavLink to="/admin/edit/:slug" className="menu-item">
            <FaEdit className="toggle-btn" />
            <span className="menu-text">Edit Blog</span>
          </NavLink>
        </nav>
      </aside>

      {/* Main content area where nested routes will be rendered */}
      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
}
