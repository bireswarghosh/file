
// import React, { useState } from 'react';
// import { jsPDF } from 'jspdf'; // Import jsPDF

// const Visit_entry = () => {

//     const [isModalOpen, setIsModalOpen] = useState(false);
  
//     // State for form inputs
//     const [formData, setFormData] = useState({
//       visitDate: '2025-03-27',
//       visitTime: '08:32',
//       status: '0',
//       department: 'Orthopaedic',
//       doctorName: 'MD SALAHUDDIN',
//       companyName: 'N',
//       admissionWeight: '0.00',
//       height: '0.00',
//       bpMin: '0',
//       bpMax: '0',
//       newRegNo: 'S-017168/24-25',
//       byC: 'N',
//       byRegNo: 'SALAUDDIN KHAN',
//       regDate: '2024-03-03',
//       regTime: '08:32',
//       searchBy: 'Patient In',
//       opdNumber: 'RRR00462',
//       sex: 'M',
//       dob: '1985-03-27',
//       age: '40 Y 0 M 0 D',
//       email: '',
//       phone: '847861904',
//       religion: 'Muslim',
//       area: 'Howrah',
//       address: 'BAKULTALA, BAKSARA, HOWRAH',
//       maritalStatus: 'M',
//       cardNumber: 'S-017168/24-25',
//     });
  
//     const openModal = () => {
//       setIsModalOpen(true);
//     };
  
//     const closeModal = () => {
//       setIsModalOpen(false);
//     };
  
//     const handleInputChange = (e) => {
//       const { name, value } = e.target;
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     };
  
//     const handlePrint = () => {
//       const doc = new jsPDF();
  
//       // Set default font and size
//       doc.setFont('helvetica', 'normal');
//       doc.setFontSize(10);
  
//       // Header: Hospital Name and Details
//       doc.setFontSize(12);
//       doc.setFont('helvetica', 'bold');
//       doc.text('LORDS HEALTH CARE', 105, 15, { align: 'center' });
  
//       doc.setFontSize(8);
//       doc.setFont('helvetica', 'normal');
//       doc.text('13/3, 2nd Bye Lane, Kona Howrah', 105, 22, { align: 'center' });
//       doc.text('Phone No: 827209444 HELPLINE: 700375874 Toll Free No: 1800-309-0895', 105, 27, { align: 'center' });
//       doc.text('E-mail: patientdesk@lordshealthcare.org Website: www.lordshealthcare.org', 105, 32, { align: 'center' });
  
//       // Logo Placeholder (replace with base64 image if available)
//       doc.setFontSize(10);
//       doc.text('[Logo Placeholder]', 10, 15);
  
//       // Title: ADVANCE BOOKING MONEY RECEIPT
//       doc.setFontSize(12);
//       doc.setFont('helvetica', 'bold');
//       doc.text('ADVANCE BOOKING MONEY RECEIPT', 105, 42, { align: 'center' });
  
//       // Barcode Placeholder
//       doc.setFontSize(8);
//       doc.text(formData.newRegNo, 160, 42);
  
//       // Line below title
//       doc.setLineWidth(0.5);
//       doc.line(10, 45, 200, 45);
  
//       // Registration Details
//       doc.setFontSize(10);
//       doc.setFont('helvetica', 'normal');
//       doc.text(`REGISTRATION ID: ${formData.newRegNo}`, 10, 55);
//       doc.text(`Registration Date: ${formData.regDate}`, 70, 55);
//       doc.text(`Booking Time: ${formData.regTime}`, 140, 55);
  
//       doc.text(`Visit Date: ${formData.visitDate}`, 10, 62);
//       doc.text(`Visit Time: ${formData.visitTime}`, 70, 62);
//       doc.text(formData.opdNumber, 140, 62);
  
//       doc.text(`PATIENT NAME: ${formData.byRegNo}`, 10, 69);
//       doc.text(`Age: ${formData.age}`, 70, 69);
//       doc.text(`Sex: ${formData.sex === 'M' ? 'Male' : 'Female'}`, 140, 69);
  
//       doc.text(`ADDRESS: ${formData.address}`, 10, 76);
//       doc.text(`Contact No: ${formData.phone}`, 140, 76);
  
//       doc.text(`CONSULTANT: Dr. ${formData.doctorName}`, 10, 83);
//       doc.text(`DEPARTMENT: ${formData.department}`, 140, 83);
  
//       // Table: Particulars / Description of Service Charges
//       doc.setFont('helvetica', 'bold');
//       doc.text('Particulars / Description of Service Charges', 10, 93);
//       doc.text('Amount in Rs.', 160, 93);
  
