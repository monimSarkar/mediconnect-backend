// layouts/DoctorDashboardLayout.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const DoctorDashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 space-y-4">
        <div className="text-xl font-bold text-blue-700 mb-6">Doctor Dashboard</div>
        <nav className="flex flex-col gap-3">
          <Link to="overview" className="hover:text-blue-600">Overview</Link>
          <Link to="subscriptions" className="hover:text-blue-600">Subscription Info</Link>
          <Link to="clinics" className="hover:text-blue-600">Clinic Management</Link>
          <Link to="schedules" className="hover:text-blue-600">Schedule Management</Link>
          <Link to="appointments" className="hover:text-blue-600">Appointments</Link>
          <Link to="prescriptions" className="hover:text-blue-600">Prescriptions</Link>
          <Link to="settings" className="hover:text-blue-600">Profile Settings</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DoctorDashboardLayout;
