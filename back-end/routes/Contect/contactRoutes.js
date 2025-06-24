// Import the Express framework
const express = require("express");

// Create a new router instance
const router = express.Router();

// Import the Supabase client
const supabase = require("../../db"); // Make sure db exports Supabase client

// Define a POST route to handle contact form submissions
router.post("/contact", async (req, res) => {
  // Destructure data from the request body
  const { name, email, location, budget, subject, message, phone } = req.body;

  try {
    // Insert contact data into the 'contact' table using Supabase
    const { error } = await supabase.from("contact").insert([
      {
        name,
        email,
        location,
        budget,
        subject,
        message,
        phone,
      },
    ]);

    // If there was an error inserting
    if (error) {
      console.error("Insert error:", error.message);
      return res.status(500).json({ error: "Failed to save contact" });
    }

    // Respond with success status and message
    res.status(201).json({ message: "Contact saved!" });
  } catch (err) {
    // Catch any unexpected errors
    console.error("Unexpected server error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Export the router so it can be used in your main app
module.exports = router;
