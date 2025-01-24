const express = require('express');
const router = express.Router();
const { createAdmin, loginAdmin, logoutAdmin, getAdmin } = require('../controllers/adminAuth');
const upload = require('../utils/fileUpload');

// Get All Admins
router.get('/', getAdmin);

// Admin Create Route
router.post('/create', upload.single('profilePic'), createAdmin);

// Admin Login Route
router.post('/login', loginAdmin);

// Admin Logout Route
router.post("/logout", logoutAdmin);

module.exports = router;
