import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../../axiosInstance'; // Adjust the import path as necessary
const DoctorSelect = ({ formData, setFormData, departmentId }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem('token');
        let url = '/doctor';
        
        // If departmentId is provided, fetch doctors by department
        if (departmentId) {
          url = `/doctor/department/${departmentId}`;
        }
        
        const response = await axiosInstance.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.data && response.data.success) {
          setDoctors(response.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDoctors();
  }, [departmentId]);

  const handleDoctorChange = (e) => {
    const doctorId = e.target.value;
    const selectedDoctor = doctors.find(doc => doc.DoctorId.toString() === doctorId);
    
    setFormData(prev => ({
      ...prev,
      doctorId: doctorId,
      docName: selectedDoctor ? selectedDoctor.Doctor : ""
    }));
  };

  if (loading) {
    return (
      <>
        <label htmlFor="docName" className="form-label fw-bold text-dark">
          Doctor Name
        </label>
        <select 
          className="form-select form-select-sm"
          disabled
        >
          <option>Loading doctors...</option>
        </select>
      </>
    );
  }

  return (
    <>
      <label htmlFor="doctorId" className="form-label fw-bold text-dark">
        Doctor Name
      </label>
      <select 
        id="doctorId" 
        name="doctorId"
        className="form-select form-select-sm"
        value={formData.doctorId || ""}
        onChange={handleDoctorChange}
      >
        <option value="">Select Doctor</option>
        {doctors.map(doctor => (
          <option key={doctor.DoctorId} value={doctor.DoctorId}>
            {doctor.Doctor}
          </option>
        ))}
      </select>
    </>
  );
};

export default DoctorSelect;
















