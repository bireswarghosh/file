import React from 'react';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';

const HealthCardDetail = () => {
  return (
    <MasterLayout>
      <Breadcrumb title="Health Card - Detail" />
      <div className="container-fluid py-4">
        <div className="card shadow-lg border-0 rounded-4 bg-white">

          {/* Tabs */}
          <div className="card-header border-bottom-0 pb-0">
            <ul className="nav nav-tabs nav-tabs-bordered">
              <li className="nav-item"><button className="nav-link">List</button></li>
              <li className="nav-item"><button className="nav-link active">Detail</button></li>
            </ul>
          </div>

          {/* Form Body */}
          <div className="card-body p-4">
            <div className="row g-3 mb-3">
              <div className="col-md-1 d-flex align-items-center">
                <label className="form-label me-2 mb-0">OPD</label>
                <input className="form-check-input" type="checkbox" defaultChecked />
              </div>
              <div className="col-md-3">
                <label className="form-label">C Registration</label>
                <input className="form-control" defaultValue="01\\24-0001" />
              </div>
              <div className="col-md-3">
                <label className="form-label">Reg No</label>
                <input className="form-control" defaultValue="S-007609/23-24" />
              </div>
              <div className="col-md-3 d-flex align-items-end">
                <button className="btn btn-outline-success w-100">Registration Form</button>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-3">
                <label className="form-label">Issue Date</label>
                <input className="form-control" type="date" defaultValue="2025-02-22" />
              </div>
              <div className="col-md-3">
                <label className="form-label">Exp. Date</label>
                <input className="form-control" type="date" defaultValue="2026-02-21" />
              </div>
              <div className="col-md-3">
                <label className="form-label">Health Card Fees</label>
                <input className="form-control" defaultValue="0" />
              </div>
              <div className="col-md-3">
                <label className="form-label">Card No</label>
                <input className="form-control" />
              </div>
            </div>

            <div className="row g-3 mt-3">
              <div className="col-md-4">
                <label className="form-label">Issued To</label>
                <input className="form-control" defaultValue="SUMAN MULLICK" />
              </div>
              <div className="col-md-4">
                <label className="form-label">Mobile No</label>
                <input className="form-control" defaultValue="7003685136" />
              </div>
              <div className="col-md-4">
                <label className="form-label">Email</label>
                <input className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Agent</label>
                <input className="form-control" />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-12">
                <label className="form-label">Address</label>
                <textarea className="form-control" rows="3" defaultValue={
                  `VILL-NATIBPUR PASCHIM PARA\nP.O-KOLORAH\nDIST-HOWRAH  PIN-711411`
                }></textarea>
              </div>
            </div>

            {/* Patient Table */}
            <div className="table-responsive mt-4">
              <table className="table table-bordered table-sm table-striped">
                <thead className="table-light">
                  <tr><th>Name</th><th>Age</th><th>Sex (M/F)</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td>SUMAN MULLICK</td>
                    <td>20</td>
                    <td>F</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="card-footer p-3 bg-light d-flex flex-wrap justify-content-between gap-2">
            <div className="btn-group">
              {['New', 'Edit', 'Save', 'Delete', 'Undo', 'Print'].map((btn, i) => (
                <button key={i} className="btn btn-outline-primary">{btn}</button>
              ))}
            </div>
            <button className="btn btn-outline-dark">Exit</button>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default HealthCardDetail;
