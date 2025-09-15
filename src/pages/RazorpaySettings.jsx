import React, { useState, useEffect } from 'react';
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../masterLayout/Breadcrumb";
import axiosInstance from '../axiosInstance';
import { toast } from 'react-toastify';

const RazorpaySettings = () => {
  const [settings, setSettings] = useState({
    razorpay_key: '',
    razorpay_secret: ''
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/razorpay-settings');
      if (response.data.success && response.data.data) {
        setSettings({
          razorpay_key: response.data.data.razorpay_key || '',
          razorpay_secret: response.data.data.razorpay_secret || ''
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!settings.razorpay_key.trim() || !settings.razorpay_secret.trim()) {
      toast.error('Please fill in both Razorpay Key and Secret');
      return;
    }

    setSaving(true);
    try {
      const response = await axiosInstance.put('/razorpay-settings', settings);
      if (response.data.success) {
        toast.success('Razorpay settings updated successfully!');
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Razorpay Settings" />
      
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Razorpay Payment Gateway Settings</h5>
        </div>
        
        <div className="card-body">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="razorpay_key" className="form-label">
                      Razorpay Key ID <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="razorpay_key"
                      name="razorpay_key"
                      value={settings.razorpay_key}
                      onChange={handleInputChange}
                      placeholder="Enter Razorpay Key ID"
                      required
                    />
                    <small className="form-text text-muted">
                      Your Razorpay Key ID (starts with rzp_)
                    </small>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="razorpay_secret" className="form-label">
                      Razorpay Secret <span className="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="razorpay_secret"
                      name="razorpay_secret"
                      value={settings.razorpay_secret}
                      onChange={handleInputChange}
                      placeholder="Enter Razorpay Secret"
                      required
                    />
                    <small className="form-text text-muted">
                      Your Razorpay Secret Key (keep it secure)
                    </small>
                  </div>
                </div>
              </div>
              
              <div className="row">
                <div className="col-12">
                  <div className="alert alert-info">
                    <i className="fas fa-info-circle me-2"></i>
                    <strong>Important:</strong> These credentials are used for processing payments in your appointment booking app. 
                    Make sure to use the correct keys from your Razorpay dashboard.
                  </div>
                </div>
              </div>
              
              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={fetchSettings}
                  disabled={loading || saving}
                >
                  <i className="fas fa-refresh me-1"></i>
                  Reset
                </button>
                
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save me-1"></i>
                      Save Settings
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </MasterLayout>
  );
};

export default RazorpaySettings;