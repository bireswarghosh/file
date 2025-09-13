import { useState, useEffect } from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import Breadcrumb from "../../masterLayout/Breadcrumb";
import axiosInstance from "../../axiosInstance";

const DiagnosticBookingList = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    patient_id: "",
    test_name: "",
    test_date: "",
    test_time: "",
    status: "pending"
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/diagnostic/bookings');
      setBookings(response.data.data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setFormData({
      patient_id: "",
      test_name: "",
      test_date: "",
      test_time: "",
      status: "pending"
    });
    setSelectedBooking(null);
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      let response;
      if (isEditMode) {
        response = await axiosInstance.put(`/diagnostic/booking/${selectedBooking.id}/status`, { status: formData.status });
      } else {
        response = await axiosInstance.post('/diagnostic/booking', formData);
      }
      
      if (response.data.success) {
        fetchBookings();
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error saving booking:', error);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return <span className="badge bg-warning">Pending</span>;
      case 'confirmed': return <span className="badge bg-primary">Confirmed</span>;
      case 'completed': return <span className="badge bg-success">Completed</span>;
      case 'cancelled': return <span className="badge bg-danger">Cancelled</span>;
      default: return <span className="badge bg-secondary">{status}</span>;
    }
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Diagnostic Bookings" />
      <div className="container-fluid py-4">
        <div className="card shadow border-0 rounded-4">
          <div className="card-header border-bottom d-flex justify-content-between align-items-center">
            <h5 className="mb-0">🧪 Diagnostic Bookings</h5>
            <button
              className="btn btn-gradient-primary px-4 py-2 rounded-pill"
              onClick={handleAddNew}
              style={{
                background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
                border: "none",
                color: "white"
              }}
            >
              ✨ NEW BOOKING
            </button>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-striped table-hover">
                <thead className="table-primary">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Patient ID</th>
                    <th>Test Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan="8" className="text-center">Loading...</td></tr>
                  ) : !bookings || bookings.length === 0 ? (
                    <tr><td colSpan="8" className="text-center">No bookings found</td></tr>
                  ) : (
                    Array.isArray(bookings) && bookings.map(booking => (
                      <tr key={booking.id}>
                        <td>{booking.id}</td>
                        <td>{booking.name}</td>
                        <td>{booking.patient_id}</td>
                        <td>{booking.test_name}</td>
                        <td>{booking.appointment_date ? new Date(booking.appointment_date).toLocaleDateString() : 'N/A'}</td>
                        <td>{booking.appointment_time ? new Date(booking.appointment_time).toLocaleTimeString() : 'N/A'}</td>
                        <td>{getStatusBadge(booking.status)}</td>
                        <td>
                          <button 
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => handleEdit(booking)}
                          >
                            Update Status
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {showModal && (
          <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header" style={{ background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)", color: "white" }}>
                  <h5 className="modal-title">
                    🧪 {isEditMode ? "Update Booking Status" : "New Diagnostic Booking"}
                  </h5>
                  <button className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                </div>
                
                <div className="modal-body">
                  <div className="row g-3">
                    {!isEditMode && (
                      <>
                        <div className="col-md-6">
                          <label className="form-label">Patient ID</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.patient_id}
                            onChange={(e) => handleInputChange("patient_id", e.target.value)}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Test Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.test_name}
                            onChange={(e) => handleInputChange("test_name", e.target.value)}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Test Date</label>
                          <input
                            type="date"
                            className="form-control"
                            value={formData.test_date}
                            onChange={(e) => handleInputChange("test_date", e.target.value)}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Test Time</label>
                          <input
                            type="time"
                            className="form-control"
                            value={formData.test_time}
                            onChange={(e) => handleInputChange("test_time", e.target.value)}
                          />
                        </div>
                      </>
                    )}
                    
                    <div className="col-12">
                      <label className="form-label">Status</label>
                      <select
                        className="form-select"
                        value={formData.status}
                        onChange={(e) => handleInputChange("status", e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button className="btn btn-primary" onClick={handleSave}>
                    {isEditMode ? "Update Status" : "Create Booking"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MasterLayout>
  );
};

export default DiagnosticBookingList;