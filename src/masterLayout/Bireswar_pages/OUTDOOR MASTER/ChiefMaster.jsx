import { useState, useEffect } from "react"
import MasterLayout from "../../MasterLayout"
import Breadcrumb from "../../Breadcrumb"
import axiosInstance from '../../../axiosInstance';

const ChiefMaster = () => {
  const [chiefs, setChiefs] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingChief, setEditingChief] = useState(null)
  const [formData, setFormData] = useState({ chief: '' })

  const fetchChiefs = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get('/chiefs')
      if (response.data.success) {
        setChiefs(response.data.data)
      }
    } catch (error) {
      console.error("Error fetching chiefs:", error)
    }
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingChief) {
        await axiosInstance.put(`/chiefs/${editingChief.chiefId}`, formData)
        alert("Chief updated successfully!")
      } else {
        await axiosInstance.post('/chiefs', formData)
        alert("Chief created successfully!")
      }
      setShowModal(false)
      setFormData({ chief: '' })
      setEditingChief(null)
      fetchChiefs()
    } catch (error) {
      console.error("Error saving chief:", error)
      alert("Error saving chief")
    }
  }

  const handleEdit = (chief) => {
    setEditingChief(chief)
    setFormData({ chief: chief.chief || '' })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this chief?')) {
      try {
        await axiosInstance.delete(`/chiefs/${id}`)
        alert("Chief deleted successfully!")
        fetchChiefs()
      } catch (error) {
        console.error("Error deleting chief:", error)
        alert("Error deleting chief")
      }
    }
  }

  useEffect(() => {
    fetchChiefs()
  }, [])

  return (
    <MasterLayout>
      <Breadcrumb title="Chief Master" />
      
      <div className="container-fluid py-4">
        <div className="card border-0 rounded-4 shadow-sm">
          <div className="card-header bg-primary text-white rounded-top-4 d-flex justify-content-between align-items-center">
            <h5 className="mb-0">👨‍⚕️ Chief Management</h5>
            <button 
              className="btn btn-light btn-sm"
              onClick={() => {
                setEditingChief(null)
                setFormData({ chief: '' })
                setShowModal(true)
              }}
            >
              ➕ Add Chief
            </button>
          </div>

          <div className="card-body p-4">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-3">Loading chiefs...</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Chief</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chiefs.map((chief) => (
                      <tr key={chief.chiefId}>
                        <td>{chief.chiefId}</td>
                        <td>{chief.chief}</td>
                        <td>
                          <button 
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => handleEdit(chief)}
                          >
                            ✏️ Edit
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(chief.chiefId)}
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
                  {editingChief ? 'Edit Chief' : 'Add New Chief'}
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
                    <label className="form-label">Chief *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.chief}
                      onChange={(e) => setFormData({...formData, chief: e.target.value})}
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
                    {editingChief ? 'Update' : 'Create'}
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

export default ChiefMaster