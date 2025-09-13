import React, { useState, useEffect } from 'react';
import MasterLayout from '../../MasterLayout';
import Breadcrumb from '../../Breadcrumb';
import axiosInstance from '../../../axiosInstance';

const BloodTestHeaderMaster = () => {
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingHeader, setEditingHeader] = useState(null);
  const [formData, setFormData] = useState({
    TestCode: '',
    TestName: ''
  });

  useEffect(() => {
    fetchHeaders();
  }, []);

  const fetchHeaders = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/ivf/blood-test-headers');
      setHeaders(response.data.data || []);
    } catch (error) {
      console.error('Error fetching headers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (editingHeader) {
        await axiosInstance.put(`/ivf/blood-test-headers/${editingHeader.TestId}`, formData);
      } else {
        await axiosInstance.post('/ivf/blood-test-headers', formData);
      }
      
      fetchHeaders();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving header:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (header) => {
    setEditingHeader(header);
    setFormData({
      TestCode: header.TestCode || '',
      TestName: header.TestName || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blood test header?')) {
      setLoading(true);
      try {
        await axiosInstance.delete(`/ivf/blood-test-headers/${id}`);
        fetchHeaders();
      } catch (error) {
        console.error('Error deleting header:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingHeader(null);
    setFormData({
      TestCode: '',
      TestName: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <MasterLayout>
      <div className="container-fluid">
        <Breadcrumb title="Blood Test Header Master" />
        
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">Blood Test Headers</h5>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowModal(true)}
                  disabled={loading}
                >
                  Add New Header
                </button>
              </div>
              
              <div className="card-body">
                {loading ? (
                  <div className="text-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Test ID</th>
                          <th>Test Code</th>
                          <th>Test Name</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {headers.map((header) => (
                          <tr key={header.TestId}>
                            <td>{header.TestId}</td>
                            <td>{header.TestCode}</td>
                            <td>{header.TestName}</td>
                            <td>
                              <button
                                className="btn btn-sm btn-outline-primary me-2"
                                onClick={() => handleEdit(header)}
                                disabled={loading}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(header.TestId)}
                                disabled={loading}
                              >
                                Delete
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
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editingHeader ? 'Edit Blood Test Header' : 'Add New Blood Test Header'}
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={handleCloseModal}
                  ></button>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="TestCode" className="form-label">Test Code</label>
                      <input
                        type="text"
                        className="form-control"
                        id="TestCode"
                        name="TestCode"
                        value={formData.TestCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="TestName" className="form-label">Test Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="TestName"
                        name="TestName"
                        value={formData.TestName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="modal-footer">
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={handleCloseModal}
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : (editingHeader ? 'Update' : 'Save')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        
        {showModal && <div className="modal-backdrop fade show"></div>}
      </div>
    </MasterLayout>
  );
};

export default BloodTestHeaderMaster;