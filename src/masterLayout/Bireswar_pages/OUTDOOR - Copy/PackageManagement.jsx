import { useState, useEffect } from "react";
import MasterLayout from '../../MasterLayout';
import Breadcrumb from '../../Breadcrumb';
import axiosInstance from "../../../axiosInstance";

const PackageManagement = () => {
  const [packages, setPackages] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('packages');
  const [showModal, setShowModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [formData, setFormData] = useState({
    packageName: '',
    packagePrice: '',
    packageDescription: '',
    services: [{ serviceName: '', serviceDescription: '' }]
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchPackages(),
        fetchPurchases(),
        fetchStatistics()
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPackages = async () => {
    try {
      const response = await axiosInstance.get('/admin/packages');
      if (response.data.success) {
        setPackages(response.data.packages);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const fetchPurchases = async () => {
    try {
      const response = await axiosInstance.get('/admin/packages/purchases');
      if (response.data.success) {
        setPurchases(response.data.purchases);
      }
    } catch (error) {
      console.error('Error fetching purchases:', error);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await axiosInstance.get('/admin/packages/statistics');
      if (response.data.success) {
        setStatistics(response.data.statistics);
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingPackage ? `/admin/packages/${editingPackage.id}` : '/admin/packages';
      const method = editingPackage ? 'put' : 'post';
      
      const response = await axiosInstance[method](url, formData);
      
      if (response.data.success) {
        await fetchPackages();
        setShowModal(false);
        resetForm();
        alert(editingPackage ? 'Package updated successfully!' : 'Package created successfully!');
      }
    } catch (error) {
      console.error('Error saving package:', error);
      alert('Failed to save package');
    }
  };

  const handleEdit = (pkg) => {
    setEditingPackage(pkg);
    setFormData({
      packageName: pkg.packageName,
      packagePrice: pkg.packagePrice.toString(),
      packageDescription: pkg.packageDescription || '',
      services: pkg.services.length > 0 ? pkg.services.map(s => ({
        serviceName: s.serviceName,
        serviceDescription: s.serviceDescription || ''
      })) : [{ serviceName: '', serviceDescription: '' }]
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        const response = await axiosInstance.delete(`/admin/packages/${id}`);
        if (response.data.success) {
          await fetchPackages();
          alert('Package deleted successfully!');
        }
      } catch (error) {
        console.error('Error deleting package:', error);
        alert('Failed to delete package');
      }
    }
  };

  const addService = () => {
    setFormData({
      ...formData,
      services: [...formData.services, { serviceName: '', serviceDescription: '' }]
    });
  };

  const removeService = (index) => {
    const newServices = formData.services.filter((_, i) => i !== index);
    setFormData({ ...formData, services: newServices });
  };

  const updateService = (index, field, value) => {
    const newServices = [...formData.services];
    newServices[index][field] = value;
    setFormData({ ...formData, services: newServices });
  };

  const resetForm = () => {
    setFormData({
      packageName: '',
      packagePrice: '',
      packageDescription: '',
      services: [{ serviceName: '', serviceDescription: '' }]
    });
    setEditingPackage(null);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Package Management" />
      <div className="container-fluid py-4">
        
        {/* Statistics Cards */}
        <div className="row mb-4">
          <div className="col-lg-3 col-md-6 mb-3">
            <div className="card border-0 shadow-sm h-100" style={{borderRadius: '15px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
              <div className="card-body text-white text-center py-4">
                <i className="fas fa-box mb-3" style={{fontSize: '2.5rem', opacity: 0.8}}></i>
                <h3 className="fw-bold mb-2">{statistics.totalPackages || 0}</h3>
                <p className="mb-0 opacity-90">Total Packages</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-3">
            <div className="card border-0 shadow-sm h-100" style={{borderRadius: '15px', background: 'linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%)'}}>
              <div className="card-body text-white text-center py-4">
                <i className="fas fa-check-circle mb-3" style={{fontSize: '2.5rem', opacity: 0.8}}></i>
                <h3 className="fw-bold mb-2">{statistics.activePackages || 0}</h3>
                <p className="mb-0 opacity-90">Active Packages</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-3">
            <div className="card border-0 shadow-sm h-100" style={{borderRadius: '15px', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>
              <div className="card-body text-white text-center py-4">
                <i className="fas fa-shopping-cart mb-3" style={{fontSize: '2.5rem', opacity: 0.8}}></i>
                <h3 className="fw-bold mb-2">{statistics.totalPurchases || 0}</h3>
                <p className="mb-0 opacity-90">Total Purchases</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-3">
            <div className="card border-0 shadow-sm h-100" style={{borderRadius: '15px', background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}}>
              <div className="card-body text-white text-center py-4">
                <i className="fas fa-rupee-sign mb-3" style={{fontSize: '2.5rem', opacity: 0.8}}></i>
                <h3 className="fw-bold mb-2">{formatCurrency(statistics.totalRevenue || 0)}</h3>
                <p className="mb-0 opacity-90">Total Revenue</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="card border-0 shadow-sm" style={{borderRadius: '15px'}}>
          <div className="card-header bg-white border-0" style={{borderRadius: '15px 15px 0 0'}}>
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'packages' ? 'active' : ''}`}
                  onClick={() => setActiveTab('packages')}
                >
                  <i className="fas fa-box me-2"></i>Packages
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'purchases' ? 'active' : ''}`}
                  onClick={() => setActiveTab('purchases')}
                >
                  <i className="fas fa-shopping-cart me-2"></i>Purchases
                </button>
              </li>
            </ul>
          </div>

          <div className="card-body">
            {activeTab === 'packages' && (
              <div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="mb-0">Package Management</h5>
                  <button 
                    className="btn btn-primary"
                    onClick={() => {
                      resetForm();
                      setShowModal(true);
                    }}
                  >
                    <i className="fas fa-plus me-2"></i>Add New Package
                  </button>
                </div>

                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Package Name</th>
                        <th>Price</th>
                        <th>Services</th>
                        <th>Status</th>
                        <th>Purchases</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {packages.map((pkg) => (
                        <tr key={pkg.id}>
                          <td>
                            <div>
                              <strong>{pkg.packageName}</strong>
                              {pkg.packageDescription && (
                                <div className="text-muted small">{pkg.packageDescription}</div>
                              )}
                            </div>
                          </td>
                          <td className="fw-bold text-success">{formatCurrency(pkg.packagePrice)}</td>
                          <td>
                            <span className="badge bg-info">{pkg.services.length} services</span>
                          </td>
                          <td>
                            <span className={`badge ${pkg.isActive ? 'bg-success' : 'bg-danger'}`}>
                              {pkg.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td>
                            <span className="badge bg-primary">{pkg._count.purchases}</span>
                          </td>
                          <td>
                            <div className="btn-group">
                              <button 
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleEdit(pkg)}
                                title="Edit Package"
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button 
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(pkg.id)}
                                title="Delete Package"
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'purchases' && (
              <div>
                <h5 className="mb-4">Purchase History</h5>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Patient</th>
                        <th>Package</th>
                        <th>Amount</th>
                        <th>Payment Status</th>
                        <th>Purchase Date</th>
                        <th>Transaction ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {purchases.map((purchase) => (
                        <tr key={purchase.id}>
                          <td>
                            <div>
                              <strong>{purchase.patient.fullName}</strong>
                              <div className="text-muted small">{purchase.patient.email}</div>
                            </div>
                          </td>
                          <td>{purchase.package.packageName}</td>
                          <td className="fw-bold text-success">{formatCurrency(purchase.purchaseAmount)}</td>
                          <td>
                            <span className={`badge ${
                              purchase.paymentStatus === 'completed' ? 'bg-success' :
                              purchase.paymentStatus === 'pending' ? 'bg-warning' :
                              purchase.paymentStatus === 'failed' ? 'bg-danger' : 'bg-secondary'
                            }`}>
                              {purchase.paymentStatus}
                            </span>
                          </td>
                          <td>{new Date(purchase.purchaseDate).toLocaleDateString()}</td>
                          <td>{purchase.transactionId || 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Package Modal */}
      {showModal && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingPackage ? 'Edit Package' : 'Add New Package'}
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Package Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.packageName}
                        onChange={(e) => setFormData({...formData, packageName: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Price (₹) *</label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        value={formData.packagePrice}
                        onChange={(e) => setFormData({...formData, packagePrice: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={formData.packageDescription}
                      onChange={(e) => setFormData({...formData, packageDescription: e.target.value})}
                    ></textarea>
                  </div>
                  
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <label className="form-label mb-0">Services Included</label>
                      <button type="button" className="btn btn-sm btn-outline-primary" onClick={addService}>
                        <i className="fas fa-plus me-1"></i>Add Service
                      </button>
                    </div>
                    
                    {formData.services.map((service, index) => (
                      <div key={index} className="border rounded p-3 mb-2">
                        <div className="row">
                          <div className="col-md-6 mb-2">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Service Name"
                              value={service.serviceName}
                              onChange={(e) => updateService(index, 'serviceName', e.target.value)}
                              required
                            />
                          </div>
                          <div className="col-md-5 mb-2">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Description (optional)"
                              value={service.serviceDescription}
                              onChange={(e) => updateService(index, 'serviceDescription', e.target.value)}
                            />
                          </div>
                          <div className="col-md-1 mb-2">
                            {formData.services.length > 1 && (
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => removeService(index)}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingPackage ? 'Update Package' : 'Create Package'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </MasterLayout>
  );
};

export default PackageManagement;