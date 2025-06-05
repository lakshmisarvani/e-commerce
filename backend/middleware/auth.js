const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Authentication middleware: Checks if user is logged in via token in cookies
exports.auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // Optional: If you want full user info, uncomment below
    // req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Admin middleware: Only allows admin users
exports.admin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin resource. Access denied.' });
  }
  next();
};