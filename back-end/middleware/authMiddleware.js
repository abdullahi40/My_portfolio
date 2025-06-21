// Import the jsonwebtoken library to work with JWT tokens
const jwt = require("jsonwebtoken");

// Middleware function to authenticate incoming requests
function authMiddleware(req, res, next) {
  // Get the Authorization header from the incoming request
  const authHeader = req.headers.authorization;

  // If the header is missing, return 401 Unauthorized
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  // Extract the token from the "Bearer <token>" format
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "yourSecretKey" // fallback if no environment variable
    );

    // If valid, attach the decoded user info to the request object
    req.user = decoded;

    // Move to the next middleware or route handler
    next();
  } catch (err) {
    // If token verification fails, return 401 Unauthorized
    res.status(401).json({ message: "Invalid token" });
  }
}

// Export the middleware so it can be used in other files
module.exports = authMiddleware;
