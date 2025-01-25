const AdminModel = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Admin create route
module.exports.createAdmin = async function (req, res) {
  try {
    // Check if an admin already exists
    let admin = await AdminModel.find();
    if (admin.length > 0) {
      return res.status(503).send("You don't have permission to create an admin");
    }

    const { fullname, email, password } = req.body;

    // Validate required fields
    if (!fullname || !email || !password) {
      return res.status(400).send("All fields (fullname, email, password) are required");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const profilePic = req.file ? req.file.path : null;  // Handle the file path for profilePic

    // Create a new admin object
    const newAdmin = new AdminModel({
      fullname,
      email,
      password: hashedPassword,
      profilePic, // Save the file path to the database
    });

    // Save admin to database
    await newAdmin.save();

    res.status(201).send("New admin is created successfully!");
  } catch (error) {
    res.status(500).send("An error occurred: " + error.message);
  }
};

// Admin login route
module.exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    // Check if admin exists
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res.status(404).send("Admin not found");
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid credentials");
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: admin.role,  // Ensure the admin model has 'role' field if needed
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).send("An error occurred: " + error.message);
  }
};

// Logout route
module.exports.logoutAdmin = async function (req, res) {
  // In this case, we just send a response. You can add further logic to handle session/token logout if needed.
  res.status(200).send('Logged out successfully');
};

// Get All Admins route
module.exports.getAdmin = async function (req, res) {
  try {
    const admins = await AdminModel.find();  // Fetch all admins from the database
    res.status(200).json(admins);  // Send all admins as a response
  } catch (error) {
    res.status(500).send("Error fetching admins: " + error.message);
  }
};
