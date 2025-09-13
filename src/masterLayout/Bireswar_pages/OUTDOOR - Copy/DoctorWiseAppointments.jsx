import { useState, useEffect } from "react";
import MasterLayout from '../../MasterLayout';
import Breadcrumb from '../../Breadcrumb';
import axiosInstance from "../../../axiosInstance";

const DoctorWiseAppointments = () => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [rescheduleData, setRescheduleData] = useState({ date: '', time: '' });
  const [actionLoading, setActionLoading] = useState(false);
    
  useEffect(() => {
    fetchDoctors();
  }, []);

  const showNotificationMessage = (message, type = 'success') => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const fetchDoctors = async () => {
    try {
      const response = await axiosInstance.get('/doctormaster/active');
      if (response.data.success) {
        setDoctors(response.data.data);
        fetchAllAppointments();
      }
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
      showNotificationMessage('Failed to fetch doctors', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllAppointments = async () => {
    try {
      const response = await axiosInstance.get('/appointments');
      if (response.data.success) {
        setAppointments(response.data.appointments);
      }
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
      showNotificationMessage('Failed to fetch appointments', 'error');
    }
  };

  const getAppointmentsForDoctor = (doctorId) => {
    return appointments.filter(apt => apt.doctor_id === doctorId);
  };

  const getStatusBadge = (status) => {
    if (status === 'accepted') return 'bg-success';
    if (status === 'cancelled') return 'bg-danger';
    if (status === 'complete' || status === 'completed') return 'bg-primary';
    return 'bg-warning';
  };

  const updateAppointmentStatus = async (appointmentId, status) => {
    setActionLoading(true);
    try {
      const response = await axiosInstance.put(`/appointments/${appointmentId}/status`, { status });
      if (response.data.success) {
        await fetchAllAppointments();
        showNotificationMessage(`Appointment ${status} successfully!`, 'success');
      }
    } catch (error) {
      showNotificationMessage(error.response?.data?.message || 'Failed to update appointment status', 'error');
    }
    setActionLoading(false);
  };

  const handleCompleteAppointment = async (appointmentId) => {
    setActionLoading(true);
    try {
      const response = await axiosInstance.put(`/appointments/${appointmentId}/status`, { status: 'completed' });
      if (response.data.success) {
        await fetchAllAppointments();
        showNotificationMessage('Appointment completed successfully!', 'success');
      }
    } catch (error) {
      showNotificationMessage('Failed to complete appointment', 'error');
    }
    setActionLoading(false);
  };

  const handleCancelWithReason = async () => {
    if (!cancelReason.trim() || cancelReason.trim().length < 10) {
      showNotificationMessage('Please provide a detailed reason (minimum 10 characters)', 'error');
      return;
    }
    
    setActionLoading(true);
    try {
      const response = await axiosInstance.put(`/appointments/${selectedAppointment.id}/cancel`, { reason: cancelReason.trim() });
      if (response.data.success) {
        await fetchAllAppointments();
        showNotificationMessage('Appointment cancelled successfully!', 'success');
        setShowCancelModal(false);
        setCancelReason('');
        setSelectedAppointment(null);
      }
    } catch (error) {
      showNotificationMessage(error.response?.data?.message || 'Failed to cancel appointment', 'error');
    }
    setActionLoading(false);
  };

  const handleReschedule = async () => {
    if (!rescheduleData.date || !rescheduleData.time) {
      showNotificationMessage('Please provide new date and time', 'error');
      return;
    }
    
    const selectedDate = new Date(rescheduleData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      showNotificationMessage('Cannot reschedule to a past date', 'error');
      return;
    }
    
    setActionLoading(true);
    try {
      const response = await axiosInstance.put(`/appointments/${selectedAppointment.id}/reschedule`, rescheduleData);
      if (response.data.success) {
        await fetchAllAppointments();
        showNotificationMessage('Appointment rescheduled successfully!', 'success');
        setShowRescheduleModal(false);
        setRescheduleData({ date: '', time: '' });
        setSelectedAppointment(null);
      }
    } catch (error) {
      showNotificationMessage(error.response?.data?.message || 'Failed to reschedule appointment', 'error');
    }
    setActionLoading(false);
  };

  const openCancelModal = (appointment) => {
    setSelectedAppointment(appointment);
    setShowCancelModal(true);
  };

  const openRescheduleModal = (appointment) => {
    setSelectedAppointment(appointment);
    const currentDate = new Date(appointment.date).toISOString().split('T')[0];
    
    let timeValue = appointment.time;
    if (appointment.time && appointment.time.includes('T')) {
      const date = new Date(appointment.time);
      timeValue = date.toTimeString().slice(0, 5);
    } else if (appointment.time && appointment.time.length > 5) {
      timeValue = appointment.time.slice(0, 5);
    }
    
    setRescheduleData({ date: currentDate, time: timeValue });
    setShowRescheduleModal(true);
  };

  const openDetailsModal = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDetailsModal(true);
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    
    if (timeString.includes('T')) {
      const date = new Date(timeString);
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
    } else if (timeString.includes(':')) {
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours);
      const minute = parseInt(minutes);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
    }
    
    return timeString;
  };

  return (
    <MasterLayout>
      {/* Notification */}
      {showNotification && (
        <div className={`alert alert-${notificationType === 'error' ? 'danger' : notificationType} alert-dismissible fade show position-fixed`} 
             style={{top: '20px', right: '20px', zIndex: 1050, minWidth: '300px'}}>
          <i className={`fas fa-${notificationType === 'success' ? 'check-circle' : 'exclamation-triangle'} me-2`}></i>
          {notificationMessage}
          <button type="button" className="btn-close" onClick={() => setShowNotification(false)}></button>
        </div>
      )}
      
      <Breadcrumb title="Doctor Wise Appointments" />
      <div className="container-fluid py-4">
        <div className="card shadow border-0 rounded-4">
          <div className="card-header border-bottom d-flex justify-content-between align-items-center">
            <h5 className="mb-0">👨⚕️ Doctor Wise Appointments</h5>
            <div className="d-flex gap-2">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{width: '200px'}}
              />
              <select 
                className="form-select form-select-sm"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{width: '150px'}}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="cancelled">Cancelled</option>
                <option value="complete">Complete</option>
              </select>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive" style={{ maxHeight: "70vh", overflowY: "auto" }}>
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="accordion" id="doctorAccordion">
                  {doctors.map((doctor) => {
                    const doctorAppointments = getAppointmentsForDoctor(doctor.DoctorId);
                    return (
                      <div className="accordion-item mb-2" key={doctor.DoctorId}>
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse${doctor.DoctorId}`}
                            style={{
                              background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
                              color: "white",
                              border: "none",
                              fontWeight: "600"
                            }}
                          >
                            <div className="d-flex justify-content-between w-100 me-3">
                              <div>
                                <strong>Dr. {doctor.Doctor}</strong>
                                <br />
                                <small className="text-light">{doctor.Qualification}</small>
                              </div>
                              <div className="text-end">
                                <span className="badge bg-light text-dark">
                                  {doctorAppointments.length} Appointments
                                </span>
                              </div>
                            </div>
                          </button>
                        </h2>
                        <div
                          id={`collapse${doctor.DoctorId}`}
                          className="accordion-collapse collapse"
                          data-bs-parent="#doctorAccordion"
                        >
                          <div className="accordion-body">
                            {doctorAppointments.filter(appointment => {
                              const matchesSearch = appointment.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                   appointment.problem?.toLowerCase().includes(searchTerm.toLowerCase());
                              const matchesFilter = filterStatus === 'all' || 
                                                   (filterStatus === 'pending' && (!appointment.status || appointment.status === 'pending')) ||
                                                   (filterStatus === 'complete' && (appointment.status === 'complete' || appointment.status === 'completed')) ||
                                                   appointment.status === filterStatus;
                              return matchesSearch && matchesFilter;
                            }).length === 0 ? (
                              <p className="text-muted text-center py-3">No appointments found matching your criteria</p>
                            ) : (
                              <div className="table-responsive">
                                <table className="table table-sm table-hover table-striped align-middle">
                                  <thead className="table-primary">
                                    <tr>
                                      <th>ID</th>
                                      <th>Patient</th>
                                      <th>Date</th>
                                      <th>Time</th>
                                      <th>Type</th>
                                      <th>Problem</th>
                                      <th>Status</th>
                                      <th>Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {doctorAppointments.filter(appointment => {
                                      const matchesSearch = appointment.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                           appointment.problem?.toLowerCase().includes(searchTerm.toLowerCase());
                                      const matchesFilter = filterStatus === 'all' || 
                                                           (filterStatus === 'pending' && (!appointment.status || appointment.status === 'pending')) ||
                                                           (filterStatus === 'complete' && (appointment.status === 'complete' || appointment.status === 'completed')) ||
                                                           appointment.status === filterStatus;
                                      return matchesSearch && matchesFilter;
                                    }).map((appointment) => (
                                      <tr key={appointment.id}>
                                        <td>#{appointment.id}</td>
                                        <td className="fw-medium">{appointment.patient_name}</td>
                                        <td>{new Date(appointment.date).toLocaleDateString()}</td>
                                        <td>{formatTime(appointment.time)}</td>
                                        <td>
                                          <span className="badge bg-info text-dark">
                                            {appointment.appointment_type}
                                          </span>
                                        </td>
                                        <td>
                                          <div style={{maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                                            {appointment.problem || 'No problem specified'}
                                            {appointment.cancel_reason && (
                                              <div className="mt-1">
                                                <small className="text-danger fw-bold">Reason: {appointment.cancel_reason}</small>
                                              </div>
                                            )}
                                          </div>
                                        </td>
                                        <td>
                                          <span className={`badge ${getStatusBadge(appointment.status)}`}>
                                            {appointment.status || 'pending'}
                                          </span>
                                        </td>
                                        <td>
                                          {appointment.status !== 'accepted' && appointment.status !== 'cancelled' && appointment.status !== 'complete' && appointment.status !== 'completed' ? (
                                            <div className="d-flex flex-wrap gap-1">
                                              <button
                                                onClick={() => updateAppointmentStatus(appointment.id, 'accepted')}
                                                className="btn btn-success btn-sm"
                                                disabled={actionLoading}
                                              >
                                                <i className="fas fa-check me-1"></i>Accept
                                              </button>
                                              <button
                                                onClick={() => openCancelModal(appointment)}
                                                className="btn btn-danger btn-sm"
                                                disabled={actionLoading}
                                              >
                                                <i className="fas fa-times me-1"></i>Cancel
                                              </button>
                                              <button
                                                onClick={() => openRescheduleModal(appointment)}
                                                className="btn btn-warning btn-sm"
                                                disabled={actionLoading}
                                              >
                                                <i className="fas fa-calendar-alt me-1"></i>Reschedule
                                              </button>
                                            </div>
                                          ) : appointment.status === 'accepted' ? (
                                            <div className="d-flex flex-wrap gap-1">
                                              <button
                                                onClick={() => handleCompleteAppointment(appointment.id)}
                                                className="btn btn-primary btn-sm"
                                                disabled={actionLoading}
                                              >
                                                <i className="fas fa-check-double me-1"></i>Complete
                                              </button>
                                              <button
                                                onClick={() => openDetailsModal(appointment)}
                                                className="btn btn-outline-info btn-sm"
                                              >
                                                <i className="fas fa-eye me-1"></i>Details
                                              </button>
                                            </div>
                                          ) : appointment.status === 'cancelled' ? (
                                            <button
                                              onClick={() => openDetailsModal(appointment)}
                                              className="btn btn-outline-secondary btn-sm"
                                            >
                                              <i className="fas fa-eye me-1"></i>View Reason
                                            </button>
                                          ) : (appointment.status === 'complete' || appointment.status === 'completed') ? (
                                            <div className="d-flex align-items-center">
                                              <span className="badge bg-success px-3 py-2 rounded-pill">
                                                <i className="fas fa-check-double me-2"></i>Completed
                                              </span>
                                            </div>
                                          ) : null}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="fas fa-times-circle text-danger me-2"></i>
                  Cancel Appointment
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowCancelModal(false)}></button>
              </div>
              <div className="modal-body">
                <p><strong>Patient:</strong> {selectedAppointment?.patient_name}</p>
                <p><strong>Date & Time:</strong> {new Date(selectedAppointment?.date).toLocaleDateString()} at {formatTime(selectedAppointment?.time)}</p>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Reason for Cancellation *</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    placeholder="Please provide a detailed reason for cancelling this appointment (minimum 10 characters)..."
                    maxLength="500"
                  ></textarea>
                  <small className="text-muted">{cancelReason.length}/500 characters</small>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => {
                  setShowCancelModal(false);
                  setCancelReason('');
                  setSelectedAppointment(null);
                }}>
                  Close
                </button>
                <button type="button" className="btn btn-danger" onClick={handleCancelWithReason} 
                        disabled={!cancelReason.trim() || cancelReason.trim().length < 10 || actionLoading}>
                  {actionLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Cancelling...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-times me-1"></i>Cancel Appointment
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="fas fa-calendar-alt text-warning me-2"></i>
                  Reschedule Appointment
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowRescheduleModal(false)}></button>
              </div>
              <div className="modal-body">
                <p><strong>Patient:</strong> {selectedAppointment?.patient_name}</p>
                <p><strong>Current:</strong> {new Date(selectedAppointment?.date).toLocaleDateString()} at {formatTime(selectedAppointment?.time)}</p>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">New Date *</label>
                    <input
                      type="date"
                      className="form-control"
                      value={rescheduleData.date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setRescheduleData({...rescheduleData, date: e.target.value})}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">New Time *</label>
                    <input
                      type="time"
                      className="form-control"
                      value={rescheduleData.time}
                      onChange={(e) => setRescheduleData({...rescheduleData, time: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => {
                  setShowRescheduleModal(false);
                  setRescheduleData({ date: '', time: '' });
                  setSelectedAppointment(null);
                }}>
                  Close
                </button>
                <button type="button" className="btn btn-warning" onClick={handleReschedule} 
                        disabled={!rescheduleData.date || !rescheduleData.time || actionLoading}>
                  {actionLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Rescheduling...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-calendar-alt me-1"></i>Reschedule
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedAppointment && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  <i className="fas fa-info-circle me-2"></i>
                  Appointment Details
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowDetailsModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="card border-0 bg-light mb-3">
                      <div className="card-body">
                        <h6 className="card-title text-primary">
                          <i className="fas fa-user me-2"></i>Patient Information
                        </h6>
                        <p className="mb-1"><strong>Name:</strong> {selectedAppointment.patient_name}</p>
                        <p className="mb-1"><strong>Patient ID:</strong> {selectedAppointment.patient_id}</p>
                        <p className="mb-0"><strong>Appointment ID:</strong> {selectedAppointment.id}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card border-0 bg-light mb-3">
                      <div className="card-body">
                        <h6 className="card-title text-success">
                          <i className="fas fa-calendar me-2"></i>Appointment Schedule
                        </h6>
                        <p className="mb-1"><strong>Date:</strong> {new Date(selectedAppointment.date).toLocaleDateString()}</p>
                        <p className="mb-1"><strong>Time:</strong> {formatTime(selectedAppointment.time)}</p>
                        <p className="mb-0"><strong>Type:</strong> <span className="badge bg-primary">{selectedAppointment.appointment_type}</span></p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="card border-0 bg-light mb-3">
                  <div className="card-body">
                    <h6 className="card-title text-info">
                      <i className="fas fa-notes-medical me-2"></i>Medical Information
                    </h6>
                    <p className="mb-0">
                      <strong>Problem/Symptoms:</strong> 
                      {selectedAppointment.problem || <span className="text-muted fst-italic"> No specific problem mentioned</span>}
                    </p>
                  </div>
                </div>
                
                <div className="card border-0 mb-3" style={{backgroundColor: selectedAppointment.status === 'cancelled' ? '#f8d7da' : selectedAppointment.status === 'accepted' ? '#d1e7dd' : selectedAppointment.status === 'complete' ? '#cff4fc' : '#fff3cd'}}>
                  <div className="card-body">
                    <h6 className="card-title">
                      <i className={`fas fa-${selectedAppointment.status === 'accepted' ? 'check-circle' : selectedAppointment.status === 'cancelled' ? 'times-circle' : selectedAppointment.status === 'complete' ? 'check-double' : 'clock'} me-2`}></i>
                      Current Status
                    </h6>
                    <span className={`badge bg-${selectedAppointment.status === 'accepted' ? 'success' : selectedAppointment.status === 'cancelled' ? 'danger' : selectedAppointment.status === 'complete' ? 'primary' : 'warning'} fs-6`}>
                      {selectedAppointment.status || 'pending'}
                    </span>
                  </div>
                </div>
                
                {selectedAppointment.cancel_reason && (
                  <div className="alert alert-danger">
                    <h6 className="alert-heading">
                      <i className="fas fa-exclamation-triangle me-2"></i>Cancellation Reason
                    </h6>
                    <p className="mb-0">{selectedAppointment.cancel_reason}</p>
                  </div>
                )}
                
                {selectedAppointment.Reschedule_date && (
                  <div className="alert alert-warning">
                    <h6 className="alert-heading">
                      <i className="fas fa-calendar-alt me-2"></i>Rescheduled Information
                    </h6>
                    <p className="mb-0">
                      <strong>New Date:</strong> {new Date(selectedAppointment.Reschedule_date).toLocaleDateString()}<br/>
                      <strong>New Time:</strong> {formatTime(selectedAppointment.Reschedule_time)}
                    </p>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDetailsModal(false)}>
                  <i className="fas fa-times me-1"></i>Close
                </button>
              </div>
            </div>  
          </div>
        </div>
      )}
    </MasterLayout>
  );
};

export default DoctorWiseAppointments;