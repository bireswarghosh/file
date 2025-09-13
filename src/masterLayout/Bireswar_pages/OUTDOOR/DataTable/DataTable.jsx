


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

const DataTable = (props) => {
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
      const response = await axiosInstance.get('/patientregistration?page=1&limit=50', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data?.success) {
        setRows(response.data.data.map(row => ({
          ...row,
          id: row.RegistrationId,
          AdmitionId: row.RegistrationId,
          AdmitionNo: row.RegistrationId,
          AdmitionDate: row.RegDate,
          AdmitionTime: row.RegTime
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
        Add3: ""
      }));
    }
  });
};

  React.useEffect(() => {
    fetchData();
    fetchFormData();
    initAutocomplete();
  }, []);



const handleDelete = async (admission) => {
  if (window.confirm('Are you sure you want to delete this record?')) {
    try {
      const token = localStorage.getItem('token');
      await axiosInstance.delete(`/patientregistration/${admission.RegistrationId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
      alert('Record deleted successfully!');
    } catch (error) {
      console.error('Error deleting record:', error);
      alert('Failed to delete record');
    }
  }
};

const handleEdit = async (admission) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.get(
      `/patientregistration/${admission.RegistrationId}`,
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







const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  try {
    const token = localStorage.getItem('token');
    
    const response = await axiosInstance.put(
      `/patientregistration/${selectedAdmission.RegistrationId}`,
      formData,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    
    if (response.data?.success) {
      alert('Record updated successfully!');
      setOpenModal(false);
      fetchData();
    }
  } catch (error) {
    console.error('Error updating record:', error);
    alert('Failed to update record: ' + (error.response?.data?.message || error.message));
  } finally {
    setIsSubmitting(false);
  }
};









  const columns = [
    { field: 'RegistrationId', headerName: 'Registration ID', width: 160 },
    { field: 'PatientName', headerName: 'Patient Name', width: 160 },
    { field: 'RegDate', headerName: 'Registration Date', width: 120 },
    { field: 'RegTime', headerName: 'Registration Time', width: 120 },
    { field: 'PhoneNo', headerName: 'Phone No', width: 130 },
    { field: 'Add1', headerName: 'Address', width: 300 },
    { field: 'Age', headerName: 'Age', width: 80 },
    { field: 'Sex', headerName: 'Gender', width: 80 },
    { field: 'MStatus', headerName: 'Marital Status', width: 120 },
    { field: 'GurdianName', headerName: 'Guardian Name', width: 150 },
    { field: 'Relation', headerName: 'Relation', width: 100 },
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
      onClick={() => handleEdit(params.row)}
    >
      <EditIcon fontSize="small" />
    </IconButton>
    <IconButton 
      size="small" 
      sx={{ bgcolor: '#ffe6e6', color: '#ef4444' }}
      onClick={() => handleDelete(params.row)}
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
          onRowClick={props.onRowClick}
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
                <div className="row">
                  {/* Booking Details */}
                  <div className="col-lg-12">
                    <div className="card booking-card mb-3">
                      <div className="card-header text-white" style={{ background: 'linear-gradient(90deg, #3A50A0 70%, #788DCE 100%)', padding: '0.5rem 1rem' }}>
                        <h5 className="card-title mb-0 text-white">Booking Details</h5>
                      </div>
                      <div className="card-body">
                        <div className="row gy-3">
                          <div className="col-md-6 col-lg-2">
                            <label htmlFor="Booking" className="form-label fw-bold text-dark">
                              Advance Booking
                            </label>
                            <select
                              id="Booking"
                              name="Booking"
                              className="form-select"
                              value={formData.Booking || ""}
                              onChange={handleChange}
                              required
                            >
                              <option value="">Select...</option>
                              <option value="N">No</option>
                              <option value="Y">Yes</option>
                            </select>
                            <div className="invalid-feedback">Please select advance booking.</div>
                          </div>
                          <div className="col-md-6 col-lg-2">
                            <label htmlFor="AdmitionDate" className="form-label fw-bold text-dark">
                              Visit Date
                            </label>
                            <input
                              type="date"
                              id="AdmitionDate"
                              name="AdmitionDate"
                              className="form-control"
                              value={formData.AdmitionDate || ""}
                              onChange={handleChange}
                              required
                            />
                            <div className="invalid-feedback">Please choose a visit date.</div>
                          </div>
                          <div className="col-md-6 col-lg-2">
                            <label htmlFor="AdmitionTime" className="form-label fw-bold text-dark">
                              Visit Time
                            </label>
                            <input
                              type="time"
                              id="AdmitionTime"
                              name="AdmitionTime"
                              className="form-control"
                              value={formData.AdmitionTime || ""}
                              onChange={handleChange}
                              required
                            />
                            <div className="invalid-feedback">Please choose a visit time.</div>
                          </div>
                          <div className="col-md-6 col-lg-2 d-flex align-items-end">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="quota"
                                id="quotaCheck"
                                checked={formData.quota || false}
                                onChange={handleChange}
                              />
                              <label className="form-check-label fw-bold text-dark" htmlFor="quotaCheck">
                                Quota
                              </label>
                              <div className="invalid-feedback">Please acknowledge quota.</div>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-2">
                            <label className="form-label fw-bold text-dark">Queue No.</label>
                            <input
                              type="number"
                              name="queueNo"
                              className="form-control"
                              value={formData.queueNo || 0}
                              onChange={handleChange}
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  


  {/* Registration Detail */}
            <div className="col-lg-12">
              <div className="card registration-card mb-3">
                <div className="card-header text-white" style={{ background: 'linear-gradient(90deg, #3A50A0 70%, #788DCE 100%)', padding: '0.5rem 1rem' }}>
                  <h5 className="card-title mb-0 text-white">Registration Detail</h5>
                </div>
                <div className="card-body">
                  <div className="row gy-3 gx-2">
                    <div className="col-md-6 col-lg-2">
                      <label htmlFor="OPD" className="form-label fw-bold text-dark">
                        New Registration
                      </label>
                      <select
                        id="OPD"
                        name="OPD"
                        className="form-select"
                        value={formData.OPD}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select...</option>
                        <option value="Y">Yes</option>
                        <option value="N">No</option>
                      </select>
                      <div className="invalid-feedback">Select registration type.</div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                    </div>
                    <div className="col-md-6 col-lg-3">
                      <label htmlFor="PatientName" className="form-label fw-bold text-dark">
                        Patient's Name
                      </label>
                      <input
                        type="text"
                        id="PatientName"
                        name="PatientName"
                        className="form-control"
                        style={{ textTransform: 'uppercase' }}
                        value={formData.PatientName}
                        onChange={handleChange}
                        required
                      />
                      <div className="invalid-feedback">Enter patient's name.</div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                      <label htmlFor="PhoneNo" className="form-label fw-bold text-dark">
                        Phone No
                      </label>
                      <input
                        type="text"
                        id="PhoneNo"
                        name="PhoneNo"
                        className="form-control"
                        value={formData.PhoneNo}
                        onChange={handleChange}
                      />
                      <div className="col-12 text-center mb-4 ">
                        <button
                          type="search"
                          className="btn btn-primary-600 px-5 py-2"

                        >Search</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>






  {/* Patient Details */}
            <div className="col-lg-12">
              <div className="card patient-card mb-3">
                <div className="card-header text-white" style={{ background: 'linear-gradient(90deg, #3A50A0 70%, #788DCE 100%)', padding: '0.5rem 1rem' }}>
                  <h5 className="card-title mb-0 text-white">Patient Details</h5>
                </div>
                <div className="card-body">
                  <div className="row gy-3">
                    <div className="col-md-6 col-lg-2">
                      <label htmlFor="GurdianName" className="form-label fw-bold text-dark">
                        C / O
                      </label>
                      <input
                        type="text"
                        id="GurdianName"
                        name="GurdianName"
                        style={{ textTransform: 'uppercase' }}
                        className="form-control"
                        value={formData.GurdianName}
                        onChange={handleChange}
                        required
                      />
                      <div className="invalid-feedback">Please choose a C / O.</div>
                    </div>

                    <div className="col-md-2">
                      <label htmlFor="co" className="form-label fw-bold text-dark">
                        Relation
                      </label>
                      <select 
                        id="Relation" 
                        name="Relation" 
                        className="form-select form-select-sm" 
                        value={formData.Relation}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select...</option>
                        <option value="FATHER">FATHER</option>
                        <option value="HUSBAND">HUSBAND </option>
                      </select>
                      <div className="invalid-feedback">Select Relation.</div>
                    </div>

                    <div className="col-md-2">
                      <label htmlFor="Sex" className="form-label fw-bold text-dark">
                        SEX
                      </label>
                      <select 
                        id="Sex" 
                        name="Sex" 
                        className="form-select form-select-sm" 
                        value={formData.Sex}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select...</option>
                        <option value="M">MALE</option>
                        <option value="F">FEMALE </option>
                      </select>
                      <div className="invalid-feedback">Select Sex</div>
                    </div>

                     <div className="col-md-2">
                      <label htmlFor="MStatus" className="form-label fw-bold text-dark">
                        Marital Status
                      </label>
                      <select 
                        id="MStatus" 
                        name="MStatus" 
                        className="form-select form-select-sm" 
                        value={formData.MStatus}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select...</option>
                        <option value="M">MARRIED</option>
                        <option value="U">UNMARRIED </option>
                      </select>
                      <div className="invalid-feedback">Select Marital Status</div>
                    </div>


                    <div className="col-md-4">
                      <label htmlFor="dob" className="form-label fw-bold text-dark">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        className="form-control form-control-sm"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                      />
                      <div className="invalid-feedback">Enter DOB.</div>
                    </div>
                    <div className="col-md-6 d-flex align-items-baseline">
                      <label className="form-label fw-bold me-2 text-dark mb-0" style={{ fontSize: 15 }}>
                        Age
                      </label>
                      <input
                        type="number"
                        name="Age"
                        className="form-control form-control-sm me-1"
                        placeholder="Y"
                        style={{ width: 45 }}
                        value={formData.Age}
                        onChange={handleChange}
                        required
                      />
                      <span className="text-primary me-2" style={{ fontSize: 13 }}>Y</span>
                    </div>
                    <div className="col-md-3 ">
                      <label htmlFor="Weight" className="form-label fw-bold text-dark">
                        Weight
                      </label>
                      <input
                        type="text"
                        id="Weight"
                        name="Weight"
                        className="form-control"
                        value={formData.Weight}
                        onChange={handleChange}
                        required
                      />
                      <div className="invalid-feedback">Enter Weight.</div>
                    </div>
                    <div className="col-md-3 ">
                      <label htmlFor="Height" className="form-label fw-bold text-dark">
                        Height
                      </label>
                      <input
                        type="text"
                        id="Height" //not found
                        name="Height" //not found
                        className="form-control"
                        value={formData.Height}
                        onChange={handleChange}
                        required
                      />
                      <div className="invalid-feedback">Enter Height.</div>
                    </div>
                    <div className="col-md-3 ">
                      <label htmlFor="BpMin" className="form-label fw-bold text-dark">
                        BP Min
                      </label>
                      <input
                        type="text"
                        id="Bpmin" //not found
                        name="BpMin" //not found
                        className="form-control"
                        value={formData.BpMin}
                        onChange={handleChange}
                        required
                      />
                      <div className="invalid-feedback">Enter BP Min.</div>
                    </div>
                    <div className="col-md-3 ">
                      <label htmlFor="BpMax" className="form-label fw-bold text-dark">
                        BP Max
                      </label>
                      <input
                        type="text"
                        id="Bpmax" //not found
                        name="BpMax" //not found
                        className="form-control"
                        value={formData.BpMax}
                        onChange={handleChange}
                        required
                      />
                      <div className="invalid-feedback">Enter BP Max.</div>
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="fullAddress" className="form-label fw-bold text-dark">
                        Address
                      </label>
                      <textarea
                        id="fullAddress"
                        name="fullAddress"
                        className="form-control"
                        value={formData.fullAddress}
                        onChange={(e) => {
                          // When user types manually, update both fullAddress and Add1
                          setFormData(prev => ({
                            ...prev,
                            fullAddress: e.target.value,
                            Add1: e.target.value,
                            Add2: "",
                            Add3: "COUNTRY- INDIA"
                          }));
                        }}
                        placeholder="Start typing address..."
                        rows={3}
                        required
                      />
                      <div className="invalid-feedback">Enter address.</div>
                    </div>

                    <div className="col-md-3">
                      <label htmlFor="ReligionId" className="form-label fw-bold text-dark">
                        Religion
                      </label>
                      <select 
                        id="ReligionId" 
                        name="ReligionId" 
                        className="form-select form-select-sm"
                        value={formData.ReligionId || ""}
                        onChange={handleChange}
                      >
                        <option value="">Select Religion</option>
                        {religions.map(religion => (
                          <option key={religion.ReligionId} value={religion.ReligionId}>
                            {religion.Religion}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="areaps" className="form-label fw-bold text-dark">
                        Area/P.S
                      </label>
                      <input
                        type="area"
                        id="Add2"
                        name="Add2"
                        className="form-control form-control-sm"
                        value={formData.Add2}
                        onChange={handleChange}
                        required
                      />
                      <div className="invalid-feedback">Enter Area/P.S</div>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="Company" className="form-label fw-bold text-dark">
                        Company Name
                      </label>
                      <select
                        id="Company"
                        name="Company"
                        className="form-select"
                        value={formData.Company}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select...</option>
                        <option value="N">No</option>
                        <option value="Y">Yes</option>
                      </select>
                      <div className="invalid-feedback">Please select Company Name</div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>






     {/* Doctor Detail & Cancel Section */}
            <div className="col-lg-12">
              <div className="card shadow-sm mb-3">
                <div className="row g-0">
                  <div className="col-md-5 border-end bg-light">
                    <div className="p-3">
                      <div className="mb-3">
                        <div className="p-2 rounded text-white" style={{ background: 'linear-gradient(90deg, #2a3f8d 70%, #b3b3ff 100%)' }}>
                          <strong>Doctor Detail</strong>
                        </div>
                      </div>
                      <label htmlFor="DepartmentId" className="form-label fw-bold text-dark">
                        Department
                      </label>
                      <select 
                        id="DepartmentId" 
                        name="DepartmentId"
                        className="form-select form-select-sm mb-2"
                        value={formData.DepartmentId || ""}
                        onChange={handleChange}
                      >
                        <option value="">Select Department</option>
                        {departments.map(dept => (
                          <option key={dept.DepartmentId} value={dept.DepartmentId}>
                            {dept.Department}
                          </option>
                        ))}
                      </select>
                      
                      {/* Use the DoctorSelect component */}
                      <DoctorSelect 
                        formData={formData} 
                        setFormData={setFormData} 
                        departmentId={formData.UCDoctor1Id} 
                      />
                    </div>
                  </div>
                  <div className="col-md-7 bg-white">
                    <div className="p-3">
                      <div className="d-flex align-items-center mb-3 flex-wrap">
                        <span className="fw-bold text-danger me-2" style={{ fontSize: 17 }}>
                          CANCEL
                        </span>
                        <label className="form-label fw-bold ms-md-3 me-1 text-dark mb-0">
                          Cancel Visit Entry
                        </label>
                        <input 
                          type="checkbox" 
                          name="cancelVisit"
                          className="form-check-input ms-1 me-2"
                          checked={formData.cancelVisit}
                          onChange={handleChange}
                        />
                        <span className="ms-1 me-3 text-dark" style={{ fontSize: 13 }}>(For All)</span>
                        <label className="form-label fw-bold ms-md-3 me-1 text-dark mb-0">
                          Cancel Date
                        </label>
                        <input
                          type="date"
                          name="cancelDate"
                          className="form-control form-control-sm ms-1"
                          style={{ width: 130 }}
                          value={formData.cancelDate}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-2">
                          <label className="form-label fw-bold text-dark">Ref. By Doctor</label>
                          <select 
                        id="RefDoctorId" 
                        name="RefDoctorId"
                        className="form-select form-select-sm mb-2"
                        value={formData.RefDoctorId || ""}
                        onChange={handleChange}
                      >
                        <option value="">Select Ref. By Doctor</option>
                        {departments.map(dept => (
                          <option key={dept.RefDoctorId} value={dept.RefDoctorId}>
                            {dept.RefDoctorId}
                          </option>
                        ))}
                      </select>
                        </div>
                        <div className="col-md-6 mb-2">
                          <label className="form-label fw-bold text-dark">Ref. By Referral</label>
                          <select 
                        id="ReferralId" 
                        name="ReferralId"
                        className="form-select form-select-sm mb-2"
                        value={formData.ReferralId || ""}
                        onChange={handleChange}
                      >
                        <option value="">Select Ref. By Referral</option>
                        {departments.map(dept => (
                          <option key={dept.ReferralId} value={dept.ReferralId}>
                            {dept.ReferralId}
                          </option>
                        ))}
                      </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

                        {/* Billing Detail */}
                        <div className="col-lg-12">
                            <div className="card billing-card mb-3">
                                <div className="card-header text-white" style={{ background: 'linear-gradient(90deg, #3A50A0 70%, #788DCE 100%)', padding: '0.5rem 1rem' }}>
                                    <h5 className="card-title mb-0 text-white">Billing Detail</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row gy-3 gx-3">
                                        <div className="col-md-2">
                                            <label htmlFor="billNo" className="form-label fw-bold text-dark">Bill No.</label>
                                            <input 
                                                type="text" 
                                                id="billNo" 
                                                name="billNo"
                                                className="form-control form-control-sm" 
                                                value={formData.billNo}
                                                onChange={handleChange}
                                                required 
                                            />
                                            <div className="invalid-feedback">Enter bill number.</div>
                                        </div>
                                        <div className="col-md-2 d-flex flex-column justify-content-end">
                                            <label htmlFor="billDate" className="form-label fw-bold text-dark">Bill Date</label>
                                            <input
                                                type="date"
                                                id="billDate"
                                                name="billDate"
                                                className="form-control form-control-sm"
                                                value={formData.billDate}
                                                onChange={handleChange}
                                                required
                                            />
                                            <div className="invalid-feedback">Select bill date.</div>
                                        </div>
                                        <div className="col-md-2 d-flex flex-column justify-content-end">
                                            <label htmlFor="billTime" className="form-label fw-bold text-dark">Bill Time</label>
                                            <input
                                                type="time"
                                                id="BillTime"
                                                name="BillTime"
                                                className="form-control form-control-sm"
                                                value={formData.BillTime}
                                                onChange={handleChange}
                                                required
                                            />
                                            <div className="invalid-feedback">Select bill time.</div>
                                        </div>
                                        <div className="col-md-2 d-flex flex-column justify-content-end">
                                            <label className="form-label fw-bold text-dark">Entry By</label>
                                            <input type="text" className="form-control form-control-sm" defaultValue="Admin" readOnly />
                                        </div>
                                        <div className="col-md-2 d-flex flex-column justify-content-end">
                                            <label className="form-label fw-bold text-dark">Current User</label>
                                            <input type="text" className="form-control form-control-sm" defaultValue="Admin" readOnly />
                                        </div>
                                        <div className="col-md-2 d-flex flex-column justify-content-end">
                                            <label className="form-label fw-bold text-dark">Type Of Visit</label>
                                            <input 
                                                type="text" 
                                                name="typeOfVisit"
                                                className="form-control form-control-sm"
                                                value={formData.typeOfVisit}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    

                                        <div className="col-12 d-flex flex-wrap align-items-center">
                                            {['Regn Ch.', 'Proff Ch.', 'Svr Ch.', 'P Disc%', 'Proff Disc', 'SrvCh Disc', 'Bill Amt'].map((label, idx) => (
                                                <div key={idx} className="d-flex align-items-center me-3 mb-2">
                                                    <label className="form-label fw-bold mb-0 me-2 text-dark">
                                                        {label}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name={['regnCh', 'proffCh', 'svrCh', 'pDisc', 'proffDisc', 'srvChDisc', 'billAmt'][idx]}
                                                        className="form-control form-control-sm"
                                                        style={{ width: 60 }}
                                                        value={formData[['regnCh', 'proffCh', 'svrCh', 'pDisc', 'proffDisc', 'srvChDisc', 'billAmt'][idx]]}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label fw-bold text-dark">Narration</label>
                                            <input 
                                                type="text" 
                                                name="narration"
                                                className="form-control form-control-sm"
                                                value={formData.narration}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cheque Detail */}
                        <div className="col-lg-12">
                            <div className="card cheque-card mb-3">
                                <div className="card-header text-white" style={{ background: 'linear-gradient(90deg, #3A50A0 70%, #788DCE 100%)', padding: '0.5rem 1rem' }}>
                                    <h5 className="card-title mb-0 text-white">Cheque Detail</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row gy-3 gx-2">
                                        <div className="col-lg-7 col-md-12 d-flex flex-wrap align-items-center">
                                            <div className="d-flex align-items-center me-3 mb-2">
                                                <label className="form-label fw-bold me-2 text-dark mb-0 text-nowrap">Receipt Amount</label>
                                                <input 
                                                    type="text" 
                                                    name="receiptAmount"
                                                    className="form-control form-control-sm" 
                                                    style={{ width: 70 }} 
                                                    value={formData.receiptAmount}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="d-flex align-items-center me-3 mb-2">
                                                <label className="form-label fw-bold me-2 text-dark mb-0 text-nowrap">Due Amount</label>
                                                <input 
                                                    type="text" 
                                                    name="dueAmount"
                                                    className="form-control form-control-sm" 
                                                    style={{ width: 70 }} 
                                                    value={formData.dueAmount}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="d-flex align-items-center me-3 mb-2">
                                                <label className="form-label fw-bold me-2 text-dark mb-0 text-nowrap">Receipt Type</label>
                                                <select 
                                                    name="receiptType"
                                                    className="form-select form-select-sm" 
                                                    style={{ width: 100 }}
                                                    value={formData.receiptType}
                                                    onChange={handleChange}
                                                >
                                                    <option value="CASH">CASH</option>
                                                    <option value="CHEQUE">CHEQUE</option>
                                                    <option value="CARD">CARD</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-5 col-md-12 d-flex flex-wrap align-items-center">
                                            <div className="d-flex align-items-center me-3 mb-2">
                                                <label className="form-label fw-bold me-2 text-dark mb-0 text-nowrap">Final Receipt Amt</label>
                                                <input 
                                                    type="text" 
                                                    name="finalReceiptAmt"
                                                    className="form-control form-control-sm" 
                                                    style={{ width: 70 }} 
                                                    value={formData.finalReceiptAmt}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 d-flex flex-wrap align-items-center">
                                            <div className="d-flex align-items-center me-3 mb-2">
                                                <label className="form-label fw-bold me-2 text-dark mb-0">Bank Name</label>
                                                <input 
                                                    type="text" 
                                                    name="bankName"
                                                    className="form-control form-control-sm" 
                                                    style={{ width: 140 }}
                                                    value={formData.bankName}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="d-flex align-items-center me-3 mb-2">
                                                <label className="form-label fw-bold me-2 text-dark mb-0 text-nowrap">Cheque / CARD</label>
                                                <input 
                                                    type="text" 
                                                    name="CardNo"
                                                    className="form-control form-control-sm" 
                                                    style={{ width: 120 }}
                                                    value={formData.CardNo}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Assistant Details */}
                        <div className="col-lg-12">
                            <div className="card assistant-card mb-3">
                                <div className="card-header text-white" style={{ background: 'linear-gradient(90deg, #3A50A0 70%, #788DCE 100%)', padding: '0.5rem 1rem' }}>
                                    <h5 className="card-title mb-0 text-white">Assistant Details</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row gy-3">
                                        <div className="col-12 d-flex flex-wrap align-items-center">
                                            <div className="d-flex align-items-center me-4 mb-2">
                                                <label className="form-label fw-bold me-2 text-dark mb-0" style={{ minWidth: '80px' }}>
                                                    1st Assist
                                                </label>
                                                <input
                                                    type="text"
                                                    name="firstAssist"
                                                    className="form-control form-control-sm me-2"
                                                    style={{ width: 40 }}
                                                    value={formData.firstAssist}
                                                    onChange={handleChange}
                                                />
                                                <input
                                                    type="text"
                                                    name="firstAssistName"
                                                    className="form-control form-control-sm"
                                                    style={{ minWidth: 220 }}
                                                    value={formData.firstAssistName}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="d-flex align-items-center me-4 mb-2">
                                                <label className="form-label fw-bold me-2 text-dark mb-0" style={{ minWidth: '80px' }}>
                                                    2nd Assist
                                                </label>
                                                <input
                                                    type="text"
                                                    name="secondAssist"
                                                    className="form-control form-control-sm me-2"
                                                    style={{ width: 40 }}
                                                    value={formData.secondAssist}
                                                    onChange={handleChange}
                                                />
                                                <input
                                                    type="text"
                                                    name="secondAssistName"
                                                    className="form-control form-control-sm"
                                                    style={{ minWidth: 220 }}
                                                    value={formData.secondAssistName}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="d-flex align-items-center me-4 mb-2">
                                                <label className="form-label fw-bold me-2 text-dark mb-0" style={{ minWidth: '80px' }}>
                                                    3rd Assist
                                                </label>
                                                <input
                                                    type="text"
                                                    name="thirdAssist"
                                                    className="form-control form-control-sm me-2"
                                                    style={{ width: 40 }}
                                                    value={formData.thirdAssist}
                                                    onChange={handleChange}
                                                />
                                                <input
                                                    type="text"
                                                    name="thirdAssistName"
                                                    className="form-control form-control-sm"
                                                    style={{ minWidth: 220 }}
                                                    value={formData.thirdAssistName}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

















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











