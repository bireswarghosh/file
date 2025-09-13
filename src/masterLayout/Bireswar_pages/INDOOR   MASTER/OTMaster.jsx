import { useState, useEffect } from "react";
import MasterLayout from "../../MasterLayout";
import Breadcrumb from "../../Breadcrumb";
// import axiosInstance from "../../../utils/axiosInstance";
import axiosInstance from "../../../axiosInstance";

const OTMaster = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOT, setSelectedOT] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [otData, setOtData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    OtMaster: "",
    Rate: 0,
  });

  useEffect(() => {
    fetchOtMasters();
  }, []);

  const fetchOtMasters = async () => {
    try {
      const response = await axiosInstance.get('/otMaster');
      if (response.data.success) {
        setOtData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching OT masters:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setFormData({ OtMaster: "", Rate: 0 });
    setSelectedOT(null);
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (ot) => {
    setFormData({ OtMaster: ot.OtMaster || "", Rate: ot.Rate || 0 });
    setSelectedOT(ot);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const response = isEditMode 
        ? await axiosInstance.put(`/otMaster/${selectedOT.OtMasterId}`, formData)
        : await axiosInstance.post('/otMaster', formData);
      
      if (response.data.success) {
        fetchOtMasters();
        setShowModal(false);
      } else {
        alert('Error saving OT master: ' + response.data.error);
      }
    } catch (error) {
      console.error('Error saving OT master:', error);
      alert('Error saving OT master');
    }
  };

  const handleDelete = async (ot) => {
    if (window.confirm(`Are you sure you want to delete ${ot.OtMaster}?`)) {
      try {
        const response = await axiosInstance.delete(`/otMaster/${ot.OtMasterId}`);
        if (response.data.success) {
          fetchOtMasters();
        } else {
          alert('Error deleting OT master: ' + response.data.error);
        }
      } catch (error) {
        console.error('Error deleting OT master:', error);
        alert('Error deleting OT master');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOT(null);
    setIsEditMode(false);
  };

  return (
    <MasterLayout>
      <Breadcrumb title="OT Master" />
      <div className="container-fluid py-4">
        <div className="card shadow border-0 rounded-4">
          <div className="card-header border-bottom d-flex justify-content-between align-items-center">
            <h5 className="mb-0">🏥 OT Master - List</h5>
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
              ✨ ADD OT
            </button>
          </div>

          <div className="card-body">
            <div className="table-responsive" style={{ maxHeight: "60vh", overflowY: "auto" }}>
              <table className="table table-bordered table-sm table-striped table-hover align-middle">
                <thead className="table-primary sticky-top">
                  <tr>
                    <th>OT Master</th>
                    <th className="text-end">Rate (₹)</th>
                 
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
                  ) : otData.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4">No OT masters found</td>
                    </tr>
                  ) : (
                    otData.map((ot) => (
                      <tr key={ot.OtMasterId}>
                        <td>{ot.OtMaster}</td>
                        <td className="text-end">₹{(ot.Rate || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                       
                        <td className="text-center">
                          <button className="btn btn-outline-primary btn-sm me-2" onClick={() => handleEdit(ot)}>
                            ✏️ Edit
                          </button>
                          <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(ot)}>
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
                <div className="modal-header text-white rounded-top-4" style={{ background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)" }}>
                  <h5 className="modal-title">🏥 {isEditMode ? "Edit OT" : "Add New OT"}</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body p-4">
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-bold">🏥 OT Master</label>
                      <input type="text" className="form-control" value={formData.OtMaster} onChange={(e) => handleInputChange("OtMaster", e.target.value)} placeholder="Enter OT master name" />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold">💰 Rate (₹)</label>
                      <input type="number" className="form-control" value={formData.Rate} onChange={(e) => handleInputChange("Rate", Number(e.target.value))} placeholder="Enter rate amount" step="0.01" />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>❌ Cancel</button>
                  <button type="button" className="btn btn-primary" onClick={handleSave} style={{ background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)", border: "none" }}>💾 {isEditMode ? "Update" : "Save"}</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MasterLayout>
  );
};

export default OTMaster;