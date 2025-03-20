// routes/scheduleRoutes.js
const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

// @route   GET /api/schedules
// @desc    Get all schedules
router.get('/', scheduleController.getAllSchedules);

// @route   GET /api/schedules/:id
// @desc    Get schedule by ID
router.get('/:id', scheduleController.getScheduleById);

// @route   POST /api/schedules
// @desc    Create a new schedule
router.post('/', scheduleController.createSchedule);

// @route   PUT /api/schedules/:id
// @desc    Update schedule
router.put('/:id', scheduleController.updateSchedule);

// @route   DELETE /api/schedules/:id
// @desc    Delete schedule
router.delete('/:id', scheduleController.deleteSchedule);

module.exports = router;
