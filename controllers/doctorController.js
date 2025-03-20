// controllers/doctorController.js
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');

// @desc Get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('clinics schedules');
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctors', error: error.message });
  }
};

// @desc Get doctor by ID
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('clinics schedules');
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctor', error: error.message });
  }
};

// @desc Create new doctor
exports.createDoctor = async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);
    await newDoctor.save();
    res.status(201).json({ message: 'Doctor created successfully', doctor: newDoctor });
  } catch (error) {
    res.status(500).json({ message: 'Doctor creation failed', error: error.message });
  }
};

// @desc Update doctor
exports.updateDoctor = async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDoctor) return res.status(404).json({ message: 'Doctor not found' });
    res.status(200).json({ message: 'Doctor updated successfully', doctor: updatedDoctor });
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
};

// @desc Delete doctor
exports.deleteDoctor = async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!deletedDoctor) return res.status(404).json({ message: 'Doctor not found' });
    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Deletion failed', error: error.message });
  }
};

exports.getDoctorDashboard = async (req, res) => {
  try {
    const doctorId = req.params.id;

    // মোট অ্যাপয়েন্টমেন্ট সংখ্যা
    const totalAppointments = await Appointment.countDocuments({ doctor_id: doctorId });

    // পেন্ডিং ও কনফার্ম হওয়া অ্যাপয়েন্টমেন্ট সংখ্যা
    const pendingAppointments = await Appointment.countDocuments({ doctor_id: doctorId, booking_status: 'Pending' });
    const confirmedAppointments = await Appointment.countDocuments({ doctor_id: doctorId, booking_status: 'Confirmed' });

    // মোট সার্ভ করা রোগীর সংখ্যা
    const patientsServed = await Appointment.distinct('patient_id', { doctor_id: doctorId }).length;

    // মোট উপার্জন (প্রতিটি অ্যাপয়েন্টমেন্টের ফি ৩০০ টাকা ধরে)
    const totalEarnings = confirmedAppointments * 300;

    // সর্বশেষ ৫টি অ্যাপয়েন্টমেন্ট
    const latestAppointments = await Appointment.find({ doctor_id: doctorId })
      .populate({ path: 'patient_id', select: 'name' })
      .sort({ appointment_date: -1 })
      .limit(5);

    const formattedAppointments = latestAppointments.map(appt => ({
      appointment_id: appt._id,
      patient_name: appt.patient_id?.name || 'Unknown',
      appointment_date: appt.appointment_date,
      time_slot: appt.time_slot,
      status: appt.booking_status
    }));

    res.status(200).json({
      doctor_id: doctorId,
      total_appointments: totalAppointments,
      pending_appointments: pendingAppointments,
      confirmed_appointments: confirmedAppointments,
      patients_served: patientsServed,
      total_earnings: totalEarnings,
      latest_appointments: formattedAppointments
    });

  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctor dashboard data', error: error.message });
  }
};