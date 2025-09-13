import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DoctorAppointments = ({ doctorId }) => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!doctorId) return;
    axios.get(`/appointments/doctor/${doctorId}`)
      .then(res => setAppointments(res.data.appointments || []))
      .catch(() => setError('Failed to load appointments.'));
  }, [doctorId]);

  const handleStatus = (id, status) => {
    axios.put(`/appointments/${id}/status`, { status })
      .then(() => setAppointments(apps => apps.map(a => a.id === id ? { ...a, status } : a)))
      .catch(() => setError('Failed to update status.'));
  };

  if (!doctorId) return <div className="alert alert-warning">No doctor selected.</div>;

  return (
    <div className="container py-4">
      <h4>My Appointments</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Date</th>
            <th>Time</th>
            <th>Type</th>
            <th>Problem</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(a => (
            <tr key={a.id}>
              <td>{a.patient_name}</td>
              <td>{a.date}</td>
              <td>{a.time}</td>
              <td>{a.appointment_type}</td>
              <td>{a.problem}</td>
              <td>{a.status}</td>
              <td>
                {a.status === 'pending' && (
                  <>
                    <button className="btn btn-success btn-sm me-2" onClick={() => handleStatus(a.id, 'accepted')}>Accept</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleStatus(a.id, 'cancelled')}>Cancel</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorAppointments;
