import React, { useState, useEffect } from 'react';
import axiosInstance from '.././axiosInstance';

const SimpleDoctorPortal = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
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
    const savedDoctor = localStorage.getItem('doctor');
    if (savedDoctor) {
      const doctorData = JSON.parse(savedDoctor);
      setDoctor(doctorData);
      setIsLoggedIn(true);
      fetchAppointments(doctorData.DoctorId);
    }
  }, []);

  const showNotificationMessage = (message, type = 'success') => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post(`/doctormaster/login`, loginData);
      if (response.data.success) {
        setDoctor(response.data.data);
        setIsLoggedIn(true);
        localStorage.setItem('doctor', JSON.stringify(response.data.data));
        fetchAppointments(response.data.data.DoctorId);
        showNotificationMessage('Welcome back, Dr. ' + response.data.data.Doctor + '!', 'success');
      }
    } catch (error) {
      showNotificationMessage('Login failed: ' + (error.response?.data?.message || 'Invalid credentials'), 'error');
    }
    setLoading(false);
  };

  const fetchAppointments = async (doctorId) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/appointments/doctor/${doctorId}`);
      if (response.data.success) {
        setAppointments(response.data.appointments);
      }
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
      showNotificationMessage('Failed to fetch appointments', 'error');
    }
    setLoading(false);
  };

  const updateAppointmentStatus = async (appointmentId, status) => {
    setActionLoading(true);
    try {
      const response = await axiosInstance.put(`/appointments/${appointmentId}/status`, { status });
      if (response.data.success) {
        await fetchAppointments(doctor.DoctorId);
        showNotificationMessage(`Appointment ${status} successfully!`, 'success');
      }
    } catch (error) {
      showNotificationMessage(error.response?.data?.message || 'Failed to update appointment status', 'error');
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
        await fetchAppointments(doctor.DoctorId);
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
        await fetchAppointments(doctor.DoctorId);
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
    
    // Convert time to HH:MM format for input
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

  const getAppointmentStats = () => {
    const total = appointments.length;
    const accepted = appointments.filter(apt => apt.status === 'accepted').length;
    const pending = appointments.filter(apt => !apt.status || apt.status === 'pending').length;
    const cancelled = appointments.filter(apt => apt.status === 'cancelled').length;
    const completed = appointments.filter(apt => apt.status === 'completed').length;
    const rescheduled = appointments.filter(apt => apt.Reschedule_date).length;
    
    return { total, accepted, pending, cancelled, completed, rescheduled };
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.problem?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'pending' && (!appointment.status || appointment.status === 'pending')) ||
                         appointment.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'accepted': return 'success';
      case 'cancelled': return 'danger';
      case 'completed': return 'info';
      default: return 'warning';
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    
    // Handle different time formats
    if (timeString.includes('T')) {
      // ISO format like "1970-01-01T15:30:00.000Z"
      const date = new Date(timeString);
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
    } else if (timeString.includes(':')) {
      // Format like "15:30" or "15:30:00"
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours);
      const minute = parseInt(minutes);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
    }
    
    return timeString;
  };

  const formatDateTime = (date, time) => {
    const appointmentDate = new Date(date);
    const today = new Date();
    const isToday = appointmentDate.toDateString() === today.toDateString();
    const isTomorrow = appointmentDate.toDateString() === new Date(today.getTime() + 24*60*60*1000).toDateString();
    
    let dateLabel = appointmentDate.toLocaleDateString();
    if (isToday) dateLabel = 'Today';
    else if (isTomorrow) dateLabel = 'Tomorrow';
    
    return { dateLabel, time: formatTime(time) };
  };

  const generateVideoCall = async (appointmentId) => {
    try {
      const response = await axiosInstance.post(`/appointments/${appointmentId}/video-call`);
      if (response.data.success) {
        const doctorLink = response.data.doctor_link;
        window.open(doctorLink, '_blank');
        showNotificationMessage('Video call started! Opening in new window...', 'success');
      }
    } catch (error) {
      showNotificationMessage(error.response?.data?.message || 'Failed to start video call', 'error');
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
      <div className="container-fluid vh-100 d-flex align-items-center justify-content-center" 
           style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
        <div className="card shadow-lg border-0" style={{maxWidth: '450px', width: '100%', borderRadius: '20px'}}>
          <div className="card-body p-5">
            <div className="text-center mb-4">
              <div className="mb-3">
                <i className="fas fa-user-md" style={{fontSize: '3rem', color: '#667eea'}}></i>
              </div>
              <h2 className="fw-bold text-primary mb-2">Doctor Portal</h2>
              <p className="text-muted">Welcome back! Please sign in to continue</p>
            </div>
            
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="form-label fw-semibold">Email Address</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="fas fa-envelope text-muted"></i>
                  </span>
                  <input
                    type="email"
                    required
                    className="form-control border-start-0 ps-0"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    placeholder="doctor@example.com"
                    style={{boxShadow: 'none'}}
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="form-label fw-semibold">Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="fas fa-lock text-muted"></i>
                  </span>
                  <input
                    type="password"
                    required
                    className="form-control border-start-0 ps-0"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    placeholder="Enter your password"
                    style={{boxShadow: 'none'}}
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-100 py-3 fw-semibold"
                style={{borderRadius: '10px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none'}}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Signing in...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt me-2"></i>
                    Sign In
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#f8f9fa'}}>
      {/* Notification */}
      {showNotification && (
        <div className={`alert alert-${notificationType === 'error' ? 'danger' : notificationType} alert-dismissible fade show position-fixed`} 
             style={{top: '20px', right: '20px', zIndex: 1050, minWidth: '300px'}}>
          <i className={`fas fa-${notificationType === 'success' ? 'check-circle' : 'exclamation-triangle'} me-2`}></i>
          {notificationMessage}
          <button type="button" className="btn-close" onClick={() => setShowNotification(false)}></button>
        </div>
      )}

      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-dark" 
           style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', boxShadow: '0 2px 10px rgba(0,0,0,0.1)'}}>
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <i className="fas fa-stethoscope me-2" style={{fontSize: '1.5rem'}}></i>
            <span className="navbar-brand h1 mb-0 fw-bold">Doctor Dashboard</span>
          </div>
          <div className="d-flex align-items-center">
            <div className="text-white me-4">
              <div className="fw-bold d-flex align-items-center">
                <i className="fas fa-user-circle me-2"></i>
                Dr. {doctor.Doctor}
              </div>
              <small className="opacity-75">
                <i className="fas fa-graduation-cap me-1"></i>
                {doctor.Qualification}
              </small>
            </div>
            <button onClick={handleLogout} className="btn btn-outline-light rounded-pill px-3">
              <i className="fas fa-sign-out-alt me-2"></i>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container-fluid py-4">
        {/* Stats Cards */}
        <div className="row mb-4">
          <div className="col-lg-3 col-md-6 mb-3">
            <div className="card border-0 shadow-sm h-100" style={{borderRadius: '15px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
              <div className="card-body text-white text-center py-4">
                <i className="fas fa-calendar-alt mb-3" style={{fontSize: '2.5rem', opacity: 0.8}}></i>
                <h3 className="fw-bold mb-2">{getAppointmentStats().total}</h3>
                <p className="mb-0 opacity-90">Total Appointments</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-3">
            <div className="card border-0 shadow-sm h-100" style={{borderRadius: '15px', background: 'linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%)'}}>
              <div className="card-body text-white text-center py-4">
                <i className="fas fa-check-circle mb-3" style={{fontSize: '2.5rem', opacity: 0.8}}></i>
                <h3 className="fw-bold mb-2">{getAppointmentStats().accepted}</h3>
                <p className="mb-0 opacity-90">Accepted</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-3">
            <div className="card border-0 shadow-sm h-100" style={{borderRadius: '15px', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>
              <div className="card-body text-white text-center py-4">
                <i className="fas fa-clock mb-3" style={{fontSize: '2.5rem', opacity: 0.8}}></i>
                <h3 className="fw-bold mb-2">{getAppointmentStats().pending}</h3>
                <p className="mb-0 opacity-90">Pending</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-3">
            <div className="card border-0 shadow-sm h-100" style={{borderRadius: '15px', background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'}}>
              <div className="card-body text-white text-center py-4">
                <i className="fas fa-calendar-times mb-3" style={{fontSize: '2.5rem', opacity: 0.8}}></i>
                <h3 className="fw-bold mb-2">{getAppointmentStats().cancelled}</h3>
                <p className="mb-0 opacity-90">Cancelled</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats Row */}
        <div className="row mb-4">
          <div className="col-lg-4 col-md-6 mb-3">
            <div className="card border-0 shadow-sm h-100" style={{borderRadius: '15px', background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'}}>
              <div className="card-body text-white text-center py-4">
                <i className="fas fa-check-double mb-3" style={{fontSize: '2.5rem', opacity: 0.8}}></i>
                <h3 className="fw-bold mb-2">{getAppointmentStats().completed}</h3>
                <p className="mb-0 opacity-90">Completed</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-3">
            <div className="card border-0 shadow-sm h-100" style={{borderRadius: '15px', background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'}}>
              <div className="card-body text-white text-center py-4">
                <i className="fas fa-calendar-alt mb-3" style={{fontSize: '2.5rem', opacity: 0.8}}></i>
                <h3 className="fw-bold mb-2">{getAppointmentStats().rescheduled}</h3>
                <p className="mb-0 opacity-90">Rescheduled</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-3">
            <div className="card border-0 shadow-sm h-100" style={{borderRadius: '15px', background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}}>
              <div className="card-body text-white text-center py-4">
                <i className="fas fa-sync-alt mb-3" style={{fontSize: '2.5rem', opacity: 0.8}}></i>
                <button onClick={() => fetchAppointments(doctor.DoctorId)} 
                        className="btn btn-light btn-sm rounded-pill px-3 fw-semibold"
                        disabled={loading}>
                  <i className={`fas fa-${loading ? 'spinner fa-spin' : 'refresh'} me-1`}></i>
                  {loading ? 'Loading...' : 'Refresh Data'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="card border-0 shadow-sm mb-4" style={{borderRadius: '15px'}}>
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-6 mb-3 mb-md-0">
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="fas fa-search text-muted"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Search by patient name or problem..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{boxShadow: 'none'}}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex gap-2">
                  <select 
                    className="form-select"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    style={{boxShadow: 'none'}}
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                  </select>
                  <span className="badge bg-primary rounded-pill px-3 py-2 d-flex align-items-center">
                    {filteredAppointments.length} Results
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="card border-0 shadow-sm" style={{borderRadius: '15px'}}>
          <div className="card-header bg-white border-0 py-4" style={{borderRadius: '15px 15px 0 0'}}>
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="mb-0 fw-bold text-dark">
                <i className="fas fa-list-alt me-2 text-primary"></i>
                My Appointments
              </h5>
              <span className="text-muted">
                <i className="fas fa-calendar me-1"></i>
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="border-0 py-3 fw-semibold">
                      <i className="fas fa-user me-2"></i>Patient
                    </th>
                    <th className="border-0 py-3 fw-semibold">
                      <i className="fas fa-calendar-day me-2"></i>Date & Time
                    </th>
                    <th className="border-0 py-3 fw-semibold">
                      <i className="fas fa-tag me-2"></i>Type
                    </th>
                    <th className="border-0 py-3 fw-semibold">
                      <i className="fas fa-notes-medical me-2"></i>Problem & Details
                    </th>
                    <th className="border-0 py-3 fw-semibold">
                      <i className="fas fa-info-circle me-2"></i>Status
                    </th>
                    <th className="border-0 py-3 fw-semibold">
                      <i className="fas fa-cogs me-2"></i>Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-5">
                        <div className="text-muted">
                          <i className="fas fa-calendar-times" style={{fontSize: '3rem', opacity: 0.3}}></i>
                          <div className="mt-3">
                            <h6>No appointments found</h6>
                            <p className="mb-0">Try adjusting your search or filter criteria</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredAppointments.map((appointment) => {
                      const { dateLabel, time } = formatDateTime(appointment.date, appointment.time);
                      return (
                        <tr key={appointment.id} className="border-bottom">
                          <td className="py-3">
                            <div className="d-flex align-items-center">
                              <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" 
                                   style={{width: '40px', height: '40px'}}>
                                <i className="fas fa-user text-white"></i>
                              </div>
                              <div>
                                <div className="fw-bold text-dark">{appointment.patient_name}</div>
                                <small className="text-muted">ID: {appointment.id}</small>
                              </div>
                            </div>
                          </td>
                          <td className="py-3">
                            <div className="fw-semibold text-dark">{dateLabel}</div>
                            <small className="text-muted">
                              <i className="fas fa-clock me-1"></i>{time}
                            </small>
                            {appointment.Reschedule_date && (
                              <div className="mt-1">
                                <small className="text-warning fw-semibold">
                                  <i className="fas fa-arrow-right me-1"></i>
                                  New: {new Date(appointment.Reschedule_date).toLocaleDateString()} at {formatTime(appointment.Reschedule_time)}
                                </small>
                              </div>
                            )}
                          </td>
                          <td className="py-3">
                            <span className="badge bg-primary rounded-pill px-3 py-2">
                              {appointment.appointment_type}
                            </span>
                          </td>
                          <td className="py-3">
                            <div className="text-wrap" style={{maxWidth: '250px'}}>
                              <div className="mb-1">
                                {appointment.problem || (
                                  <span className="text-muted fst-italic">
                                    <i className="fas fa-question-circle me-1"></i>
                                    No problem specified
                                  </span>
                                )}
                              </div>
                              
                              {appointment.cancel_reason && (
                                <div className="mt-2 p-2 bg-danger bg-opacity-10 rounded">
                                  <small className="text-danger fw-semibold">
                                    <i className="fas fa-times-circle me-1"></i>
                                    Cancelled:
                                  </small>
                                  <div className="text-danger small mt-1">
                                    {appointment.cancel_reason}
                                  </div>
                                </div>
                              )}
                              
                              {appointment.Reschedule_date && (
                                <div className="mt-2 p-2 bg-warning bg-opacity-10 rounded">
                                  <small className="text-warning fw-semibold">
                                    <i className="fas fa-calendar-alt me-1"></i>
                                    Rescheduled to:
                                  </small>
                                  <div className="text-warning small mt-1">
                                    {new Date(appointment.Reschedule_date).toLocaleDateString()} at {formatTime(appointment.Reschedule_time)}
                                  </div>
                                </div>
                              )}
                              
                              <button 
                                onClick={() => openDetailsModal(appointment)}
                                className="btn btn-link btn-sm p-0 mt-1 text-decoration-none"
                              >
                                <i className="fas fa-eye me-1"></i>
                                View Details
                              </button>
                            </div>
                          </td>
                          <td className="py-3">
                            <span className={`badge bg-${getStatusColor(appointment.status)} rounded-pill px-3 py-2`}>
                              <i className={`fas fa-${appointment.status === 'accepted' ? 'check' : 
                                                    appointment.status === 'cancelled' ? 'times' : 
                                                    appointment.status === 'completed' ? 'check-double' : 'clock'} me-1`}></i>
                              {appointment.status || 'pending'}
                            </span>
                          </td>
                          <td className="py-3">
                            {appointment.status !== 'accepted' && appointment.status !== 'cancelled' && appointment.status !== 'completed' ? (
                              <div className="d-flex flex-wrap gap-1">
                                <button
                                  onClick={() => updateAppointmentStatus(appointment.id, 'accepted')}
                                  className="btn btn-success btn-sm rounded-pill px-3"
                                  title="Accept Appointment"
                                  disabled={actionLoading}
                                >
                                  <i className="fas fa-check me-1"></i>Accept
                                </button>
                                <button
                                  onClick={() => openCancelModal(appointment)}
                                  className="btn btn-danger btn-sm rounded-pill px-3"
                                  title="Cancel with Reason"
                                  disabled={actionLoading}
                                >
                                  <i className="fas fa-times me-1"></i>Cancel
                                </button>
                                <button
                                  onClick={() => openRescheduleModal(appointment)}
                                  className="btn btn-warning btn-sm rounded-pill px-3"
                                  title="Reschedule Appointment"
                                  disabled={actionLoading}
                                >
                                  <i className="fas fa-calendar-alt me-1"></i>Reschedule
                                </button>
                              </div>
                            ) : appointment.status === 'accepted' ? (
                              <div className="d-flex flex-wrap gap-1">
                                <button
                                  onClick={() => generateVideoCall(appointment.id)}
                                  className="btn btn-success btn-sm rounded-pill px-3"
                                  title="Start Video Call"
                                >
                                  <i className="fas fa-video me-1"></i>Video Call
                                </button>
                                <button
                                  onClick={() => openDetailsModal(appointment)}
                                  className="btn btn-outline-primary btn-sm rounded-pill px-3"
                                  title="View Details"
                                >
                                  <i className="fas fa-eye me-1"></i>Details
                                </button>
                              </div>
                            ) : (
                              <span className="text-muted fst-italic">
                                <i className="fas fa-ban me-1"></i>No actions available
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
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

        {/* Appointment Details Modal */}
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
                          <p className="mb-1"><strong>Original Date:</strong> {new Date(selectedAppointment.date).toLocaleDateString()}</p>
                          <p className="mb-1"><strong>Original Time:</strong> {formatTime(selectedAppointment.time)}</p>
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
                  
                  <div className="row">
                    <div className="col-md-6">
                      <div className="card border-0 mb-3" style={{backgroundColor: getStatusColor(selectedAppointment.status) === 'danger' ? '#f8d7da' : getStatusColor(selectedAppointment.status) === 'success' ? '#d1e7dd' : getStatusColor(selectedAppointment.status) === 'warning' ? '#fff3cd' : '#cff4fc'}}>
                        <div className="card-body">
                          <h6 className="card-title">
                            <i className={`fas fa-${selectedAppointment.status === 'accepted' ? 'check-circle' : selectedAppointment.status === 'cancelled' ? 'times-circle' : selectedAppointment.status === 'completed' ? 'check-double' : 'clock'} me-2`}></i>
                            Current Status
                          </h6>
                          <span className={`badge bg-${getStatusColor(selectedAppointment.status)} fs-6`}>
                            {selectedAppointment.status || 'pending'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card border-0 bg-light mb-3">
                        <div className="card-body">
                          <h6 className="card-title text-secondary">
                            <i className="fas fa-clock me-2"></i>Created
                          </h6>
                          <p className="mb-0">{selectedAppointment.created_at ? new Date(selectedAppointment.created_at).toLocaleString() : 'N/A'}</p>
                        </div>
                      </div>
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
                  {selectedAppointment.status !== 'cancelled' && selectedAppointment.status !== 'completed' && selectedAppointment.status !== 'accepted' && (
                    <button type="button" className="btn btn-success" onClick={() => {
                      updateAppointmentStatus(selectedAppointment.id, 'accepted');
                      setShowDetailsModal(false);
                    }}>
                      <i className="fas fa-check me-1"></i>Accept
                    </button>
                  )}
                </div>
              </div>  
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleDoctorPortal;










