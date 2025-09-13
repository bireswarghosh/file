import { useState } from "react";
import MasterLayout from "../../MasterLayout";
import Breadcrumb from "../../Breadcrumb";

const MedicinMaster = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [patientData] = useState([
    { id: 1, name: "Amit Sharma", contactNumber: "9876543210", email: "amit.sharma@email.com", age: 35, admissionStatus: "Admitted", active: true },
    { id: 2, name: "Priya Desai", contactNumber: "8765432109", email: "priya.desai@email.com", age: 28, admissionStatus: "Discharged", active: true },
    { id: 3, name: "Rohit Kumar", contactNumber: "7654321098", email: "rohit.kumar@email.com", age: 45, admissionStatus: "Pending", active: false },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    email: "",
    age: 0,
    admissionStatus: "",
  });

  const handlePatientSelect = (patient) => {
    setFormData({
      name: patient.name,
      contactNumber: patient.contactNumber,
      email: patient.email,
      age: patient.age,
      admissionStatus: patient.admissionStatus,
    });
    setSelectedPatient(patient);
    setActiveTab("detail");
  };

  const handleNewPatient = () => {
    setFormData({
      name: "",
      contactNumber: "",
      email: "",
      age: 0,
      admissionStatus: "",
    });
    setSelectedPatient(null);
    setActiveTab("detail"); // Switches to detail view
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCloseDetail = () => {
    setActiveTab("list");
    setSelectedPatient(null);
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Patient Master" />
      <div className="container-fluid py-4">
        {/* Patient List Tab */}
        {activeTab === "list" && (
          <div className="card shadow border-0 rounded-4">
            <div className="card-header border-bottom d-flex justify-content-between align-items-center">
              <h5 className="mb-0">👤 Patient Master - List</h5>
              <button
                className="btn btn-gradient-primary px-4 py-2 rounded-pill shadow-lg"
                onClick={handleNewPatient}
                style={{
                  background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                  color: "white",
                  fontWeight: "600",
                  fontSize: "14px",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
                }}
              >
                ✨ ADD PATIENT
              </button>
            </div>

            <div className="card-body">
              <div className="table-responsive" style={{ maxHeight: "60vh", overflowY: "auto" }}>
                <table className="table table-bordered table-sm table-striped table-hover align-middle">
                  <thead className="table-primary sticky-top">
                    <tr>
                      <th>Name</th>
                      <th>Contact Number</th>
                      <th className="text-end">Age</th>
                      <th>Admission Status</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patientData.map((patient) => (
                      <tr key={patient.id}>
                        <td>{patient.name}</td>
                        <td>{patient.contactNumber}</td>
                        <td className="text-end">{patient.age}</td>
                        <td>{patient.admissionStatus}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => handlePatientSelect(patient)}
                          >
                            👁️ {selectedPatient === patient ? "Editing" : "View Details"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Patient Detail Tab */}
        {activeTab === "detail" && (
          <div
            className="card shadow border-0 rounded-4"
            style={{ background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}
          >
            <div
              className="card-header text-white rounded-top-4"
              style={{ background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)" }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">👤 Patient Details</h5>
                <button className="btn btn-outline-light btn-sm" onClick={handleCloseDetail}>
                  ✖️ Close
                </button>
              </div>
            </div>

            <div className="card-body p-4">
              {/* Patient Basic Info */}
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label className="form-label fw-bold text-primary">🏷️ Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold text-primary">📞 Contact Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={formData.contactNumber}
                    onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                    style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold text-primary">📧 Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold text-primary">👶 Age</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", Number(e.target.value) || 0)}
                    style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold text-primary">🏥 Admission Status</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.admissionStatus}
                    onChange={(e) => handleInputChange("admissionStatus", e.target.value)}
                    style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                  />
                </div>
              </div>

              {/* Admission Status Summary */}
              <div
                className="card mb-4"
                style={{ background: "linear-gradient(45deg, #d4edda 0%, #c3e6cb 100%)", border: "3px solid #28a745" }}
              >
                <div className="card-body text-center">
                  <h6 className="card-title fw-bold text-success mb-2">🏥 Admission Status</h6>
                  <h2 className="text-success fw-bold mb-0">
                    {formData.admissionStatus || "N/A"}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MasterLayout>
  );
};

export default MedicinMaster;