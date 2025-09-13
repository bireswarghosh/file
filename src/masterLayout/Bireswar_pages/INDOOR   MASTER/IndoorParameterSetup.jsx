import { useState, useEffect } from "react"
import MasterLayout from "../../MasterLayout"
import Breadcrumb from "../../Breadcrumb"
import axiosInstance from '../../../axiosInstance';

const IndoorParameterSetup = () => {
  const [config, setConfig] = useState({})
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  // Fetch parameters from API
  const fetchParameters = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get('/parameters')
      if (response.data.success && response.data.data) {
        setConfig(response.data.data)
      } else {
        // If no data found, set default values
        setConfig({
          DoctotVisitInBill: 'Y',
          DoctotVisitInEst: 'Y',
          AddServiceMed: 'Y',
          ServiceMedPer: 115,
          AddServiceDiag: 'Y',
          ServiceDiagPer: 115,
          ChkOutTime: '1 PM',
          FixedServiceBed: 0,
          MedBillShow: 'Y',
          AddServiceOT: 'Y',
          CopSCH: 20,
          EditTime: 'Y',
          MedAdd: 'Y',
          AddSrvDr: 'Y',
          CM: 'Y',
          COMM: 'N',
          RecColl: 'Y',
          FBYN: 'Y',
          SMoneyYN: 'Y',
          AdmChkTime: 'Y',
          GChkTime: '12:00 PM',
          MedP: 2,
          DagP: 101,
          AdmTime: '1:00 PM',
          DIRA: 'N',
          DIRF: 'N',
          DuplicateMR: 'N',
          Nirnoy: 'N',
          DIROP: 'N',
          OTDtlYN: 'Y',
          dcareeditYN: 'N',
          otherchargeheadingyn: 'N',
          tpaotherchargeyn: 'N',
          backdateentryyn: 'Y',
          fbillc: 'Y',
          bedcal: 'Y',
          admineditamtchange: 'N',
          MedAdv: 'N',
          DisFinalBill: 'Y',
          MRD: 'N',
          fbillprint: 'Y',
          pbedcal: 'Y',
          PtntNameYN: 'Y',
          sdatewisebed: 'Y',
          IndrDBName: 'HOSPITAL_DBhh',
          monthwiseadmno: 'Y',
          NoRec: 'N',
          MaxCashRec: 841460,
          RefundRecYN: 'Y',
          GSTP: 18,
          HealthCardP: 5
        })
      }
    } catch (error) {
      console.error("Error fetching parameters:", error)
      alert("Error connecting to server. Please check if the backend is running.")
    }
    setLoading(false)
  }

  // Save all parameters
  const saveParameters = async () => {
    setSaving(true)
    try {
      const response = await axiosInstance.put('/parameters', config)
      if (response.data.success) {
        alert("Parameters saved successfully!")
      } else {
        alert("Error saving parameters")
      }
    } catch (error) {
      console.error("Error saving parameters:", error)
      alert("Error saving parameters")
    }
    setSaving(false)
  }

  // Update specific parameter
  const updateParameter = async (field, value) => {
    try {
      await axiosInstance.put(`/parameters/${field}`, { value })
    } catch (error) {
      console.error("Error updating parameter:", error)
    }
  }

  useEffect(() => {
    fetchParameters()
  }, [])

  const handleToggle = (key) => {
    const newValue = config[key] === 'Y' ? 'N' : 'Y'
    setConfig(prev => ({ ...prev, [key]: newValue }))
    updateParameter(key, newValue)
  }

  const handleInputChange = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }))
    updateParameter(key, value)
  }

  const configSections = [
    {
      title: "🏥 Doctor Visit Configuration",
      icon: "👨‍⚕️",
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      items: [
        { key: "DoctotVisitInBill", label: "Include Doctor Visit In Final Bill", type: "toggle" },
        { key: "DoctotVisitInEst", label: "Include Doctor Visit In Estimate", type: "toggle" },
        { key: "AddServiceMed", label: "Add Medicine Amount In Estimate/Final Bill", type: "toggle" },
        { key: "MedBillShow", label: "Show MEDICINE BILL In Final Bill", type: "toggle" },
        { key: "MedAdd", label: "Add Medicine Amount For Company", type: "toggle" },
      ],
    },
    {
      title: "💊 Service Charges",
      icon: "💰",
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      items: [
        { key: "ServiceMedPer", label: "Medicine Service Charge", type: "number", suffix: "%" },
        { key: "ServiceDiagPer", label: "Diagnostic Service Charge", type: "number", suffix: "%" },
        { key: "AddServiceDiag", label: "Add Service Charge In Diagnostic", type: "toggle" },
        { key: "AddServiceOT", label: "Add Service Charge In OT", type: "toggle" },
        { key: "AddSrvDr", label: "Add Service Charge In Doctor Visit", type: "toggle" },
      ],
    },
    {
      title: "⏰ Time & Schedule Settings",
      icon: "🕐",
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      items: [
        { key: "ChkOutTime", label: "Check Out Time", type: "time" },
        { key: "AdmTime", label: "Admission Time", type: "time" },
        { key: "GChkTime", label: "Grace Period Check Out Time", type: "time" },
        { key: "EditTime", label: "Admission 'BILL Time' Editable", type: "toggle" },
        { key: "AdmChkTime", label: "Admission Time In Check Out Time", type: "toggle" },
      ],
    },
    {
      title: "🧾 Billing & Receipt Settings",
      icon: "📋",
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      items: [
        { key: "SMoneyYN", label: "Single Facility Money Receipt", type: "toggle" },
        { key: "DisFinalBill", label: "Final Bill without discharge", type: "toggle" },
        { key: "fbillprint", label: "Final Bill Print", type: "toggle" },
        { key: "fbillc", label: "Final Bill Format 'C'", type: "toggle" },
        { key: "RecColl", label: "Receipt Column In Final Bill", type: "toggle" },
      ],
    },
    {
      title: "💳 Financial Configuration",
      icon: "💎",
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      items: [
        { key: "CopSCH", label: "Corporate Payable Service Charge", type: "number" },
        { key: "MedP", label: "Medicine Percentage", type: "number" },
        { key: "DagP", label: "Diagnostic Percentage", type: "number" },
        { key: "GSTP", label: "GST Percentage", type: "number", suffix: "%" },
        { key: "HealthCardP", label: "Health Card Discount", type: "number", suffix: "%" },
        { key: "MaxCashRec", label: "Maximum Cash Receipt", type: "number" },
      ],
    },
    {
      title: "⚙️ Advanced Settings",
      icon: "🔧",
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      items: [
        { key: "OTDtlYN", label: "OT Detail Required", type: "toggle" },
        { key: "bedcal", label: "24 Hr Bed Calculation", type: "toggle" },
        { key: "PtntNameYN", label: "Patient Name wise searching", type: "toggle" },
        { key: "monthwiseadmno", label: "Month Wise Admission No", type: "toggle" },
        { key: "backdateentryyn", label: "Back Date Entry", type: "toggle" },
        { key: "IndrDBName", label: "Database Name", type: "text" },
      ],
    },
  ]

  if (loading) {
    return (
      <MasterLayout>
        <Breadcrumb title="Indoor Parameter Setup" />
        <div className="container-fluid py-4">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading parameters...</p>
          </div>
        </div>
      </MasterLayout>
    )
  }

  return (
    <MasterLayout>
      <Breadcrumb title="Indoor Parameter Setup" />

      <div className="container-fluid py-4">
        {/* Header */}
        <div
          className="card border-0 rounded-4 mb-4 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            boxShadow: "0 20px 40px rgba(102, 126, 234, 0.3)",
          }}
        >
          <div className="card-body p-4 text-white">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <h6 className="h4 fw-bold mb-2">🏥 Indoor Parameter Setup</h6>
                <p className="mb-0 opacity-90">
                  Configure your medical facility's indoor parameters and billing settings
                </p>
              </div>
              <div className="col-lg-4 text-end">
                <button
                  className="btn btn-light btn-lg px-4 py-2 rounded-pill"
                  onClick={saveParameters}
                  disabled={saving}
                  style={{ fontWeight: "600" }}
                >
                  {saving ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Saving...
                    </>
                  ) : (
                    <>💾 Save All</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Configuration Sections */}
        <div className="row g-4">
          {configSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="col-lg-6">
              <div
                className="card border-0 rounded-4 h-100"
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                }}
              >
                <div className="card-header border-0 text-white rounded-top-4" style={{ background: section.color }}>
                  <h5 className="mb-0 fw-bold d-flex align-items-center">
                    <span className="me-2">{section.icon}</span>
                    {section.title}
                  </h5>
                </div>

                <div className="card-body p-4">
                  <div className="space-y-4">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="mb-4">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="flex-grow-1">
                            <label className="form-label fw-semibold text-dark mb-1">
                              {item.label}
                            </label>
                          </div>

                          <div className="ms-3">
                            {item.type === "toggle" ? (
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={config[item.key] === 'Y'}
                                  onChange={() => handleToggle(item.key)}
                                  style={{
                                    width: "3rem",
                                    height: "1.5rem",
                                    backgroundColor: config[item.key] === 'Y' ? "#667eea" : "#dee2e6",
                                    borderColor: config[item.key] === 'Y' ? "#667eea" : "#dee2e6",
                                  }}
                                />
                              </div>
                            ) : item.type === "number" ? (
                              <div className="input-group" style={{ width: "120px" }}>
                                <input
                                  type="number"
                                  className="form-control form-control-sm text-end"
                                  value={config[item.key] || 0}
                                  onChange={(e) => handleInputChange(item.key, parseFloat(e.target.value) || 0)}
                                  style={{
                                    borderColor: "#667eea",
                                    fontSize: "0.875rem",
                                  }}
                                />
                                {item.suffix && (
                                  <span className="input-group-text bg-light text-muted" style={{ fontSize: "0.75rem" }}>
                                    {item.suffix}
                                  </span>
                                )}
                              </div>
                            ) : item.type === "time" ? (
                              <input
                                type="text"
                                className="form-control form-control-sm text-center"
                                value={config[item.key] || ""}
                                onChange={(e) => handleInputChange(item.key, e.target.value)}
                                placeholder="HH:MM AM/PM"
                                style={{
                                  width: "120px",
                                  borderColor: "#667eea",
                                  fontSize: "0.875rem",
                                }}
                              />
                            ) : (
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                value={config[item.key] || ""}
                                onChange={(e) => handleInputChange(item.key, e.target.value)}
                                style={{
                                  width: "150px",
                                  borderColor: "#667eea",
                                  fontSize: "0.875rem",
                                }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Save Button */}
        <div className="text-center mt-5">
          <button
            className="btn btn-lg px-5 py-3 rounded-pill shadow-lg"
            onClick={saveParameters}
            disabled={saving}
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              color: "white",
              fontWeight: "600",
              fontSize: "1.1rem",
              transition: "all 0.3s ease",
            }}
          >
            {saving ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Saving Parameters...
              </>
            ) : (
              <>💾 Save All Parameters</>
            )}
          </button>
        </div>
      </div>
    </MasterLayout>
  )
}

export default IndoorParameterSetup