const mongoose = require("mongoose");

const loanSchema = mongoose.Schema(
  {
    loanAmount: { type: Number, required: true },
    loanPeriod: { type: Number, required: true },  // Period in months
    loanCategory: { type: String, required: true }, // E.g., Personal, Business, etc.
    loanSubCategory: { type: String, required: true }, // E.g., Short-term, Long-term, etc.
    interestRate: { type: Number, required: true }, // Interest rate in percentage
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Loan", loanSchema);
