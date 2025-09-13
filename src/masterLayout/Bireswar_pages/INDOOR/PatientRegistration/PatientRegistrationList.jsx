import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';

import axiosInstance from '../../../../axiosInstance';



const PatientRegistrationList = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('list');
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFrom, setDateFrom] = useState(new Date().toISOString().split('T')[0]);
  const [dateTo, setDateTo] = useState(new Date().toISOString().split('T')[0]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 });


  useEffect(() => {
    fetchAdmissions();
  }, [pagination.page, searchQuery]);

  const fetchAdmissions = async () => {
    try {
      setLoading(true);
      let response;
      
      if (searchQuery) {
        response = await axiosInstance.get(`/admission/search?q=${encodeURIComponent(searchQuery)}`);
      } else {
        response = await axiosInstance.get(`/admission?page=${pagination.page}&limit=${pagination.limit}`);
      }
      
      console.log('Full Response:', response);
      console.log('Response Status:', response.status);
      console.log('Response Data:', response.data);
      
      if (response.status === 200 && response.data) {
        if (response.data.success) {
          setAdmissions(response.data.data || []);
          if (response.data.pagination) {
            setPagination(prev => ({ ...prev, ...response.data.pagination }));
          }
        } else {
          console.log('API returned success=false:', response.data.message);
          setAdmissions([]);
        }
      } else {
        console.log('Non-200 response or no data');
        setAdmissions([]);
      }
    } catch (error) {
      console.error('Error fetching admissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleDateChange = (field, value) => {
    if (field === 'from') setDateFrom(value);
    else setDateTo(value);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleRowClick = (admission) => {
    navigate(`/patient-registration/${encodeURIComponent(admission.AdmitionId || admission.AdmitionNo)}`);
  };

  const handleDelete = async (admissionId) => {
    if (!window.confirm('Are you sure you want to delete this admission?')) return;
    
    try {
      const response = await axiosInstance.delete(`/admission/${admissionId}`);
      if (response.data.success) {
        alert('Admission deleted successfully!');
        fetchAdmissions();
      }
    } catch (error) {
      console.error('Error deleting admission:', error);
      alert('Error deleting admission');
    }
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Patient Registration" />
      <div className="container-fluid py-4 px-lg-4">
        <div className="card shadow-xl border-0 rounded-4 overflow-hidden">
          {/* Tabs */}
          {/* <div className="card-header p-0 border-bottom-0">
            <ul className="nav nav-tabs nav-tabs-modern">
              <li className="nav-item">
                <button className={`nav-link ${activeTab === 'list' ? 'active' : ''}`} onClick={() => setActiveTab('list')}>List</button>
              </li>
              <li className="nav-item">
                <button className="nav-link">Detail</button>
              </li>
            </ul>
          </div> */}

          {/* Filters */}
          <div className="card-body p-3 p-md-4 bg-light">
            <div className="row g-3 align-items-center mb-3">
              <div className="col-lg-7">
                <div className="d-flex flex-wrap gap-3 align-items-center">
                  <span className="fw-bold text-secondary">Search:</span>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="search" id="byName" checked={searchType === 'name'} onChange={() => setSearchType('name')} />
                    <label className="form-check-label" htmlFor="byName">By Name</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="search" id="byPhone" checked={searchType === 'phone'} onChange={() => setSearchType('phone')} />
                    <label className="form-check-label" htmlFor="byPhone">By Phone</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="search" id="byReg" checked={searchType === 'reg'} onChange={() => setSearchType('reg')} />
                    <label className="form-check-label" htmlFor="byReg">ByReg No.</label>
                  </div>
                  <input type="text" className="form-control" placeholder={`Search by ${searchType}...`} value={searchQuery} onChange={handleSearch} style={{maxWidth: '200px'}} />
                </div>
              </div>
              <div className="col-lg-5">
                <div className="input-group">
                  <span className="input-group-text">Date From</span>
                  <input type="date" className="form-control" value={dateFrom} onChange={(e) => handleDateChange('from', e.target.value)} />
                  <span className="input-group-text">To</span>
                  <input type="date" className="form-control" value={dateTo} onChange={(e) => handleDateChange('to', e.target.value)} />
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="table-responsive" style={{ maxHeight: '440px', border: '1px solid #dee2e6' }}>
              <table className="table table-hover table-bordered align-middle table-striped mb-0">
                <thead className="table-primary sticky-top">
                  <tr>
                      <th>Actions</th>
                    <th>Patient Name</th>
                    <th>Registration No</th>
                    <th>Date</th>
                    <th>Phone No</th>
                    <th>Address</th>
                  
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan="6" className="text-center">Loading...</td></tr>
                  ) : admissions.length === 0 ? (
                    <tr><td colSpan="6" className="text-center">No admissions found</td></tr>
                  ) : (
                    admissions.map((admission, i) => (
                      <tr key={admission.AdmitionId || i}>
                        <td>
                          <button className="btn btn-sm btn-primary me-1" onClick={() => navigate(`/PatientRegistrationDetail/${encodeURIComponent(admission.AdmitionId || admission.AdmitionNo)}?mode=view`)}>
                            View
                          </button>
                          <button className="btn btn-sm btn-warning me-1" onClick={() => navigate(`/PatientRegistrationDetail/${encodeURIComponent(admission.AdmitionId || admission.AdmitionNo)}?mode=edit`)}>
                            Edit
                          </button>
                          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(admission.AdmitionId || admission.AdmitionNo)}>
                            Delete
                          </button>
                        </td>
                        <td>{admission.PatientName || 'N/A'}</td>
                        <td>{admission.AdmitionNo || 'N/A'}</td>
                        <td>{admission.AdmitionDate ? new Date(admission.AdmitionDate).toLocaleDateString() : 'N/A'}</td>
                        <td>{admission.PhoneNo || 'N/A'}</td>
                        <td>{admission.Add1 || 'N/A'}</td>
                        
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>


          </div>

          {/* Footer Buttons */}
          <div className="card-footer p-3 bg-light border-top">
            <div className="d-flex flex-wrap justify-content-center justify-content-md-end gap-2">
              <button className="btn btn-outline-secondary rounded-pill px-3" onClick={() => navigate('/PatientRegistrationDetail')}>New</button>
              <button className="btn btn-outline-primary rounded-pill px-3" disabled>Edit</button>
              <button className="btn btn-outline-success rounded-pill px-3" disabled>Save</button>
              <button className="btn btn-outline-danger rounded-pill px-3" disabled>Delete</button>
              <button className="btn btn-outline-warning rounded-pill px-3" onClick={fetchAdmissions}>Refresh</button>
              <button className="btn btn-dark rounded-pill px-3">Print</button>
              <button className="btn btn-dark rounded-pill px-3" onClick={() => navigate('/')}>Exit</button>
            </div>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default PatientRegistrationList;
