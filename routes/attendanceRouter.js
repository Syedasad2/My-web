const express = require("express");
const mongoose = require("mongoose");
const {
  createAttendance,
  getAttendance,
  getClassAttendance,
  getAttendanceByDateRange,
} = require("../controllers/attendanceController");

const router = express.Router();

// Helper function to validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Route to create attendance
router.post("/create", createAttendance);

// get attendance
router.get("/:classId/:studentId", async (req, res, next) => {
  const { classId, studentId } = req.params;

  // Validatation
  if (!isValidObjectId(classId) || !isValidObjectId(studentId)) {
    return res.status(400).json({ message: "Invalid classId or studentId" });
  }

  next();
}, getAttendance);

// get all attendance records for a specific class
router.get("/class/:classId", async (req, res, next) => {
  const { classId } = req.params;

  // Validation of class id
  if (!isValidObjectId(classId)) {
    return res.status(400).json({ message: "Invalid classId" });
  }

  next();
}, getClassAttendance);

//  get attendance for a specific student within a date range
router.get("/student/:studentId", async (req, res, next) => {
  const { studentId } = req.params;

  // Validation of  student id 
  if (!isValidObjectId(studentId)) {
    return res.status(400).json({ message: "Invalid studentId" });
  }

  next();
}, getAttendanceByDateRange);

module.exports = router;
