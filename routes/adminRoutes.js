// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { adminLogin, getDashboardStats } = require('../controllers/adminController');

// Admin Login Route
// @route POST /api/admin/login
router.post('/login', adminLogin);

// Admin Dashboard Stats Route
// @route GET /api/admin/dashboard
router.get('/dashboard', getDashboardStats);

module.exports = router;
