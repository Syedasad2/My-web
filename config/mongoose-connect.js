const mongoose = require("mongoose");
const config = require("config");

const dbURI = `${config.get("MONGODB_URI")}/myweb`;

mongoose
  .connect(dbURI)
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });
