import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Alert, Container, Table, Spinner } from 'react-bootstrap';
import axiosInstance from '../../../axiosInstance';




const DoctorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [apptLoading, setApptLoading] = useState(false);
  const [apptError, setApptError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await axiosInstance.post('/doctormaster/login', { email, password });
      if (response.data && response.data.success) {
        setDoctor(response.data.data);
      } else {
        setError('Invalid credentials or inactive doctor');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch appointments after login
  useEffect(() => {
    const fetchAppointments = async () => {
      if (doctor && doctor.DoctorId) {
        setApptLoading(true);
        setApptError('');
        try {
          const res = await axiosInstance.get(`/appointments/doctor/${doctor.DoctorId}`);
          setAppointments(res.data.data || []);
        } catch (err) {
          setApptError('Failed to load appointments');
        } finally {
          setApptLoading(false);
        }
      }
    };
    fetchAppointments();
  }, [doctor]);

  // Handle appointment status update
  const handleStatus = async (appointmentId, status) => {
    try {
      await axiosInstance.put(`/appointments/${appointmentId}/status`, { status });
      setAppointments(appts => appts.map(a => a.id === appointmentId ? { ...a, status } : a));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  if (doctor) {
    return (
      <Container className="py-5">
        <Card className="mx-auto" style={{ maxWidth: 500 }}>
          <Card.Body>
            <Card.Title>Doctor Profile</Card.Title>
            <div><b>Name:</b> {doctor.Doctor}</div>
            <div><b>Email:</b> {doctor.Email}</div>
            <div><b>Qualification:</b> {doctor.Qualification}</div>
            <div><b>Phone:</b> {doctor.Phone}</div>
            <div><b>SpecialityId:</b> {doctor.SpecialityId}</div>
            <div><b>Status:</b> {doctor.Status}</div>
            <Button className="mt-3 mb-3" onClick={() => setDoctor(null)}>Logout</Button>
            <h5 className="mt-4">New Appointments</h5>
            {apptLoading ? <Spinner animation="border" /> : null}
            {apptError && <Alert variant="danger">{apptError}</Alert>}
            <Table striped bordered hover size="sm" className="mt-2">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length === 0 && !apptLoading ? (
                  <tr><td colSpan={4}>No new appointments</td></tr>
                ) : appointments.map(appt => (
                  <tr key={appt.id}>
                    <td>{appt.patientName}</td>
                    <td>{appt.date}</td>
                    <td>{appt.status}</td>
                    <td>
                      <Button size="sm" variant="success" className="me-1" onClick={() => handleStatus(appt.id, 'approved')}>Approve</Button>
                      <Button size="sm" variant="primary" className="me-1" onClick={() => handleStatus(appt.id, 'accepted')}>Accept</Button>
                      <Button size="sm" variant="danger" onClick={() => handleStatus(appt.id, 'cancelled')}>Cancel</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Card className="mx-auto" style={{ maxWidth: 400 }}>
        <Card.Body>
          <Card.Title>Doctor Login</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DoctorLogin;
