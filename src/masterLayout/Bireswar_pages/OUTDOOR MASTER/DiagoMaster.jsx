import { useState, useEffect } from "react"
import MasterLayout from "../../MasterLayout"
import Breadcrumb from "../../Breadcrumb"
import axiosInstance from '../../../axiosInstance';

const DiagoMaster = () => {
  const [diagos, setDiagos] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingDiago, setEditingDiago] = useState(null)
  const [formData, setFormData] = useState({ diago: '' })

  const fetchDiagos = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get('/diagos')
      if (response.data.success) {
        setDiagos(response.data.data)
      }
    } catch (error) {
      console.error("Error fetching diagos:", error)
    }
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingDiago) {
        await axiosInstance.put(`/diagos/${editingDiago.diagoId}`, formData)
        alert("Diago updated successfully!")
      } else {
        await axiosInstance.post('/diagos', formData)
        alert("Diago created successfully!")
      }
      setShowModal(false)
      setFormData({ diago: '' })
      setEditingDiago(null)
      fetchDiagos()
    } catch (error) {
      console.error("Error saving diago:", error)
      alert("Error saving diago")
    }
  }

  const handleEdit = (diago) => {
    setEditingDiago(diago)
    setFormData({ diago: diago.diago || '' })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this diago?')) {
      try {
        await axiosInstance.delete(`/diagos/${id}`)
        alert("Diago deleted successfully!")
        fetchDiagos()
      } catch (error) {
        console.error("Error deleting diago:", error)
        alert("Error deleting diago")
      }
    }
  }

  useEffect(() => {
    fetchDiagos()
  }, [])

  return (
    <MasterLayout>
      <Breadcrumb title="Diago Master" />
      
      <div className="container-fluid py-4">
        <div className="card border-0 rounded-4 shadow-sm">
          <div className="card-header bg-primary text-white rounded-top-4 d-flex justify-content-between align-items-center">
            <h5 className="mb-0">🩺 Diago Management</h5>
            <button 
              className="btn btn-light btn-sm"
              onClick={() => {
                setEditingDiago(null)
                setFormData({ diago: '' })
                setShowModal(true)
              }}
            >
              ➕ Add Diago
            </button>
          </div>

          <div className="card-body p-4">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-3">Loading diagos...</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Diago</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {diagos.map((diago) => (
                      <tr key={diago.diagoId}>
                        <td>{diago.diagoId}</td>
                        <td>{diago.diago}</td>
                        <td>
                          <button 
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => handleEdit(diago)}
                          >
                            ✏️ Edit
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(diago.diagoId)}
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
                  {editingDiago ? 'Edit Diago' : 'Add New Diago'}
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
                    <label className="form-label">Diago *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.diago}
                      onChange={(e) => setFormData({...formData, diago: e.target.value})}
                      required
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
                    {editingDiago ? 'Update' : 'Create'}
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

export default DiagoMaster