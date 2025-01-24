// for teacher and students
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["teacher", "student"], required: true },
    class: {
      type: String,
      required: function () {
        return this.role === "student";
      },
    },
    section: {
      type: String,
      required: function () {
        return this.role === "student";
      },
    },
    profilePic: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
