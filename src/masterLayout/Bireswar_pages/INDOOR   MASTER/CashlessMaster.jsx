






















import { useState, useEffect } from "react";
import MasterLayout from "../../MasterLayout";
import Breadcrumb from "../../Breadcrumb";
import axiosInstance from "../../../axiosInstance";




const CashlessMaster = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [selectedCashless, setSelectedCashless] = useState(null);
  const [cashlessData, setCashlessData] = useState([]);
  const [acGenLeds, setAcGenLeds] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    Cashless: "",
    Add1: "",
    Add2: "",
    Phone: "",
    Company: "",
    Add3: "",
    emailid: "",
    contactperson: "",
    cPhone: "",
    servicecharge: 0,
    AcGenLedCompany: ""
  });

  useEffect(() => {
    fetchCashlessData();
    fetchAcGenLeds();
  }, []);

  const fetchCashlessData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/cashless');
      if (response.data.success) {
        setCashlessData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching cashless data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAcGenLeds = async () => {
    try {
      const response = await axiosInstance.get('/cashless/acgenleds');
      if (response.data.success) {
        setAcGenLeds(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching AcGenLeds:', error);
    }
  };

  const handleCashlessSelect = (cashless) => {
    setFormData({
      Cashless: cashless.Cashless || "",
      Add1: cashless.Add1 || "",
      Add2: cashless.Add2 || "",
      Phone: cashless.Phone || "",
      Company: cashless.Company || "",
      Add3: cashless.Add3 || "",
      emailid: cashless.emailid || "",
      contactperson: cashless.contactperson || "",
      cPhone: cashless.cPhone || "",
      servicecharge: cashless.servicecharge || "N",
      AcGenLedCompany: cashless.AcGenLedCompany || ""
    });
    setSelectedCashless(cashless);
    setActiveTab("detail");
  };

  const handleNewCashless = () => {
    setFormData({
      Cashless: "",
      Add1: "",
      Add2: "",
      Phone: "",
      Company: "",
      Add3: "",
      emailid: "",
      contactperson: "",
      cPhone: "",
      servicecharge: "N",
      AcGenLedCompany: ""
    });
    setSelectedCashless(null);
    setActiveTab("detail");
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = selectedCashless 
        ? await axiosInstance.put(`/cashless/${selectedCashless.CashlessId}`, formData)
        : await axiosInstance.post('/cashless', formData);
      
      if (response.data.success) {
        await fetchCashlessData();
        setActiveTab("list");
        setSelectedCashless(null);
      } else {
        alert('Error: ' + response.data.error);
      }
    } catch (error) {
      console.error('Error saving cashless:', error);
      alert('Error saving cashless');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this cashless?')) {
      try {
        setLoading(true);
        const response = await axiosInstance.delete(`/cashless/${id}`);
        if (response.data.success) {
          await fetchCashlessData();
        } else {
          alert('Error: ' + response.data.error);
        }
      } catch (error) {
        console.error('Error deleting cashless:', error);
        alert('Error deleting cashless');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCloseDetail = () => {
    setActiveTab("list");
    setSelectedCashless(null);
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Cashless Master" />
      <div className="container-fluid py-4">
        {/* Cashless List Tab */}
        {activeTab === "list" && (
          <div className="card shadow border-0 rounded-4">
            <div className="card-header border-bottom d-flex justify-content-between align-items-center">
              <h5 className="mb-0">💳 Cashless Master - List {loading && '(Loading...)'}</h5>
              <button
                className="btn btn-gradient-primary px-4 py-2 rounded-pill shadow-lg"
                onClick={handleNewCashless}
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
                ✨ ADD CASHLESS
              </button>
            </div>

            <div className="card-body">
              <div className="table-responsive" style={{ maxHeight: "60vh", overflowY: "auto" }}>
                <table className="table table-bordered table-sm table-striped table-hover align-middle">
                  <thead className="table-primary sticky-top">
                    <tr>
                      <th>Cashless Name</th>
                      <th>Company</th>
                      <th>Contact Person</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cashlessData.map((cashless) => (
                      <tr key={cashless.CashlessId}>
                        <td>{cashless.Cashless}</td>
                        <td>{cashless.Company}</td>
                        <td>{cashless.contactperson}</td>
                        <td>{cashless.Phone}</td>
                        <td>{cashless.emailid}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-outline-primary btn-sm me-1"
                            onClick={() => handleCashlessSelect(cashless)}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDelete(cashless.CashlessId)}
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
        )}

        {/* Cashless Detail Tab */}
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
                <h5 className="mb-0">💳 {selectedCashless ? 'Edit Cashless' : 'Add New Cashless'}</h5>
                <button className="btn btn-outline-light btn-sm" onClick={handleCloseDetail}>
                  ✖️ Close
                </button>
              </div>
            </div>

            <div className="card-body p-4">
              {/* Cashless Basic Info */}
              <div className="row mb-4">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold text-primary">💳 Cashless Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.Cashless}
                    onChange={(e) => handleInputChange("Cashless", e.target.value)}
                    style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold text-primary">🏢 Company</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.Company}
                    onChange={(e) => handleInputChange("Company", e.target.value)}
                    style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold text-primary">📍 Address 1</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.Add1}
                    onChange={(e) => handleInputChange("Add1", e.target.value)}
                    style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold text-primary">📍 Address 2</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.Add2}
                    onChange={(e) => handleInputChange("Add2", e.target.value)}
                    style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold text-primary">📍 Address 3</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.Add3}
                    onChange={(e) => handleInputChange("Add3", e.target.value)}
                    style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold text-primary">👤 Contact Person</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.contactperson}
                    onChange={(e) => handleInputChange("contactperson", e.target.value)}
                    style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold text-primary">📧 Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={formData.emailid}
                    onChange={(e) => handleInputChange("emailid", e.target.value)}
                    style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold text-primary">📞 Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={formData.Phone}
                    onChange={(e) => handleInputChange("Phone", e.target.value)}
                    style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold text-primary">📞 Contact Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={formData.cPhone}
                    onChange={(e) => handleInputChange("cPhone", e.target.value)}
                    style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold text-primary">💰 Service Charge</label>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="serviceChargeSwitch"
                      checked={formData.servicecharge === "Y"}
                      onChange={(e) => handleInputChange("servicecharge", e.target.checked ? "Y" : "N")}
                    />
                    <label className="form-check-label" htmlFor="serviceChargeSwitch">
                      {formData.servicecharge === "Y" ? "Enabled" : "Disabled"}
                    </label>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold text-primary">📁 AC Gen Led Company</label>
                  <select
                    className="form-select"
                    value={formData.AcGenLedCompany}
                    onChange={(e) => handleInputChange("AcGenLedCompany", e.target.value)}
                    style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                  >
                    <option value="">Select AC Gen Led</option>
                    {acGenLeds.map((acGenLed) => (
                      <option key={acGenLed.DescId} value={acGenLed.DescId}>
                        {acGenLed.Desc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-flex justify-content-end gap-2">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={handleCloseDetail}
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
                  {loading ? 'Saving...' : (selectedCashless ? 'Update' : 'Save')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MasterLayout>
  );
};

export default CashlessMaster;