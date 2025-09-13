import React from 'react';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';

const OtherBillEntryDetail = () => {
  return (
    <MasterLayout>
      <Breadcrumb title="Other Bill Entry - Detail" />
      <div className="container-fluid py-4">
        <div className="card shadow border-0 rounded-4 bg-white">
          
          {/* Tabs */}
          <div className="card-header border-bottom-0">
            <ul className="nav nav-tabs">
              <li className="nav-item"><button className="nav-link">List</button></li>
              <li className="nav-item"><button className="nav-link active">Detail</button></li>
            </ul>
          </div>

          <div className="card-body p-4">
            {/* Registration Section */}
            <div className="row g-3 mb-3">
              <div className="col-md-2"><label>New Registration</label><input className="form-control" defaultValue="N" /></div>
              <div className="col-md-2"><label>Date</label><input className="form-control" type="date" defaultValue="2025-02-22" /></div>
              <div className="col-md-2"><label>Time</label><input className="form-control" defaultValue="12:02 PM" /></div>
              <div className="col-md-3"><label>Patient's Name</label><input className="form-control" defaultValue="SOMA JATI" /></div>
              <div className="col-md-3"><label>Registration No</label><input className="form-control" defaultValue="S-019384/24-25" /></div>
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-3"><label>C Registration No</label><input className="form-control" /></div>
              <div className="col-md-3"><label>Company Name</label><input className="form-control" defaultValue="N" /></div>
              <div className="col-md-3 d-flex align-items-end">
                <button className="btn btn-outline-success w-100">Registration Form</button>
              </div>
            </div>

            {/* Patient Info */}
            <div className="row g-3 mb-3">
              <div className="col-md-2"><label>Age</label><input className="form-control" defaultValue="42.00 Y" /></div>
              <div className="col-md-1"><label>Sex</label><input className="form-control" defaultValue="F" /></div>
              <div className="col-md-2"><label>Marital Status</label><input className="form-control" defaultValue="M" /></div>
              <div className="col-md-3"><label>Phone</label><input className="form-control" defaultValue="9007098937" /></div>
              <div className="col-md-2"><label>Religion</label><input className="form-control" defaultValue="HINDU" /></div>
              <div className="col-md-2"><label>Area / P.S.</label><input className="form-control" /></div>
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-6"><label>Address</label><input className="form-control" defaultValue="HOWRAH" /></div>
            </div>

            {/* Department / Billing Info */}
            <div className="row g-3 mb-3">
              <div className="col-md-2"><label>Department</label><input className="form-control" /></div>
              <div className="col-md-2"><label>Doctor</label><input className="form-control" /></div>
              <div className="col-md-2"><label>Assistant</label><input className="form-control" /></div>
              <div className="col-md-2"><label>Bill No</label><input className="form-control" defaultValue="OPDO/0214" /></div>
              <div className="col-md-2"><label>Bill Date</label><input className="form-control" type="date" defaultValue="2025-02-22" /></div>
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-2"><label>Ref Doctor</label><input className="form-control" /></div>
              <div className="col-md-2"><label>Anesthesian</label><input className="form-control" /></div>
              <div className="col-md-3"><label>OT Book Date</label><input className="form-control" type="date" defaultValue="1900-01-01" /></div>
              <div className="col-md-2"><label>Book Time</label><input className="form-control" defaultValue="AM" /></div>
            </div>

            {/* Billing Table */}
            <div className="table-responsive mb-4">
              <table className="table table-bordered table-sm align-middle">
                <thead className="table-light">
                  <tr><th>Particular</th><th>Unit</th><th>Rate</th><th>Qty</th><th>Amount</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td>DRESSING (L)</td>
                    <td>1</td>
                    <td>400</td>
                    <td>1</td>
                    <td>3500</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="row g-3 mb-4">
              <div className="col-md-3"><label>Total</label><input className="form-control text-end" defaultValue="3,500.00" /></div>
              <div className="col-md-3"><label>Paid</label><input className="form-control text-end" defaultValue="3,500.00" /></div>
              <div className="col-md-3"><label>Discount</label><input className="form-control text-end" defaultValue="0.00" /></div>
              <div className="col-md-3"><label>Due</label><input className="form-control text-end" defaultValue="0.00" /></div>
              <div className="col-md-3"><label>Grand Total</label><input className="form-control fw-bold text-danger text-end" defaultValue="3,500.00" /></div>
            </div>

            {/* User Info */}
            <div className="row g-3 mb-4">
              <div className="col-md-4"><label>Registration By</label><input className="form-control" defaultValue="SANJAY ST." /></div>
              <div className="col-md-4"><label>Current User</label><input className="form-control" defaultValue="Admin" /></div>
            </div>

            {/* Payment Details */}
            <div className="row g-3">
              <div className="col-md-3"><label>Receipt Type</label>
                <select className="form-select" defaultValue="CASH">
                  <option>CASH</option>
                  <option>CHEQUE</option>
                  <option>CARD</option>
                </select>
              </div>
              <div className="col-md-3"><label>Bank Name</label><input className="form-control" /></div>
              <div className="col-md-3"><label>Cheque / Card</label><input className="form-control" /></div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="card-footer p-3 bg-light d-flex flex-wrap justify-content-between gap-2">
            <div className="btn-group">
              {['New', 'Edit', 'Save', 'Delete', 'Undo', 'Print'].map(btn => (
                <button key={btn} className="btn btn-outline-primary">{btn}</button>
              ))}
            </div>
            <button className="btn btn-outline-dark">Exit</button>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default OtherBillEntryDetail;
