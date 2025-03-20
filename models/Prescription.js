// models/Prescription.js
const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema({
  appointment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true
  },
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  symptoms: [String],
  diagnosis: String,
  advice: String,
  medications: [
    {
      name: String,
      dosage: String,
      duration: String,
      instructions: String
    }
  ],
  follow_up_date: Date,
  additional_notes: String,
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Prescription', PrescriptionSchema);
