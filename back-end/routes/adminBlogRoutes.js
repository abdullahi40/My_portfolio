// Import required modules
const express = require("express");
const router = express.Router();
const db = require("../db"); // PostgreSQL connection
const authMiddleware = require("../middleware/authMiddleware"); // Middleware for verifying token

// Route: Add a new blog post (Requires authentication)
router.post("/add", authMiddleware, async (req, res) => {
  const { title, image_url, content, author, slug } = req.body;

  try {
    // Insert blog data into the database with current timestamp
    const result = await db.query(
      "INSERT INTO blogs (title, image_url, content, author, slug, created_at) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP) RETURNING *",
      [title, image_url, content, author, slug]
    );

    // Return the inserted blog as response
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create blog" });
  }
});

// Route: Get a blog by its slug (Requires authentication)
router.get("/blogs/:slug", authMiddleware, async (req, res) => {
  const { slug } = req.params;

  try {
    // Fetch blog by slug from the database
    const result = await db.query("SELECT * FROM blogs WHERE slug = $1", [
      slug,
    ]);

    // If not found, return 404
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Return the found blog
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Route: Edit a blog post by its slug (Requires authentication)
router.put("/edit/:slug", authMiddleware, async (req, res) => {
  const { slug: oldSlug } = req.params;
  const { title, image_url, content, author, slug: newSlug } = req.body;

  try {
    // Update the blog data and return the updated row
    const result = await db.query(
      `UPDATE blogs 
       SET title = $1, 
           image_url = $2, 
           content = $3, 
           author = $4, 
           slug = $5,
           updated_at = NOW()  -- Update timestamp
       WHERE slug = $6 
       RETURNING *`,
      [title, image_url, content, author, newSlug, oldSlug]
    );

    // Return the updated blog
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to update blog" });
  }
});

// Route: Delete a blog post by its ID (Requires authentication)
router.delete("/blog/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the blog exists
    const check = await db.query("SELECT * FROM blogs WHERE id = $1", [id]);

    if (check.rows.length === 0) {
      return res.status(404).json({
        error: "Blog not found or already deleted!",
      });
    }

    // Delete the blog if found
    await db.query("DELETE FROM blogs WHERE id = $1", [id]);

    // Send success message
    res.json({ message: "Blog deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while deleting blog" });
  }
});

// Export the router to be used in the main app
module.exports = router;
