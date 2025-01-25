const express = require('express');
const router = express.Router();
const { createAdmin, loginAdmin, logoutAdmin, getAdmin , approveLoan, getPendingLoans} = require('../controllers/adminAuth');
// const upload = require('../utils/fileUpload');  // Ensure you have fileUpload middleware

// Get All Admins
router.get('/', getAdmin);

// Admin Create Route
router.post('/create',createAdmin);

// Admin Login Route
router.post('/login', loginAdmin);


// Admin Logout Route
router.post("/logout", logoutAdmin);

module.exports = router;
