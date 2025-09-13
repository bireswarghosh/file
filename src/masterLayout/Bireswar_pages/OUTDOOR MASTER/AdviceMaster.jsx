import { useState, useEffect } from "react"
import MasterLayout from "../../MasterLayout"
import Breadcrumb from "../../Breadcrumb"
import axiosInstance from '../../../axiosInstance';

const AdviceMaster = () => {
  const [advices, setAdvices] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingAdvice, setEditingAdvice] = useState(null)
  const [formData, setFormData] = useState({ Advice: '' })

  const fetchAdvices = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get('/advices')
      setAdvices(response.data)
    } catch (error) {
      console.error("Error fetching advices:", error)
    }
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingAdvice) {
        await axiosInstance.put(`/advices/${editingAdvice.AdviceId}`, formData)
        alert("Advice updated successfully!")
      } else {
        await axiosInstance.post('/advices', formData)
        alert("Advice created successfully!")
      }
      setShowModal(false)
      setFormData({ Advice: '' })
      setEditingAdvice(null)
      fetchAdvices()
    } catch (error) {
      console.error("Error saving advice:", error)
      alert("Error saving advice")
    }
  }

  const handleEdit = (advice) => {
    setEditingAdvice(advice)
    setFormData({ Advice: advice.Advice || '' })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this advice?')) {
      try {
        await axiosInstance.delete(`/advices/${id}`)
        alert("Advice deleted successfully!")
        fetchAdvices()
      } catch (error) {
        console.error("Error deleting advice:", error)
        alert("Error deleting advice")
      }
    }
  }

  useEffect(() => {
    fetchAdvices()
  }, [])

  return (
    <MasterLayout>
      <Breadcrumb title="Advice Master" />
      
      <div className="container-fluid py-4">
        <div className="card border-0 rounded-4 shadow-sm">
          <div className="card-header bg-primary text-white rounded-top-4 d-flex justify-content-between align-items-center">
            <h5 className="mb-0">💡 Advice Management</h5>
            <button 
              className="btn btn-light btn-sm"
              onClick={() => {
                setEditingAdvice(null)
                setFormData({ Advice: '' })
                setShowModal(true)
              }}
            >
              ➕ Add Advice
            </button>
          </div>

          <div className="card-body p-4">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-3">Loading advices...</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Advice</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {advices.map((advice) => (
                      <tr key={advice.AdviceId}>
                        <td>{advice.AdviceId}</td>
                        <td>{advice.Advice}</td>
                        <td>
                          <button 
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => handleEdit(advice)}
                          >
                            ✏️ Edit
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(advice.AdviceId)}
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
                  {editingAdvice ? 'Edit Advice' : 'Add New Advice'}
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
                    <label className="form-label">Advice *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.Advice}
                      onChange={(e) => setFormData({...formData, Advice: e.target.value})}
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
                    {editingAdvice ? 'Update' : 'Create'}
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

export default AdviceMaster