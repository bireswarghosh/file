import { useState, useEffect } from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import Breadcrumb from "../../masterLayout/Breadcrumb";
import axiosInstance from "../../axiosInstance";
  const backendurl = process.env.backendurl;
// // const backendurl = process.env.REACT_APP_BACKEND_URL || 'https://xrk77z9r-5000.inc1.devtunnels.ms';

const PrescriptionDeliveryList = () => {

  const [showModal, setShowModal] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [deliveries, setDeliveries] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    patient_id: "",
    name: "",
    phone_number: "",
    delivery_type: "home_delivery",
    home_delivery_location: "",
    home_delivery_address: "",
    status: "pending"
  });

  useEffect(() => {
    fetchDeliveries();
    fetchPatients();
  }, []);

  const fetchDeliveries = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/prescription-delivery');
      if (response.data.success) {
        setDeliveries(response.data.deliveries || []);
      }
    } catch (error) {
      console.error('Error fetching deliveries:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axiosInstance.get('/prescription-delivery/patients');
      if (response.data.success) {
        setPatients(response.data.patients || []);
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleAddNew = () => {
    setFormData({
      patient_id: "",
      name: "",
      phone_number: "",
      delivery_type: "home_delivery",
      home_delivery_location: "",
      home_delivery_address: "",
      status: "pending"
    });
    setSelectedDelivery(null);
    setSelectedFile(null);
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (delivery) => {
    setFormData({
      patient_id: delivery.patient_id,
      name: delivery.name,
      phone_number: delivery.phone_number,
      delivery_type: delivery.delivery_type,
      home_delivery_location: delivery.home_delivery_location || "",
      home_delivery_address: delivery.home_delivery_address || "",
      status: delivery.status
    });
    setSelectedDelivery(delivery);
    setSelectedFile(null);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePatientSelect = (patientId) => {
    const patient = patients.find(p => p.id === parseInt(patientId));
    if (patient) {
      setFormData(prev => ({
        ...prev,
        patient_id: patientId,
        name: patient.fullName,
        phone_number: patient.phoneNumber || ""
      }));
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      const formDataToSend = new FormData();
      
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      if (selectedFile) {
        formDataToSend.append('prescription_image', selectedFile);
      }

      let response;
      
      if (isEditMode) {
        response = await axiosInstance.put(`/prescription-delivery/${selectedDelivery.id}/status`, 
          { status: formData.status });
      } else {
        response = await axiosInstance.post('/prescription-delivery', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      
      if (response.data.success) {
        fetchDeliveries();
        setShowModal(false);
      } else {
        alert('Error saving delivery: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error saving delivery:', error);
      alert('Error saving delivery');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDelivery(null);
    setSelectedFile(null);
    setIsEditMode(false);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="badge bg-warning">Pending</span>;
      case 'confirmed':
        return <span className="badge bg-primary">Confirmed</span>;
      case 'delivered':
        return <span className="badge bg-success">Delivered</span>;
      case 'cancelled':
        return <span className="badge bg-danger">Cancelled</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  const getDeliveryTypeBadge = (type) => {
    return type === 'home_delivery' ? 
      <span className="badge bg-info">Home Delivery</span> : 
      <span className="badge bg-secondary">Hospital Pickup</span>;
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Prescription Delivery Management" />
      <div className="container-fluid py-4">
        <div className="card shadow border-0 rounded-4">
          <div className="card-header border-bottom d-flex justify-content-between align-items-center">
            <h5 className="mb-0">💊 Prescription Delivery Management</h5>
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
              ✨ NEW DELIVERY REQUEST
            </button>
          </div>

          <div className="card-body">
            <div className="table-responsive" style={{ maxHeight: "60vh", overflowY: "auto" }}>
              <table className="table table-bordered table-sm table-striped table-hover align-middle">
                <thead className="table-primary sticky-top">
                  <tr>
                    <th>ID</th>
                    <th>Patient Name</th>
                    <th>Phone</th>
                    <th>Delivery Type</th>
                    <th>Location</th>
                    <th>Address</th>
                    <th>Prescription</th>
                    <th>Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="9" className="text-center py-4">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : deliveries.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="text-center py-4">No deliveries found</td>
                    </tr>
                  ) : (
                    deliveries.map((delivery) => (
                      <tr key={delivery.id}>
                        <td>{delivery.id}</td>
                        <td>{delivery.name}</td>
                        <td>{delivery.phone_number}</td>
                        <td>{getDeliveryTypeBadge(delivery.delivery_type)}</td>
                        <td>{delivery.home_delivery_location || 'N/A'}</td>
                        <td>{delivery.home_delivery_address || 'N/A'}</td>
                        <td>
                          {delivery.prescription_image ? (
                            <a href={`https://xrk77z9r-5000.inc1.devtunnels.ms/uploads/prescriptions/${delivery.prescription_image}`} 
                               target="_blank" rel="noopener noreferrer"
                               className="btn btn-sm btn-outline-primary">
                              View Image
                            </a>
                          ) : 'No Image'}
                        </td>
                        <td>{getStatusBadge(delivery.status)}</td>
                        <td className="text-center">
                          <button 
                            className="btn btn-outline-primary btn-sm me-2" 
                            onClick={() => handleEdit(delivery)}
                          >
                            Edit
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
                    {isEditMode ? 'Edit Delivery Status' : 'Add New Prescription Delivery'}
                  </h5>
                  <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    {!isEditMode && (
                      <>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Select Patient</label>
                          <select
                            className="form-control"
                            value={formData.patient_id}
                            onChange={(e) => handlePatientSelect(e.target.value)}
                          >
                            <option value="">Select Patient</option>
                            {patients.map(patient => (
                              <option key={patient.id} value={patient.id}>
                                {patient.fullName} - {patient.phoneNumber}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Patient Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Phone Number</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.phone_number}
                            onChange={(e) => handleInputChange('phone_number', e.target.value)}
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Delivery Type</label>
                          <select
                            className="form-control"
                            value={formData.delivery_type}
                            onChange={(e) => handleInputChange('delivery_type', e.target.value)}
                          >
                            <option value="home_delivery">Home Delivery</option>
                            <option value="hospital_pickup">Hospital Pickup</option>
                          </select>
                        </div>
                        {formData.delivery_type === 'home_delivery' && (
                          <>
                            <div className="col-md-6 mb-3">
                              <label className="form-label">Home Delivery Location</label>
                              <input
                                type="text"
                                className="form-control"
                                value={formData.home_delivery_location}
                                onChange={(e) => handleInputChange('home_delivery_location', e.target.value)}
                                placeholder="Enter location/area"
                              />
                            </div>
                            <div className="col-12 mb-3">
                              <label className="form-label">Home Delivery Address</label>
                              <textarea
                                className="form-control"
                                rows="3"
                                value={formData.home_delivery_address}
                                onChange={(e) => handleInputChange('home_delivery_address', e.target.value)}
                                placeholder="Enter full address"
                              />
                            </div>
                          </>
                        )}
                        <div className="col-12 mb-3">
                          <label className="form-label">Prescription Image</label>
                          <input
                            type="file"
                            className="form-control"
                            accept="image/*,application/pdf"
                            onChange={handleFileChange}
                          />
                          <small className="text-muted">Upload prescription image or PDF (Max 5MB)</small>
                        </div>
                      </>
                    )}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Status</label>
                      <select
                        className="form-control"
                        value={formData.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                    Cancel
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleSave}>
                    {isEditMode ? 'Update Status' : 'Save Delivery'}
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

export default PrescriptionDeliveryList;