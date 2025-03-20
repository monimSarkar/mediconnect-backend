// components/dashboard/DoctorDashboardOverview.js
import React from 'react';

const DoctorDashboardOverview = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Welcome to Your Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Subscription Status Card */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Subscription Status</h3>
          <p className="text-sm text-gray-500">Active Plan: <span className="text-blue-600 font-bold">Premium</span></p>
          <p className="text-sm text-gray-500">Valid Until: 30 June 2025</p>
        </div>

        {/* Upcoming Appointments Card */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Today's Appointments</h3>
          <p className="text-sm text-gray-500">You have <span className="font-bold">5</span> patients today.</p>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Quick Actions</h3>
          <ul className="text-sm text-gray-500 space-y-1">
            <li>- Add New Schedule</li>
            <li>- Add New Clinic</li>
            <li>- View Booking Calendar</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboardOverview;
