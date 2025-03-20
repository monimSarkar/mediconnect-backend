// controllers/clinicController.js
const Clinic = require('../models/Clinic');

// @desc Get all clinics
exports.getAllClinics = async (req, res) => {
  try {
    const clinics = await Clinic.find().populate('doctor_id');
    res.status(200).json(clinics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clinics', error: error.message });
  }
};

// @desc Get clinic by ID
exports.getClinicById = async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.params.id).populate('doctor_id');
    if (!clinic) return res.status(404).json({ message: 'Clinic not found' });
    res.status(200).json(clinic);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clinic', error: error.message });
  }
};

// @desc Create a new clinic
exports.createClinic = async (req, res) => {
  try {
    const clinic = new Clinic(req.body);
    await clinic.save();
    res.status(201).json({ message: 'Clinic created successfully', clinic });
  } catch (error) {
    res.status(500).json({ message: 'Creation failed', error: error.message });
  }
};

// @desc Update clinic details
exports.updateClinic = async (req, res) => {
  try {
    const updatedClinic = await Clinic.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedClinic) return res.status(404).json({ message: 'Clinic not found' });
    res.status(200).json({ message: 'Clinic updated successfully', clinic: updatedClinic });
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
};

// @desc Delete clinic
exports.deleteClinic = async (req, res) => {
  try {
    const deletedClinic = await Clinic.findByIdAndDelete(req.params.id);
    if (!deletedClinic) return res.status(404).json({ message: 'Clinic not found' });
    res.status(200).json({ message: 'Clinic deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Deletion failed', error: error.message });
  }
};
