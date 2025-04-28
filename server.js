const express = require("express");
const mongoose = require("./config/mongoose-connect");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const flash = require("connect-flash");
const session = require("express-session");

// Routers
const adminRouter = require("./routes/adminRouter");
const userRouter = require("./routes/userRouter");
const loanRouter = require("./routes/loanRouter");

const app = express();
const PORT = 4003;

// ✅ CORS config
app.use(cors({
  origin: ["http://localhost:5173", "https://new-web1.netlify.app/"], // jitne chahie wo yahan dal lo
  credentials: true,  // Cookies allow karne ke liye
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(flash());

// Session Configuration
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
  })
);

// Static files
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Routes
app.use("/admin", adminRouter);
app.use("/users", userRouter);
app.use("/loan", loanRouter);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to My Web System");
});

// Start Server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
