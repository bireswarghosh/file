import { useState, useEffect } from "react"
import MasterLayout from "../../MasterLayout"
import Breadcrumb from "../../Breadcrumb"
import axiosInstance from '../../../axiosInstance';

const VisitourMaster = () => {
  const [visitours, setVisitours] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingVisitour, setEditingVisitour] = useState(null)
  const [formData, setFormData] = useState({ VisitOur: '' })

  const fetchVisitours = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get('/visitours')
      setVisitours(response.data)
    } catch (error) {
      console.error("Error fetching visitours:", error)
    }
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingVisitour) {
        await axiosInstance.put(`/visitours/${editingVisitour.VisitOurId}`, formData)
        alert("Visitour updated successfully!")
      } else {
        await axiosInstance.post('/visitours', formData)
        alert("Visitour created successfully!")
      }
      setShowModal(false)
      setFormData({ VisitOur: '' })
      setEditingVisitour(null)
      fetchVisitours()
    } catch (error) {
      console.error("Error saving visitour:", error)
      alert("Error saving visitour")
    }
  }

  const handleEdit = (visitour) => {
    setEditingVisitour(visitour)
    setFormData({ VisitOur: visitour.VisitOur || '' })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this visitour?')) {
      try {
        await axiosInstance.delete(`/visitours/${id}`)
        alert("Visitour deleted successfully!")
        fetchVisitours()
      } catch (error) {
        console.error("Error deleting visitour:", error)
        alert("Error deleting visitour")
      }
    }
  }

  useEffect(() => {
    fetchVisitours()
  }, [])

  return (
    <MasterLayout>
      <Breadcrumb title="Visitour Master" />
      
      <div className="container-fluid py-4">
        <div className="card border-0 rounded-4 shadow-sm">
          <div className="card-header bg-primary text-white rounded-top-4 d-flex justify-content-between align-items-center">
            <h5 className="mb-0">🕐 Visitour Management</h5>
            <button 
              className="btn btn-light btn-sm"
              onClick={() => {
                setEditingVisitour(null)
                setFormData({ VisitOur: '' })
                setShowModal(true)
              }}
            >
              ➕ Add Visitour
            </button>
          </div>

          <div className="card-body p-4">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-3">Loading visitours...</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Visit Our</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visitours.map((visitour) => (
                      <tr key={visitour.VisitOurId}>
                        <td>{visitour.VisitOurId}</td>
                        <td>{visitour.VisitOur}</td>
                        <td>
                          <button 
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => handleEdit(visitour)}
                          >
                            ✏️ Edit
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(visitour.VisitOurId)}
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
                  {editingVisitour ? 'Edit Visitour' : 'Add New Visitour'}
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
                    <label className="form-label">Visit Our *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.VisitOur}
                      onChange={(e) => setFormData({...formData, VisitOur: e.target.value})}
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
                    {editingVisitour ? 'Update' : 'Create'}
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

export default VisitourMaster