import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SimpleAdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [loading, setLoading] = useState(false);

  const API_BASE = 'http://localhost:5000/api/v1';

  useEffect(() => {
    fetchDoctors();
    fetchAppointments();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${API_BASE}/doctormaster/active`);
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
    }
  };

  const fetchAppointments = async (doctorId = '') => {
    setLoading(true);
    try {
      const url = doctorId 
        ? `${API_BASE}/appointments?doctor_id=${doctorId}`
        : `${API_BASE}/appointments`;
      
      const response = await axios.get(url);
      if (response.data.success) {
        setAppointments(response.data.appointments);
      }
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    }
    setLoading(false);
  };

  const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      const response = await axios.put(`${API_BASE}/appointments/${appointmentId}/status`, { status });
      if (response.data.success) {
        fetchAppointments(selectedDoctor);
        alert(`Appointment ${status} successfully`);
      }
    } catch (error) {
      alert('Failed to update appointment status');
    }
  };

  const stats = {
    total: appointments.length,
    accepted: appointments.filter(apt => apt.status === 'accepted').length,
    cancelled: appointments.filter(apt => apt.status === 'cancelled').length,
    pending: appointments.filter(apt => !apt.status || apt.status === 'pending').length
  };

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#f8f9fa'}}>
      {/* Header */}
      <div className="bg-white shadow-sm border-bottom">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center py-3">
            <h1 className="h3 fw-bold text-dark mb-0">Admin Dashboard</h1>
            <div className="small text-muted">Appointment Management System</div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-4">
        {/* Stats Cards */}
        <div className="row mb-4">
          <div className="col-md-3 mb-3">
            <div className="card bg-primary text-white">
              <div className="card-body text-center">
                <h4 className="fw-bold">{stats.total}</h4>
                <p className="mb-0">Total Appointments</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card bg-success text-white">
              <div className="card-body text-center">
                <h4 className="fw-bold">{stats.accepted}</h4>
                <p className="mb-0">Accepted</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card bg-warning text-white">
              <div className="card-body text-center">
                <h4 className="fw-bold">{stats.pending}</h4>
                <p className="mb-0">Pending</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card bg-danger text-white">
              <div className="card-body text-center">
                <h4 className="fw-bold">{stats.cancelled}</h4>
                <p className="mb-0">Cancelled</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="card mb-4">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h5 className="mb-0">Appointments Overview</h5>
              </div>
              <div className="col-md-6">
                <div className="d-flex gap-2">
                  <select
                    value={selectedDoctor}
                    onChange={(e) => {
                      setSelectedDoctor(e.target.value);
                      fetchAppointments(e.target.value);
                    }}
                    className="form-select"
                  >
                    <option value="">All Doctors</option>
                    {doctors.map(doctor => (
                      <option key={doctor.DoctorId} value={doctor.DoctorId}>
                        Dr. {doctor.Doctor}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => fetchAppointments(selectedDoctor)}
                    className="btn btn-primary"
                  >
                    Refresh
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="card">
          <div className="card-body">
            {loading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading appointments...</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Patient</th>
                      <th>Doctor</th>
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
                        <td colSpan="8" className="text-center py-4 text-muted">
                          No appointments found
                        </td>
                      </tr>
                    ) : (
                      appointments.map((appointment) => (
                        <tr key={appointment.id}>
                          <td>#{appointment.id}</td>
                          <td className="fw-medium">{appointment.patient_name}</td>
                          <td>Dr. {appointment.doctor_name}</td>
                          <td>
                            <div>{new Date(appointment.date).toLocaleDateString()}</div>
                            <small className="text-muted">{appointment.time}</small>
                          </td>
                          <td>
                            <span className="badge bg-primary">{appointment.appointment_type}</span>
                          </td>
                          <td>
                            <div style={{maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis'}}>
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
                            <div className="d-flex gap-1">
                              {appointment.status !== 'accepted' && (
                                <button
                                  onClick={() => updateAppointmentStatus(appointment.id, 'accepted')}
                                  className="btn btn-success btn-sm"
                                >
                                  Accept
                                </button>
                              )}
                              {appointment.status !== 'cancelled' && (
                                <button
                                  onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                                  className="btn btn-danger btn-sm"
                                >
                                  Cancel
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleAdminDashboard;