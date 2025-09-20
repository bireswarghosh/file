import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, IconButton, TextField, Button, Box, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import { Edit, Delete, Visibility, Search, PictureAsPdf } from '@mui/icons-material';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../../axiosInstance';
import jsPDF from 'jspdf';

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
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(phone && { search: phone }),
        ...(registrationId && { registrationId }),
        ...(date && { fromDate: date, toDate: date })
      });
      
      const response = await axiosInstance.get(`/patient-visits?${params}`);
      
      if (response.data?.success) {
        const data = response.data.data.map(item => ({
          id: item.PVisitId,
          RegistrationId: item.RegistrationId,
          PatientName: item.PatientName,
          PhoneNo: item.PhoneNo,
          Age: item.Age,
          Sex: item.Sex === 'M' ? 'Male' : item.Sex === 'F' ? 'Female' : item.Sex,
          Add1: item.PatientAdd1,
          RegDate: item.PVisitDate ? item.PVisitDate.split('T')[0] : 'N/A',
          RegTime: item.vTime,
          DoctorName: item.DoctorName,
          SpecialityName: item.SpecialityName,
          TotAmount: item.TotAmount || 0,
          PVisitId: item.PVisitId
        }));
        
        setVisits(data);
        setRowCount(response.data.pagination?.total || 0);
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
      const response = await axiosInstance.get(`/patient-visits/${patient.PVisitId}`);
      
      if (response.data?.success) {
        const fullData = response.data.data;
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
      const response = await axiosInstance.get(`/patient-visits/${patient.PVisitId}`);
      
      if (response.data?.success) {
        const fullData = response.data.data;
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
      const response = await axiosInstance.put(`/patient-visits/${editDialog.patient.PVisitId}`, editForm);
      
      if (response.data?.success) {
        alert('Patient visit updated successfully!');
        setEditDialog({ open: false, patient: null });
        fetchVisits(searchPhone, searchDate, searchRegistrationId, paginationModel.page + 1, paginationModel.pageSize);
      }
    } catch (error) {
      alert('Error updating patient visit: ' + error.message);
    }
  };

  const generatePDF = (patient) => {
    const doc = new jsPDF();
    
    // Red logo box with white text
    doc.setFillColor(220, 53, 69);
    doc.rect(15, 15, 30, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('L', 22, 28);
    doc.text('H', 22, 35);
    doc.text('C', 22, 42);
    
    // Main header
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('LORDS HEALTH CARE', 105, 25, { align: 'center' });
    
    // Address details
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('13/3, Circular 2nd Bye Lane, Kona Expressway,', 105, 32, { align: 'center' });
    doc.text('(Near Jumanabala Balika Vidyalaya) Shibpur, Howrah - 711 102, W.B.', 105, 37, { align: 'center' });
    doc.text('Phone No.: 8272904444 HELPLINE - 7003378414,Toll Free No:-1800-309-0895', 105, 42, { align: 'center' });
    doc.text('E-mail: patientdesk@lordshealthcare.org, Website: www.lordshealthcare.org', 105, 47, { align: 'center' });

    // Barcode area
    doc.setLineWidth(1);
    doc.rect(165, 15, 30, 25);
    // Vertical barcode lines
    for(let i = 0; i < 20; i++) {
      if(i % 2 === 0) doc.line(167 + i, 17, 167 + i, 38);
    }
    doc.setFontSize(8);
    doc.text('S-' + patient.RegistrationId, 180, 44, { align: 'center' });

    // ADVANCE BOOKING title
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('ADVANCE BOOKING', 105, 60, { align: 'center' });

    // MONEY RECEIPT header with Serial No
    doc.setFontSize(14);
    doc.setTextColor(255, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text('MONEY RECEIPT', 20, 75);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text('Serial No : 1', 150, 75);

    // Main information table
    const startY = 85;
    doc.setLineWidth(0.5);
    doc.setTextColor(0, 0, 0);
    
    // Registration details box
    doc.rect(15, startY, 180, 25);
    doc.line(15, startY + 12, 195, startY + 12);
    doc.line(100, startY, 100, startY + 25);
    doc.line(140, startY, 140, startY + 25);
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`Registration ID : S-${patient.RegistrationId}`, 17, startY + 8);
    doc.text(`Registration Date : ${patient.RegDate}`, 17, startY + 20);
    doc.text(`Booking Time : ${patient.RegTime || '08:20 AM'}`, 17, startY + 32);
    
    doc.text(`Visit ID :`, 102, startY + 8);
    doc.text(`RRR00351`, 102, startY + 20);
    
    doc.text(`Visit Date : ${patient.RegDate}`, 142, startY + 8);
    doc.text(`Visit Time : ${patient.RegTime || '8:20:00 AM'}`, 142, startY + 20);

    // Patient information box - made taller to fit consultant info
    const patientY = startY + 25;
    doc.rect(15, patientY, 180, 55);
    doc.line(15, patientY + 20, 195, patientY + 20);
    doc.line(15, patientY + 40, 195, patientY + 40);
    doc.line(140, patientY + 20, 140, patientY + 55);
    
    doc.text(`Patient Name : ${patient.PatientName}`, 17, patientY + 12);
    doc.text(`Age : ${patient.Age || '57'} Y    Sex : ${patient.Sex || 'Female'}`, 142, patientY + 8);
    doc.text(`Phone No : ${patient.PhoneNo}`, 142, patientY + 16);
    
    doc.text(`Address : ${patient.Add1 || 'HOWRAH, ,'}`, 17, patientY + 32);
    doc.text(`SERVER2    0    Cash    N`, 142, patientY + 32);
    
    // Consultant and Department in separate row with proper spacing
    doc.text(`CONSULTANT : Dr. ${patient.DoctorName || 'ABHRA MUKHOPADHYAY'}`, 17, patientY + 52);
    doc.text(`Department : ${patient.SpecialityName || 'GENERAL MEDICINE'}`, 142, patientY + 52);

    // Services table header - adjusted position
    const servicesY = patientY + 55;
    doc.rect(15, servicesY, 180, 12);
    doc.line(150, servicesY, 150, servicesY + 12);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Particulars / Description', 17, servicesY + 8);
    doc.text('Amount In Rs.', 152, servicesY + 8);
    
    // Service items
    let currentY = servicesY + 12;
    doc.setFont('helvetica', 'normal');
    
    // Service Charge
    doc.rect(15, currentY, 180, 12);
    doc.line(150, currentY, 150, currentY + 12);
    doc.text('Service Charge', 17, currentY + 8);
    doc.text('100.00', 185, currentY + 8, { align: 'right' });
    currentY += 12;
    
    // Professional Charge
    doc.rect(15, currentY, 180, 12);
    doc.line(150, currentY, 150, currentY + 12);
    doc.text('CONSULTATION - Professional Charge', 17, currentY + 8);
    doc.text('500.00', 185, currentY + 8, { align: 'right' });
    currentY += 12;
    
    // Thank you message
    doc.rect(15, currentY, 180, 18);
    doc.line(150, currentY, 150, currentY + 18);
    doc.text(`Received With Thanks For CONSULTATION Charges From ${patient.PatientName}.`, 17, currentY + 12);
    doc.text('600.00', 185, currentY + 12, { align: 'right' });
    currentY += 18;
    
    // Total amount in words
    doc.rect(15, currentY, 180, 18);
    doc.line(150, currentY, 150, currentY + 18);
    doc.setFont('helvetica', 'bold');
    doc.text('PAID : Rupees six hundred & zero paise only', 17, currentY + 12);
    doc.text('600.00', 185, currentY + 12, { align: 'right' });
    currentY += 18;

    // Footer signature
    doc.setFont('helvetica', 'normal');
    doc.text('Received By : SANJAY ST.', 17, currentY + 15);

    // Save PDF with patient name
    const fileName = `MoneyReceipt_${patient.PatientName.replace(/\s+/g, '_')}_${patient.RegistrationId.replace('/', '-')}.pdf`;
    doc.save(fileName);
    alert('Professional Money Receipt PDF generated successfully!');
  };



  const handleDelete = async (patient) => {
    if (window.confirm(`Are you sure you want to delete visit for ${patient.PatientName}?`)) {
      try {
        const response = await axiosInstance.delete(`/patient-visits/${patient.PVisitId}`);
        
        if (response.data?.success) {
          alert('Patient visit deleted successfully!');
          fetchVisits(searchPhone, searchDate, searchRegistrationId, paginationModel.page + 1, paginationModel.pageSize);
        }
      } catch (error) {
        alert('Error deleting patient visit: ' + error.message);
      }
    }
  };

  const columns = [
     {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
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
            sx={{ bgcolor: '#fff3e0', color: '#f57c00' }}
            onClick={() => generatePDF(params.row)}
            title="Generate Money Receipt PDF"
          >
            <PictureAsPdf fontSize="small" />
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
    { field: 'Add1', headerName: 'Address', width: 200 },
    { field: 'RegDate', headerName: 'Visit Date', width: 120 },
    { field: 'RegTime', headerName: 'Time', width: 100 },
    { field: 'DoctorName', headerName: 'Doctor', width: 150 },
    { field: 'SpecialityName', headerName: 'Department', width: 150 },
    { field: 'TotAmount', headerName: 'Amount', width: 120, 
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

