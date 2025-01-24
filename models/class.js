// models/Class.js
const mongoose = require("mongoose");

const classSchema = mongoose.Schema(
  {
    className: { type: String, required: true },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // This should reference the User model (the teacher)
      required: true,
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // This should reference the User model (the students)
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Class", classSchema);
