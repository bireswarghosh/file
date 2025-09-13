import React from 'react';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';

const OTBillingDetail = () => {
  return (
    <MasterLayout>
      <Breadcrumb title="O.T. Billing - Detail" />
      <div className="container-fluid py-4">
        <div className="card shadow border-0 rounded-4 bg-white">
          {/* Tabs */}
          <div className="card-header border-bottom-0">
            <ul className="nav nav-tabs">
              <li className="nav-item"><button className="nav-link">List</button></li>
              <li className="nav-item"><button className="nav-link active">Detail</button></li>
              <li className="nav-item"><button className="nav-link">OT Note Procedure</button></li>
            </ul>
          </div>

          <div className="card-body">
            {/* Basic Info */}
            <div className="row g-3">
              <div className="col-md-3"><label>O.T. Bill No.</label><input className="form-control" /></div>
              <div className="col-md-3"><label>Date</label><input type="date" className="form-control" /></div>
              <div className="col-md-2"><label>Search</label><select className="form-select"><option>By Admission No.</option><option>By Name</option></select></div>
              <div className="col-md-2"><label>EMR</label><input className="form-control" /></div>
            </div>

            {/* Admission & Anesthesia */}
            <div className="row g-3 mt-3">
              <div className="col-md-3"><label>Admission No.</label><input className="form-control" /></div>
              <div className="col-md-3"><label>Anesthesia Doctor Name</label><input className="form-control" /></div>
              <div className="col-md-2"><label>Type</label><input className="form-control" /></div>
              <div className="col-md-2"><label>Amount</label><input className="form-control" defaultValue="0.00" /></div>
            </div>

            {/* Surgeon */}
            <div className="row g-3 mt-3">
              <div className="col-md-6"><label>Surgeon Doctor Name</label><input className="form-control" /></div>
              <div className="col-md-2"><label>Amount</label><input className="form-control" defaultValue="0.00" /></div>
            </div>

            {/* Others/Under Care Doctor */}
            <div className="row g-3 mt-3">
              <div className="col-md-6"><label>Other/Under Care Doctor</label><input className="form-control" /></div>
              <div className="col-md-2"><label>Amount</label><input className="form-control" defaultValue="0.00" /></div>
            </div>

            {/* OT Charge Section */}
            <div className="row g-3 mt-3">
              <div className="col-md-3"><label>O.T. Name</label><input className="form-control" /></div>
              <div className="col-md-2"><label>Slot</label><input className="form-control" /></div>
              <div className="col-md-3"><label>O.T. Type</label><input className="form-control" /></div>
              <div className="col-md-2"><label>O.T. Hour</label><input className="form-control" /></div>
              <div className="col-md-2"><label>Minute</label><input className="form-control" /></div>
              <div className="col-md-12"><label>Remarks</label><textarea className="form-control" rows={2}></textarea></div>
            </div>

            {/* Billing Items Table */}
            <div className="table-responsive mt-4">
              <table className="table table-bordered table-sm text-center">
                <thead className="table-light">
                  <tr>
                    <th>Item</th>
                    <th>Unit</th>
                    <th>Rate</th>
                    <th>Qty</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td colSpan="5" className="text-muted">No items added yet.</td></tr>
                </tbody>
              </table>
            </div>

            {/* Right Summary Box */}
            <div className="row g-3 mt-4">
              <div className="col-md-3"><label>O.T. Consumable</label><input className="form-control" defaultValue="0.00" /></div>
              <div className="col-md-3"><label>O.T. Instruments</label><input className="form-control" defaultValue="0.00" /></div>
              <div className="col-md-3"><label>O.T. Medicines</label><input className="form-control" defaultValue="0.00" /></div>
              <div className="col-md-3"><label>O.T. Other Charges</label><input className="form-control" defaultValue="0.00" /></div>
              <div className="col-md-3"><label>Service Charges</label><input className="form-control" defaultValue="0.00" /></div>
            </div>

            {/* Booking Info */}
            <div className="row g-3 mt-4">
              <div className="col-md-3"><label>Booking No</label><input className="form-control" /></div>
              <div className="col-md-3"><label>Booking Date</label><input type="date" className="form-control" /></div>
            </div>

            {/* Footer Summary */}
            <div className="row g-3 mt-4 align-items-center">
              <div className="col-md-3"><label>Admission By</label><input className="form-control" /></div>
              <div className="col-md-3"><label>Current User</label><input className="form-control" defaultValue="Admin" /></div>
              <div className="col-md-3"><label>Total Bill Amount</label><input className="form-control text-danger fw-bold" defaultValue="0.00" /></div>
            </div>

            {/* Medicine Section */}
            <div className="row g-3 mt-3 align-items-end">
              <div className="col-md-4"><label>Detail Print in OT Medicine Issue</label></div>
              <div className="col-md-2"><button className="btn btn-outline-primary w-100">OT Medicine</button></div>
              <div className="col-md-2"><button className="btn btn-outline-secondary w-100">Load Medicine</button></div>
              <div className="col-md-2"><label>Amount</label><input className="form-control" defaultValue="0.00" /></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="card-footer d-flex flex-wrap justify-content-between align-items-center bg-light p-3 mt-4">
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

export default OTBillingDetail;
