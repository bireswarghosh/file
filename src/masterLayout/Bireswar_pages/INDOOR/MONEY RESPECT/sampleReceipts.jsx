import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';
import axiosInstance from '../../../../axiosInstance';

const SecondMoneyReceiptList = () => {
  const navigate = useNavigate();
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 });
  
  // Filter states
  const [dateFrom, setDateFrom] = useState('2025-02-22');
  const [dateTo, setDateTo] = useState('2025-02-22');
  const [allReceipt, setAllReceipt] = useState(true);
  const [refund, setRefund] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const barcodeData = "OP/2425/08287";

  useEffect(() => {
    fetchReceipts();
  }, [pagination.page, dateFrom, dateTo, allReceipt, refund, searchTerm]);

  const fetchReceipts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page,
        limit: pagination.limit,
        dateFrom,
        dateTo,
        allReceipt,
        refund,
        search: searchTerm
      });
      
      const response = await axiosInstance.get(`/moneyreceipt/search?${params}`);
      
      if (response.data.success) {
        setReceipts(response.data.data || []);
        if (response.data.pagination) {
          setPagination(prev => ({ ...prev, ...response.data.pagination }));
        }
      }
    } catch (error) {
      console.error('Error fetching receipts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (receiptId) => {
    if (!window.confirm('Are you sure you want to delete this receipt?')) return;
    
    try {
      await axiosInstance.delete(`/moneyreceipt/${encodeURIComponent(receiptId)}`);
      fetchReceipts(); // Refresh the list
      alert('Receipt deleted successfully');
    } catch (error) {
      console.error('Error deleting receipt:', error);
      alert('Error deleting receipt');
    }
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Second Money Receipt - List View" />
      <div className="container-fluid py-3 px-lg-3">
        <div className="card shadow-sm border" style={{ backgroundColor: '#F0F0F0', fontSize: '0.9rem' }}>
          
          {/* Tabs */}
          <div className="card-header p-0 border-bottom-0" style={{ backgroundColor: '#E0E0E0' }}>
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a className="nav-link active fw-bold" aria-current="page" href="#" style={{ backgroundColor: '#F0F0F0', color: 'black', borderTopLeftRadius: '0.25rem', borderTopRightRadius: '0.25rem', border: '1px solid #BDBDBD', borderBottomColor: '#F0F0F0' }}>List</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" style={{ color: '#424242', border: '1px solid transparent' }}>Detail</a>
              </li>
            </ul>
          </div>

          <div className="card-body p-3" style={{ backgroundColor: '#F0F0F0' }}>
            
            {/* Filter Bar and Barcode Section */}
            <div className="row gx-3 mb-3 align-items-center">
              {/* Filters */}
              <div className="col-lg-8 col-md-7">
                <div className="d-flex flex-wrap align-items-center gap-2 p-2 border rounded" style={{backgroundColor: '#E0E0E0'}}>
                  <label htmlFor="dateFrom" className="form-label mb-0 fw-bold small">Date From:</label>
                  <input type="date" className="form-control form-control-sm" style={{width: '150px'}} id="dateFrom" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
                  
                  <label htmlFor="dateTo" className="form-label mb-0 fw-bold small ms-md-2">Date To:</label>
                  <input type="date" className="form-control form-control-sm" style={{width: '150px'}} id="dateTo" value={dateTo} onChange={e => setDateTo(e.target.value)} />
                  
                  <div className="form-check ms-md-3">
                    <input className="form-check-input" type="checkbox" id="allReceiptCheck" checked={allReceipt} onChange={e => setAllReceipt(e.target.checked)} />
                    <label className="form-check-label fw-bold small" htmlFor="allReceiptCheck">
                      All Receipt
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="refundCheck" checked={refund} onChange={e => setRefund(e.target.checked)} />
                    <label className="form-check-label fw-bold small" htmlFor="refundCheck">
                      Refund
                    </label>
                  </div>
                </div>
              </div>

              {/* Barcode Area */}
              <div className="col-lg-4 col-md-5">
                <div className="text-center p-2 border rounded" style={{backgroundColor: '#E0E0E0'}}>
                  <img 
                    src={`https://barcode.tec-it.com/barcode.ashx?data=${barcodeData}&code=Code128&dpi=96&imagetype=Png&height=50`} 
                    alt="Barcode" 
                    className="img-fluid mb-1" 
                    style={{maxHeight: '50px', minHeight: '50px'}}
                    onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'block'; }}
                  />
                  <div style={{display: 'none', padding: '15px 0', color: '#757575'}}>Barcode Unavailable</div>
                  <p className="fw-bold mb-0 small" style={{letterSpacing: '1px'}}>{barcodeData}</p>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="input-group">
                  <input 
                    type="text" 
                    className="form-control form-control-sm" 
                    placeholder="Search by receipt no, patient name, or reference..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                  <button className="btn btn-outline-secondary btn-sm" type="button" onClick={fetchReceipts}>
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Main Table */}
            <div className="table-responsive rounded border shadow-sm" style={{ maxHeight: '450px', overflowY: 'auto', backgroundColor: 'white' }}>
              <table className="table table-sm table-striped table-hover table-bordered mb-0">
                <thead className="table-light sticky-top">
                  <tr>
                    <th className="small fw-bold">Actions</th>
                    <th className="small fw-bold">Receipt No</th>
                    <th className="small fw-bold">Receipt Date</th>
                    <th className="small fw-bold">Patient Name</th>
                    <th className="small fw-bold text-end">Bill Amount</th>
                    <th className="small fw-bold text-end">Receipt</th>
                    <th className="small fw-bold">Ref No</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan="7" className="text-center text-muted small py-3">Loading...</td></tr>
                  ) : receipts.length === 0 ? (
                    <tr><td colSpan="7" className="text-center text-muted small py-3">No receipts found for the selected criteria.</td></tr>
                  ) : (
                    receipts.map((receipt, index) => (
                      <tr key={receipt.MoneyreeciptId || index}>
                        <td className="small">
                          <button 
                            className="btn btn-sm btn-primary me-1" 
                            style={{fontSize: '0.7rem', padding: '2px 6px'}}
                            onClick={() => navigate(`/initialFormData/${encodeURIComponent(receipt.MoneyreeciptId)}?mode=view`)}
                          >
                            View
                          </button>
                          <button 
                            className="btn btn-sm btn-warning me-1" 
                            style={{fontSize: '0.7rem', padding: '2px 6px'}}
                            onClick={() => navigate(`/initialFormData/${encodeURIComponent(receipt.MoneyreeciptId)}?mode=edit`)}
                          >
                            Edit
                          </button>
                          <button 
                            className="btn btn-sm btn-danger" 
                            style={{fontSize: '0.7rem', padding: '2px 6px'}}
                            onClick={() => handleDelete(receipt.MoneyreeciptId)}
                          >
                            Delete
                          </button>
                        </td>
                        <td className="small">{receipt.MoneyreeciptNo || 'N/A'}</td>
                        <td className="small">{receipt.ReceiptDate ? new Date(receipt.ReceiptDate).toLocaleDateString() : 'N/A'}</td>
                        <td className="small">{receipt.admission?.PatientName || 'N/A'}</td>
                        <td className="small text-end">{receipt.BillAmount ? parseFloat(receipt.BillAmount).toFixed(2) : '0.00'}</td>
                        <td className="small text-end">{receipt.Amount ? parseFloat(receipt.Amount).toFixed(2) : '0.00'}</td>
                        <td className="small">{receipt.RefferenceId || 'N/A'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="text-muted small">
                  Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} entries
                </div>
                <nav>
                  <ul className="pagination pagination-sm mb-0">
                    <li className={`page-item ${pagination.page === 1 ? 'disabled' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => setPagination(prev => ({ ...prev, page: pagination.page - 1 }))}
                        disabled={pagination.page === 1}
                      >
                        Previous
                      </button>
                    </li>
                    {[...Array(pagination.pages)].map((_, index) => (
                      <li key={index + 1} className={`page-item ${pagination.page === index + 1 ? 'active' : ''}`}>
                        <button 
                          className="page-link" 
                          onClick={() => setPagination(prev => ({ ...prev, page: index + 1 }))}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${pagination.page === pagination.pages ? 'disabled' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => setPagination(prev => ({ ...prev, page: pagination.page + 1 }))}
                        disabled={pagination.page === pagination.pages}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default SecondMoneyReceiptList;
export { SecondMoneyReceiptList as SampleReceipts };