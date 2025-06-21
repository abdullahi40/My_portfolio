// Import required modules
const express = require("express");
const bcrypt = require("bcrypt"); // For password hashing comparison
const db = require("../../db"); // PostgreSQL database connection
const router = express.Router();
const jwt = require("jsonwebtoken"); // For generating JWT tokens
const env = require("dotenv");

// Load environment variables from .env file
env.config();

const JWT_SECRET = process.env.JWT_SECRET; // Secret key for signing JWTs

// Route for handling admin login
router.post("/admin/login", async (req, res) => {
  // Extract login credentials from request body
  const { user_name, email, password } = req.body;

  try {
    // Query the database for the admin by username and email
    const result = await db.query(
      "SELECT * FROM admins WHERE username = $1 AND email = $2",
      [user_name, email]
    );

    // If no matching admin is found
    if (result.rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Login failed. Please check your credentials" });
    }

    const user = result.rows[0];

    // Compare provided password with hashed password in the database
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      // If passwords don't match
      return res
        .status(401)
        .json({ message: "Login failed. Please check your credentials" });
    }

    // If login is successful, generate a JWT token
    const token = jwt.sign(
      {
        id: user.id,
        user_name: user.user_name,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "24h" } // Token expiration time
    );

    // (Optional) Clear token from localStorage if running in the browser
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }

    // Return success response with the token and user info
    return res.status(200).json({
      message: "Logged in successfully",
      token,
      user: {
        id: user.id,
        user_name: user.user_name,
        email: user.email,
      },
    });
  } catch (err) {
    // Handle server or database errors
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// Export the router so it can be used in your main app
module.exports = router;
