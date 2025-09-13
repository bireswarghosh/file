import { useState, useEffect } from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import Breadcrumb from "../../masterLayout/Breadcrumb";
import axiosInstance from "../../axiosInstance";

const NursingList = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('categories');

  const [categories, setCategories] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [categoryFormData, setCategoryFormData] = useState({
    name: ""
  });

  const [packageFormData, setPackageFormData] = useState({
    nursing_category_id: "",
    package_name: "",
    duration: "",
    price: "",
    description: "",
    service_type: [],
    overview_points: []
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/nursing');
      if (response.data.success) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.error('Error fetching nursing categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPackages = async (categoryId) => {
    try {
      const response = await axiosInstance.get(`/nursing/packages/${categoryId}`);
      if (response.data.success) {
        setPackages(response.data.packages);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const handleAddNewCategory = () => {
    setCategoryFormData({ name: "" });
    setSelectedCategory(null);
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEditCategory = (category) => {
    setCategoryFormData({ name: category.name || "" });
    setSelectedCategory(category);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleAddNewPackage = () => {
    setPackageFormData({
      nursing_category_id: "",
      package_name: "",
      duration: "",
      price: "",
      description: "",
      service_type: [],
      overview_points: []
    });
    setShowPackageModal(true);
  };

  const handleCategoryInputChange = (field, value) => {
    setCategoryFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePackageInputChange = (field, value) => {
    setPackageFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setCategoryFormData((prev) => ({
        ...prev,
        selectedFile: e.target.files[0]
      }));
    }
  };

  const handleServiceTypeChange = (value) => {
    const serviceTypes = value.split(',').map(item => item.trim()).filter(item => item);
    setPackageFormData((prev) => ({
      ...prev,
      service_type: serviceTypes
    }));
  };

  const handleOverviewPointsChange = (value) => {
    const points = value.split('\n').map(item => item.trim()).filter(item => item);
    setPackageFormData((prev) => ({
      ...prev,
      overview_points: points
    }));
  };

  const handleSaveCategory = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', categoryFormData.name);
      
      if (categoryFormData.selectedFile) {
        formDataToSend.append('logo', categoryFormData.selectedFile);
      }
      
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      const response = isEditMode 
        ? await axiosInstance.put(`/nursing/${selectedCategory.id}`, formDataToSend, config)
        : await axiosInstance.post('/nursing', formDataToSend, config);
      
      if (response.data.success) {
        fetchCategories();
        setShowModal(false);
      } else {
        alert('Error saving category: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Error saving category');
    }
  };

  const handleSavePackage = async () => {
    try {
      const response = await axiosInstance.post('/nursing/packages', packageFormData);
      
      if (response.data.success) {
        alert('Package added successfully!');
        setShowPackageModal(false);
        if (packageFormData.nursing_category_id) {
          fetchPackages(packageFormData.nursing_category_id);
        }
      } else {
        alert('Error saving package: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error saving package:', error);
      alert('Error saving package');
    }
  };

  const handleDeleteCategory = async (category) => {
    if (window.confirm(`Are you sure you want to delete ${category.name}?`)) {
      try {
        const response = await axiosInstance.delete(`/nursing/${category.id}`);
        if (response.data.success) {
          fetchCategories();
        } else {
          alert('Error deleting category: ' + response.data.message);
        }
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Error deleting category');
      }
    }
  };

  const handleViewPackages = (category) => {
    setSelectedCategory(category);
    fetchPackages(category.id);
    setActiveTab('packages');
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Nursing Management" />
      <div className="container-fluid py-4">
        {/* Tab Navigation */}
        <div className="card shadow border-0 rounded-4 mb-4">
          <div className="card-header border-bottom">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'categories' ? 'active' : ''}`}
                  onClick={() => setActiveTab('categories')}
                >
                  🏥 Categories
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'packages' ? 'active' : ''}`}
                  onClick={() => setActiveTab('packages')}
                >
                  📦 Packages
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div className="card shadow border-0 rounded-4">
            <div className="card-header border-bottom d-flex justify-content-between align-items-center">
              <h5 className="mb-0">🏥 Nursing Categories</h5>
              <button
                className="btn btn-gradient-primary px-4 py-2 rounded-pill shadow-lg"
                onClick={handleAddNewCategory}
                style={{
                  background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                  color: "white",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                ✨ ADD CATEGORY
              </button>
            </div>

            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover align-middle">
                  <thead className="table-primary">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Logo</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="4" className="text-center py-4">
                          <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </td>
                      </tr>
                    ) : categories.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center py-4">No categories found</td>
                      </tr>
                    ) : (
                      categories.map((category) => (
                        <tr key={category.id}>
                          <td>{category.id}</td>
                          <td>{category.name}</td>
                          <td>
                            {category.logo && (
                              <img 
                                src={`https://xrk77z9r-5000.inc1.devtunnels.ms${category.logo}`} 
                                alt={category.name} 
                                style={{ width: '50px', height: '50px' }} 
                              />
                            )}
                          </td>
                          <td className="text-center">
                            <button 
                              className="btn btn-outline-info btn-sm me-2" 
                              onClick={() => handleViewPackages(category)}
                            >
                              📦 Packages
                            </button>
                            <button 
                              className="btn btn-outline-primary btn-sm me-2" 
                              onClick={() => handleEditCategory(category)}
                            >
                              ✏️ Edit
                            </button>
                            <button 
                              className="btn btn-outline-danger btn-sm" 
                              onClick={() => handleDeleteCategory(category)}
                            >
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
        )}

        {/* Packages Tab */}
        {activeTab === 'packages' && (
          <div className="card shadow border-0 rounded-4">
            <div className="card-header border-bottom d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                📦 Packages {selectedCategory && `- ${selectedCategory.name}`}
              </h5>
              <button
                className="btn btn-gradient-success px-4 py-2 rounded-pill shadow-lg"
                onClick={handleAddNewPackage}
                style={{
                  background: "linear-gradient(45deg, #28a745 0%, #20c997 100%)",
                  border: "none",
                  color: "white",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                ✨ ADD PACKAGE
              </button>
            </div>

            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover align-middle">
                  <thead className="table-success">
                    <tr>
                      <th>ID</th>
                      <th>Package Name</th>
                      <th>Duration</th>
                      <th>Price</th>
                      <th>Service Types</th>
                      <th>Overview Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {packages.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-4">No packages found</td>
                      </tr>
                    ) : (
                      packages.map((pkg) => (
                        <tr key={pkg.id}>
                          <td>{pkg.id}</td>
                          <td>{pkg.package_name}</td>
                          <td>{pkg.duration}</td>
                          <td>₹{pkg.price}</td>
                          <td>
                            {pkg.service_type && JSON.parse(pkg.service_type).map((service, index) => (
                              <span key={index} className="badge bg-info me-1">{service}</span>
                            ))}
                          </td>
                          <td>
                            {pkg.overview_points && JSON.parse(pkg.overview_points).slice(0, 2).map((point, index) => (
                              <div key={index} className="small">• {point}</div>
                            ))}
                            {pkg.overview_points && JSON.parse(pkg.overview_points).length > 2 && (
                              <div className="small text-muted">...and more</div>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Category Modal */}
        {showModal && (
          <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content border-0 rounded-4 shadow-lg">
                <div 
                  className="modal-header text-white rounded-top-4"
                  style={{ background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)" }}
                >
                  <h5 className="modal-title">
                    🏥 {isEditMode ? "Edit Category" : "Add New Category"}
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close btn-close-white" 
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                
                <div className="modal-body p-4">
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-bold">📝 Category Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={categoryFormData.name}
                        onChange={(e) => handleCategoryInputChange("name", e.target.value)}
                        placeholder="Enter category name"
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold">🖼️ Logo</label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={handleFileChange}
                        accept="image/*"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={handleSaveCategory}
                  >
                    {isEditMode ? "Update" : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Package Modal */}
        {showPackageModal && (
          <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-xl modal-dialog-centered">
              <div className="modal-content border-0 rounded-4 shadow-lg">
                <div 
                  className="modal-header text-white rounded-top-4"
                  style={{ background: "linear-gradient(45deg, #28a745 0%, #20c997 100%)" }}
                >
                  <h5 className="modal-title">📦 Add New Package</h5>
                  <button 
                    type="button" 
                    className="btn-close btn-close-white" 
                    onClick={() => setShowPackageModal(false)}
                  ></button>
                </div>
                
                <div className="modal-body p-4">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-bold">🏥 Category</label>
                      <select
                        className="form-select"
                        value={packageFormData.nursing_category_id}
                        onChange={(e) => handlePackageInputChange("nursing_category_id", e.target.value)}
                      >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">📦 Package Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={packageFormData.package_name}
                        onChange={(e) => handlePackageInputChange("package_name", e.target.value)}
                        placeholder="e.g., 1 Day Pack"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">⏰ Duration</label>
                      <input
                        type="text"
                        className="form-control"
                        value={packageFormData.duration}
                        onChange={(e) => handlePackageInputChange("duration", e.target.value)}
                        placeholder="e.g., 24 hours"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">💰 Price</label>
                      <input
                        type="number"
                        className="form-control"
                        value={packageFormData.price}
                        onChange={(e) => handlePackageInputChange("price", e.target.value)}
                        placeholder="e.g., 500"
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold">📝 Description</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={packageFormData.description}
                        onChange={(e) => handlePackageInputChange("description", e.target.value)}
                        placeholder="Package description"
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold">🏥 Service Types (comma separated)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={packageFormData.service_type.join(', ')}
                        onChange={(e) => handleServiceTypeChange(e.target.value)}
                        placeholder="e.g., Home Care, ICU Care, Post Surgery Care"
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold">📋 Overview Points (one per line)</label>
                      <textarea
                        className="form-control"
                        rows="5"
                        value={packageFormData.overview_points.join('\n')}
                        onChange={(e) => handleOverviewPointsChange(e.target.value)}
                        placeholder="Nurse will be present in the workplace&#10;24/7 monitoring and care&#10;Medication administration"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setShowPackageModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-success" 
                    onClick={handleSavePackage}
                  >
                    Save Package
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

export default NursingList;