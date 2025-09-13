import { useState, useEffect } from "react"
import MasterLayout from "../../MasterLayout"
import Breadcrumb from "../../Breadcrumb"
import axiosInstance from '../../../axiosInstance';

const ServiceMaster = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [formData, setFormData] = useState({
    SERVICE: '',
    SERVICECODE: ''
  })

  const fetchServices = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get('/services')
      if (response.data.success) {
        setServices(response.data.data)
      }
    } catch (error) {
      console.error("Error fetching services:", error)
      alert("Error fetching services")
    }
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingService) {
        await axiosInstance.put(`/services/${editingService.SERVICEId}`, formData)
        alert("Service updated successfully!")
      } else {
        await axiosInstance.post('/services', formData)
        alert("Service created successfully!")
      }
      setShowModal(false)
      setFormData({ SERVICE: '', SERVICECODE: '' })
      setEditingService(null)
      fetchServices()
    } catch (error) {
      console.error("Error saving service:", error)
      alert("Error saving service")
    }
  }

  const handleEdit = (service) => {
    setEditingService(service)
    setFormData({
      SERVICE: service.SERVICE || '',
      SERVICECODE: service.SERVICECODE || ''
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await axiosInstance.delete(`/services/${id}`)
        alert("Service deleted successfully!")
        fetchServices()
      } catch (error) {
        console.error("Error deleting service:", error)
        alert("Error deleting service")
      }
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  return (
    <MasterLayout>
      <Breadcrumb title="Service Master" />
      
      <div className="container-fluid py-4">
        <div className="card border-0 rounded-4 shadow-sm">
          <div className="card-header bg-primary text-white rounded-top-4 d-flex justify-content-between align-items-center">
            <h5 className="mb-0">🛠️ Service Management</h5>
            <button 
              className="btn btn-light btn-sm"
              onClick={() => {
                setEditingService(null)
                setFormData({ SERVICE: '', SERVICECODE: '' })
                setShowModal(true)
              }}
            >
              ➕ Add Service
            </button>
          </div>

          <div className="card-body p-4">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-3">Loading services...</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Service Name</th>
                      <th>Service Code</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((service) => (
                      <tr key={service.SERVICEId}>
                        <td>{service.SERVICEId}</td>
                        <td>{service.SERVICE}</td>
                        <td>{service.SERVICECODE || '-'}</td>
                        <td>
                          <button 
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => handleEdit(service)}
                          >
                            ✏️ Edit
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(service.SERVICEId)}
                          >
                            🗑️ Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Service Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.SERVICE}
                      onChange={(e) => setFormData({...formData, SERVICE: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Service Code</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.SERVICECODE}
                      onChange={(e) => setFormData({...formData, SERVICECODE: e.target.value})}
                    />
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
                  <button type="submit" className="btn btn-primary">
                    {editingService ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </MasterLayout>
  )
}

export default ServiceMaster