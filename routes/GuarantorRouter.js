const express = require("express");
const router = express.Router();
const { createGuarantor, getGuarantors } = require("../controllers/guarantorController");

// Create a new guarantor
router.post("/create", createGuarantor);

// Get all guarantors for a specific user
router.get("/user/:userId", getGuarantors);

module.exports = router;
