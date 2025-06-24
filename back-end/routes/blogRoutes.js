// Import Express framework
const express = require("express");

// Create a new router instance
const router = express.Router();

// Import Supabase client from db.js
const supabase = require("../db");

// ✅ Route: GET all blogs
router.get("/", async (req, res) => {
  // Query Supabase to get all blog entries ordered by newest first
  const { data, error } = await supabase
    .from("blogs") // Target the "blogs" table
    .select("*") // Select all columns
    .order("created_at", { ascending: false }); // Sort by newest first

  // If there's an error, log and respond with 500 status
  if (error) {
    console.error("Error fetching blogs:", error.message);
    return res.status(500).json({ error: "Failed to fetch blogs" });
  }

  // If successful, send the list of blogs as JSON
  res.json(data);
});

// ✅ Route: GET a single blog by its slug
router.get("/:slug", async (req, res) => {
  // Extract slug from request URL
  const { slug } = req.params;

  // Query Supabase to find a single blog matching the slug
  const { data, error } = await supabase
    .from("blogs") // Target the "blogs" table
    .select("*") // Select all columns
    .eq("slug", slug) // Match the slug
    .single(); // Expect only one result

  // Handle query error
  if (error) {
    console.error("Error fetching blog by slug:", error.message);
    return res.status(500).json({ error: "Failed to fetch blog" });
  }

  // Handle case where no blog is found
  if (!data) {
    return res.status(404).json({ error: "Blog not found" });
  }

  // If successful, return the blog data as JSON
  res.json(data);
});

// Export the router to be used in other parts of the app
module.exports = router;
