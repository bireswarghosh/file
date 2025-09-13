import React from 'react';
import { Link } from 'react-router-dom';

const SimpleAppointmentNavigation = () => {
  return (
    <div style={{minHeight: '100vh', background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)'}}>
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-dark mb-3">
            Hospital Management System
          </h1>
          <p className="lead text-muted">
            Choose your portal to access the system
          </p>
        </div>

        <div className="row g-4 mb-5">
          {/* Doctor Portal */}
          <div className="col-lg-4 col-md-6">
            <Link to="/doctor-portal" className="text-decoration-none">
              <div className="card h-100 shadow-lg border-0" style={{transition: 'transform 0.3s'}}>
                <div className="card-body p-4 text-center">
                  <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{width: '80px', height: '80px'}}>
                    <i className="fas fa-user-md fa-2x text-primary"></i>
                  </div>
                  <h3 className="h4 fw-bold text-dark mb-3">Doctor Portal</h3>
                  <p className="text-muted mb-4">
                    Login as a doctor to view and manage your appointments, patient details, and accept/cancel appointments.
                  </p>
                  <div className="bg-light rounded p-3 mb-4">
                    <h6 className="fw-semibold text-primary mb-2">Features:</h6>
                    <ul className="list-unstyled small text-muted mb-0">
                      <li>• View all appointments</li>
                      <li>• Accept/Cancel appointments</li>
                      <li>• Patient information</li>
                      <li>• Dashboard statistics</li>
                    </ul>
                  </div>
                  <div className="btn btn-primary w-100">
                    Access Doctor Portal →
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Admin Dashboard */}
          <div className="col-lg-4 col-md-6">
            <Link to="/admin-dashboard" className="text-decoration-none">
              <div className="card h-100 shadow-lg border-0" style={{transition: 'transform 0.3s'}}>
                <div className="card-body p-4 text-center">
                  <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{width: '80px', height: '80px'}}>
                    <i className="fas fa-chart-bar fa-2x text-success"></i>
                  </div>
                  <h3 className="h4 fw-bold text-dark mb-3">Admin Dashboard</h3>
                  <p className="text-muted mb-4">
                    Administrative access to view all appointments, manage doctors, and get comprehensive system statistics.
                  </p>
                  <div className="bg-light rounded p-3 mb-4">
                    <h6 className="fw-semibold text-success mb-2">Features:</h6>
                    <ul className="list-unstyled small text-muted mb-0">
                      <li>• All appointments overview</li>
                      <li>• Filter by doctor</li>
                      <li>• System statistics</li>
                      <li>• Appointment management</li>
                    </ul>
                  </div>
                  <div className="btn btn-success w-100">
                    Access Admin Dashboard →
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Active Doctors */}
          <div className="col-lg-4 col-md-6">
            <Link to="/active-doctors" className="text-decoration-none">
              <div className="card h-100 shadow-lg border-0" style={{transition: 'transform 0.3s'}}>
                <div className="card-body p-4 text-center">
                  <div className="bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{width: '80px', height: '80px'}}>
                    <i className="fas fa-users fa-2x text-info"></i>
                  </div>
                  <h3 className="h4 fw-bold text-dark mb-3">Active Doctors</h3>
                  <p className="text-muted mb-4">
                    View all active doctors in the system with their details, qualifications, and contact information.
                  </p>
                  <div className="bg-light rounded p-3 mb-4">
                    <h6 className="fw-semibold text-info mb-2">Features:</h6>
                    <ul className="list-unstyled small text-muted mb-0">
                      <li>• Active doctors list</li>
                      <li>• Doctor details</li>
                      <li>• Search functionality</li>
                      <li>• Contact information</li>
                    </ul>
                  </div>
                  <div className="btn btn-info w-100">
                    View Active Doctors →
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="card shadow-lg border-0 mb-5">
          <div className="card-body p-4">
            <h2 className="h4 fw-bold text-center mb-4">System Overview</h2>
            <div className="row text-center">
              <div className="col-md-4 mb-3">
                <div className="bg-primary bg-opacity-10 rounded p-4">
                  <div className="display-6 mb-2">🏥</div>
                  <h5 className="fw-semibold">Hospital Management</h5>
                  <p className="text-muted small mb-0">Complete hospital management system</p>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="bg-success bg-opacity-10 rounded p-4">
                  <div className="display-6 mb-2">📅</div>
                  <h5 className="fw-semibold">Appointment System</h5>
                  <p className="text-muted small mb-0">Efficient appointment booking & management</p>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="bg-info bg-opacity-10 rounded p-4">
                  <div className="display-6 mb-2">👨‍⚕️</div>
                  <h5 className="fw-semibold">Doctor Portal</h5>
                  <p className="text-muted small mb-0">Dedicated portal for healthcare professionals</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-muted">&copy; 2024 Hospital Management System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default SimpleAppointmentNavigation;