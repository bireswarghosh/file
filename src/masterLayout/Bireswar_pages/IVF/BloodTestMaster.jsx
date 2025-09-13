import React, { useState, useEffect } from 'react';
import MasterLayout from '../../MasterLayout';
import Breadcrumb from '../../Breadcrumb';
import axiosInstance from '../../../axiosInstance';

const BloodTestMaster = () => {
  const [tests, setTests] = useState([]);
  const [ivfData, setIvfData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingTest, setEditingTest] = useState(null);
  const [formData, setFormData] = useState({
    IVFId: '',
    Result: ''
  });

  useEffect(() => {
    fetchTests();
    fetchIVFData();
  }, []);

  const fetchTests = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/ivf/blood-test-all');
      setTests(response.data.data || []);
    } catch (error) {
      console.error('Error fetching tests:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchIVFData = async () => {
    try {
      const response = await axiosInstance.get('/ivf/ivf-biodata');
      setIvfData(response.data.data || []);
    } catch (error) {
      console.error('Error fetching IVF data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (editingTest) {
        await axiosInstance.put(`/ivf/blood-test/${editingTest.TestId}`, formData);
      } else {
        await axiosInstance.post('/ivf/blood-test', formData);
      }
      
      fetchTests();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving test:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (test) => {
    setEditingTest(test);
    setFormData({
      IVFId: test.IVFId || '',
      Result: test.Result || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blood test?')) {
      setLoading(true);
      try {
        await axiosInstance.delete(`/ivf/blood-test/${id}`);
        fetchTests();
      } catch (error) {
        console.error('Error deleting test:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTest(null);
    setFormData({
      IVFId: '',
      Result: ''
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
        <Breadcrumb title="Blood Test Master" />
        
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">Blood Tests</h5>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowModal(true)}
                  disabled={loading}
                >
                  Add New Test
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
                          <th>IVF ID</th>
                          <th>Test Date</th>
                          <th>Result</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tests.map((test) => (
                          <tr key={test.TestId}>
                            <td>{test.TestId}</td>
                            <td>{test.IVFId}</td>
                            <td>{new Date(test.TestDate).toLocaleDateString()}</td>
                            <td>{test.Result}</td>
                            <td>
                              <button
                                className="btn btn-sm btn-outline-primary me-2"
                                onClick={() => handleEdit(test)}
                                disabled={loading}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(test.TestId)}
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
                    {editingTest ? 'Edit Blood Test' : 'Add New Blood Test'}
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
                      <label htmlFor="IVFId" className="form-label">IVF ID</label>
                      <select
                        className="form-select"
                        id="IVFId"
                        name="IVFId"
                        value={formData.IVFId}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select IVF ID</option>
                        {ivfData.map((ivf) => (
                          <option key={ivf.IVFId} value={ivf.IVFId}>
                            {ivf.IVFId} - {ivf.Name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="Result" className="form-label">Result</label>
                      <textarea
                        className="form-control"
                        id="Result"
                        name="Result"
                        value={formData.Result}
                        onChange={handleInputChange}
                        rows="4"
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
                      {loading ? 'Saving...' : (editingTest ? 'Update' : 'Save')}
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

export default BloodTestMaster;