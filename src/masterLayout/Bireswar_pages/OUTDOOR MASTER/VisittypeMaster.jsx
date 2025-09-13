import { useState, useEffect } from "react"
import MasterLayout from "../../MasterLayout"
import Breadcrumb from "../../Breadcrumb"
import axiosInstance from '../../../axiosInstance';

const VisittypeMaster = () => {
  const [visittypes, setVisittypes] = useState([])
  const [visittypegrps, setVisittypegrps] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingVisittype, setEditingVisittype] = useState(null)
  const [formData, setFormData] = useState({
    VisitType: '',
    RateYN: 'N',
    SrvChYN: 'N',
    RefferaId: '',
    REG: 'Y',
    grp: ''
  })

  const fetchVisittypes = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get('/visittypes')
      setVisittypes(response.data)
    } catch (error) {
      console.error("Error fetching visittypes:", error)
    }
    setLoading(false)
  }

  const fetchVisittypegrps = async () => {
    try {
      const response = await axiosInstance.get('/visittypegrps')
      setVisittypegrps(response.data)
    } catch (error) {
      console.error("Error fetching visit type groups:", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingVisittype) {
        await axiosInstance.put(`/visittypes/${editingVisittype.VisitTypeId}`, formData)
        alert("Visit Type updated successfully!")
      } else {
        await axiosInstance.post('/visittypes', formData)
        alert("Visit Type created successfully!")
      }
      setShowModal(false)
      setFormData({
        VisitType: '',
        RateYN: 'N',
        SrvChYN: 'N',
        RefferaId: '',
        REG: 'Y',
        grp: ''
      })
      setEditingVisittype(null)
      fetchVisittypes()
    } catch (error) {
      console.error("Error saving visittype:", error)
      alert("Error saving visit type")
    }
  }

  const handleEdit = (visittype) => {
    setEditingVisittype(visittype)
    setFormData({
      VisitType: visittype.VisitType || '',
      RateYN: visittype.RateYN || 'N',
      SrvChYN: visittype.SrvChYN || 'N',
      RefferaId: visittype.RefferaId || '',
      REG: visittype.REG || 'Y',
      grp: visittype.grp || ''
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this visit type?')) {
      try {
        await axiosInstance.delete(`/visittypes/${id}`)
        alert("Visit Type deleted successfully!")
        fetchVisittypes()
      } catch (error) {
        console.error("Error deleting visittype:", error)
        alert("Error deleting visit type")
      }
    }
  }

  useEffect(() => {
    fetchVisittypes()
    fetchVisittypegrps()
  }, [])

  return (
    <MasterLayout>
      <Breadcrumb title="Visit Type Master" />
      
      <div className="container-fluid py-4">
        <div className="card border-0 rounded-4 shadow-sm">
          <div className="card-header bg-primary text-white rounded-top-4 d-flex justify-content-between align-items-center">
            <h5 className="mb-0">🏥 Visit Type Management</h5>
            <button 
              className="btn btn-light btn-sm"
              onClick={() => {
                setEditingVisittype(null)
                setFormData({
                  VisitType: '',
                  RateYN: 'N',
                  SrvChYN: 'N',
                  RefferaId: '',
                  REG: 'Y',
                  grp: ''
                })
                setShowModal(true)
              }}
            >
              ➕ Add Visit Type
            </button>
          </div>

          <div className="card-body p-4">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-3">Loading visit types...</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Visit Type</th>
                      <th>Rate YN</th>
                      <th>Service YN</th>
                      <th>REG</th>
                      <th>Group</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visittypes.map((visittype) => (
                      <tr key={visittype.VisitTypeId}>
                        <td>{visittype.VisitTypeId}</td>
                        <td>{visittype.VisitType}</td>
                        <td>{visittype.RateYN}</td>
                        <td>{visittype.SrvChYN}</td>
                        <td>{visittype.REG}</td>
                        <td>{visittypegrps.find(g => g.visittypegrpId === visittype.grp)?.visittypegrp || '-'}</td>
                        <td>
                          <button 
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => handleEdit(visittype)}
                          >
                            ✏️ Edit
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(visittype.VisitTypeId)}
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
                  {editingVisittype ? 'Edit Visit Type' : 'Add New Visit Type'}
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
                    <label className="form-label">Visit Type *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.VisitType}
                      onChange={(e) => setFormData({...formData, VisitType: e.target.value})}
                      required
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Rate YN</label>
                      <select
                        className="form-control"
                        value={formData.RateYN}
                        onChange={(e) => setFormData({...formData, RateYN: e.target.value})}
                      >
                        <option value="Y">Y</option>
                        <option value="N">N</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Service YN</label>
                      <select
                        className="form-control"
                        value={formData.SrvChYN}
                        onChange={(e) => setFormData({...formData, SrvChYN: e.target.value})}
                      >
                        <option value="Y">Y</option>
                        <option value="N">N</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">REG</label>
                      <select
                        className="form-control"
                        value={formData.REG}
                        onChange={(e) => setFormData({...formData, REG: e.target.value})}
                      >
                        <option value="Y">Y</option>
                        <option value="N">N</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Visit Type Group</label>
                      <select
                        className="form-control"
                        value={formData.grp}
                        onChange={(e) => setFormData({...formData, grp: e.target.value})}
                      >
                        <option value="">Select Group</option>
                        {visittypegrps.map((grp) => (
                          <option key={grp.visittypegrpId} value={grp.visittypegrpId}>
                            {grp.visittypegrp}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Refferal ID</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.RefferaId}
                      onChange={(e) => setFormData({...formData, RefferaId: e.target.value})}
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
                    {editingVisittype ? 'Update' : 'Create'}
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

export default VisittypeMaster