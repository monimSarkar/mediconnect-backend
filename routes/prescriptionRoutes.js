// routes/prescriptionRoutes.js
const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');

// ===========================
// Admin & Global Routes
// ===========================

// @route   GET /api/prescriptions
// @desc    Get all prescriptions
router.get('/', prescriptionController.getAllPrescriptions);

// @route   GET /api/prescriptions/:id
// @desc    Get prescription by ID
router.get('/:id', prescriptionController.getPrescriptionById);

// @route   POST /api/prescriptions
// @desc    Create new prescription
router.post('/', prescriptionController.createPrescription);

// @route   PUT /api/prescriptions/:id
// @desc    Update prescription
router.put('/:id', prescriptionController.updatePrescription);

// @route   DELETE /api/prescriptions/:id
// @desc    Delete prescription
router.delete('/:id', prescriptionController.deletePrescription);

// ===========================
// Doctor-specific Dashboard Route
// ===========================

// @route   GET /api/prescriptions/doctor/:id
// @desc    Get all prescriptions of a specific doctor
router.get('/doctor/:id', prescriptionController.getPrescriptionsByDoctor);

module.exports = router;
