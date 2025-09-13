import { useState, useEffect } from "react";
import MasterLayout from '../../MasterLayout';
import Breadcrumb from '../../Breadcrumb';
import axiosInstance from "../../../axiosInstance";

const AcHeadGroupManagement = () => {
  const [activeTab, setActiveTab] = useState('acHeads');
  const [acHeads, setAcHeads] = useState([]);
  const [acGroups, setAcGroups] = useState([]);
  const [acSubGroups, setAcSubGroups] = useState([]);
  const [acGenLeds, setAcGenLeds] = useState([]);
  const [acHeadsDropdown, setAcHeadsDropdown] = useState([]);
  const [acGroupsDropdown, setAcGroupsDropdown] = useState([]);
  const [acSubGroupsDropdown, setAcSubGroupsDropdown] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [formData, setFormData] = useState({
    ACHead: '',
    ACGroup: '',
    ACHeadId: '',
    System: '',
    SubGrp: '',
    AcGroupId: '',
    system: '',
    LgrLike: '',
    Desc: '',
    ShortName: '',
    OpTYpe: '',
    OpBalance: '',
    AcType: '',
    Address1: '',
    Address2: '',
    Address3: '',
    Phone: '',
    ItPaNo: '',
    CSTNo: '',
    LSTNo: '',
    TDS: '',
    IntId: '',
    PartyType: '',
    EMail: '',
    AcSubGrpId: '',
    EntType: '',
    BillFormatId: '',
    VCode: '',
    SCode: '',
    IGST: ''
  });

  useEffect(() => {
    fetchData();
    fetchAcHeadsDropdown();
    if (activeTab === 'acSubGroups') {
      fetchAcGroupsDropdown();
    }
    if (activeTab === 'acGenLeds') {
      fetchAcSubGroupsDropdown();
    }
  }, [activeTab, currentPage, searchQuery]);

  const fetchData = async () => {
    setLoading(true);
    try {
      let endpoint;
      if (activeTab === 'acHeads') endpoint = '/ac-heads';
      else if (activeTab === 'acGroups') endpoint = '/ac-groups';
      else if (activeTab === 'acSubGroups') endpoint = '/ac-subgroups';
      else endpoint = '/ac-genled';
      
      const params = {
        page: currentPage,
        limit: 10,
        ...(searchQuery && { search: searchQuery })
      };
      
      const response = await axiosInstance.get(endpoint, { params });
      
      if (response.data.success) {
        if (activeTab === 'acHeads') {
          setAcHeads(response.data.data);
        } else if (activeTab === 'acGroups') {
          setAcGroups(response.data.data);
        } else if (activeTab === 'acSubGroups') {
          setAcSubGroups(response.data.data);
        } else {
          setAcGenLeds(response.data.data);
        }
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

  const fetchAcHeadsDropdown = async () => {
    try {
      const response = await axiosInstance.get('/ac-heads-dropdown');
      if (response.data.success) {
        setAcHeadsDropdown(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching AC Heads dropdown:', error);
    }
  };

  const fetchAcGroupsDropdown = async () => {
    try {
      const response = await axiosInstance.get('/ac-subgroups/ac-groups-dropdown');
      if (response.data.success) {
        setAcGroupsDropdown(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching AC Groups dropdown:', error);
    }
  };

  const fetchAcSubGroupsDropdown = async () => {
    try {
      const response = await axiosInstance.get('/ac-genled/ac-subgroups-dropdown');
      if (response.data.success) {
        setAcSubGroupsDropdown(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching AC Sub Groups dropdown:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let endpoint, dataToSend, itemType;
      
      if (activeTab === 'acHeads') {
        endpoint = '/ac-heads';
        dataToSend = { ACHead: formData.ACHead, System: formData.System };
        itemType = 'AC Head';
      } else if (activeTab === 'acGroups') {
        endpoint = '/ac-groups';
        dataToSend = { ACGroup: formData.ACGroup, ACHeadId: formData.ACHeadId, System: formData.System };
        itemType = 'AC Group';
      } else if (activeTab === 'acSubGroups') {
        endpoint = '/ac-subgroups';
        dataToSend = { SubGrp: formData.SubGrp, AcGroupId: formData.AcGroupId, system: formData.system, LgrLike: formData.LgrLike };
        itemType = 'AC Sub Group';
      } else {
        endpoint = '/ac-genled';
        dataToSend = {
          Desc: formData.Desc, ShortName: formData.ShortName, OpTYpe: formData.OpTYpe,
          OpBalance: formData.OpBalance, AcType: formData.AcType, Address1: formData.Address1,
          Address2: formData.Address2, Address3: formData.Address3, Phone: formData.Phone,
          ItPaNo: formData.ItPaNo, CSTNo: formData.CSTNo, LSTNo: formData.LSTNo,
          TDS: formData.TDS, System: formData.System, IntId: formData.IntId,
          PartyType: formData.PartyType, EMail: formData.EMail, AcSubGrpId: formData.AcSubGrpId,
          EntType: formData.EntType, BillFormatId: formData.BillFormatId,
          VCode: formData.VCode, SCode: formData.SCode, IGST: formData.IGST
        };
        itemType = 'AC General Ledger';
      }
      
      const url = editingItem ? `${endpoint}/${editingItem.ACHeadId || editingItem.ACGroupId || editingItem.AcSubGrpId || editingItem.DescId}` : endpoint;
      const method = editingItem ? 'put' : 'post';
      
      const response = await axiosInstance[method](url, dataToSend);
      
      if (response.data.success) {
        await fetchData();
        setShowModal(false);
        resetForm();
        alert(editingItem ? `${itemType} updated successfully!` : `${itemType} created successfully!`);
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save data');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    if (activeTab === 'acHeads') {
      setFormData({
        ACHead: item.ACHead || '',
        System: item.System || '',
        ACGroup: '', ACHeadId: '', SubGrp: '', AcGroupId: '', system: '', LgrLike: ''
      });
    } else if (activeTab === 'acGroups') {
      setFormData({
        ACGroup: item.ACGroup || '',
        ACHeadId: item.ACHeadId || '',
        System: item.System || '',
        ACHead: '', SubGrp: '', AcGroupId: '', system: '', LgrLike: ''
      });
    } else if (activeTab === 'acSubGroups') {
      setFormData({
        SubGrp: item.SubGrp || '',
        AcGroupId: item.AcGroupId || '',
        system: item.system || '',
        LgrLike: item.LgrLike || '',
        ACHead: '', ACGroup: '', ACHeadId: '', System: '', Desc: '', ShortName: '', OpTYpe: '', OpBalance: '', AcType: '', Address1: '', Address2: '', Address3: '', Phone: '', ItPaNo: '', CSTNo: '', LSTNo: '', TDS: '', IntId: '', PartyType: '', EMail: '', AcSubGrpId: '', EntType: '', BillFormatId: '', VCode: '', SCode: '', IGST: ''
      });
    } else {
      setFormData({
        Desc: item.Desc || '', ShortName: item.ShortName || '', OpTYpe: item.OpTYpe || '',
        OpBalance: item.OpBalance || '', AcType: item.AcType || '', Address1: item.Address1 || '',
        Address2: item.Address2 || '', Address3: item.Address3 || '', Phone: item.Phone || '',
        ItPaNo: item.ItPaNo || '', CSTNo: item.CSTNo || '', LSTNo: item.LSTNo || '',
        TDS: item.TDS || '', System: item.System || '', IntId: item.IntId || '',
        PartyType: item.PartyType || '', EMail: item.EMail || '', AcSubGrpId: item.AcSubGrpId || '',
        EntType: item.EntType || '', BillFormatId: item.BillFormatId || '',
        VCode: item.VCode || '', SCode: item.SCode || '', IGST: item.IGST || '',
        ACHead: '', ACGroup: '', ACHeadId: '', SubGrp: '', AcGroupId: '', system: '', LgrLike: ''
      });
    }
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const itemType = activeTab === 'acHeads' ? 'AC Head' : activeTab === 'acGroups' ? 'AC Group' : activeTab === 'acSubGroups' ? 'AC Sub Group' : 'AC General Ledger';
    if (window.confirm(`Are you sure you want to delete this ${itemType}?`)) {
      try {
        let endpoint;
        if (activeTab === 'acHeads') endpoint = `/ac-heads/${id}`;
        else if (activeTab === 'acGroups') endpoint = `/ac-groups/${id}`;
        else if (activeTab === 'acSubGroups') endpoint = `/ac-subgroups/${id}`;
        else endpoint = `/ac-genled/${id}`;
        
        const response = await axiosInstance.delete(endpoint);
        if (response.data.success) {
          await fetchData();
          alert(`${itemType} deleted successfully!`);
        }
      } catch (error) {
        console.error('Error deleting data:', error);
        alert('Failed to delete data');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      ACHead: '', ACGroup: '', ACHeadId: '', System: '', SubGrp: '', AcGroupId: '', system: '', LgrLike: '',
      Desc: '', ShortName: '', OpTYpe: '', OpBalance: '', AcType: '', Address1: '', Address2: '', Address3: '', Phone: '', ItPaNo: '', CSTNo: '', LSTNo: '', TDS: '', IntId: '', PartyType: '', EMail: '', AcSubGrpId: '', EntType: '', BillFormatId: '', VCode: '', SCode: '', IGST: ''
    });
    setEditingItem(null);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const currentData = activeTab === 'acHeads' ? acHeads : activeTab === 'acGroups' ? acGroups : activeTab === 'acSubGroups' ? acSubGroups : acGenLeds;

  return (
    <MasterLayout>
      <Breadcrumb title="AC Head & Group Management" />
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
                      AC Head & Group Management
                    </h2>
                    <p className="mb-0 opacity-90">Manage Account Heads and Groups</p>
                  </div>
                  <div className="col-md-4 text-end">
                    <div className="bg-white bg-opacity-200 rounded-3 p-3 text-dark d-inline-block">
                      <h4 className="fw-bold mb-1">{totalItems}</h4>
                      <small>Total {activeTab === 'acHeads' ? 'AC Heads' : activeTab === 'acGroups' ? 'AC Groups' : activeTab === 'acSubGroups' ? 'AC Sub Groups' : 'AC General Ledgers'}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="card border-0 shadow-sm mb-4" style={{borderRadius: '15px'}}>
          <div className="card-header bg-white border-0" style={{borderRadius: '15px 15px 0 0'}}>
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'acHeads' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('acHeads');
                    setCurrentPage(1);
                    setSearchQuery('');
                  }}
                >
                  <i className="fas fa-list me-2"></i>
                  AC Heads
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'acGroups' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('acGroups');
                    setCurrentPage(1);
                    setSearchQuery('');
                  }}
                >
                  <i className="fas fa-layer-group me-2"></i>
                  AC Groups
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'acSubGroups' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('acSubGroups');
                    setCurrentPage(1);
                    setSearchQuery('');
                  }}
                >
                  <i className="fas fa-sitemap me-2"></i>
                  AC Sub Groups
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'acGenLeds' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('acGenLeds');
                    setCurrentPage(1);
                    setSearchQuery('');
                  }}
                >
                  <i className="fas fa-book me-2"></i>
                  AC General Ledger
                </button>
              </li>
            </ul>
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
                    placeholder={`Search ${activeTab === 'acHeads' ? 'AC Heads' : activeTab === 'acGroups' ? 'AC Groups' : activeTab === 'acSubGroups' ? 'AC Sub Groups' : 'AC General Ledgers'}...`}
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
              Add New {activeTab === 'acHeads' ? 'AC Head' : activeTab === 'acGroups' ? 'AC Group' : activeTab === 'acSubGroups' ? 'AC Sub Group' : 'AC General Ledger'}
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="card border-0 shadow-sm" style={{borderRadius: '15px'}}>
          <div className="card-header bg-white border-0 py-3" style={{borderRadius: '15px 15px 0 0'}}>
            <h5 className="mb-0 fw-bold text-dark">
              <i className={`fas ${activeTab === 'acHeads' ? 'fa-list' : activeTab === 'acGroups' ? 'fa-layer-group' : activeTab === 'acSubGroups' ? 'fa-sitemap' : 'fa-book'} me-2 text-primary`}></i>
              {activeTab === 'acHeads' ? 'AC Heads' : activeTab === 'acGroups' ? 'AC Groups' : activeTab === 'acSubGroups' ? 'AC Sub Groups' : 'AC General Ledgers'} List
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
                      <th className="border-0 py-3">{activeTab === 'acHeads' ? 'AC Head' : activeTab === 'acGroups' ? 'AC Group' : activeTab === 'acSubGroups' ? 'Sub Group' : 'Description'}</th>
                      {activeTab === 'acGroups' && <th className="border-0 py-3">AC Head</th>}
                      {activeTab === 'acSubGroups' && <th className="border-0 py-3">AC Group</th>}
                      {activeTab === 'acGenLeds' && <th className="border-0 py-3">Short Name</th>}
                      {activeTab === 'acGenLeds' && <th className="border-0 py-3">AC Sub Group</th>}
                      <th className="border-0 py-3">System</th>
                      {activeTab === 'acSubGroups' && <th className="border-0 py-3">Ledger Like</th>}
                      <th className="border-0 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.length > 0 ? currentData.map((item, index) => (
                      <tr key={item.ACHeadId || item.ACGroupId} className="border-bottom">
                        <td className="py-3 px-4">
                          <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2">
                            {(currentPage - 1) * 10 + index + 1}
                          </span>
                        </td>
                        <td className="py-3">
                          <div className="d-flex align-items-center">
                            <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                              <i className={`fas ${activeTab === 'acHeads' ? 'fa-list' : activeTab === 'acGroups' ? 'fa-layer-group' : activeTab === 'acSubGroups' ? 'fa-sitemap' : 'fa-book'} text-primary`}></i>
                            </div>
                            <div>
                              <h6 className="mb-0 fw-bold">{item.ACHead || item.ACGroup || item.SubGrp || item.Desc}</h6>
                            </div>
                          </div>
                        </td>
                        {activeTab === 'acGroups' && (
                          <td className="py-3">
                            <span className="badge bg-info bg-opacity-10 text-info px-3 py-2">
                              {item.acHead?.ACHead || 'N/A'}
                            </span>
                          </td>
                        )}
                        {activeTab === 'acSubGroups' && (
                          <td className="py-3">
                            <span className="badge bg-info bg-opacity-10 text-info px-3 py-2">
                              {item.acGroup?.ACGroup || 'N/A'}
                            </span>
                          </td>
                        )}
                        {activeTab === 'acGenLeds' && (
                          <td className="py-3">
                            <span className="badge bg-secondary bg-opacity-10 text-secondary px-3 py-2">
                              {item.ShortName || 'N/A'}
                            </span>
                          </td>
                        )}
                        {activeTab === 'acGenLeds' && (
                          <td className="py-3">
                            <span className="badge bg-info bg-opacity-10 text-info px-3 py-2">
                              {item.acSubGrp?.SubGrp || 'N/A'}
                            </span>
                          </td>
                        )}
                        <td className="py-3">
                          <span className={`badge ${(item.System || item.system) === 'Y' ? 'bg-success' : 'bg-secondary'} bg-opacity-10 text-${(item.System || item.system) === 'Y' ? 'success' : 'secondary'}`}>
                            {(item.System || item.system) === 'Y' ? 'System' : 'Manual'}
                          </span>
                        </td>
                        {activeTab === 'acSubGroups' && (
                          <td className="py-3">
                            <span className={`badge ${item.LgrLike === 'Y' ? 'bg-success' : 'bg-warning'} bg-opacity-10 text-${item.LgrLike === 'Y' ? 'success' : 'warning'}`}>
                              {item.LgrLike === 'Y' ? 'Yes' : 'No'}
                            </span>
                          </td>
                        )}
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
                              onClick={() => handleDelete(item.ACHeadId || item.ACGroupId || item.AcSubGrpId || item.DescId)}
                              title="Delete"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={activeTab === 'acGenLeds' ? "7" : activeTab === 'acSubGroups' ? "6" : activeTab === 'acGroups' ? "5" : "4"} className="text-center py-5">
                          <div className="text-muted">
                            <i className="fas fa-inbox fa-3x mb-3 opacity-50"></i>
                            <p className="mb-0">No {activeTab === 'acHeads' ? 'AC Heads' : activeTab === 'acGroups' ? 'AC Groups' : activeTab === 'acSubGroups' ? 'AC Sub Groups' : 'AC General Ledgers'} found</p>
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
                    <i className={`fas ${activeTab === 'acHeads' ? 'fa-list' : activeTab === 'acGroups' ? 'fa-layer-group' : activeTab === 'acSubGroups' ? 'fa-sitemap' : 'fa-book'} me-2 text-primary`}></i>
                    {editingItem ? 'Edit' : 'Add New'} {activeTab === 'acHeads' ? 'AC Head' : activeTab === 'acGroups' ? 'AC Group' : activeTab === 'acSubGroups' ? 'AC Sub Group' : 'AC General Ledger'}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    {activeTab === 'acHeads' ? (
                      <>
                        <div className="mb-3">
                          <label className="form-label fw-semibold">AC Head Name *</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.ACHead}
                            onChange={(e) => setFormData({...formData, ACHead: e.target.value})}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label fw-semibold">System</label>
                          <select
                            className="form-select"
                            value={formData.System}
                            onChange={(e) => setFormData({...formData, System: e.target.value})}
                          >
                            <option value="">Select System</option>
                            <option value="Y">System</option>
                            <option value="N">Manual</option>
                          </select>
                        </div>
                      </>
                    ) : activeTab === 'acGroups' ? (
                      <>
                        <div className="mb-3">
                          <label className="form-label fw-semibold">AC Group Name *</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.ACGroup}
                            onChange={(e) => setFormData({...formData, ACGroup: e.target.value})}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label fw-semibold">AC Head *</label>
                          <select
                            className="form-select"
                            value={formData.ACHeadId}
                            onChange={(e) => setFormData({...formData, ACHeadId: e.target.value})}
                            required
                          >
                            <option value="">Select AC Head</option>
                            {acHeadsDropdown.map((head) => (
                              <option key={head.ACHeadId} value={head.ACHeadId}>
                                {head.ACHead}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-3">
                          <label className="form-label fw-semibold">System</label>
                          <select
                            className="form-select"
                            value={formData.System}
                            onChange={(e) => setFormData({...formData, System: e.target.value})}
                          >
                            <option value="">Select System</option>
                            <option value="Y">System</option>
                            <option value="N">Manual</option>
                          </select>
                        </div>
                      </>
                    ) : activeTab === 'acSubGroups' ? (
                      <>
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
                      </>
                    ) : (
                      <>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label fw-semibold">Description *</label>
                              <input type="text" className="form-control" value={formData.Desc} onChange={(e) => setFormData({...formData, Desc: e.target.value})} required />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label fw-semibold">Short Name</label>
                              <input type="text" className="form-control" value={formData.ShortName} onChange={(e) => setFormData({...formData, ShortName: e.target.value})} />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label fw-semibold">AC Sub Group *</label>
                              <select className="form-select" value={formData.AcSubGrpId} onChange={(e) => setFormData({...formData, AcSubGrpId: e.target.value})} required>
                                <option value="">Select AC Sub Group</option>
                                {acSubGroupsDropdown.map((subGroup) => (
                                  <option key={subGroup.AcSubGrpId} value={subGroup.AcSubGrpId}>
                                    {subGroup.SubGrp}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label fw-semibold">AC Type</label>
                              <select className="form-select" value={formData.AcType} onChange={(e) => setFormData({...formData, AcType: e.target.value})}>
                                <option value="">Select Type</option>
                                <option value="G">General</option>
                                <option value="P">Party</option>
                                <option value="C">Cash</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <div className="mb-3">
                              <label className="form-label fw-semibold">Opening Balance</label>
                              <input type="number" className="form-control" value={formData.OpBalance} onChange={(e) => setFormData({...formData, OpBalance: e.target.value})} />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="mb-3">
                              <label className="form-label fw-semibold">Phone</label>
                              <input type="text" className="form-control" value={formData.Phone} onChange={(e) => setFormData({...formData, Phone: e.target.value})} />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="mb-3">
                              <label className="form-label fw-semibold">Email</label>
                              <input type="email" className="form-control" value={formData.EMail} onChange={(e) => setFormData({...formData, EMail: e.target.value})} />
                            </div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="form-label fw-semibold">Address</label>
                          <input type="text" className="form-control mb-2" placeholder="Address Line 1" value={formData.Address1} onChange={(e) => setFormData({...formData, Address1: e.target.value})} />
                          <input type="text" className="form-control mb-2" placeholder="Address Line 2" value={formData.Address2} onChange={(e) => setFormData({...formData, Address2: e.target.value})} />
                          <input type="text" className="form-control" placeholder="Address Line 3" value={formData.Address3} onChange={(e) => setFormData({...formData, Address3: e.target.value})} />
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label fw-semibold">System</label>
                              <select className="form-select" value={formData.System} onChange={(e) => setFormData({...formData, System: e.target.value})}>
                                <option value="">Select System</option>
                                <option value="Y">System</option>
                                <option value="N">Manual</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label fw-semibold">Party Type</label>
                              <select className="form-select" value={formData.PartyType} onChange={(e) => setFormData({...formData, PartyType: e.target.value})}>
                                <option value="">Select Type</option>
                                <option value="C">Customer</option>
                                <option value="S">Supplier</option>
                                <option value="O">Other</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
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
                      {editingItem ? 'Update' : 'Add'} {activeTab === 'acHeads' ? 'AC Head' : activeTab === 'acGroups' ? 'AC Group' : activeTab === 'acSubGroups' ? 'AC Sub Group' : 'AC General Ledger'}
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

export default AcHeadGroupManagement;