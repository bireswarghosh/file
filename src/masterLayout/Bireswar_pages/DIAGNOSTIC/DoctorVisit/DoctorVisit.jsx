import React from 'react';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';

const DoctorVisit = () => {
  return (
    <MasterLayout>
      <Breadcrumb title="Doctor Visit" />
      <div className="container-fluid py-4">
        <div className="card shadow border-0 rounded-4 bg-white">

          <div className="card-body">
            {/* Bill Detail */}
            <h5 className="text-primary fw-bold mb-3">Bill Detail</h5>
            <div className="row g-3 align-items-center">
              <div className="col-md-4">
                <label>Patient Name</label>
                <input className="form-control" defaultValue="SUCHNITITA PACHHAL" />
              </div>
              <div className="col-md-4">
                <label>Admission No</label>
                <input className="form-control" defaultValue="A-001736/20-21" />
              </div>
              <div className="col-md-4 d-flex align-items-end gap-3">
                <div className="form-check"><input type="radio" className="form-check-input" name="find" defaultChecked /> <label className="form-check-label">Find By Name</label></div>
                <div className="form-check"><input type="radio" className="form-check-input" name="find" /> <label className="form-check-label">Find By No.</label></div>
              </div>
            </div>

            {/* Patient Detail */}
            <h5 className="text-primary fw-bold mt-4 mb-3">Patient Detail</h5>
            <div className="row g-3">
              <div className="col-md-6"><label>Address</label><input className="form-control" defaultValue="DARIARA" /></div>
              <div className="col-md-6"><label>Area</label><input className="form-control" defaultValue="PS: TAMULK" /></div>
              <div className="col-md-2"><label>Age</label><input className="form-control" defaultValue="18.00" /></div>
              <div className="col-md-2"><label>Sex</label><select className="form-select"><option>F</option><option>M</option></select></div>
              <div className="col-md-4"><label>Phone</label><input className="form-control" /></div>
              <div className="col-md-2"><label>Marital Status</label><input className="form-control" defaultValue="U" /></div>
              <div className="col-md-2"><label>Bed No</label><input className="form-control" defaultValue="21" /></div>
            </div>

            {/* Doctor Visit Detail */}
            <h5 className="text-primary fw-bold mt-4 mb-3">Doctor Visit</h5>
            <div className="row g-3 align-items-end">
              <div className="col-md-4"><label>Doctor Name</label><input className="form-control" /></div>
              <div className="col-md-2"><label>Date</label><input type="date" className="form-control" defaultValue="2025-02-22" /></div>
              <div className="col-md-2"><label>Time</label><input className="form-control" defaultValue="12:19 PM" /></div>
              <div className="col-md-2"><label>Package</label><select className="form-select"><option>N</option></select></div>
              <div className="col-md-2"><label>Rate</label><input className="form-control" defaultValue="0.00" /></div>
              <div className="col-md-2"><label>No of Visit</label><input className="form-control" defaultValue="0" /></div>
              <div className="col-md-2"><label>/VISIT</label><select className="form-select"><option>1</option></select></div>
              <div className="col-md-2"><label>Amount</label><input className="form-control" defaultValue="0.00" /></div>
              <div className="col-md-2"><label>Doc Pay Amt</label><input className="form-control" defaultValue="0.00" /></div>
              <div className="col-md-2"><label>Type of Visit</label><input className="form-control" defaultValue="DOCTOR VISIT" /></div>
            </div>

            {/* Previous Detail */}
            <h5 className="text-primary fw-bold mt-5 mb-3">Previous Detail</h5>
            <div className="table-responsive">
              <table className="table table-bordered text-center table-sm mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Doctor Name</th>
                    <th>Rate</th>
                    <th>No of Visit</th>
                    <th>Amount</th>
                    <th>Pay Amount</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Entry</th>
                    <th>Visit Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td colSpan="9" className="text-muted">No previous entries.</td></tr>
                </tbody>
              </table>
            </div>

            {/* Advice & Procedure */}
            <div className="row g-3 mt-4">
              <div className="col-md-6">
                <label>Advice</label>
                <textarea className="form-control" rows={3}></textarea>
              </div>
              <div className="col-md-6">
                <label>Procedure</label>
                <textarea className="form-control" rows={3}></textarea>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="card-footer d-flex flex-wrap justify-content-center gap-2 bg-light p-3">
            <button className="btn btn-primary">New</button>
            <button className="btn btn-outline-secondary">Edit</button>
            <button className="btn btn-outline-success">Save</button>
            <button className="btn btn-outline-danger">Delete</button>
            <button className="btn btn-outline-dark">Undo</button>
            <button className="btn btn-outline-info">Find</button>
            <button className="btn btn-outline-warning">Print</button>
            <button className="btn btn-dark">Exit</button>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default DoctorVisit;
