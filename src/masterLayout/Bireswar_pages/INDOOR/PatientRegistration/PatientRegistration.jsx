import React from 'react';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';

function PatientRegistration() {
  return (
    <MasterLayout>
      <Breadcrumb title="Patient Registration" />
      <div className="container-fluid py-4 px-lg-4">
        <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
          <div className="card-header text-white py-3 px-4 px-md-5" style={{ background: 'linear-gradient(135deg, hsl(200, 75%, 45%), hsl(220, 70%, 55%))' }}>
            <h2 className="mb-0 fw-bolder">Patient Registration</h2>
            <p className="mb-0 opacity-75 small">Register and manage patient information</p>
          </div>
          <div className="card-body p-4 p-md-5">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Patient ID</label>
                <input type="text" className="form-control" placeholder="Auto-generated" readOnly />
              </div>
              <div className="col-md-6">
                <label className="form-label">Registration Date</label>
                <input type="date" className="form-control" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
              <div className="col-md-8">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" placeholder="Enter patient's full name" />
              </div>
              <div className="col-md-2">
                <label className="form-label">Age</label>
                <input type="number" className="form-control" placeholder="Age" />
              </div>
              <div className="col-md-2">
                <label className="form-label">Gender</label>
                <select className="form-select">
                  <option value="">Select</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Other</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Contact Number</label>
                <input type="tel" className="form-control" placeholder="Phone number" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" placeholder="Email address (optional)" />
              </div>
              <div className="col-12">
                <label className="form-label">Address</label>
                <textarea className="form-control" rows="3" placeholder="Full address"></textarea>
              </div>
              <div className="col-12 mt-4">
                <div className="d-flex justify-content-end gap-2">
                  <button type="button" className="btn btn-secondary">Clear</button>
                  <button type="button" className="btn btn-primary">Register Patient</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
}

export default PatientRegistration;