import { useState, useEffect } from "react";
import MasterLayout from "../../MasterLayout";
import Breadcrumb from "../../Breadcrumb";
import axiosInstance from "../../../axiosInstance";

// Notification component
const Notification = ({ type, message, onClose }) => {
  const getNotificationStyle = () => {
    switch (type) {
      case 'success':
        return {
          background: 'linear-gradient(45deg, #4CAF50, #45a049)',
          icon: '✅',
          color: '#fff'
        };
      case 'update':
        return {
          background: 'linear-gradient(45deg, #2196F3, #1976D2)',
          icon: '🔄',
          color: '#fff'
        };
      case 'delete':
        return {
          background: 'linear-gradient(45deg, #f44336, #d32f2f)',
          icon: '🗑️',
          color: '#fff'
        };
      case 'error':
        return {
          background: 'linear-gradient(45deg, #FF5722, #E64A19)',
          icon: '❌',
          color: '#fff'
        };
      default:
        return {
          background: 'linear-gradient(45deg, #607D8B, #455A64)',
          icon: 'ℹ️',
          color: '#fff'
        };
    }
  };

  const style = getNotificationStyle();

  return (
    <div
      className="position-fixed top-0 end-0 m-3"
      style={{
        zIndex: 9999,
        minWidth: '300px',
        animation: 'slideInRight 0.5s ease-out'
      }}
    >
      <div
        className="alert d-flex align-items-center shadow-lg border-0 rounded-4"
        style={{
          background: style.background,
          color: style.color,
          border: 'none'
        }}
      >
        <div className="me-3" style={{ fontSize: '24px' }}>
          {style.icon}
        </div>
        <div className="flex-grow-1">
          <strong>{message}</strong>
        </div>
        <button
          type="button"
          className="btn-close btn-close-white ms-2"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};

const ReligionMaster = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedReligion, setSelectedReligion] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [religionsData, setReligionsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const [formData, setFormData] = useState({
    Religion: ""
  });

  useEffect(() => {
    fetchReligions();
  }, []);

  const fetchReligions = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/religion');
      if (response.data.success) {
        setReligionsData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching religions:', error);
      alert('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setFormData({ Religion: "" });
    setSelectedReligion(null);
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (religion) => {
    setFormData({ Religion: religion.Religion || "" });
    setSelectedReligion(religion);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this religion?')) {
      try {
        setLoading(true);
        const response = await axiosInstance.delete(`/religion/${id}`);
        if (response.data.success) {
          await fetchReligions();
          alert('Religion deleted successfully');
        } else {
          alert('Error: ' + response.data.error);
        }
      } catch (error) {
        console.error('Error deleting religion:', error);
        alert('Error deleting religion');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = selectedReligion 
        ? await axiosInstance.put(`/religion/${selectedReligion.ReligionId}`, formData)
        : await axiosInstance.post('/religion', formData);
      
      if (response.data.success) {
        await fetchReligions();
        setShowModal(false);
        alert(selectedReligion ? 'Religion updated successfully' : 'Religion created successfully');
      } else {
        alert('Error: ' + response.data.error);
      }
    } catch (error) {
      console.error('Error saving religion:', error);
      alert('Error saving religion');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReligion(null);
    setIsEditMode(false);
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Religion Master" />
      <div className="container-fluid py-4">
        <div className="card shadow border-0 rounded-4">
          <div className="card-header border-bottom d-flex justify-content-between align-items-center">
            <h5 className="mb-0">🕌 Religion Master - List {loading && '(Loading...)'}</h5>
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
              ✨ ADD RELIGION
            </button>
          </div>

          <div className="card-body">
            <div className="table-responsive" style={{ maxHeight: "60vh", overflowY: "auto" }}>
              <table className="table table-bordered table-sm table-striped table-hover align-middle">
                <thead className="table-primary sticky-top">
                  <tr>
                    <th>Sl.No</th>
                    <th>Religion Name</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {religionsData.map((religion, index) => (
                    <tr key={religion.ReligionId}>
                      <td>{index + 1}</td>
                      <td>{religion.Religion}</td>
                      <td className="text-center">
                        <button 
                          className="btn btn-outline-primary btn-sm me-1" 
                          onClick={() => handleEdit(religion)}
                          disabled={loading}
                        >
                          ✏️ Edit
                        </button>
                        <button 
                          className="btn btn-outline-danger btn-sm" 
                          onClick={() => handleDelete(religion.ReligionId)}
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
                    🕌 {isEditMode ? "Edit Religion" : "Add New Religion"}
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
                      <label className="form-label fw-bold text-primary">🏷️ Religion Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.Religion}
                        onChange={(e) => handleInputChange("Religion", e.target.value)}
                        placeholder="Enter religion name"
                        style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={handleCloseModal}
                    disabled={loading}
                  >
                    ❌ Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={handleSave}
                    disabled={loading}
                    style={{ background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)", border: "none" }}
                  >
                    {loading ? '⏳ Processing...' : `💾 ${isEditMode ? "Update" : "Save"}`}
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

export default ReligionMaster;