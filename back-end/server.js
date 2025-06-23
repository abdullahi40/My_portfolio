// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const blogRoutes = require("./routes/blogRoutes.js"); // Routes for blogs
const adminBlogRoutes = require("./routes/adminBlogRoutes.js"); // Admin routes for blogs
const authRoutes = require("./routes/AuthRoutes/auth.js"); // Authentication routes
const contactRoutes = require("./routes/Contect/contactRoutes.js"); // Contact form routes
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
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
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
app.use("/api/admin", authMiddleware, adminBlogRoutes);

// Contact form API endpoint
app.use("/api", contactRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
