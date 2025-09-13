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

const MExecutiveMaster = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMExecutive, setSelectedMExecutive] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [mexecutivesData, setMexecutivesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const [formData, setFormData] = useState({
    MExecutive: "",
    Add1: "",
    Add2: "",
    Add3: "",
    Phone: ""
  });

  useEffect(() => {
    fetchMExecutives();
  }, []);

  const fetchMExecutives = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/mexecutive');
      setMexecutivesData(response.data);
    } catch (error) {
      console.error('Error fetching mexecutives:', error);
      alert('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setFormData({ MExecutive: "", Add1: "", Add2: "", Add3: "", Phone: "" });
    setSelectedMExecutive(null);
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (mexecutive) => {
    setFormData({
      MExecutive: mexecutive.MExecutive || "",
      Add1: mexecutive.Add1 || "",
      Add2: mexecutive.Add2 || "",
      Add3: mexecutive.Add3 || "",
      Phone: mexecutive.Phone || ""
    });
    setSelectedMExecutive(mexecutive);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this MExecutive?')) {
      try {
        setLoading(true);
        await axiosInstance.delete(`/mexecutive/${id}`);
        await fetchMExecutives();
        alert('MExecutive deleted successfully');
      } catch (error) {
        console.error('Error deleting mexecutive:', error);
        alert('Error deleting mexecutive');
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
      if (selectedMExecutive) {
        await axiosInstance.put(`/mexecutive/${selectedMExecutive.MExecutiveId}`, formData);
        alert('MExecutive updated successfully');
      } else {
        await axiosInstance.post('/mexecutive', formData);
        alert('MExecutive created successfully');
      }
      await fetchMExecutives();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving mexecutive:', error);
      alert('Error saving mexecutive');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMExecutive(null);
    setIsEditMode(false);
  };

  return (
    <MasterLayout>
      <Breadcrumb title="MExecutive Master" />
      <div className="container-fluid py-4">
        <div className="card shadow border-0 rounded-4">
          <div className="card-header border-bottom d-flex justify-content-between align-items-center">
            <h5 className="mb-0">👨‍💼 MExecutive Master - List {loading && '(Loading...)'}</h5>
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
              ✨ ADD MEXECUTIVE
            </button>
          </div>

          <div className="card-body">
            <div className="table-responsive" style={{ maxHeight: "60vh", overflowY: "auto" }}>
              <table className="table table-bordered table-sm table-striped table-hover align-middle">
                <thead className="table-primary sticky-top">
                  <tr>
                    <th>Sl.No</th>
                    <th>MExecutive Name</th>
                    <th>Address 1</th>
                    <th>Address 2</th>
                    <th>Address 3</th>
                    <th>Phone</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mexecutivesData.map((mexecutive, index) => (
                    <tr key={mexecutive.MExecutiveId}>
                      <td>{index + 1}</td>
                      <td>{mexecutive.MExecutive}</td>
                      <td>{mexecutive.Add1}</td>
                      <td>{mexecutive.Add2}</td>
                      <td>{mexecutive.Add3}</td>
                      <td>{mexecutive.Phone}</td>
                      <td className="text-center">
                        <button 
                          className="btn btn-outline-primary btn-sm me-1" 
                          onClick={() => handleEdit(mexecutive)}
                          disabled={loading}
                        >
                          ✏️ Edit
                        </button>
                        <button 
                          className="btn btn-outline-danger btn-sm" 
                          onClick={() => handleDelete(mexecutive.MExecutiveId)}
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
                    👨‍💼 {isEditMode ? "Edit MExecutive" : "Add New MExecutive"}
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
                      <label className="form-label fw-bold text-primary">🏷️ MExecutive Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.MExecutive}
                        onChange={(e) => handleInputChange("MExecutive", e.target.value)}
                        placeholder="Enter mexecutive name"
                        style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label fw-bold text-primary">🏠 Address 1</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.Add1}
                        onChange={(e) => handleInputChange("Add1", e.target.value)}
                        placeholder="Enter address 1"
                        style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label fw-bold text-primary">🏠 Address 2</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.Add2}
                        onChange={(e) => handleInputChange("Add2", e.target.value)}
                        placeholder="Enter address 2"
                        style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label fw-bold text-primary">🏠 Address 3</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.Add3}
                        onChange={(e) => handleInputChange("Add3", e.target.value)}
                        placeholder="Enter address 3"
                        style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label fw-bold text-primary">📞 Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.Phone}
                        onChange={(e) => handleInputChange("Phone", e.target.value)}
                        placeholder="Enter phone number"
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

export default MExecutiveMaster;