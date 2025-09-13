

import { useState, useEffect } from "react"
import MasterLayout from "../../../MasterLayout"
import Breadcrumb from "../../../Breadcrumb"
// import axiosInstance from "../../../utils/axiosInstance"
import axiosInstance from '../../../../axiosInstance';





const BedMaster = () => {
  const [showModal, setShowModal] = useState(false)
  const [selectedBed, setSelectedBed] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [bedData, setBedData] = useState([])
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(true)





  useEffect(() => {
    fetchBeds()
    fetchDepartments()
  }, [])


  

  const fetchBeds = async () => {
    try {
      const response = await axiosInstance.get('/bedMaster')
      if (response.data.success) {
        const sortedData = response.data.data.sort((a, b) => a.DepartmentId - b.DepartmentId)
        setBedData(sortedData)
      }
    } catch (error) {
      console.error('Error fetching beds:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchDepartments = async () => {
    try {
      const response = await axiosInstance.get('/departmentIndoor')
      if (response.data.success) {
        setDepartments(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching departments:', error)
    }
  }

  const getDepartmentName = (departmentId) => {
    const dept = departments.find(d => d.DepartmentId === departmentId)
    return dept ? dept.Department : 'Unknown'
  }

  const [formData, setFormData] = useState({
    DepartmentId: "",
    Bed: "",
    ShortName: "",
    BedCh: 0,
    AtttndantCh: 0,
    RMOCh: 0,
    TotalCh: 0,
    ServiceCh: "Y",
    ShowInFinal: "Y",
    BP: 0,
    Vacant: "Y",
  })

  const handleAddNew = () => {
    setFormData({
      DepartmentId: "",
      Bed: "",
      ShortName: "",
      BedCh: 0,
      AtttndantCh: 0,
      RMOCh: 0,
      TotalCh: 0,
      ServiceCh: "Y",
      ShowInFinal: "Y",
      BP: 0,
      Vacant: "Y",
    })
    setSelectedBed(null)
    setIsEditMode(false)
    setShowModal(true)
  }

  const handleEdit = (bed) => {
    setFormData({
      DepartmentId: bed.DepartmentId || "",
      Bed: bed.Bed || "",
      ShortName: bed.ShortName || "",
      BedCh: bed.BedCh || 0,
      AtttndantCh: bed.AtttndantCh || 0,
      RMOCh: bed.RMOCh || 0,
      TotalCh: bed.TotalCh || 0,
      ServiceCh: bed.ServiceCh || "Y",
      ShowInFinal: bed.ShowInFinal || "Y",
      BP: bed.BP || 0,
      Vacant: bed.Vacant || "Y",
    })
    setSelectedBed(bed)
    setIsEditMode(true)
    setShowModal(true)
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    if (field === "BedCh") {
      setFormData((prev) => ({
        ...prev,
        TotalCh: value + (prev.AtttndantCh || 0) + (prev.RMOCh || 0),
      }))
    }
  }

  const handleSave = async () => {
    try {
      const response = isEditMode 
        ? await axiosInstance.put(`/bedMaster/${selectedBed.BedId}`, formData)
        : await axiosInstance.post('/bedMaster', formData)
      
      if (response.data.success) {
        fetchBeds()
        setShowModal(false)
      } else {
        alert('Error saving bed: ' + response.data.error)
      }
    } catch (error) {
      console.error('Error saving bed:', error)
      alert('Error saving bed')
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedBed(null)
    setIsEditMode(false)
  }

  return (
    <MasterLayout>
      <Breadcrumb title="Bed Master" />
      <div className="container-fluid py-4">
        <div className="card shadow border-0 rounded-4">
          <div className="card-header border-bottom d-flex justify-content-between align-items-center">
            <h5 className="mb-0">🛏️ Bed Master - List</h5>
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
              ✨ ADD BED
            </button>
          </div>

          <div className="card-body">
            <div className="table-responsive" style={{ maxHeight: "60vh", overflowY: "auto" }}>
              <table className="table table-bordered table-sm table-striped table-hover align-middle">
                <thead className="table-primary sticky-top">
                  <tr>
                    <th>Department</th>
                    <th>Bed No</th>
                    <th className="text-end">Bed Charges</th>
                    <th className="text-end">Nursing</th>
                    <th className="text-end">RMO</th>
                    <th className="text-end">Total</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="8" className="text-center py-4">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : bedData.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-4">No beds found</td>
                    </tr>
                  ) : (
                    (() => {
                      let lastDepartmentId = null;
                      const rows = [];
                      bedData.forEach((bed) => {
                        if (bed.DepartmentId !== lastDepartmentId) {
                          rows.push(
                            <tr key={`dept-${bed.DepartmentId}`} className="table-secondary">
                              <td colSpan="8" className="fw-bold py-2" style={{backgroundColor: '#f8f9fa'}}>
                                🏥 {getDepartmentName(bed.DepartmentId)} (ID: {bed.DepartmentId})
                              </td>
                            </tr>
                          );
                          lastDepartmentId = bed.DepartmentId;
                        }
                        rows.push(
                          <tr key={bed.BedId}>
                            <td></td>
                            <td>{bed.Bed}</td>
                            <td className="text-end">₹{(bed.BedCh || 0).toLocaleString("en-IN")}</td>
                            <td className="text-end">₹{(bed.AtttndantCh || 0).toLocaleString("en-IN")}</td>
                            <td className="text-end">₹{(bed.RMOCh || 0).toLocaleString("en-IN")}</td>
                            <td className="text-end fw-bold">₹{(bed.TotalCh || 0).toLocaleString("en-IN")}</td>
                            <td className="text-center">
                              <span className={`badge ${bed.Vacant === 'Y' ? 'bg-success' : 'bg-danger'}`}>
                                {bed.Vacant === 'Y' ? '🟢 Vacant' : '🔴 Occupied'}
                              </span>
                            </td>
                            <td className="text-center">
                              <button 
                                className="btn btn-outline-primary btn-sm" 
                                onClick={() => handleEdit(bed)}
                              >
                                ✏️ Edit
                              </button>
                            </td>
                          </tr>
                        );
                      });
                      return rows;
                    })()
                  )}
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
                    🛏️ {isEditMode ? "Edit Bed" : "Add New Bed"}
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close btn-close-white" 
                    onClick={handleCloseModal}
                  ></button>
                </div>
                
                <div className="modal-body p-4">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-bold">🏥 Department</label>
                      <select
                        className="form-control"
                        value={formData.DepartmentId}
                        onChange={(e) => handleInputChange("DepartmentId", Number(e.target.value))}
                      >
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                          <option key={dept.DepartmentId} value={dept.DepartmentId}>
                            {dept.Department} (ID: {dept.DepartmentId})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">🛏️ Bed No</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.Bed}
                        onChange={(e) => handleInputChange("Bed", e.target.value)}
                        placeholder="Enter bed number"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">💰 Bed Charges</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.BedCh}
                        onChange={(e) => handleInputChange("BedCh", Number(e.target.value))}
                        placeholder="Enter bed charges"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">👩‍⚕️ Attendant Charges</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.AtttndantCh}
                        onChange={(e) => handleInputChange("AtttndantCh", Number(e.target.value))}
                        placeholder="Enter attendant charges"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">👨‍⚕️ RMO Charges</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.RMOCh}
                        onChange={(e) => handleInputChange("RMOCh", Number(e.target.value))}
                        placeholder="Enter RMO charges"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">🏷️ Short Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.ShortName}
                        onChange={(e) => handleInputChange("ShortName", e.target.value)}
                        placeholder="Enter short name"
                      />
                    </div>
                    <div className="col-12">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={formData.Vacant === "Y"}
                              onChange={(e) => handleInputChange("Vacant", e.target.checked ? "Y" : "N")}
                            />
                            <label className="form-check-label fw-bold">🟢 Vacant</label>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={formData.ServiceCh === "Y"}
                              onChange={(e) => handleInputChange("ServiceCh", e.target.checked ? "Y" : "N")}
                            />
                            <label className="form-check-label fw-bold">💼 Service Charges</label>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={formData.ShowInFinal === "Y"}
                              onChange={(e) => handleInputChange("ShowInFinal", e.target.checked ? "Y" : "N")}
                            />
                            <label className="form-check-label fw-bold">📋 Show in Bill</label>
                          </div>
                        </div>
                      </div>
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
  )
}

export default BedMaster