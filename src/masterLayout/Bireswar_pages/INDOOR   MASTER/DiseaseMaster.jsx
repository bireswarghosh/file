import { useState, useEffect } from "react";
import MasterLayout from "../../MasterLayout";
import Breadcrumb from "../../Breadcrumb";
import axiosInstance from "../../../axiosInstance";

const DiseaseMaster = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [diseaseData, setDiseaseData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    Disease: "",
    Diseasecode: ""
  });

  useEffect(() => {
    fetchDiseases();
  }, []);

  const fetchDiseases = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/disease');
      setDiseaseData(response.data);
    } catch (error) {
      console.error('Error fetching diseases:', error);
      alert('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (disease) => {
    setFormData({
      Disease: disease.Disease || "",
      Diseasecode: disease.Diseasecode || ""
    });
    setSelectedDisease(disease);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setFormData({
      Disease: "",
      Diseasecode: ""
    });
    setSelectedDisease(null);
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      if (selectedDisease) {
        await axiosInstance.put(`/disease/${selectedDisease.DiseaseId}`, formData);
        alert('Disease updated successfully');
      } else {
        await axiosInstance.post('/disease', formData);
        alert('Disease created successfully');
      }
      await fetchDiseases();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving disease:', error);
      alert('Error saving disease');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this disease?')) {
      try {
        setLoading(true);
        await axiosInstance.delete(`/disease/${id}`);
        await fetchDiseases();
        alert('Disease deleted successfully');
      } catch (error) {
        console.error('Error deleting disease:', error);
        alert('Error deleting disease');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDisease(null);
    setIsEditMode(false);
    setFormData({ Disease: "", Diseasecode: "" });
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Disease Master" />
      <div className="container-fluid py-4">
        <div className="card shadow border-0 rounded-4">
          <div className="card-header border-bottom d-flex justify-content-between align-items-center">
            <h5 className="mb-0">🩺 Disease Master - List {loading && '(Loading...)'}</h5>
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
              ✨ ADD DISEASE
            </button>
          </div>

            <div className="card-body">
              <div className="table-responsive" style={{ maxHeight: "60vh", overflowY: "auto" }}>
                <table className="table table-bordered table-sm table-striped table-hover align-middle">
                  <thead className="table-primary sticky-top">
                    <tr>
                      <th>Sl.No</th>
                      <th>Disease Name</th>
                      <th>Disease Code</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {diseaseData.map((disease, index) => (
                      <tr key={disease.DiseaseId}>
                        <td>{index + 1}</td>
                        <td>{disease.Disease}</td>
                        <td>{disease.Diseasecode}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-outline-primary btn-sm me-1"
                            onClick={() => handleEdit(disease)}
                            disabled={loading}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDelete(disease.DiseaseId)}
                            disabled={loading}
                          >
                            🗑️ Delete
                          </button>
                        </td>
                      </tr>
                    ))}
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
                    🩺 {isEditMode ? "Edit Disease" : "Add New Disease"}
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
                      <label className="form-label fw-bold text-primary">🏷️ Disease Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.Disease}
                        onChange={(e) => handleInputChange("Disease", e.target.value)}
                        placeholder="Enter disease name"
                        style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold text-primary">📝 Disease Code</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.Diseasecode}
                        onChange={(e) => handleInputChange("Diseasecode", e.target.value)}
                        placeholder="Enter disease code"
                        style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary rounded-pill px-4" 
                    onClick={handleCloseModal}
                  >
                    ❌ Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary rounded-pill px-4"
                    onClick={handleSave}
                    disabled={loading}
                    style={{
                      background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
                      border: "none"
                    }}
                  >
                    {loading ? "⏳ Saving..." : (isEditMode ? "🔄 Update" : "💾 Save")}
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

export default DiseaseMaster;