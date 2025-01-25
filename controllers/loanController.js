const LoanModel = require("../models/loan");
const UserModel = require("../models/user");

// Create Loan
module.exports.createLoan = async (req, res) => {
    try {
      const { loanAmount, loanPeriod, loanCategory, loanSubCategory, interestRate, userId } = req.body;
  
      // Validate required fields
      if (!loanAmount || !loanPeriod || !loanCategory || !loanSubCategory || !interestRate || !userId) {
        return res.status(400).send("All fields (loanAmount, loanPeriod, loanCategory, loanSubCategory, interestRate, userId) are required");
      }
  
      // Check if the user exists
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      // Create a new loan
      const newLoan = new LoanModel({
        loanAmount,
        loanPeriod,
        loanCategory,
        loanSubCategory,
        interestRate,
        userId,
        status: "Pending",  // Default status is "Pending"
      });
  
      // Save the loan to the database
      await newLoan.save();
  
      res.status(201).send("Loan request created successfully");
    } catch (error) {
      res.status(500).send("An error occurred: " + error.message);
    }
  };

// Get All Loans
module.exports.getLoans = async (req, res) => {
  try {
    const loans = await LoanModel.find().populate("userId", "fullname email");  // Populate user details

    res.status(200).json(loans);
  } catch (error) {
    res.status(500).send("An error occurred while fetching loans: " + error.message);
  }
};

// Get Loan by ID (for a specific user)
module.exports.getLoanById = async (req, res) => {
  try {
    const loan = await LoanModel.findById(req.params.id).populate("userId", "fullname email");

    if (!loan) {
      return res.status(404).send("Loan not found");
    }

    res.status(200).json(loan);
  } catch (error) {
    res.status(500).send("An error occurred: " + error.message);
  }
};

// Update Loan Status (Admin only)
module.exports.updateLoanStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { loanId } = req.params;

    if (!status) {
      return res.status(400).send("Status is required");
    }

    const loan = await LoanModel.findById(loanId);
    if (!loan) {
      return res.status(404).send("Loan not found");
    }

    // Update the loan status
    loan.status = status;
    await loan.save();

    res.status(200).send("Loan status updated successfully");
  } catch (error) {
    res.status(500).send("An error occurred while updating loan status: " + error.message);
  }
};
