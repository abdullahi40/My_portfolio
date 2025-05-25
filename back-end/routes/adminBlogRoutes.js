const express = require("express");
const router = express.Router();
const db = require("../db");
const authMiddleware = require("../middleware/authMiddleware"); // Import middleware

// Add New Blog
router.post("/admin/add", authMiddleware, async (req, res) => {
  const { title, image_url, content, author } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO blogs (title, image_url, content, author, created_at) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING *",
      [title, image_url, content, author]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create blog" });
  }
});

// Update Blog
router.put("/admin/edit/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, image_url, content } = req.body;
  try {
    const result = await db.query(
      "UPDATE blogs SET title = $1, image_url = $2, content = $3 WHERE id = $4 RETURNING *",
      [title, image_url, content, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to update blog" });
  }
});

// Delete Blog
router.delete("/admin/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const check = await db.query("SELECT * FROM blogs WHERE id = $1", [id]);

    if (check.rows.length === 0) {
      return res.status(404).json({
        error: "Blog not found or already deleted!",
      });
    }

    await db.query("DELETE FROM blogs WHERE id = $1", [id]);
    res.json({ message: "Blog deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while deleting blog" });
  }
});

module.exports = router;
