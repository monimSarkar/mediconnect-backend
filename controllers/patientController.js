// controllers/patientController.js
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');

// @desc Get all patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate('previous_appointments');
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients', error: error.message });
  }
};

// @desc Get single patient by ID
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate('previous_appointments');
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient', error: error.message });
  }
};

// @desc Create new patient (optional, if not through auth)
exports.createPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json({ message: 'Patient created successfully', patient });
  } catch (error) {
    res.status(500).json({ message: 'Creation failed', error: error.message });
  }
};

// @desc Update patient details
exports.updatePatient = async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPatient) return res.status(404).json({ message: 'Patient not found' });
    res.status(200).json({ message: 'Patient updated successfully', patient: updatedPatient });
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
};

// @desc Delete patient
exports.deletePatient = async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
    if (!deletedPatient) return res.status(404).json({ message: 'Patient not found' });
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Deletion failed', error: error.message });
  }
};

exports.getPatientDashboard = async (req, res) => {
  try {
    const patientId = req.params.id;

    // মোট অ্যাপয়েন্টমেন্ট সংখ্যা
    const totalAppointments = await Appointment.countDocuments({ patient_id: patientId });

    // আসন্ন (Upcoming) এবং সম্পন্ন (Completed) অ্যাপয়েন্টমেন্ট সংখ্যা
    const upcomingAppointments = await Appointment.countDocuments({ patient_id: patientId, booking_status: 'Pending' });
    const completedAppointments = await Appointment.countDocuments({ patient_id: patientId, booking_status: 'Confirmed' });

    // অ্যাপয়েন্টমেন্টের হিস্টোরি
    const appointmentHistory = await Appointment.find({ patient_id: patientId })
      .populate('doctor_id', 'name')
      .populate('clinic_id', 'clinic_name')
      .sort({ appointment_date: -1 });

    const formattedAppointments = appointmentHistory.map(appt => ({
      appointment_id: appt._id,
      doctor_name: appt.doctor_id?.name || 'Unknown',
      clinic_name: appt.clinic_id?.clinic_name || 'Unknown',
      appointment_date: appt.appointment_date,
      time_slot: appt.time_slot,
      status: appt.booking_status
    }));

    res.status(200).json({
      patient_id: patientId,
      total_appointments: totalAppointments,
      upcoming_appointments: upcomingAppointments,
      completed_appointments: completedAppointments,
      cancelled_appointments: totalAppointments - (upcomingAppointments + completedAppointments),
      appointment_history: formattedAppointments
    });

  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient dashboard data', error: error.message });
  }
};