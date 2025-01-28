const express = require("express");
const { registerUser, loginUser, logoutUser, getAllUsers,getUserDashboard } = require("../controllers/userController");
const isloggedIn = require("../middlewares/isloggedIn");

const router = express.Router();

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// Logout User
router.post("/logout", isloggedIn,logoutUser);

// Get All Users (for Admin or Admin-like roles)
router.get("/", getAllUsers);

router.get("/dashboard", isloggedIn, getUserDashboard);

module.exports = router;
