const mongoose = require("mongoose");

const guarantorSchema = mongoose.Schema(
  {
    fullName: { type: String, required: true },
    cnic: { type: String, required: true, unique: true },  // CNIC for Pakistan, or any identifier
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    relationship: { type: String, required: true }, // Relationship with the user (e.g., friend, family)
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },  // Reference to the user
  },
  { timestamps: true }
);

module.exports = mongoose.model("Guarantor", guarantorSchema);
