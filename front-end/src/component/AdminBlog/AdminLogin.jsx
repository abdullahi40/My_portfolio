// component/AdminLogin/adminLogin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === "admin123") {
      localStorage.setItem("admin-auth", "true");
      navigate("/dashboard");
    } else {
      setError("Password is incorrect");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Admin Login</h2>
      <input
        type="password"
        value={password}
        placeholder="Enter admin password"
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: "0.5rem", marginBottom: "1rem" }}
      />
      <br />
      <button onClick={handleLogin} style={{ padding: "0.5rem 1rem" }}>
        Login
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AdminLogin;
