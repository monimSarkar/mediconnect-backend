const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// @route   GET /api/patients
// @desc    Get all patients
router.get('/', patientController.getAllPatients);

// @route   GET /api/patients/:id
// @desc    Get single patient by ID
router.get('/:id', patientController.getPatientById);

// @route   POST /api/patients
// @desc    Create a new patient
router.post('/', patientController.createPatient);

// @route   PUT /api/patients/:id
// @desc    Update patient details
router.put('/:id', patientController.updatePatient);
router.get('/:id/dashboard', patientController.getPatientDashboard);

// @route   DELETE /api/patients/:id
// @desc    Delete a patient
router.delete('/:id', patientController.deletePatient);

module.exports = router;
