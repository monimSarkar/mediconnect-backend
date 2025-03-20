// routes/doctorRoutes.js
const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

// @route   GET /api/doctors
// @desc    Get all doctors
router.get('/', doctorController.getAllDoctors);

// @route   GET /api/doctors/:id
// @desc    Get doctor by ID
router.get('/:id', doctorController.getDoctorById);

router.get('/:id/dashboard', doctorController.getDoctorDashboard);

// @route   POST /api/doctors
// @desc    Create new doctor
router.post('/', doctorController.createDoctor);

// @route   PUT /api/doctors/:id
// @desc    Update doctor
router.put('/:id', doctorController.updateDoctor);

// @route   DELETE /api/doctors/:id
// @desc    Delete doctor
router.delete('/:id', doctorController.deleteDoctor);

module.exports = router;
