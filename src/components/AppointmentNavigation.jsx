import React from 'react';
import { Link } from 'react-router-dom';

const AppointmentNavigation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Hospital Management System
          </h1>
          <p className="text-xl text-gray-600">
            Choose your portal to access the system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Doctor Portal */}
          <Link to="/doctor-portal" className="group">
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Doctor Portal</h3>
                <p className="text-gray-600 mb-6">
                  Login as a doctor to view and manage your appointments, patient details, and accept/cancel appointments.
                </p>
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Features:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• View all appointments</li>
                    <li>• Accept/Cancel appointments</li>
                    <li>• Patient information</li>
                    <li>• Dashboard statistics</li>
                  </ul>
                </div>
                <div className="bg-blue-600 text-white py-3 px-6 rounded-lg font-medium group-hover:bg-blue-700 transition-colors">
                  Access Doctor Portal →
                </div>
              </div>
            </div>
          </Link>

          {/* Admin Dashboard */}
          <Link to="/admin-dashboard" className="group">
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Admin Dashboard</h3>
                <p className="text-gray-600 mb-6">
                  Administrative access to view all appointments, manage doctors, and get comprehensive system statistics.
                </p>
                <div className="bg-green-50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-green-800 mb-2">Features:</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• All appointments overview</li>
                    <li>• Filter by doctor</li>
                    <li>• System statistics</li>
                    <li>• Appointment management</li>
                  </ul>
                </div>
                <div className="bg-green-600 text-white py-3 px-6 rounded-lg font-medium group-hover:bg-green-700 transition-colors">
                  Access Admin Dashboard →
                </div>
              </div>
            </div>
          </Link>

          {/* Active Doctors */}
          <Link to="/active-doctors" className="group">
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                  <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Active Doctors</h3>
                <p className="text-gray-600 mb-6">
                  View all active doctors in the system with their details, qualifications, and contact information.
                </p>
                <div className="bg-purple-50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Features:</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Active doctors list</li>
                    <li>• Doctor details</li>
                    <li>• Search functionality</li>
                    <li>• Contact information</li>
                  </ul>
                </div>
                <div className="bg-purple-600 text-white py-3 px-6 rounded-lg font-medium group-hover:bg-purple-700 transition-colors">
                  View Active Doctors →
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">System Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">🏥</div>
              <h3 className="text-lg font-semibold text-gray-800">Hospital Management</h3>
              <p className="text-gray-600 text-sm">Complete hospital management system</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-2">📅</div>
              <h3 className="text-lg font-semibold text-gray-800">Appointment System</h3>
              <p className="text-gray-600 text-sm">Efficient appointment booking & management</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">👨‍⚕️</div>
              <h3 className="text-lg font-semibold text-gray-800">Doctor Portal</h3>
              <p className="text-gray-600 text-sm">Dedicated portal for healthcare professionals</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-600">
          <p>&copy; 2024 Hospital Management System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentNavigation;