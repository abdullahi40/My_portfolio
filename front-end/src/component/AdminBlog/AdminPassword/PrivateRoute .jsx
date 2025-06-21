import React from "react"; // Import the React library
import { Navigate, Outlet } from "react-router-dom"; // Import Navigate for redirection and Outlet for nested routes

// PrivateRoute component to protect routes that require authentication
const PrivateRoute = () => {
  // Retrieve the admin authentication token from localStorage
  const token = localStorage.getItem("admin-auth");

  // If the token exists, render the nested routes (Outlet);
  // otherwise, redirect the user to the '/admin-login' page.
  return token ? <Outlet /> : <Navigate to="/admin-login" />;
};

export default PrivateRoute; // Export the PrivateRoute component for use in route definitions
