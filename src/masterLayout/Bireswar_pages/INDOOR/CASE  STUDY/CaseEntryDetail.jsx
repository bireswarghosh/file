import React from 'react';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';

const CaseEntryDetail = () => {
  return (
    <MasterLayout>
      <Breadcrumb title="Case Entry - Detail" />
      <div className="container-fluid py-4">
        <div className="card shadow border-0 rounded-4 bg-white">
          {/* Tabs */}
          <div className="card-header border-bottom-0 pb-0">
            <ul className="nav nav-pills gap-3">
              {["List", "Detail", "Estimate", "MRD"].map((tab, i) => (
                <li className="nav-item" key={i}>
                  <button className={`nav-link ${tab === "Detail" ? "active" : ""}`}>{tab}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Form Inputs */}
          <div className="card-body p-4">
            <div className="row g-3 mb-4">
              <div className="col-md-2"><label>Company</label><input className="form-control" /></div>
              <div className="col-md-2"><label>Booking</label><input className="form-control" /></div>
              <div className="col-md-2"><label>Indoor</label><input className="form-control" /></div>
              <div className="col-md-2"><label>OPD</label><input className="form-control" /></div>
              <div className="col-md-2"><label>Time</label><input className="form-control" defaultValue="09:15 AM" /></div>
              <div className="col-md-2"><label>Date</label><input type="date" className="form-control" defaultValue="2025-02-22" /></div>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-md-2"><label>Case No</label><input className="form-control" defaultValue="OP/2425/08278" /></div>
              <div className="col-md-2"><label>Slip No</label><input className="form-control" defaultValue="8" /></div>
              <div className="col-md-2"><label>Clear Date</label><input className="form-control" /></div>
              <div className="col-md-2"><label>Sample ID</label><input className="form-control" /></div>
              <div className="col-md-2"><label>Received By</label><input className="form-control" defaultValue="SUMIYA NASRIN" /></div>
              <div className="col-md-2"><label>Current User</label><input className="form-control" defaultValue="Admin" /></div>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-md-3"><label>Patient Name</label><input className="form-control" defaultValue="SAMIR NASKAR" /></div>
              <div className="col-md-1"><label>Age</label><input className="form-control" defaultValue="66" /></div>
              <div className="col-md-1"><label>Y</label><input className="form-control" defaultValue="0" /></div>
              <div className="col-md-1"><label>M</label><input className="form-control" defaultValue="0" /></div>
              <div className="col-md-1"><label>Sex</label><select className="form-select"><option>**</option></select></div>
              <div className="col-md-2"><label>Mobile No.</label><input className="form-control" defaultValue="6291437535" /></div>
              <div className="col-md-3"><label>C/O Phone</label><input className="form-control" /></div>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-md-3"><label>Email</label><input className="form-control" /></div>
              <div className="col-md-3"><label>Husband Name</label><input className="form-control" /></div>
              <div className="col-md-2"><label>No. of Child (M)</label><input className="form-control" defaultValue="0" /></div>
              <div className="col-md-2"><label>No. of Child (F)</label><input className="form-control" defaultValue="0" /></div>
              <div className="col-md-2 d-flex align-items-end">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="uploadPortal" />
                  <label className="form-check-label" htmlFor="uploadPortal">Report Upload on Portal</label>
                </div>
              </div>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-md-3"><label>Branch Name</label><input className="form-control" defaultValue="DIRECT" /></div>
              <div className="col-md-3"><label>Doctor Name</label><input className="form-control" defaultValue="RAJ NARAYAN ROY" /></div>
              <div className="col-md-2"><label>Requisition</label><input className="form-control" /></div>
            </div>

            {/* Test Table */}
            <div className="table-responsive border rounded">
              <table className="table table-bordered table-sm table-hover mb-0">
                <thead className="table-primary">
                  <tr><th>Pr</th><th>Test Name</th><th>Rate</th><th>Delivery Date</th><th>Delivery Time</th><th>Net Rate</th></tr>
                </thead>
                <tbody>
                  <tr><td>N</td><td>TC DC ESR & HB%</td><td>200.00</td><td>23/02/2025</td><td>07:00 PM</td><td>0.00</td></tr>
                  <tr><td>N</td><td>SUGAR FASTING</td><td>50.00</td><td>22/02/2025</td><td>07:00 PM</td><td>0.00</td></tr>
                  <tr><td>N</td><td>GLYCOSYLATED HEMOGLOBIN</td><td>200.00</td><td>23/02/2025</td><td>07:00 PM</td><td>0.00</td></tr>
                  {/* More rows as needed */}
                </tbody>
              </table>
            </div>

            {/* Totals + Payment */}
            <div className="row g-3 mt-4">
              <div className="col-md-2"><label>Total</label><input className="form-control" defaultValue="4450.00" /></div>
              <div className="col-md-2"><label>GST</label><input className="form-control" defaultValue="0.00" /></div>
              <div className="col-md-2"><label>Collection Chg.</label><input className="form-control" defaultValue="0.00" /></div>
              <div className="col-md-2"><label>Discount</label><input className="form-control" defaultValue="0.00" /></div>
              <div className="col-md-2"><label>Adv</label><input className="form-control" defaultValue="500.00" /></div>
              <div className="col-md-2"><label>Balance</label><input className="form-control" defaultValue="3950.00" /></div>
            </div>

            <div className="row g-3 mt-3">
              <div className="col-md-3"><label>Payment Mode</label><input className="form-control" placeholder="Cash / Card / Complementary" /></div>
              <div className="col-md-3"><label>Call Time</label><input className="form-control" defaultValue="06:30 PM" /></div>
              <div className="col-md-3"><label>Collector Dt</label><input type="date" className="form-control" defaultValue="2025-02-22" /></div>
              <div className="col-md-3"><label>Area</label><input className="form-control" defaultValue="GOALTOR" /></div>
            </div>

            {/* Barcode + Print */}
            <div className="d-flex justify-content-between align-items-center mt-4 bg-warning-subtle p-3 rounded">
              <div className="d-flex align-items-center gap-3">
                <label className="form-label">No of Copy</label>
                <input type="number" className="form-control" style={{ width: 80 }} defaultValue={1} />
              </div>
              <button className="btn btn-dark px-4">BarCode Print</button>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="card-footer p-3 border-top bg-light">
            <div className="d-flex flex-wrap justify-content-between gap-2">
              <div className="d-flex gap-2 flex-wrap">
                {['New', 'Edit', 'Save', 'Delete', 'Undo', 'Bill', 'Com Bill', 'Dep Print', 'Exit'].map(btn => (
                  <button key={btn} className="btn btn-outline-primary rounded-pill">{btn}</button>
                ))}
              </div>
              <div className="d-flex gap-2 flex-wrap">
                {['Work Sheet', 'D-Work Sheet', 'F-Form', 'Prev', 'Next'].map(btn => (
                  <button key={btn} className="btn btn-outline-secondary rounded-pill">{btn}</button>
                ))}
                <div className="btn-group">
                  <button className="btn btn-outline-dark">IP</button>
                  <button className="btn btn-outline-dark">OP</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </MasterLayout>
  );
};

export default CaseEntryDetail;
