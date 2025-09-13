import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, IconButton, TextField, Button, Box, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import { Edit, Delete, Visibility, Search } from '@mui/icons-material';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';
import axiosInstance from '../../../../axiosInstance';
import { useNavigate } from 'react-router-dom';

const Visit_list = () => {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchPhone, setSearchPhone] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchRegistrationId, setSearchRegistrationId] = useState('');
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 100 });
  const [rowCount, setRowCount] = useState(0);
  const [viewDialog, setViewDialog] = useState({ open: false, patient: null });
  const [editDialog, setEditDialog] = useState({ open: false, patient: null });
  const [editForm, setEditForm] = useState({});

  const fetchVisits = async (phone = '', date = '', registrationId = '', page = 1, limit = 100) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      let url;
      
      // If searching by Registration ID, use specific endpoint
      if (registrationId) {
        url = `/patient-with-bills/search-by-registration?registrationId=${registrationId}`;
      } else {
        url = `/patient-with-bills?page=${page}&limit=${limit}`;
        if (phone) url += `&phone=${phone}`;
        if (date) url += `&date=${date}`;
      }
      
      const response = await axiosInstance.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data?.success) {
        let data;
        
        // Handle Registration ID search response (single patient)
        if (registrationId && response.data.data.patient) {
          const patient = response.data.data.patient;
          data = [{
            id: patient.RegistrationId,
            RegistrationId: patient.RegistrationId,
            PatientName: patient.PatientName,
            PhoneNo: patient.PhoneNo,
            Age: patient.Age,
            Sex: patient.Sex,
            Add1: patient.Add1,
            RegDate: new Date().toLocaleDateString(), // No RegDate in response
            RegTime: '', // No RegTime in response
            billsCount: response.data.data.totalBills || 0,
            totalAmount: response.data.data.totalAmount || 0
          }];
          setRowCount(1);
        } else {
          // Handle regular search response (array of patients)
          data = response.data.data.map(item => ({
            id: item.RegistrationId,
            RegistrationId: item.RegistrationId,
            PatientName: item.PatientName,
            PhoneNo: item.PhoneNo,
            Age: item.Age,
            Sex: item.Sex,
            Add1: item.Add1,
            RegDate: new Date(item.RegDate).toLocaleDateString(),
            RegTime: item.RegTime,
            billsCount: item.billCount || 0,
            totalAmount: item.totalAmount || 0
          }));
          setRowCount(response.data.pagination?.total || 0);
        }
        
        setVisits(data);
      }
    } catch (error) {
      console.error('Error fetching visits:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisits('', '', '', 1, paginationModel.pageSize);
  }, []);

  const handleSearch = () => {
    setPaginationModel({ page: 0, pageSize: paginationModel.pageSize });
    fetchVisits(searchPhone, searchDate, searchRegistrationId, 1, paginationModel.pageSize);
  };

  const handlePaginationChange = (newPaginationModel) => {
    setPaginationModel(newPaginationModel);
    fetchVisits(searchPhone, searchDate, searchRegistrationId, newPaginationModel.page + 1, newPaginationModel.pageSize);
  };

  const navigate = useNavigate();

  const handleView = async (patient) => {
    try {
      // Fetch complete patient data with bills
      const regNum = patient.RegistrationId.split('/')[0];
      const year = patient.RegistrationId.split('/')[1];
      const response = await axiosInstance.get(`/outdoor-visit-entry/${regNum}/${year}`);
      
      if (response.data?.success) {
        const fullData = response.data.data;
        // Navigate to New.jsx with view mode and full data
        navigate('/visit_entry', { 
          state: { 
            mode: 'view',
            patientData: fullData,
            isReadOnly: true
          }
        });
      }
    } catch (error) {
      console.error('Error fetching patient details:', error);
      alert('Error loading patient details');
    }
  };

  const handleEdit = async (patient) => {
    try {
      // Fetch complete patient data with bills
      const regNum = patient.RegistrationId.split('/')[0];
      const year = patient.RegistrationId.split('/')[1];
      const response = await axiosInstance.get(`/outdoor-visit-entry/${regNum}/${year}`);
      
      if (response.data?.success) {
        const fullData = response.data.data;
        // Navigate to New.jsx with edit mode and full data
        navigate('/visit_entry', { 
          state: { 
            mode: 'edit',
            patientData: fullData,
            isReadOnly: false
          }
        });
      }
    } catch (error) {
      console.error('Error fetching patient details:', error);
      alert('Error loading patient details');
    }
  };

  const handleUpdatePatient = async () => {
    try {
      const regNum = editDialog.patient.RegistrationId.split('/')[0];
      const year = editDialog.patient.RegistrationId.split('/')[1];
      
      const response = await axiosInstance.put(`/outdoor-visit-entry/${regNum}/${year}`, {
        patientData: editForm
      });
      
      if (response.data?.success) {
        alert('Patient updated successfully!');
        setEditDialog({ open: false, patient: null });
        fetchVisits(searchPhone, searchDate, searchRegistrationId, paginationModel.page + 1, paginationModel.pageSize);
      }
    } catch (error) {
      alert('Error updating patient: ' + error.message);
    }
  };

  const handleDelete = async (patient) => {
    if (window.confirm(`Are you sure you want to delete ${patient.PatientName}?`)) {
      try {
        const regNum = patient.RegistrationId.split('/')[0];
        const year = patient.RegistrationId.split('/')[1];
        
        const response = await axiosInstance.delete(`/outdoor-visit-entry/${regNum}/${year}`);
        
        if (response.data?.success) {
          alert('Patient deleted successfully!');
          fetchVisits(searchPhone, searchDate, searchRegistrationId, paginationModel.page + 1, paginationModel.pageSize);
        }
      } catch (error) {
        alert('Error deleting patient: ' + error.message);
      }
    }
  };

  const columns = [
     {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton 
            size="small" 
            sx={{ bgcolor: '#e3f2fd', color: '#1976d2' }}
            onClick={() => handleView(params.row)}
            title="View Details"
          >
            <Visibility fontSize="small" />
          </IconButton>
          <IconButton 
            size="small" 
            sx={{ bgcolor: '#e8f5e8', color: '#2e7d32' }}
            onClick={() => handleEdit(params.row)}
            title="Edit Patient"
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton 
            size="small" 
            sx={{ bgcolor: '#ffebee', color: '#d32f2f' }}
            onClick={() => handleDelete(params.row)}
            title="Delete Patient"
          >
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
    { field: 'RegistrationId', headerName: 'Registration ID', width: 150 },
    { field: 'PatientName', headerName: 'Patient Name', width: 200 },
    { field: 'PhoneNo', headerName: 'Phone', width: 130 },
    { field: 'Age', headerName: 'Age', width: 80 },
    { field: 'Sex', headerName: 'Gender', width: 100 },
    { field: 'Add1', headerName: 'Address', width: 250 },
    { field: 'RegDate', headerName: 'Registration Date', width: 150 },
    { field: 'RegTime', headerName: 'Time', width: 100 },
    { field: 'billsCount', headerName: 'Bills', width: 80 },
    { field: 'totalAmount', headerName: 'Total Amount', width: 120, 
      valueFormatter: (params) => `₹${params.value?.toFixed(2) || '0.00'}` },
   
  ];

  return (
    <MasterLayout>
      <Breadcrumb title="Visit List" />
      
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
              size="small"
              label="Search by Phone"
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
              sx={{ minWidth: 200 }}
            />
            <TextField
              size="small"
              label="Search by Registration ID"
              value={searchRegistrationId}
              onChange={(e) => setSearchRegistrationId(e.target.value)}
              sx={{ minWidth: 200 }}
            />
            <TextField
              size="small"
              type="date"
              label="Search by Date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ minWidth: 200 }}
            />
            <Button
              variant="contained"
              startIcon={<Search />}
              onClick={handleSearch}
              sx={{ bgcolor: '#1976d2' }}
            >
              Search
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setSearchPhone('');
                setSearchDate('');
                setSearchRegistrationId('');
                setPaginationModel({ page: 0, pageSize: paginationModel.pageSize });
                fetchVisits('', '', '', 1, paginationModel.pageSize);
              }}
            >
              Clear
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Paper sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={visits}
          columns={columns}
          loading={loading}
          paginationMode="server"
          rowCount={rowCount}
          paginationModel={paginationModel}
          onPaginationModelChange={handlePaginationChange}
          pageSizeOptions={[50, 100, 200, 500]}
          checkboxSelection
          disableRowSelectionOnClick
          sx={{ border: 0 }}
        />
      </Paper>

      {/* View Dialog */}
      <Dialog open={viewDialog.open} onClose={() => setViewDialog({ open: false, patient: null })} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ bgcolor: '#1976d2', color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Visibility /> Patient Details - {viewDialog.patient?.PatientName}
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          {viewDialog.patient && (
            <Box sx={{ p: 3 }}>
              {/* Header Info */}
              <Card sx={{ mb: 3, bgcolor: '#f8f9fa' }}>
                <CardContent>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 2 }}>
                    <Box><Typography variant="h6" color="primary">{viewDialog.patient.RegistrationId}</Typography><Typography variant="caption">Registration ID</Typography></Box>
                    <Box><Typography variant="h6">{viewDialog.patient.PatientName}</Typography><Typography variant="caption">Patient Name</Typography></Box>
                    <Box><Typography variant="h6">{viewDialog.patient.PhoneNo}</Typography><Typography variant="caption">Phone Number</Typography></Box>
                    <Box><Typography variant="h6">₹{viewDialog.patient.totalAmount?.toFixed(2) || '0.00'}</Typography><Typography variant="caption">Total Amount</Typography></Box>
                  </Box>
                </CardContent>
              </Card>
              
              {/* Personal Information */}
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, color: '#1976d2', borderBottom: '2px solid #e3f2fd', pb: 1 }}>Personal Information</Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
                    <Box><Typography><strong>Age:</strong> {viewDialog.patient.Age || 'N/A'}</Typography></Box>
                    <Box><Typography><strong>Gender:</strong> {viewDialog.patient.Sex === 'M' ? 'Male' : viewDialog.patient.Sex === 'F' ? 'Female' : 'N/A'}</Typography></Box>
                    <Box><Typography><strong>Registration Date:</strong> {viewDialog.patient.RegDate}</Typography></Box>
                    <Box><Typography><strong>Registration Time:</strong> {viewDialog.patient.RegTime || 'N/A'}</Typography></Box>
                  </Box>
                </CardContent>
              </Card>
              
              {/* Address Information */}
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, color: '#2e7d32', borderBottom: '2px solid #e8f5e8', pb: 1 }}>Address Information</Typography>
                  <Typography><strong>Address:</strong> {viewDialog.patient.Add1 || 'N/A'}</Typography>
                </CardContent>
              </Card>
              
              {/* Bills Summary */}
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, color: '#ed6c02', borderBottom: '2px solid #fff3e0', pb: 1 }}>Bills Summary</Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 2 }}>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#e3f2fd', borderRadius: 1 }}>
                      <Typography variant="h4" color="primary">{viewDialog.patient.billsCount}</Typography>
                      <Typography variant="caption">Total Bills</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#e8f5e8', borderRadius: 1 }}>
                      <Typography variant="h4" color="success.main">₹{viewDialog.patient.totalAmount?.toFixed(2) || '0.00'}</Typography>
                      <Typography variant="caption">Total Amount</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, bgcolor: '#f8f9fa' }}>
          <Button onClick={() => setViewDialog({ open: false, patient: null })} variant="contained">Close</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialog.open} onClose={() => setEditDialog({ open: false, patient: null })} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ bgcolor: '#2e7d32', color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Edit /> Edit Patient - {editDialog.patient?.PatientName}
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3, pt: 2 }}>
            {/* Basic Information */}
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: '#1976d2' }}>Basic Information</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="Patient Name"
                    value={editForm.PatientName || ''}
                    onChange={(e) => setEditForm({...editForm, PatientName: e.target.value})}
                    fullWidth
                    required
                  />
                  <TextField
                    label="Phone Number"
                    value={editForm.PhoneNo || ''}
                    onChange={(e) => setEditForm({...editForm, PhoneNo: e.target.value})}
                    fullWidth
                    required
                  />
                  <TextField
                    label="Age"
                    type="number"
                    value={editForm.Age || ''}
                    onChange={(e) => setEditForm({...editForm, Age: e.target.value})}
                    fullWidth
                  />
                  <TextField
                    label="Gender"
                    select
                    value={editForm.Sex || ''}
                    onChange={(e) => setEditForm({...editForm, Sex: e.target.value})}
                    fullWidth
                    SelectProps={{ native: true }}
                  >
                    <option value="">Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                  </TextField>
                </Box>
              </CardContent>
            </Card>
            
            {/* Address & Contact */}
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: '#2e7d32' }}>Address & Contact</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="Address"
                    value={editForm.Add1 || ''}
                    onChange={(e) => setEditForm({...editForm, Add1: e.target.value})}
                    fullWidth
                    multiline
                    rows={3}
                  />
                  <TextField
                    label="Guardian Name"
                    value={editForm.GurdianName || ''}
                    onChange={(e) => setEditForm({...editForm, GurdianName: e.target.value})}
                    fullWidth
                  />
                  <TextField
                    label="Email Address"
                    type="email"
                    value={editForm.EMailId || ''}
                    onChange={(e) => setEditForm({...editForm, EMailId: e.target.value})}
                    fullWidth
                  />
                </Box>
              </CardContent>
            </Card>
            
            {/* Physical Measurements */}
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: '#ed6c02' }}>Physical Measurements</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="Weight (kg)"
                    type="number"
                    value={editForm.Weight || ''}
                    onChange={(e) => setEditForm({...editForm, Weight: e.target.value})}
                    fullWidth
                  />
                  <TextField
                    label="Height (cm)"
                    type="number"
                    value={editForm.Height || ''}
                    onChange={(e) => setEditForm({...editForm, Height: e.target.value})}
                    fullWidth
                  />
                  <TextField
                    label="Blood Group"
                    value={editForm.BloodGroup || ''}
                    onChange={(e) => setEditForm({...editForm, BloodGroup: e.target.value})}
                    fullWidth
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, bgcolor: '#f8f9fa' }}>
          <Button onClick={() => setEditDialog({ open: false, patient: null })} variant="outlined">Cancel</Button>
          <Button onClick={handleUpdatePatient} variant="contained" color="success">Update Patient</Button>
        </DialogActions>
      </Dialog>
    </MasterLayout>
  );
};

export default Visit_list;

