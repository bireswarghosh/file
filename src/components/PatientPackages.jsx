import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";

const PatientPackages = () => {
  const [packages, setPackages] = useState([]);
  const [myPurchases, setMyPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('packages');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [purchaseData, setPurchaseData] = useState({
    paymentMethod: 'online',
    transactionId: '',
    notes: ''
  });

  // Get patient ID from localStorage (assuming patient is logged in)
  const patientId = localStorage.getItem('patientId') || 1; // Default for testing

  useEffect(() => {
    fetchPackages();
    fetchMyPurchases();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axiosInstance.get('/health-packages');
      if (response.data.success) {
        setPackages(response.data.packages);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyPurchases = async () => {
    try {
      const response = await axiosInstance.get(`/health-packages/patient/${patientId}`);
      if (response.data.success) {
        setMyPurchases(response.data.purchases);
      }
    } catch (error) {
      console.error('Error fetching purchases:', error);
    }
  };

  const handleViewDetails = (pkg) => {
    setSelectedPackage(pkg);
    setShowModal(true);
  };

  const handleBuyPackage = (pkg) => {
    setSelectedPackage(pkg);
    setPurchaseData({
      paymentMethod: 'online',
      transactionId: '',
      notes: ''
    });
    setShowPurchaseModal(true);
  };

  const handlePurchase = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/health-packages/purchase', {
        patientId: parseInt(patientId),
        packageId: selectedPackage.id,
        ...purchaseData
      });

      if (response.data.success) {
        alert('Package purchased successfully!');
        setShowPurchaseModal(false);
        fetchMyPurchases();
      }
    } catch (error) {
      console.error('Error purchasing package:', error);
      alert('Failed to purchase package');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const isPackagePurchased = (packageId) => {
    return myPurchases.some(purchase => purchase.packageId === packageId);
  };

  if (loading) {
    return (
      <div className="container-fluid py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4" style={{minHeight: '100vh', backgroundColor: '#f8f9fa'}}>
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="text-center mb-5">
            <h1 className="fw-bold text-primary mb-3">🏥 Health Packages</h1>
            <p className="text-muted">Choose from our comprehensive health packages at the best rates</p>
          </div>

          {/* Tabs */}
          <div className="card border-0 shadow-sm mb-4" style={{borderRadius: '15px'}}>
            <div className="card-header bg-white border-0" style={{borderRadius: '15px 15px 0 0'}}>
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'packages' ? 'active' : ''}`}
                    onClick={() => setActiveTab('packages')}
                  >
                    <i className="fas fa-box me-2"></i>Available Packages
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'purchases' ? 'active' : ''}`}
                    onClick={() => setActiveTab('purchases')}
                  >
                    <i className="fas fa-shopping-cart me-2"></i>My Purchases ({myPurchases.length})
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {activeTab === 'packages' && (
            <div className="row">
              {packages.map((pkg) => (
                <div key={pkg.id} className="col-lg-4 col-md-6 mb-4">
                  <div className="card border-0 shadow-sm h-100" style={{borderRadius: '15px'}}>
                    <div className="card-header bg-primary text-white text-center" style={{borderRadius: '15px 15px 0 0'}}>
                      <h5 className="mb-0 fw-bold">{pkg.packageName}</h5>
                    </div>
                    <div className="card-body d-flex flex-column">
                      <div className="text-center mb-3">
                        <h2 className="text-success fw-bold mb-0">{formatCurrency(pkg.packagePrice)}</h2>
                        <small className="text-muted">All inclusive</small>
                      </div>
                      
                      {pkg.packageDescription && (
                        <p className="text-muted mb-3">{pkg.packageDescription}</p>
                      )}
                      
                      <div className="mb-3">
                        <h6 className="fw-bold mb-2">
                          <i className="fas fa-check-circle text-success me-2"></i>
                          Services Included ({pkg.services.length})
                        </h6>
                        <div style={{maxHeight: '150px', overflowY: 'auto'}}>
                          {pkg.services.slice(0, 5).map((service, index) => (
                            <div key={index} className="d-flex align-items-center mb-1">
                              <i className="fas fa-check text-success me-2" style={{fontSize: '0.8rem'}}></i>
                              <small>{service.serviceName}</small>
                            </div>
                          ))}
                          {pkg.services.length > 5 && (
                            <small className="text-muted">+{pkg.services.length - 5} more services</small>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-auto">
                        <div className="d-grid gap-2">
                          <button 
                            className="btn btn-outline-primary"
                            onClick={() => handleViewDetails(pkg)}
                          >
                            <i className="fas fa-eye me-2"></i>View Details
                          </button>
                          {isPackagePurchased(pkg.id) ? (
                            <button className="btn btn-success" disabled>
                              <i className="fas fa-check me-2"></i>Already Purchased
                            </button>
                          ) : (
                            <button 
                              className="btn btn-primary"
                              onClick={() => handleBuyPackage(pkg)}
                            >
                              <i className="fas fa-shopping-cart me-2"></i>Buy Now
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'purchases' && (
            <div className="card border-0 shadow-sm" style={{borderRadius: '15px'}}>
              <div className="card-body">
                {myPurchases.length === 0 ? (
                  <div className="text-center py-5">
                    <i className="fas fa-shopping-cart text-muted" style={{fontSize: '4rem', opacity: 0.3}}></i>
                    <h5 className="text-muted mt-3">No purchases yet</h5>
                    <p className="text-muted">Browse our packages and make your first purchase!</p>
                    <button 
                      className="btn btn-primary"
                      onClick={() => setActiveTab('packages')}
                    >
                      Browse Packages
                    </button>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead className="table-light">
                        <tr>
                          <th>Package</th>
                          <th>Amount Paid</th>
                          <th>Payment Status</th>
                          <th>Purchase Date</th>
                          <th>Transaction ID</th>
                        </tr>
                      </thead>
                      <tbody>
                        {myPurchases.map((purchase) => (
                          <tr key={purchase.id}>
                            <td>
                              <div>
                                <strong>{purchase.package.packageName}</strong>
                                <div className="text-muted small">
                                  {purchase.package.services.length} services included
                                </div>
                              </div>
                            </td>
                            <td className="fw-bold text-success">
                              {formatCurrency(purchase.purchaseAmount)}
                            </td>
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
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Package Details Modal */}
      {showModal && selectedPackage && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">{selectedPackage.packageName}</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <h3 className="text-success fw-bold mb-3">{formatCurrency(selectedPackage.packagePrice)}</h3>
                    {selectedPackage.packageDescription && (
                      <p className="text-muted mb-4">{selectedPackage.packageDescription}</p>
                    )}
                  </div>
                  <div className="col-md-6 text-end">
                    <span className="badge bg-info fs-6">{selectedPackage.services.length} Services Included</span>
                  </div>
                </div>
                
                <h6 className="fw-bold mb-3">Services Included:</h6>
                <div className="row">
                  {selectedPackage.services.map((service, index) => (
                    <div key={index} className="col-md-6 mb-2">
                      <div className="d-flex align-items-center">
                        <i className="fas fa-check-circle text-success me-2"></i>
                        <span>{service.serviceName}</span>
                      </div>
                      {service.serviceDescription && (
                        <small className="text-muted ms-4">{service.serviceDescription}</small>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
                {!isPackagePurchased(selectedPackage.id) && (
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => {
                      setShowModal(false);
                      handleBuyPackage(selectedPackage);
                    }}
                  >
                    <i className="fas fa-shopping-cart me-2"></i>Buy Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Purchase Modal */}
      {showPurchaseModal && selectedPackage && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Purchase Package</h5>
                <button type="button" className="btn-close" onClick={() => setShowPurchaseModal(false)}></button>
              </div>
              <form onSubmit={handlePurchase}>
                <div className="modal-body">
                  <div className="card bg-light mb-3">
                    <div className="card-body">
                      <h6 className="fw-bold">{selectedPackage.packageName}</h6>
                      <h4 className="text-success mb-0">{formatCurrency(selectedPackage.packagePrice)}</h4>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Payment Method</label>
                    <select 
                      className="form-select"
                      value={purchaseData.paymentMethod}
                      onChange={(e) => setPurchaseData({...purchaseData, paymentMethod: e.target.value})}
                    >
                      <option value="online">Online Payment</option>
                      <option value="cash">Cash</option>
                      <option value="card">Card</option>
                    </select>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Transaction ID (Optional)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={purchaseData.transactionId}
                      onChange={(e) => setPurchaseData({...purchaseData, transactionId: e.target.value})}
                      placeholder="Enter transaction ID if available"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Notes (Optional)</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={purchaseData.notes}
                      onChange={(e) => setPurchaseData({...purchaseData, notes: e.target.value})}
                      placeholder="Any additional notes..."
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowPurchaseModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-success">
                    <i className="fas fa-credit-card me-2"></i>
                    Pay {formatCurrency(selectedPackage.packagePrice)}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientPackages;