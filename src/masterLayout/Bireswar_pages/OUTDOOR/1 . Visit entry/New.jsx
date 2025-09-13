import React, { useState, useEffect } from "react";
import { Form, Card, Row, Col, Button, Badge } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import MasterLayout from "../../../MasterLayout";
import Breadcrumb from "../../../Breadcrumb";
import DoctorSelect from "./DoctorSelect";
import PatientDetailsCard from "./PatientDetailsCard";
import DoctorDetailsCard from "./DoctorDetailsCard";
import BillingDetailsCard from "./BillingDetailsCard";
import PaymentDetailsCard from "./PaymentDetailsCard";
import CollapsibleForm from "./CollapsibleForm";
import PatientSearchModal from "./PatientSearchModal";
import QuickSearch from "./QuickSearch";
import axiosInstance from "../../../../axiosInstance";
import './OutdoorBooking.css';



const New = ({ initialData, onSubmit, isEdit }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mode, patientData, isReadOnly } = location.state || {};
  // Get current date in YYYY-MM-DD format for date inputs
  const today = new Date().toISOString().split('T')[0];
  // Get current time in HH:MM format for time inputs
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  // Initialize form data with passed patient data or defaults
  const initializeFormData = () => {
    if (patientData) {
      return {
        // Patient data
        PatientName: patientData.PatientName || '',
        PhoneNo: patientData.PhoneNo || '',
        Add1: patientData.Add1 || '',
        Add2: patientData.Add2 || '',
        Add3: patientData.Add3 || '',
        Age: patientData.Age?.toString() || '',
        Sex: patientData.Sex || '',
        MStatus: patientData.MStatus || '',
        PPr: patientData.PPr || '',
        CareOf: patientData.CareOf || '',
        GurdianName: patientData.GurdianName || '',
        ReligionId: patientData.ReligionId?.toString() || '',
        Weight: patientData.Weight?.toString() || '',
        Height: patientData.Height?.toString() || '',
        BpMin: patientData.bpmin?.toString() || '',
        BpMax: patientData.bpmax?.toString() || '',
        dob: patientData.Dob ? new Date(patientData.Dob).toISOString().split('T')[0] : '',
        AgeD: patientData.AgeD?.toString() || '',
        AgeN: patientData.AgeN?.toString() || '',
        email: patientData.EMailId || '',
        BloodGroup: patientData.BloodGroup || '',
        RegistrationId: patientData.RegistrationId || '',
        registrationNo: patientData.RegistrationNo || '',
        fullAddress: patientData.Add1 || '',
        // Bill data from first bill if exists
        ...(patientData.outdoorbills?.[0] && {
          OutBillId: patientData.outdoorbills[0].OutBillId,
          billNo: patientData.outdoorbills[0].OutBillNo,
          billAmt: patientData.outdoorbills[0].Amount?.toString() || '0',
          doctorId: patientData.outdoorbills[0].DoctorId?.toString() || '',
          DepartmentId: patientData.outdoorbills[0].department?.toString() || '',
          narration: patientData.outdoorbills[0].narration || '',
          regnCh: patientData.outdoorbills[0].RegCh?.toString() || '0',
          proffCh: patientData.outdoorbills[0].ProfCh?.toString() || '0',
          svrCh: patientData.outdoorbills[0].ServiceCh?.toString() || '0'
        }),
        // Set mode flags
        OPD: 'N', // Existing patient
        Booking: 'N',
        AdmitionDate: today,
        AdmitionTime: currentTime
      };
    }
    return initialData || {
    Booking: "N",
    AdmitionDate: today,
    AdmitionTime: currentTime,
    quota: false,
    queueNo: 0,
    // Status: 0,
    OPD: "",
    searchBy: "name",
    regDate: today,
    regTime: currentTime,
    registrationNo: "",
    PatientName: "",
    PhoneNo: "",
    opdNumber: "",
    GurdianName: "",  
    CareOf: "",
    dob: "",
    Age: "",
    ageMonths: "",
    ageDays: "",
    Add1: "",
    Add2: "",
    Add3: "",
    fullAddress: "",
    email: "",
    phone: "",
    ReligionId: "",
    areaPS: "",
    DepartmentId: "", // Department ID
    dept: "", // Department name
    UCDoctor1Id: "", // Doctor ID
    docName: "", // Doctor name
    cancelVisit: false,
    cancelDate: "",
    // RefDoctorId: "",
    // ReferralId: "",
    billNo: "",
    billDate: today,
    BillTime: currentTime,
    typeOfVisit: "",
    regnCh: "0.00",
    proffCh: "0.00",
    svrCh: "0.00",
    pDisc: "0.00",
    proffDisc: "0.00",
    srvChDisc: "0.00",
    billAmt: "0.00",
    narration: "",
    receiptAmount: "0.00",
    dueAmount: "0.00",
    receiptType: "CASH",
    finalReceiptAmt: "0.00",
    bankName: "",
    chequeCard: "",
    firstAssist: "N",
    firstAssistName: "",
    secondAssist: "N",
    secondAssistName: "",
    thirdAssist: "N",
    thirdAssistName: "",
    PolcNo: "",
    CCNNo: "",
    CardNo: "",
    Sex: "",
    MStatus: "",
    Company: "",
    Weight: "",
    Height: "",
    BpMin: "",
    BpMax: ""
    };
  };

  const [formData, setFormData] = useState(initializeFormData());

  // Add this state to store religions, departments and doctors
  const [religions, setReligions] = useState([]);
  const [departments, setDepartments] = useState([]);
  
  // Modal state for patient search
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  // Update the religion fetch function to include token in the request
  useEffect(() => {
    const fetchReligions = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from localStorage
        const response = await axiosInstance.get('/religion', {
          headers: {
            'Authorization': `Bearer ${token}` // Add token to this specific request
          }
        });
        
        if (response.data && response.data.success) {
          setReligions(response.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching religions:", error);
      }
    };
    
    fetchReligions();
  }, []);

  // Add department fetch function
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get('/department', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.data && response.data.success) {
          setDepartments(response.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    
    fetchDepartments();
  }, []);

  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('comfortable');
  
  // Collapsible sections state
  const [openSections, setOpenSections] = useState({
    booking: true,
    registration: false,
    patient: false,
    doctor: false,
    billing: false,
    payment: false
  });

  // Progress calculation
  const calculateProgress = () => {
    let completed = 0;
    let total = 6;
    
    if (formData.Booking && formData.AdmitionDate && formData.AdmitionTime) completed++;
    if (formData.OPD && formData.PatientName && formData.PhoneNo) completed++;
    if (formData.GurdianName && formData.Sex && formData.dob && formData.Age && formData.Weight) completed++;
    if (formData.DepartmentId && formData.doctorId) completed++;
    if (formData.billNo && formData.billAmt) completed++;
    if (formData.receiptAmount && parseFloat(formData.receiptAmount) > 0) completed++;
    
    return Math.round((completed / total) * 100);
  };

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getSectionProgress = (section) => {
    switch(section) {
      case 'booking':
        return (formData.Booking && formData.AdmitionDate && formData.AdmitionTime) ? 100 : 0;
      case 'registration':
        return (formData.OPD && formData.PatientName && formData.PhoneNo) ? 100 : 0;
      case 'patient':
        return (formData.GurdianName && formData.Sex && formData.dob && formData.Age && formData.Weight) ? 100 : 0;
      case 'doctor':
        return (formData.DepartmentId && formData.doctorId) ? 100 : 0;
      case 'billing':
        return (formData.billNo && formData.billAmt) ? 100 : 0;
      case 'payment':
        return (formData.receiptAmount && parseFloat(formData.receiptAmount) > 0) ? 100 : 0;
      default:
        return 0;
    }
  };

  const themeOptions = {
    comfortable: {
      booking: { gradient: 'linear-gradient(90deg, rgb(58, 80, 160) 70%, rgb(120, 141, 206) 100%)' },
      registration: { gradient: 'linear-gradient(90deg, rgb(58, 80, 160) 70%, rgb(120, 141, 206) 100%)' },
      patient: { gradient: 'linear-gradient(90deg, rgb(58, 80, 160) 70%, rgb(120, 141, 206) 100%)' },
      doctor: { gradient: 'linear-gradient(90deg, rgb(58, 80, 160) 70%, rgb(120, 141, 206) 100%)' },
      billing: { gradient: 'linear-gradient(90deg, rgb(58, 80, 160) 70%, rgb(120, 141, 206) 100%)' },
      payment: { gradient: 'linear-gradient(90deg, rgb(58, 80, 160) 70%, rgb(120, 141, 206) 100%)' }
    },
    default: {
      booking: { gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
      registration: { gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
      patient: { gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
      doctor: { gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
      billing: { gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
      payment: { gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' }
    },
    ocean: {
      booking: { gradient: 'linear-gradient(135deg, #2E3192 0%, #1BFFFF 100%)' },
      registration: { gradient: 'linear-gradient(135deg, #00C9FF 0%, #92FE9D 100%)' },
      patient: { gradient: 'linear-gradient(135deg, #667db6 0%, #0082c8 100%)' },
      doctor: { gradient: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)' },
      billing: { gradient: 'linear-gradient(135deg, #00b894 0%, #00cec9 100%)' },
      payment: { gradient: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)' }
    },
    sunset: {
      booking: { gradient: 'linear-gradient(135deg, #ff7675 0%, #fd79a8 100%)' },
      registration: { gradient: 'linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)' },
      patient: { gradient: 'linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)' },
      doctor: { gradient: 'linear-gradient(135deg, #e17055 0%, #ff7675 100%)' },
      billing: { gradient: 'linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)' },
      payment: { gradient: 'linear-gradient(135deg, #00b894 0%, #55a3ff 100%)' }
    },
    forest: {
      booking: { gradient: 'linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%)' },
      registration: { gradient: 'linear-gradient(135deg, #2d5016 0%, #56ab2f 100%)' },
      patient: { gradient: 'linear-gradient(135deg, #a8e6cf 0%, #dcedc1 100%)' },
      doctor: { gradient: 'linear-gradient(135deg, #7b68ee 0%, #87ceeb 100%)' },
      billing: { gradient: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)' },
      payment: { gradient: 'linear-gradient(135deg, #48dbfb 0%, #0abde3 100%)' }
    },
    corporate: {
      booking: { gradient: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)' },
      registration: { gradient: 'linear-gradient(135deg, #34495e 0%, #2c3e50 100%)' },
      patient: { gradient: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)' },
      doctor: { gradient: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)' },
      billing: { gradient: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)' },
      payment: { gradient: 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)' }
    }
  };

  const getSectionTheme = (section) => {
    return themeOptions[selectedTheme][section] || themeOptions.comfortable[section];
  };

  // Add this function to your component
  // const initAutocomplete = () => {
  //   const input = document.getElementById("fullAddress");
  //   if (!input || !window.google) return;
    
  //   const autocomplete = new window.google.maps.places.Autocomplete(input, {
  //     types: ["geocode"],
  //     componentRestrictions: { country: "in" }
  //   });

  //   autocomplete.addListener("place_changed", () => {
  //     const place = autocomplete.getPlace();
      
  //     // Extract components from place
  //     let village = "", postOffice = "", policeStation = "", 
  //         district = "", state = "", pinCode = "";
      
  //     if (place.address_components) {
  //       for (const component of place.address_components) {
  //         const types = component.types;
          
  //         if (types.includes("sublocality_level_1") || types.includes("locality")) 
  //           village = component.long_name;
  //         if (types.includes("administrative_area_level_3")) 
  //           postOffice = component.long_name;
  //         if (types.includes("administrative_area_level_2")) 
  //           district = component.long_name;
  //         if (types.includes("administrative_area_level_1")) 
  //           state = component.long_name;
  //         if (types.includes("postal_code")) 
  //           pinCode = component.long_name;
  //       }
        
  //       // Format address into 3 fields for database storage
  //       const address1 = place.name || village || "";
  //       const address2 = `${postOffice ? `PO- ${postOffice}, ` : ""}${policeStation ? `PS- ${policeStation}, ` : ""}${district ? `DIST- ${district}` : ""}`;
  //       const address3 = `${state ? `STATE- ${state}, ` : ""}${pinCode ? `PIN- ${pinCode}, ` : ""}COUNTRY- INDIA`;
        
  //       // Create full formatted address for display
  //       const fullAddress = place.formatted_address || `${address1}, ${address2}, ${address3}`;
        
  //       // Update form data
  //       setFormData(prev => ({
  //         ...prev,
  //         address1,
  //         address2,
  //         address3,
  //         fullAddress
  //       }));
  //     }
  //   });
  // };






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
        Add2: "",           // Clear other address fields
        Add3: ""
      }));
    }
  });
};
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  // const [discountedPrice, setDiscountedPrice] = useState('');


  

  const calculateDiscount = () => {
    const priceValue = parseFloat(price);
    const discountValue = parseFloat(discount);

    // if (isNaN(priceValue) || isNaN(discountValue)) {
    //   setDiscountedPrice('Please enter valid numbers.');
    //   return;
    // }

    const calculatedDiscount = priceValue * (discountValue / 100);
    const newPrice = priceValue - calculatedDiscount;
     const billAmt = (newPrice.toFixed(2));
     console.log(billAmt);
     
  };




























  // Add this useEffect to your component
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAAn1ZXX5jC3_cVLX0kNlpCitWOb8izv3M&libraries=places";
    script.async = true;
    script.onload = initAutocomplete;
    document.body.appendChild(script);

    return () => {
      const scriptElements = document.querySelectorAll('script[src*="maps.googleapis.com"]');
      scriptElements.forEach(element => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
    };
  }, []);


  const [hideButton, setHideButton] = useState([]);
  // Auto-calculation function for billing
  const calculateBillAmount = (updatedData) => {
    const regCh = parseFloat(updatedData.regnCh || 0);
    const profCh = parseFloat(updatedData.proffCh || 0);
    const svcCh = parseFloat(updatedData.svrCh || 0);
    const pDisc = parseFloat(updatedData.pDisc || 0);
    const profDisc = parseFloat(updatedData.proffDisc || 0);
    const svcDisc = parseFloat(updatedData.srvChDisc || 0);
    
    // Calculate discounted amounts
    const regAmount = regCh;
    const profAmount = profCh - profDisc;
    const svcAmount = svcCh - svcDisc;
    const patientDiscAmount = (regAmount + profAmount + svcAmount) * (pDisc / 100);
    
    const totalAmount = regAmount + profAmount + svcAmount - patientDiscAmount;
    
    return {
      billAmt: totalAmount.toFixed(2),
      finalReceiptAmt: totalAmount.toFixed(2)
    };
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    if (name === "dob" && value) {
      // Calculate age in years, months, and days
      const birthDate = new Date(value);
      const today = new Date();
      
      let years = today.getFullYear() - birthDate.getFullYear();
      let months = today.getMonth() - birthDate.getMonth();
      let days = today.getDate() - birthDate.getDate();
      
      // Adjust for negative days
      if (days < 0) {
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
      }
      
      // Adjust for negative months
      if (months < 0) {
        years--;
        months += 12;
      }
      
      setFormData(prev => ({
        ...prev,
        dob: value,
        Age: years.toString(),
        ageMonths: months.toString(),
        ageDays: days.toString()
      }));
    } else if (name === "fullAddress") {
  // When user types manually in the address textarea
  setFormData(prev => ({
    ...prev,
    fullAddress: value,
    Add1: value,         // Store the complete address in Add1
    Add2: "",
    Add3: ""
  }));

}
else if(name ==="N" ){
  
    console.log("Hi");
    
}
else if(name==="Y" ){

  // handleSeach();
  console.log("disable");

  
}
 else if (name === "DepartmentId") {
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
      const updatedFormData = {
        ...formData,
        [name]: name === "PatientName" || name === "GurdianName"
          ? value.toUpperCase() 
          : type === "checkbox" 
            ? checked 
            : value
      };
      
      // Auto-calculate if billing fields are changed
      if (['regnCh', 'proffCh', 'svrCh', 'pDisc', 'proffDisc', 'srvChDisc'].includes(name)) {
        const calculated = calculateBillAmount(updatedFormData);
        updatedFormData.billAmt = calculated.billAmt;
        updatedFormData.finalReceiptAmt = calculated.finalReceiptAmt;
      }
      
      setFormData(updatedFormData);
    }
  };

  

   // Update form data when initialData changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Clean and validate required fields
      if (!formData.PatientName || !formData.PhoneNo) {
        alert('Patient Name and Phone Number are required!');
        setIsSubmitting(false);
        return;
      }
      
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
        UCDoctor1Id: formData.doctorId ? parseInt(formData.doctorId) : null,
        DepartmentId: formData.DepartmentId ? parseInt(formData.DepartmentId) : null,
        narration: formData.narration || '',
        regnCh: parseFloat(formData.regnCh) || 0,
        proffCh: parseFloat(formData.proffCh) || 0,
        svrCh: parseFloat(formData.svrCh) || 0,
        pDisc: parseFloat(formData.pDisc) || 0,
        proffDisc: parseFloat(formData.proffDisc) || 0,
        srvChDisc: parseFloat(formData.srvChDisc) || 0
      };
      
      const dataToSubmit = {
        action: 'CREATE',
        patientData,
        billData
      };
      
      console.log('Submitting data:', dataToSubmit);
      
      const response = await axiosInstance.post('/outdoor-visit-entry', dataToSubmit);
      
      if (response.data && response.data.success) {
        const { patient, bill } = response.data.data;
        const RegistrationId = patient?.RegistrationId;
        const OutBillId = bill?.OutBillId;
        
        setFormData(prev => ({
          ...prev,
          RegistrationId,
          registrationNo: patient?.RegistrationNo,
          OutBillId,
          billNo: OutBillId
        }));
        
        alert(`Visit entry submitted successfully!\nRegistration ID: ${RegistrationId}\nBill ID: ${OutBillId}`);
        
        if (window.confirm('Entry saved successfully! Do you want to create another entry?')) {
          window.location.reload();
        }
      } else {
        alert(response.data?.message || "Failed to submit visit entry. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      console.error("Error details:", error.response?.data);
      alert(error.response?.data?.error || error.response?.data?.message || "An error occurred while submitting the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
    
    setValidated(true);
  };

  return (
    <MasterLayout>
      <div className="outdoor-booking-container">
        <div className="page-header mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="page-title mb-1">
                {mode === 'view' ? 'View Patient Details' : mode === 'edit' ? 'Edit Patient Registration' : 'Outdoor Patient Registration'}
              </h5>
              <p className="page-subtitle mb-0">
                {mode === 'view' ? 'Patient information (Read Only)' : mode === 'edit' ? 'Update patient information and booking details' : 'Complete patient information and booking details'}
              </p>
              {mode && (
                <Button 
                  variant="outline-secondary" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => navigate('/visit_list')}
                >
                  ← Back to Visit List
                </Button>
              )}
            </div>
            <div className="d-flex align-items-center">
              {/* Theme Selector */}
              <div className="theme-selector me-3">
                <select 
                  className="form-select form-select-sm"
                  value={selectedTheme}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  style={{ minWidth: '140px' }}
                >
                  <option value="comfortable">👁️ Eye Comfort</option>
                  <option value="default">🎨 Colorful</option>
                  <option value="ocean">🌊 Ocean</option>
                  <option value="sunset">🌅 Sunset</option>
                  <option value="forest">🌲 Forest</option>
                  <option value="corporate">🏢 Corporate</option>
                </select>
              </div>
              <div className="progress-circle me-3" style={{ width: '60px', height: '60px', position: 'relative' }}>
                <svg width="60" height="60" className="progress-ring">
                  <circle
                    cx="30"
                    cy="30"
                    r="25"
                    stroke="#e9ecef"
                    strokeWidth="4"
                    fill="transparent"
                  />
                  <circle
                    cx="30"
                    cy="30"
                    r="25"
                    stroke="#28a745"
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 25}`}
                    strokeDashoffset={`${2 * Math.PI * 25 * (1 - calculateProgress() / 100)}`}
                    style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                  />
                </svg>
                <div className="progress-text" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '12px', fontWeight: 'bold' }}>
                  {calculateProgress()}%
                </div>
              </div>
              <Badge bg="success" className="status-badge">Progress: {calculateProgress()}%</Badge>
            </div>
          </div>
        </div>
        
        <Form noValidate validated={validated} onSubmit={handleSubmit} className="modern-form">
          <div className="row">
            {/* Quick Search Component */}
            <div className="col-12">
              <QuickSearch 
                onPatientSelect={(patient) => {
                  setFormData(prev => ({
                    ...prev,
                    PatientName: patient.PatientName || '',
                    PhoneNo: patient.PhoneNo || '',
                    Add1: patient.Add1 || '',
                    Add2: patient.Add2 || '',
                    Add3: patient.Add3 || '',
                    fullAddress: patient.Add1 || '',
                    Age: patient.Age || '',
                    Sex: patient.Sex || '',
                    MStatus: patient.MStatus || '',
                    GurdianName: patient.GurdianName || '',
                    CareOf: patient.CareOf || '',
                    ReligionId: patient.ReligionId || '',
                    Weight: patient.Weight || '',
                    OPD: 'N' // Set to existing patient
                  }));
                }}
              />
            </div>
            {/* Booking Details */}
            <div className="col-lg-12">
              <Card className="modern-card booking-card mb-4 shadow-sm">
                <Card.Header 
                  className="modern-card-header collapsible-header" 
                  onClick={() => toggleSection('booking')}
                  style={{ 
                    cursor: 'pointer',
                    background: getSectionProgress('booking') === 100 ? 'linear-gradient(90deg, #28a745 70%, #20c997 100%)' : getSectionTheme('booking').gradient,
                    color: 'white',
                    border: 'none'
                  }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-calendar-check me-2"></i>
                      <h5 className="mb-0">Booking Information</h5>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className={`badge me-2 ${getSectionProgress('booking') === 100 ? 'bg-success' : 'bg-warning'}`}>
                        {getSectionProgress('booking')}% Complete
                      </span>
                      <i className={`fas fa-chevron-${openSections.booking ? 'up' : 'down'}`}></i>
                    </div>
                  </div>
                </Card.Header>
                {openSections.booking && (
                  <Card.Body className="modern-card-body">
                  <Row className="g-3">
                    <Col md={6} lg={2}>
                      <div className="form-group">
                        <label htmlFor="Booking" className="form-label modern-label">
                          <i className="fas fa-clock me-1"></i>Advance Booking
                        </label>
                        <select
                          id="Booking"
                          name="Booking"
                          className="form-select modern-input"
                          value={formData.Booking}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select...</option>
                          <option value="N">No</option>
                          <option value="Y">Yes</option>
                        </select>
                        <div className="invalid-feedback">Please select advance booking.</div>
                      </div>
                    </Col>
                    <Col md={6} lg={2}>
                      <div className="form-group">
                        <label htmlFor="AdmitionDate" className="form-label modern-label">
                          <i className="fas fa-calendar me-1"></i>Visit Date
                        </label>
                        <input
                          type="date"
                          id="AdmitionDate"
                          name="AdmitionDate"
                          className="form-control modern-input"
                          value={formData.AdmitionDate}
                          onChange={handleChange}
                          required
                        />
                        <div className="invalid-feedback">Please choose a visit date.</div>
                      </div>
                    </Col>
                    <Col md={6} lg={2}>
                      <div className="form-group">
                        <label htmlFor="AdmitionTime" className="form-label modern-label">
                          <i className="fas fa-clock me-1"></i>Visit Time
                        </label>
                        <input
                          type="time"
                          id="AdmitionTime"
                          name="AdmitionTime"
                          className="form-control modern-input"
                          value={formData.AdmitionTime}
                          onChange={handleChange}
                          required
                        />
                        <div className="invalid-feedback">Please choose a visit time.</div>
                      </div>
                    </Col>
                    <Col md={6} lg={2}>
                      <div className="form-group">
                        <label className="form-label modern-label">&nbsp;</label>
                        <div className="form-check modern-checkbox">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="quota"
                            id="quotaCheck"
                            checked={formData.quota}
                            onChange={handleChange}
                          />
                          <label className="form-check-label modern-label" htmlFor="quotaCheck">
                            <i className="fas fa-star me-1"></i>Quota
                          </label>
                        </div>
                      </div>
                    </Col>
                    <Col md={6} lg={2}>
                      <div className="form-group">
                        <label className="form-label modern-label">
                          <i className="fas fa-list-ol me-1"></i>Queue No.
                        </label>
                        <input
                          type="number"
                          name="queueNo"
                          className="form-control modern-input"
                          value={formData.queueNo}
                          onChange={handleChange}
                          readOnly
                        />
                      </div>
                    </Col>
                    {/* <div className="col-md-6 col-lg-2">
                      <label className="form-label fw-bold text-dark">Status</label>
                      <input
                        type="number"
                        name="Status"
                        className="form-control text-danger"
                        value={formData.Status}
                        onChange={handleChange}
                        readOnly
                      />
                    </div> */}
                  </Row>
                  </Card.Body>
                )}
              </Card>
            </div>

            {/* Registration Detail */}
            <div className="col-lg-12">
              <Card className="modern-card registration-card mb-4 shadow-sm">
                <Card.Header 
                  className="modern-card-header collapsible-header" 
                  onClick={() => toggleSection('registration')}
                  style={{ 
                    cursor: 'pointer',
                    background: getSectionProgress('registration') === 100 ? 'linear-gradient(90deg, #28a745 70%, #20c997 100%)' : getSectionTheme('registration').gradient,
                    color: 'white',
                    border: 'none'
                  }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-user-plus me-2"></i>
                      <h5 className="mb-0">Registration Details</h5>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className={`badge me-2 ${getSectionProgress('registration') === 100 ? 'bg-success' : 'bg-warning'}`}>
                        {getSectionProgress('registration')}% Complete
                      </span>
                      <i className={`fas fa-chevron-${openSections.registration ? 'up' : 'down'}`}></i>
                    </div>
                  </div>
                </Card.Header>
                {openSections.registration && (
                  <Card.Body className="modern-card-body">
                  <Row className="g-3">
                    <Col md={6} lg={3}>
                      <div className="form-group">
                        <label htmlFor="OPD" className="form-label modern-label">
                          <i className="fas fa-user-check me-1"></i>Registration Type
                        </label>
                        <select
                          id="OPD"
                          name="OPD"
                          className="form-select modern-input"
                          value={formData.OPD}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select...</option>
                          <option value="Y">New Registration</option>
                          <option value="N">Existing Patient</option>
                        </select>
                        <div className="invalid-feedback">Select registration type.</div>
                      </div>
                    </Col>
                    <Col md={6} lg={4}>
                      <div className="form-group">
                        <label htmlFor="PatientName" className="form-label modern-label">
                          <i className="fas fa-user me-1"></i>Patient's Name *
                        </label>
                        <input
                          type="text"
                          id="PatientName"
                          name="PatientName"
                          className="form-control modern-input"
                          style={{ textTransform: 'uppercase' }}
                          value={formData.PatientName}
                          onChange={handleChange}
                          placeholder="Enter patient's full name"
                          required
                        />
                        <div className="invalid-feedback">Enter patient's name.</div>
                      </div>
                    </Col>
                    <Col md={6} lg={3}>
                      <div className="form-group">
                        <label htmlFor="PhoneNo" className="form-label modern-label">
                          <i className="fas fa-phone me-1"></i>Phone Number *
                        </label>
                        <input
                          type="text"
                          id="PhoneNo"
                          name="PhoneNo"
                          className="form-control modern-input"
                          value={formData.PhoneNo}
                          onChange={handleChange}
                          placeholder="Enter 10-digit phone number"
                          maxLength="10"
                        />
                      </div>
                    </Col>
                    <Col md={6} lg={2}>
                      <div className="form-group">
                        <label className="form-label modern-label">&nbsp;</label>
                        <Button 
                          type="button"
                          className="modern-btn search-btn w-100"
                          style={{ display: formData.OPD === 'Y' ? 'none' : 'block' }}
                          onClick={async () => {
                            try {
                              if (!formData.PhoneNo) {
                                alert("Please enter Phone Number to search");
                                return;
                              }
                              
                              const token = localStorage.getItem('token');
                              const response = await axiosInstance.get(`/admission/search-by-phone?phone=${formData.PhoneNo}`, {
                                headers: { Authorization: `Bearer ${token}` }
                              });
                              
                              if (response.data && response.data.success && response.data.data.length > 0) {
                                const patients = response.data.data;
                                
                                if (patients.length === 1) {
                                  // Single patient found, auto-fill
                                  const patientData = patients[0];
                                  setFormData(prev => ({
                                    ...prev,
                                    PatientName: patientData.PatientName || prev.PatientName,
                                    PhoneNo: patientData.PhoneNo || prev.PhoneNo,
                                    Add1: patientData.Add1 || prev.Add1,
                                    Add2: patientData.Add2 || prev.Add2,
                                    Add3: patientData.Add3 || prev.Add3,
                                    fullAddress: patientData.Add1 || prev.fullAddress,
                                    Age: patientData.Age || prev.Age,
                                    AgeType: patientData.AgeType || prev.AgeType,
                                    Sex: patientData.Sex || prev.Sex,
                                    MStatus: patientData.MStatus || prev.MStatus,
                                    GurdianName: patientData.GurdianName || prev.GurdianName,
                                    CareOf: patientData.CareOf || prev.CareOf,
                                    ReligionId: patientData.ReligionId || prev.ReligionId,
                                    Weight: patientData.Weight || prev.Weight
                                  }));
                                  alert("Patient information loaded successfully!");
                                } else {
                                  // Multiple patients found, show modal
                                  setSearchResults(patients);
                                  setShowPatientModal(true);
                                }
                              } else {
                                alert("No patient found with this phone number");
                              }
                            } catch (error) {
                              console.error("Error searching patient:", error);
                              alert("Error searching for patient. Please try again.");
                            }
                          }}
                        >
                          <i className="fas fa-search me-2"></i>Search
                        </Button>
                      </div>
                    </Col>
                  </Row>
                  </Card.Body>
                )}
              </Card>
            </div>

            {/* Patient Details */}
            <div className="col-lg-12">
              <Card className="modern-card patient-card mb-4 shadow-sm">
                <Card.Header 
                  className="modern-card-header collapsible-header" 
                  onClick={() => toggleSection('patient')}
                  style={{ 
                    cursor: 'pointer',
                    background: getSectionProgress('patient') === 100 ? 'linear-gradient(90deg, #28a745 70%, #20c997 100%)' : getSectionTheme('patient').gradient,
                    color: 'white',
                    border: 'none'
                  }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-user-injured me-2"></i>
                      <h5 className="mb-0">Patient Information</h5>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className={`badge me-2 ${getSectionProgress('patient') === 100 ? 'bg-success' : 'bg-warning'}`}>
                        {getSectionProgress('patient')}% Complete
                      </span>
                      <i className={`fas fa-chevron-${openSections.patient ? 'up' : 'down'}`}></i>
                    </div>
                  </div>
                </Card.Header>
                {openSections.patient && (
                  <Card.Body className="modern-card-body">
                    <PatientDetailsCard 
                      formData={formData}
                      handleChange={handleChange}
                      religions={religions}
                      hideHeader={true}
                    />
                  </Card.Body>
                )}
              </Card>
            </div>

            {/* Doctor Details */}
            <div className="col-lg-12">
              <Card className="modern-card doctor-card mb-4 shadow-sm">
                <Card.Header 
                  className="modern-card-header collapsible-header" 
                  onClick={() => toggleSection('doctor')}
                  style={{ 
                    cursor: 'pointer',
                    background: getSectionProgress('doctor') === 100 ? 'linear-gradient(90deg, #28a745 70%, #20c997 100%)' : getSectionTheme('doctor').gradient,
                    color: 'white',
                    border: 'none'
                  }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-user-md me-2"></i>
                      <h5 className="mb-0">Doctor & Department Selection</h5>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className={`badge me-2 ${getSectionProgress('doctor') === 100 ? 'bg-success' : 'bg-warning'}`}>
                        {getSectionProgress('doctor')}% Complete
                      </span>
                      <i className={`fas fa-chevron-${openSections.doctor ? 'up' : 'down'}`}></i>
                    </div>
                  </div>
                </Card.Header>
                {openSections.doctor && (
                  <Card.Body className="modern-card-body">
                    <DoctorDetailsCard 
                      formData={formData}
                      setFormData={setFormData}
                      handleChange={handleChange}
                      departments={departments}
                      hideHeader={true}
                    />
                  </Card.Body>
                )}
              </Card>
            </div>

            {/* Billing Details */}
            <div className="col-lg-12">
              <Card className="modern-card billing-card mb-4 shadow-sm">
                <Card.Header 
                  className="modern-card-header collapsible-header" 
                  onClick={() => toggleSection('billing')}
                  style={{ 
                    cursor: 'pointer',
                    background: getSectionProgress('billing') === 100 ? 'linear-gradient(90deg, #28a745 70%, #20c997 100%)' : getSectionTheme('billing').gradient,
                    color: 'white',
                    border: 'none'
                  }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-file-invoice-dollar me-2"></i>
                      <h5 className="mb-0">Billing Information</h5>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className={`badge me-2 ${getSectionProgress('billing') === 100 ? 'bg-success' : 'bg-warning'}`}>
                        {getSectionProgress('billing')}% Complete
                      </span>
                      <i className={`fas fa-chevron-${openSections.billing ? 'up' : 'down'}`}></i>
                    </div>
                  </div>
                </Card.Header>
                {openSections.billing && (
                  <Card.Body className="modern-card-body">
                    <BillingDetailsCard 
                      formData={formData}
                      handleChange={handleChange}
                      hideHeader={true}
                    />
                  </Card.Body>
                )}
              </Card>
            </div>

            {/* Payment Details */}
            <div className="col-lg-12">
              <Card className="modern-card payment-card mb-4 shadow-sm">
                <Card.Header 
                  className="modern-card-header collapsible-header" 
                  onClick={() => toggleSection('payment')}
                  style={{ 
                    cursor: 'pointer',
                    background: getSectionProgress('payment') === 100 ? 'linear-gradient(90deg, #28a745 70%, #20c997 100%)' : getSectionTheme('payment').gradient,
                    color: 'white',
                    border: 'none'
                  }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-credit-card me-2"></i>
                      <h5 className="mb-0">Multiple Payment Methods</h5>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className={`badge me-2 ${getSectionProgress('payment') === 100 ? 'bg-success' : 'bg-warning'}`}>
                        {getSectionProgress('payment')}% Complete
                      </span>
                      <i className={`fas fa-chevron-${openSections.payment ? 'up' : 'down'}`}></i>
                    </div>
                  </div>
                </Card.Header>
                {openSections.payment && (
                  <Card.Body className="modern-card-body">
                    <PaymentDetailsCard 
                      formData={formData}
                      handleChange={handleChange}
                      hideHeader={true}
                    />
                  </Card.Body>
                )}
              </Card>
            </div>

            {/* Submit Button */}
            <div className="col-12 text-center mb-4">
              <div className="submit-section">
                {!isReadOnly && (
                  <Button 
                    type="submit" 
                    size="lg"
                    className="modern-btn submit-btn px-5 py-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin me-2"></i>
                        Processing...
                      </>
                    ) : mode === 'edit' ? (
                      <>
                        <i className="fas fa-edit me-2"></i>
                        Update Patient
                      </>
                    ) : (
                      <>
                        <i className="fas fa-save me-2"></i>
                        Register Patient
                      </>
                    )}
                  </Button>
                )}
                {isReadOnly && (
                  <Button 
                    type="button"
                    size="lg"
                    className="modern-btn px-5 py-3"
                    style={{ background: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)' }}
                    onClick={() => navigate('/visit_list')}
                  >
                    <i className="fas fa-arrow-left me-2"></i>
                    Back to List
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Form>
        
        {/* Patient Search Modal */}
        <PatientSearchModal
          show={showPatientModal}
          onHide={() => setShowPatientModal(false)}
          patients={searchResults}
          onSelectPatient={(selectedPatient) => {
            setFormData(prev => ({
              ...prev,
              PatientName: selectedPatient.PatientName || prev.PatientName,
              PhoneNo: selectedPatient.PhoneNo || prev.PhoneNo,
              Add1: selectedPatient.Add1 || prev.Add1,
              Add2: selectedPatient.Add2 || prev.Add2,
              Add3: selectedPatient.Add3 || prev.Add3,
              fullAddress: selectedPatient.Add1 || prev.fullAddress,
              Age: selectedPatient.Age || prev.Age,
              AgeType: selectedPatient.AgeType || prev.AgeType,
              Sex: selectedPatient.Sex || prev.Sex,
              MStatus: selectedPatient.MStatus || prev.MStatus,
              GurdianName: selectedPatient.GurdianName || prev.GurdianName,
              CareOf: selectedPatient.CareOf || prev.CareOf,
              ReligionId: selectedPatient.ReligionId || prev.ReligionId,
              Weight: selectedPatient.Weight || prev.Weight
            }));
            setShowPatientModal(false);
            alert("Patient information loaded successfully!");
          }}
        />
      </div>
    </MasterLayout>
  );
};

export default New;






































