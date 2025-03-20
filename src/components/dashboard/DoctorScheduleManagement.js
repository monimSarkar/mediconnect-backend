// components/dashboard/DoctorScheduleManagement.js
import React, { useState } from 'react';

const DoctorScheduleManagement = () => {
  const [schedules, setSchedules] = useState([
    { id: 1, clinic: 'Popular Diagnostic Center', city: 'Bogura', date: '2025-03-25', start: '15:00', end: '17:00' },
    { id: 2, clinic: 'Ibn Sina Clinic', city: 'Bogura', date: '2025-03-25', start: '18:00', end: '20:00' },
  ]);

  const [newSchedule, setNewSchedule] = useState({ clinic: '', city: '', date: '', start: '', end: '' });

  const handleChange = (e) => {
    setNewSchedule({ ...newSchedule, [e.target.name]: e.target.value });
  };

  const handleAddSchedule = () => {
    const newEntry = { ...newSchedule, id: schedules.length + 1 };
    setSchedules([...schedules, newEntry]);
    setNewSchedule({ clinic: '', city: '', date: '', start: '', end: '' });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Schedule Management</h2>

      {/* Add Schedule Form */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h3 className="text-lg font-semibold">Add New Schedule</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="clinic" value={newSchedule.clinic} onChange={handleChange} className="input" placeholder="Clinic Name" />
          <input name="city" value={newSchedule.city} onChange={handleChange} className="input" placeholder="City" />
          <input type="date" name="date" value={newSchedule.date} onChange={handleChange} className="input" />
          <input type="time" name="start" value={newSchedule.start} onChange={handleChange} className="input" placeholder="Start Time" />
          <input type="time" name="end" value={newSchedule.end} onChange={handleChange} className="input" placeholder="End Time" />
        </div>
        <button onClick={handleAddSchedule} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl">Add Schedule</button>
      </div>

      {/* Schedule List */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Your Schedules</h3>
        <ul className="space-y-2">
          {schedules.map((schedule) => (
            <li key={schedule.id} className="border p-3 rounded-lg">
              <p className="font-bold text-blue-700">{schedule.clinic}</p>
              <p className="text-sm text-gray-600">{schedule.city}</p>
              <p className="text-sm text-gray-600">{schedule.date} | {schedule.start} - {schedule.end}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DoctorScheduleManagement;
