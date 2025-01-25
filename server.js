const express = require("express");
const mongoose = require("./config/mongoose-connect");  // MongoDB connection
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require('cors');
require('dotenv').config();
const flash = require("connect-flash");
const session = require('express-session');  // Import express-session

// Routers
const adminRouter = require('./routes/adminRouter'); 
const userRouter = require("./routes/userRouter");
const guarantorRouter = require("./routes/GuarantorRouter");  
const loanRouter = require("./routes/loanRouter");

const app = express(); 

const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());  // Correct cookie parsing
app.use(flash());

// Session Configuration
app.use(session({
  secret: process.env.SECRET_KEY,  // Secret key from .env
  resave: false,
  saveUninitialized: true,
  cookie: { httpOnly: true, secure: process.env.NODE_ENV === "production" ? true : false }  // Secure cookies for production
}));

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Routes
app.use('/admin', adminRouter);
app.use("/users", userRouter);
app.use("/guarantor", guarantorRouter);  
app.use("/loan", loanRouter);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to My Web System");
});

// Start Server
app.listen(PORT, () => 
  console.log(`Server running on http://localhost:${PORT}`)
);
