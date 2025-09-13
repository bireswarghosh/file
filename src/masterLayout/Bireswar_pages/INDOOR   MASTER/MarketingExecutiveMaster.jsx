// MarketingExecutiveMaster.jsx
import { useState } from "react";
import MasterLayout from "../../MasterLayout";
import Breadcrumb from "../../Breadcrumb";





const MarketingExecutiveMaster = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneNo: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveExecutive = () => {
    // In a real application, you'd send this data to a backend API.
    console.log("Saving Marketing Executive Data:", formData);
    if (!formData.name.trim()) {
      alert("Name cannot be empty.");
      return;
    }
    // You can add more validation here for address and phone number if needed
    alert("Marketing Executive data saved successfully!");
    // Optionally, clear the form after saving or navigate away
    // handleClearForm();
  };

  const handleClearForm = () => {
    setFormData({
      name: "",
      address: "",
      phoneNo: "",
    });
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Marketing Executive Master" />
      <div className="container-fluid py-4">
        <div
          className="card shadow border-0 rounded-4"
          style={{ background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}
        >
          <div
            className="card-header text-white rounded-top-4"
            style={{ background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)" }}
          >
            <h5 className="mb-0">👨‍💼 Marketing Executive Details</h5>
          </div>

          <div className="card-body p-4">
            {/* Name */}
            <div className="mb-3">
              <label className="form-label fw-bold text-primary">👤 Name</label>
              <input
                type="text"
                className="form-control"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                placeholder="Enter Name"
              />
            </div>

            {/* Address */}
            <div className="mb-3">
              <label className="form-label fw-bold text-primary">📍 Address</label>
              <textarea
                className="form-control"
                rows="3"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                placeholder="Enter Address"
              ></textarea>
            </div>

            {/* Phone No. */}
            <div className="mb-3">
              <label className="form-label fw-bold text-primary">📞 Phone No.</label>
              <input
                type="text"
                className="form-control"
                value={formData.phoneNo}
                onChange={(e) => handleInputChange("phoneNo", e.target.value)}
                style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                placeholder="Enter Phone Number"
              />
            </div>

            {/* Action Buttons */}
            <div className="d-flex justify-content-end gap-2">
              <button
                className="btn btn-secondary px-4 py-2 rounded-pill shadow-lg"
                onClick={handleClearForm}
                style={{
                  fontWeight: "600",
                  fontSize: "14px",
                  transition: "all 0.3s ease",
                }}
              >
                🔄 Clear
              </button>
              <button
                className="btn btn-success px-4 py-2 rounded-pill shadow-lg"
                onClick={handleSaveExecutive}
                style={{
                  background: "linear-gradient(45deg, #28a745 0%, #218838 100%)",
                  border: "none",
                  color: "white",
                  fontWeight: "600",
                  fontSize: "14px",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(40, 167, 69, 0.4)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 6px 20px rgba(40, 167, 69, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 15px rgba(40, 167, 69, 0.4)";
                }}
              >
                💾 SAVE
              </button>
            </div>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default MarketingExecutiveMaster;




