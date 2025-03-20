const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Clinic = require('../models/Clinic');

// @desc Get all appointments (Admin use)
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate({ path: 'patient_id', select: 'name email phone gender' }) 
      .populate({ path: 'doctor_id', select: 'name specialization email' }) 
      .populate({ path: 'clinic_id', select: 'clinic_name city full_address' }) 
      .populate({ path: 'schedule_id', select: 'day_of_week start_time end_time' });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error: error.message });
  }
};

// @desc Get appointment by ID
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate({ path: 'patient_id', select: 'name email phone gender' }) 
      .populate({ path: 'doctor_id', select: 'name specialization email' }) 
      .populate({ path: 'clinic_id', select: 'clinic_name city full_address' }) 
      .populate({ path: 'schedule_id', select: 'day_of_week start_time end_time' });

    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointment', error: error.message });
  }
};

// @desc Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { patient_id, doctor_id, clinic_id, schedule_id, appointment_date, time_slot, status } = req.body;

    if (!patient_id || !doctor_id || !clinic_id || !schedule_id || !appointment_date || !time_slot) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const appointment = new Appointment({
      patient_id,
      doctor_id,
      clinic_id,
      schedule_id,
      appointment_date,
      time_slot,
      booking_status: status || 'Pending',
      payment_status: 'Pending'
    });

    await appointment.save();
    res.status(201).json({ message: 'Appointment created successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Creation failed', error: error.message });
  }
};

// @desc Update appointment
exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body; // যে যে ফিল্ড আপডেট করতে হবে, সেগুলো এখানে থাকবে

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      updateFields,
      { new: true }
    ).populate('patient_id doctor_id clinic_id schedule_id'); // সম্পর্কিত ডেটা লোড করবে

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({
      message: 'Appointment updated successfully',
      appointment: updatedAppointment
    });

  } catch (error) {
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
};

// @desc Cancel appointment
exports.cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const cancelledAppointment = await Appointment.findByIdAndUpdate(
      id,
      { booking_status: 'Cancelled' },
      { new: true }
    );

    if (!cancelledAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({
      message: 'Appointment cancelled successfully',
      appointment: cancelledAppointment
    });

  } catch (error) {
    res.status(500).json({ message: 'Error cancelling appointment', error: error.message });
  }
};

// @desc Reschedule appointment
exports.rescheduleAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { appointment_date, time_slot } = req.body;

    const rescheduledAppointment = await Appointment.findByIdAndUpdate(
      id,
      { appointment_date, time_slot },
      { new: true }
    );

    if (!rescheduledAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({
      message: 'Appointment rescheduled successfully',
      appointment: rescheduledAppointment
    });

  } catch (error) {
    res.status(500).json({ message: 'Error rescheduling appointment', error: error.message });
  }
};

// @desc Delete appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!deletedAppointment) return res.status(404).json({ message: 'Appointment not found' });

    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Deletion failed', error: error.message });
  }
};

// @desc Get all appointments for a specific doctor (Doctor Dashboard)
exports.getAppointmentsByDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const appointments = await Appointment.find({ doctor_id: doctorId })
      .populate({ path: 'patient_id', select: 'name email phone' }) 
      .populate({ path: 'clinic_id', select: 'clinic_name city full_address' }) 
      .populate({ path: 'schedule_id', select: 'day_of_week start_time end_time' });

    const formattedAppointments = appointments.map((appt) => ({
      id: appt._id,
      patient_name: appt.patient_id?.name || 'Unknown',
      patient_email: appt.patient_id?.email || 'Unknown',
      patient_phone: appt.patient_id?.phone || 'Unknown',
      clinic_name: appt.clinic_id?.clinic_name || 'Unknown',
      city: appt.clinic_id?.city || 'Unknown',
      full_address: appt.clinic_id?.full_address || 'Unknown',
      date: appt.appointment_date,
      time: appt.time_slot,
      status: appt.booking_status,
      duration: appt.duration || 15
    }));

    res.status(200).json(formattedAppointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments by doctor', error: error.message });
  }
};
