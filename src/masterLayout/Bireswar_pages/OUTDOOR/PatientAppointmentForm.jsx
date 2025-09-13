import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientAppointmentForm = () => {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    doctor_id: '',
    appointment_type: 'online',
    date: '',
    time: '',
    problem: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Replace with actual patient_id from auth/session in real app
  const patient_id = 1;

  useEffect(() => {
    axios.get('/doctormaster/active').then(res => setDoctors(res.data.data || []));
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      await axios.post('/appointments', { ...form, patient_id });
      setSuccess('Appointment requested successfully!');
      setForm({ doctor_id: '', appointment_type: 'online', date: '', time: '', problem: '' });
    } catch (err) {
      setError('Failed to request appointment.');
    }
  };

  return (
    <div className="container py-4">
      <h4>Book Appointment</h4>
      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Doctor</label>
          <select name="doctor_id" value={form.doctor_id} onChange={handleChange} className="form-select" required>
            <option value="">Select Doctor</option>
            {doctors.map(d => <option key={d.DoctorId} value={d.DoctorId}>{d.Doctor}</option>)}
          </select>
        </div>
        <div className="mb-3">
          <label>Appointment Type</label>
          <select name="appointment_type" value={form.appointment_type} onChange={handleChange} className="form-select">
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Date</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Time (e.g. 10:00 AM)</label>
          <input type="text" name="time" value={form.time} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Problem (short description)</label>
          <input type="text" name="problem" value={form.problem} onChange={handleChange} className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Book Appointment</button>
      </form>
    </div>
  );
};

export default PatientAppointmentForm;
