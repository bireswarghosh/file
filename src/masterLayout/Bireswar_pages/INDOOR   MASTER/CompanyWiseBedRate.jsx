import { useState } from "react";
import MasterLayout from "../../MasterLayout";
import Breadcrumb from "../../Breadcrumb";

const CompanyWiseBedRate = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [bedRateData] = useState([
    {
      id: 1,
      companyName: "HealthCorp",
      department: "General Ward",
      bedNo: "101",
      rate: 500,
      active: true,
    },
    {
      id: 2,
      companyName: "MediPlus",
      department: "ICU",
      bedNo: "202",
      rate: 1500,
      active: true,
    },
    {
      id: 3,
      companyName: "WellnessInc",
      department: "Private Room",
      bedNo: "303",
      rate: 800,
      active: false,
    },
  ]);

  const [formData, setFormData] = useState({
    companyName: "",
    department: "",
    bedNo: "",
    rate: 0,
  });

  const departmentOptions = ["General Ward", "ICU", "Private Room", "Pediatric Ward", "Surgery Unit"];

  const handleAddNew = () => {
    setFormData({
      companyName: "",
      department: "",
      bedNo: "",
      rate: 0,
    });
    setSelectedItem(null);
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setFormData({
      companyName: item.companyName,
      department: item.department,
      bedNo: item.bedNo,
      rate: item.rate,
    });
    setSelectedItem(item);
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
    console.log("Saving Company Wise Bed Rate:", formData);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
    setIsEditMode(false);
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Company Wise Bed Rate" />
      <div className="container-fluid py-4">
        <div className="card shadow border-0 rounded-4">
          <div className="card-header border-bottom d-flex justify-content-between align-items-center">
            <h5 className="mb-0">🏢 Company Wise Bed Rate - List</h5>
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
              ✨ ADD BED RATE
            </button>
          </div>

          <div className="card-body">
            <div className="table-responsive" style={{ maxHeight: "60vh", overflowY: "auto" }}>
              <table className="table table-bordered table-sm table-striped table-hover align-middle">
                <thead className="table-primary sticky-top">
                  <tr>
                    <th>Company Name</th>
                    <th>Department</th>
                    <th>Bed No</th>
                    <th className="text-end">Rate (₹)</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bedRateData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.companyName}</td>
                      <td>{item.department}</td>
                      <td>{item.bedNo}</td>
                      <td className="text-end">₹{item.rate.toLocaleString("en-IN")}</td>
                      <td className="text-center">
                        <span className={`badge ${item.active ? 'bg-success' : 'bg-danger'}`}>
                          {item.active ? '🟢 Active' : '🔴 Inactive'}
                        </span>
                      </td>
                      <td className="text-center">
                        <button 
                          className="btn btn-outline-primary btn-sm" 
                          onClick={() => handleEdit(item)}
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
                    🏢 {isEditMode ? "Edit Bed Rate" : "Add New Bed Rate"}
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
                      <label className="form-label fw-bold">🏢 Company Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange("companyName", e.target.value)}
                        placeholder="Enter company name"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">🏥 Department</label>
                      <select
                        className="form-select"
                        value={formData.department}
                        onChange={(e) => handleInputChange("department", e.target.value)}
                      >
                        <option value="">Select Department</option>
                        {departmentOptions.map((dept) => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">🛏️ Bed No</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.bedNo}
                        onChange={(e) => handleInputChange("bedNo", e.target.value)}
                        placeholder="Enter bed number"
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold">💰 Rate (₹)</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.rate}
                        onChange={(e) => handleInputChange("rate", Number(e.target.value))}
                        placeholder="Enter rate amount"
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

export default CompanyWiseBedRate;