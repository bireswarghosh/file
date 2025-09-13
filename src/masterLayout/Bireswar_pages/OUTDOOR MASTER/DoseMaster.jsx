import { useState, useEffect } from "react"
import MasterLayout from "../../MasterLayout"
import Breadcrumb from "../../Breadcrumb"
import axiosInstance from '../../../axiosInstance';

const DoseMaster = () => {
  const [doses, setDoses] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingDose, setEditingDose] = useState(null)
  const [formData, setFormData] = useState({ Dose: '' })

  const fetchDoses = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get('/doses')
      setDoses(response.data)
    } catch (error) {
      console.error("Error fetching doses:", error)
    }
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingDose) {
        await axiosInstance.put(`/doses/${editingDose.DoseId}`, formData)
        alert("Dose updated successfully!")
      } else {
        await axiosInstance.post('/doses', formData)
        alert("Dose created successfully!")
      }
      setShowModal(false)
      setFormData({ Dose: '' })
      setEditingDose(null)
      fetchDoses()
    } catch (error) {
      console.error("Error saving dose:", error)
      alert("Error saving dose")
    }
  }

  const handleEdit = (dose) => {
    setEditingDose(dose)
    setFormData({ Dose: dose.Dose || '' })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this dose?')) {
      try {
        await axiosInstance.delete(`/doses/${id}`)
        alert("Dose deleted successfully!")
        fetchDoses()
      } catch (error) {
        console.error("Error deleting dose:", error)
        alert("Error deleting dose")
      }
    }
  }

  useEffect(() => {
    fetchDoses()
  }, [])

  return (
    <MasterLayout>
      <Breadcrumb title="Dose Master" />
      
      <div className="container-fluid py-4">
        <div className="card border-0 rounded-4 shadow-sm">
          <div className="card-header bg-primary text-white rounded-top-4 d-flex justify-content-between align-items-center">
            <h5 className="mb-0">💊 Dose Management</h5>
            <button 
              className="btn btn-light btn-sm"
              onClick={() => {
                setEditingDose(null)
                setFormData({ Dose: '' })
                setShowModal(true)
              }}
            >
              ➕ Add Dose
            </button>
          </div>

          <div className="card-body p-4">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-3">Loading doses...</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Dose</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doses.map((dose) => (
                      <tr key={dose.DoseId}>
                        <td>{dose.DoseId}</td>
                        <td>{dose.Dose}</td>
                        <td>
                          <button 
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => handleEdit(dose)}
                          >
                            ✏️ Edit
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(dose.DoseId)}
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
                  {editingDose ? 'Edit Dose' : 'Add New Dose'}
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
                    <label className="form-label">Dose *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.Dose}
                      onChange={(e) => setFormData({...formData, Dose: e.target.value})}
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
                    {editingDose ? 'Update' : 'Create'}
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

export default DoseMaster