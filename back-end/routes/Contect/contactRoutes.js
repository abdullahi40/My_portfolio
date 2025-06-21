// Import the Express framework
const express = require("express");

// Create a new router instance
const router = express.Router();

// Import the PostgreSQL connection pool from the db file
const pool = require("../../db");

// Define a POST route to handle contact form submissions
router.post("/contact", async (req, res) => {
  // Destructure data from the request body
  const { name, email, location, budget, subject, message, phone } = req.body;

  try {
    // Insert the contact data into the 'contact' table using parameterized query
    await pool.query(
      "INSERT INTO contact (name, email, location, budget, subject, message, phone) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [name, email, location, budget, subject, message, phone] // values to insert
    );

    // Respond with success status and message
    res.status(201).json({ message: "Contact saved!" });
  } catch (err) {
    // Log the error to the console for debugging
    console.error(err);

    // Respond with a server error status
    res.status(500).json({ error: "Server error" });
  }
});

// Export the router so it can be used in your main app
module.exports = router;
