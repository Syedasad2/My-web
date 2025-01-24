const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");
const upload = require('../utils/fileUpload');

// Register User
module.exports.registerUser = async function (req, res) {
  try {
    const { fullname, email, password, role } = req.body;
    const profilePic = req.file ? req.file.path : null;  // Get the profile picture file path

    // Check if the user already exists
    let existingUser = await userModel.findOne({ email: email });
    if (existingUser) return res.status(401).send('User already exists');

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user
    let newUser = await userModel.create({
      fullname,
      email,
      password: hashedPassword,
      role,
      profilePic,  // Save the profile picture path
    });

    // Generate Token
    let token = generateToken(newUser);
    res.cookie('token', token);

    res.send('User created successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Login User
module.exports.loginUser = async function (req, res) {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email: email });
  if (!user) return res.send("User not available");
  bcrypt.compare(password, user.password, function (err, result) {
    if (result) {
      let token = generateToken(user);
      res.cookie("token", token);
      res.send('You are logged in');
    } else {
      return res.send("Email or password is not correct");
    }
  });
};

// Logout User
module.exports.logoutUser = async function (req, res) {
  res.send('Logged out successfully');
};

// Get All Users
module.exports.getAllUsers = async function (req, res) {
  try {
    const users = await userModel.find();
    res.status(200).json(users);  // Send all users as response
  } catch (error) {
    res.status(500).send("Error fetching users: " + error.message);
  }
};
