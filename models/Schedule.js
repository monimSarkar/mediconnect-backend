// models/Schedule.js
const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  clinic_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clinic',
    required: true
  },
  day_of_week: {
    type: String, // Example: 'Sunday', 'Monday'
    required: true
  },
  start_time: {
    type: String, // Format: '09:00 AM'
    required: true
  },
  end_time: {
    type: String, // Format: '01:00 PM'
    required: true
  },
  slot_duration: {
    type: Number, // in minutes (e.g., 10, 15, 30)
    required: true
  },
  location_note: String,
  is_active: {
    type: Boolean,
    default: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
