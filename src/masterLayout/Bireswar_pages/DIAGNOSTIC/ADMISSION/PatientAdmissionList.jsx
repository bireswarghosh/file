import React from 'react';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';

const admissionData = [
  {
    admissionNo: 'A-001043/24-25',
    date: '22/02/2025',
    department: 'DELUX CABIN',
    bedNo: 'DC-3RD-(01)',
    patientName: 'NITA BANERJEE',
    age: '65 Y 0 M 0 D',
    phone: '9432248427',
    address: '42/1, RAM MOHAN MUKHERJEE LANE',
    doctor: 'ABHRA'
  },
  {
    admissionNo: 'A-001044/24-25',
    date: '22/02/2025',
    department: 'GENERAL WARD- MALE',
    bedNo: 'M1',
    patientName: 'PRABHAT KUMAR MONDAL',
    age: '88 Y 0 M 0 D',
    phone: '9831241854',
    address: '14/2, OLABIBI TALA LANE, P.O. SHIBPUR / P.S.',
    doctor: 'ABHRA'
  },
  {
    admissionNo: 'A-001045/24-25',
    date: '22/02/2025',
    department: 'GENERAL WARD-FEMALE',
    bedNo: 'F5',
    patientName: 'NABINA GIRI',
    age: '64 Y 0 M 0 D',
    phone: '9831050736',
    address: '52/53, KASINATH CHATTERJEE LANE, P.O.',
    doctor: 'SWASTIK'
  }
];

const PatientAdmissionList = () => {
  return (
    <MasterLayout>
      <Breadcrumb title="Patient Admission - List" />
      <div className="container-fluid py-4">
        <div className="card shadow-lg rounded-4 border-0 bg-white">

          {/* Tabs */}
          <div className="card-header pb-0 border-bottom-0">
            <ul className="nav nav-tabs">
              <li className="nav-item"><button className="nav-link active">List</button></li>
              <li className="nav-item"><button className="nav-link">Detail</button></li>
              <li className="nav-item"><button className="nav-link">MRD</button></li>
            </ul>
          </div>

          {/* Filter Section */}
          <div className="card-body pt-3">
            <div className="row g-3 align-items-center mb-3">
              <div className="col-md-3 d-flex gap-3">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="searchType" id="admissionWise" defaultChecked />
                  <label className="form-check-label" htmlFor="admissionWise">Admission Wise</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="searchType" id="nameWise" />
                  <label className="form-check-label" htmlFor="nameWise">Patient Name Wise</label>
                </div>
              </div>
              <div className="col-md-4 d-flex align-items-center gap-2">
                <label>Date From</label>
                <input type="date" className="form-control" defaultValue="2025-02-22" />
                <label>To</label>
                <input type="date" className="form-control" defaultValue="2025-02-22" />
              </div>
            </div>

            {/* Table */}
            <div className="table-responsive border rounded">
              <table className="table table-hover table-bordered table-sm mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Admission No</th>
                    <th>Date</th>
                    <th>Department</th>
                    <th>Bed No</th>
                    <th>Patient Name</th>
                    <th>Age</th>
                    <th>Phone No</th>
                    <th>Address</th>
                    <th>Doctor</th>
                  </tr>
                </thead>
                <tbody>
                  {admissionData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.admissionNo}</td>
                      <td>{row.date}</td>
                      <td>{row.department}</td>
                      <td>{row.bedNo}</td>
                      <td>{row.patientName}</td>
                      <td>{row.age}</td>
                      <td>{row.phone}</td>
                      <td>{row.address}</td>
                      <td>{row.doctor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="card-footer bg-light py-3 d-flex flex-wrap justify-content-between gap-2">
            <div className="btn-group">
              {['New', 'Edit', 'Save', 'Delete', 'Undo', 'Print', 'Exit'].map(btn => (
                <button key={btn} className="btn btn-outline-primary">{btn}</button>
              ))}
            </div>
            <div className="btn-group">
              <button className="btn btn-outline-secondary">Barcode</button>
              <button className="btn btn-outline-secondary">H Risk Consent</button>
              <button className="btn btn-outline-secondary">Consent</button>
            </div>
          </div>

        </div>
      </div>
    </MasterLayout>
  );
};

export default PatientAdmissionList;
