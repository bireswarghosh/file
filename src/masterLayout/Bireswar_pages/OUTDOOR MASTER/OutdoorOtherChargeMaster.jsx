import { useState, useEffect } from "react"
import MasterLayout from "../../MasterLayout"
import Breadcrumb from "../../Breadcrumb"
import axiosInstance from '../../../axiosInstance';

const OutdoorOtherChargeMaster = () => {
  const [charges, setCharges] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingCharge, setEditingCharge] = useState(null)
  const [formData, setFormData] = useState({
    OtherCharge: '',
    Rate: '',
    UNIT: '1',
    OT: 'N',
    OTSLOTID: ''
  })

  const fetchCharges = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get('/outdoor-other-charges')
      if (response.data.success) {
        setCharges(response.data.data)
      }
    } catch (error) {
      console.error("Error fetching charges:", error)
    }
    setLoading(false)
  }

  const fetchServices = async () => {
    try {
      const response = await axiosInstance.get('/services')
      if (response.data.success) {
        setServices(response.data.data)
      }
    } catch (error) {
      console.error("Error fetching services:", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingCharge) {
        await axiosInstance.put(`/outdoor-other-charges/${editingCharge.OtherChId}`, formData)
        alert("Charge updated successfully!")
      } else {
        await axiosInstance.post('/outdoor-other-charges', formData)
        alert("Charge created successfully!")
      }
      setShowModal(false)
      setFormData({ OtherCharge: '', Rate: '', UNIT: '1', OT: 'N', OTSLOTID: '' })
      setEditingCharge(null)
      fetchCharges()
    } catch (error) {
      console.error("Error saving charge:", error)
      alert("Error saving charge")
    }
  }

  const handleEdit = (charge) => {
    setEditingCharge(charge)
    setFormData({
      OtherCharge: charge.OtherCharge || '',
      Rate: charge.Rate || '',
      UNIT: charge.UNIT || '1',
      OT: charge.OT || 'N',
      OTSLOTID: charge.OTSLOTID || ''
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this charge?')) {
      try {
        await axiosInstance.delete(`/outdoor-other-charges/${id}`)
        alert("Charge deleted successfully!")
        fetchCharges()
      } catch (error) {
        console.error("Error deleting charge:", error)
        alert("Error deleting charge")
      }
    }
  }

  const handleServiceSelect = (serviceId) => {
    const service = services.find(s => s.SERVICEId === parseInt(serviceId))
    if (service) {
      setFormData(prev => ({
        ...prev,
        OtherCharge: service.SERVICE,
        Rate: service.SERVICECODE || ''
      }))
    }
  }

  useEffect(() => {
    fetchCharges()
    fetchServices()
  }, [])

  return (
    <MasterLayout>
      <Breadcrumb title="Outdoor Other Charge Master" />
      
      <div className="container-fluid py-4">
        <div className="card border-0 rounded-4 shadow-sm">
          <div className="card-header bg-primary text-white rounded-top-4 d-flex justify-content-between align-items-center">
            <h5 className="mb-0">💰 Outdoor Other Charge Management</h5>
            <button 
              className="btn btn-light btn-sm"
              onClick={() => {
                setEditingCharge(null)
                setFormData({ OtherCharge: '', Rate: '', UNIT: '1', OT: 'N', OTSLOTID: '' })
                setShowModal(true)
              }}
            >
              ➕ Add Charge
            </button>
          </div>

          <div className="card-body p-4">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-3">Loading charges...</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Charge Name</th>
                      <th>Rate</th>
                      <th>Unit</th>
                      <th>OT</th>
                      <th>OT Slot ID</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {charges.map((charge) => (
                      <tr key={charge.OtherChId}>
                        <td>{charge.OtherChId}</td>
                        <td>{charge.OtherCharge}</td>
                        <td>₹{charge.Rate || 0}</td>
                        <td>{charge.UNIT || '-'}</td>
                        <td>{charge.OT}</td>
                        <td>{charge.OTSLOTID || '-'}</td>
                        <td>
                          <button 
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => handleEdit(charge)}
                          >
                            ✏️ Edit
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(charge.OtherChId)}
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
                  {editingCharge ? 'Edit Charge' : 'Add New Charge'}
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
                    <label className="form-label">Select from Services</label>
                    <select
                      className="form-select"
                      onChange={(e) => handleServiceSelect(e.target.value)}
                    >
                      <option value="">-- Select Service --</option>
                      {services.map(service => (
                        <option key={service.SERVICEId} value={service.SERVICEId}>
                          {service.SERVICE} - ₹{service.SERVICECODE}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Charge Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.OtherCharge}
                      onChange={(e) => setFormData({...formData, OtherCharge: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Rate</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.Rate}
                      onChange={(e) => setFormData({...formData, Rate: e.target.value})}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Unit</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.UNIT}
                      onChange={(e) => setFormData({...formData, UNIT: e.target.value})}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">OT</label>
                    <select
                      className="form-select"
                      value={formData.OT}
                      onChange={(e) => setFormData({...formData, OT: e.target.value})}
                    >
                      <option value="Y">Yes</option>
                      <option value="N">No</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">OT Slot ID</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.OTSLOTID}
                      onChange={(e) => setFormData({...formData, OTSLOTID: e.target.value})}
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
                    {editingCharge ? 'Update' : 'Create'}
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

export default OutdoorOtherChargeMaster