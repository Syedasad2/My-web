const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");
const upload = require('../utils/fileUpload');  // Assuming this is middleware for handling file uploads

// Register User
module.exports.registerUser = async function (req, res) {
  try {
    // Destructuring the required fields from the request body
    const { fullname, email, password } = req.body;

    // Validate incoming data
    if (!fullname || !email || !password) {
      return res.status(400).send({ message: "All fields (fullname, email, password) are required." });
    }

    // Check if the user already exists in the database
    let existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Handle profile picture upload
    const profilePic = req.file ? req.file.path : null; // Handle case when there is no file

    // Create the new user in the database
    let newUser = await userModel.create({
      fullname,
      email,
      password: hashedPassword,
      profilePic,  // Save the profile picture path if uploaded
    });

    // Generate a JWT token for the user
    const token = generateToken(newUser);

    // Set the token in a cookie (optional)
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

    res.status(201).send({ message: "User created successfully", user: newUser });
  } catch (err) {
    console.error("Error occurred during registration:", err.message);
    res.status(500).send({ message: "An error occurred during signup. Please try again." });
  }
};

// Login User
module.exports.loginUser = async function (req, res) {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Compare the provided password with the hashed password
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = generateToken(user);
      res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
      res.status(200).send({ message: "You are logged in", user: user });
    } else {
      res.status(400).send({ message: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).send({ message: "An error occurred during login. Please try again." });
  }
};

// Logout User
module.exports.logoutUser = async function (req, res) {
  try {
    // Clearing the cookie with the token
    res.clearCookie('token');
    res.status(200).send({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err.message);
    res.status(500).send({ message: "An error occurred during logout. Please try again." });
  }
};

// Get All Users (for Admin or Admin-like roles)
module.exports.getAllUsers = async function (req, res) {
  try {
    const users = await userModel.find();
    res.status(200).json(users);  // Send all users as a response
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).send({ message: "Error fetching users. Please try again." });
  }
};
