import { useState, useEffect } from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import Breadcrumb from "../../masterLayout/Breadcrumb";
import axiosInstance from "../../axiosInstance";
import { useParams } from "react-router-dom";

const PatientAmbulanceBookings = () => {
  const { id } = useParams();
  const [bookings, setBookings] = useState([]);
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPatient();
      fetchBookings();
    }
  }, [id]);

  const fetchPatient = async () => {
    try {
      const response = await axiosInstance.get(`/patient/profile/${id}`);
      if (response.data && response.data.patient) {
        setPatient(response.data.patient);
      }
    } catch (error) {
      console.error('Error fetching patient:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/patient/ambulance-bookings/${id}`);
      if (response.data.success) {
        setBookings(response.data.bookings);
      }
    } catch (error) {
      console.error('Error fetching ambulance bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="badge bg-warning">Pending</span>;
      case 'accepted':
        return <span className="badge bg-primary">Accepted</span>;
      case 'completed':
        return <span className="badge bg-success">Completed</span>;
      case 'cancelled':
        return <span className="badge bg-danger">Cancelled</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Patient Ambulance Bookings" />
      <div className="container-fluid py-4">
        {patient && (
          <div className="card shadow border-0 rounded-4 mb-4">
            <div className="card-header border-bottom">
              <h5 className="mb-0">👤 Patient Information</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Name:</strong> {patient.fullName}</p>
                  <p><strong>Email:</strong> {patient.email}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Phone:</strong> {patient.mobileNo}</p>
                  {patient.bloodGroup && <p><strong>Blood Group:</strong> {patient.bloodGroup}</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="card shadow border-0 rounded-4">
          <div className="card-header border-bottom">
            <h5 className="mb-0">🚑 Ambulance Bookings</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive" style={{ maxHeight: "60vh", overflowY: "auto" }}>
              <table className="table table-bordered table-sm table-striped table-hover align-middle">
                <thead className="table-primary sticky-top">
                  <tr>
                    <th>ID</th>
                    <th>Ambulance</th>
                    <th>Pickup Area</th>
                    <th>Destination Area</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="8" className="text-center py-4">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : bookings.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-4">No ambulance bookings found</td>
                    </tr>
                  ) : (
                    bookings.map((booking) => (
                      <tr key={booking.id}>
                        <td>{booking.id}</td>
                        <td>{booking.ambulance_name || `Ambulance #${booking.ambulance_id}`}</td>
                        <td>
                          <div>{booking.pickup_area}</div>
                          <small className="text-muted">{booking.pickup_address}</small>
                        </td>
                        <td>
                          <div>{booking.destination_area}</div>
                          <small className="text-muted">{booking.destination_address}</small>
                        </td>
                        <td>{booking.name}</td>
                        <td>{booking.phone_number}</td>
                        <td>{getStatusBadge(booking.status)}</td>
                        <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default PatientAmbulanceBookings;