const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  // Setting the token to expire in 1 hour
  return jwt.sign(
    { email: user.email, id: user._id },
    process.env.JWT_KEY, // Ensure this is set in your .env file
    { expiresIn: "1h" } // Token expiration time
  );
};

module.exports = { generateToken };
