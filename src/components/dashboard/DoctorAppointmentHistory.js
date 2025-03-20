// components/dashboard/DoctorAppointmentHistory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DoctorAppointmentHistory = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const doctorId = 'YOUR_DOCTOR_ID'; // Replace with dynamic doctor ID
        const res = await axios.get(`/api/appointments/doctor/${doctorId}`);
        setAppointments(res.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold text-gray-700 mb-2">Appointment History</h2>
      {appointments.length === 0 ? (
        <p className="text-gray-500">No appointments found.</p>
      ) : (
        <table className="w-full table-auto border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Patient</th>
              <th className="p-2 border">Clinic</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Time</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Prescription</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt._id}>
                <td className="p-2 border">{appt.patient_id?.name || '-'}</td>
                <td className="p-2 border">{appt.clinic_id?.name || '-'}</td>
                <td className="p-2 border">{new Date(appt.date).toLocaleDateString()}</td>
                <td className="p-2 border">{appt.time_slot}</td>
                <td className="p-2 border">{appt.status || 'Confirmed'}</td>
                <td className="p-2 border">
                  {appt.prescription_id ? (
                    <a
                      href={`/prescription/${appt.prescription_id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </a>
                  ) : (
                    'N/A'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DoctorAppointmentHistory;
