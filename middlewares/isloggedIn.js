const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

module.exports = async function (req, res, next) {
  // Check if the token is missing
  if (!req.cookies.token) {
    req.flash("error", "Access denied. Please log in to continue.");
    return res.redirect("/");
  }

  try {
    // Verify token
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);

    // Find user by email from the decoded token
    const user = await userModel
      .findOne({ email: decoded.email })
      .select("-password"); // Exclude password

    if (!user) {
      req.flash("error", "User not found. Please log in again.");
      return res.redirect("/");
    }

    // Attach user to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Handle errors based on token expiry or other errors
    if (err.name === "TokenExpiredError") {
      req.flash("error", "Session expired. Please log in again.");
    } else {
      req.flash("error", "Authentication failed. Please log in.");
    }
    console.error("Authentication error:", err.message);
    res.redirect("/");
  }
};
