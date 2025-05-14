// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const blogRoutes = require("./routes/blogRoutes.js"); // Routes for blogs
const adminBlogRoutes = require("./routes/adminBlogRoutes.js"); // Admin routes for blogs
const authRoutes = require("./routes/routes/auth.js"); // Authentication routes
const db = require("./db"); // PostgreSQL connection
const passport = require("passport"); // For authentication
const session = require("express-session");

const env = require("dotenv");
env.config(); // Load environment variables from .env file

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use(passport.initialize()); // Initialize Passport.js
app.use(passport.session()); // Initialize session support for Passport.js

// Routes
app.use("/api/blogs", blogRoutes); // For blogs API
app.use("/api", authRoutes); // For authentication API
// Admin routes for blogs API
// Middleware to protect admin routes
const authMiddleware = require("./middleware/authMiddleware");
app.use("/api", authMiddleware, adminBlogRoutes);

// Contact form API endpoint
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    // Insert the form data into the PostgreSQL database
    const query = `
      INSERT INTO contacts (name, email, subject, message) 
      VALUES ($1, $2, $3, $4)
      RETURNING id;
    `;
    const values = [name, email, subject, message];

    const result = await db.query(query, values);

    if (result.rows.length > 0) {
      return res.json({ success: true, message: "Message sent!" });
    } else {
      return res.json({ success: false, message: "Failed to save message" });
    }
  } catch (error) {
    console.error("Error inserting data:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
