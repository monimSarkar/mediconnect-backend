// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Admin = require('../models/Admin');

// Common Protect Middleware
const protect = async (req, res, next) => {
  let token;
  try {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Try to find user in Doctor collection
      const doctor = await Doctor.findById(decoded.id).select('-password');
      if (doctor) {
        req.user = doctor;
        req.user.role = 'doctor';
        return next();
      }

      // Try to find user in Patient collection
      const patient = await Patient.findById(decoded.id).select('-password');
      if (patient) {
        req.user = patient;
        req.user.role = 'patient';
        return next();
      }

      // Try to find user in Admin collection
      const admin = await Admin.findById(decoded.id).select('-password');
      if (admin) {
        req.user = admin;
        req.user.role = 'admin';
        return next();
      }

      return res.status(401).json({ message: 'User not found' });
    } else {
      return res.status(401).json({ message: 'Not authorized, token missing' });
    }
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

// Role-based access control middleware
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Access denied for role: ${req.user.role}` });
    }
    next();
  };
};

module.exports = { protect, authorizeRoles };
