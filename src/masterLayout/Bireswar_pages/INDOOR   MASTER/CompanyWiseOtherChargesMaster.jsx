import { useState } from "react";
import MasterLayout from "../../MasterLayout";
import Breadcrumb from "../../Breadcrumb";

const CompanyWiseOtherChargesMaster = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCharge, setSelectedCharge] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [chargeData] = useState([
    { id: 1, companyName: "HealthCorp", chargeName: "Consultation Fee", chargeType: "Fixed", amount: 500, active: true },
    { id: 2, companyName: "MediPlus", chargeName: "Lab Test", chargeType: "Variable", amount: 1200, active: true },
    { id: 3, companyName: "WellnessInc", chargeName: "X-Ray", chargeType: "Fixed", amount: 800, active: false },
  ]);

  const [formData, setFormData] = useState({
    companyName: "",
    chargeName: "",
    chargeType: "",
    amount: 0,
  });

  const handleAddNew = () => {
    setFormData({ companyName: "", chargeName: "", chargeType: "", amount: 0 });
    setSelectedCharge(null);
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (charge) => {
    setFormData({ companyName: charge.companyName, chargeName: charge.chargeName, chargeType: charge.chargeType, amount: charge.amount });
    setSelectedCharge(charge);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saving Company Wise Other Charge:", formData);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCharge(null);
    setIsEditMode(false);
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Company Wise Other Charges Master" />
      <div className="container-fluid py-4">
        <div className="card shadow border-0 rounded-4">
          <div className="card-header border-bottom d-flex justify-content-between align-items-center">
            <h5 className="mb-0">🏢 Company Wise Other Charges - List</h5>
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
                    <th>Company Name</th>
                    <th>Charge Name</th>
                    <th>Charge Type</th>
                    <th className="text-end">Amount (₹)</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {chargeData.map((charge) => (
                    <tr key={charge.id}>
                      <td>{charge.companyName}</td>
                      <td>{charge.chargeName}</td>
                      <td>{charge.chargeType}</td>
                      <td className="text-end">₹{charge.amount.toLocaleString("en-IN")}</td>
                      <td className="text-center">
                        <span className={`badge ${charge.active ? 'bg-success' : 'bg-danger'}`}>
                          {charge.active ? '🟢 Active' : '🔴 Inactive'}
                        </span>
                      </td>
                      <td className="text-center">
                        <button className="btn btn-outline-primary btn-sm" onClick={() => handleEdit(charge)}>
                          ✏️ Edit
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
                  <h5 className="modal-title">🏢 {isEditMode ? "Edit Company Wise Other Charge" : "Add New Company Wise Other Charge"}</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body p-4">
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-bold">🏢 Company Name</label>
                      <input type="text" className="form-control" value={formData.companyName} onChange={(e) => handleInputChange("companyName", e.target.value)} placeholder="Enter company name" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">💳 Charge Name</label>
                      <input type="text" className="form-control" value={formData.chargeName} onChange={(e) => handleInputChange("chargeName", e.target.value)} placeholder="Enter charge name" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">📋 Charge Type</label>
                      <select className="form-select" value={formData.chargeType} onChange={(e) => handleInputChange("chargeType", e.target.value)}>
                        <option value="">Select Charge Type</option>
                        <option value="Fixed">Fixed</option>
                        <option value="Variable">Variable</option>
                        <option value="Percentage">Percentage</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold">💰 Amount (₹)</label>
                      <input type="number" className="form-control" value={formData.amount} onChange={(e) => handleInputChange("amount", Number(e.target.value))} placeholder="Enter amount" />
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

export default CompanyWiseOtherChargesMaster;