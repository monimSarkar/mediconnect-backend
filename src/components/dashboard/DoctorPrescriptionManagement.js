// components/dashboard/DoctorPrescriptionManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorPrescriptionManagement = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [newPrescription, setNewPrescription] = useState({
    patient: '',
    diagnosis: '',
    medications: '',
    advice: ''
  });

  // Fetch prescriptions for the logged-in doctor (Replace doctorId dynamically later)
  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const doctorId = 'YOUR_DOCTOR_ID'; // Replace dynamically using auth context/token
        const res = await axios.get(`/api/prescriptions/doctor/${doctorId}`);
        setPrescriptions(res.data);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
    };
    fetchPrescriptions();
  }, []);

  const handleChange = (e) => {
    setNewPrescription({ ...newPrescription, [e.target.name]: e.target.value });
  };

  const handleAddPrescription = async () => {
    try {
      const doctorId = 'YOUR_DOCTOR_ID'; // Replace dynamically
      const payload = {
        ...newPrescription,
        medications: newPrescription.medications.split(',').map(m => m.trim()),
        doctor_id: doctorId
      };
      const res = await axios.post('/api/prescriptions', payload);
      setPrescriptions([res.data.prescription, ...prescriptions]);
      setNewPrescription({ patient: '', diagnosis: '', medications: '', advice: '' });
    } catch (error) {
      console.error('Error adding prescription:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Prescription Management</h2>

      {/* Add New Prescription */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h3 className="text-lg font-semibold">Write Prescription</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="patient" value={newPrescription.patient} onChange={handleChange} className="input" placeholder="Patient Name" />
          <input name="diagnosis" value={newPrescription.diagnosis} onChange={handleChange} className="input" placeholder="Diagnosis" />
          <textarea name="medications" value={newPrescription.medications} onChange={handleChange} className="input" placeholder="Medications (comma separated)" />
          <textarea name="advice" value={newPrescription.advice} onChange={handleChange} className="input" placeholder="Advice/Notes" />
        </div>
        <button onClick={handleAddPrescription} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl">Save Prescription</button>
      </div>

      {/* Prescription List */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Previous Prescriptions</h3>
        <ul className="space-y-4">
          {prescriptions.map((p) => (
            <li key={p._id} className="border p-4 rounded-lg">
              <p className="text-blue-700 font-bold">Patient: {p.patient}</p>
              <p className="text-gray-600">Date: {p.date?.split('T')[0]}</p>
              <p className="text-gray-700">Diagnosis: {p.diagnosis}</p>
              <p className="text-gray-700">Medications:</p>
              <ul className="list-disc ml-5 text-sm text-gray-700">
                {p.medications.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
              <p className="text-gray-700">Advice: {p.advice}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DoctorPrescriptionManagement;
