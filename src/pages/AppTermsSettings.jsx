import React, { useState, useEffect } from 'react';
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../masterLayout/Breadcrumb";
import axiosInstance from '../axiosInstance';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Custom CSS to fix ReactQuill issues
const customStyles = `
  .ql-editor {
    min-height: 150px;
    max-height: 300px;
    overflow-y: auto;
  }
  .quill-container {
    margin-bottom: 20px !important;
  }
`;

// Inject custom styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = customStyles;
  document.head.appendChild(styleSheet);
}

const AppTermsSettings = () => {
  const [settings, setSettings] = useState({
    terms_content: '',
    privacy_policy: '',
    about_us: ''
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/app-terms');
      if (response.data.success && response.data.data) {
        setSettings({
          terms_content: response.data.data.terms_content || '',
          privacy_policy: response.data.data.privacy_policy || '',
          about_us: response.data.data.about_us || ''
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

  const handleQuillChange = (content, field) => {
    setSettings(prev => ({
      ...prev,
      [field]: content
    }));
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['link'],
      ['clean']
    ],
  };

  const quillFormats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent', 'link'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Remove HTML tags for validation
    const termsText = settings.terms_content.replace(/<[^>]*>/g, '').trim();
    const policyText = settings.privacy_policy.replace(/<[^>]*>/g, '').trim();
    const aboutText = settings.about_us.replace(/<[^>]*>/g, '').trim();
    
    if (!termsText || !policyText || !aboutText) {
      toast.error('Please fill in Terms & Conditions, Privacy Policy, and About Us');
      return;
    }

    setSaving(true);
    try {
      const response = await axiosInstance.put('/app-terms', settings);
      if (response.data.success) {
        toast.success('App Terms & Conditions updated successfully!');
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
      <Breadcrumb title="App Terms & Conditions" />
      
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">App Terms & Conditions Settings</h5>
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
                <div className="col-12">
                  <div className="mb-4">
                    <label className="form-label">
                      Terms & Conditions <span className="text-danger">*</span>
                    </label>
                    <div className="quill-container" style={{ marginBottom: '60px' }}>
                      <ReactQuill
                        theme="snow"
                        value={settings.terms_content}
                        onChange={(content) => handleQuillChange(content, 'terms_content')}
                        modules={quillModules}
                        formats={quillFormats}
                        placeholder="Enter Terms & Conditions content with formatting..."
                        style={{ height: '200px' }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="col-12">
                  <div className="mb-4">
                    <label className="form-label">
                      Privacy Policy <span className="text-danger">*</span>
                    </label>
                    <div className="quill-container" style={{ marginBottom: '60px' }}>
                      <ReactQuill
                        theme="snow"
                        value={settings.privacy_policy}
                        onChange={(content) => handleQuillChange(content, 'privacy_policy')}
                        modules={quillModules}
                        formats={quillFormats}
                        placeholder="Enter Privacy Policy content with formatting..."
                        style={{ height: '200px' }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="col-12">
                  <div className="mb-4">
                    <label className="form-label">
                      About Us <span className="text-danger">*</span>
                    </label>
                    <div className="quill-container" style={{ marginBottom: '60px' }}>
                      <ReactQuill
                        theme="snow"
                        value={settings.about_us}
                        onChange={(content) => handleQuillChange(content, 'about_us')}
                        modules={quillModules}
                        formats={quillFormats}
                        placeholder="Enter About Us content with formatting..."
                        style={{ height: '200px' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="row">
                <div className="col-12">
                  <div className="alert alert-info">
                    <i className="fas fa-info-circle me-2"></i>
                    <strong>Important:</strong> These terms, privacy policy, and about us content will be displayed in your mobile app. 
                    Make sure the content is accurate and legally compliant.
                  </div>
                </div>
              </div>
              
              <div className="d-flex justify-content-end gap-2" style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #dee2e6', clear: 'both', position: 'relative', zIndex: 10 }}>
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

export default AppTermsSettings;