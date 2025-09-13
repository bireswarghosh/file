import { useState, useEffect } from "react";
import MasterLayout from "../../MasterLayout";
import Breadcrumb from "../../Breadcrumb";
import axiosInstance from "../../../axiosInstance";

const BillPrintHeadMaster = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedHead, setSelectedHead] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [headData, setHeadData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    BillPrintHead: "",
    Slno: 0,
  });

  useEffect(() => {
    fetchBillPrintHeads();
  }, []);

  const fetchBillPrintHeads = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/billPrintHead');
      if (response.data.success) {
        setHeadData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching bill print heads:', error);
      alert('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setFormData({ BillPrintHead: "", Slno: 0 });
    setSelectedHead(null);
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (head) => {
    setFormData({ BillPrintHead: head.BillPrintHead, Slno: head.Slno });
    setSelectedHead(head);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this bill print head?')) {
      try {
        setLoading(true);
        const response = await axiosInstance.delete(`/billPrintHead/${id}`);
        if (response.data.success) {
          await fetchBillPrintHeads();
          alert('Bill print head deleted successfully');
        } else {
          alert('Error: ' + response.data.error);
        }
      } catch (error) {
        console.error('Error deleting bill print head:', error);
        alert('Error deleting bill print head');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = selectedHead 
        ? await axiosInstance.put(`/billPrintHead/${selectedHead.BillPrintHeadId}`, formData)
        : await axiosInstance.post('/billPrintHead', formData);
      
      if (response.data.success) {
        await fetchBillPrintHeads();
        setShowModal(false);
        alert(selectedHead ? 'Bill print head updated successfully' : 'Bill print head created successfully');
      } else {
        alert('Error: ' + response.data.error);
      }
    } catch (error) {
      console.error('Error saving bill print head:', error);
      alert('Error saving bill print head');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedHead(null);
    setIsEditMode(false);
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Bill Print Head Master" />
      <div className="container-fluid py-4">
        <div className="card shadow border-0 rounded-4">
          <div className="card-header border-bottom d-flex justify-content-between align-items-center">
            <h5 className="mb-0">📋 Bill Print Head Master - List {loading && '(Loading...)'}</h5>
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
                    <th>Bill Print Head</th>
                    <th className="text-center">Serial No</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {headData.map((head,index) => (
                    <tr key={index}>
                      <td >{index + 1}</td>
                      <td>{head.BillPrintHead}</td>
                      <td className="text-center">{head.Slno}</td>
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
                          onClick={() => handleDelete(head.BillPrintHeadId)}
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
                <div className="modal-header text-white rounded-top-4" style={{ background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)" }}>
                  <h5 className="modal-title">📋 {isEditMode ? "Edit Bill Print Head" : "Add New Bill Print Head"}</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body p-4">
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-bold text-primary">📋 Bill Print Head</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={formData.BillPrintHead} 
                        onChange={(e) => handleInputChange("BillPrintHead", e.target.value)} 
                        placeholder="Enter bill print head name"
                        style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold text-primary">🔢 Serial Number</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        value={formData.Slno} 
                        onChange={(e) => handleInputChange("Slno", Number(e.target.value))} 
                        placeholder="Enter serial number"
                        style={{ backgroundColor: "#e8f5e8", border: "2px solid #4caf50" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal} disabled={loading}>❌ Cancel</button>
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

export default BillPrintHeadMaster;