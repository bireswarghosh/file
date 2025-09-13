import { useState } from "react";
import MasterLayout from "../../../MasterLayout";
import Breadcrumb from "../../../Breadcrumb";

const DepartmentMasterList = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDept, setSelectedDept] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [deptData] = useState([
    { id: 1, deptName: "Cardiology", deptCode: "CARD", headOfDept: "Dr. Smith", location: "Block A", active: true },
    { id: 2, deptName: "Neurology", deptCode: "NEURO", headOfDept: "Dr. Johnson", location: "Block B", active: true },
    { id: 3, deptName: "Orthopedics", deptCode: "ORTHO", headOfDept: "Dr. Brown", location: "Block C", active: false },
  ]);

  const [formData, setFormData] = useState({
    deptName: "",
    deptCode: "",
    headOfDept: "",
    location: "",
  });

  const handleAddNew = () => {
    setFormData({ deptName: "", deptCode: "", headOfDept: "", location: "" });
    setSelectedDept(null);
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (dept) => {
    setFormData({ deptName: dept.deptName, deptCode: dept.deptCode, headOfDept: dept.headOfDept, location: dept.location });
    setSelectedDept(dept);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saving Department:", formData);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDept(null);
    setIsEditMode(false);
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Department Master List" />
      <div className="container-fluid py-4">
        <div className="card shadow border-0 rounded-4">
          <div className="card-header border-bottom d-flex justify-content-between align-items-center">
            <h5 className="mb-0">🏥 Department Master - List</h5>
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
              ✨ ADD DEPARTMENT
            </button>
          </div>

          <div className="card-body">
            <div className="table-responsive" style={{ maxHeight: "60vh", overflowY: "auto" }}>
              <table className="table table-bordered table-sm table-striped table-hover align-middle">
                <thead className="table-primary sticky-top">
                  <tr>
                    <th>Department Name</th>
                    <th>Code</th>
                    <th>Head of Department</th>
                    <th>Location</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {deptData.map((dept) => (
                    <tr key={dept.id}>
                      <td>{dept.deptName}</td>
                      <td>{dept.deptCode}</td>
                      <td>{dept.headOfDept}</td>
                      <td>{dept.location}</td>
                      <td className="text-center">
                        <span className={`badge ${dept.active ? 'bg-success' : 'bg-danger'}`}>
                          {dept.active ? '🟢 Active' : '🔴 Inactive'}
                        </span>
                      </td>
                      <td className="text-center">
                        <button className="btn btn-outline-primary btn-sm" onClick={() => handleEdit(dept)}>
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
                  <h5 className="modal-title">🏥 {isEditMode ? "Edit Department" : "Add New Department"}</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body p-4">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-bold">🏥 Department Name</label>
                      <input type="text" className="form-control" value={formData.deptName} onChange={(e) => handleInputChange("deptName", e.target.value)} placeholder="Enter department name" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">🔤 Department Code</label>
                      <input type="text" className="form-control" value={formData.deptCode} onChange={(e) => handleInputChange("deptCode", e.target.value)} placeholder="Enter department code" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">👨‍⚕️ Head of Department</label>
                      <input type="text" className="form-control" value={formData.headOfDept} onChange={(e) => handleInputChange("headOfDept", e.target.value)} placeholder="Enter head of department" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">📍 Location</label>
                      <input type="text" className="form-control" value={formData.location} onChange={(e) => handleInputChange("location", e.target.value)} placeholder="Enter location" />
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

export default DepartmentMasterList;