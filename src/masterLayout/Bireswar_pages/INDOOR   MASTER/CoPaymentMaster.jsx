import { useState } from "react";
import MasterLayout from "../../MasterLayout";
import Breadcrumb from "../../Breadcrumb";

const CoPaymentMaster = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCoPayment, setSelectedCoPayment] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [coPayments] = useState([
    { id: 1, company: "ABC Corp", medicalTPA: "MediCare Solutions", commission: 10.5, active: true },
    { id: 2, company: "XYZ Health", medicalTPA: "HealthNet Services", commission: 8.0, active: true },
    { id: 3, company: "Global Ins.", medicalTPA: "Prime TPA", commission: 12.25, active: false },
  ]);

  const [formData, setFormData] = useState({
    company: "",
    medicalTPA: "",
    commission: 0,
  });

  const handleAddNew = () => {
    setFormData({
      company: "",
      medicalTPA: "",
      commission: 0,
    });
    setSelectedCoPayment(null);
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (coPayment) => {
    setFormData({
      company: coPayment.company,
      medicalTPA: coPayment.medicalTPA,
      commission: coPayment.commission,
    });
    setSelectedCoPayment(coPayment);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saving co-payment data:", formData);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCoPayment(null);
    setIsEditMode(false);
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Co-Payment Master" />
      <div className="container-fluid py-4">
        <div className="card shadow border-0 rounded-4">
          <div className="card-header border-bottom d-flex justify-content-between align-items-center">
            <h5 className="mb-0">🤝 Co-Payment Master - List</h5>
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
              ✨ ADD CO-PAYMENT
            </button>
          </div>

          <div className="card-body">
            <div className="table-responsive" style={{ maxHeight: "60vh", overflowY: "auto" }}>
              <table className="table table-bordered table-sm table-striped table-hover align-middle">
                <thead className="table-primary sticky-top">
                  <tr>
                    <th>Company</th>
                    <th>Medical TPA</th>
                    <th className="text-end">Commission (%)</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {coPayments.map((coPayment) => (
                    <tr key={coPayment.id}>
                      <td>{coPayment.company}</td>
                      <td>{coPayment.medicalTPA}</td>
                      <td className="text-end">{coPayment.commission.toFixed(2)}%</td>
                      <td className="text-center">
                        <span className={`badge ${coPayment.active ? 'bg-success' : 'bg-danger'}`}>
                          {coPayment.active ? '🟢 Active' : '🔴 Inactive'}
                        </span>
                      </td>
                      <td className="text-center">
                        <button 
                          className="btn btn-outline-primary btn-sm" 
                          onClick={() => handleEdit(coPayment)}
                        >
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

        {/* Modal - Same style as BedMaster */}
        {showModal && (
          <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content border-0 rounded-4 shadow-lg">
                <div 
                  className="modal-header text-white rounded-top-4"
                  style={{ background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)" }}
                >
                  <h5 className="modal-title">
                    🤝 {isEditMode ? "Edit Co-Payment" : "Add New Co-Payment"}
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
                      <label className="form-label fw-bold">🏢 Company</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        placeholder="Enter company name"
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold">⚕️ Medical TPA</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.medicalTPA}
                        onChange={(e) => handleInputChange("medicalTPA", e.target.value)}
                        placeholder="Enter medical TPA name"
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold">💲 Commission (%)</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.commission}
                        onChange={(e) => handleInputChange("commission", Number(e.target.value))}
                        placeholder="Enter commission percentage"
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

export default CoPaymentMaster;