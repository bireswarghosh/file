import { useState, useEffect } from "react";
import MasterLayout from '../../MasterLayout';
import Breadcrumb from '../../Breadcrumb';
import axiosInstance from "../../../axiosInstance";

const AcSubGroupManagement = () => {
  const [acSubGroups, setAcSubGroups] = useState([]);
  const [acGroupsDropdown, setAcGroupsDropdown] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [formData, setFormData] = useState({
    SubGrp: '',
    AcGroupId: '',
    system: '',
    LgrLike: ''
  });

  useEffect(() => {
    fetchData();
    fetchAcGroupsDropdown();
  }, [currentPage, searchQuery]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: 10,
        ...(searchQuery && { search: searchQuery })
      };
      
      const response = await axiosInstance.get('/ac-subgroups', { params });
      
      if (response.data.success) {
        setAcSubGroups(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        setTotalItems(response.data.pagination.totalItems);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const fetchAcGroupsDropdown = async () => {
    try {
      const response = await axiosInstance.get('/ac-groups-dropdown');
      if (response.data.success) {
        setAcGroupsDropdown(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching AC Groups dropdown:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingItem ? `/ac-subgroups/${editingItem.AcSubGrpId}` : '/ac-subgroups';
      const method = editingItem ? 'put' : 'post';
      
      const response = await axiosInstance[method](url, formData);
      
      if (response.data.success) {
        await fetchData();
        setShowModal(false);
        resetForm();
        alert(editingItem ? 'AC Sub Group updated successfully!' : 'AC Sub Group created successfully!');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save data');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      SubGrp: item.SubGrp || '',
      AcGroupId: item.AcGroupId || '',
      system: item.system || '',
      LgrLike: item.LgrLike || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this AC Sub Group?')) {
      try {
        const response = await axiosInstance.delete(`/ac-subgroups/${id}`);
        if (response.data.success) {
          await fetchData();
          alert('AC Sub Group deleted successfully!');
        }
      } catch (error) {
        console.error('Error deleting data:', error);
        alert('Failed to delete data');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      SubGrp: '',
      AcGroupId: '',
      system: '',
      LgrLike: ''
    });
    setEditingItem(null);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <MasterLayout>
      <Breadcrumb title="AC Sub Group Management" />
      <div className="container-fluid py-4">
        
        {/* Header */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm" style={{borderRadius: '15px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
              <div className="card-body text-white py-4">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h2 className="fw-bold mb-2">
                      <i className="fas fa-sitemap me-3"></i>
                      AC Sub Group Management
                    </h2>
                    <p className="mb-0 opacity-90">Manage Account Sub Groups</p>
                  </div>
                  <div className="col-md-4 text-end">
                    <div className="bg-white bg-opacity-20 rounded-3 p-3">
                      <h4 className="fw-bold mb-1">{totalItems}</h4>
                      <small>Total AC Sub Groups</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Add Button */}
        <div className="row mb-4">
          <div className="col-md-8">
            <div className="card border-0 shadow-sm" style={{borderRadius: '12px'}}>
              <div className="card-body">
                <div className="input-group">
                  <span className="input-group-text bg-light border-0">
                    <i className="fas fa-search text-muted"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-0 bg-light"
                    placeholder="Search AC Sub Groups..."
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <button
              className="btn btn-primary w-100 py-3"
              style={{borderRadius: '12px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none'}}
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
            >
              <i className="fas fa-plus me-2"></i>
              Add New AC Sub Group
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="card border-0 shadow-sm" style={{borderRadius: '15px'}}>
          <div className="card-header bg-white border-0 py-3" style={{borderRadius: '15px 15px 0 0'}}>
            <h5 className="mb-0 fw-bold text-dark">
              <i className="fas fa-layer-group me-2 text-primary"></i>
              AC Sub Groups List
            </h5>
          </div>
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted">Loading data...</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="border-0 py-3 px-4">Serial No</th>
                      <th className="border-0 py-3">Sub Group</th>
                      <th className="border-0 py-3">AC Group</th>
                      <th className="border-0 py-3">System</th>
                      <th className="border-0 py-3">Ledger Like</th>
                      <th className="border-0 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {acSubGroups.length > 0 ? acSubGroups.map((item, index) => (
                      <tr key={item.AcSubGrpId} className="border-bottom">
                        <td className="py-3 px-4">
                          <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2">
                            {(currentPage - 1) * 10 + index + 1}
                          </span>
                        </td>
                        <td className="py-3">
                          <div className="d-flex align-items-center">
                            <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                              <i className="fas fa-layer-group text-primary"></i>
                            </div>
                            <div>
                              <h6 className="mb-0 fw-bold">{item.SubGrp}</h6>
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <span className="badge bg-info bg-opacity-10 text-info px-3 py-2">
                            {item.acGroup?.ACGroup || 'N/A'}
                          </span>
                        </td>
                        <td className="py-3">
                          <span className={`badge ${item.system === 'Y' ? 'bg-success' : 'bg-secondary'} bg-opacity-10 text-${item.system === 'Y' ? 'success' : 'secondary'}`}>
                            {item.system === 'Y' ? 'System' : 'Manual'}
                          </span>
                        </td>
                        <td className="py-3">
                          <span className={`badge ${item.LgrLike === 'Y' ? 'bg-success' : 'bg-warning'} bg-opacity-10 text-${item.LgrLike === 'Y' ? 'success' : 'warning'}`}>
                            {item.LgrLike === 'Y' ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td className="py-3 text-center">
                          <div className="btn-group" role="group">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => handleEdit(item)}
                              title="Edit"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(item.AcSubGrpId)}
                              title="Delete"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="6" className="text-center py-5">
                          <div className="text-muted">
                            <i className="fas fa-inbox fa-3x mb-3 opacity-50"></i>
                            <p className="mb-0">No AC Sub Groups found</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="card-footer bg-white border-0">
              <nav>
                <ul className="pagination justify-content-center mb-0">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>
                  {[...Array(totalPages)].map((_, index) => (
                    <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <div className="modal-dialog">
              <div className="modal-content border-0" style={{borderRadius: '15px'}}>
                <div className="modal-header border-0 pb-0">
                  <h5 className="modal-title fw-bold">
                    <i className="fas fa-layer-group me-2 text-primary"></i>
                    {editingItem ? 'Edit' : 'Add New'} AC Sub Group
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
                      <label className="form-label fw-semibold">Sub Group Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.SubGrp}
                        onChange={(e) => setFormData({...formData, SubGrp: e.target.value})}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">AC Group *</label>
                      <select
                        className="form-select"
                        value={formData.AcGroupId}
                        onChange={(e) => setFormData({...formData, AcGroupId: e.target.value})}
                        required
                      >
                        <option value="">Select AC Group</option>
                        {acGroupsDropdown.map((group) => (
                          <option key={group.ACGroupId} value={group.ACGroupId}>
                            {group.ACGroup}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">System</label>
                      <select
                        className="form-select"
                        value={formData.system}
                        onChange={(e) => setFormData({...formData, system: e.target.value})}
                      >
                        <option value="">Select System</option>
                        <option value="Y">System</option>
                        <option value="N">Manual</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Ledger Like</label>
                      <select
                        className="form-select"
                        value={formData.LgrLike}
                        onChange={(e) => setFormData({...formData, LgrLike: e.target.value})}
                      >
                        <option value="">Select Option</option>
                        <option value="Y">Yes</option>
                        <option value="N">No</option>
                      </select>
                    </div>
                  </div>
                  <div className="modal-footer border-0">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none'}}
                    >
                      <i className="fas fa-save me-2"></i>
                      {editingItem ? 'Update' : 'Add'} AC Sub Group
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </MasterLayout>
  );
};

export default AcSubGroupManagement;