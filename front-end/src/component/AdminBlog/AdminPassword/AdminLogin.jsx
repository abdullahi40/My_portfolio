// Import React and useState for managing form inputs and error messages
import React, { useState } from "react";

// Import useNavigate from react-router-dom to programmatically redirect after login
import { useNavigate } from "react-router-dom";

// Import the CSS file for styling the login form
import "./AdminLogin.css";

// Import the base API URL from a central config file
import { API_URL, LOGIN } from "../../Api/Api";

// Define the AdminLogin component
const AdminLogin = () => {
  // State to store the entered username
  const [userName, setUserName] = useState("");

  // State to store the entered email
  const [email, setEmail] = useState("");

  // State to store the entered password
  const [password, setPassword] = useState("");

  // State to store any error messages during login
  const [error, setError] = useState("");

  // Hook for navigating to other routes (e.g., admin dashboard)
  const navigate = useNavigate();

  // Function to handle the login button click
  const handleLogin = async () => {
    setError(""); // Clear any previous error message

    // Basic validation: make sure password is provided
    if (!password) {
      setError("Please enter password"); // Set error if password is empty
      return;
    }

    try {
      // Send a POST request to the login API with credentials
      const res = await fetch(`${API_URL}/${LOGIN}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Set content type to JSON
        body: JSON.stringify({
          user_name: userName, // send username
          email: email, // send email
          password: password, // send password
        }),
      });

      // Parse the response data to JSON
      const data = await res.json();

      if (res.ok) {
        window.alert(`Login successful! ${userName}`); // Show success message
        // If login is successful, store the received token in localStorage
        localStorage.setItem("admin-auth", data.token);

        //Fire custom event to notify other components
        window.dispatchEvent(new Event("login-success"));

        // Navigate the user to the /admin dashboard
        navigate("/admin");
      } else {
        // If login failed, display the error message from the API
        setError(data.message || "Login failed");
      }
    } catch (error) {
      // If there is a server/network error, show a generic error
      setError("Server error. Please try again later.");
      console.error("Login error:", error);
    }
  };

  // The UI for the login form
  return (
    <div className="login-container">
      <h2 className="login-title">Admin Login</h2>

      {/* Username input field */}
      <input
        type="text"
        value={userName}
        placeholder="Enter username"
        onChange={(e) => setUserName(e.target.value)}
        className="login-input"
      />

      {/* Email input field */}
      <input
        type="email"
        value={email}
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
        className="login-input"
      />

      {/* Password input field */}
      <input
        type="password"
        value={password}
        placeholder="Enter admin password"
        onChange={(e) => setPassword(e.target.value)}
        className="login-input"
      />

      {/* Login button triggers handleLogin function */}
      <button onClick={handleLogin} className="login-button">
        Login
      </button>

      {/* Display error message if it exists */}
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

// Export the component so it can be used elsewhere
export default AdminLogin;
