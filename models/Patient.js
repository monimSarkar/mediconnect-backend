// models/Patient.js
const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    required: true, // ✅ Email এখন Required
    unique: true // ✅ Email Unique
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true, // ✅ Password Required
    select: true // ✅ Password MongoDB থেকে Fetch হবে
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other']
  },
  date_of_birth: Date,
  age: Number,
  weight: Number,
  marital_status: {
    type: String,
    enum: ['Married', 'Unmarried', 'Other']
  },
  address: String,
  previous_appointments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  }],
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Patient', PatientSchema);
