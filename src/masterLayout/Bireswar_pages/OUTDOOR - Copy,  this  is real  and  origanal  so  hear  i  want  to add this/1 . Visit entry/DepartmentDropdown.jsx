import React, { useState, useEffect } from 'react';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_LOARDS_HOSPITIAL_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const DepartmentDropdown = ({ value, onChange }) => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };
    
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const deptId = e.target.value;
    const selectedDept = departments.find(dept => dept.DepartmentId.toString() === deptId);
    
    onChange({
      target: {
        name: 'deptId',
        value: deptId,
        selectedDept: selectedDept ? selectedDept.Department : ''
      }
    });
  };

  if (loading) {
    return (
      <select className="form-select form-select-sm mb-2" disabled>
        <option>Loading departments...</option>
      </select>
    );
  }

  return (
    <select 
      id="deptId" 
      name="deptId"
      className="form-select form-select-sm mb-2"
      value={value || ""}
      onChange={handleChange}
    >
      <option value="">Select Department</option>
      {departments.map(dept => (
        <option key={dept.DepartmentId} value={dept.DepartmentId}>
          {dept.Department}
        </option>
      ))}
    </select>
  );
};

export default DepartmentDropdown;