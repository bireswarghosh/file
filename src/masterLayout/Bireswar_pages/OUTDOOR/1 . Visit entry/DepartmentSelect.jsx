import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_LOARDS_HOSPITIAL_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const DepartmentSelect = ({ formData, setFormData }) => {
  const [departments, setDepartments] = useState([]);

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

  const handleDepartmentChange = (e) => {
    const deptId = e.target.value;
    const selectedDept = departments.find(dept => dept.DepartmentId.toString() === deptId);
    
    setFormData(prev => ({
      ...prev,
      deptId: deptId,
      dept: selectedDept ? selectedDept.Department : ""
    }));
  };

  return (
    <>
      <label htmlFor="dept" className="form-label fw-bold text-dark">
        Department
      </label>
      <select 
        id="dept" 
        name="deptId"
        className="form-select form-select-sm mb-2"
        value={formData.deptId || ""}
        onChange={handleDepartmentChange}
      >
        <option value="">Select Department</option>
        {departments.map(dept => (
          <option key={dept.DepartmentId} value={dept.DepartmentId}>
            {dept.Department}
          </option>
        ))}
      </select>
    </>
  );
};

export default DepartmentSelect;