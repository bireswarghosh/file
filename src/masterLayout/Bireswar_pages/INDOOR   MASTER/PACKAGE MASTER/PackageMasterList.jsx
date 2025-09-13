import { useState, useEffect } from "react"
import MasterLayout from "../../../MasterLayout"
import Breadcrumb from "../../../Breadcrumb"
import axiosInstance from '../../../../axiosInstance';


const PackageMasterList = () => {
  const [activeTab, setActiveTab] = useState("list")
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [packageData, setPackageData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  // API Base URL
  // const API_BASE = "https://fdp20f53-5000.inc1.devtunnels.ms/api"

  // Fetch all packages
  const fetchPackages = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get('/packages')
      if (response.data.success) {
        setPackageData(response.data.data)
      }
    } catch (error) {       
      console.error("Error fetching packages:", error)
    }
    setLoading(false)
  }

  // Fetch package with includes
  const fetchPackageWithIncludes = async (packageId) => {
    try {
      const response = await axiosInstance.get(`/includes/package/${packageId}`)
      if (response.data.success) {
        const pkg = response.data.data
        setSelectedPackage({
          PackageId: pkg.PackageId,
          name: pkg.Package,
          accountHead: "CASH",
          gstAmount: pkg.GSTAmt || 0,
          serviceIncludes: pkg.includes.map(inc => ({
            IncludeId: inc.IncludeId,
            name: inc.IncHead,
            amount: inc.IncHeadRate || 0
          })),
          serviceExcludes: [],
          packageRate: pkg.Rate || 0,
        })
      }
    } catch (error) {
      console.error("Error fetching package details:", error)
    }
  }

  // Create new package
  const createPackage = async (packageData) => {
    try {
      const response = await axiosInstance.post('/packages', {
        Package: packageData.name,
        Rate: packageData.packageRate,
        GSTAmt: packageData.gstAmount,
        DescId: 1
      })
      if (response.data.success) {
        for (const include of packageData.serviceIncludes) {
          await axiosInstance.post('/includes', {
            PackageId: response.data.data.PackageId,
            IncHead: include.name,
            IncHeadRate: include.amount
          })
        }
        fetchPackages()
        setActiveTab("list")
        alert("Package created successfully!")
      }
    } catch (error) {
      console.error("Error creating package:", error)
      alert("Error creating package")
    }
  }

  // Update package
  const updatePackage = async (packageData) => {
    try {
      const response = await axiosInstance.put(`/packages/${packageData.PackageId}`, {
        Package: packageData.name,
        Rate: packageData.packageRate,
        GSTAmt: packageData.gstAmount
      })
      if (response.data.success) {
        fetchPackages()
        setIsEditing(false)
        alert("Package updated successfully!")
      }
    } catch (error) {
      console.error("Error updating package:", error)
      alert("Error updating package")
    }
  }

  // Delete package
  const deletePackage = async (packageId) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      try {
        const response = await axiosInstance.delete(`/packages/${packageId}`)
        if (response.data.success) {
          fetchPackages()
          setActiveTab("list")
          alert("Package deleted successfully!")
        }
      } catch (error) {
        console.error("Error deleting package:", error)
        alert("Error deleting package")
      }
    }
  }

  // Search packages
  const searchPackages = async (term) => {
    if (term.trim()) {
      try {
        const response = await axiosInstance.get(`/packages/search?q=${term}`)
        if (response.data.success) {
          setPackageData(response.data.data)
        }
      } catch (error) {
        console.error("Error searching packages:", error)
      }
    } else {
      fetchPackages()
    }
  }

  // Create new include
  const createInclude = async (packageId, includeData) => {
    try {
      const response = await axiosInstance.post('/includes', {
        PackageId: packageId,
        IncHead: includeData.name,
        IncHeadRate: includeData.amount
      })
      if (response.data.success) {
        fetchPackageWithIncludes(packageId)
        alert("Include added successfully!")
      }
    } catch (error) {
      console.error("Error creating include:", error)
      alert("Error adding include")
    }
  }

  // Update include
  const updateIncludeAPI = async (packageId, includeId, includeData) => {
    try {
      const response = await axiosInstance.put(`/includes/package/${packageId}/include/${includeId}`, {
        IncHead: includeData.name,
        IncHeadRate: includeData.amount
      })
      if (response.data.success) {
        fetchPackageWithIncludes(packageId)
        alert("Include updated successfully!")
      }
    } catch (error) {
      console.error("Error updating include:", error)
      alert("Error updating include")
    }
  }

  // Delete include
  const deleteInclude = async (packageId, includeId) => {
    if (window.confirm("Are you sure you want to delete this include?")) {
      try {
        const response = await axiosInstance.delete(`/includes/package/${packageId}/include/${includeId}`)
        if (response.data.success) {
          fetchPackageWithIncludes(packageId)
          alert("Include deleted successfully!")
        }
      } catch (error) {
        console.error("Error deleting include:", error)
        alert("Error deleting include")
      }
    }
  }

  // Save individual include
  const saveInclude = (index) => {
    const include = selectedPackage.serviceIncludes[index]
    if (include.IncludeId) {
      updateIncludeAPI(selectedPackage.PackageId, include.IncludeId, include)
    } else {
      createInclude(selectedPackage.PackageId, include)
    }
  }

  useEffect(() => {
    fetchPackages()
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchPackages(searchTerm)
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  const handlePackageSelect = (pkg) => {
    fetchPackageWithIncludes(pkg.PackageId)
    setActiveTab("detail")
  }

  const handleNewPackage = () => {
    setSelectedPackage({
      PackageId: null,
      name: "",
      accountHead: "CASH",
      gstAmount: 0.0,
      serviceIncludes: [],
      serviceExcludes: [],
      packageRate: 0.0,
    })
    setIsEditing(true)
    setActiveTab("detail")
  }

  const handleSave = () => {
    if (selectedPackage.PackageId) {
      updatePackage(selectedPackage)
    } else {
      createPackage(selectedPackage)
    }
  }

  const addInclude = () => {
    setSelectedPackage(prev => ({
      ...prev,
      serviceIncludes: [...prev.serviceIncludes, { name: "", amount: 0 }]
    }))
  }

  const updateInclude = (index, field, value) => {
    setSelectedPackage(prev => ({
      ...prev,
      serviceIncludes: prev.serviceIncludes.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }))
  }

  const removeInclude = (index) => {
    setSelectedPackage(prev => ({
      ...prev,
      serviceIncludes: prev.serviceIncludes.filter((_, i) => i !== index)
    }))
  }

  return (
    <MasterLayout>
      <Breadcrumb title="Package Master" />
      <div className="container-fluid py-4">
        {/* Package List Tab */}
        {activeTab === "list" && (
          <div className="card shadow border-0 rounded-4">
            <div className="card-header border-bottom">
              <div className="row align-items-center">
                <div className="col-12 col-md-6 mb-2 mb-md-0">
                  <h5 className="mb-0">📦 Package Master - List</h5>
                </div>
                <div className="col-12 col-md-6">
                  <div className="d-flex flex-column flex-md-row gap-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="🔍 Search packages..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                      className="btn btn-gradient-primary px-3 py-2 rounded-pill shadow-lg flex-shrink-0"
                      onClick={handleNewPackage}
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
                      ✨ ADD
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-body">
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <>
                  {/* Mobile Card View */}
                  <div className="d-block d-md-none">
                    {packageData.map((item) => (
                      <div key={item.PackageId} className="card mb-3 border-0 shadow-sm">
                        <div className="card-body p-3">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <h6 className="fw-bold mb-0 text-primary">{item.Package}</h6>
                            <span className="badge bg-success">CASH</span>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <small className="text-muted">Rate:</small>
                              <div className="fw-bold text-success">
                                ₹{(item.Rate || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                              </div>
                            </div>
                            <div className="d-flex gap-1">
                              <button 
                                className="btn btn-outline-primary btn-sm" 
                                onClick={() => handlePackageSelect(item)}
                              >
                                👁️
                              </button>
                              <button 
                                className="btn btn-outline-danger btn-sm" 
                                onClick={() => deletePackage(item.PackageId)}
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop Table View */}
                  <div className="d-none d-md-block">
                    <div className="table-responsive" style={{ maxHeight: "60vh", overflowY: "auto" }}>
                      <table className="table table-bordered table-sm table-striped table-hover align-middle">
                        <thead className="table-primary sticky-top">
                          <tr>
                            <th>Package</th>
                            <th>A/C Head</th>
                            <th className="text-end">Rate (₹)</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {packageData.map((item) => (
                            <tr key={item.PackageId}>
                              <td>{item.Package}</td>
                              <td>CASH</td>
                              <td className="text-end">
                                {(item.Rate || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                              </td>
                              <td className="text-center">
                                <button 
                                  className="btn btn-outline-primary btn-sm me-1" 
                                  onClick={() => handlePackageSelect(item)}
                                >
                                  👁️ View
                                </button>
                                <button 
                                  className="btn btn-outline-danger btn-sm" 
                                  onClick={() => deletePackage(item.PackageId)}
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
                </>
              )}
            </div>
          </div>
        )}

        {/* Package Detail Tab */}
        {activeTab === "detail" && selectedPackage && (
          <div
            className="card shadow border-0 rounded-4"
            style={{ background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}
          >
            <div
              className="card-header text-white rounded-top-4"
              style={{ background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)" }}
            >
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                <h5 className="mb-2 mb-md-0">📦 Package Details</h5>
                <div className="d-flex gap-2">
                  {!isEditing && selectedPackage.PackageId && (
                    <button 
                      className="btn btn-outline-light btn-sm" 
                      onClick={() => setIsEditing(true)}
                    >
                      ✏️ Edit
                    </button>
                  )}
                  <button className="btn btn-outline-light btn-sm" onClick={() => setActiveTab("list")}>
                    ✖️ Close
                  </button>
                </div>
              </div>
            </div>

            <div className="card-body p-4">
              {/* Package Basic Info */}
              <div className="row mb-4">
                <div className="col-md-4 mb-3">
                  <label className="form-label fw-bold text-primary">📝 Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedPackage.name}
                    onChange={(e) => setSelectedPackage(prev => ({...prev, name: e.target.value}))}
                    style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                    readOnly={!isEditing}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label fw-bold text-primary">💰 Package Rate</label>
                  <input
                    type="number"
                    className="form-control"
                    value={selectedPackage.packageRate}
                    onChange={(e) => setSelectedPackage(prev => ({...prev, packageRate: parseFloat(e.target.value) || 0}))}
                    style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                    readOnly={!isEditing}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label fw-bold text-primary">🧾 GST Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    value={selectedPackage.gstAmount}
                    onChange={(e) => setSelectedPackage(prev => ({...prev, gstAmount: parseFloat(e.target.value) || 0}))}
                    style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                    readOnly={!isEditing}
                  />
                </div>
              </div>

              {/* Service Includes */}
              <div className="card mb-4" style={{ backgroundColor: "#fff3cd", border: "2px solid #ffc107" }}>
                <div className="card-header d-flex justify-content-between align-items-center"
                     style={{ backgroundColor: "#fff3cd", borderBottom: "2px solid #ffc107" }}>
                  <h6 className="mb-0 fw-bold text-warning-emphasis">✅ Service Includes</h6>
                  {isEditing && (
                    <button className="btn btn-warning btn-sm" onClick={addInclude}>
                      ➕ Add Include
                    </button>
                  )}
                </div>
                <div className="card-body">
                  {selectedPackage.serviceIncludes.length > 0 ? (
                    <div className="list-group list-group-flush">
                      {selectedPackage.serviceIncludes.map((service, index) => (
                        <div key={index} className="list-group-item bg-transparent border-warning">
                          {isEditing ? (
                            <div className="row g-2">
                              <div className="col-12 col-md-4">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  value={service.name}
                                  onChange={(e) => updateInclude(index, 'name', e.target.value)}
                                  placeholder="Service name"
                                />
                              </div>
                              <div className="col-12 col-md-3">
                                <input
                                  type="number"
                                  className="form-control form-control-sm"
                                  value={service.amount}
                                  onChange={(e) => updateInclude(index, 'amount', parseFloat(e.target.value) || 0)}
                                  placeholder="Amount"
                                />
                              </div>
                              <div className="col-12 col-md-5">
                                <div className="d-flex gap-1 flex-wrap">
                                  <button 
                                    className="btn btn-success btn-sm flex-fill flex-md-grow-0"
                                    onClick={() => saveInclude(index)}
                                  >
                                    💾 Save
                                  </button>
                                  {service.IncludeId ? (
                                    <button 
                                      className="btn btn-danger btn-sm flex-fill flex-md-grow-0"
                                      onClick={() => deleteInclude(selectedPackage.PackageId, service.IncludeId)}
                                    >
                                      🗑️ Delete
                                    </button>
                                  ) : (
                                    <button 
                                      className="btn btn-warning btn-sm flex-fill flex-md-grow-0"
                                      onClick={() => removeInclude(index)}
                                    >
                                      ❌ Remove
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="d-flex justify-content-between align-items-center">
                              <span className="fw-medium">{service.name}</span>
                              <span className="badge bg-warning text-dark rounded-pill">
                                ₹{(service.amount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted text-center py-3">No included services</p>
                  )}
                </div>
              </div>

              {/* Package Rate Display */}
              <div
                className="card mb-4"
                style={{ background: "linear-gradient(45deg, #d4edda 0%, #c3e6cb 100%)", border: "3px solid #28a745" }}
              >
                <div className="card-body text-center">
                  <h6 className="card-title fw-bold text-success mb-2">💰 Total Package Rate</h6>
                  <h2 className="text-success fw-bold mb-0">
                    ₹ {(selectedPackage.packageRate || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </h2>
                </div>
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="d-flex flex-column flex-md-row justify-content-center gap-2">
                  <button 
                    className="btn btn-success"
                    onClick={handleSave}
                  >
                    💾 Save Package
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setIsEditing(false)}
                  >
                    ❌ Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </MasterLayout>
  )
}

export default PackageMasterList