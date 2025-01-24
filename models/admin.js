const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
