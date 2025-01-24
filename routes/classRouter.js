const express = require("express");
const router = express.Router();
const classController = require("../controllers/classController");
const authMiddleware = require("../controllers/authController");

router.post("/create", classController.createClass);

// all classes
router.get("/", classController.getAllClasses);

// get class by
router.get("/:id", classController.getClassById);

// Update class
router.put("/:id", classController.updateClass);

// Delete class
router.delete("/:id", classController.deleteClass);

module.exports = router;
