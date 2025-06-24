// Import Express.js framework
const express = require("express");

// Import bcrypt library for password hashing
const bcrypt = require("bcrypt");

// Import database connection (either pg or supabase depending on setup)
const db = require("../../db");

// Import JSON Web Token library for authentication
const jwt = require("jsonwebtoken");

// Load environment variables from .env file
require("dotenv").config();

// Create a new Express router
const router = express.Router();

// Get the JWT secret key from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// Define the route for admin login
router.post("/admin/login", async (req, res) => {
  // Destructure user_name, email, and password from the request body
  const { user_name, email, password } = req.body;

  // Check if all required fields are provided
  if (!user_name || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Query the database to find a single admin user matching the username and email
    const result = await db
      .from("admins")
      .select("*")
      .eq("username", user_name)
      .eq("email", email)
      .single(); // Expect only one result

    // If no matching user is found, return 401 Unauthorized
    if (!result.data) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Extract the user from the result
    const user = result.data;

    // Compare the input password with the hashed password stored in the database
    const match = await bcrypt.compare(password, user.password);

    // If passwords don't match, return 401 Unauthorized
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create a JWT token with user info and expiration of 24 hours
    const token = jwt.sign(
      {
        id: user.id,
        user_name: user.username,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Return a successful response with the token and user info
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        user_name: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    // Catch and log any errors, then return a 500 Server Error
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// Export the router to be used in the main application
module.exports = router;
