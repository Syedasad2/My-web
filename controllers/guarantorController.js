const GuarantorModel = require("../models/Guarantor");
const UserModel = require("../models/user");

// Create Guarantor
module.exports.createGuarantor = async (req, res) => {
  try {
    const { fullName, cnic, phoneNumber, email, address, relationship, userId } = req.body;

    // Validate required fields
    if (!fullName || !cnic || !phoneNumber || !email || !address || !relationship || !userId) {
      return res.status(400).send("All fields are required");
    }

    // Check if the user exists
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Create new Guarantor
    const newGuarantor = new GuarantorModel({
      fullName,
      cnic,
      phoneNumber,
      email,
      address,
      relationship,
      userId, // Reference to the user who is having this guarantor
    });

    // Save the Guarantor in the database
    await newGuarantor.save();

    res.status(201).send("Guarantor created successfully");
  } catch (error) {
    res.status(500).send("An error occurred: " + error.message);
  }
};

// Get All Guarantors of a User
module.exports.getGuarantors = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch all guarantors for the specific user
    const guarantors = await GuarantorModel.find({ userId });

    if (guarantors.length === 0) {
      return res.status(404).send("No guarantors found for this user");
    }

    res.status(200).json(guarantors);
  } catch (error) {
    res.status(500).send("An error occurred: " + error.message);
  }
};
