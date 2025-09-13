import { useState, useEffect } from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import Breadcrumb from "../../masterLayout/Breadcrumb";
import axiosInstance from "../../axiosInstance";

const AmbulanceList = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [ambulances, setAmbulances] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: ""
    // Removed logo from initial state
  });

  useEffect(() => {
    fetchAmbulances();
  }, []);

  const fetchAmbulances = async () => {
    try {
      const response = await axiosInstance.get('/ambulance');
      if (response.data.success) {
        setAmbulances(response.data.ambulances);
      }
    } catch (error) {
      console.error('Error fetching ambulances:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setFormData({
      name: ""
      // No logo property at all
    });
    setSelectedAmbulance(null);
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (ambulance) => {
    setFormData({
      name: ambulance.name || ""
      // No logo property at all
    });
    setSelectedAmbulance(ambulance);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e) => {
    // Only set selectedFile if a file was actually selected
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        selectedFile: e.target.files[0]
      }));
    }
  };

  const handleSave = async () => {
    try {
      // Create FormData object
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      
      // Handle file upload
      if (formData.selectedFile) {
        formDataToSend.append('logo', formData.selectedFile);
      }
      
      // Important: Override the default headers for FormData
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      const response = isEditMode 
        ? await axiosInstance.put(`/ambulance/${selectedAmbulance.id}`, formDataToSend, config)
        : await axiosInstance.post('/ambulance', formDataToSend, config);
      
      if (response.data.success) {
        fetchAmbulances();
        setShowModal(false);
      } else {
        alert('Error saving ambulance: ' + response.data.error);
      }
    } catch (error) {
      console.error('Error saving ambulance:', error);
      alert('Error saving ambulance');
    }
  };

  const handleDelete = async (ambulance) => {
    if (window.confirm(`Are you sure you want to delete ${ambulance.name}?`)) {
      try {
        const response = await axiosInstance.delete(`/ambulance/${ambulance.id}`);
        if (response.data.success) {
          fetchAmbulances();
        } else {
          alert('Error deleting ambulance: ' + response.data.error);
        }
      } catch (error) {
        console.error('Error deleting ambulance:', error);
        alert('Error deleting ambulance');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAmbulance(null);
    setIsEditMode(false);
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Ambulance Management" />
      <div className="container-fluid py-4">
        <div className="card shadow border-0 rounded-4">
          <div className="card-header border-bottom d-flex justify-content-between align-items-center">
            <h5 className="mb-0">🚑 Ambulance - List</h5>
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
              ✨ ADD AMBULANCE
            </button>
          </div>

          <div className="card-body">
            <div className="table-responsive" style={{ maxHeight: "60vh", overflowY: "auto" }}>
              <table className="table table-bordered table-sm table-striped table-hover align-middle">
                <thead className="table-primary sticky-top">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Logo</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : ambulances.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4">No ambulances found</td>
                    </tr>
                  ) : (
                    ambulances.map((ambulance) => (
                      <tr key={ambulance.id}>
                        <td>{ambulance.id}</td>
                        <td>{ambulance.name}</td>
                        <td>
                          {ambulance.logo && (
                            <img 
                              src={`https://xrk77z9r-5000.inc1.devtunnels.ms${ambulance.logo}`} 
                              alt={ambulance.name} 
                              style={{ width: '50px', height: '50px' }} 
                            />
                          )}
                        </td>
                        <td className="text-center">
                          <button 
                            className="btn btn-outline-primary btn-sm me-2" 
                            onClick={() => handleEdit(ambulance)}
                          >
                            ✏️ Edit
                          </button>
                          <button 
                            className="btn btn-outline-danger btn-sm" 
                            onClick={() => handleDelete(ambulance)}
                          >
                            🗑️ Delete
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
          <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content border-0 rounded-4 shadow-lg">
                <div 
                  className="modal-header text-white rounded-top-4"
                  style={{ background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)" }}
                >
                  <h5 className="modal-title">
                    🚑 {isEditMode ? "Edit Ambulance" : "Add New Ambulance"}
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close btn-close-white" 
                    onClick={handleCloseModal}
                  ></button>
                </div>
                
                <div className="modal-body p-4">
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-bold">📝 Ambulance Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter ambulance name"
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
                      {isEditMode && selectedAmbulance && selectedAmbulance.logo && (
                        <div className="mt-2">
                          <img 
                            src={`http://localhost:5000${selectedAmbulance.logo}`} 
                            alt="Current Logo" 
                            style={{ width: '100px', height: '100px' }} 
                          />
                          <p className="text-muted">Current Logo</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={handleCloseModal}
                  >
                    ❌ Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={handleSave}
                    style={{ background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)", border: "none" }}
                  >
                    💾 {isEditMode ? "Update" : "Save"}
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

export default AmbulanceList;