//       doc.setLineWidth(0.2);
//       doc.line(10, 96, 200, 96); // Line above table content
  
//       doc.setFont('helvetica', 'normal');
//       doc.text('CONSULTATION - HOSPITAL CHARGE', 10, 103);
//       doc.text('500.00', 160, 103);
  
//       doc.line(10, 106, 200, 106); // Line below table content
  
//       // Additional Note
//       doc.text(`RECEIVED WITH THANKS FOR CONSULTATION CHARGES FROM ${formData.byRegNo}.`, 10, 113);
  
//       // Total Paid
//       doc.setFont('helvetica', 'bold');
//       doc.text('PAID: Rupees six hundred & zero only', 10, 120);
//       doc.text('600.00', 160, 120);
  
//       // Footer: Received By
//       doc.setFont('helvetica', 'normal');
//       doc.text('Received By: SUSANTA', 10, 130);
  
//       // Output the PDF as a blob and open in a new tab
//       const pdfOutput = doc.output('blob');
//       const url = URL.createObjectURL(pdfOutput);
//       window.open(url, '_blank');
//     };


//   return (
//     <div className="app-container">
//     <div className="button-group">
//       <button onClick={openModal}>Visit Entry</button>
//     </div>

//     {/* Modal */}
//   {/* Modal */}
// {isModalOpen && (
// <div className="modal">
//   <div className="modal-content large">
//     {/* Close Button */}
//     <button className="close-button" onClick={closeModal}>
//       ×
//     </button>
//     <h2>Visit Entry Form</h2>

//     <div className="modal-form">
//       {/* Left Column */}
//       <div className="modal-col">
//         <div className="form-section">
//           <h3>Booking Detail</h3>
//           <div className="form-row">
//             <label>Visit Date</label>
//             <input type="date" name="visitDate" value={formData.visitDate} onChange={handleInputChange} />
//             <label>Visit Time</label>
//             <input type="time" name="visitTime" value={formData.visitTime} onChange={handleInputChange} />
//             <label>Status</label>
//             <input type="text" name="status" value={formData.status} onChange={handleInputChange} />
//           </div>
//         </div>

//         <div className="form-section">
//           <h3>Doctor Detail</h3>
//           <div className="form-row">
//             <label>Department</label>
//             <select name="department" value={formData.department} onChange={handleInputChange}>
//               <option>Orthopaedic</option>
//             </select>
//             <label>Doctor Name</label>
//             <select name="doctorName" value={formData.doctorName} onChange={handleInputChange}>
//               <option>MD SALAHUDDIN</option>
//             </select>
//             <label>Company Name</label>
//             <select name="companyName" value={formData.companyName} onChange={handleInputChange}>
//               <option>N</option>
//             </select>
//             <label>Admission Weight</label>
//             <input type="text" name="admissionWeight" value={formData.admissionWeight} onChange={handleInputChange} />
//             <label>Height</label>
//             <input type="text" name="height" value={formData.height} onChange={handleInputChange} />
//             <label>BP Min</label>
//             <input type="text" name="bpMin" value={formData.bpMin} onChange={handleInputChange} />
//             <label>BP Max</label>
//             <input type="text" name="bpMax" value={formData.bpMax} onChange={handleInputChange} />
//           </div>
//         </div>
//       </div>

//       {/* Right Column */}
//       <div className="modal-col">
//         <div className="form-section">
//           <h3>Registration Detail</h3>
//           <div className="form-row">
//             <label>New Reg No</label>
//             <input type="text" name="newRegNo" value={formData.newRegNo} onChange={handleInputChange} />
//             <label>By C</label>
//             <select name="byC" value={formData.byC} onChange={handleInputChange}>
//               <option>N</option>
//               <option>Y</option>
//             </select>
//             <label>By Reg No</label>
//             <input type="text" name="byRegNo" value={formData.byRegNo} onChange={handleInputChange} />
//             <label>Reg Date</label>
//             <input type="date" name="regDate" value={formData.regDate} onChange={handleInputChange} />
//             <label>Reg Time</label>
//             <input type="time" name="regTime" value={formData.regTime} onChange={handleInputChange} />
//             <label>Search By</label>
//             <select name="searchBy" value={formData.searchBy} onChange={handleInputChange}>
//               <option>Patient In</option>
//             </select>
//             <label>OPD Number</label>
//             <input type="text" name="opdNumber" value={formData.opdNumber} onChange={handleInputChange} />
//           </div>
//         </div>

