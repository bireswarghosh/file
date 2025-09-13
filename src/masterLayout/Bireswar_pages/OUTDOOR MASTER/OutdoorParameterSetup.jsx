import { useState, useEffect } from "react"
import MasterLayout from "../../MasterLayout"
import Breadcrumb from "../../Breadcrumb"
import axiosInstance from '../../../axiosInstance';

const OutdoorParameterSetup = () => {
  const [config, setConfig] = useState({})
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  // Fetch parameters from API
  const fetchParameters = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get('/parameters-outdoor')
      if (response.data.success && response.data.data) {
        setConfig(response.data.data)
      } else {
        // If no data found, set default values
        setConfig({
          RegCh: 0,
          RegValid: 365,
          ValidType: 'M',
          Registration: 'Y',
          MRDosYN: 'N',
          SrvChYN: 'Y',
          DocChYN: 'Y',
          SvcChYN: 'Y',
          UserYN: 'Y',
          AsstYN: 'N',
          adminyn: 'N',
          backdateentryyn: 'N',
          cregno: 'Y'
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
      const response = await axiosInstance.put('/parameters-outdoor', config)
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
      await axiosInstance.put(`/parameters-outdoor/${field}`, { value })
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
      title: "🏥 Registration Configuration",
      icon: "📝",
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      items: [
        { key: "Registration", label: "Registration Required", type: "toggle" },
        { key: "RegCh", label: "Registration Charge", type: "number", suffix: "₹" },
        { key: "RegValid", label: "Registration Validity", type: "number", suffix: "Days" },
        { key: "ValidType", label: "Validity Type", type: "select", options: [
          { value: 'D', label: 'Days' },
          { value: 'M', label: 'Months' },
          { value: 'Y', label: 'Years' }
        ]},
        { key: "cregno", label: "Custom Registration Number", type: "toggle" },
      ],
    },
    {
      title: "💊 Service & Charges",
      icon: "💰",
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      items: [
        { key: "SrvChYN", label: "Service Charge Required", type: "toggle" },
        { key: "DocChYN", label: "Doctor Charge Required", type: "toggle" },
        { key: "SvcChYN", label: "Service Charge in Bill", type: "toggle" },
        { key: "MRDosYN", label: "MR DOS Required", type: "toggle" },
      ],
    },
    {
      title: "👥 User & Access Control",
      icon: "🔐",
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      items: [
        { key: "UserYN", label: "User Validation Required", type: "toggle" },
        { key: "AsstYN", label: "Assistant Access", type: "toggle" },
        { key: "adminyn", label: "Admin Override", type: "toggle" },
      ],
    },
    {
      title: "⚙️ Advanced Settings",
      icon: "🔧",
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      items: [
        { key: "backdateentryyn", label: "Back Date Entry Allowed", type: "toggle" },
      ],
    },
  ]

  if (loading) {
    return (
      <MasterLayout>
        <Breadcrumb title="Outdoor Parameter Setup" />
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
      <Breadcrumb title="Outdoor Parameter Setup" />

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
                <h6 className="h4 fw-bold mb-2">🏥 Outdoor Parameter Setup</h6>
                <p className="mb-0 opacity-90">
                  Configure your medical facility's outdoor parameters and billing settings
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
                            ) : item.type === "select" ? (
                              <select
                                className="form-select form-select-sm"
                                value={config[item.key] || ""}
                                onChange={(e) => handleInputChange(item.key, e.target.value)}
                                style={{
                                  width: "120px",
                                  borderColor: "#667eea",
                                  fontSize: "0.875rem",
                                }}
                              >
                                {item.options.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
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

export default OutdoorParameterSetup