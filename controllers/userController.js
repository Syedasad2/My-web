const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const { generateToken } = require("../utils/generateToken");

// Register User
const registerUser = async (req, res) => {
  try {
    const { Cnic, fullname, email, password } = req.body;

    // Validate incoming data
    if (!Cnic || !fullname || !email || !password) {
      return res
        .status(400)
        .send({
          message: "All fields (Cnic, fullname, email, password) are required.",
        });
    }

    // Check if the user already exists
    let existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user in the database
    let newUser = await userModel.create({
      Cnic,
      fullname,
      email,
      password: hashedPassword,
    });

    // Generate a JWT token for the user
    const token = generateToken(newUser);

    // Set the token in a cookie (optional)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res
      .status(201)
      .send({ message: "User created successfully", user: newUser });
  } catch (err) {
    console.error("Error occurred during registration:", err.message);
    res
      .status(500)
      .send({ message: "An error occurred during signup. Please try again." });
  }
};

// Login User
const loginUser = async (req, res) => {
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
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      res.status(200).send({ message: "You are logged in", user: user });
    } else {
      res.status(400).send({ message: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Login error:", err.message);
    res
      .status(500)
      .send({ message: "An error occurred during login. Please try again." });
  }
};

// Logout User
const logoutUser = async (req, res) => {
  try {
    // Clearing the cookie with the token
    res.clearCookie("token");
    res.status(200).send({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err.message);
    res
      .status(500)
      .send({ message: "An error occurred during logout. Please try again." });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    if (!users || users.length === 0) {
      return res.status(404).send({ message: "No users found." });
    }
    res.status(200).json(users); // Send all users as a response
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res
      .status(500)
      .send({ message: "Error fetching users. Please try again." });
  }
};
// Dashboard Functionality
const getUserDashboard = async (req, res) => {
  try {
    const userId = req.user._id;  // Get the logged-in user from the req.user object
    const userData = await userModel.findById(userId);  // Find user by ID

    if (!userData) {
      return res.status(404).send({ message: "User not found" });
    }

    // You can add more specific data here, like the user's requests, etc.
    res.status(200).json({ message: "User Dashboard", user: userData });
  } catch (error) {
    console.error("Error fetching dashboard data:", error.message);
    res.status(500).send({ message: "Error fetching dashboard data" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserDashboard,
};
