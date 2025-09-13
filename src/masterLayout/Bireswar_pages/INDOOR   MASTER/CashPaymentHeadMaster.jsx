import { useState, useEffect } from "react";
import MasterLayout from "../../MasterLayout";
import Breadcrumb from "../../Breadcrumb";
import axiosInstance from "../../../axiosInstance";

const CashPaymentHeadMaster = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedHead, setSelectedHead] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [cashPaymentHeads, setCashPaymentHeads] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    CashPaymentHead: "",
    doctorId: "",
    doctorY: ""
  });

  useEffect(() => {
    fetchCashPaymentHeads();
  }, []);

  const fetchCashPaymentHeads = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/cashpaymenthead');
      setCashPaymentHeads(response.data);
    } catch (error) {
      console.error('Error fetching cash payment heads:', error);
      alert('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setFormData({
      CashPaymentHead: "",
      doctorId: "",
      doctorY: ""
    });
    setSelectedHead(null);
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (head) => {
    setFormData({
      CashPaymentHead: head.CashPaymentHead || "",
      doctorId: head.doctorId || "",
      doctorY: head.doctorY || ""
    });
    setSelectedHead(head);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const submitData = {
        ...formData,
        doctorId: formData.doctorId ? parseInt(formData.doctorId) : null,
        doctorY: formData.doctorY ? parseInt(formData.doctorY) : null
      };
      
      if (selectedHead) {
        await axiosInstance.put(`/cashpaymenthead/${selectedHead.CashPaymentHeadId}`, submitData);
        alert('Cash Payment Head updated successfully');
      } else {
        await axiosInstance.post('/cashpaymenthead', submitData);
        alert('Cash Payment Head created successfully');
      }
      await fetchCashPaymentHeads();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving cash payment head:', error);
      alert('Error saving cash payment head');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this cash payment head?')) {
      try {
        setLoading(true);
        await axiosInstance.delete(`/cashpaymenthead/${id}`);
        await fetchCashPaymentHeads();
        alert('Cash Payment Head deleted successfully');
      } catch (error) {
        console.error('Error deleting cash payment head:', error);
        alert('Error deleting cash payment head');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedHead(null);
    setIsEditMode(false);
    setFormData({ CashPaymentHead: "", doctorId: "", doctorY: "" });
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Cash Payment Head Master" />
      <div className="container-fluid py-4">
        <div className="card shadow border-0 rounded-4">
          <div className="card-header border-bottom d-flex justify-content-between align-items-center">
            <h5 className="mb-0">💰 Cash Payment Head Master - List {loading && '(Loading...)'}</h5>
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
              ✨ ADD HEAD
            </button>
          </div>

          <div className="card-body">
            <div className="table-responsive" style={{ maxHeight: "60vh", overflowY: "auto" }}>
              <table className="table table-bordered table-sm table-striped table-hover align-middle">
                <thead className="table-primary sticky-top">
                  <tr>
                    <th>Sl.No</th>
                    <th>Cash Payment Head Name</th>
                    <th>Doctor ID</th>
                    <th>Doctor Y</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cashPaymentHeads.map((head, index) => (
                    <tr key={head.CashPaymentHeadId}>
                      <td>{index + 1}</td>
                      <td>{head.CashPaymentHead}</td>
                      <td>{head.doctorId || 'N/A'}</td>
                      <td>{head.doctorY || 'N/A'}</td>
                      <td className="text-center">
                        <button 
                          className="btn btn-outline-primary btn-sm me-1" 
                          onClick={() => handleEdit(head)}
                          disabled={loading}
                        >
                          ✏️ Edit
                        </button>
                        <button 
                          className="btn btn-outline-danger btn-sm" 
                          onClick={() => handleDelete(head.CashPaymentHeadId)}
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
                    💰 {isEditMode ? "Edit Cash Payment Head" : "Add New Cash Payment Head"}
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
                      <label className="form-label fw-bold text-primary">🏷️ Cash Payment Head Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.CashPaymentHead}
                        onChange={(e) => handleInputChange("CashPaymentHead", e.target.value)}
                        placeholder="Enter cash payment head name"
                        style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label fw-bold text-primary">👨⚕️ Doctor ID</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.doctorId}
                        onChange={(e) => handleInputChange("doctorId", e.target.value)}
                        placeholder="Enter doctor ID"
                        style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label fw-bold text-primary">📊 Doctor Y</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.doctorY}
                        onChange={(e) => handleInputChange("doctorY", e.target.value)}
                        placeholder="Enter doctor Y value"
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

export default CashPaymentHeadMaster;