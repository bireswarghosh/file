import { useState } from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import Breadcrumb from "../../masterLayout/Breadcrumb";
import axiosInstance from "../../axiosInstance";
import { useNavigate } from 'react-router-dom';

const AddAmbulance = () => {
  const [formData, setFormData] = useState({
    name: "",
    logo: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      logo: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      setError('Ambulance name is required');
      return;
    }

    try {
      setLoading(true);
      
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      if (formData.logo) {
        formDataToSend.append('logo', formData.logo);
      }
      
      const response = await axiosInstance.post('/ambulance', formDataToSend);
      
      if (response.data.success) {
        alert('Ambulance added successfully');
        navigate('/ambulance-list');
      } else {
        setError('Failed to add ambulance: ' + response.data.error);
      }
    } catch (error) {
      console.error('Error adding ambulance:', error);
      setError('Failed to add ambulance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Add New Ambulance" />
      <div className="container-fluid py-4">
        <div className="card shadow border-0 rounded-4">
          <div className="card-header border-bottom">
            <h5 className="mb-0">🚑 Add New Ambulance</h5>
          </div>
          <div className="card-body">
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label fw-bold">📝 Ambulance Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={formData.name} 
                    onChange={(e) => handleInputChange("name", e.target.value)} 
                    placeholder="Enter ambulance name"
                    required 
                  />
                </div>
                <div className="col-12">
                  <label className="form-label fw-bold">🖼️ Logo</label>
                  <input 
                    type="file" 
                    className="form-control" 
                    onChange={handleFileChange} 
                    accept="image/*" 
                  />
                </div>
                <div className="col-12 mt-4">
                  <button 
                    type="submit" 
                    className="btn btn-primary px-4 py-2"
                    disabled={loading}
                    style={{ background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)", border: "none" }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Adding...
                      </>
                    ) : (
                      <>
                        ✨ Add Ambulance
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default AddAmbulance;