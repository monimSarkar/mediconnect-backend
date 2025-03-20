// routes/clinicRoutes.js
const express = require('express');
const router = express.Router();
const clinicController = require('../controllers/clinicController');

// @route   GET /api/clinics
// @desc    Get all clinics
router.get('/', clinicController.getAllClinics);

// @route   GET /api/clinics/:id
// @desc    Get clinic by ID
router.get('/:id', clinicController.getClinicById);

// @route   POST /api/clinics
// @desc    Create a new clinic
router.post('/', clinicController.createClinic);

// @route   PUT /api/clinics/:id
// @desc    Update clinic
router.put('/:id', clinicController.updateClinic);

// @route   DELETE /api/clinics/:id
// @desc    Delete clinic
router.delete('/:id', clinicController.deleteClinic);

module.exports = router;
