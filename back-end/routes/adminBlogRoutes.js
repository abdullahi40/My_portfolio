// Import required modules
const express = require("express");
const router = express.Router(); // Create an Express router instance
const supabase = require("../db"); // Import Supabase client
const authMiddleware = require("../middleware/authMiddleware"); // Middleware to check if user is authenticated

// ✅ Route: Add a new blog post (Authentication required)
router.post("/add", authMiddleware, async (req, res) => {
  // Extract blog data from the request body
  const { title, image_url, content, author, slug } = req.body;

  try {
    // Insert the new blog into the Supabase 'blogs' table with the current timestamp
    const { data, error } = await supabase
      .from("blogs")
      .insert([
        {
          title,
          image_url,
          content,
          author,
          slug,
          created_at: new Date(), // Add created_at manually
        },
      ])
      .select()
      .single();

    // Handle insertion error
    if (error) {
      console.error("Insert error:", error.message);
      return res.status(500).json({ error: "Failed to create blog" });
    }

    // Return the newly inserted blog
    res.status(201).json(data);
  } catch (err) {
    // Catch any unexpected server error
    console.error("Server error:", err);
    res.status(500).json({ error: "Failed to create blog" });
  }
});

// ✅ Route: Get a blog by its slug (Authentication required)
router.get("/blogs/:slug", authMiddleware, async (req, res) => {
  // Extract the slug from the request parameters
  const { slug } = req.params;

  try {
    // Query Supabase for the blog with the specified slug
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("slug", slug)
      .single(); // Expect exactly one row

    // Handle query error
    if (error) {
      console.error("Fetch error:", error.message);
      return res.status(404).json({ message: "Blog not found" });
    }

    // Return the blog data
    res.json(data);
  } catch (err) {
    // Handle server error
    console.error("Server error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Route: Edit a blog by its slug (Authentication required)
router.put("/edit/:slug", authMiddleware, async (req, res) => {
  // Extract old slug from the request parameters
  const { slug: oldSlug } = req.params;

  // Extract updated data from request body
  const { title, image_url, content, author, slug: newSlug } = req.body;

  try {
    // Update the blog with the new data
    const { data, error } = await supabase
      .from("blogs")
      .update({
        title,
        image_url,
        content,
        author,
        slug: newSlug,
        updated_at: new Date(), // Update timestamp
      })
      .eq("slug", oldSlug)
      .select()
      .single(); // Expect exactly one row returned

    // Handle update error
    if (error) {
      console.error("Update error:", error.message);
      return res.status(500).json({ error: "Failed to update blog" });
    }

    // Return the updated blog
    res.json(data);
  } catch (err) {
    // Handle server error
    console.error("Server error:", err);
    res.status(500).json({ error: "Failed to update blog" });
  }
});

// ✅ Route: Delete a blog by its ID (Authentication required)
router.delete("/blog/:id", authMiddleware, async (req, res) => {
  // Extract blog ID from request parameters
  const { id } = req.params;

  try {
    // Check if the blog exists
    const { data: existing, error: checkError } = await supabase
      .from("blogs")
      .select("*")
      .eq("id", id)
      .single();

    // If not found, return 404
    if (checkError || !existing) {
      return res
        .status(404)
        .json({ error: "Blog not found or already deleted!" });
    }

    // Delete the blog from Supabase
    const { error: deleteError } = await supabase
      .from("blogs")
      .delete()
      .eq("id", id);

    // Handle deletion error
    if (deleteError) {
      console.error("Delete error:", deleteError.message);
      return res
        .status(500)
        .json({ error: "Server error while deleting blog" });
    }

    // Send success message
    res.json({ message: "Blog deleted successfully!" });
  } catch (err) {
    // Catch general server error
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error while deleting blog" });
  }
});

// ✅ Export the router to be used in the main application
module.exports = router;
