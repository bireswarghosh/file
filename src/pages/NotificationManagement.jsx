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
    target_type: 'all'
  });

  useEffect(() => {
    fetchNotifications();
  }, []);

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
      const response = await axiosInstance.post('/notifications', formData);
      if (response.data.success) {
        toast.success('Notification created successfully!');
        setShowModal(false);
        setFormData({
          title: '',
          description: '',
          redirect_link: '',
          image_url: '',
          video_url: '',
          target_type: 'all'
        });
        fetchNotifications();
      }
    } catch (error) {
      toast.error('Failed to create notification');
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
                        onChange={(e) => setFormData({...formData, target_type: e.target.value})}
                      >
                        <option value="all">All Users</option>
                        <option value="patients">Patients Only</option>
                        <option value="doctors">Doctors Only</option>
                      </select>
                    </div>
                    
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