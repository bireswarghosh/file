import { useState, useEffect } from "react";
import MasterLayout from "../../MasterLayout";
import Breadcrumb from "../../Breadcrumb";
import axiosInstance from "../../../axiosInstance";

const OTCategory = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    OtCategory: "",
  });

  useEffect(() => {
    fetchOtCategories();
  }, []);

  const fetchOtCategories = async () => {
    try {
      const response = await axiosInstance.get('/otCategory');
      if (response.data.success) {
        setCategoryData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching OT categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setFormData({ OtCategory: "" });
    setSelectedCategory(null);
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (category) => {
    setFormData({ OtCategory: category.OtCategory || "" });
    setSelectedCategory(category);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const response = isEditMode 
        ? await axiosInstance.put(`/otCategory/${selectedCategory.OtCategoryId}`, formData)
        : await axiosInstance.post('/otCategory', formData);
      
      if (response.data.success) {
        fetchOtCategories();
        setShowModal(false);
      } else {
        alert('Error saving OT category: ' + response.data.error);
      }
    } catch (error) {
      console.error('Error saving OT category:', error);
      alert('Error saving OT category');
    }
  };

  const handleDelete = async (category) => {
    if (window.confirm(`Are you sure you want to delete ${category.OtCategory}?`)) {
      try {
        const response = await axiosInstance.delete(`/otCategory/${category.OtCategoryId}`);
        if (response.data.success) {
          fetchOtCategories();
        } else {
          alert('Error deleting OT category: ' + response.data.error);
        }
      } catch (error) {
        console.error('Error deleting OT category:', error);
        alert('Error deleting OT category');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCategory(null);
    setIsEditMode(false);
  };

  return (
    <MasterLayout>
      <Breadcrumb title="OT Category" />
      <div className="container-fluid py-4">
        <div className="card shadow border-0 rounded-4">
          <div className="card-header border-bottom d-flex justify-content-between align-items-center">
            <h5 className="mb-0">📂 OT Category - List</h5>
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
              ✨ ADD CATEGORY
            </button>
          </div>

          <div className="card-body">
            <div className="table-responsive" style={{ maxHeight: "60vh", overflowY: "auto" }}>
              <table className="table table-bordered table-sm table-striped table-hover align-middle">
                <thead className="table-primary sticky-top">
                  <tr>
                    <th>OT Category</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="3" className="text-center py-4">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : categoryData.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center py-4">No OT categories found</td>
                    </tr>
                  ) : (
                    categoryData.map((category) => (
                      <tr key={category.OtCategoryId}>
                        <td>{category.OtCategory}</td>
                        <td className="text-center">
                          <span className="badge bg-success">
                            🟢 Active
                          </span>
                        </td>
                        <td className="text-center">
                          <button className="btn btn-outline-primary btn-sm me-2" onClick={() => handleEdit(category)}>
                            ✏️ Edit
                          </button>
                          <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(category)}>
                            🗑️ Delete
                          </button>
                        </td>
                      </tr>
                    ))
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
                <div className="modal-header text-white rounded-top-4" style={{ background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)" }}>
                  <h5 className="modal-title">📂 {isEditMode ? "Edit OT Category" : "Add New OT Category"}</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body p-4">
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-bold">📂 OT Category</label>
                      <input type="text" className="form-control" value={formData.OtCategory} onChange={(e) => handleInputChange("OtCategory", e.target.value)} placeholder="Enter OT category name" />
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

export default OTCategory;