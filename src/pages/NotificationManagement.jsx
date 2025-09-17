import React, { useState, useEffect } from 'react';
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../masterLayout/Breadcrumb";
import axiosInstance from '../axiosInstance';
import { toast } from 'react-toastify';

const NotificationManagement = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    redirect_link: '',
    image_url: '',
    video_url: '',
    target_type: 'all',
    target_ids: []
  });
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userSearch, setUserSearch] = useState('');
  const [userPage, setUserPage] = useState(1);
  const [userPagination, setUserPagination] = useState({});
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (formData.target_type === 'individual_patient') {
      setPatients([]);
      setUserPage(1);
      fetchPatients(1, userSearch);
    } else if (formData.target_type === 'individual_doctor') {
      setDoctors([]);
      setUserPage(1);
      fetchDoctors(1, userSearch);
    }
  }, [formData.target_type, userSearch]);

  const fetchPatients = async (page = 1, search = '') => {
    setLoadingUsers(true);
    try {
      const response = await axiosInstance.get(`/patients?page=${page}&limit=50&search=${search}`);
      if (response.data.success) {
        if (page === 1) {
          setPatients(response.data.data);
        } else {
          setPatients(prev => [...prev, ...response.data.data]);
        }
        setUserPagination(response.data.pagination);
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchDoctors = async (page = 1, search = '') => {
    setLoadingUsers(true);
    try {
      const response = await axiosInstance.get(`/doctormaster/active?search=${search}`);
      if (response.data.success) {
        const doctors = response.data.data.map(doc => ({
          id: doc.DoctorId,
          name: doc.Doctor,
          specialization: doc.Qualification
        }));
        setDoctors(doctors);
        setUserPagination({ page: 1, totalPages: 1, total: doctors.length });
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/notifications');
      if (response.data.success) {
        setNotifications(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        target_ids: (formData.target_type === 'individual_patient' || formData.target_type === 'individual_doctor') ? selectedUsers : null
      };
      const response = await axiosInstance.post('/notifications', submitData);
      if (response.data.success) {
        toast.success('Notification created successfully!');
        setShowModal(false);
        setFormData({
          title: '',
          description: '',
          redirect_link: '',
          image_url: '',
          video_url: '',
          target_type: 'all',
          target_ids: []
        });
        setSelectedUsers([]);
        fetchNotifications();
      }
    } catch (error) {
      toast.error('Failed to create notification');
    }
  };

  const handleUserSelection = (userId, checked) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      try {
        const response = await axiosInstance.delete(`/notifications/${id}`);
        if (response.data.success) {
          toast.success('Notification deleted successfully!');
          fetchNotifications();
        }
      } catch (error) {
        toast.error('Failed to delete notification');
      }
    }
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Notification Management" />
      
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">Push Notifications</h5>
          <button 
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            <i className="fas fa-plus me-1"></i>
            Send Notification
          </button>
        </div>
        
        <div className="card-body">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Target</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {notifications.map((notification) => (
                    <tr key={notification.id}>
                      <td>{notification.title}</td>
                      <td>{notification.description?.substring(0, 50)}...</td>
                      <td>
                        <span className={`badge ${notification.target_type === 'all' ? 'bg-primary' : notification.target_type === 'patients' ? 'bg-success' : 'bg-info'}`}>
                          {notification.target_type}
                        </span>
                      </td>
                      <td>{new Date(notification.created_at).toLocaleDateString()}</td>
                      <td>
                        <button 
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(notification.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Send Push Notification</h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-12 mb-3">
                      <label className="form-label">Title *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="col-12 mb-3">
                      <label className="form-label">Description *</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        required
                      ></textarea>
                    </div>
                    
                    <div className="col-12 mb-3">
                      <label className="form-label">Target Audience *</label>
                      <select
                        className="form-control"
                        value={formData.target_type}
                        onChange={(e) => {
                          setFormData({...formData, target_type: e.target.value});
                          setSelectedUsers([]);
                          setUserSearch('');
                          setUserPage(1);
                        }}
                      >
                        <option value="all">All Users</option>
                        <option value="patients">All Patients</option>
                        <option value="doctors">All Doctors</option>
                        <option value="individual_patient">Select Individual Patients</option>
                        <option value="individual_doctor">Select Individual Doctors</option>
                      </select>
                    </div>
                    
                    {/* Individual User Selection */}
                    {(formData.target_type === 'individual_patient' || formData.target_type === 'individual_doctor') && (
                      <div className="col-12 mb-3">
                        <label className="form-label">
                          <i className={`fas ${formData.target_type === 'individual_patient' ? 'fa-user-injured' : 'fa-user-md'} me-2`}></i>
                          Select {formData.target_type === 'individual_patient' ? 'Patients' : 'Doctors'}
                          <span className="text-muted ms-2">(Only Active {formData.target_type === 'individual_doctor' ? 'Doctors' : 'Patients'})</span>
                        </label>
                        
                        {/* Search Input */}
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder={`Search ${formData.target_type === 'individual_patient' ? 'patients' : 'doctors'}...`}
                            value={userSearch}
                            onChange={(e) => setUserSearch(e.target.value)}
                          />
                        </div>
                        
                        <div style={{maxHeight: '300px', overflowY: 'auto', border: '1px solid #ddd', padding: '15px', borderRadius: '8px', backgroundColor: '#f8f9fa'}}>
                          {loadingUsers && userPage === 1 ? (
                            <div className="text-center py-3">
                              <div className="spinner-border spinner-border-sm" role="status"></div>
                              <p className="mt-2">Loading...</p>
                            </div>
                          ) : (formData.target_type === 'individual_patient' ? patients : doctors).length === 0 ? (
                            <div className="text-center text-muted py-3">
                              <i className="fas fa-user-slash mb-2"></i>
                              <p>No {formData.target_type === 'individual_patient' ? 'patients' : 'doctors'} found</p>
                            </div>
                          ) : (
                            <>
                              {(formData.target_type === 'individual_patient' ? patients : doctors).map(user => (
                                <div key={user.id} className="form-check mb-2 p-2" style={{backgroundColor: 'white', borderRadius: '5px', border: '1px solid #e9ecef'}}>
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`user-${user.id}`}
                                    checked={selectedUsers.includes(user.id)}
                                    onChange={(e) => handleUserSelection(user.id, e.target.checked)}
                                  />
                                  <label className="form-check-label w-100" htmlFor={`user-${user.id}`} style={{cursor: 'pointer'}}>
                                    <div className="d-flex justify-content-between align-items-center">
                                      <div>
                                        <strong>{user.name || 'N/A'}</strong>
                                        {user.phone && <div className="text-muted small">📞 {user.phone}</div>}
                                        {user.specialization && <div className="text-info small">🩺 {user.specialization}</div>}
                                      </div>
                                      <span className="badge bg-light text-dark">ID: {user.id}</span>
                                    </div>
                                  </label>
                                </div>
                              ))}
                              
                              {/* Load More Button */}
                              {userPagination.page < userPagination.totalPages && (
                                <div className="text-center mt-3">
                                  <button 
                                    type="button" 
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => {
                                      const nextPage = userPage + 1;
                                      setUserPage(nextPage);
                                      if (formData.target_type === 'individual_patient') {
                                        fetchPatients(nextPage, userSearch);
                                      } else {
                                        fetchDoctors(nextPage, userSearch);
                                      }
                                    }}
                                    disabled={loadingUsers}
                                  >
                                    {loadingUsers ? 'Loading...' : 'Load More'}
                                  </button>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-center mt-2">
                          <small className="text-muted">
                            <i className="fas fa-users me-1"></i>
                            {selectedUsers.length} selected | Showing {(formData.target_type === 'individual_patient' ? patients : doctors).length} of {userPagination.total || 0}
                          </small>
                          {selectedUsers.length > 0 && (
                            <button 
                              type="button" 
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => setSelectedUsers([])}
                            >
                              Clear All
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="col-12 mb-3">
                      <label className="form-label">Redirect Link (Optional)</label>
                      <input
                        type="url"
                        className="form-control"
                        value={formData.redirect_link}
                        onChange={(e) => setFormData({...formData, redirect_link: e.target.value})}
                        placeholder="https://example.com"
                      />
                    </div>
                    
                    <div className="col-12 mb-3">
                      <label className="form-label">Image URL (Optional)</label>
                      <input
                        type="url"
                        className="form-control"
                        value={formData.image_url}
                        onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    
                    <div className="col-12 mb-3">
                      <label className="form-label">Video URL (Optional)</label>
                      <input
                        type="url"
                        className="form-control"
                        value={formData.video_url}
                        onChange={(e) => setFormData({...formData, video_url: e.target.value})}
                        placeholder="https://youtube.com/watch?v=..."
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <i className="fas fa-paper-plane me-1"></i>
                    Send Notification
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </MasterLayout>
  );
};

export default NotificationManagement;