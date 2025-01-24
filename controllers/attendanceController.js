const Attendance = require("../models/attendance");
const Class = require("../models/class");
const User = require("../models/user");

// Create Attendance Record
const createAttendance = async (req, res) => {
  try {
    const { date, classId, studentId, status } = req.body;

    // Check if the Class exists
    const classExist = await Class.findById(classId);
    if (!classExist) return res.status(404).json({ message: "Class not found" });

    // Check if the Student exists
    const studentExist = await User.findById(studentId);
    if (!studentExist) return res.status(404).json({ message: "Student not found" });

    // Create new attendance record
    const attendance = new Attendance({
      date,
      class: classId,
      student: studentId,
      status,
    });

    await attendance.save();
    res.status(201).json({ message: "Attendance created successfully", attendance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating attendance", error });
  }
};

// Get Attendance by Class and Student
const getAttendance = async (req, res) => {
  try {
    const { classId, studentId } = req.params;

    // Fetch attendance records for a specific class and student
    const attendance = await Attendance.find({ class: classId, student: studentId });

    if (!attendance || attendance.length === 0) {
      return res.status(404).json({ message: "No attendance records found" });
    }

    res.status(200).json({ attendance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching attendance", error });
  }
};

// Get Attendance by Class
const getClassAttendance = async (req, res) => {
  try {
    const { classId } = req.params;

    // Fetch all attendance records for a specific class
    const attendance = await Attendance.find({ class: classId });

    if (!attendance || attendance.length === 0) {
      return res.status(404).json({ message: "No attendance records found for this class" });
    }

    res.status(200).json({ attendance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching attendance", error });
  }
};

// Get Attendance by Date Range for a Student
const getAttendanceByDateRange = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { startDate, endDate } = req.query;

    // Fetch attendance for a specific student within a date range
    const attendance = await Attendance.find({
      student: studentId,
      date: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });

    if (!attendance || attendance.length === 0) {
      return res.status(404).json({ message: "No attendance records found" });
    }

    res.status(200).json({ attendance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching attendance by date range", error });
  }
};

module.exports = {
  createAttendance,
  getAttendance,
  getClassAttendance,
  getAttendanceByDateRange,
};
