const jwt = require('jsonwebtoken');
const AdminModel = require('../models/admin');

// Middleware to verify if the user is an admin
const isAdmin = async (req, res, next) => {
  try {
    // Get token from headers (Authorization: Bearer token)
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    
    // Check if user is admin
    const admin = await AdminModel.findById(decoded.id);
    
    if (!admin || admin.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied, admin only' });
    }
    
    // Pass user info to the next middleware or route handler
    req.user = admin;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Invalid token or authentication failed' });
  }
};

module.exports = { isAdmin };
