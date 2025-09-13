import { useState, useEffect } from "react";
import MasterLayout from "../../MasterLayout";
import Breadcrumb from "../../Breadcrumb";
import axiosInstance from "../../../axiosInstance";

const OTItemMaster = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [itemData, setItemData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    OtItem: "",
    OtCategoryId: "",
    Rate: 0,
    Unit: "",
    ServiceChYN: "Y",
  });

  useEffect(() => {
    fetchOtItems();
    fetchCategories();
  }, []);

  const fetchOtItems = async () => {
    try {
      const response = await axiosInstance.get('/otItem');
      if (response.data.success) {
        setItemData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching OT items:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/otItem/categories');
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddNew = () => {
    setFormData({ OtItem: "", OtCategoryId: "", Rate: 0, Unit: "", ServiceChYN: "Y" });
    setSelectedItem(null);
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setFormData({ 
      OtItem: item.OtItem || "", 
      OtCategoryId: item.OtCategoryId || "", 
      Rate: item.Rate || 0, 
      Unit: item.Unit || "", 
      ServiceChYN: item.ServiceChYN || "Y" 
    });
    setSelectedItem(item);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const response = isEditMode 
        ? await axiosInstance.put(`/otItem/${selectedItem.OtItemId}`, formData)
        : await axiosInstance.post('/otItem', formData);
      
      if (response.data.success) {
        fetchOtItems();
        setShowModal(false);
      } else {
        alert('Error saving OT item: ' + response.data.error);
      }
    } catch (error) {
      console.error('Error saving OT item:', error);
      alert('Error saving OT item');
    }
  };

  const handleDelete = async (item) => {
    if (window.confirm(`Are you sure you want to delete ${item.OtItem}?`)) {
      try {
        const response = await axiosInstance.delete(`/otItem/${item.OtItemId}`);
        if (response.data.success) {
          fetchOtItems();
        } else {
          alert('Error deleting OT item: ' + response.data.error);
        }
      } catch (error) {
        console.error('Error deleting OT item:', error);
        alert('Error deleting OT item');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
    setIsEditMode(false);
  };

  return (
    <MasterLayout>
      <Breadcrumb title="OT Item Master" />
      <div className="container-fluid py-4">
        <div className="card shadow border-0 rounded-4">
          <div className="card-header border-bottom d-flex justify-content-between align-items-center">
            <h5 className="mb-0">🔧 OT Item Master - List</h5>
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
              ✨ ADD ITEM
            </button>
          </div>

          <div className="card-body">
            <div className="table-responsive" style={{ maxHeight: "60vh", overflowY: "auto" }}>
              <table className="table table-bordered table-sm table-striped table-hover align-middle">
                <thead className="table-primary sticky-top">
                  <tr>
                    <th>Item Name</th>
                    <th>Category</th>
                    <th className="text-end">Rate (₹)</th>
                    <th>Unit</th>
                    <th className="text-center">Service</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : itemData.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4">No OT items found</td>
                    </tr>
                  ) : (
                    itemData.map((item) => (
                      <tr key={item.OtItemId}>
                        <td>{item.OtItem}</td>
                        <td>{item.OtCategory || 'N/A'}</td>
                        <td className="text-end">₹{(item.Rate || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                        <td>{item.Unit || 'N/A'}</td>
                        <td className="text-center">
                          <span className={`badge ${item.ServiceChYN === 'Y' ? 'bg-success' : 'bg-danger'}`}>
                            {item.ServiceChYN === 'Y' ? '🟢 Yes' : '🔴 No'}
                          </span>
                        </td>
                        <td className="text-center">
                          <button className="btn btn-outline-primary btn-sm me-2" onClick={() => handleEdit(item)}>
                            ✏️ Edit
                          </button>
                          <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(item)}>
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
                  <h5 className="modal-title">🔧 {isEditMode ? "Edit OT Item" : "Add New OT Item"}</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body p-4">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-bold">🔧 Item Name</label>
                      <input type="text" className="form-control" value={formData.OtItem} onChange={(e) => handleInputChange("OtItem", e.target.value)} placeholder="Enter item name" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">📂 Category</label>
                      <select className="form-control" value={formData.OtCategoryId} onChange={(e) => handleInputChange("OtCategoryId", Number(e.target.value))}>
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat.OtCategoryId} value={cat.OtCategoryId}>
                            {cat.OtCategory}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">💰 Rate (₹)</label>
                      <input type="number" className="form-control" value={formData.Rate} onChange={(e) => handleInputChange("Rate", Number(e.target.value))} placeholder="Enter rate" step="0.01" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">📏 Unit</label>
                      <input type="text" className="form-control" value={formData.Unit} onChange={(e) => handleInputChange("Unit", e.target.value)} placeholder="Enter unit (e.g., Hour, Piece)" />
                    </div>
                    <div className="col-12">
                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" checked={formData.ServiceChYN === "Y"} onChange={(e) => handleInputChange("ServiceChYN", e.target.checked ? "Y" : "N")} />
                        <label className="form-check-label fw-bold">💼 Service Charge</label>
                      </div>
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

export default OTItemMaster;