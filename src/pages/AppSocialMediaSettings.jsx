import React, { useState, useEffect } from 'react';
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../masterLayout/Breadcrumb";
import axiosInstance from '../axiosInstance';
import { toast } from 'react-toastify';

const AppSocialMediaSettings = () => {
  const [socialMedia, setSocialMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    platform_name: '',
    platform_url: '',
    icon_name: '',
    is_active: 1,
    sort_order: 0
  });

  const socialPlatforms = [
    { name: 'Facebook', icon: 'fab fa-facebook-f', placeholder: 'https://facebook.com/yourpage' },
    { name: 'Instagram', icon: 'fab fa-instagram', placeholder: 'https://instagram.com/youraccount' },
    { name: 'Twitter', icon: 'fab fa-twitter', placeholder: 'https://twitter.com/youraccount' },
    { name: 'YouTube', icon: 'fab fa-youtube', placeholder: 'https://youtube.com/yourchannel' },
    { name: 'LinkedIn', icon: 'fab fa-linkedin-in', placeholder: 'https://linkedin.com/company/yourcompany' },
    { name: 'WhatsApp', icon: 'fab fa-whatsapp', placeholder: 'https://wa.me/1234567890' },
    { name: 'Telegram', icon: 'fab fa-telegram-plane', placeholder: 'https://t.me/yourchannel' },
    { name: 'TikTok', icon: 'fab fa-tiktok', placeholder: 'https://tiktok.com/@youraccount' }
  ];

  useEffect(() => {
    fetchSocialMedia();
  }, []);

  const fetchSocialMedia = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/app-social-media');
      if (response.data.success) {
        setSocialMedia(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching social media:', error);
      toast.error('Failed to load social media links');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }));
  };

  const handlePlatformSelect = (platform) => {
    setFormData(prev => ({
      ...prev,
      platform_name: platform.name,
      icon_name: platform.icon,
      platform_url: platform.placeholder
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.platform_name || !formData.platform_url) {
      toast.error('Please fill in platform name and URL');
      return;
    }

    setSaving(true);
    try {
      let response;
      if (editingId) {
        response = await axiosInstance.put(`/app-social-media/${editingId}`, formData);
      } else {
        response = await axiosInstance.post('/app-social-media', formData);
      }

      if (response.data.success) {
        toast.success(editingId ? 'Social media link updated!' : 'Social media link added!');
        resetForm();
        fetchSocialMedia();
      }
    } catch (error) {
      console.error('Error saving social media:', error);
      toast.error('Failed to save social media link');
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setFormData({ platform_name: '', platform_url: '', icon_name: '', is_active: 1, sort_order: 0 });
    setShowAddForm(false);
    setEditingId(null);
  };

  const editSocialMedia = (item) => {
    setFormData({
      platform_name: item.platform_name,
      platform_url: item.platform_url,
      icon_name: item.icon_name,
      is_active: item.is_active,
      sort_order: item.sort_order
    });
    setEditingId(item.id);
    setShowAddForm(true);
  };

  const deleteSocialMedia = async (id) => {
    if (!window.confirm('Are you sure you want to delete this social media link?')) return;
    
    try {
      const response = await axiosInstance.delete(`/app-social-media/${id}`);
      if (response.data.success) {
        toast.success('Social media link deleted!');
        fetchSocialMedia();
      }
    } catch (error) {
      console.error('Error deleting social media:', error);
      toast.error('Failed to delete social media link');
    }
  };

  return (
    <MasterLayout>
      <Breadcrumb title="App Social Media Management" />
      
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">Social Media Links Management</h5>
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <i className="fas fa-plus me-1"></i>
            Add Social Media Link
          </button>
        </div>
        
        <div className="card-body">
          {showAddForm && (
            <div className="mb-4 p-3 border rounded">
              <h6>{editingId ? 'Edit' : 'Add'} Social Media Link</h6>
              
              <div className="mb-3">
                <label className="form-label">Quick Select Platform:</label>
                <div className="row">
                  {socialPlatforms.map((platform, index) => (
                    <div key={index} className="col-md-3 col-sm-6 mb-2">
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm w-100"
                        onClick={() => handlePlatformSelect(platform)}
                      >
                        <i className={platform.icon} style={{ marginRight: '5px' }}></i>
                        {platform.name}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label">Platform Name <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        name="platform_name"
                        value={formData.platform_name}
                        onChange={handleInputChange}
                        placeholder="e.g., Facebook"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label">Icon Class</label>
                      <input
                        type="text"
                        className="form-control"
                        name="icon_name"
                        value={formData.icon_name}
                        onChange={handleInputChange}
                        placeholder="e.g., fab fa-facebook-f"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label">Sort Order</label>
                      <input
                        type="number"
                        className="form-control"
                        name="sort_order"
                        value={formData.sort_order}
                        onChange={handleInputChange}
                        min="0"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Platform URL <span className="text-danger">*</span></label>
                  <input
                    type="url"
                    className="form-control"
                    name="platform_url"
                    value={formData.platform_url}
                    onChange={handleInputChange}
                    placeholder="https://facebook.com/yourpage"
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="is_active"
                      checked={formData.is_active === 1}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label">Active</label>
                  </div>
                </div>
                
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-success" disabled={saving}>
                    {saving ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-save me-1"></i>
                        {editingId ? 'Update' : 'Add'} Link
                      </>
                    )}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={resetForm}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary"></div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Platform</th>
                    <th>URL</th>
                    <th>Status</th>
                    <th>Order</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {socialMedia.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        <p className="text-muted">No social media links found. Add your first link!</p>
                      </td>
                    </tr>
                  ) : (
                    socialMedia.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <i className={item.icon_name} style={{ marginRight: '8px', color: '#007bff' }}></i>
                          {item.platform_name}
                        </td>
                        <td>
                          <a href={item.platform_url} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                            {item.platform_url.length > 40 ? item.platform_url.substring(0, 40) + '...' : item.platform_url}
                          </a>
                        </td>
                        <td>
                          <span className={`badge ${item.is_active ? 'bg-success' : 'bg-secondary'}`}>
                            {item.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>{item.sort_order}</td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <button 
                              className="btn btn-outline-primary"
                              onClick={() => editSocialMedia(item)}
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button 
                              className="btn btn-outline-danger"
                              onClick={() => deleteSocialMedia(item.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </MasterLayout>
  );
};

export default AppSocialMediaSettings;