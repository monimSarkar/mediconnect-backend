// controllers/scheduleController.js
const Schedule = require('../models/Schedule');

// @desc Get all schedules
exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find().populate('doctor_id clinic_id');
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schedules', error: error.message });
  }
};

// @desc Get schedule by ID
exports.getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id).populate('doctor_id clinic_id');
    if (!schedule) return res.status(404).json({ message: 'Schedule not found' });
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schedule', error: error.message });
  }
};

// @desc Create a new schedule
exports.createSchedule = async (req, res) => {
  try {
    const schedule = new Schedule(req.body);
    await schedule.save();
    res.status(201).json({ message: 'Schedule created successfully', schedule });
  } catch (error) {
    res.status(500).json({ message: 'Creation failed', error: error.message });
  }
};

// @desc Update schedule
exports.updateSchedule = async (req, res) => {
  try {
    const updatedSchedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSchedule) return res.status(404).json({ message: 'Schedule not found' });
    res.status(200).json({ message: 'Schedule updated successfully', schedule: updatedSchedule });
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
};

// @desc Delete schedule
exports.deleteSchedule = async (req, res) => {
  try {
    const deletedSchedule = await Schedule.findByIdAndDelete(req.params.id);
    if (!deletedSchedule) return res.status(404).json({ message: 'Schedule not found' });
    res.status(200).json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Deletion failed', error: error.message });
  }
};
