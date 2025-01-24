// controllers/classController.js
const Class = require("../models/class");
// Create a new class
exports.createClass = async (req, res) => {
  try {
    const { className, teacher, students } = req.body; // Data from request body

    const newClass = new Class({
      className,
      teacher,
      students,
    });

    const savedClass = await newClass.save(); // Save the new class to DB

    res.status(201).json({
      message: 'Class created successfully',
      newClass: savedClass,
    });
  } catch (error) {
    res.status(400).json({
      error: 'Error creating class',
      details: error.message,
    });
  }
};


// Get all classes
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate("teacher students");
    res.status(200).json(classes);
  } catch (error) {
    res.status(400).json({ error: "Error fetching classes", details: error.message });
  }
};

// Get class by ID
exports.getClassById = async (req, res) => {
  try {
    const classObj = await Class.findById(req.params.id).populate("teacher students");
    if (!classObj) {
      return res.status(404).json({ error: "Class not found" });
    }
    res.status(200).json(classObj);
  } catch (error) {
    res.status(400).json({ error: "Error fetching class", details: error.message });
  }
};

// Update class details
exports.updateClass = async (req, res) => {
  try {
    const classObj = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!classObj) {
      return res.status(404).json({ error: "Class not found" });
    }
    res.status(200).json({ message: "Class updated successfully", updatedClass: classObj });
  } catch (error) {
    res.status(400).json({ error: "Error updating class", details: error.message });
  }
};

// Delete a class
exports.deleteClass = async (req, res) => {
  try {
    const classObj = await Class.findByIdAndDelete(req.params.id);
    if (!classObj) {
      return res.status(404).json({ error: "Class not found" });
    }
    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error deleting class", details: error.message });
  }
};
