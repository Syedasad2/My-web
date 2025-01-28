const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  // Setting the token to expire in 1 hour
  return jwt.sign(
    { email: user.email, id: user._id },
    process.env.JWT_KEY, 
    { expiresIn: "1h" } 
  );
};

module.exports = { generateToken };
