// components/dashboard/DoctorAppointmentCalendar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorAppointmentCalendar = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/appointments/doctor'); // Adjust API route accordingly
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchAppointments();
  }, []);

  const handleGoogleCalendarExport = (appointment) => {
    const startTime = `${appointment.date}T${appointment.time}:00`;
    const endTime = new Date(new Date(`${appointment.date}T${appointment.time}:00`).getTime() + appointment.duration * 60000).toISOString();
    const startTimeFormatted = new Date(startTime).toISOString();

    const googleCalendarURL = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Doctor+Appointment+with+${encodeURIComponent(appointment.patient)}&dates=${startTimeFormatted.replace(/[-:]/g, '').slice(0, 15)}Z/${endTime.replace(/[-:]/g, '').slice(0, 15)}Z&details=Clinic:+${encodeURIComponent(appointment.clinic)}&sf=true&output=xml`;

    window.open(googleCalendarURL, '_blank');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Appointment Calendar View</h2>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Appointments List</h3>
        <ul className="space-y-4">
          {appointments.map((app) => (
            <li key={app.id} className="border p-4 rounded-xl">
              <p className="text-blue-700 font-bold">{app.patient}</p>
              <p className="text-gray-600 text-sm">{app.date} at {app.time} | {app.clinic}</p>
              <button
                onClick={() => handleGoogleCalendarExport(app)}
                className="mt-2 text-sm px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Add to Google Calendar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DoctorAppointmentCalendar;
