import React from 'react';

const PatientHistory = ({ patient }) => {
  if (!patient) return null;

  return (
    <div className="col-lg-12 mt-4">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">Patient History</h5>
          <div>
            <button type="button" className="btn btn-secondary btn-sm me-1">List</button>
            <button type="button" className="btn btn-primary btn-sm me-1">Detail</button>
            <button type="button" className="btn btn-success btn-sm">Document Save</button>
          </div>
        </div>
        <div className="card-body">
          <form className="row g-3 needs-validation" noValidate="">
            <div className="col-12">
              <h6>Registration Detail</h6>
            </div>
            <div className="col-md-3">
              <label className="form-label">Registration No</label>
              <input type="text" className="form-control form-control-sm" value={patient.registrationNo} readOnly />
            </div>
            <div className="col-md-3">
              <label className="form-label">Patient's Name</label>
              <input type="text" className="form-control form-control-sm" value={patient.patientName} readOnly />
            </div>
            <div className="col-md-2">
              <label className="form-label">Age</label>
              <input type="text" className="form-control form-control-sm" value={patient.age || ''} readOnly />
            </div>
            <div className="col-md-2">
              <label className="form-label">Sex</label>
              <input type="text" className="form-control form-control-sm" value={patient.sex || ''} readOnly />
            </div>
            <div className="col-md-2">
              <label className="form-label">Address</label>
              <input type="text" className="form-control form-control-sm" value={patient.address || ''} readOnly />
            </div>
            {/* Add more fields as needed */}
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientHistory;