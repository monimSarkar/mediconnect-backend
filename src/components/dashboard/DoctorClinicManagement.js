// components/dashboard/DoctorClinicManagement.js
import React, { useState } from 'react';

const DoctorClinicManagement = () => {
  const [clinics, setClinics] = useState([
    { id: 1, name: 'Popular Diagnostic Center', city: 'Bogura', address: 'Sherpur Road', contact: '01700000000' },
    { id: 2, name: 'Ibn Sina Clinic', city: 'Bogura', address: 'Shatmatha', contact: '01800000000' },
  ]);

  const [newClinic, setNewClinic] = useState({ name: '', city: '', address: '', contact: '' });

  const handleChange = (e) => {
    setNewClinic({ ...newClinic, [e.target.name]: e.target.value });
  };

  const handleAddClinic = () => {
    const newEntry = { ...newClinic, id: clinics.length + 1 };
    setClinics([...clinics, newEntry]);
    setNewClinic({ name: '', city: '', address: '', contact: '' });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Clinic Management</h2>

      {/* Add Clinic Form */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h3 className="text-lg font-semibold">Add New Clinic</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" value={newClinic.name} onChange={handleChange} className="input" placeholder="Clinic Name" />
          <input name="city" value={newClinic.city} onChange={handleChange} className="input" placeholder="City" />
          <input name="address" value={newClinic.address} onChange={handleChange} className="input" placeholder="Address" />
          <input name="contact" value={newClinic.contact} onChange={handleChange} className="input" placeholder="Contact Number" />
        </div>
        <button onClick={handleAddClinic} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl">Add Clinic</button>
      </div>

      {/* Clinic List */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Your Clinics</h3>
        <ul className="space-y-2">
          {clinics.map(clinic => (
            <li key={clinic.id} className="border p-3 rounded-lg">
              <p className="font-bold text-blue-700">{clinic.name}</p>
              <p className="text-sm text-gray-600">{clinic.city}, {clinic.address}</p>
              <p className="text-sm text-gray-600">Contact: {clinic.contact}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DoctorClinicManagement;
