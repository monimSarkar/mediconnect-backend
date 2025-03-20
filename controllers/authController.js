const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

// @desc Register a new doctor
exports.register = async (req, res) => {
  try {
    const { name, email, phone, password, specialization } = req.body;

    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDoctor = new Doctor({
      name,
      email,
      phone,
      password: hashedPassword,
      specialization
    });

    await newDoctor.save();

    res.status(201).json({ message: 'Doctor registered successfully', doctor: newDoctor });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

// @desc Login a doctor
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ email }).select('+password'); // Ensure password is retrieved
    if (!doctor) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      message: 'Login successful',
      token,
      doctor: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        phone: doctor.phone,
        specialization: doctor.specialization
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

// @desc Register a new patient
exports.registerPatient = async (req, res) => {
  try {
    const { name, email, phone, password, gender, date_of_birth, address } = req.body;

    // Check if patient already exists
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) return res.status(400).json({ message: 'Email already registered' });

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new patient
    const newPatient = new Patient({
      name,
      email,
      phone,
      password: hashedPassword, // ✅ Ensure password is stored
      gender,
      date_of_birth,
      address
    });

    await newPatient.save();

    // Generate JWT Token
    const token = jwt.sign({ id: newPatient._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ message: 'Patient registered successfully', token, patient: newPatient });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

// @desc Login a patient
exports.loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if patient exists
    const patient = await Patient.findOne({ email }).select('+password'); // ✅ Ensure password is retrieved
    if (!patient) return res.status(400).json({ message: 'Invalid credentials' });

    // Validate password exists
    if (!patient.password) {
      return res.status(500).json({ message: 'Error: Password field is missing in database' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT Token
    const token = jwt.sign({ id: patient._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      message: 'Login successful',
      token,
      patient: {
        id: patient._id,
        name: patient.name,
        email: patient.email,
        phone: patient.phone,
        gender: patient.gender
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};
