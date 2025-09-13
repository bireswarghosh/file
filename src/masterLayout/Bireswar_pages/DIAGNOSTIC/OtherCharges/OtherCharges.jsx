import React from 'react';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';

const otherCharges = [
  { head: "ATTENDANT CHARGES DAY", rate: 250, qty: 3, amount: 750, date: "31/03/2021", entryBy: "KRISHNANI", package: "N", doctor: "" },
  { head: "BLOOD TRANSFUSION CHARGE", rate: 600, qty: 2, amount: 1200, date: "31/03/2021", entryBy: "KRISHNANI", package: "N", doctor: "" },
  { head: "CARDIAC MONITER PER DAY", rate: 600, qty: 2, amount: 1200, date: "31/03/2021", entryBy: "KRISHNANI", package: "N", doctor: "" },
  { head: "CRITICAL CARE DOCTOR CHARGE", rate: 300, qty: 5, amount: 1500, date: "31/03/2021", entryBy: "SURAJIT", package: "N", doctor: "" },
  { head: "CRITICAL CARE FEES", rate: 600, qty: 2, amount: 1200, date: "31/03/2021", entryBy: "Admin", package: "N", doctor: "" },
  { head: "DOCTOR VISIT", rate: 1500, qty: 1, amount: 1500, date: "31/03/2021", entryBy: "Admin", package: "N", doctor: "" },
  { head: "GLUCOMETER TEST", rate: 100, qty: 1, amount: 100, date: "31/03/2021", entryBy: "KRISHNANI", package: "N", doctor: "" },
  { head: "I.M.CHARGES", rate: 100, qty: 1, amount: 100, date: "31/03/2021", entryBy: "Admin", package: "N", doctor: "" },
  { head: "INFUSION PUMP PER DAY", rate: 600, qty: 1, amount: 600, date: "31/03/2021", entryBy: "KUSTORI", package: "N", doctor: "" },
  { head: "PULSE OXYMETER (PORT) PER USE", rate: 100, qty: 1, amount: 100, date: "31/03/2021", entryBy: "Admin", package: "N", doctor: "" },
  { head: "REGISTRATION CHARGE", rate: 200, qty: 1, amount: 200, date: "31/03/2021", entryBy: "Admin", package: "N", doctor: "" },
  { head: "TAPPING CHARGES BY DOCTOR", rate: 3000, qty: 1, amount: 3000, date: "31/03/2021", entryBy: "SANDIP N", package: "N", doctor: "" },
];

const OtherCharges = () => {
  return (
    <MasterLayout>
      <Breadcrumb title="Other Charges" />
      <div className="container-fluid py-4">
        <div className="card shadow-lg rounded-4 border-0 bg-white">
          <div className="card-body">
            {/* Search Filters */}
            <div className="row g-3 mb-4 align-items-center">
              <div className="col-md-2">
                <label>Current Date</label>
                <input type="date" className="form-control" />
              </div>
              <div className="col-md-3">
                <label>Patient's Name</label>
                <input className="form-control" defaultValue="SUCHNITTA PACHAL" />
              </div>
              <div className="col-md-2">
                <label>Admission No</label>
                <input className="form-control" defaultValue="A-001736/20-21" />
              </div>
              <div className="col-md-2">
                <label>Bed No</label>
                <input className="form-control" defaultValue="21" />
              </div>
              <div className="col-md-5 d-flex align-items-center gap-3">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="find" defaultChecked />
                  <label className="form-check-label">Find By Name</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="find" />
                  <label className="form-check-label">Find By No</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="find" />
                  <label className="form-check-label">Order By Name</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="find" />
                  <label className="form-check-label">Order By Date</label>
                </div>
              </div>
            </div>

            {/* Patient Info */}
            <div className="border rounded p-3 bg-light-subtle mb-4">
              <h6 className="fw-bold text-primary mb-3">Patient Detail</h6>
              <div className="row g-3">
                <div className="col-md-4"><label>Address</label><input className="form-control" defaultValue="DARIARA" /></div>
                <div className="col-md-4"><label>Area</label><input className="form-control" defaultValue="P.S-TAMLUK" /></div>
                <div className="col-md-4"><label>Phone</label><input className="form-control" /></div>
                <div className="col-md-6"><label>Remarks</label><input className="form-control" /></div>
                <div className="col-md-2"><label>Age</label><input className="form-control" defaultValue="18.00" /></div>
                <div className="col-md-2"><label>Sex</label><input className="form-control" defaultValue="F" /></div>
                <div className="col-md-2"><label>Marital Status</label><input className="form-control" defaultValue="M" /></div>
                <div className="col-md-2"><label>Admission Date</label><input type="date" className="form-control" defaultValue="2021-03-31" /></div>
                <div className="col-md-2"><label>Company</label><input className="form-control" /></div>
                <div className="col-md-2"><label>Cash Less</label><input className="form-control" /></div>
                <div className="col-md-2"><label>Package</label><input className="form-control" defaultValue="0" /></div>
              </div>
            </div>

            {/* Charges Table */}
            <div className="table-responsive mb-4">
              <table className="table table-bordered table-sm align-middle text-center">
                <thead className="table-light">
                  <tr>
                    <th>Other Charge Head</th><th>Rate</th><th>Qty</th><th>SGST</th><th>CGST</th>
                    <th>Amount</th><th>Date</th><th>Entry By</th><th>Remarks</th><th>Package</th><th>Doctor</th>
                  </tr>
                </thead>
                <tbody>
                  {otherCharges.map((row, i) => (
                    <tr key={i}>
                      <td>{row.head}</td>
                      <td>{row.rate}</td>
                      <td>{row.qty}</td>
                      <td>0</td>
                      <td>0</td>
                      <td>{row.amount}</td>
                      <td>{row.date}</td>
                      <td>{row.entryBy}</td>
                      <td>{row.remarks || ''}</td>
                      <td>{row.package}</td>
                      <td>{row.doctor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="row g-3 mb-4">
              <div className="col-md-3 ms-auto">
                <label className="fw-bold">SGST Total</label>
                <input className="form-control" defaultValue="0.00" />
              </div>
              <div className="col-md-3">
                <label className="fw-bold">CGST Total</label>
                <input className="form-control" defaultValue="0.00" />
              </div>
              <div className="col-md-3">
                <label className="fw-bold">Total Amt</label>
                <input className="form-control text-danger fw-bold" defaultValue="22,450.00" />
              </div>
            </div>

            {/* Buttons */}
            <div className="d-flex flex-wrap justify-content-between border-top pt-3">
              <div className="btn-group">
                {['New', 'Edit', 'Save', 'Delete', 'Undo', 'Print', 'Exit'].map(btn => (
                  <button key={btn} className="btn btn-outline-primary">{btn}</button>
                ))}
              </div>
              <button className="btn btn-warning fw-bold">View Detail</button>
            </div>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default OtherCharges;
