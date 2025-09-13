










import { useState } from "react";
import MasterLayout from "../../MasterLayout";
import Breadcrumb from "../../Breadcrumb";

const AppointmentMaster = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [appointmentData] = useState([
    { id: 1, appointmentId: "A001", patientName: "Amit Sharma", dateTime: "2025-06-25 10:00", active: true },
    { id: 2, appointmentId: "A002", patientName: "Priya Desai", dateTime: "2025-06-25 11:30", active: true },
    { id: 3, appointmentId: "A003", patientName: "Rohit Kumar", dateTime: "2025-06-25 14:00", active: false },
  ]);

  const [formData, setFormData] = useState({
    appointmentId: "",
    patientName: "",
    dateTime: "",
  });

  const handleAppointmentSelect = (appointment) => {
    setFormData({
      appointmentId: appointment.appointmentId,
      patientName: appointment.patientName,
      dateTime: appointment.dateTime,
    });
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handleNewAppointment = () => {
    setFormData({
      appointmentId: "",
      patientName: "",
      dateTime: "",
    });
    setSelectedAppointment(null);
    setShowModal(true);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAppointment(null);
  };

  const handleSave = () => {
    console.log("Saved:", formData);
    setShowModal(false);
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Appointment Master" />
      <div className="container-fluid py-4">
        {/* Appointment List */}
        <div className="card shadow border-0 rounded-4">
          <div className="card-header border-bottom d-flex justify-content-between align-items-center">
            <h5 className="mb-0">📅 Appointment Master - List</h5>
            <button
              className="btn btn-gradient-primary px-4 py-2 rounded-pill shadow-lg"
              onClick={handleNewAppointment}
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
              ✨ ADD APPOINTMENT
            </button>
          </div>

          <div className="card-body">
            <div className="table-responsive" style={{ maxHeight: "60vh", overflowY: "auto" }}>
              <table className="table table-bordered table-sm table-striped table-hover align-middle">
                <thead className="table-primary sticky-top">
                  <tr>
                    <th>Appointment ID</th>
                    <th>Patient Name</th>
                    <th>Date/Time</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointmentData.map((appointment) => (
                    <tr key={appointment.id}>
                      <td>{appointment.appointmentId}</td>
                      <td>{appointment.patientName}</td>
                      <td>{appointment.dateTime}</td>
                      <td className="text-center">
                        <span className={`badge ${appointment.active ? 'bg-success' : 'bg-danger'}`}>
                          {appointment.active ? '🟢 Active' : '🔴 Inactive'}
                        </span>
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => handleAppointmentSelect(appointment)}
                        >
                          👁️ {selectedAppointment === appointment ? "Editing" : "View Details"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal for Appointment Details */}
        {showModal && (
          <div
            className="modal"
            tabIndex="-1"
            style={{
              display: "block",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1050,
            }}
          >
            <div
              className="modal-dialog modal-dialog-centered"
              style={{ maxWidth: "500px" }}
            >
              <div
                className="modal-content shadow-lg rounded-4"
                style={{ background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}
              >
                <div
                  className="modal-header rounded-top-4"
                  style={{ background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)", color: "white" }}
                >
                  <h5 className="modal-title mb-0">📅 Appointment Details</h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={handleCloseModal}
                  ></button>
                </div>
                <div className="modal-body p-4">
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-bold text-primary">📅 Appointment ID</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.appointmentId}
                        onChange={(e) => handleInputChange("appointmentId", e.target.value)}
                        style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold text-primary">👤 Patient Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.patientName}
                        onChange={(e) => handleInputChange("patientName", e.target.value)}
                        style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold text-primary">⏰ Date/Time</label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        value={formData.dateTime}
                        onChange={(e) => handleInputChange("dateTime", e.target.value)}
                        style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-gradient-primary"
                    style={{
                      background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      fontWeight: "600",
                    }}
                    onClick={handleSave}
                  >
                    Save
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

export default AppointmentMaster;


