const express = require("express");
const mongoose = require("./config/mongoose-connect"); 
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require('cors');
require('dotenv').config();
const flash = require("connect-flash");
const session = require('express-session');  // Import express-session

// Routers
const adminRouter = require("./routes/adminRouter");
const userRouter = require("./routes/userRouter");
const attendanceRouter = require("./routes/attendanceRouter");
const classRouter = require("./routes/classRouter");

const app = express(); 

const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(flash());

app.use(session({
  secret: process.env.SECRET_KEY, 
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Routes
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/attendance", attendanceRouter);
app.use("/class", classRouter);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to My Web System");
});

// Start Server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
