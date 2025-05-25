const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const env = require("dotenv");

env.config(); // Load environment variables

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/login", async (req, res) => {
  const { user_name, email, password } = req.body;

  try {
    const result = await db.query(
      "SELECT * FROM users WHERE user_name = $1 AND email = $2",
      [user_name, email]
    );

    if (result.rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Login failed. Please check your credentials" });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res
        .status(401)
        .json({ message: "Login failed. Please check your credentials" });
    }

    // Haddii password sax yahay, samee token
    const token = jwt.sign(
      { id: user.id, user_name: user.user_name, email: user.email },
      JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    // remove token local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }

    // Dir token-ka iyo fariin guul ah
    return res.status(200).json({
      message: "Logged in successfully",
      token,
      user: {
        id: user.id,
        user_name: user.user_name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
