// components/dashboard/PatientProfileSettings.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PatientProfileSettings = () => {
  const [patient, setPatient] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    weight: '',
    gender: '',
    marital_status: '',
    address: '',
    emergency_contact: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const patientId = 'YOUR_PATIENT_ID'; // Replace dynamically later
        const res = await axios.get(`/api/patients/${patientId}`);
        setPatient(res.data);
        setFormData({ ...res.data });
      } catch (err) {
        console.error('Error loading profile:', err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const patientId = patient._id;
      const res = await axios.put(`/api/patients/${patientId}`, formData);
      setPatient(res.data.patient);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Update failed!');
    }
  };

  if (!patient) return <div>Loading profile...</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-6">
      <h2 className="text-xl font-semibold text-gray-700">Patient Profile Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="name" value={formData.name} onChange={handleChange} className="input" placeholder="Full Name" />
        <input name="email" value={formData.email} onChange={handleChange} className="input" placeholder="Email" disabled />
        <input name="phone" value={formData.phone} onChange={handleChange} className="input" placeholder="Phone Number" />
        <input name="age" value={formData.age} onChange={handleChange} className="input" placeholder="Age" />
        <input name="weight" value={formData.weight} onChange={handleChange} className="input" placeholder="Weight (kg)" />
        <select name="gender" value={formData.gender} onChange={handleChange} className="input">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <select name="marital_status" value={formData.marital_status} onChange={handleChange} className="input">
          <option value="">Marital Status</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Divorced">Divorced</option>
        </select>
        <input name="emergency_contact" value={formData.emergency_contact} onChange={handleChange} className="input" placeholder="Emergency Contact" />
        <textarea name="address" value={formData.address} onChange={handleChange} className="input" placeholder="Address" />
      </div>
      <button onClick={handleUpdate} className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-xl">Update Profile</button>
    </div>
  );
};

export default PatientProfileSettings;
