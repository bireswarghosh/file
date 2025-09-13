import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';
import axiosInstance from '../../../../axiosInstance';

const OutdoorVisitDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { mode, patientData } = location.state || {};
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [religions, setReligions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [departmentName, setDepartmentName] = useState('');
  const [paymentMethods, setPaymentMethods] = useState([{
    type: '0', // 0=Cash, 1=UPI, 2=Cheque
    amount: '',
    upiApp: '',
    utrNumber: '',
    bankName: '',
    chequeNumber: ''
  }]);
  const [formData, setFormData] = useState({
    // Booking fields
    Booking: 'N',
    RegistrationDate: new Date().toISOString().split('T')[0],
    RegistrationTime: new Date().toTimeString().slice(0, 5),
    quota: false,
    queueNo: 0,
    // Registration fields
    OPD: '',
    PatientName: '',
    PhoneNo: '',
    RegistrationId: '',
    registrationNo: '',
    // Patient fields
    PPr: '',
    GurdianName: '',
    CareOf: '',
    Sex: '',
    MStatus: '',
    dob: '',
    Age: '',
    AgeD: '', // months
    AgeN: '', // days
    Add1: '',
    Add2: '',
    Add3: '',
    fullAddress: '',
    email: '',
    ReligionId: '',
    Weight: '',
    Height: '',
    BpMin: '',
    BpMax: '',
    BloodGroup: '',
    Company: '',
    emergencyContact: '',
    // Doctor fields
    DepartmentId: '',
    doctorId: '',
    dept: '',
    docName: '',
    // Billing fields
    billNo: '',
    OutBillDate: new Date().toISOString().split('T')[0],
    RegistrationTime: new Date().toTimeString().slice(0, 5),
    RegCh: '0.00',
    proffCh: '0.00',
    svrCh: '0.00',
    pDisc: '0.00',
    proffDisc: '0.00',
    srvChDisc: '0.00',
    billAmt: '0.00',
    narration: '',
    // Payment fields
    receiptAmount: '',
    dueamt: '',
    receiptType: 'CASH',
    paidamt: '',
    bankName: '',
    chequeCard: '',
    PolcNo: '',
    CCNNo: '',
    CardNo: ''
  });

  // Fetch religions and departments on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Fetch religions
        const religionResponse = await axiosInstance.get('/religion', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (religionResponse.data && religionResponse.data.success) {
          setReligions(religionResponse.data.data || []);
        }
        
        // Fetch departments
        const deptResponse = await axiosInstance.get('/speciality', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (deptResponse.data && deptResponse.data.success) {
          setDepartments(deptResponse.data.data || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Fetch existing data if in view/edit mode
  useEffect(() => {
    if (id || patientData) {
      loadPatientData();
    }
  }, [id, patientData]);

  const loadPatientData = async () => {
    setIsLoading(true);
    try {
      let data;
      if (patientData) {
        data = patientData;
      } else if (id) {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get(`/outdoor-visit-entry/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        data = response.data.data;
       
      }

      console.log("Fetched data  ", data);

      if (data) {
        const token = localStorage.getItem('token');
        let doctorName = '';
        
        // Fetch doctor and department details from outdoorbillmst table
        if (data.outdoorbills?.[0]) {
          const billData = data.outdoorbills[0];
          
          // Fetch doctor name if DoctorId exists
          if (billData.DoctorId) {
            try {
              const doctorResponse = await axiosInstance.get(`/doctormaster/${billData.DoctorId}`, {
                headers: { Authorization: `Bearer ${token}` }
              });
              if (doctorResponse.data && doctorResponse.data.success) {
                doctorName = doctorResponse.data.data.Doctor;
              }
            } catch (error) {
              console.error('Error fetching doctor details:', error);
            }
          }
          
          // Fetch department name and doctors if department exists
          if (billData.department) {
            try {
              // Fetch department name
              const deptResponse = await axiosInstance.get(`/speciality/${billData.department}`, {
                headers: { Authorization: `Bearer ${token}` }
              });
              if (deptResponse.data && deptResponse.data.success) {
                setDepartmentName(deptResponse.data.data.Speciality);
              }
              
              // Fetch doctors for the department
              const doctorsResponse = await axiosInstance.get(`/doctormaster/department/${billData.department}`, {
                headers: { Authorization: `Bearer ${token}` }
              });
              if (doctorsResponse.data && doctorsResponse.data.success) {
                setDoctors(doctorsResponse.data.data || []);
              }
            } catch (error) {
              console.error('Error fetching department details:', error);
            }
          }
        }
        
        setFormData({
          // Booking fields
          Booking: data.Booking || 'N',
          RegistrationDate: data.RegistrationDate ? new Date(data.RegistrationDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          RegistrationTime: data.RegistrationTime || new Date().toTimeString().slice(0, 5),
          quota: data.quota || false,
          queueNo: data.queueNo || 0,
          // Registration fields
          OPD: data.OPD || 'N',
          PatientName: data.PatientName || '',
          PhoneNo: data.PhoneNo || '',
          RegistrationId: data.RegistrationId || '',
          registrationNo: data.registrationNo || '',
          // Patient fields
          PPr: data.PPr || '',
          GurdianName: data.GurdianName || '',
          CareOf: data.CareOf || '',
          Sex: data.Sex || '',
          MStatus: data.MStatus || '',
          dob: data.Dob ? new Date(data.Dob).toISOString().split('T')[0] : '',
          Age: data.Age?.toString() || '',
          AgeD: data.AgeD?.toString() || '',
          AgeN: data.AgeN?.toString() || '',
          Add1: data.Add1 || '',
          Add2: data.Add2 || '',
          Add3: data.Add3 || '',
          fullAddress: data.Add1 || '',
          email: data.EMailId || '',
          ReligionId: data.ReligionId?.toString() || '',
          Weight: data.Weight?.toString() || '',
          Height: data.Height?.toString() || '',
          BpMin: data.bpmin?.toString() || '',
          BpMax: data.bpmax?.toString() || '',
          BloodGroup: data.BloodGroup || '',
          Company: data.Company || '',
          emergencyContact: data.emergencyContact || '',
          // Doctor fields (from first bill if exists)
          ...(data.outdoorbills?.[0] && {
            DepartmentId: data.outdoorbills[0].department?.toString() || '',
            doctorId: data.outdoorbills[0].DoctorId?.toString() || '',
            docName: doctorName,
            // Billing fields
            billNo: data.outdoorbills[0].OutBillId || '',
            OutBillDate: data.outdoorbills[0].OutBillDate ? new Date(data.outdoorbills[0].OutBillDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            RegistrationTime: data.outdoorbills[0].RegistrationTime || new Date().toTimeString().slice(0, 5),
            RegCh: data.outdoorbills[0].RegCh?.toString() || '0.00',
            proffCh: data.outdoorbills[0].ProfCh?.toString() || '0.00',
            svrCh: data.outdoorbills[0].ServiceCh?.toString() || '0.00',
            pDisc: data.outdoorbills[0].pDisc?.toString() || '0.00',
            proffDisc: data.outdoorbills[0].proffDisc?.toString() || '0.00',
            srvChDisc: data.outdoorbills[0].srvChDisc?.toString() || '0.00',
            billAmt: data.outdoorbills[0].Amount?.toString() || '0.00',
            narration: data.outdoorbills[0].narration || '',
            dueamt: data.outdoorbills[0].dueamt?.toString() || '',
            paidamt: data.outdoorbills[0].paidamt?.toString() || ''
          })
        });
        
        // Load existing payment methods from bill data
        if (data.outdoorbills?.[0]) {
          const bill = data.outdoorbills[0];
          console.log('Bill data for payment methods:', bill);
          const existingPayments = [];
          
          // Create payment method from existing data
          if (bill.paidamt && parseFloat(bill.paidamt) > 0) {
            const paymentMethod = {
              type: bill.PaymentType?.toString() || '0',
              amount: bill.paidamt?.toString() || '',
              upiApp: bill.PaymentType === 1 ? (bill.BANK || '') : '',
              utrNumber: bill.PaymentType === 1 ? (bill.Cheque || '') : '',
              bankName: bill.PaymentType === 2 ? (bill.BANK || '') : '',
              chequeNumber: bill.PaymentType === 2 ? (bill.Cheque || '') : ''
            };
            console.log('Created payment method:', paymentMethod);
            existingPayments.push(paymentMethod);
          }
          
          // Set payment methods or default
          if (existingPayments.length > 0) {
            setPaymentMethods(existingPayments);
          }
        }
      }
    } catch (error) {
      console.error('Error loading patient data:', error);
      alert('Error loading patient data');
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-calculate DOB when age fields change
  useEffect(() => {
    const years = parseInt(formData.Age) || 0;
    const months = parseInt(formData.AgeD) || 0;
    const days = parseInt(formData.AgeN) || 0;
    
    if ((years || months || days) && !formData.dob) {
      const regDate = new Date(formData.RegistrationDate);
      const birthDate = new Date(regDate);
      birthDate.setFullYear(birthDate.getFullYear() - years);
      birthDate.setMonth(birthDate.getMonth() - months);
      birthDate.setDate(birthDate.getDate() - days);
      const dobString = birthDate.toISOString().split('T')[0];
      setFormData(prev => ({ ...prev, dob: dobString }));
    }
  }, [formData.Age, formData.AgeD, formData.AgeN, formData.RegistrationDate]);

  // Auto-calculate age when DOB changes
  const handleDobChange = (value) => {
    if (value) {
      const birthDate = new Date(value);
      const regDate = new Date(formData.RegistrationDate);
      
      let years = regDate.getFullYear() - birthDate.getFullYear();
      let months = regDate.getMonth() - birthDate.getMonth();
      let days = regDate.getDate() - birthDate.getDate();
      
      if (days < 0) {
        months--;
        const lastMonth = new Date(regDate.getFullYear(), regDate.getMonth(), 0);
        days += lastMonth.getDate();
      }
      
      if (months < 0) {
        years--;
        months += 12;
      }
      
      setFormData(prev => ({
        ...prev,
        dob: value,
        Age: years.toString(),
        AgeD: months.toString(),
        AgeN: days.toString()
      }));
    }
  };

  // Format date to DD/MM/YYYY
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Convert 12-hour format to 24-hour format for time input
  const convertTo24Hour = (time12h) => {
    if (!time12h) return '';
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
      hours = '00';
    }
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
    return `${String(hours).padStart(2, '0')}:${minutes}`;
  };

  // Payment Methods Functions
  const addPaymentMethod = () => {
    setPaymentMethods([...paymentMethods, {
      type: '0',
      amount: '',
      upiApp: '',
      utrNumber: '',
      bankName: '',
      chequeNumber: ''
    }]);
  };

  const removePaymentMethod = (index) => {
    const newMethods = paymentMethods.filter((_, i) => i !== index);
    setPaymentMethods(newMethods);
  };

  const updatePaymentMethod = (index, field, value) => {
    const newMethods = [...paymentMethods];
    newMethods[index][field] = value;
    setPaymentMethods(newMethods);
  };

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    
    // Fetch doctors when department changes
    if (name === 'DepartmentId' && value) {
      try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get(`/doctormaster/department/${value}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data && response.data.success) {
          setDoctors(response.data.data || []);
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setDoctors([]);
      }
    }
    
    // Update doctor name when doctor is selected
    if (name === 'doctorId' && value) {
      const selectedDoctor = doctors.find(doc => doc.DoctorId.toString() === value);
      if (selectedDoctor) {
        setFormData(prev => ({ ...prev, docName: selectedDoctor.Doctor }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const patientData = {
        PatientName: formData.PatientName?.trim(),
        PhoneNo: formData.PhoneNo?.trim(),
        Add1: formData.Add1 || '',
        Add2: formData.Add2 || '',
        Add3: formData.Add3 || '',
        Age: formData.Age || '0',
        AgeD: formData.AgeD ? parseInt(formData.AgeD) : null,
        AgeN: formData.AgeN ? parseInt(formData.AgeN) : null,
        Sex: formData.Sex || '',
        MStatus: formData.MStatus || '',
        PPr: formData.PPr || '',
        CareOf: formData.CareOf || '',
        GurdianName: formData.GurdianName || '',
        ReligionId: formData.ReligionId ? parseInt(formData.ReligionId) : null,
        Weight: formData.Weight || '',
        Height: formData.Height || '',
        BloodGroup: formData.BloodGroup || '',
        bpmin: parseFloat(formData.BpMin) || null,
        bpmax: parseFloat(formData.BpMax) || null,
        Dob: formData.dob ? new Date(formData.dob).toISOString() : null,
        EMailId: formData.email || ''
      };
      
      const billData = {
        BillAmt: parseFloat(formData.billAmt) || 0,
        DoctorId: formData.doctorId ? parseInt(formData.doctorId) : null,
        department: formData.DepartmentId ? parseInt(formData.DepartmentId) : null,
        narration: formData.narration || '',
        RegCh: parseFloat(formData.RegCh) || 0,
        proffCh: parseFloat(formData.proffCh) || 0,
        svrCh: parseFloat(formData.svrCh) || 0,
        pDisc: parseFloat(formData.pDisc) || 0,
        proffDisc: parseFloat(formData.proffDisc) || 0,
        srvChDisc: parseFloat(formData.srvChDisc) || 0
      };
      
      const dataToSubmit = {
        action: mode === 'edit' ? 'UPDATE' : 'CREATE',
        patientData,
        billData
      };
      
      console.log('Mode:', mode, 'ID:', id, 'RegistrationId:', formData.RegistrationId);
      
      const patientId = id || formData.RegistrationId;
      
      let response;
      if (mode === 'edit' && patientId) {
        console.log('Making PUT request to:', `/outdoor-visit-entry/${patientId}`);
        response = await axiosInstance.put(`/outdoor-visit-entry/${patientId}`, dataToSubmit);
      } else {
        console.log('Making POST request to:', '/outdoor-visit-entry');
        response = await axiosInstance.post('/outdoor-visit-entry', dataToSubmit);
      }
      
      if (response.data && response.data.success) {
        alert(`${mode === 'edit' ? 'Updated' : 'Created'} successfully!`);
        navigate('/table-data');
      } else {
        alert(response.data?.message || 'Operation failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.response?.data?.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Outdoor Visit Entry - Detail" />
      <div className="container-fluid py-4">
        <div className="card shadow-lg border-0 rounded-4 bg-white">
          
          {/* Header */}
          <div className="card-header pb-0 border-bottom-0">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-1">
                  {mode === 'view' ? 'View Patient Details' : mode === 'edit' ? 'Edit Patient Registration' : 'New Patient Registration'}
                </h5>
                <p className="text-muted mb-0">
                  {mode === 'view' ? 'Patient information (Read Only)' : mode === 'edit' ? 'Update patient information' : 'Create new patient registration'}
                </p>
              </div>
              <button className="btn btn-outline-secondary" onClick={() => navigate('/table-data')}>
                ← Back to List
              </button>
            </div>
          </div>

          <div className="card-body p-4">
            {isLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading patient data...</p>
              </div>
            ) : (
            <>
            {/* Booking Detail */}
            <h5 className="text-primary fw-bold mb-3">Booking Information</h5>
            <div className="row g-3">
              <div className="col-md-2">
                <label>Advance Booking</label>
                <select name="Booking" className="form-control" value={formData.Booking} onChange={handleChange}>
                  <option value="N">No</option>
                  <option value="Y">Yes</option>
                </select>
              </div>
              <div className="col-md-2">
                <label>Visit Date</label>
                <input type="date" name="RegistrationDate" className="form-control" 
                       value={formData.RegistrationDate} onChange={handleChange} />
              </div>
              <div className="col-md-2">
                <label>Visit Time</label>
                {console.log('RegistrationTime value:', formData.RegistrationTime)}
                {console.log('Converted time:', convertTo24Hour(formData.RegistrationTime))}
                <input type="time" name="RegistrationTime" className="form-control" 
                       value={convertTo24Hour(formData.RegistrationTime)} onChange={handleChange} />
              </div>
              <div className="col-md-2">
                <label>Quota</label>
                <div className="form-check">
                  <input type="checkbox" name="quota" className="form-check-input" 
                         checked={formData.quota} onChange={handleChange} />
                  <label className="form-check-label">Enable</label>
                </div>
              </div>
              <div className="col-md-2">
                <label>Queue No.</label>
                <input type="number" name="queueNo" className="form-control" 
                       value={formData.queueNo} onChange={handleChange} readOnly />
              </div>
            </div>

            {/* Registration Detail */}
            <hr className="my-4" />
            <h5 className="text-primary fw-bold mb-3">Registration Detail</h5>
            <div className="row g-3">
              <div className="col-md-3">
                <label>Registration Type</label>
                <select name="OPD" className="form-control" value={formData.OPD} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Y">New Registration</option>
                  <option value="N">Existing Patient</option>
                </select>
              </div>
              <div className="col-md-3">
                <label>Patient Name</label>
                <input name="PatientName" className="form-control" 
                       value={formData.PatientName} onChange={handleChange} 
                       style={{textTransform: 'uppercase'}} disabled={mode === 'view'} />
              </div>
              <div className="col-md-3">
                <label>Phone Number</label>
                <input name="PhoneNo" className="form-control" maxLength="10"
                       value={formData.PhoneNo} onChange={handleChange} placeholder="Enter phone number" />
              </div>
              <div className="col-md-3">
                <label>Registration No</label>
                <input className="form-control" value={formData.RegistrationId || 'Auto-generated'} readOnly />
              </div>
            </div>

            {/* Patient Detail */}
            <hr className="my-4" />
            <h5 className="text-primary fw-bold mb-3">Patient Detail</h5>
            <div className="row g-3">
              <div className="col-md-2">
                <label>Prefix</label>
                <select name="PPr" className="form-control" value={formData.PPr} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Dr.">Dr.</option>
                </select>
              </div>
              <div className="col-md-3">
                <label>Guardian Name</label>
                <input name="GurdianName" className="form-control" style={{textTransform: 'uppercase'}}
                       value={formData.GurdianName} onChange={handleChange} />
              </div>
              <div className="col-md-2">
                <label>Care Of</label>
                <select name="CareOf" className="form-control" value={formData.CareOf} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Father">Father</option>
                  <option value="Husband">Husband</option>
                  <option value="Mother">Mother</option>
                  <option value="Wife">Wife</option>
                  <option value="Son">Son</option>
                  <option value="Daughter">Daughter</option>
                  <option value="W/O">W/O</option>
                  <option value="S/O">S/O</option>
                  <option value="D/O">D/O</option>
                </select>
              </div>
              <div className="col-md-2">
                <label>Gender</label>
                <select name="Sex" className="form-control" value={formData.Sex} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="M">MALE</option>
                  <option value="F">FEMALE</option>
                  <option value="O">OTHER</option>
                </select>
              </div>
              <div className="col-md-2">
                <label>Marital Status</label>
                <select name="MStatus" className="form-control" value={formData.MStatus} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="M">MARRIED</option>
                  <option value="U">UNMARRIED</option>
                  <option value="D">DIVORCED</option>
                  <option value="W">WIDOWED</option>
                </select>
              </div>
              <div className="col-md-1">
                <label>Patient ID</label>
                <div className="text-center p-2 border rounded">
                  <small>{formData.RegistrationId || 'Auto-gen'}</small>
                </div>
              </div>

              {/* DOB & Age Row */}
              <div className="col-md-3">
                <label>Date of Birth</label>
                <input type="date" name="dob" className="form-control" 
                       value={formData.dob} onChange={(e) => handleDobChange(e.target.value)} />
                {formData.dob && <small className="text-muted">{formatDate(formData.dob)}</small>}
              </div>
              <div className="col-md-2">
                <label>Age (Years)</label>
                <input type="number" name="Age" className="form-control" 
                       value={formData.Age} onChange={(e) => {
                         const years = parseInt(e.target.value) || 0;
                         const months = parseInt(formData.AgeD) || 0;
                         const days = parseInt(formData.AgeN) || 0;
                         
                         const regDate = new Date(formData.RegistrationDate);
                         const birthDate = new Date(regDate);
                         birthDate.setFullYear(birthDate.getFullYear() - years);
                         birthDate.setMonth(birthDate.getMonth() - months);
                         birthDate.setDate(birthDate.getDate() - days);
                         const dobString = birthDate.toISOString().split('T')[0];
                         
                         setFormData(prev => ({ ...prev, Age: e.target.value, dob: dobString }));
                       }} />
              </div>
              <div className="col-md-2">
                <label>Months</label>
                <input type="number" name="AgeD" className="form-control" 
                       value={formData.AgeD} onChange={(e) => {
                         const years = parseInt(formData.Age) || 0;
                         const months = parseInt(e.target.value) || 0;
                         const days = parseInt(formData.AgeN) || 0;
                         
                         const regDate = new Date(formData.RegistrationDate);
                         const birthDate = new Date(regDate);
                         birthDate.setFullYear(birthDate.getFullYear() - years);
                         birthDate.setMonth(birthDate.getMonth() - months);
                         birthDate.setDate(birthDate.getDate() - days);
                         const dobString = birthDate.toISOString().split('T')[0];
                         
                         setFormData(prev => ({ ...prev, AgeD: e.target.value, dob: dobString }));
                       }} />
              </div>
              <div className="col-md-2">
                <label>Days</label>
                <input type="number" name="AgeN" className="form-control" 
                       value={formData.AgeN} onChange={(e) => {
                         const years = parseInt(formData.Age) || 0;
                         const months = parseInt(formData.AgeD) || 0;
                         const days = parseInt(e.target.value) || 0;
                         
                         const regDate = new Date(formData.RegistrationDate);
                         const birthDate = new Date(regDate);
                         birthDate.setFullYear(birthDate.getFullYear() - years);
                         birthDate.setMonth(birthDate.getMonth() - months);
                         birthDate.setDate(birthDate.getDate() - days);
                         const dobString = birthDate.toISOString().split('T')[0];
                         
                         setFormData(prev => ({ ...prev, AgeN: e.target.value, dob: dobString }));
                       }} />
              </div>
              <div className="col-md-3">
                <label>Weight (kg)</label>
                <input name="Weight" className="form-control" 
                       value={formData.Weight} onChange={handleChange} />
              </div>

              {/* Physical Measurements */}
              <div className="col-md-3">
                <label>Height (cm)</label>
                <input name="Height" className="form-control" 
                       value={formData.Height} onChange={handleChange} />
              </div>
              <div className="col-md-2">
                <label>BP Max</label>
                <input name="BpMax" className="form-control" 
                       value={formData.BpMax} onChange={handleChange} placeholder="120" />
              </div>
              <div className="col-md-2">
                <label>BP Min</label>
                <input name="BpMin" className="form-control" 
                       value={formData.BpMin} onChange={handleChange} placeholder="80" />
              </div>
              <div className="col-md-2">
                <label>Blood Group</label>
                <select name="BloodGroup" className="form-control" value={formData.BloodGroup} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              {/* Address & Contact */}
              <div className="col-md-12">
                <label>Complete Address</label>
                <textarea name="fullAddress" className="form-control" rows="2"
                          value={formData.fullAddress} onChange={handleChange} 
                          placeholder="Enter complete address" />
              </div>
              
              <div className="col-md-3">
                <label>Religion</label>
                <select name="ReligionId" className="form-control" value={formData.ReligionId} onChange={handleChange}>
                  <option value="">Select Religion</option>
                  {religions.map(religion => (
                    <option key={religion.ReligionId} value={religion.ReligionId}>
                      {religion.Religion}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-3">
                <label>Email Address</label>
                <input type="email" name="email" className="form-control" 
                       value={formData.email} onChange={handleChange} />
              </div>
              {/* <div className="col-md-3">
                <label>Insurance/Company</label>
                <select name="Company" className="form-control" value={formData.Company} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="N">No Insurance</option>
                  <option value="Y">Has Insurance</option>
                </select>
              </div> */}


              {/* <div className="col-md-3">
                <label>Emergency Contact</label>
                <input name="emergencyContact" className="form-control" 
                       value={formData.emergencyContact} onChange={handleChange} />
              </div> */}

              
            </div>

            {/* Doctor & Department */}
            <hr className="my-4" />
            <h5 className="text-primary fw-bold mb-3">Doctor & Department Selection</h5>
            <div className="row g-3">
              <div className="col-md-4">
                <label>Department</label>
                {mode === 'view' ? (
                  <input className="form-control" value={departmentName} readOnly />
                ) : (
                  <select name="DepartmentId" className="form-control" value={formData.DepartmentId} onChange={handleChange}>
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept.SpecialityId} value={dept.SpecialityId}>
                        {dept.Speciality}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="col-md-4">
                <label>Doctor</label>
                {mode === 'view' ? (
                  <input className="form-control" value={formData.docName} readOnly />
                ) : (
                  <select name="doctorId" className="form-control" value={formData.doctorId} onChange={handleChange}>
                    <option value="">Select Doctor</option>
                    {doctors.map(doctor => (
                      <option key={doctor.DoctorId} value={doctor.DoctorId}>
                        {doctor.Doctor}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="col-md-4">
                <label>Doctor Name</label>
                <input name="docName" className="form-control" 
                       value={formData.docName} onChange={handleChange} readOnly />
              </div>
            </div>






            {/* Billing Details */}
            <hr className="my-4" />
            <h5 className="text-primary fw-bold mb-3">Billing Information</h5>
            <div className="row g-3">
              <div className="col-md-3">
                <label>Bill No</label>
                <input name="billNo" className="form-control" 
                       value={formData.billNo} onChange={handleChange} readOnly />
              </div>
              <div className="col-md-2">
                <label>Bill Date</label>
                <input type="date" name="OutBillDate" className="form-control" 
                       value={formData.OutBillDate} onChange={handleChange} />
              </div>
              <div className="col-md-2">
                <label>Bill Time</label>
                <input type="time" name="RegistrationTime" className="form-control" 
                       value={formData.RegistrationTime} onChange={handleChange} />
              </div>
              <div className="col-md-2">
                <label>Registration Charge </label>
             
                <input type="number" name="RegCh" className="form-control" 
                       value={formData.RegCh} onChange={handleChange} />
              </div>
              <div className="col-md-2">
                <label>Professional Charge</label>
                <input type="number" name="proffCh" className="form-control" 
                       value={formData.proffCh} onChange={handleChange} />
              </div>
              <div className="col-md-2">
                <label>Service Charge</label>
                <input type="number" name="svrCh" className="form-control" 
                       value={formData.svrCh} onChange={handleChange} />
              </div>
              <div className="col-md-2">
                <label>Patient Discount (%)</label>
                <input type="number" name="pDisc" className="form-control" 
                       value={formData.pDisc} onChange={handleChange} />
              </div>
              <div className="col-md-2">
                <label>Professional Discount</label>
                <input type="number" name="proffDisc" className="form-control" 
                       value={formData.proffDisc} onChange={handleChange} />
              </div>
              <div className="col-md-2">
                <label>Service Discount</label>
                <input type="number" name="srvChDisc" className="form-control" 
                       value={formData.srvChDisc} onChange={handleChange} />
              </div>
              <div className="col-md-2">
                <label>Total Bill Amount</label>
                <input type="number" name="billAmt" className="form-control" 
                       value={formData.billAmt} onChange={handleChange}  />
              </div>
              <div className="col-md-12">
                <label>Narration</label>
                <textarea name="narration" className="form-control" rows="2"
                          value={formData.narration} onChange={handleChange} 
                          placeholder="Enter billing notes" />
              </div>
            </div>

            {/* Payment Details */}
            <hr className="my-4" />
            <h5 className="text-primary fw-bold mb-3">Payment Information</h5>
            
            {/* Payment Summary */}
            <div className="row g-3 mb-3">
              <div className="col-md-3">
                <label>Total Bill Amount</label>
                <input type="number" className="form-control" value={formData.billAmt} readOnly />
              </div>
              <div className="col-md-3">
                <label>Total Paid Amount</label>
                <input type="number" className="form-control" value={paymentMethods.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0)} readOnly />
              </div>
              <div className="col-md-3">
                <label>Due Amount</label>
                <input type="number" className="form-control" value={parseFloat(formData.billAmt || 0) - paymentMethods.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0)} readOnly />
              </div>
              <div className="col-md-3">
                <button type="button" className="btn btn-success mt-4" onClick={addPaymentMethod}>
                  + Add Payment Method
                </button>
              </div>
            </div>

            {/* Multiple Payment Methods */}
            {paymentMethods.map((payment, index) => (
              <div key={index} className="card mb-3 border-primary">
                <div className="card-header bg-light d-flex justify-content-between align-items-center">
                  <h6 className="mb-0">Payment Method #{index + 1}</h6>
                  {paymentMethods.length > 1 && (
                    <button type="button" className="btn btn-sm btn-danger" onClick={() => removePaymentMethod(index)}>
                      Remove
                    </button>
                  )}
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-2">
                      <label>Payment Type</label>
                      <select className="form-control" value={payment.type} onChange={(e) => updatePaymentMethod(index, 'type', e.target.value)}>
                        <option value="0">CASH</option>
                        <option value="1">UPI/PHONE PE</option>
                        <option value="2">CHEQUE</option>
                      </select>
                    </div>
                    <div className="col-md-2">
                      <label>Amount</label>
                      <input type="number" className="form-control" value={payment.amount} 
                             onChange={(e) => updatePaymentMethod(index, 'amount', e.target.value)} />
                    </div>
                    
                    {/* Conditional fields based on payment type */}
                    {payment.type === '1' && (
                      <>
                        <div className="col-md-2">
                          <label>UPI App</label>
                          <input className="form-control" value={payment.upiApp} placeholder="PHONE PE - RAHUL BAR"
                                 onChange={(e) => updatePaymentMethod(index, 'upiApp', e.target.value)} />
                        </div>
                        <div className="col-md-2">
                          <label>UTR Number</label>
                          <input className="form-control" value={payment.utrNumber} placeholder="211839452746"
                                 onChange={(e) => updatePaymentMethod(index, 'utrNumber', e.target.value)} />
                        </div>
                      </>
                    )}
                    
                    {payment.type === '2' && (
                      <>
                        <div className="col-md-2">
                          <label>Bank Name</label>
                        
                          <input className="form-control" value={payment.bankName} 
                                 onChange={(e) => updatePaymentMethod(index, 'bankName', e.target.value)} />
                        </div>
                        <div className="col-md-2">
                          <label>Cheque Number</label>
                          <input className="form-control" value={payment.chequeNumber} 
                                 onChange={(e) => updatePaymentMethod(index, 'chequeNumber', e.target.value)} />
                        </div>
                      </>
                    )}
                    
                    {payment.type === '0' && (
                      <div className="col-md-4">
                        <label>Cash Payment</label>
                        <input className="form-control" value="Cash Payment" readOnly />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Action Buttons */}
            <hr className="my-4" />
            <div className="text-end">
              <button 
                type="button" 
                className="btn btn-secondary me-2" 
                onClick={() => navigate('/table-data')}
              >
                Cancel
              </button>
              {mode !== 'view' && (
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                >
                  {isSubmitting ? 'Processing...' : mode === 'edit' ? 'Update' : 'Save'}
                </button>
              )}
            </div>
            </>
            )}
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default OutdoorVisitDetail;