import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Form } from 'react-bootstrap';
import DoctorSelect from '../1 . Visit entry/DoctorSelect';
import axiosInstance from '../../../../axiosInstance';

const DataTable = () => {
  const [rows, setRows] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedAdmission, setSelectedAdmission] = React.useState(null);
  const [formData, setFormData] = React.useState({});
  const [validated, setValidated] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [religions, setReligions] = React.useState([]);
  const [departments, setDepartments] = React.useState([]);

  // Fetch data for the table
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.get('/admission', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data?.success) {
        setRows(response.data.data.map(row => ({
          ...row,
          id: row.AdmitionId
        })));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch religions and departments for the form
  const fetchFormData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch religions
      const religionsResponse = await axiosInstance.get('/religion', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (religionsResponse.data?.success) {
        setReligions(religionsResponse.data.data || []);
      }
      
      // Fetch departments
      const departmentsResponse = await axiosInstance.get('/department', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (departmentsResponse.data?.success) {
        setDepartments(departmentsResponse.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching form data:', error);
    }
  };

  // Update the autocomplete function to store the full address in Add1
  const initAutocomplete = () => {
    const input = document.getElementById("fullAddress");
    if (!input || !window.google) return;
    
    const autocomplete = new window.google.maps.places.Autocomplete(input, {
      types: ["geocode"],
      componentRestrictions: { country: "in" }
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      
      if (place) {
        // Get the full formatted address from Google
        const fullAddress = place.formatted_address || "";
        
        // Update form data with the complete address in Add1
        setFormData(prev => ({
          ...prev,
          Add1: fullAddress,        // Store complete address in Add1 field
          fullAddress: fullAddress, // Also store in fullAddress for display
          Add2: "",             // Clear other address fields
          Add3: "COUNTRY- INDIA"
        }));
      }
    });
  };

  React.useEffect(() => {
    fetchData();
    fetchFormData();
    initAutocomplete();
  }, []);

  const handleDelete = async (admissionNo) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        const token = localStorage.getItem('token');
        await axiosInstance.delete(`/admission/${admissionNo}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchData();
      } catch (error) {
        console.error('Error deleting record:', error);
        alert('Failed to delete record');
      }
    }
  };

  const handleEdit = async (admissionNo) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.get(
        `/admission/${admissionNo}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data?.success) {
        setSelectedAdmission(response.data.data);
        setFormData(response.data.data);
        setOpenModal(true);
      }
    } catch (error) {
      console.error('Error fetching admission details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    if (name === "dob" && value) {
      // Calculate age in years
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      
      // Adjust age if birthday hasn't occurred yet this year
      if (
        today.getMonth() < birthDate.getMonth() || 
        (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      
      setFormData(prev => ({
        ...prev,
        dob: value,
        Age: age.toString()
      }));
    } else if (name === "fullAddress") {
      // When user types manually in the address textarea
      setFormData(prev => ({
        ...prev,
        fullAddress: value,
        Add1: value,
        Add2: "",
        Add3: "COUNTRY- INDIA"
      }));
    } else if (name === "DepartmentId") {
      // When department is selected, store both ID and name
      const selectedDept = departments.find(dept => dept.DepartmentId.toString() === value);
      setFormData(prev => ({
        ...prev,
        DepartmentId: value,
        dept: selectedDept ? selectedDept.Department : "",
        // Clear doctor selection when department changes
        doctorId: "",
        docName: ""
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === "PatientName" || name === "GurdianName"
          ? value.toUpperCase() 
          : type === "checkbox" 
            ? checked 
            : value
      }));
    }
  };

  // Fixed handleSubmit function to handle validation errors
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      
      // Extract the admission number from the data
      const admissionNo = selectedAdmission.AdmitionNo;
      
      // Create a clean data object for update
      // Remove fields that can't be updated
      const { 
        AdmitionId, 
        AdmitionNo, 
        AdmitionNo1,
        ...updateData 
      } = formData;
      
      // Prepare data with proper types
      const cleanedData = {};
      
      // Set default values for fields that can't be null
      const defaultValues = {
        // String fields that can't be null
        Add3: "COUNTRY- INDIA",
        AgeType: "Y",
        RelativeName: "",
        RelativePhoneNo: "",
        Rename: "",
        InsComp: "",
        PatientId: "",
        Remarks: "",
        SpRemarks: "",
        IdentNo: "",
        PolcNo: "",
        CCNNo: "",
        BillDone: "",
        Occupation: "",
        Passport: "",
        PanNo: "",
        nameemployer: "",
        Nameemp: "",
        empcode: "",
        optime: "",
        
        // Numeric fields that can't be null
        OPDId: 0,
        BookingId: 0,
        AreaId: 0,
        BedId: 0,
        UCDoctor2Id: 0,
        UCDoctor3Id: 0,
        DiseaseId: 0,
        RMOId: 0,
        RefDoctorId: 0,
        DietChartId: 0,
        tpaper: 0,
        RefDoctorId2: 0
      };
      
      // Copy all fields from updateData, replacing nulls with defaults
      Object.keys(updateData).forEach(key => {
        if (updateData[key] === null && defaultValues.hasOwnProperty(key)) {
          cleanedData[key] = defaultValues[key];
        } else {
          cleanedData[key] = updateData[key];
        }
      });
      
      // Add any missing default fields
      Object.keys(defaultValues).forEach(key => {
        if (cleanedData[key] === undefined) {
          cleanedData[key] = defaultValues[key];
        }
      });
      
      // Use the correct API endpoint format
      const response = await axiosInstance.put(
        `/admission/${admissionNo}`,
        cleanedData,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      
      setOpenModal(false);
      fetchData();
    } catch (error) {
      console.error('Error updating record:', error);
      alert('Failed to update record: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = [
    { field: 'AdmitionNo', headerName: 'Registration No.', width: 160 },
    { field: 'PatientName', headerName: 'Patient Name', width: 160 },
    { field: 'AdmitionDate', headerName: 'Admission Date', width: 120,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString()
    },
    { field: 'AdmitionTime', headerName: 'Admission Time', width: 120 },
    { field: 'PhoneNo', headerName: 'Phone No', width: 130 },
    { field: 'Add1', headerName: 'Address', width: 300 },
    { field: 'Add2', headerName: 'Area/P.S', width: 150 },
    { field: 'Add3', headerName: 'Address', width: 150 },
    { field: 'OPD', headerName: 'New Registration', width: 150 },
    { field: 'BillTime', headerName: 'Bill Time', width: 120 },
    { field: 'Booking', headerName: 'Advance Booking', width: 150 },
    { field: 'Age', headerName: 'Age', width: 80 },
    { field: 'Sex', headerName: 'SEX', width: 80 },
    { field: 'MStatus', headerName: 'Marital Status', width: 120 },
    { field: 'ReligionId', headerName: 'Religion', width: 100 },
    { field: 'Relation', headerName: 'Relation', width: 100 },
    { field: 'DepartmentId', headerName: 'Department', width: 120 },
    { field: 'UCDoctor1Id', headerName: 'DoctorName', width: 150 },
    { field: 'RefDoctorId', headerName: 'Ref. By Doctor', width: 150 },
    { field: 'ReferralId', headerName: 'Ref. By Referral', width: 150 },
    { field: 'CardNo', headerName: 'Cheque / CARD', width: 150 },
    { field: 'Company', headerName: 'Company Name', width: 150 },
    { field: 'Weight', headerName: 'Weight', width: 100 },
    {
      field: 'action',
      headerName: 'Action',
      width: 130,
      sortable: false,
      renderCell: (params) => (
        <div style={{ display: 'flex', gap: 8 }}>
          <IconButton 
            size="small" 
            sx={{ bgcolor: '#e6fce6', color: '#22c55e' }}
            onClick={() => handleEdit(params.row.AdmitionId)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton 
            size="small" 
            sx={{ bgcolor: '#ffe6e6', color: '#ef4444' }}
            onClick={() => handleDelete(params.row.AdmitionId)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <>
      <Paper sx={{ height: 600, width: '100%', mt: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } }
          }}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="edit-admission-modal"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          overflow: 'auto'
        }}>
          <IconButton
            aria-label="close"
            onClick={() => setOpenModal(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
              zIndex: 1
            }}
          >
            <CloseIcon />
          </IconButton>
          
          {selectedAdmission && (
            <div className="" style={{ padding: "20px" }}>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                {/* Form content remains the same */}
                <div className="row">
                  {/* Submit Button */}
                  <div className="col-12 text-center mb-4">
                    <button 
                      type="submit" 
                      className="btn btn-primary px-5 py-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Updating..." : "Update"}
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default DataTable;