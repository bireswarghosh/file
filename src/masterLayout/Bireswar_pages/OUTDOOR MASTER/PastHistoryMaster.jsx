import { useState, useEffect } from "react"
import MasterLayout from "../../MasterLayout"
import Breadcrumb from "../../Breadcrumb"
import axiosInstance from '../../../axiosInstance';

const PastHistoryMaster = () => {
  const [histories, setHistories] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingHistory, setEditingHistory] = useState(null)
  const [formData, setFormData] = useState({ pasthistory: '' })

  const fetchHistories = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get('/past-histories')
      if (response.data.success) {
        setHistories(response.data.data)
      }
    } catch (error) {
      console.error("Error fetching histories:", error)
    }
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingHistory) {
        await axiosInstance.put(`/past-histories/${editingHistory.pasthistoryId}`, formData)
        alert("Past history updated successfully!")
      } else {
        await axiosInstance.post('/past-histories', formData)
        alert("Past history created successfully!")
      }
      setShowModal(false)
      setFormData({ pasthistory: '' })
      setEditingHistory(null)
      fetchHistories()
    } catch (error) {
      console.error("Error saving history:", error)
      alert("Error saving history")
    }
  }

  const handleEdit = (history) => {
    setEditingHistory(history)
    setFormData({ pasthistory: history.pasthistory || '' })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this past history?')) {
      try {
        await axiosInstance.delete(`/past-histories/${id}`)
        alert("Past history deleted successfully!")
        fetchHistories()
      } catch (error) {
        console.error("Error deleting history:", error)
        alert("Error deleting history")
      }
    }
  }

  useEffect(() => {
    fetchHistories()
  }, [])

  return (
    <MasterLayout>
      <Breadcrumb title="Past History Master" />
      
      <div className="container-fluid py-4">
        <div className="card border-0 rounded-4 shadow-sm">
          <div className="card-header bg-primary text-white rounded-top-4 d-flex justify-content-between align-items-center">
            <h5 className="mb-0">📋 Past History Management</h5>
            <button 
              className="btn btn-light btn-sm"
              onClick={() => {
                setEditingHistory(null)
                setFormData({ pasthistory: '' })
                setShowModal(true)
              }}
            >
              ➕ Add History
            </button>
          </div>

          <div className="card-body p-4">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-3">Loading histories...</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Past History</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {histories.map((history) => (
                      <tr key={history.pasthistoryId}>
                        <td>{history.pasthistoryId}</td>
                        <td>{history.pasthistory}</td>
                        <td>
                          <button 
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => handleEdit(history)}
                          >
                            ✏️ Edit
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(history.pasthistoryId)}
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
                  {editingHistory ? 'Edit Past History' : 'Add New Past History'}
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
                    <label className="form-label">Past History *</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={formData.pasthistory}
                      onChange={(e) => setFormData({...formData, pasthistory: e.target.value})}
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
                    {editingHistory ? 'Update' : 'Create'}
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

export default PastHistoryMaster