const mongoose = require("mongoose");

const loanSchema = mongoose.Schema(
  {
    loanAmount: { type: Number, required: true },
    loanPeriod: { type: Number, required: true }, 
    loanCategory: { type: String, required: true }, 
    loanSubCategory: { type: String, required: true }, 
    interestRate: { type: Number, required: true }, 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Loan", loanSchema);
