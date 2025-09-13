import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorPortal = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const API_BASE = 'http://localhost:5000/api/v1';

  // Check if doctor is already logged in
  useEffect(() => {
    const savedDoctor = localStorage.getItem('doctor');
    if (savedDoctor) {
      const doctorData = JSON.parse(savedDoctor);
      setDoctor(doctorData);
      setIsLoggedIn(true);
      fetchAppointments(doctorData.DoctorId);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE}/doctormaster/login`, loginData);
      if (response.data.success) {
        setDoctor(response.data.data);
        setIsLoggedIn(true);
        localStorage.setItem('doctor', JSON.stringify(response.data.data));
        fetchAppointments(response.data.data.DoctorId);
      }
    } catch (error) {
      alert('Login failed: ' + (error.response?.data?.message || 'Invalid credentials'));
    }
    setLoading(false);
  };

  const fetchAppointments = async (doctorId) => {
    try {
      const response = await axios.get(`${API_BASE}/appointments/doctor/${doctorId}`);
      if (response.data.success) {
        setAppointments(response.data.appointments);
      }
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    }
  };

  const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      const response = await axios.put(`${API_BASE}/appointments/${appointmentId}/status`, { status });
      if (response.data.success) {
        fetchAppointments(doctor.DoctorId);
        alert(`Appointment ${status} successfully`);
      }
    } catch (error) {
      alert('Failed to update appointment status');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('doctor');
    setIsLoggedIn(false);
    setDoctor(null);
    setAppointments([]);
  };

  if (!isLoggedIn) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{minHeight: '100vh', background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)'}}>
        <div className="card shadow-lg" style={{maxWidth: '400px', width: '100%'}}>
          <div className="card-body p-4">
            <div className="text-center mb-4">
              <h1 className="h3 fw-bold text-dark mb-2">Doctor Portal</h1>
              <p className="text-muted">Sign in to access your dashboard</p>
            </div>
            
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label fw-medium">Email</label>
                <input
                  type="email"
                  required
                  className="form-control"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  placeholder="Enter your email"
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label fw-medium">Password</label>
                <input
                  type="password"
                  required
                  className="form-control"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  placeholder="Enter your password"
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-100"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#f8f9fa'}}>
      {/* Header */}
      <div className="bg-white shadow-sm border-bottom">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center py-3">
            <div className="d-flex align-items-center">
              <h1 className="h3 fw-bold text-dark mb-0">Doctor Dashboard</h1>
            </div>
            <div className="d-flex align-items-center">
              <div className="text-end me-3">
                <p className="mb-0 fw-medium">Dr. {doctor.Doctor}</p>
                <p className="mb-0 text-muted small">{doctor.Qualification}</p>
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-danger"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-4">
        {/* Doctor Info Card */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <h3 className="h5 fw-semibold mb-3">Doctor Information</h3>
                <p className="text-muted mb-1"><strong>Name:</strong> Dr. {doctor.Doctor}</p>
                <p className="text-muted mb-1"><strong>Qualification:</strong> {doctor.Qualification}</p>
                <p className="text-muted mb-1"><strong>Phone:</strong> {doctor.Phone}</p>
                <p className="text-muted mb-1"><strong>Email:</strong> {doctor.Email}</p>
              </div>
              <div className="col-md-4">
                <h3 className="h5 fw-semibold mb-3">Statistics</h3>
                <div className="row">
                  <div className="col-6">
                    <div className="bg-primary bg-opacity-10 p-3 rounded">
                      <p className="h4 fw-bold text-primary mb-1">{appointments.length}</p>
                      <p className="small text-muted mb-0">Total Appointments</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="bg-success bg-opacity-10 p-3 rounded">
                      <p className="h4 fw-bold text-success mb-1">
                        {appointments.filter(apt => apt.status === 'accepted').length}
                      </p>
                      <p className="small text-muted mb-0">Accepted</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <h3 className="h5 fw-semibold mb-3">Quick Actions</h3>
                <button
                  onClick={() => fetchAppointments(doctor.DoctorId)}
                  className="btn btn-primary w-100"
                >
                  Refresh Appointments
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="card shadow-sm">
          <div className="card-header">
            <h2 className="h5 fw-semibold mb-0">My Appointments</h2>
          </div>
          
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Patient</th>
                  <th>Date & Time</th>
                  <th>Type</th>
                  <th>Problem</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">
                      No appointments found
                    </td>
                  </tr>
                ) : (
                  appointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td>
                        <div className="fw-medium">{appointment.patient_name}</div>
                      </td>
                      <td>
                        <div className="small">{appointment.date}</div>
                        <div className="small text-muted">{appointment.time}</div>
                      </td>
                      <td>
                        <span className="badge bg-primary">
                          {appointment.appointment_type}
                        </span>
                      </td>
                      <td>
                        <div className="small" style={{maxWidth: '200px'}}>
                          {appointment.problem || 'No problem specified'}
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${
                          appointment.status === 'accepted' ? 'bg-success' :
                          appointment.status === 'cancelled' ? 'bg-danger' :
                          'bg-warning'
                        }`}>
                          {appointment.status || 'pending'}
                        </span>
                      </td>
                      <td>
                        {appointment.status !== 'accepted' && appointment.status !== 'cancelled' && (
                          <div className="d-flex gap-1">
                            <button
                              onClick={() => updateAppointmentStatus(appointment.id, 'accepted')}
                              className="btn btn-success btn-sm"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                              className="btn btn-danger btn-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorPortal;