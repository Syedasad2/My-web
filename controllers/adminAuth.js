const AdminModel = require("../models/admin");
const jwt = require("jsonwebtoken");

// Admin creation route
module.exports.createAdmin = async function (req, res) {
  try {
    let admin = await AdminModel.find();
    if (admin.length > 0) {
      return res.status(403).send("Admin creation is not allowed");
    }

    const { fullname, email, password } = req.body;

    // Validate required fields
    if (!fullname || !email || !password) {
      return res
        .status(400)
        .send("All fields (fullname, email, password) are required");
    }

    // Create a new admin
    const newAdmin = new AdminModel({ fullname, email, password });
    await newAdmin.save();

    res.status(201).send("New admin created successfully!");
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

    // Find admin by email
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res.status(404).send("Admin not found");
    }

    // Compare the password with the hashed password
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid credentials");
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_KEY || "defaultSecretKey",
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
// logout

module.exports.logoutAdmin = async function (req, res) {
  try {
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
};



// Get All Admins route
module.exports.getAdmin = async function (req, res) {
  try {
    const admins = await AdminModel.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).send("Error fetching admins: " + error.message);
  }
};
