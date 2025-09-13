import { useState, useEffect } from "react";
import MasterLayout from "../../MasterLayout";
import Breadcrumb from "../../Breadcrumb";
// import axiosInstance from "../../../utils/axiosInstance";
import axiosInstance from "../../../axiosInstance";

const OTSlotMaster = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [slotData, setSlotData] = useState([]);
  const [otMasters, setOtMasters] = useState([]);
  const [depGroups, setDepGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    OtMasterId: "",
    OTSlot: "",
    Rate: 0,                    
    DepGroupId: "",
  });


  useEffect(() => {
    fetchOtSlots();
    fetchOtMasters();
    fetchDepGroups();
  }, []);

  

  const fetchOtSlots = async () => {
    try {
      const response = await axiosInstance.get('/otSlot');
      if (response.data.success) {
        setSlotData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching OT slots:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOtMasters = async () => {
    try {
      const response = await axiosInstance.get('/otSlot/otmasters');
      if (response.data.success) {
        setOtMasters(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching OT masters:', error);
    }
  };

  const fetchDepGroups = async () => {
    try {
      const response = await axiosInstance.get('/otSlot/depgroups');
      if (response.data.success) {
        setDepGroups(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching dep groups:', error);
    }
  };

  const handleAddNew = () => {
    setFormData({ OtMasterId: "", OTSlot: "", Rate: 0, DepGroupId: "" });
    setSelectedSlot(null);
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (slot) => {
    setFormData({ 
      OtMasterId: slot.OtMasterId || "", 
      OTSlot: slot.OTSlot || "", 
      Rate: slot.Rate || 0, 
      DepGroupId: slot.DepGroupId || "" 
    });
    setSelectedSlot(slot);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const response = isEditMode 
        ? await axiosInstance.put(`/otSlot/${selectedSlot.OTSlotId}`, formData)
        : await axiosInstance.post('/otSlot', formData);
      
      if (response.data.success) {
        fetchOtSlots();
        setShowModal(false);
      } else {
        alert('Error saving OT slot: ' + response.data.error);
      }
    } catch (error) {
      console.error('Error saving OT slot:', error);
      alert('Error saving OT slot');
    }
  };

  const handleDelete = async (slot) => {
    if (window.confirm(`Are you sure you want to delete ${slot.OTSlot}?`)) {
      try {
        const response = await axiosInstance.delete(`/otSlot/${slot.OTSlotId}`);
        if (response.data.success) {
          fetchOtSlots();
        } else {
          alert('Error deleting OT slot: ' + response.data.error);
        }
      } catch (error) {
        console.error('Error deleting OT slot:', error);
        alert('Error deleting OT slot');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSlot(null);
    setIsEditMode(false);
  };

  return (
    <MasterLayout>
      <Breadcrumb title="OT Slot Master" />
      <div className="container-fluid py-4">
        <div className="card shadow border-0 rounded-4">
          <div className="card-header border-bottom d-flex justify-content-between align-items-center">
            <h5 className="mb-0">⏰ OT Slot Master - List</h5>
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
              ✨ ADD SLOT
            </button>
          </div>

          <div className="card-body">
            <div className="table-responsive" style={{ maxHeight: "60vh", overflowY: "auto" }}>
              <table className="table table-bordered table-sm table-striped table-hover align-middle">
                <thead className="table-primary sticky-top">
                  <tr>
                    <th>OT Master</th>
                    <th>OT Slot</th>
                    <th className="text-end">Rate (₹)</th>
                    <th>Dep Group</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : slotData.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4">No OT slots found</td>
                    </tr>
                  ) : (
                    slotData.map((slot) => (
                      <tr key={slot.OTSlotId}>
                        <td>{slot.OtMaster || 'N/A'}</td>
                        <td>{slot.OTSlot}</td>
                        <td className="text-end">₹{(slot.Rate || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                        <td>{slot.DepGroup || 'N/A'}</td>
                        <td className="text-center">
                          <button className="btn btn-outline-primary btn-sm me-2" onClick={() => handleEdit(slot)}>
                            ✏️ Edit
                          </button>
                          <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(slot)}>
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
                  <h5 className="modal-title">⏰ {isEditMode ? "Edit OT Slot" : "Add New OT Slot"}</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body p-4">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-bold">🏥 OT Master</label>
                      <select className="form-control" value={formData.OtMasterId} onChange={(e) => handleInputChange("OtMasterId", Number(e.target.value))}>
                        <option value="">Select OT Master</option>
                        {otMasters.map((ot) => (
                          <option key={ot.OtMasterId} value={ot.OtMasterId}>
                            {ot.OtMaster}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">🏢 Department Group</label>
                      <select className="form-control" value={formData.DepGroupId} onChange={(e) => handleInputChange("DepGroupId", Number(e.target.value))}>
                        <option value="">Select Department Group</option>
                        {depGroups.map((dep) => (
                          <option key={dep.DepGroupId} value={dep.DepGroupId}>
                            {dep.DepGroup}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold">⏰ OT Slot</label>
                      <input type="text" className="form-control" value={formData.OTSlot} onChange={(e) => handleInputChange("OTSlot", e.target.value)} placeholder="Enter OT slot (e.g., 00:01 TO 01:00)" />
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

export default OTSlotMaster;