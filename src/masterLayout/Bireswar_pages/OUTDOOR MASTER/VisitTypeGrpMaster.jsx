import { useState, useEffect } from "react"
import MasterLayout from "../../MasterLayout"
import Breadcrumb from "../../Breadcrumb"
import axiosInstance from '../../../axiosInstance';

const VisittypegrpMaster = () => {
  const [visittypegrps, setVisittypegrps] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingVisittypegrp, setEditingVisittypegrp] = useState(null)
  const [formData, setFormData] = useState({ visittypegrp: '' })

  const fetchVisittypegrps = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get('/visittypegrps')
      setVisittypegrps(response.data)
    } catch (error) {
      console.error("Error fetching visittypegrps:", error)
    }
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingVisittypegrp) {
        await axiosInstance.put(`/visittypegrps/${editingVisittypegrp.visittypegrpId}`, formData)
        alert("Visit Type Group updated successfully!")
      } else {
        await axiosInstance.post('/visittypegrps', formData)
        alert("Visit Type Group created successfully!")
      }
      setShowModal(false)
      setFormData({ visittypegrp: '' })
      setEditingVisittypegrp(null)
      fetchVisittypegrps()
    } catch (error) {
      console.error("Error saving visittypegrp:", error)
      alert("Error saving visit type group")
    }
  }

  const handleEdit = (visittypegrp) => {
    setEditingVisittypegrp(visittypegrp)
    setFormData({ visittypegrp: visittypegrp.visittypegrp || '' })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this visit type group?')) {
      try {
        await axiosInstance.delete(`/visittypegrps/${id}`)
        alert("Visit Type Group deleted successfully!")
        fetchVisittypegrps()
      } catch (error) {
        console.error("Error deleting visittypegrp:", error)
        alert("Error deleting visit type group")
      }
    }
  }

  useEffect(() => {
    fetchVisittypegrps()
  }, [])

  return (
    <MasterLayout>
      <Breadcrumb title="Visit Type Group Master" />
      
      <div className="container-fluid py-4">
        <div className="card border-0 rounded-4 shadow-sm">
          <div className="card-header bg-primary text-white rounded-top-4 d-flex justify-content-between align-items-center">
            <h5 className="mb-0">👥 Visit Type Group Management</h5>
            <button 
              className="btn btn-light btn-sm"
              onClick={() => {
                setEditingVisittypegrp(null)
                setFormData({ visittypegrp: '' })
                setShowModal(true)
              }}
            >
              ➕ Add Group
            </button>
          </div>

          <div className="card-body p-4">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-3">Loading visit type groups...</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Visit Type Group</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visittypegrps.map((visittypegrp) => (
                      <tr key={visittypegrp.visittypegrpId}>
                        <td>{visittypegrp.visittypegrpId}</td>
                        <td>{visittypegrp.visittypegrp}</td>
                        <td>
                          <button 
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => handleEdit(visittypegrp)}
                          >
                            ✏️ Edit
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(visittypegrp.visittypegrpId)}
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
                  {editingVisittypegrp ? 'Edit Visit Type Group' : 'Add New Visit Type Group'}
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
                    <label className="form-label">Visit Type Group *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.visittypegrp}
                      onChange={(e) => setFormData({...formData, visittypegrp: e.target.value})}
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
                    {editingVisittypegrp ? 'Update' : 'Create'}
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

export default VisittypegrpMaster