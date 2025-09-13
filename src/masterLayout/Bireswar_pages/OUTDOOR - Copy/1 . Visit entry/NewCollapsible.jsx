import React, { useState, useEffect } from "react";
import CollapsibleForm from "./CollapsibleForm";
import axiosInstance from "../../../../axiosInstance";

const NewCollapsible = () => {
  const [formData, setFormData] = useState({
    Booking: "",
    AdmitionDate: "",
    AdmitionTime: "",
    quota: false,
    queueNo: "",
    OPD: "",
    PatientName: "",
    PhoneNo: "",
    GurdianName: "",
    Relation: "",
    Sex: "",
    dob: "",
    Age: "",
    ageMonths: "",
    ageDays: "",
    Weight: "",
    Height: "",
    BpMin: "",
    BpMax: "",
    MStatus: "",
    Company: "",
    fullAddress: "",
    Add1: "",
    Add2: "",
    Add3: "",
    ReligionId: "",
    DepartmentId: "",
    doctorId: "",
    docName: "",
    dept: "",
    billNo: "",
    billDate: "",
    BillTime: "",
    typeOfVisit: "",
    regnCh: "",
    proffCh: "",
    svrCh: "",
    pDisc: "",
    proffDisc: "",
    srvChDisc: "",
    billAmt: "",
    narration: "",
    receiptAmount: "",
    dueAmount: "",
    receiptType: "CASH",
    finalReceiptAmt: "",
    bankName: "",
    CardNo: ""
  });

  const [religions, setReligions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchReligions();
    fetchDepartments();
  }, []);

  const fetchReligions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.get('/religion', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data && response.data.success) {
        setReligions(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching religions:", error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.get('/department', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data && response.data.success) {
        setDepartments(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    if (name === "dob" && value) {
      const birthDate = new Date(value);
      const today = new Date();
      
      let years = today.getFullYear() - birthDate.getFullYear();
      let months = today.getMonth() - birthDate.getMonth();
      let days = today.getDate() - birthDate.getDate();
      
      if (days < 0) {
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
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
        ageMonths: months.toString(),
        ageDays: days.toString()
      }));
    } else if (name === "fullAddress") {
      setFormData(prev => ({
        ...prev,
        fullAddress: value,
        Add1: value,
        Add2: "",
        Add3: ""
      }));
    } else if (name === "DepartmentId") {
      const selectedDept = departments.find(dept => dept.DepartmentId.toString() === value);
      setFormData(prev => ({
        ...prev,
        DepartmentId: value,
        dept: selectedDept ? selectedDept.Department : "",
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
      const dataToSubmit = {
        ...formData,
        UCDoctor1Id: formData.doctorId
      };
      
      const token = localStorage.getItem('token');
      const response = await axiosInstance.post('/admission', dataToSubmit, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.Status === 200 || response.Status === 201) {
        alert("Visit entry submitted successfully!");
      } else {
        alert("Failed to submit visit entry. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
    
    setValidated(true);
  };

  return (
    <CollapsibleForm 
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      validated={validated}
      religions={religions}
      departments={departments}
      setFormData={setFormData}
    />
  );
};

export default NewCollapsible;