const express = require("express");
const { registerUser, loginUser, logoutUser, getAllUsers, getUserDashboard } = require("../controllers/userController");
const isloggedIn = require("../middlewares/isloggedIn");

const router = express.Router();

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// Logout User
router.post("/logout", logoutUser);

// Get All Users (for Admin or Admin-like roles)
router.get("/", isloggedIn, getAllUsers);  // Protected route for admins or authenticated users

// User Dashboard (protected route)
router.get("/dashboard", isloggedIn, getUserDashboard);  // Only accessible if logged in

module.exports = router;
