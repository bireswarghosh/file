import { useState, useEffect, useCallback } from "react";
import MasterLayout from "../../../MasterLayout";
import Breadcrumb from "../../../Breadcrumb";
import axiosInstance from '../../../../axiosInstance';
import './departmentGroup.css';



const DepartmentGroup = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [departments, setDepartments] = useState([]);

  const [formData, setFormData] = useState({
    DepGroup: "",
    Anst: 0.0,
    Assi: 0.0,
    Sour: 0.0,
  });

  const handleAddNew = () => {
    setFormData({
      DepGroup: "",
      Anst: 0.0,
      Assi: 0.0,
      Sour: 0.0,
    });
    setSelectedDepartment(null);
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (department) => {
    setFormData({
      DepGroup: department.DepGroup,
      Anst: department.Anst || 0.0,
      Assi: department.Assi || 0.0,
      Sour: department.Sour || 0.0,
    });
    setSelectedDepartment(department);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      
      if (isEditMode && selectedDepartment) {
        // Update existing department
        const response = await axiosInstance.put(
          `/department_groups/${selectedDepartment.DepGroupId}`,
          formData
        );
        
        if (response.data.success) {
          fetchDepartments();
          setShowModal(false);
        }
      } else {
        // Create new department
        const response = await axiosInstance.post(
          '/department_groups',
          formData
        );
        
        if (response.data.success) {
          fetchDepartments();
          setShowModal(false);
        }
      }
    } catch (error) {
      console.error('Error saving department group:', error);
      setError('Failed to save department group');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDepartment(null);
    setIsEditMode(false);
    setError(null);
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this department group?')) {
      try {
        setLoading(true);
        const response = await axiosInstance.delete(`/department_groups/${id}`);
        
        if (response.data.success) {
          fetchDepartments();
        }
      } catch (error) {
        console.error('Error deleting department group:', error);
        setError('Failed to delete department group');
      } finally {
        setLoading(false);
      }
    }
  };
  
  const fetchDepartments = useCallback(async () => {
    try {
      setLoading(true);
      let url = '/department_groups';
      
      if (searchTerm) {
        url = `/department_groups/search?search=${searchTerm}`;
      }
      
      const response = await axiosInstance.get(url);
      
      if (response.data.success) {
        setDepartments(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching department groups:', error);
      setError('Failed to fetch department groups');
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  useEffect(() => {
    fetchDepartments();
  }, [searchTerm, fetchDepartments]);

  return (
    <MasterLayout>
      <Breadcrumb title="Department Group" />
      <div className="container-fluid py-4">
        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button type="button" className="btn-close" onClick={() => setError(null)}></button>
          </div>
        )}
        
        <div className="card shadow border-0 rounded-4">
          <div className="card-header border-bottom">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 mb-2 mb-md-0">
              <h5 className="mb-2 mb-md-0">🏥 Department Group - List</h5>
              <div className="d-flex flex-column flex-sm-row gap-2 w-100 w-md-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search departments..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <button
                  className="btn btn-gradient-primary px-3 py-2 rounded-pill shadow-lg text-nowrap"
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
                  <span className="d-none d-sm-inline">✨ ADD</span> DEPARTMENT
                </button>
              </div>
            </div>
          </div>

          <div className="card-body">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading departments...</p>
              </div>
            ) : departments.length === 0 ? (
              <div className="text-center py-5">
                <p className="text-muted">No department groups found</p>
              </div>
            ) : (
              <>
                {/* Desktop view table */}
                <div className="table-responsive d-none d-md-block" style={{ maxHeight: "60vh", overflowY: "auto" }}>
                  <table className="table table-bordered table-sm table-striped table-hover align-middle">
                    <thead className="table-primary sticky-top">
                      <tr>
                        <th>Department Name</th>
                        <th className="text-end">Anaesthesia</th>
                        <th className="text-end">Asst Surgeon</th>
                        <th className="text-end">Surgeon OT</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departments.map((dept) => (
                        <tr key={dept.DepGroupId}>
                          <td>{dept.DepGroup}</td>
                          <td className="text-end">₹{(dept.Anst || 0).toLocaleString("en-IN", {minimumFractionDigits: 2})}</td>
                          <td className="text-end">₹{(dept.Assi || 0).toLocaleString("en-IN", {minimumFractionDigits: 2})}</td>
                          <td className="text-end">₹{(dept.Sour || 0).toLocaleString("en-IN", {minimumFractionDigits: 2})}</td>
                          <td className="text-center">
                            <div className="btn-group btn-group-sm">
                              <button 
                                className="btn btn-outline-primary" 
                                onClick={() => handleEdit(dept)}
                              >
                                ✏️ Edit
                              </button>
                              <button 
                                className="btn btn-outline-danger" 
                                onClick={() => handleDelete(dept.DepGroupId)}
                              >
                                🗑️ Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Mobile view cards */}
                <div className="d-md-none" style={{ maxHeight: "60vh", overflowY: "auto" }}>
                  {departments.map((dept) => (
                    <div key={dept.DepGroupId} className="card mb-3 border-0 shadow-sm">
                      <div className="card-body p-3">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h6 className="card-title mb-0 fw-bold text-primary">{dept.DepGroup}</h6>
                        </div>
                        
                        <div className="row g-2 mb-3">
                          <div className="col-12">
                            <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                              <small className="text-muted">💉 Anaesthesia:</small>
                              <span className="fw-bold">₹{(dept.Anst || 0).toLocaleString("en-IN", {minimumFractionDigits: 2})}</span>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                              <small className="text-muted">👨‍⚕️ Asst Surgeon:</small>
                              <span className="fw-bold">₹{(dept.Assi || 0).toLocaleString("en-IN", {minimumFractionDigits: 2})}</span>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="d-flex justify-content-between align-items-center py-2">
                              <small className="text-muted">🏥 Surgeon OT:</small>
                              <span className="fw-bold">₹{(dept.Sour || 0).toLocaleString("en-IN", {minimumFractionDigits: 2})}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="d-flex gap-2">
                          <button 
                            className="btn btn-sm btn-outline-primary flex-fill" 
                            onClick={() => handleEdit(dept)}
                          >
                            ✏️ Edit
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger flex-fill" 
                            onClick={() => handleDelete(dept.DepGroupId)}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content border-0 rounded-4 shadow-lg">
                <div 
                  className="modal-header text-white rounded-top-4"
                  style={{ background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)" }}
                >
                  <h5 className="modal-title">
                    🏥 {isEditMode ? "Edit Department Group" : "Add New Department Group"}
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close btn-close-white" 
                    onClick={handleCloseModal}
                  ></button>
                </div>
                
                <div className="modal-body p-4">
                  {error && (
                    <div className="alert alert-danger">{error}</div>
                  )}
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-bold">🏢 Department Group Name</label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        value={formData.DepGroup}
                        onChange={(e) => handleInputChange("DepGroup", e.target.value)}
                        placeholder="Enter department group name"
                      />
                    </div>
                    <div className="col-lg-4 col-sm-12">
                      <label className="form-label fw-bold">💉 Anaesthesia</label>
                      <div className="input-group">
                        <span className="input-group-text">₹</span>
                        <input
                          type="number"
                          className="form-control"
                          value={formData.Anst}
                          onChange={(e) => handleInputChange("Anst", Number(e.target.value))}
                          placeholder="0.00"
                          step="0.01"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-sm-12">
                      <label className="form-label fw-bold">👨‍⚕️ Asst Surgeon</label>
                      <div className="input-group">
                        <span className="input-group-text">₹</span>
                        <input
                          type="number"
                          className="form-control"
                          value={formData.Assi}
                          onChange={(e) => handleInputChange("Assi", Number(e.target.value))}
                          placeholder="0.00"
                          step="0.01"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-sm-12">
                      <label className="form-label fw-bold">🏥 Surgeon OT</label>
                      <div className="input-group">
                        <span className="input-group-text">₹</span>
                        <input
                          type="number"
                          className="form-control"
                          value={formData.Sour}
                          onChange={(e) => handleInputChange("Sour", Number(e.target.value))}
                          placeholder="0.00"
                          step="0.01"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer flex-column flex-sm-row">
                  <button 
                    type="button" 
                    className="btn btn-secondary w-100 w-sm-auto mb-2 mb-sm-0 order-2 order-sm-1" 
                    onClick={handleCloseModal}
                    disabled={loading}
                  >
                    ❌ Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary w-100 w-sm-auto mb-2 mb-sm-0 order-1 order-sm-2" 
                    onClick={handleSave}
                    disabled={loading}
                    style={{ background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)", border: "none" }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Processing...
                      </>
                    ) : (
                      <>💾 {isEditMode ? "Update" : "Save"}</>
                    )}
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

export default DepartmentGroup;