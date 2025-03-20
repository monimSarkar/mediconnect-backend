// models/Clinic.js
const mongoose = require('mongoose');

const ClinicSchema = new mongoose.Schema({
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  clinic_name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  full_address: {
    type: String,
    required: true // Doctor will input full address in one line
  },
  clinic_image: String,
  location_map_url: String,
  direction_note: String,
  is_active: {
    type: Boolean,
    default: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Clinic', ClinicSchema);
