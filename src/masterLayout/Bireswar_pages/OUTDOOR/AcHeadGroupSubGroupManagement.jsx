import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import MasterLayout from '../../MasterLayout';
import Breadcrumb from '../../../components/Breadcrumb';
import axiosInstance from '../../../utils/axiosConfig';

const AcHeadGroupSubGroupManagement = () => {
  const [activeTab, setActiveTab] = useState('heads');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);

  // Data states
  const [acHeads, setAcHeads] = useState([]);
  const [acGroups, setAcGroups] = useState([]);
  const [acSubGroups, setAcSubGroups] = useState([]);
  const [acHeadsDropdown, setAcHeadsDropdown] = useState([]);
  const [acGroupsDropdown, setAcGroupsDropdown] = useState([]);
  const [pagination, setPagination] = useState({});

  // Form states
  const [formData, setFormData] = useState({
    ACHead: '',
    System: 'Y',
    ACGroup: '',
    ACHeadId: '',
    SubGrp: '',
    AcGroupId: '',
    system: 'Y',
    LgrLike: 'Y'
  });

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Master', href: '/master' },
    { label: 'AC Head/Group/Sub Group Management' }
  ];

  const tabs = [
    { id: 'heads', label: 'AC Heads', icon: '🏢' },
    { id: 'groups', label: 'AC Groups', icon: '📁' },
    { id: 'subgroups', label: 'AC Sub Groups', icon: '📂' }
  ];

  // Fetch data based on active tab
  const fetchData = async () => {
    setLoading(true);
    try {
      let endpoint = '';
      switch (activeTab) {
        case 'heads':
          endpoint = '/ac-heads';
          break;
        case 'groups':
          endpoint = '/ac-groups';
          break;
        case 'subgroups':
          endpoint = '/ac-sub-groups';
          break;
      }

      const response = await axiosInstance.get(endpoint, {
        params: {
          page: currentPage,
          limit: itemsPerPage,
          search: searchTerm
        }
      });

      if (response.data.success) {
        switch (activeTab) {
          case 'heads':
            setAcHeads(response.data.data);
            break;
          case 'groups':
            setAcGroups(response.data.data);
            break;
          case 'subgroups':
            setAcSubGroups(response.data.data);
            break;
        }
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch dropdown data
  const fetchDropdownData = async () => {
    try {
      const [headsResponse, groupsResponse] = await Promise.all([
        axiosInstance.get('/ac-heads-dropdown'),
        axiosInstance.get('/ac-groups-dropdown')
      ]);

      if (headsResponse.data.success) {
        setAcHeadsDropdown(headsResponse.data.data);
      }
      if (groupsResponse.data.success) {
        setAcGroupsDropdown(groupsResponse.data.data);
      }
    } catch (error) {
      console.error('Error fetching dropdown data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab, currentPage, searchTerm]);

  useEffect(() => {
    fetchDropdownData();
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentPage(1);
    setSearchTerm('');
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      ACHead: '',
      System: 'Y',
      ACGroup: '',
      ACHeadId: '',
      SubGrp: '',
      AcGroupId: '',
      system: 'Y',
      LgrLike: 'Y'
    });
  };

  const openModal = (mode, item = null) => {
    setModalMode(mode);
    setSelectedItem(item);
    if (item) {
      setFormData({
        ACHead: item.ACHead || '',
        System: item.System || 'Y',
        ACGroup: item.ACGroup || '',
        ACHeadId: item.ACHeadId || '',
        SubGrp: item.SubGrp || '',
        AcGroupId: item.AcGroupId || '',
        system: item.system || 'Y',
        LgrLike: item.LgrLike || 'Y'
      });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let endpoint = '';
      let data = {};

      switch (activeTab) {
        case 'heads':
          endpoint = modalMode === 'create' ? '/ac-heads' : `/ac-heads/${selectedItem.ACHeadId}`;
          data = {
            ACHead: formData.ACHead,
            System: formData.System
          };
          break;
        case 'groups':
          endpoint = modalMode === 'create' ? '/ac-groups' : `/ac-groups/${selectedItem.ACGroupId}`;
          data = {
            ACGroup: formData.ACGroup,
            ACHeadId: formData.ACHeadId,
            System: formData.System
          };
          break;
        case 'subgroups':
          endpoint = modalMode === 'create' ? '/ac-sub-groups' : `/ac-sub-groups/${selectedItem.AcSubGrpId}`;
          data = {
            SubGrp: formData.SubGrp,
            AcGroupId: formData.AcGroupId,
            system: formData.system,
            LgrLike: formData.LgrLike
          };
          break;
      }

      const response = modalMode === 'create' 
        ? await axiosInstance.post(endpoint, data)
        : await axiosInstance.put(endpoint, data);

      if (response.data.success) {
        closeModal();
        fetchData();
        alert(`${activeTab.slice(0, -1)} ${modalMode === 'create' ? 'created' : 'updated'} successfully!`);
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    setLoading(true);
    try {
      let endpoint = '';
      switch (activeTab) {
        case 'heads':
          endpoint = `/ac-heads/${item.ACHeadId}`;
          break;
        case 'groups':
          endpoint = `/ac-groups/${item.ACGroupId}`;
          break;
        case 'subgroups':
          endpoint = `/ac-sub-groups/${item.AcSubGrpId}`;
          break;
      }

      const response = await axiosInstance.delete(endpoint);
      if (response.data.success) {
        fetchData();
        alert('Item deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Error deleting item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case 'heads':
        return acHeads;
      case 'groups':
        return acGroups;
      case 'subgroups':
        return acSubGroups;
      default:
        return [];
    }
  };

  const renderTableHeaders = () => {
    switch (activeTab) {
      case 'heads':
        return (
          <tr className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">AC Head</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">System</th>
            <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
          </tr>
        );
      case 'groups':
        return (
          <tr className="bg-gradient-to-r from-green-500 to-teal-600 text-white">
            <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">AC Group</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">AC Head</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">System</th>
            <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
          </tr>
        );
      case 'subgroups':
        return (
          <tr className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
            <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">Sub Group</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">AC Group</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">AC Head</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">System</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">Ledger Like</th>
            <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
          </tr>
        );
    }
  };

  const renderTableRows = () => {
    const data = getCurrentData();
    
    return data.map((item, index) => (
      <tr key={item.ACHeadId || item.ACGroupId || item.AcSubGrpId} 
          className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
        {activeTab === 'heads' && (
          <>
            <td className="px-6 py-4 text-sm text-gray-900">{item.ACHeadId}</td>
            <td className="px-6 py-4 text-sm text-gray-900">{item.ACHead}</td>
            <td className="px-6 py-4 text-sm text-gray-900">
              <span className={`px-2 py-1 rounded-full text-xs ${
                item.System === 'Y' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {item.System === 'Y' ? 'Yes' : 'No'}
              </span>
            </td>
          </>
        )}
        
        {activeTab === 'groups' && (
          <>
            <td className="px-6 py-4 text-sm text-gray-900">{item.ACGroupId}</td>
            <td className="px-6 py-4 text-sm text-gray-900">{item.ACGroup}</td>
            <td className="px-6 py-4 text-sm text-gray-900">{item.acHead?.ACHead || 'N/A'}</td>
            <td className="px-6 py-4 text-sm text-gray-900">
              <span className={`px-2 py-1 rounded-full text-xs ${
                item.System === 'Y' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {item.System === 'Y' ? 'Yes' : 'No'}
              </span>
            </td>
          </>
        )}
        
        {activeTab === 'subgroups' && (
          <>
            <td className="px-6 py-4 text-sm text-gray-900">{item.AcSubGrpId}</td>
            <td className="px-6 py-4 text-sm text-gray-900">{item.SubGrp}</td>
            <td className="px-6 py-4 text-sm text-gray-900">{item.acGroup?.ACGroup || 'N/A'}</td>
            <td className="px-6 py-4 text-sm text-gray-900">{item.acGroup?.acHead?.ACHead || 'N/A'}</td>
            <td className="px-6 py-4 text-sm text-gray-900">
              <span className={`px-2 py-1 rounded-full text-xs ${
                item.system === 'Y' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {item.system === 'Y' ? 'Yes' : 'No'}
              </span>
            </td>
            <td className="px-6 py-4 text-sm text-gray-900">
              <span className={`px-2 py-1 rounded-full text-xs ${
                item.LgrLike === 'Y' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {item.LgrLike === 'Y' ? 'Yes' : 'No'}
              </span>
            </td>
          </>
        )}
        
        <td className="px-6 py-4 text-center">
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => openModal('view', item)}
              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
              title="View"
            >
              <Eye size={16} />
            </button>
            <button
              onClick={() => openModal('edit', item)}
              className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
              title="Edit"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => handleDelete(item)}
              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </td>
      </tr>
    ));
  };

  const renderModalForm = () => {
    switch (activeTab) {
      case 'heads':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                AC Head Name *
              </label>
              <input
                type="text"
                value={formData.ACHead}
                onChange={(e) => setFormData({...formData, ACHead: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter AC Head name"
                required
                disabled={modalMode === 'view'}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                System
              </label>
              <select
                value={formData.System}
                onChange={(e) => setFormData({...formData, System: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={modalMode === 'view'}
              >
                <option value="Y">Yes</option>
                <option value="N">No</option>
              </select>
            </div>
          </>
        );
      
      case 'groups':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                AC Group Name *
              </label>
              <input
                type="text"
                value={formData.ACGroup}
                onChange={(e) => setFormData({...formData, ACGroup: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter AC Group name"
                required
                disabled={modalMode === 'view'}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                AC Head *
              </label>
              <select
                value={formData.ACHeadId}
                onChange={(e) => setFormData({...formData, ACHeadId: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
                disabled={modalMode === 'view'}
              >
                <option value="">Select AC Head</option>
                {acHeadsDropdown.map(head => (
                  <option key={head.ACHeadId} value={head.ACHeadId}>
                    {head.ACHead}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                System
              </label>
              <select
                value={formData.System}
                onChange={(e) => setFormData({...formData, System: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                disabled={modalMode === 'view'}
              >
                <option value="Y">Yes</option>
                <option value="N">No</option>
              </select>
            </div>
          </>
        );
      
      case 'subgroups':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sub Group Name *
              </label>
              <input
                type="text"
                value={formData.SubGrp}
                onChange={(e) => setFormData({...formData, SubGrp: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter Sub Group name"
                required
                disabled={modalMode === 'view'}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                AC Group *
              </label>
              <select
                value={formData.AcGroupId}
                onChange={(e) => setFormData({...formData, AcGroupId: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
                disabled={modalMode === 'view'}
              >
                <option value="">Select AC Group</option>
                {acGroupsDropdown.map(group => (
                  <option key={group.ACGroupId} value={group.ACGroupId}>
                    {group.ACGroup} ({group.acHead?.ACHead})
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                System
              </label>
              <select
                value={formData.system}
                onChange={(e) => setFormData({...formData, system: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                disabled={modalMode === 'view'}
              >
                <option value="Y">Yes</option>
                <option value="N">No</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ledger Like
              </label>
              <select
                value={formData.LgrLike}
                onChange={(e) => setFormData({...formData, LgrLike: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                disabled={modalMode === 'view'}
              >
                <option value="Y">Yes</option>
                <option value="N">No</option>
              </select>
            </div>
          </>
        );
    }
  };

  return (
    <MasterLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">
              AC Head/Group/Sub Group Management
            </h1>
            <p className="text-blue-100 mt-1">
              Manage accounting heads, groups, and sub-groups
            </p>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Controls */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
              <button
                onClick={() => openModal('create')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
              >
                <Plus size={20} />
                <span>Add New {activeTab.slice(0, -1)}</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                {renderTableHeaders()}
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : getCurrentData().length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                      No {activeTab} found
                    </td>
                  </tr>
                ) : (
                  renderTableRows()
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, pagination.totalItems)} of {pagination.totalItems} results
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                {[...Array(pagination.totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-3 py-1 border rounded-md text-sm ${
                      currentPage === index + 1
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.totalPages))}
                  disabled={currentPage === pagination.totalPages}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  {modalMode === 'create' ? 'Add New' : modalMode === 'edit' ? 'Edit' : 'View'} {activeTab.slice(0, -1)}
                </h2>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6">
                {renderModalForm()}
                
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  {modalMode !== 'view' && (
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50"
                    >
                      {loading ? 'Saving...' : modalMode === 'create' ? 'Create' : 'Update'}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </MasterLayout>
  );
};

export default AcHeadGroupSubGroupManagement;