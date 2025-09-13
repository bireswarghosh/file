import { useState, useEffect } from "react";
import MasterLayout from "../../MasterLayout";
import Breadcrumb from "../../Breadcrumb";
import axiosInstance from "../../../axiosInstance";

const DischargeTemplateMaster = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [dischargeTemplates, setDischargeTemplates] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    DischaregeHead: ""
  });

  useEffect(() => {
    fetchDischargeTemplates();
  }, []);

  const fetchDischargeTemplates = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/dischargetemplate');
      setDischargeTemplates(response.data);
    } catch (error) {
      console.error('Error fetching discharge templates:', error);
      alert('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setFormData({
      DischaregeHead: ""
    });
    setSelectedTemplate(null);
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (template) => {
    setFormData({
      DischaregeHead: template.DischaregeHead || ""
    });
    setSelectedTemplate(template);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      
      if (selectedTemplate) {
        await axiosInstance.put(`/dischargetemplate/${selectedTemplate.DischargeTemplateId}`, formData);
        alert('Discharge Template updated successfully');
      } else {
        await axiosInstance.post('/dischargetemplate', formData);
        alert('Discharge Template created successfully');
      }
      await fetchDischargeTemplates();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving discharge template:', error);
      alert('Error saving discharge template');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this discharge template?')) {
      try {
        setLoading(true);
        await axiosInstance.delete(`/dischargetemplate/${id}`);
        await fetchDischargeTemplates();
        alert('Discharge Template deleted successfully');
      } catch (error) {
        console.error('Error deleting discharge template:', error);
        alert('Error deleting discharge template');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTemplate(null);
    setIsEditMode(false);
    setFormData({ DischaregeHead: "" });
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Discharge Template Master" />
      <div className="container-fluid py-4">
        <div className="card shadow border-0 rounded-4">
          <div className="card-header border-bottom d-flex justify-content-between align-items-center">
            <h5 className="mb-0">📋 Discharge Template Master - List {loading && '(Loading...)'}</h5>
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
              ✨ ADD TEMPLATE
            </button>
          </div>

          <div className="card-body">
            <div className="table-responsive" style={{ maxHeight: "60vh", overflowY: "auto" }}>
              <table className="table table-bordered table-sm table-striped table-hover align-middle">
                <thead className="table-primary sticky-top">
                  <tr>
                    <th>Sl.No</th>
                    <th>Discharge Head</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dischargeTemplates.map((template, index) => (
                    <tr key={template.DischargeTemplateId}>
                      <td>{index + 1}</td>
                      <td>{template.DischaregeHead}</td>
                      <td className="text-center">
                        <button 
                          className="btn btn-outline-primary btn-sm me-1" 
                          onClick={() => handleEdit(template)}
                          disabled={loading}
                        >
                          ✏️ Edit
                        </button>
                        <button 
                          className="btn btn-outline-danger btn-sm" 
                          onClick={() => handleDelete(template.DischargeTemplateId)}
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
                    📋 {isEditMode ? "Edit Discharge Template" : "Add New Discharge Template"}
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
                      <label className="form-label fw-bold text-primary">🏷️ Discharge Head</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.DischaregeHead}
                        onChange={(e) => handleInputChange("DischaregeHead", e.target.value)}
                        placeholder="Enter discharge head"
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
                    style={{ background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)", border: "none" }}
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

export default DischargeTemplateMaster;