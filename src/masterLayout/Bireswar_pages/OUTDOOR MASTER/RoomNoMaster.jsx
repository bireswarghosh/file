import { useState, useEffect } from "react"
import MasterLayout from "../../MasterLayout"
import Breadcrumb from "../../Breadcrumb"
import axiosInstance from '../../../axiosInstance';

const RoomNoMaster = () => {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingRoom, setEditingRoom] = useState(null)
  const [formData, setFormData] = useState({ RoomNo: '' })

  const fetchRooms = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get('/room-nos')
      if (response.data.success) {
        setRooms(response.data.data)
      }
    } catch (error) {
      console.error("Error fetching rooms:", error)
    }
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingRoom) {
        await axiosInstance.put(`/room-nos/${editingRoom.RoomNoId}`, formData)
        alert("Room updated successfully!")
      } else {
        await axiosInstance.post('/room-nos', formData)
        alert("Room created successfully!")
      }
      setShowModal(false)
      setFormData({ RoomNo: '' })
      setEditingRoom(null)
      fetchRooms()
    } catch (error) {
      console.error("Error saving room:", error)
      alert("Error saving room")
    }
  }

  const handleEdit = (room) => {
    setEditingRoom(room)
    setFormData({ RoomNo: room.RoomNo || '' })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await axiosInstance.delete(`/room-nos/${id}`)
        alert("Room deleted successfully!")
        fetchRooms()
      } catch (error) {
        console.error("Error deleting room:", error)
        alert("Error deleting room")
      }
    }
  }

  useEffect(() => {
    fetchRooms()
  }, [])

  return (
    <MasterLayout>
      <Breadcrumb title="Room Number Master" />
      
      <div className="container-fluid py-4">
        <div className="card border-0 rounded-4 shadow-sm">
          <div className="card-header bg-primary text-white rounded-top-4 d-flex justify-content-between align-items-center">
            <h5 className="mb-0">🏠 Room Number Management</h5>
            <button 
              className="btn btn-light btn-sm"
              onClick={() => {
                setEditingRoom(null)
                setFormData({ RoomNo: '' })
                setShowModal(true)
              }}
            >
              ➕ Add Room
            </button>
          </div>

          <div className="card-body p-4">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-3">Loading rooms...</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Room Number</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rooms.map((room) => (
                      <tr key={room.RoomNoId}>
                        <td>{room.RoomNoId}</td>
                        <td>{room.RoomNo}</td>
                        <td>
                          <button 
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => handleEdit(room)}
                          >
                            ✏️ Edit
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(room.RoomNoId)}
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
                  {editingRoom ? 'Edit Room' : 'Add New Room'}
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
                    <label className="form-label">Room Number *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.RoomNo}
                      onChange={(e) => setFormData({...formData, RoomNo: e.target.value})}
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
                    {editingRoom ? 'Update' : 'Create'}
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

export default RoomNoMaster