// controllers/prescriptionController.js
const Prescription = require('../models/Prescription');

// ===========================
// Admin & Global CRUD APIs
// ===========================

// @desc Get all prescriptions (Admin use)
exports.getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find().populate('appointment_id doctor_id patient_id');
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching prescriptions', error: error.message });
  }
};

// @desc Get prescription by ID
exports.getPrescriptionById = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id).populate('appointment_id doctor_id patient_id');
    if (!prescription) return res.status(404).json({ message: 'Prescription not found' });
    res.status(200).json(prescription);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching prescription', error: error.message });
  }
};

// @desc Create new prescription
exports.createPrescription = async (req, res) => {
  try {
    const prescription = new Prescription(req.body);
    await prescription.save();
    res.status(201).json({ message: 'Prescription created successfully', prescription });
  } catch (error) {
    res.status(500).json({ message: 'Creation failed', error: error.message });
  }
};

// @desc Update prescription
exports.updatePrescription = async (req, res) => {
  try {
    const updatedPrescription = await Prescription.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPrescription) return res.status(404).json({ message: 'Prescription not found' });
    res.status(200).json({ message: 'Prescription updated successfully', prescription: updatedPrescription });
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
};

// @desc Delete prescription
exports.deletePrescription = async (req, res) => {
  try {
    const deletedPrescription = await Prescription.findByIdAndDelete(req.params.id);
    if (!deletedPrescription) return res.status(404).json({ message: 'Prescription not found' });
    res.status(200).json({ message: 'Prescription deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Deletion failed', error: error.message });
  }
};

// ===========================
// Doctor Dashboard Specific API
// ===========================

// @desc Get all prescriptions by specific doctor
exports.getPrescriptionsByDoctor = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ doctor_id: req.params.id })
      .sort({ createdAt: -1 })
      .populate('patient_id');
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctor prescriptions', error: error.message });
  }
};
