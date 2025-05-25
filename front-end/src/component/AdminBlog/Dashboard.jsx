// component/Dashboard/dashboard.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("admin-auth");
    if (isAuthenticated !== "true") {
      navigate("/admin-login");
    }
  }, [navigate]);

  return (
    <>
      <div style={{ padding: "2rem" }}>
        <h1>Welcome to Admin Dashboard</h1>
        <p>Here you can manage blogs...</p>
      </div>
      <button
        onClick={() => {
          localStorage.removeItem("admin-auth");
          navigate("/admin-login");
        }}
      >
        Logout
      </button>
    </>
  );
};

export default Dashboard;
