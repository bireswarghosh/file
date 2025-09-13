import { useState, useEffect } from "react";
import MasterLayout from "../../MasterLayout";
import Breadcrumb from "../../Breadcrumb";
// Main-file-react_Wowdash\file\src\axiosInstance.js
import axiosInstance from "../../../axiosInstance";




const DayCareBedRate = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRate, setSelectedRate] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [rateData, setRateData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    DayCare: "",
    Rate: 0,
  });


  useEffect(() => {
    fetchDayCares();
  }, []);


  const fetchDayCares = async () => {
    try {
      const response = await axiosInstance.get('/dayCare');
      if (response.data.success) {
        setRateData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching day cares:', error);
    } finally {
      setLoading(false);
    }
  };


  

  const handleAddNew = () => {
    setFormData({
      DayCare: "",
      Rate: 0,
    });
    setSelectedRate(null);
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (rateItem) => {
    setFormData({
      DayCare: rateItem.DayCare || "",
      Rate: rateItem.Rate || 0,
    });
    setSelectedRate(rateItem);
    setIsEditMode(true);
    setShowModal(true);
  };

  
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  const handleSave = async () => {
    try {
      const response = isEditMode 
        ? await axiosInstance.put(`/dayCare/${selectedRate.DayCareId}`, formData)
        : await axiosInstance.post('/dayCare', formData);
      
      if (response.data.success) {
        fetchDayCares();
        setShowModal(false);
      } else {
        alert('Error saving day care: ' + response.data.error);
      }
    } catch (error) {
      console.error('Error saving day care:', error);
      alert('Error saving day care');
    }
  };


  const handleDelete = async (rateItem) => {
    if (window.confirm(`Are you sure you want to delete ${rateItem.DayCare}?`)) {
      try {
        const response = await axiosInstance.delete(`/dayCare/${rateItem.DayCareId}`);
        if (response.data.success) {
          fetchDayCares();
        } else {
          alert('Error deleting day care: ' + response.data.error);
        }
      } catch (error) {
        console.error('Error deleting day care:', error);
        alert('Error deleting day care');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRate(null);
    setIsEditMode(false);
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Day Care Bed Rate" />
      <div className="container-fluid py-4">
        <div className="card shadow border-0 rounded-4">
          <div className="card-header border-bottom d-flex justify-content-between align-items-center">
            <h5 className="mb-0">💰 Day Care Bed Rate - List</h5>
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
              ✨ ADD RATE
            </button>
          </div>

          <div className="card-body">
            <div className="table-responsive" style={{ maxHeight: "60vh", overflowY: "auto" }}>
              <table className="table table-bordered table-sm table-striped table-hover align-middle">
                <thead className="table-primary sticky-top">
                  <tr>
                    <th>Particular</th>
                    <th className="text-end">Rate (₹)</th>
                    <th className="text-center">Status</th>
                    {/* <th className="text-center">Action</th> */}
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
                  ) : rateData.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4">No day care rates found</td>
                    </tr>
                  ) : (
                    rateData.map((rateItem) => (
                      <tr key={rateItem.DayCareId}>
                        <td>{rateItem.DayCare}</td>
                        <td className="text-end">₹{(rateItem.Rate || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                      
                      
                        {/* <td className="text-center">
                          <span className="badge bg-success">
                            🟢 Active
                          </span>
                        </td> */}


                        <td className="text-center">
                          <button 
                            className="btn btn-outline-primary btn-sm me-2" 
                            onClick={() => handleEdit(rateItem)}
                          >
                            ✏️ Edit
                          </button>
                          <button 
                            className="btn btn-outline-danger btn-sm" 
                            onClick={() => handleDelete(rateItem)}
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
                    💰 {isEditMode ? "Edit Day Care Bed Rate" : "Add New Day Care Bed Rate"}
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
                      <label className="form-label fw-bold">📝 Particular</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.DayCare}
                        onChange={(e) => handleInputChange("DayCare", e.target.value)}
                        placeholder="Enter particular (e.g., M1, M2, M3...)"
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold">💰 Rate (₹)</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.Rate}
                        onChange={(e) => handleInputChange("Rate", Number(e.target.value))}
                        placeholder="Enter rate amount"
                        step="0.01"
                      />
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

export default DayCareBedRate;