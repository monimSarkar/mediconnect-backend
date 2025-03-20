// routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// ============================
// Admin & System-wide Routes
// ============================

// @route   GET /api/appointments
// @desc    Get all appointments (Admin use)
router.get('/', appointmentController.getAllAppointments);

// @route   GET /api/appointments/:id
// @desc    Get appointment by ID
router.get('/:id', appointmentController.getAppointmentById);

// @route   POST /api/appointments
// @desc    Create new appointment
router.post('/', appointmentController.createAppointment);

// @route   PUT /api/appointments/:id
// @desc    Update appointment
router.put('/:id', appointmentController.updateAppointment);
router.put('/update/:id', appointmentController.updateAppointment);
router.put('/cancel/:id', appointmentController.cancelAppointment);
router.put('/reschedule/:id', appointmentController.rescheduleAppointment);

// @route   DELETE /api/appointments/:id
// @desc    Delete appointment
router.delete('/:id', appointmentController.deleteAppointment);

// ============================
// Doctor Dashboard Routes
// ============================

// @route   GET /api/appointments/doctor/:id
// @desc    Get appointments for a specific doctor
router.get('/doctor/:id', appointmentController.getAppointmentsByDoctor);

module.exports = router;
