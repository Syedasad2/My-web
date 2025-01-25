const express = require("express");
const { registerUser, loginUser, logoutUser, getAllUsers } = require("../controllers/userController");

const router = express.Router();

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// Logout User
router.post("/logout", logoutUser);

// Get All Users (for Admin or Admin-like roles)
router.get("/users", getAllUsers);

module.exports = router;
