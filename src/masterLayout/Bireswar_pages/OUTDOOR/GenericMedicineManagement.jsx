import { useState, useEffect } from "react";
import MasterLayout from '../../MasterLayout';
import Breadcrumb from '../../Breadcrumb';
import axiosInstance from "../../../axiosInstance";

const GenericMedicineManagement = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    genericName: '',
    manufacturer: '',
    strength: '',
    dosageForm: '',
    price: '',
    description: ''
  });

  useEffect(() => {
    fetchMedicines();
  }, [currentPage, searchQuery]);

  const fetchMedicines = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: 10,
        ...(searchQuery && { search: searchQuery })
      };
      
      const response = await axiosInstance.get('/generic-medicines', { params });
      
      if (response.data.success) {
        setMedicines(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        setTotalItems(response.data.pagination.totalItems);
      }
    } catch (error) {
      console.error('Error fetching medicines:', error);
      alert('Failed to fetch medicines');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingMedicine ? `/generic-medicines/${editingMedicine.id}` : '/generic-medicines';
      const method = editingMedicine ? 'put' : 'post';
      
      const response = await axiosInstance[method](url, formData);
      
      if (response.data.success) {
        await fetchMedicines();
        setShowModal(false);
        resetForm();
        alert(editingMedicine ? 'Medicine updated successfully!' : 'Medicine created successfully!');
      }
    } catch (error) {
      console.error('Error saving medicine:', error);
      alert('Failed to save medicine');
    }
  };

  const handleEdit = (medicine) => {
    setEditingMedicine(medicine);
    setFormData({
      name: medicine.name,
      genericName: medicine.generic_name,
      manufacturer: medicine.manufacturer || '',
      strength: medicine.strength || '',
      dosageForm: medicine.dosage_form || '',
      price: medicine.price.toString(),
      description: medicine.description || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      try {
        const response = await axiosInstance.delete(`/generic-medicines/${id}`);
        if (response.data.success) {
          await fetchMedicines();
          alert('Medicine deleted successfully!');
        }
      } catch (error) {
        console.error('Error deleting medicine:', error);
        alert('Failed to delete medicine');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      genericName: '',
      manufacturer: '',
      strength: '',
      dosageForm: '',
      price: '',
      description: ''
    });
    setEditingMedicine(null);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Generic Medicine Management" />
      <div className="container-fluid py-4">
        
        {/* Header */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm" style={{borderRadius: '15px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
              <div className="card-body text-white py-4">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h5 className="fw-bold mb-2">
                      <i className="fas fa-pills me-3"></i>
                      Generic Medicine Management
                    </h5>
                    <p className="mb-0 opacity-90">Manage your generic medicine inventory</p>
                  </div>
                  <div className="col-md-4 text-end">
                    <div className="bg-white bg-opacity-20 rounded-3 p-3">
                      <h4 className="fw-bold mb-1">{totalItems}</h4>
                      <small>Total Medicines</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Add Button */}
        <div className="row mb-4">
          <div className="col-md-8">
            <div className="card border-0 shadow-sm" style={{borderRadius: '12px'}}>
              <div className="card-body">
                <div className="input-group">
                  <span className="input-group-text bg-light border-0">
                    <i className="fas fa-search text-muted"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-0 bg-light"
                    placeholder="Search medicines by name, generic name, or manufacturer..."
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <button
              className="btn btn-primary w-100 py-3"
              style={{borderRadius: '12px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none'}}
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
            >
              <i className="fas fa-plus me-2"></i>
              Add New Medicine
            </button>
          </div>
        </div>

        {/* Medicines Table */}
        <div className="card border-0 shadow-sm" style={{borderRadius: '15px'}}>
          <div className="card-header bg-white border-0 py-3" style={{borderRadius: '15px 15px 0 0'}}>
            <h5 className="mb-0 fw-bold text-dark">
              <i className="fas fa-list me-2 text-primary"></i>
              Medicines List
            </h5>
          </div>
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted">Loading medicines...</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="border-0 py-3 px-4">Medicine Name</th>
                      <th className="border-0 py-3">Generic Name</th>
                      <th className="border-0 py-3">Manufacturer</th>
                      <th className="border-0 py-3">Strength</th>
                      <th className="border-0 py-3">Form</th>
                      <th className="border-0 py-3">Price</th>
                      <th className="border-0 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicines.length > 0 ? medicines.map((medicine) => (
                      <tr key={medicine.id} className="border-bottom">
                        <td className="py-3 px-4">
                          <div className="d-flex align-items-center">
                            <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                              <i className="fas fa-pills text-primary"></i>
                            </div>
                            <div>
                              <h6 className="mb-0 fw-bold">{medicine.name}</h6>
                              <small className="text-muted">ID: {medicine.id}</small>
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <span className="badge bg-info bg-opacity-10 text-info px-3 py-2">
                            {medicine.generic_name}
                          </span>
                        </td>
                        <td className="py-3">{medicine.manufacturer || 'N/A'}</td>
                        <td className="py-3">
                          <span className="badge bg-success bg-opacity-10 text-success">
                            {medicine.strength || 'N/A'}
                          </span>
                        </td>
                        <td className="py-3">{medicine.dosage_form || 'N/A'}</td>
                        <td className="py-3">
                          <span className="fw-bold text-success">
                            {formatCurrency(medicine.price)}
                          </span>
                        </td>
                        <td className="py-3 text-center">
                          <div className="btn-group" role="group">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => handleEdit(medicine)}
                              title="Edit"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(medicine.id)}
                              title="Delete"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="7" className="text-center py-5">
                          <div className="text-muted">
                            <i className="fas fa-pills fa-3x mb-3 opacity-50"></i>
                            <p className="mb-0">No medicines found</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="card-footer bg-white border-0">
              <nav>
                <ul className="pagination justify-content-center mb-0">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>
                  {[...Array(totalPages)].map((_, index) => (
                    <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content border-0" style={{borderRadius: '15px'}}>
                <div className="modal-header border-0 pb-0">
                  <h5 className="modal-title fw-bold">
                    <i className="fas fa-pills me-2 text-primary"></i>
                    {editingMedicine ? 'Edit Medicine' : 'Add New Medicine'}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">Medicine Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">Generic Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.genericName}
                          onChange={(e) => setFormData({...formData, genericName: e.target.value})}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">Manufacturer</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.manufacturer}
                          onChange={(e) => setFormData({...formData, manufacturer: e.target.value})}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">Strength</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g., 500mg, 10ml"
                          value={formData.strength}
                          onChange={(e) => setFormData({...formData, strength: e.target.value})}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">Dosage Form</label>
                        <select
                          className="form-select"
                          value={formData.dosageForm}
                          onChange={(e) => setFormData({...formData, dosageForm: e.target.value})}
                        >
                          <option value="">Select Form</option>
                          <option value="Tablet">Tablet</option>
                          <option value="Capsule">Capsule</option>
                          <option value="Syrup">Syrup</option>
                          <option value="Injection">Injection</option>
                          <option value="Cream">Cream</option>
                          <option value="Ointment">Ointment</option>
                          <option value="Drops">Drops</option>
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">Price (₹)</label>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control"
                          value={formData.price}
                          onChange={(e) => setFormData({...formData, price: e.target.value})}
                        />
                      </div>
                      <div className="col-12 mb-3">
                        <label className="form-label fw-semibold">Description</label>
                        <textarea
                          className="form-control"
                          rows="3"
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer border-0">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none'}}
                    >
                      <i className="fas fa-save me-2"></i>
                      {editingMedicine ? 'Update Medicine' : 'Add Medicine'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </MasterLayout>
  );
};

export default GenericMedicineManagement;