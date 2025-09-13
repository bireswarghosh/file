import { useState, useEffect } from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import Breadcrumb from "../../masterLayout/Breadcrumb";
import axiosInstance from "../../axiosInstance";

const NursingCareList = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCare, setSelectedCare] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [nursingCares, setNursingCares] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price_per_hour: "",
    category: "",
    requirements: "",
    availability: "available",
    image: ""
  });

  useEffect(() => {
    fetchNursingCares();
  }, []);

  const fetchNursingCares = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/api/v1/nursing');
      if (response.data.success) {
        setNursingCares(response.data.nursingCares || response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching nursing cares:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setFormData({
      name: "",
      description: "",
      price_per_hour: "",
      category: "",
      requirements: "",
      availability: "available",
      image: ""
    });
    setSelectedCare(null);
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (care) => {
    setFormData({
      name: care.name,
      description: care.description,
      price_per_hour: care.price_per_hour,
      category: care.category,
      requirements: care.requirements,
      availability: care.availability,
      image: care.image || ""
    });
    setSelectedCare(care);
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
      let response;
      
      if (isEditMode) {
        response = await axiosInstance.put(`/api/v1/nursing/${selectedCare.id}`, formData);
      } else {
        response = await axiosInstance.post('/api/v1/nursing', formData);
      }
      
      if (response.data.success) {
        fetchNursingCares();
        setShowModal(false);
      } else {
        alert('Error saving nursing care: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error saving nursing care:', error);
      alert('Error saving nursing care');
    }
  };

  const handleDelete = async (care) => {
    if (window.confirm(`Are you sure you want to delete ${care.name}?`)) {
      try {
        const response = await axiosInstance.delete(`/api/v1/nursing/${care.id}`);
        if (response.data.success) {
          fetchNursingCares();
        } else {
          alert('Error deleting nursing care: ' + response.data.message);
        }
      } catch (error) {
        console.error('Error deleting nursing care:', error);
        alert('Error deleting nursing care');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCare(null);
    setIsEditMode(false);
  };

  const getAvailabilityBadge = (availability) => {
    switch (availability) {
      case 'available':
        return <span className="badge bg-success">Available</span>;
      case 'busy':
        return <span className="badge bg-warning">Busy</span>;
      case 'unavailable':
        return <span className="badge bg-danger">Unavailable</span>;
      default:
        return <span className="badge bg-secondary">{availability}</span>;
    }
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Nursing Care Category" />
      <div className="container-fluid py-4">
        <div className="card shadow border-0 rounded-4">
          <div className="card-header border-bottom d-flex justify-content-between align-items-center">
            <h5 className="mb-0">👩‍⚕️ Nursing Care Category</h5>
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
              ✨ NEW NURSING CARE
            </button>
          </div>

          <div className="card-body">
            <div className="table-responsive" style={{ maxHeight: "60vh", overflowY: "auto" }}>
              <table className="table table-bordered table-sm table-striped table-hover align-middle">
                <thead className="table-primary sticky-top">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Price/Hour</th>
                    <th>Requirements</th>
                    <th>Availability</th>
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
                  ) : nursingCares.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-4">No nursing care services found</td>
                    </tr>
                  ) : (
                    nursingCares.map((care) => (
                      <tr key={care.id}>
                        <td>{care.id}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            {care.image && (
                              <img 
                                src={care.image} 
                                alt={care.name}
                                className="rounded me-2"
                                style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                              />
                            )}
                            <strong>{care.name}</strong>
                          </div>
                        </td>
                        <td>
                          <div style={{ maxWidth: '200px' }}>
                            {care.description?.length > 50 
                              ? care.description.substring(0, 50) + '...' 
                              : care.description
                            }
                          </div>
                        </td>
                        <td>
                          <span className="badge bg-info">{care.category}</span>
                        </td>
                        <td>
                          <strong>₹{care.price_per_hour}/hr</strong>
                        </td>
                        <td>
                          <div style={{ maxWidth: '150px' }}>
                            {care.requirements?.length > 30 
                              ? care.requirements.substring(0, 30) + '...' 
                              : care.requirements
                            }
                          </div>
                        </td>
                        <td>{getAvailabilityBadge(care.availability)}</td>
                        <td className="text-center">
                          <button 
                            className="btn btn-outline-primary btn-sm me-2" 
                            onClick={() => handleEdit(care)}
                          >
                            Edit
                          </button>
                          <button 
                            className="btn btn-outline-danger btn-sm" 
                            onClick={() => handleDelete(care)}
                          >
                            Delete
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
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {isEditMode ? 'Edit Nursing Care' : 'Add New Nursing Care'}
                  </h5>
                  <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Service Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="e.g., Home Nursing Care"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Category</label>
                      <select
                        className="form-control"
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                      >
                        <option value="">Select Category</option>
                        <option value="home_care">Home Care</option>
                        <option value="critical_care">Critical Care</option>
                        <option value="elderly_care">Elderly Care</option>
                        <option value="post_surgery">Post Surgery Care</option>
                        <option value="pediatric_care">Pediatric Care</option>
                        <option value="maternity_care">Maternity Care</option>
                      </select>
                    </div>
                    <div className="col-12 mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Describe the nursing care service..."
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Price Per Hour (₹)</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.price_per_hour}
                        onChange={(e) => handleInputChange('price_per_hour', e.target.value)}
                        placeholder="500"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Availability</label>
                      <select
                        className="form-control"
                        value={formData.availability}
                        onChange={(e) => handleInputChange('availability', e.target.value)}
                      >
                        <option value="available">Available</option>
                        <option value="busy">Busy</option>
                        <option value="unavailable">Unavailable</option>
                      </select>
                    </div>
                    <div className="col-12 mb-3">
                      <label className="form-label">Requirements</label>
                      <textarea
                        className="form-control"
                        rows="2"
                        value={formData.requirements}
                        onChange={(e) => handleInputChange('requirements', e.target.value)}
                        placeholder="Special requirements or qualifications needed..."
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label className="form-label">Image URL (Optional)</label>
                      <input
                        type="url"
                        className="form-control"
                        value={formData.image}
                        onChange={(e) => handleInputChange('image', e.target.value)}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                    Cancel
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleSave}>
                    {isEditMode ? 'Update' : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {showModal && <div className="modal-backdrop fade show"></div>}
      </div>
    </MasterLayout>
  );
};

export default NursingCareList;