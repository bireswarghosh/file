import { useState, useEffect } from "react";
import MasterLayout from "../../MasterLayout";
import Breadcrumb from "../../Breadcrumb";
import axiosInstance from "../../../axiosInstance";

const OtherChargesMaster = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCharge, setSelectedCharge] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [chargesData, setChargesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [depGroups, setDepGroups] = useState([]);
  const [billPrintHeads, setBillPrintHeads] = useState([]);

  const [formData, setFormData] = useState({
    OtherCharges: "",
    DepGroupId: "",
    Rate: 0,
    Unit: "",
    ServiceCh: "N",
    ShowInFinal: "Y",
    BillPrintHeadId: "",
    ConcYN: "N",
    QtyReq: "N",
    Code: "",
    CSTP: 0,
    SGST: 0,
    vatp: 0,
    ICU: 0,
    CAB: 0,
    SUIT: 0,
    IPYN: "Y",
    corporateyn: "N"
  });

  useEffect(() => {
    fetchOtherCharges();
    fetchDropdownData();
  }, []);

  const fetchOtherCharges = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/otherCharges');
      if (response.data.success) {
        setChargesData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching other charges:', error);
      alert('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const fetchDropdownData = async () => {
    try {
      const response = await axiosInstance.get('/otherCharges/dropdown-data');
      if (response.data.success) {
        setDepGroups(response.data.data.depGroups);
        setBillPrintHeads(response.data.data.billPrintHeads);
      }
    } catch (error) {
      console.error('Error fetching dropdown data:', error);
    }
  };

  const handleAddNew = () => {
    setFormData({
      OtherCharges: "",
      DepGroupId: "",
      Rate: 0,
      Unit: "",
      ServiceCh: "N",
      ShowInFinal: "Y",
      BillPrintHeadId: "",
      ConcYN: "N",
      QtyReq: "N",
      Code: "",
      CSTP: 0,
      SGST: 0,
      vatp: 0,
      ICU: 0,
      CAB: 0,
      SUIT: 0,
      IPYN: "Y",
      corporateyn: "N"
    });
    setSelectedCharge(null);
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (charge) => {
    setFormData({
      OtherCharges: charge.OtherCharges || "",
      DepGroupId: charge.DepGroupId || "",
      Rate: charge.Rate || 0,
      Unit: charge.Unit || "",
      ServiceCh: charge.ServiceCh || "N",
      ShowInFinal: charge.ShowInFinal || "Y",
      BillPrintHeadId: charge.BillPrintHeadId || "",
      ConcYN: charge.ConcYN || "N",
      QtyReq: charge.QtyReq || "N",
      Code: charge.Code || "",
      CSTP: charge.CSTP || 0,
      SGST: charge.SGST || 0,
      vatp: charge.vatp || 0,
      ICU: charge.ICU || 0,
      CAB: charge.CAB || 0,
      SUIT: charge.SUIT || 0,
      IPYN: charge.IPYN || "Y",
      corporateyn: charge.corporateyn || "N"
    });
    setSelectedCharge(charge);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this other charge?')) {
      try {
        setLoading(true);
        const response = await axiosInstance.delete(`/otherCharges/${id}`);
        if (response.data.success) {
          await fetchOtherCharges();
          alert('Other charge deleted successfully');
        } else {
          alert('Error: ' + response.data.error);
        }
      } catch (error) {
        console.error('Error deleting other charge:', error);
        alert('Error deleting other charge');
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
      const response = selectedCharge 
        ? await axiosInstance.put(`/otherCharges/${selectedCharge.OtherChargesId}`, formData)
        : await axiosInstance.post('/otherCharges', formData);
      
      if (response.data.success) {
        await fetchOtherCharges();
        setShowModal(false);
        alert(selectedCharge ? 'Other charge updated successfully' : 'Other charge created successfully');
      } else {
        alert('Error: ' + response.data.error);
      }
    } catch (error) {
      console.error('Error saving other charge:', error);
      alert('Error saving other charge');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCharge(null);
    setIsEditMode(false);
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Other Charges Master" />
      <div className="container-fluid py-4">
        <div className="card shadow border-0 rounded-4">
          <div className="card-header border-bottom d-flex justify-content-between align-items-center">
            <h5 className="mb-0">💳 Other Charges Master - List {loading && '(Loading...)'}</h5>
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
              ✨ ADD CHARGE
            </button>
          </div>

          <div className="card-body">
            <div className="table-responsive" style={{ maxHeight: "60vh", overflowY: "auto" }}>
              <table className="table table-bordered table-sm table-striped table-hover align-middle">
                <thead className="table-primary sticky-top">
                  <tr>
                    <th>Sl.No</th>
                    <th>Other Charges</th>
                    <th>Code</th>
                    <th>Unit</th>
                    <th>Department</th>
                    <th className="text-end">Rate</th>
                    <th className="text-end">ICU</th>
                    <th className="text-end">CAB</th>
                    <th className="text-center">IPYN</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {chargesData.map((charge, index) => (
                    <tr key={charge.OtherChargesId}>
                      <td>{index + 1}</td>
                      <td>{charge.OtherCharges}</td>
                      <td>{charge.Code}</td>
                      <td>{charge.Unit}</td>
                      <td>{charge.departmentGroupName}</td>
                      <td className="text-end">₹{(charge.Rate || 0).toLocaleString("en-IN")}</td>
                      <td className="text-end">₹{(charge.ICU || 0).toLocaleString("en-IN")}</td>
                      <td className="text-end">₹{(charge.CAB || 0).toLocaleString("en-IN")}</td>
                      <td className="text-center">
                        <span className={`badge ${charge.IPYN === 'Y' ? 'bg-success' : 'bg-secondary'}`}>
                          {charge.IPYN === 'Y' ? '✅ Yes' : '❌ No'}
                        </span>
                      </td>
                      <td className="text-center">
                        <button 
                          className="btn btn-outline-primary btn-sm me-1" 
                          onClick={() => handleEdit(charge)}
                          disabled={loading}
                        >
                          ✏️ Edit
                        </button>
                        <button 
                          className="btn btn-outline-danger btn-sm" 
                          onClick={() => handleDelete(charge.OtherChargesId)}
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
            <div className="modal-dialog modal-xl modal-dialog-centered">
              <div className="modal-content border-0 rounded-4 shadow-lg">
                <div 
                  className="modal-header text-white rounded-top-4"
                  style={{ background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)" }}
                >
                  <h5 className="modal-title">
                    💳 {isEditMode ? "Edit Other Charge" : "Add New Other Charge"}
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
                      <label className="form-label fw-bold text-primary">🏷️ Other Charges Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.OtherCharges}
                        onChange={(e) => handleInputChange("OtherCharges", e.target.value)}
                        placeholder="Enter other charges name"
                        style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold text-primary">🏢 Department Group</label>
                      <select
                        className="form-select"
                        value={formData.DepGroupId}
                        onChange={(e) => handleInputChange("DepGroupId", e.target.value)}
                        style={{ backgroundColor: "#e8f5e8", border: "2px solid #4caf50" }}
                      >
                        <option value="">Select Department Group</option>
                        {depGroups.map((dept) => (
                          <option key={dept.DepGroupId} value={dept.DepGroupId}>{dept.DepGroup}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold text-primary">📋 Bill Print Head</label>
                      <select
                        className="form-select"
                        value={formData.BillPrintHeadId}
                        onChange={(e) => handleInputChange("BillPrintHeadId", e.target.value)}
                        style={{ backgroundColor: "#fff3e0", border: "2px solid #ff9800" }}
                      >
                        <option value="">Select Bill Print Head</option>
                        {billPrintHeads.map((head) => (
                          <option key={head.BillPrintHeadId} value={head.BillPrintHeadId}>{head.BillPrintHead}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold text-primary">🔢 Code</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.Code}
                        onChange={(e) => handleInputChange("Code", e.target.value)}
                        placeholder="Enter code"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold text-primary">📎 Unit</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.Unit}
                        onChange={(e) => handleInputChange("Unit", e.target.value)}
                        placeholder="Enter unit (PCS, DAY, etc.)"
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label fw-bold text-primary">💰 General Rate</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.Rate}
                        onChange={(e) => handleInputChange("Rate", Number(e.target.value))}
                        placeholder="0"
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label fw-bold text-primary">🏥 ICU Rate</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.ICU}
                        onChange={(e) => handleInputChange("ICU", Number(e.target.value))}
                        placeholder="0"
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label fw-bold text-primary">🛌 Cabin Rate</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.CAB}
                        onChange={(e) => handleInputChange("CAB", Number(e.target.value))}
                        placeholder="0"
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label fw-bold text-primary">🏨 Suite Rate</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.SUIT}
                        onChange={(e) => handleInputChange("SUIT", Number(e.target.value))}
                        placeholder="0"
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold text-primary">📈 CGST %</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.CSTP}
                        onChange={(e) => handleInputChange("CSTP", Number(e.target.value))}
                        placeholder="0"
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold text-primary">📈 SGST %</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.SGST}
                        onChange={(e) => handleInputChange("SGST", Number(e.target.value))}
                        placeholder="0"
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold text-primary">📈 VAT %</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.vatp}
                        onChange={(e) => handleInputChange("vatp", Number(e.target.value))}
                        placeholder="0"
                      />
                    </div>
                    <div className="col-12">
                      <div className="row">
                        <div className="col-md-3">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={formData.IPYN === 'Y'}
                              onChange={(e) => handleInputChange("IPYN", e.target.checked ? 'Y' : 'N')}
                            />
                            <label className="form-check-label fw-bold">🏥 IP Applicable</label>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={formData.ServiceCh === 'Y'}
                              onChange={(e) => handleInputChange("ServiceCh", e.target.checked ? 'Y' : 'N')}
                            />
                            <label className="form-check-label fw-bold">💼 Service Charges</label>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={formData.ShowInFinal === 'Y'}
                              onChange={(e) => handleInputChange("ShowInFinal", e.target.checked ? 'Y' : 'N')}
                            />
                            <label className="form-check-label fw-bold">📋 Show in Final</label>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={formData.QtyReq === 'Y'}
                              onChange={(e) => handleInputChange("QtyReq", e.target.checked ? 'Y' : 'N')}
                            />
                            <label className="form-check-label fw-bold">🔢 Qty Required</label>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={formData.ConcYN === 'Y'}
                              onChange={(e) => handleInputChange("ConcYN", e.target.checked ? 'Y' : 'N')}
                            />
                            <label className="form-check-label fw-bold">🎯 Concession</label>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={formData.corporateyn === 'Y'}
                              onChange={(e) => handleInputChange("corporateyn", e.target.checked ? 'Y' : 'N')}
                            />
                            <label className="form-check-label fw-bold">🏢 Corporate</label>
                          </div>
                        </div>
                      </div>
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

export default OtherChargesMaster;