//         <div className="form-section">
//           <h3>Patient Info</h3>
//           <div className="form-row">
//             <label>Sex</label>
//             <select name="sex" value={formData.sex} onChange={handleInputChange}>
//               <option>M</option>
//               <option>F</option>
//             </select>
//             <label>Date of Birth</label>
//             <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} />
//             <label>Age</label>
//             <input type="text" name="age" value={formData.age} onChange={handleInputChange} />
//             <label>Email ID</label>
//             <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
//             <label>Phone</label>
//             <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
//             <label>Religion</label>
//             <select name="religion" value={formData.religion} onChange={handleInputChange}>
//               <option>Muslim</option>
//             </select>
//             <label>Area/P.S.</label>
//             <select name="area" value={formData.area} onChange={handleInputChange}>
//               <option>Howrah</option>
//             </select>
//             <label>Address</label>
//             <textarea name="address" value={formData.address} onChange={handleInputChange} />
//             <label>Marital Status</label>
//             <select name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange}>
//               <option>M</option>
//               <option>S</option>
//             </select>
//             <label>Card Number</label>
//             <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} />
//           </div>
//         </div>
//       </div>
//     </div>

//     <div className="action-buttons">
//       <button>New</button>
//       <button>Edit</button>
//       <button>Save</button>
//       <button>Delete</button>
//       <button>Undo</button>
//       <button onClick={handlePrint}>Print</button>
//     </div>
//   </div>
// </div>
// )}



//   </div>
//   )
// }

// export default Visit_entry











import React, { useState } from 'react';

const Visit_entry = () => {
  const [formData, setFormData] = useState({
    visitDate: '2025-03-27',
    visitTime: '08:32',
    status: '0',
    department: 'Orthopaedic',
    doctorName: 'MD SALAHUDDIN',
    companyName: 'N',
    admissionWeight: '0.00',
    height: '0.00',
    bpMin: '0',
    bpMax: '0',
    newRegNo: 'S-017168/24-25',
    byC: 'N',
    byRegNo: 'SALAUDDIN KHAN',
    regDate: '2024-03-03',
    regTime: '08:32',
    searchBy: 'Patient In',
    opdNumber: 'RRR00462',
    sex: 'M',
    dob: '1985-03-27',
    age: '40 Y 0 M 0 D',
    email: '',
    phone: '847861904',
    religion: 'Muslim',
    area: 'Howrah',
    address: 'BAKULTALA, BAKSARA, HOWRAH',
    maritalStatus: 'M',
    cardNumber: 'S-017168/24-25',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="col-md-6">
      <div className="card">
        <div className="card-header">
          <h6 className="card-title mb-0">Visit Entry Form</h6>
        </div>
        <div className="card-body">
          <div className="row gy-3">
            <div className="col-12">
              <label className="form-label">Visit Date</label>
              <input
                type="date"
                name="visitDate"
                className="form-control"
                value={formData.visitDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12">
              <label className="form-label">Visit Time</label>
              <input
                type="time"
                name="visitTime"
                className="form-control"
                value={formData.visitTime}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12">
              <label className="form-label">Status</label>
              <input
                type="text"
                name="status"
                className="form-control"
                value={formData.status}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12">
              <label className="form-label">Department</label>
              <select
                name="department"
                className="form-select"
                value={formData.department}
                onChange={handleInputChange}
              >
                <option>Orthopaedic</option>
              </select>
            </div>
            <div className="col-12">
              <label className="form-label">Doctor Name</label>
              <select
                name="doctorName"
                className="form-select"
                value={formData.doctorName}
                onChange={handleInputChange}
              >
                <option>MD SALAHUDDIN</option>
              </select>
            </div>
            <div className="col-12">
              <label className="form-label">Admission Weight</label>
              <input
                type="text"
                name="admissionWeight"
                className="form-control"
                value={formData.admissionWeight}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12">
              <label className="form-label">Height</label>
              <input
                type="text"
                name="height"
                className="form-control"
                value={formData.height}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12">
              <label className="form-label">BP Min</label>
              <input
                type="text"
                name="bpMin"
                className="form-control"
                value={formData.bpMin}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12">
              <label className="form-label">BP Max</label>
              <input
                type="text"
                name="bpMax"
                className="form-control"
                value={formData.bpMax}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12">
              <label className="form-label">Phone</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12">
              <label className="form-label">Address</label>
              <textarea
                name="address"
                className="form-control"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visit_entry;