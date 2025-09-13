import React from 'react';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';

const OTBillingList = () => {
  return (
    <MasterLayout>
      <Breadcrumb title="O.T. Billing - List" />
      <div className="container-fluid py-4">
        <div className="card shadow rounded-4 border-0 bg-white">
          {/* Tabs */}
          <div className="card-header border-bottom-0">
            <ul className="nav nav-tabs">
              <li className="nav-item"><button className="nav-link active">List</button></li>
              <li className="nav-item"><button className="nav-link">Detail</button></li>
              <li className="nav-item"><button className="nav-link">OT Note Procedure</button></li>
            </ul>
          </div>

          {/* Filters */}
          <div className="card-body">
            <div className="row g-3 align-items-center mb-3">
              <div className="col-md-3 d-flex gap-2 align-items-center">
                <label className="fw-bold">Date From</label>
                <input type="date" className="form-control" defaultValue="2025-02-22" />
              </div>
              <div className="col-md-3 d-flex gap-2 align-items-center">
                <label className="fw-bold">To</label>
                <input type="date" className="form-control" defaultValue="2025-02-22" />
              </div>
            </div>

            {/* Table */}
            <div className="table-responsive border rounded" style={{ minHeight: '300px' }}>
              <table className="table table-sm table-bordered text-center mb-0">
                <thead className="table-light">
                  <tr>
                    <th>O.T. Bill No</th>
                    <th>Bill Date</th>
                    <th>Admission No</th>
                    <th>Patient Name</th>
                    <th>Bill Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="5" className="text-muted py-5">No records found for selected date.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="card-footer d-flex flex-wrap justify-content-between align-items-center bg-light p-3">
            <div className="btn-group">
              <button className="btn btn-warning">Repeat OT Entry</button>
              <button className="btn btn-primary">New</button>
              <button className="btn btn-outline-secondary">Edit</button>
              <button className="btn btn-outline-success">Save</button>
              <button className="btn btn-outline-danger">Delete</button>
              <button className="btn btn-outline-dark">Undo</button>
              <button className="btn btn-outline-info">Print</button>
              <button className="btn btn-outline-dark">Exit</button>
            </div>
            <button className="btn btn-outline-secondary">NotePrint</button>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default OTBillingList;
