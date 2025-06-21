// Import required modules
const express = require("express");
const router = express.Router();
const db = require("../db"); // Import the PostgreSQL database connection

// ✅ Route: Get All Blogs
router.get("/", async (req, res) => {
  try {
    // Query the database to get all blogs, ordered by newest first
    const result = await db.query(
      "SELECT * FROM blogs ORDER BY created_at DESC"
    );

    // Send the list of blogs as a JSON response
    res.json(result.rows);
  } catch (err) {
    // Log any errors and return a 500 response
    console.error("Error fetching blogs:", err);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

// ✅ Route: Get a single blog by slug
router.get("/:slug", async (req, res) => {
  const { slug } = req.params; // Get slug from the request URL

  try {
    // Query the database for a blog with the given slug
    const result = await db.query("SELECT * FROM blogs WHERE slug = $1", [
      slug,
    ]);

    // If no blog is found, return a 404 response
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Not found" });

    // Return the found blog as JSON
    res.json(result.rows[0]);
  } catch (err) {
    // Log any errors and return a 500 response
    console.error("Error fetching blog by slug:", err);
    res.status(500).json({ error: "Failed to fetch blog" });
  }
});

// Export the router so it can be used in the main app
module.exports = router;
