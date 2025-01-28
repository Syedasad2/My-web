const mongoose = require("mongoose");
require("dotenv").config();

const dbURI = `${process.env.DB_URI}/myweb`;

mongoose
  .connect(dbURI)
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });
