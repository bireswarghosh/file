

import React, { useState, useEffect } from 'react';
import MasterLayout from '../../MasterLayout';
import Breadcrumb from '../../Breadcrumb';
// import { 
//   Table, Button, Card, Badge, Alert, Spinner, Form, 
//   InputGroup, Modal, Row, Col, Container
// } from 'react-bootstrap';


// import { 
//   FaUserMd, FaEdit, FaTrash, FaSearch, FaPlus, 
//   FaSave, FaImage, FaTimes
// } from 'react-icons/fa';





import { 
  Table, Button, Card, Badge, Alert, Spinner, Form, 
  InputGroup, Modal, Row, Col, Container, Tabs, Tab
} from 'react-bootstrap';
import { 
  FaUserMd, FaEdit, FaTrash, FaSearch, FaPlus, 
  FaSave, FaImage, FaTimes, FaCalendarAlt,FaCamera
} from 'react-icons/fa';






import axiosInstance from '../../../axiosInstance';

const DoctorManagement = () => {
  // State variables
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [search, setSearch] = useState('');
  const [specialities, setSpecialities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [groupBySpeciality, setGroupBySpeciality] = useState(true);
  const [selectedSpecialityFilter, setSelectedSpecialityFilter] = useState('');
  const [doctorStatuses, setDoctorStatuses] = useState({});
  
  // Form data state
  // const [formData, setFormData] = useState({
  //   Doctor: '',
  //   Qualification: '',
  //   SpecialityId: '',
  //   Phone: '',
  //   IndoorYN: 'N',
  //   RMO: 'N',
  //   Photo: null
  // });
  






// Form data state
const [formData, setFormData] = useState({
  Doctor: '',
  Qualification: '',
  SpecialityId: '',
  Phone: '',
  IndoorYN: 'N',
  RMO: 'N',
  Photo: null,
  // Add other fields
  Add1: '',
  Add2: '',
  Add3: '',
  Fax: '',
  Identification: '',
  Qualification2: '',
  Qualification3: '',
  Qualification4: '',
  IndoorRate: 0,
  MExecutiveId: 0,
  Commission: 'N',
  FixedDiscount: 0,
  MarkDoctorId: 0,
  DrPr: '',
  NotReq: 0,
  Panel: 0,
  CreateDate: new Date().toISOString().split('T')[0],
  RegistrationNo: '',
  areacode: 0,
  ICURate: 0,
  CABRate: 0,
  SUITRate: 0,
  VisitDays: []
});










  // Image preview state
  const [imagePreview, setImagePreview] = useState(null);
  
  // Fetch doctors on component mount
  useEffect(() => {
    fetchDoctors();
    fetchSpecialities();
  }, []);

  // Fetch doctors from API
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axiosInstance.get('/doctormaster', {
        headers: { 'Authorization': `Bearer ${token}` },
        params: { search: search }
      });
      
      if (response.data && response.data.success) {
        setDoctors(response.data.data || []);
        // Initialize all doctor statuses as 'off'
        const statuses = {};
        response.data.data.forEach(doctor => {
          statuses[doctor.DoctorId] = 'off';
        });
        setDoctorStatuses(statuses);
      }
    } catch (err) {
      console.error('Error fetching doctors:', err);
      setError('Failed to load doctors. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch specialities for mapping
  const fetchSpecialities = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.get('/speciality', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.data && response.data.success) {
        setSpecialities(response.data.data || []);
      }
    } catch (err) {
      console.error('Error fetching specialities:', err);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchDoctors();
  };

  // Open modal for creating a new doctor
// Open modal for creating a new doctor
const handleAddDoctor = () => {
  setModalMode('create');
  setSelectedDoctor(null);
  setFormData({
    Doctor: '',
    Qualification: '',
    SpecialityId: '',
    Phone: '',
    IndoorYN: 'N',
    RMO: 'N',
    Photo: null,
    // Add other fields
    Add1: '',
    Add2: '',
    Add3: '',
    Fax: '',
    Identification: '',
    Qualification2: '',
    Qualification3: '',
    Qualification4: '',
    IndoorRate: 0,
    MExecutiveId: 0,
    Commission: 'N',
    FixedDiscount: 0,
    MarkDoctorId: 0,
    DrPr: '',
    NotReq: 0,
    Panel: 0,
    CreateDate: new Date().toISOString().split('T')[0],
    RegistrationNo: '',
    areacode: 0,
    ICURate: 0,
    CABRate: 0,
    SUITRate: 0,
    VisitDays: [] // This is the missing property causing the error
  });
  setImagePreview(null);
  setShowModal(true);
};








  // Open modal for editing a doctor

// Open modal for editing a doctor


// Open modal for editing a doctor

// Open modal for editing a doctor
// const handleEditDoctor = async (doctorId) => {
//   try {
//     setLoading(true);
//     const token = localStorage.getItem('token');
    
//     // Fetch doctor details
//     const doctorResponse = await axiosInstance.get(`/doctormaster/${doctorId}`, {
//       headers: { 'Authorization': `Bearer ${token}` }
//     });
    
//     // Fetch visit days data
//     let visitDays = [];
//     try {
//       const visitDaysResponse = await axiosInstance.get(`/doctorvisitdt/${doctorId}`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
      
//       console.log('Visit days response:', visitDaysResponse.data);
      
//       if (visitDaysResponse.data && visitDaysResponse.data.success) {
//         const dayData = visitDaysResponse.data.data;
        
//         // Map day names to day IDs
//         const dayMap = {
//           'SUN': 0,
//           'MON': 1,
//           'TUE': 2,
//           'WED': 3,
//           'THU': 4,
//           'FRI': 5,
//           'SAT': 6
//         };
        
//         // Process the visit days data
//         if (Array.isArray(dayData)) {
//           // Extract day IDs from the array of objects
//           dayData.forEach(day => {
//             if (day.VDay && dayMap[day.VDay] !== undefined) {
//               visitDays.push(dayMap[day.VDay]);
//             }
//           });
//         }
//       }
      
//       console.log('Parsed visit days:', visitDays);
//     } catch (visitErr) {
//       console.error('Error fetching visit days:', visitErr);
//     }
    
//     if (doctorResponse.data && doctorResponse.data.success) {
//       const doctorData = doctorResponse.data.data;
//       setSelectedDoctor(doctorData);
//       setFormData({
//         Doctor: doctorData.Doctor || '',
//         Qualification: doctorData.Qualification || '',
//         SpecialityId: doctorData.SpecialityId || '',
//         Phone: doctorData.Phone || '',
//         IndoorYN: doctorData.IndoorYN || 'N',
//         RMO: doctorData.RMO || 'N',
//         Photo: null,
//         Add1: doctorData.Add1 || '',
//         Add2: doctorData.Add2 || '',
//         Add3: doctorData.Add3 || '',
//         Fax: doctorData.Fax || '',
//         Identification: doctorData.Identification || '',
//         Qualification2: doctorData.Qualification2 || '',
//         Qualification3: doctorData.Qualification3 || '',
//         Qualification4: doctorData.Qualification4 || '',
//         IndoorRate: doctorData.IndoorRate || 0,
//         MExecutiveId: doctorData.MExecutiveId || 0,
//         Commission: doctorData.Commission || 'N',
//         FixedDiscount: doctorData.FixedDiscount || 0,
//         MarkDoctorId: doctorData.MarkDoctorId || 0,
//         DrPr: doctorData.DrPr || '',
//         NotReq: doctorData.NotReq || 0,
//         Panel: doctorData.Panel || 0,
//         CreateDate: doctorData.CreateDate ? new Date(doctorData.CreateDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
//         RegistrationNo: doctorData.RegistrationNo || '',
//         areacode: doctorData.areacode || 0,
//         ICURate: doctorData.ICURate || 0,
//         CABRate: doctorData.CABRate || 0,
//         SUITRate: doctorData.SUITRate || 0,
//         VisitDays: visitDays
//       });
      
//       // Fetch the image directly as blob
//       if (doctorData.hasPhoto) {
//         const fetchImage = async () => {
//           try {
//             const token = localStorage.getItem('token');
//             const response = await axiosInstance.get(`/doctormaster/${doctorData.DoctorId}/photo`, {
//               headers: { 'Authorization': `Bearer ${token}` },
//               responseType: 'blob'
//             });
            
//             const imageUrl = URL.createObjectURL(response.data);
//             setImagePreview(imageUrl);
//           } catch (err) {
//             console.error('Failed to load doctor image:', err);
//             setImagePreview(null);
//           }
//         };
        
//         fetchImage();
//       } else {
//         setImagePreview(null);
//       }
      
//       setModalMode('edit');
//       setShowModal(true);
//     }
//   } catch (err) {
//     console.error('Error fetching doctor details:', err);
//     setError('Failed to load doctor details. Please try again.');
//   } finally {
//     setLoading(false);
//   }
// };







// Open modal for editing a doctor
// const handleEditDoctor = async (doctorId) => {
//   try {
//     setLoading(true);
//     const token = localStorage.getItem('token');
    
//     // Fetch doctor details
//     const doctorResponse = await axiosInstance.get(`/doctormaster/${doctorId}`, {
//       headers: { 'Authorization': `Bearer ${token}` }
//     });
    
//     // Fetch visit days data
//     let visitDays = [];
//     try {
//       const visitDaysResponse = await axiosInstance.get(`/doctorvisitdt/${doctorId}`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
      
//       if (visitDaysResponse.data && visitDaysResponse.data.success) {
//         visitDays = visitDaysResponse.data.data || [];
//       }
//     } catch (visitErr) {
//       console.error('Error fetching visit days:', visitErr);
//     }
    
//     if (doctorResponse.data && doctorResponse.data.success) {
//       const doctorData = doctorResponse.data.data;
//       setSelectedDoctor(doctorData);
//       setFormData({
//         Doctor: doctorData.Doctor || '',
//         Qualification: doctorData.Qualification || '',
//         SpecialityId: doctorData.SpecialityId || '',
//         Phone: doctorData.Phone || '',
//         IndoorYN: doctorData.IndoorYN || 'N',
//         RMO: doctorData.RMO || 'N',
//         Photo: null,
//         Add1: doctorData.Add1 || '',
//         Add2: doctorData.Add2 || '',
//         Add3: doctorData.Add3 || '',
//         Fax: doctorData.Fax || '',
//         Identification: doctorData.Identification || '',
//         Qualification2: doctorData.Qualification2 || '',
//         Qualification3: doctorData.Qualification3 || '',
//         Qualification4: doctorData.Qualification4 || '',
//         IndoorRate: doctorData.IndoorRate || 0,
//         MExecutiveId: doctorData.MExecutiveId || 0,
//         Commission: doctorData.Commission || 'N',
//         FixedDiscount: doctorData.FixedDiscount || 0,
//         MarkDoctorId: doctorData.MarkDoctorId || 0,
//         DrPr: doctorData.DrPr || '',
//         NotReq: doctorData.NotReq || 0,
//         Panel: doctorData.Panel || 0,
//         CreateDate: doctorData.CreateDate ? new Date(doctorData.CreateDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
//         RegistrationNo: doctorData.RegistrationNo || '',
//         areacode: doctorData.areacode || 0,
//         ICURate: doctorData.ICURate || 0,
//         CABRate: doctorData.CABRate || 0,
//         SUITRate: doctorData.SUITRate || 0,
//         VisitDays: visitDays
//       });
      
//       // Fetch the image directly as blob
//       if (doctorData.hasPhoto) {
//         const fetchImage = async () => {
//           try {
//             const token = localStorage.getItem('token');
//             const response = await axiosInstance.get(`/doctormaster/${doctorData.DoctorId}/photo`, {
//               headers: { 'Authorization': `Bearer ${token}` },
//               responseType: 'blob'
//             });
            
//             const imageUrl = URL.createObjectURL(response.data);
//             setImagePreview(imageUrl);
//           } catch (err) {
//             console.error('Failed to load doctor image:', err);
//             setImagePreview(null);
//           }
//         };
        
//         fetchImage();
//       } else {
//         setImagePreview(null);
//       }
      
//       setModalMode('edit');
//       setShowModal(true);
//     }
//   } catch (err) {
//     console.error('Error fetching doctor details:', err);
//     setError('Failed to load doctor details. Please try again.');
//   } finally {
//     setLoading(false);
//   }
// };

  






// Open modal for editing a doctor
const handleEditDoctor = async (doctorId) => {
  try {
    setLoading(true);
    const token = localStorage.getItem('token');
    
    // Fetch doctor details
    const doctorResponse = await axiosInstance.get(`/doctormaster/${doctorId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    // Fetch visit days data
    let visitDays = [];
    try {
      const visitDaysResponse = await axiosInstance.get(`/doctorvisitdt/${doctorId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (visitDaysResponse.data && visitDaysResponse.data.success) {
        visitDays = visitDaysResponse.data.data || [];
      }
    } catch (visitErr) {
      console.error('Error fetching visit days:', visitErr);
    }
    
    if (doctorResponse.data && doctorResponse.data.success) {
      const doctorData = doctorResponse.data.data;
      setSelectedDoctor(doctorData);
      setFormData({
        Doctor: doctorData.Doctor || '',
        Qualification: doctorData.Qualification || '',
        SpecialityId: doctorData.SpecialityId || '',
        Phone: doctorData.Phone || '',
        IndoorYN: doctorData.IndoorYN || 'N',
        RMO: doctorData.RMO || 'N',
        Photo: null,
        Add1: doctorData.Add1 || '',
        Add2: doctorData.Add2 || '',
        Add3: doctorData.Add3 || '',
        Fax: doctorData.Fax || '',
        Identification: doctorData.Identification || '',
        Qualification2: doctorData.Qualification2 || '',
        Qualification3: doctorData.Qualification3 || '',
        Qualification4: doctorData.Qualification4 || '',
        IndoorRate: doctorData.IndoorRate || 0,
        MExecutiveId: doctorData.MExecutiveId || 0,
        Commission: doctorData.Commission || 'N',
        FixedDiscount: doctorData.FixedDiscount || 0,
        MarkDoctorId: doctorData.MarkDoctorId || 0,
        DrPr: doctorData.DrPr || '',
        NotReq: doctorData.NotReq || 0,
        Panel: doctorData.Panel || 0,
        CreateDate: doctorData.CreateDate ? new Date(doctorData.CreateDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        RegistrationNo: doctorData.RegistrationNo || '',
        areacode: doctorData.areacode || 0,
        ICURate: doctorData.ICURate || 0,
        CABRate: doctorData.CABRate || 0,
        SUITRate: doctorData.SUITRate || 0,
        VisitDays: visitDays
      });
      
      // Fetch the image directly as blob
      if (doctorData.hasPhoto) {
        const fetchImage = async () => {
          try {
            const token = localStorage.getItem('token');
            const response = await axiosInstance.get(`/doctormaster/${doctorData.DoctorId}/photo`, {
              headers: { 'Authorization': `Bearer ${token}` },
              responseType: 'blob'
            });
            
            const imageUrl = URL.createObjectURL(response.data);
            setImagePreview(imageUrl);
          } catch (err) {
            console.error('Failed to load doctor image:', err);
            setImagePreview(null);
          }
        };
        
        fetchImage();
      } else {
        setImagePreview(null);
      }
      
      setModalMode('edit');
      setShowModal(true);
    }
  } catch (err) {
    console.error('Error fetching doctor details:', err);
    setError('Failed to load doctor details. Please try again.');
  } finally {
    setLoading(false);
  }
};

























  


// Handle form input changes
// const handleChange = (e) => {
//   const { name, value, type, checked, files } = e.target;
  
//   if (type === 'file') {
//     // Handle file input
//     const file = files[0];
    
//     // Check file size (limit to 1MB)
//     if (file && file.size > 1024 * 1024) {
//       setError('Image size must be less than 1MB');
//       return;
//     }
    
//     setFormData(prev => ({ ...prev, [name]: file }));
    
//     // Create preview URL for the selected image
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   } else if (type === 'checkbox') {
//     if (name === 'visitDay') {
//       // Handle visit day checkboxes
//       const dayId = parseInt(value);
//       setFormData(prev => {
//         const currentDays = [...prev.VisitDays];
//         if (checked) {
//           if (!currentDays.includes(dayId)) {
//             return { ...prev, VisitDays: [...currentDays, dayId] };
//           }
//         } else {
//           return { ...prev, VisitDays: currentDays.filter(day => day !== dayId) };
//         }
//         return prev;
//       });
//     } else {
//       // Handle other checkbox inputs (for IndoorYN, RMO, etc.)
//       setFormData(prev => ({ 
//         ...prev, 
//         [name]: checked ? 'Y' : 'N' 
//       }));
//     }
//   } else if (type === 'number') {
//     // Handle number inputs
//     setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
//   } else {
//     // Handle other inputs
//     setFormData(prev => ({ ...prev, [name]: value }));
//   }
// };


// // Handle form submission
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setError('');
//   setSuccess('');
  
//   try {
//     setLoading(true);
//     const token = localStorage.getItem('token');
    
//     // Create FormData object for file upload
//     const formDataToSend = new FormData();
    
//     // Add all form fields except Photo and VisitDays
//     Object.entries(formData).forEach(([key, value]) => {
//       if (key !== 'Photo' && key !== 'VisitDays' && value !== null) {
//         formDataToSend.append(key, value);
//       }
//     });
    
//     // Add photo separately if it exists
//     if (formData.Photo) {
//       formDataToSend.append('Photo', formData.Photo);
//     }
    
//     let response;
    
//     if (modalMode === 'edit') {
//       // Update doctor details
//       response = await axiosInstance.put(`/doctormaster/${selectedDoctor.DoctorId}`, formDataToSend, {
//         headers: { 
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data'
//         }
//       });
      
//       // Update visit days separately - one by one
//       if (response.data && response.data.success) {
//         // First delete existing visit days
//         await axiosInstance.delete(`/doctorvisitdt/${selectedDoctor.DoctorId}`, {
//           headers: { 'Authorization': `Bearer ${token}` }
//         });
        
//         // Then add new visit days
//         const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
//         for (const dayId of formData.VisitDays) {
//           await axiosInstance.post('/doctorvisitdt', {
//             DoctorId: selectedDoctor.DoctorId,
//             VDay: dayNames[dayId],
//             VisitOurId: 1 // Default value
//           }, {
//             headers: { 
//               'Authorization': `Bearer ${token}`,
//               'Content-Type': 'application/json'
//             }
//           });
//         }
//       }
//     } else {
//       // Create new doctor
//       response = await axiosInstance.post('/doctormaster', formDataToSend, {
//         headers: { 
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data'
//         }
//       });
      
//       // If doctor created successfully, add visit days
//       if (response.data && response.data.success) {
//         const newDoctorId = response.data.data.doctorId;
        
//         // Add visit days one by one
//         const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
//         for (const dayId of formData.VisitDays) {
//           await axiosInstance.post('/doctorvisitdt', {
//             DoctorId: newDoctorId,
//             VDay: dayNames[dayId],
//             VisitOurId: 1 // Default value
//           }, {
//             headers: { 
//               'Authorization': `Bearer ${token}`,
//               'Content-Type': 'application/json'
//             }
//           });
//         }
//       }
//     }
    
//     if (response.data && response.data.success) {
//       setSuccess(modalMode === 'edit' ? 'Doctor updated successfully!' : 'Doctor created successfully!');
//       setShowModal(false);
//       fetchDoctors(); // Refresh the list
//     }
//   } catch (err) {
//     console.error('Error saving doctor:', err);
//     setError(err.response?.data?.message || 'Failed to save doctor. Please try again.');
//   } finally {
//     setLoading(false);
//   }
// };















// Handle form input changes
const handleChange = (e) => {
  const { name, value, type, checked, files } = e.target;
  
  if (type === 'file') {
    // Handle file input
    const file = files[0];
    
    // Check file size (limit to 1MB)
    if (file && file.size > 1024 * 1024) {
      setError('Image size must be less than 1MB');
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: file }));
    
    // Create preview URL for the selected image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  } else if (type === 'checkbox') {
    if (name === 'visitDay') {
      // Handle visit day checkboxes
      const dayId = parseInt(value);
      setFormData(prev => {
        const currentDays = [...prev.VisitDays];
        if (checked) {
          if (!currentDays.includes(dayId)) {
            return { ...prev, VisitDays: [...currentDays, dayId] };
          }
        } else {
          return { ...prev, VisitDays: currentDays.filter(day => day !== dayId) };
        }
        return prev;
      });
    } else {
      // Handle other checkbox inputs (for IndoorYN, RMO, etc.)
      setFormData(prev => ({ 
        ...prev, 
        [name]: checked ? 'Y' : 'N' 
      }));
    }
  } else if (type === 'number') {
    // Handle number inputs
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  } else {
    // Handle other inputs
    setFormData(prev => ({ ...prev, [name]: value }));
  }
};

// Handle form submission
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setError('');
//   setSuccess('');
  
//   try {
//     setLoading(true);
//     const token = localStorage.getItem('token');
    
//     // Create FormData object for file upload
//     const formDataToSend = new FormData();
    
//     // Add all form fields except Photo and VisitDays
//     Object.entries(formData).forEach(([key, value]) => {
//       if (key !== 'Photo' && key !== 'VisitDays' && value !== null) {
//         formDataToSend.append(key, value);
//       }
//     });
    
//     // Add photo separately if it exists
//     if (formData.Photo) {
//       formDataToSend.append('Photo', formData.Photo);
//     }
    
//     let response;
    
//     if (modalMode === 'edit') {
//       // Update doctor details
//       response = await axiosInstance.put(`/doctormaster/${selectedDoctor.DoctorId}`, formDataToSend, {
//         headers: { 
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data'
//         }
//       });
      
//       // If doctor updated successfully, update visit days
//       if (response.data && response.data.success) {
//         // First delete existing visit days
//         try {
//           await axiosInstance.delete(`/doctorvisitdt/${selectedDoctor.DoctorId}`, {
//             headers: { 'Authorization': `Bearer ${token}` }
//           });
//         } catch (err) {
//           console.error('Error deleting existing visit days:', err);
//         }
        
//         // Then add new visit days
//         const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
//         for (const dayId of formData.VisitDays) {
//           try {
//             await axiosInstance.post('/doctorvisitdt', {
//               DoctorId: selectedDoctor.DoctorId,
//               VDay: dayNames[dayId],
//               VisitOurId: 1 // Default value
//             }, {
//               headers: { 
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//               }
//             });
//           } catch (err) {
//             console.error(`Error adding visit day ${dayNames[dayId]}:`, err);
//           }
//         }
//       }
//     } else {
//       // Create new doctor
//       response = await axiosInstance.post('/doctormaster', formDataToSend, {
//         headers: { 
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data'
//         }
//       });
      
//       // If doctor created successfully, add visit days
//       if (response.data && response.data.success) {
//         const newDoctorId = response.data.data.doctorId;
        
//         // Add visit days one by one
//         const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
//         for (const dayId of formData.VisitDays) {
//           try {
//             await axiosInstance.post('/doctorvisitdt', {
//               DoctorId: newDoctorId,
//               VDay: dayNames[dayId],
//               VisitOurId: 1 // Default value
//             }, {
//               headers: { 
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//               }
//             });
//           } catch (err) {
//             console.error(`Error adding visit day ${dayNames[dayId]}:`, err);
//           }
//         }
//       }
//     }
    
//     if (response.data && response.data.success) {
//       setSuccess(modalMode === 'edit' ? 'Doctor updated successfully!' : 'Doctor created successfully!');
//       setShowModal(false);
//       fetchDoctors(); // Refresh the list
//     }
//   } catch (err) {
//     console.error('Error saving doctor:', err);
//     setError(err.response?.data?.message || 'Failed to save doctor. Please try again.');
//   } finally {
//     setLoading(false);
//   }
// };




// Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess('');
  
  try {
    setLoading(true);
    const token = localStorage.getItem('token');
    
    // Create FormData object for file upload
    const formDataToSend = new FormData();
    
    // Add all form fields except Photo and VisitDays
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'Photo' && key !== 'VisitDays' && value !== null) {
        formDataToSend.append(key, value);
      }
    });
    
    // Add photo separately if it exists
    if (formData.Photo) {
      formDataToSend.append('Photo', formData.Photo);
    }
    
    let response;
    
    if (modalMode === 'edit') {
      // Update doctor details
      response = await axiosInstance.put(`/doctormaster/${selectedDoctor.DoctorId}`, formDataToSend, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Update visit days separately
      try {
        await axiosInstance.put(`/doctorvisitdt/${selectedDoctor.DoctorId}`, {
          days: formData.VisitDays
        }, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      } catch (visitErr) {
        console.error('Error updating visit days:', visitErr);
      }
    } else {
      // Create new doctor
      response = await axiosInstance.post('/doctormaster', formDataToSend, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // If doctor created successfully, add visit days
      if (response.data && response.data.success && formData.VisitDays.length > 0) {
        const newDoctorId = response.data.data.doctorId;
        
        try {
          await axiosInstance.put(`/doctorvisitdt/${newDoctorId}`, {
            days: formData.VisitDays
          }, {
            headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
        } catch (visitErr) {
          console.error('Error adding visit days:', visitErr);
        }
      }
    }
    
    if (response.data && response.data.success) {
      setSuccess(modalMode === 'edit' ? 'Doctor updated successfully!' : 'Doctor created successfully!');
      setShowModal(false);
      fetchDoctors(); // Refresh the list
    }
  } catch (err) {
    console.error('Error saving doctor:', err);
    setError(err.response?.data?.message || 'Failed to save doctor. Please try again.');
  } finally {
    setLoading(false);
  }
};





  // Handle status toggle
  const handleStatusToggle = async (doctorId) => {
    try {
      const currentStatus = doctorStatuses[doctorId] || 'off';
      const newStatus = currentStatus === 'off' ? 'on' : 'off';
      
      const token = localStorage.getItem('token');
      const response = await axiosInstance.put(`/doctormaster/${doctorId}/status`, {
        status: newStatus
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.data && response.data.success) {
        setDoctorStatuses(prev => ({
          ...prev,
          [doctorId]: newStatus
        }));
        setSuccess(`Doctor status updated to ${newStatus === 'on' ? 'Active' : 'Inactive'}!`);
      }
    } catch (err) {
      console.error('Error updating doctor status:', err);
      setError('Failed to update doctor status. Please try again.');
    }
  };

  // Handle doctor deletion
  const handleDeleteDoctor = async (doctorId) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        const response = await axiosInstance.delete(`/doctormaster/${doctorId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.data && response.data.success) {
          setSuccess('Doctor deleted successfully!');
          fetchDoctors(); // Refresh the list
        }
      } catch (err) {
        console.error('Error deleting doctor:', err);
        setError(err.response?.data?.message || 'Failed to delete doctor. Please try again.');
      } finally {

        setLoading(false);
      }
    }
  };


// Visit days options
const weekDays = [
  { id: 0, name: 'Sunday' },
  { id: 1, name: 'Monday' },
  { id: 2, name: 'Tuesday' },
  { id: 3, name: 'Wednesday' },
  { id: 4, name: 'Thursday' },
  { id: 5, name: 'Friday' },
  { id: 6, name: 'Saturday' }
];

// Filter doctors by selected speciality
const filteredDoctors = () => {
  if (!selectedSpecialityFilter) return doctors;
  return doctors.filter(doctor => doctor.SpecialityId == selectedSpecialityFilter);
};

// Group doctors by speciality
const groupedDoctors = () => {
  const doctorsToShow = filteredDoctors();
  if (!groupBySpeciality) return { 'All Doctors': doctorsToShow };
  
  const grouped = {};
  doctorsToShow.forEach(doctor => {
    const speciality = specialities.find(s => s.SpecialityId === doctor.SpecialityId);
    const specialityName = speciality ? speciality.Speciality : 'Not specified';
    if (!grouped[specialityName]) {
      grouped[specialityName] = [];
    }
    grouped[specialityName].push(doctor);
  });
  return grouped;
};






// !   hear  bireswar  change  


const [showCameraModal, setShowCameraModal] = useState(false);


// Function to handle camera capture
// const handleCameraCapture = () => {
//   // Check if the browser supports getUserMedia
//   if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
//     setError('Your browser does not support camera access');
//     return;
//   }

//   // Create video and canvas elements
//   const video = document.createElement('video');
//   const canvas = document.createElement('canvas');
  
//   // Get user media (camera)
//   navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
//     .then(stream => {
//       // Show a modal with the camera feed
//       setShowCameraModal(true);
      
//       // Set up video element
//       video.srcObject = stream;
//       video.play();
      
//       // Function to capture photo
//       window.capturePhoto = () => {
//         // Set canvas dimensions to match video
//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;
        
//         // Draw video frame to canvas
//         canvas.getContext('2d').drawImage(video, 0, 0);
        
//         // Convert canvas to blob
//         canvas.toBlob(blob => {
//           // Create a File object from the blob
//           const file = new File([blob], `camera-capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
          
//           // Update form data
//           setFormData(prev => ({ ...prev, Photo: file }));
          
//           // Create preview URL
//           const reader = new FileReader();
//           reader.onloadend = () => {
//             setImagePreview(reader.result);
//           };
//           reader.readAsDataURL(file);
          
//           // Stop all video tracks
//           stream.getTracks().forEach(track => track.stop());
          
//           // Close the modal
//           setShowCameraModal(false);
//         }, 'image/jpeg');
//       };
//     })
//     .catch(err => {
//       console.error('Error accessing camera:', err);
//       setError('Failed to access camera. Please check permissions.');
//     });
// };







// Function to handle camera capture


const handleCameraCapture = () => {
  // Check if the browser supports getUserMedia
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    setError('Your browser does not support camera access');
    return;
  }

  // First show the modal
  setShowCameraModal(true);
  
  // Get user media (camera) after modal is shown
  setTimeout(() => {
    const videoElement = document.getElementById('camera-feed');
    
    if (!videoElement) {
      setError('Video element not found');
      return;
    }
    
    // Get user media (camera)
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
      .then(stream => {
        // Set up video element with the stream
        videoElement.srcObject = stream;
        
        // Function to capture photo
        window.capturePhoto = () => {
          // Create canvas element
          const canvas = document.createElement('canvas');
          canvas.width = videoElement.videoWidth;
          canvas.height = videoElement.videoHeight;
          
          // Draw video frame to canvas
          canvas.getContext('2d').drawImage(videoElement, 0, 0);
          
          // Convert canvas to blob
          canvas.toBlob(blob => {
            // Create a File object from the blob
            const file = new File([blob], `camera-capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
            
            // Update form data
            setFormData(prev => ({ ...prev, Photo: file }));
            
            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
              setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            
            // Stop all video tracks
            stream.getTracks().forEach(track => track.stop());
            
            // Close the modal
            setShowCameraModal(false);
          }, 'image/jpeg');
        };
      })
      .catch(err => {
        console.error('Error accessing camera:', err);
        setError('Failed to access camera. Please check permissions.');
        setShowCameraModal(false);
      });
  }, 500); // Small delay to ensure modal is rendered
};











  return (
    <MasterLayout>
      <Breadcrumb title="Doctor Management" />
      
      <Container fluid className="py-4">
        {error && (
          <Alert variant="danger" className="animate__animated animate__fadeIn">
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert variant="success" className="animate__animated animate__fadeIn">
            {success}
          </Alert>
        )}
        
        <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
          <Card.Header className="bg-gradient-primary text-white p-4">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <FaUserMd className="me-3" size={30} />
                <div>
                  <h4 className="mb-0 fw-bold">Doctors</h4>
                  <p className="mb-0 opacity-75">Manage hospital doctors</p>
                </div>
              </div>
              
              <div className="d-flex gap-2">
                <Button 
                  variant={groupBySpeciality ? 'light' : 'outline-light'}
                  size="sm"
                  onClick={() => setGroupBySpeciality(!groupBySpeciality)}
                >
                  {groupBySpeciality ? 'Show All' : 'Group by Speciality'}
                </Button>
                <Button 
                  variant="light" 
                  className="d-flex align-items-center"
                  onClick={handleAddDoctor}
                >
                  <FaPlus className="me-2" /> Add Doctor
                </Button>
              </div>
            </div>
          </Card.Header>
          
          <Card.Body>
            <Row className="mb-4">
              <Col md={6}>
                <Form onSubmit={handleSearchSubmit}>
                  <InputGroup>
                    <Form.Control
                      placeholder="Search doctors by name or qualification..."
                      value={search}
                      onChange={handleSearchChange}
                    />
                    <Button variant="primary" type="submit">
                      <FaSearch className="me-2" /> Search
                    </Button>
                  </InputGroup>
                </Form>
              </Col>
              <Col md={6}>
                <Form.Select 
                  value={selectedSpecialityFilter}
                  onChange={(e) => setSelectedSpecialityFilter(e.target.value)}
                  className="form-select"
                >
                  <option value="">All Specialities</option>
                  {specialities.map(speciality => (
                    <option key={speciality.SpecialityId} value={speciality.SpecialityId}>
                      {speciality.Speciality}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Loading doctors...</p>
              </div>
            ) : filteredDoctors().length === 0 ? (
              <div className="text-center py-5">
                <FaUserMd size={50} className="text-muted mb-3" />
                <h5>No doctors found</h5>
                <p className="text-muted">Add a new doctor to get started</p>
              </div>
            ) : (
              <div>
                {Object.entries(groupedDoctors()).map(([specialityName, doctorList]) => (
                  <div key={specialityName} className="mb-4">
                    {groupBySpeciality && (
                      <h5 className="text-primary mb-3 border-bottom pb-2">
                        <FaUserMd className="me-2" />
                        {specialityName} ({doctorList.length})
                      </h5>
                    )}
                    <div className="table-responsive">
                      <Table hover className="align-middle">
                        <thead>
                          <tr>
                            <th>Doctor Name</th>
                            <th>Qualification</th>
                            {!groupBySpeciality && <th>Speciality</th>}
                            <th>Contact</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {doctorList.map(doctor => (
                            <tr key={doctor.DoctorId}>
                              <td>
                                <div className="d-flex align-items-center">
                                  {doctor.hasPhoto ? (
                                    <img 
                                      src={`${axiosInstance.defaults.baseURL}/api/v1/doctormaster/${doctor.DoctorId}/photo`} 
                                      alt={doctor.Doctor}
                                      className="rounded-circle me-2"
                                      style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                    />
                                  ) : (
                                    <div 
                                      className="rounded-circle bg-light d-flex align-items-center justify-content-center me-2"
                                      style={{ width: '40px', height: '40px' }}
                                    >
                                      <FaUserMd className="text-secondary" />
                                    </div>
                                  )}
                                  {doctor.Doctor}
                                </div>
                              </td>
                              <td>{doctor.Qualification}</td>
                              {!groupBySpeciality && (
                                <td>
                                  {doctor.SpecialityId && specialities.find(s => s.SpecialityId === doctor.SpecialityId)?.Speciality || 'Not specified'}
                                </td>
                              )}
                              <td>{doctor.Phone || '-'}</td>
                              <td>
                                <Badge bg={doctor.IndoorYN === 'Y' ? 'success' : 'secondary'}>
                                  {doctor.IndoorYN === 'Y' ? 'Indoor' : 'Outdoor'}
                                </Badge>
                                {doctor.RMO === 'Y' && (
                                  <Badge bg="info" className="ms-1">RMO</Badge>
                                )}
                              </td>
                              <td>
                                <Button
                                  variant={doctorStatuses[doctor.DoctorId] === 'on' ? 'success' : 'danger'}
                                  size="sm"
                                  onClick={() => handleStatusToggle(doctor.DoctorId)}
                                >
                                  {doctorStatuses[doctor.DoctorId] === 'on' ? 'Active' : 'Inactive'}
                                </Button>
                              </td>
                              <td>
                                <div className="d-flex gap-2">
                                  <Button 
                                    variant="outline-primary" 
                                    size="sm"
                                    onClick={() => handleEditDoctor(doctor.DoctorId)}
                                    title="Edit doctor"
                                  >
                                    <FaEdit />
                                  </Button>
                                  <Button 
                                    variant="outline-danger" 
                                    size="sm"
                                    onClick={() => handleDeleteDoctor(doctor.DoctorId)}
                                    title="Delete doctor"
                                  >
                                    <FaTrash />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>
      
      {/* Doctor Form Modal */}
      {/* <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton className="bg-light">
          <Modal.Title>
            {modalMode === 'create' ? 'Add New Doctor' : 'Edit Doctor'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Row className="g-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Doctor Name <span className="text-danger">*</span></Form.Label>
                  <Form.Control 
                    type="text" 
                    name="Doctor" 
                    value={formData.Doctor} 
                    onChange={handleChange}
                    required
                    placeholder="Enter doctor's full name"
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Qualification</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="Qualification" 
                    value={formData.Qualification} 
                    onChange={handleChange}
                    placeholder="e.g., MBBS, MD, MS"
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Speciality</Form.Label>
                  <Form.Select 
                    name="SpecialityId" 
                    value={formData.SpecialityId} 
                    onChange={handleChange}
                  >
                    <option value="">-- Select Speciality --</option>
                    {specialities.map(speciality => (
                      <option key={speciality.SpecialityId} value={speciality.SpecialityId}>
                        {speciality.Speciality}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="Phone" 
                    value={formData.Phone} 
                    onChange={handleChange}
                    placeholder="Enter contact number"
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <div className="d-flex flex-column h-100">
                  <div className="mb-3">
                    <Form.Check 
                      type="checkbox"
                      id="indoorDoctor"
                      label="Indoor Doctor"
                      name="IndoorYN"
                      checked={formData.IndoorYN === 'Y'}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <Form.Check 
                      type="checkbox"
                      id="rmoDoctor"
                      label="RMO Doctor"
                      name="RMO"
                      checked={formData.RMO === 'Y'}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </Col>
              
              <Col md={6}>
                <div className="h-100 d-flex flex-column">
                  <Form.Label>Doctor's Photo</Form.Label>
                  <div className="flex-grow-1 border rounded-3 p-3 d-flex flex-column align-items-center justify-content-center position-relative">
                    {imagePreview ? (
                      <div className="text-center">
                        <img 
                          src={imagePreview} 
                          alt="Doctor preview" 
                          className="img-fluid mb-2" 
                          style={{ maxHeight: '200px', maxWidth: '100%' }}
                          onError={(e) => {
                            console.log('Image failed to load');
                            e.target.style.display = 'none';
                            setImagePreview(null);
                          }}
                        />
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => {
                            setImagePreview(null);
                            setFormData(prev => ({ ...prev, Photo: null }));
                          }}
                        >
                          <FaTimes className="me-1" /> Remove Photo
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center text-muted">
                        <FaUserMd size={60} className="mb-3 opacity-50" />
                        <p>No photo selected</p>
                        <Form.Control 
                          type="file" 
                          name="Photo" 
                          onChange={handleChange}
                          accept="image/*"
                          className="d-none"
                          id="photoUpload"
                        />
                        <label htmlFor="photoUpload" className="btn btn-outline-primary">
                          <FaImage className="me-2" /> Select Photo
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button 
              variant="primary" 
              type="submit"
              disabled={loading}
              className="d-flex align-items-center"
            >
              {loading ? (
                <>
                  <Spinner 
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Saving...
                </>
              ) : (
                <>
                  <FaSave className="me-2" /> {modalMode === 'create' ? 'Create Doctor' : 'Update Doctor'}
                </>
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal> */}
      




{/* Doctor Form Modal */}
<Modal 
  show={showModal} 
  onHide={() => setShowModal(false)}
  size="xl"
  centered
>
  <Modal.Header closeButton className="bg-light">
    <Modal.Title>
      {modalMode === 'create' ? 'Add New Doctor' : 'Edit Doctor'}
    </Modal.Title>
  </Modal.Header>
  <Form onSubmit={handleSubmit}>
    <Modal.Body>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Tabs defaultActiveKey="basic" className="mb-4">
        <Tab eventKey="basic" title="Basic Information">
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Doctor Name <span className="text-danger">*</span></Form.Label>
                <Form.Control 
                  type="text" 
                  name="Doctor" 
                  value={formData.Doctor} 
                  onChange={handleChange}
                  required
                  placeholder="Enter doctor's full name"
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group>
                <Form.Label>Registration No.</Form.Label>
                <Form.Control 
                  type="text" 
                  name="RegistrationNo" 
                  value={formData.RegistrationNo} 
                  onChange={handleChange}
                  placeholder="Enter registration number"
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group>
                <Form.Label>Speciality</Form.Label>
                <Form.Select 
                  name="SpecialityId" 
                  value={formData.SpecialityId} 
                  onChange={handleChange}
                >
                  <option value="">-- Select Speciality --</option>
                  {specialities.map(speciality => (
                    <option key={speciality.SpecialityId} value={speciality.SpecialityId}>
                      {speciality.Speciality}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control 
                  type="text" 
                  name="Phone" 
                  value={formData.Phone} 
                  onChange={handleChange}
                  placeholder="Enter contact number"
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group>
                <Form.Label>Fax</Form.Label>
                <Form.Control 
                  type="text" 
                  name="Fax" 
                  value={formData.Fax} 
                  onChange={handleChange}
                  placeholder="Enter fax number"
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group>
                <Form.Label>Identification</Form.Label>
                <Form.Control 
                  type="text" 
                  name="Identification" 
                  value={formData.Identification} 
                  onChange={handleChange}
                  placeholder="Enter identification details"
                />
              </Form.Group>
            </Col>
            
            <Col md={12}>
              <Form.Group>
                <Form.Label>Address Line 1</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={2}
                  name="Add1" 
                  value={formData.Add1} 
                  onChange={handleChange}
                  placeholder="Enter address line 1"
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group>
                <Form.Label>Address Line 2</Form.Label>
                <Form.Control 
                  type="text" 
                  name="Add2" 
                  value={formData.Add2} 
                  onChange={handleChange}
                  placeholder="Enter address line 2"
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group>
                <Form.Label>Address Line 3</Form.Label>
                <Form.Control 
                  type="text" 
                  name="Add3" 
                  value={formData.Add3} 
                  onChange={handleChange}
                  placeholder="Enter address line 3"
                />
              </Form.Group>
            </Col>
          </Row>
        </Tab>
        
        <Tab eventKey="qualifications" title="Qualifications">
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Primary Qualification</Form.Label>
                <Form.Control 
                  type="text" 
                  name="Qualification" 
                  value={formData.Qualification} 
                  onChange={handleChange}
                  placeholder="e.g., MBBS, MD"
                />
              </Form.Group>
            </Col>
            




            




            {/* !   this is all  ok if  you add  other  skell  then  save hear   */}
            {/* <Col md={6}>
              <Form.Group>
                <Form.Label>Qualification 2</Form.Label>
                <Form.Control 
                  type="text" 
                  name="Qualification2" 
                  value={formData.Qualification2} 
                  onChange={handleChange}
                  placeholder="Additional qualification"
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group>
                <Form.Label>Qualification 3</Form.Label>
                <Form.Control 
                  type="text" 
                  name="Qualification3" 
                  value={formData.Qualification3} 
                  onChange={handleChange}
                  placeholder="Additional qualification"
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group>
                <Form.Label>Qualification 4</Form.Label>
                <Form.Control 
                  type="text" 
                  name="Qualification4" 
                  value={formData.Qualification4} 
                  onChange={handleChange}
                  placeholder="Additional qualification"
                />
              </Form.Group>
            </Col>
             */}
         



<Col md={6}>
  <Form.Group>
    <Form.Label>Doctor's Photo</Form.Label>
    <div className="border rounded-3 p-3 d-flex flex-column align-items-center justify-content-center position-relative">
      {imagePreview ? (
        <div className="text-center">
          <img 
            src={imagePreview} 
            alt="Doctor preview" 
            className="img-fluid mb-2" 
            style={{ maxHeight: '200px', maxWidth: '100%' }}
            onError={(e) => {
              console.log('Image failed to load');
              e.target.style.display = 'none';
              setImagePreview(null);
            }}
          />
          <Button 
            variant="outline-danger" 
            size="sm"
            onClick={() => {
              setImagePreview(null);
              setFormData(prev => ({ ...prev, Photo: null }));
            }}
          >
            <FaTimes className="me-1" /> Remove Photo
          </Button>
        </div>
      ) : (
        // <div className="text-center text-muted">
        //   <FaUserMd size={60} className="mb-3 opacity-50" />
        //   <p>No photo selected</p>
          
        //   <div className="d-flex gap-2 justify-content-center">
        //     {/* File upload option */}
        //     <Form.Control 
        //       type="file" 
        //       name="Photo" 
        //       onChange={handleChange}
        //       accept="image/*"
        //       className="d-none"
        //       id="photoUpload"
        //     />
        //     <label htmlFor="photoUpload" className="btn btn-outline-primary">
        //       <FaImage className="me-2" /> Select File
        //     </label>
            
           















        //   </div>
        // </div>







        <div className="text-center text-muted">
  <FaUserMd size={60} className="mb-3 opacity-50" />
  <p>No photo selected</p>
  
  <div className="d-flex gap-2 justify-content-center">
    {/* File upload option */}
    <Form.Control 
      type="file" 
      name="Photo" 
      onChange={handleChange}
      accept="image/*"
      className="d-none"
      id="photoUpload"
    />
    <label htmlFor="photoUpload" className="btn btn-outline-primary">
      <FaImage className="me-2" /> Select File
    </label>
    
    {/* Camera capture option */}
    <Button 
      variant="outline-info" 
      onClick={handleCameraCapture}
    >
      <FaCamera className="me-2" /> Take Photo
    </Button>
  </div>
</div>










      )}
    </div>
  </Form.Group>
</Col>








          </Row>
        </Tab>
        
        <Tab eventKey="rates" title="Rates & Settings">
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Indoor Rate</Form.Label>
                <Form.Control 
                  type="number" 
                  name="IndoorRate" 
                  value={formData.IndoorRate} 
                  onChange={handleChange}
                  placeholder="Enter indoor rate"
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group>
                <Form.Label>ICU Rate</Form.Label>
                <Form.Control 
                  type="number" 
                  name="ICURate" 
                  value={formData.ICURate} 
                  onChange={handleChange}
                  placeholder="Enter ICU rate"
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group>
                <Form.Label>CAB Rate</Form.Label>
                <Form.Control 
                  type="number" 
                  name="CABRate" 
                  value={formData.CABRate} 
                  onChange={handleChange}
                  placeholder="Enter CAB rate"
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group>
                <Form.Label>SUIT Rate</Form.Label>
                <Form.Control 
                  type="number" 
                  name="SUITRate" 
                  value={formData.SUITRate} 
                  onChange={handleChange}
                  placeholder="Enter SUIT rate"
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group>
                <Form.Label>Fixed Discount</Form.Label>
                <Form.Control 
                  type="number" 
                  name="FixedDiscount" 
                  value={formData.FixedDiscount} 
                  onChange={handleChange}
                  placeholder="Enter fixed discount"
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group>
                <Form.Label>Area Code</Form.Label>
                <Form.Control 
                  type="number" 
                  name="areacode" 
                  value={formData.areacode} 
                  onChange={handleChange}
                  placeholder="Enter area code"
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group>
                <Form.Label>Doctor Type</Form.Label>
                <div className="mt-2">
                  <Form.Check 
                    type="checkbox"
                    id="indoorDoctor"
                    label="Indoor Doctor"
                    name="IndoorYN"
                    checked={formData.IndoorYN === 'Y'}
                    onChange={handleChange}
                  />
                  
                  <Form.Check 
                    type="checkbox"
                    id="rmoDoctor"
                    label="RMO Doctor"
                    name="RMO"
                    checked={formData.RMO === 'Y'}
                    onChange={handleChange}
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Tab>
        
        <Tab eventKey="visitDays" title="Visit Days">
          <Row className="g-3">
            <Col md={12}>
              <Form.Group>
                <Form.Label className="d-flex align-items-center mb-3">
                  <FaCalendarAlt className="me-2" /> Doctor Visit Days
                </Form.Label>
                <div className="d-flex flex-wrap gap-3">
                  {weekDays.map(day => (
                    <Form.Check 
                      key={day.id}
                      type="checkbox"
                      id={`day-${day.id}`}
                      label={day.name}
                      name="visitDay"
                      value={day.id}
                      checked={formData.VisitDays.includes(day.id)}
                      onChange={handleChange}
                      className="me-3"
                    />
                  ))}
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Tab>
      </Tabs>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowModal(false)}>
        Cancel
      </Button>
      <Button 
        variant="primary" 
        type="submit"
        disabled={loading}
        className="d-flex align-items-center"
      >
        {loading ? (
          <>
            <Spinner 
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="me-2"
            />
            Saving...
          </>
        ) : (
          <>
            <FaSave className="me-2" /> {modalMode === 'create' ? 'Create Doctor' : 'Update Doctor'}
          </>
        )}
      </Button>
    </Modal.Footer>
  </Form>
</Modal>







{/* !  hear  bireswar change   */}

{/* Camera Modal */}
<Modal 
  show={showCameraModal} 
  onHide={() => {
    // Stop all video tracks when closing
    const videoEl = document.querySelector('#camera-feed');
    if (videoEl && videoEl.srcObject) {
      videoEl.srcObject.getTracks().forEach(track => track.stop());
    }
    setShowCameraModal(false);
  }}
  centered
>
  <Modal.Header closeButton>
    <Modal.Title>Take Photo</Modal.Title>
  </Modal.Header>
  <Modal.Body className="text-center">
    <video 
      id="camera-feed" 
      autoPlay 
      playsInline 
      style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
    ></video>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => {
      // Stop all video tracks when closing
      const videoEl = document.querySelector('#camera-feed');
      if (videoEl && videoEl.srcObject) {
        videoEl.srcObject.getTracks().forEach(track => track.stop());
      }
      setShowCameraModal(false);
    }}>
      Cancel
    </Button>
    <Button variant="primary" onClick={() => window.capturePhoto()}>
      <FaCamera className="me-2" /> Capture
    </Button>
  </Modal.Footer>
</Modal>







      <style>{`
        .bg-gradient-primary {
          background: linear-gradient(135deg, #3a50a0 0%, #788dce 100%);
        }
        
        .animate__animated {
          animation-duration: 0.5s;
        }
        
        .animate__fadeIn {
          animation-name: fadeIn;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </MasterLayout>
  );
};

export default DoctorManagement;