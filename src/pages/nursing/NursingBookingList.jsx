import { useState, useEffect } from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import Breadcrumb from "../../masterLayout/Breadcrumb";
import axiosInstance from "../../axiosInstance";

const NursingBookingList = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [nursingBookings, setNursingBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    patient_name: "",
    phone_number: "",
    address: "",
    nursing_type: "",
    start_date: "",
    end_date: "",
    hours_per_day: "",
    total_amount: "",
    advance_booking: "",
    transaction_id: "",
    status: "pending"
  });

  useEffect(() => {
    fetchNursingBookings();
  }, []);

  const fetchNursingBookings = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/nursing-bookings');
      if (response.data.success) {
        setNursingBookings(response.data.bookings || response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching nursing bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setFormData({
      patient_name: "",
      phone_number: "",
      address: "",
      nursing_type: "",
      start_date: "",
      end_date: "",
      hours_per_day: "",
      total_amount: "",
      status: "pending"
    });
    setSelectedBooking(null);
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (booking) => {
    setFormData({
      patient_name: booking.patient_name,
      phone_number: booking.phone_number,
      address: booking.address,
      nursing_type: booking.nursing_type,
      start_date: booking.start_date,
      end_date: booking.end_date,
      hours_per_day: booking.hours_per_day,
      total_amount: booking.total_amount,
      status: booking.status
    });
    setSelectedBooking(booking);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      let response;
      
      if (isEditMode) {
        response = await axiosInstance.put(`/nursing-bookings/${selectedBooking.id}`, formData);
      } else {
        response = await axiosInstance.post('/nursing-bookings', formData);
      }
      
      if (response.data.success) {
        fetchNursingBookings();
        setShowModal(false);
      } else {
        alert('Error saving nursing booking: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error saving nursing booking:', error);
      alert('Error saving nursing booking');
    }
  };

  const handleDelete = async (booking) => {
    if (window.confirm(`Are you sure you want to delete this nursing booking?`)) {
      try {
        const response = await axiosInstance.delete(`/nursing-bookings/${booking.id}`);
        if (response.data.success) {
          fetchNursingBookings();
        } else {
          alert('Error deleting nursing booking: ' + response.data.message);
        }
      } catch (error) {
        console.error('Error deleting nursing booking:', error);
        alert('Error deleting nursing booking');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
    setIsEditMode(false);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="badge bg-warning">Pending</span>;
      case 'confirmed':
        return <span className="badge bg-primary">Confirmed</span>;
      case 'in_progress':
        return <span className="badge bg-info">In Progress</span>;
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
      <Breadcrumb title="Nursing Booking Management" />
      <div className="container-fluid py-4">
        <div className="card shadow border-0 rounded-4">
          <div className="card-header border-bottom d-flex justify-content-between align-items-center">
            <h5 className="mb-0">👩‍⚕️ Nursing Booking Management</h5>
            <button
              className="btn btn-gradient-primary px-4 py-2 rounded-pill shadow-lg"
              onClick={handleAddNew}
              style={{
                background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
                border: "none",
                color: "white",
                fontWeight: "600",
                fontSize: "14px",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
              }}
            >
              ✨ NEW NURSING BOOKING
            </button>
          </div>

          <div className="card-body">
            <div className="table-responsive" style={{ maxHeight: "60vh", overflowY: "auto" }}>
              <table className="table table-bordered table-sm table-striped table-hover align-middle">
                <thead className="table-primary sticky-top">
                  <tr>
                    <th>ID</th>
                    <th>Patient Name</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Nursing Type</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Hours/Day</th>
                    <th>Amount</th>
                    <th>Advance</th>
                    <th>Transaction ID</th>
                    <th>Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="11" className="text-center py-4">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : nursingBookings.length === 0 ? (
                    <tr>
                      <td colSpan="11" className="text-center py-4">No nursing bookings found</td>
                    </tr>
                  ) : (
                    nursingBookings.map((booking) => (
                      <tr key={booking.id}>
                        <td>{booking.id}</td>
                        <td>{booking.patient_name}</td>
                        <td>{booking.phone_number}</td>
                        <td>{booking.address}</td>
                        <td>{booking.nursing_type}</td>
                        <td>{new Date(booking.start_date).toLocaleDateString()}</td>
                        <td>{new Date(booking.end_date).toLocaleDateString()}</td>
                        <td>{booking.hours_per_day}</td>
                        <td>₹{booking.total_amount}</td>
                        <td>₹{booking.advance_booking || 0}</td>
                        <td>{booking.transaction_id || 'N/A'}</td>
                        <td>{getStatusBadge(booking.status)}</td>
                        <td className="text-center">
                          <button 
                            className="btn btn-outline-primary btn-sm me-2" 
                            onClick={() => handleEdit(booking)}
                          >
                            Edit
                          </button>
                          <button 
                            className="btn btn-outline-danger btn-sm" 
                            onClick={() => handleDelete(booking)}
                          >
                            Delete
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

        {/* Modal */}
        {showModal && (
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {isEditMode ? 'Edit Nursing Booking' : 'Add New Nursing Booking'}
                  </h5>
                  <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Patient Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.patient_name}
                        onChange={(e) => handleInputChange('patient_name', e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.phone_number}
                        onChange={(e) => handleInputChange('phone_number', e.target.value)}
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label className="form-label">Address</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Nursing Type</label>
                      <select
                        className="form-control"
                        value={formData.nursing_type}
                        onChange={(e) => handleInputChange('nursing_type', e.target.value)}
                      >
                        <option value="">Select Type</option>
                        <option value="home_care">Home Care</option>
                        <option value="critical_care">Critical Care</option>
                        <option value="elderly_care">Elderly Care</option>
                        <option value="post_surgery">Post Surgery</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Hours Per Day</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.hours_per_day}
                        onChange={(e) => handleInputChange('hours_per_day', e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Start Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={formData.start_date}
                        onChange={(e) => handleInputChange('start_date', e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">End Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={formData.end_date}
                        onChange={(e) => handleInputChange('end_date', e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Total Amount</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.total_amount}
                        onChange={(e) => handleInputChange('total_amount', e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Advance Booking Amount</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.advance_booking}
                        onChange={(e) => handleInputChange('advance_booking', e.target.value)}
                        placeholder="Enter advance amount"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Transaction ID</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.transaction_id}
                        onChange={(e) => handleInputChange('transaction_id', e.target.value)}
                        placeholder="Enter transaction ID"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Status</label>
                      <select
                        className="form-control"
                        value={formData.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                    Cancel
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleSave}>
                    {isEditMode ? 'Update' : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {showModal && <div className="modal-backdrop fade show"></div>}
      </div>
    </MasterLayout>
  );
};

export default NursingBookingList;