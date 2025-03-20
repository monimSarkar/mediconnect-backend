const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Ensure this path is correct

// @route   POST /api/auth/register
// @desc    Register a new doctor
router.post('/register', authController.register);

// @route   POST /api/auth/login
// @desc    Login doctor
router.post('/login', authController.login);

// @route   POST /api/auth/patient/register
// @desc    Register a new patient
router.post('/patient/register', authController.registerPatient);

// @route   POST /api/auth/patient/login
// @desc    Login patient
router.post('/patient/login', authController.loginPatient);

module.exports = router;
