const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser, getAllUsers } = require('../controllers/authController');
const upload = require('../utils/fileUpload');

// Register route
router.post("/register", upload.single('profilePic'), registerUser);

// Login route
router.post("/login", loginUser);

// Logout route
router.post("/logout", logoutUser);

// Get All Users route
router.get("/", getAllUsers);  // This route will return all users

module.exports = router;
