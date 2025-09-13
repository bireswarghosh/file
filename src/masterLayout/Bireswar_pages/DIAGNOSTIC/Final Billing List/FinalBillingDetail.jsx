import React from 'react';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';

const FinalBillingDetail = () => {
  return (
    <MasterLayout>
      <Breadcrumb title="Final Billing - Detail" />
      <div className="container-fluid py-4">
        <div className="card shadow border-0 rounded-4">
          <div className="card-header border-bottom d-flex gap-3">
            <ul className="nav nav-tabs">
              <li className="nav-item"><button className="nav-link">List</button></li>
              <li className="nav-item"><button className="nav-link active">Detail</button></li>
            </ul>
          </div>

          <div className="card-body row g-4">
            {/* Left Main Section */}
            <div className="col-md-9">
              {/* Billing Info */}
              <div className="border p-3 rounded mb-3 bg-light">
                <h6 className="fw-bold mb-3 text-primary">Bill Detail</h6>
                <div className="row g-2">
                  <div className="col-md-4"><input className="form-control" placeholder="Bill No" defaultValue="F-001043/24-25" /></div>
                  <div className="col-md-4"><input type="date" className="form-control" defaultValue="2025-02-22" /></div>
                  <div className="col-md-4"><input type="time" className="form-control" defaultValue="12:27" /></div>
                  <div className="col-md-4 mt-2"><input className="form-control" placeholder="Patient Name" defaultValue="SK MOSTAK AHAMMAD" /></div>
                  <div className="col-md-4 mt-2"><input className="form-control" placeholder="Department" /></div>
                  <div className="col-md-4 mt-2"><input className="form-control" placeholder="Entry By" defaultValue="SANJAY ST." /></div>
                </div>
              </div>

              {/* Patient Info */}
              <div className="border p-3 rounded mb-3">
                <h6 className="fw-bold mb-3 text-primary">Patient Details</h6>
                <div className="row g-2">
                  <div className="col-md-4"><input className="form-control" placeholder="Admission No" defaultValue="A-001035/24-25" /></div>
                  <div className="col-md-2"><input className="form-control" placeholder="Age" defaultValue="58" /></div>
                  <div className="col-md-2"><select className="form-select"><option>Male</option><option>Female</option></select></div>
                  <div className="col-md-2"><input className="form-control" placeholder="Status" /></div>
                  <div className="col-md-2"><input className="form-control" placeholder="Phone" defaultValue="9830948796" /></div>
                  <div className="col-12 mt-2"><textarea className="form-control" placeholder="Address" defaultValue="VILL: DANSPARA, P.O: SALAP, P.S: DOMJUR, HOWRAH, PIN: 711409"></textarea></div>
                  <div className="col-md-4 mt-2"><input className="form-control" placeholder="Admission Date" defaultValue="2025-02-19" /></div>
                  <div className="col-md-4 mt-2"><input className="form-control" placeholder="Admission Time" defaultValue="07:21 PM" /></div>
                </div>
              </div>

              {/* Bill Head Detail */}
              <div className="border p-3 rounded mb-3">
                <h6 className="fw-bold mb-3 text-primary">Bill Head Detail</h6>
                <div className="table-responsive" style={{ maxHeight: '200px' }}>
                  <table className="table table-bordered table-sm table-striped align-middle mb-0">
                    <thead className="table-dark">
                      <tr><th>Head</th><th>Amount</th><th>Date</th><th>Bed</th><th>Rate</th><th>Attendant</th><th>RMO</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>Bed Charges</td><td>3600.00</td><td>19/02/2025</td><td>M1 GWM</td><td>1200</td><td>0</td><td>0</td></tr>
                      <tr><td>Others Charges</td><td>9640.00</td><td>20/02/2025</td><td>M1 GWM</td><td>1200</td><td>0</td><td>0</td></tr>
                      <tr><td>Service</td><td>969.00</td><td>21/02/2025</td><td>M1 GWM</td><td>1200</td><td>0</td><td>0</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Totals */}
              <div className="row g-2 mb-3">
                <div className="col-md-3"><input className="form-control text-danger" defaultValue="12000.00" placeholder="Total Receipt" /></div>
                <div className="col-md-3"><input className="form-control text-danger" defaultValue="2209.00" placeholder="Net Balance" /></div>
                <div className="col-md-3"><input className="form-control" defaultValue="0.00" placeholder="Approval Amt" /></div>
                <div className="col-md-3"><input className="form-control text-success fw-bold" defaultValue="14209.00" placeholder="Net Bill" /></div>
              </div>

              <div className="row g-2 mb-3">
                <div className="col-md-3"><input className="form-control" placeholder="CORP Disc" /></div>
                <div className="col-md-3"><input className="form-control" defaultValue="2209.00" placeholder="HOSP Disc" /></div>
                <div className="col-md-3"><input className="form-control" placeholder="GST Amount" /></div>
                <div className="col-md-3"><select className="form-select"><option>Cash</option><option>Card</option><option>Bank</option></select></div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="col-md-3 bg-light p-3 rounded shadow-sm">
              <div className="text-center mb-3">
                <img src="https://via.placeholder.com/150x50?text=Barcode" alt="Barcode" className="img-fluid mb-2" />
                <div className="fw-bold">A-001035/24-25</div>
              </div>
              <div className="mb-2">
                <label className="fw-bold text-danger">Diagnostic Adv Rcvd</label>
                <input className="form-control" defaultValue="3120.00" />
              </div>
              <div className="mb-2">
                <label className="fw-bold text-danger">Med Adv Received</label>
                <input className="form-control" defaultValue="0.00" />
              </div>
              <div className="mb-3">
                <label className="fw-bold text-danger">Remarks</label>
                <textarea className="form-control" rows={4}></textarea>
              </div>
              <div className="d-grid gap-2">
                <button className="btn btn-secondary">All Money Receipt</button>
                <button className="btn btn-dark">Print MRet</button>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="submitted" />
                  <label className="form-check-label" htmlFor="submitted">Submitted</label>
                </div>
                <input type="text" className="form-control mb-2" placeholder="User/Note" />
                <button className="btn btn-info text-white">Update</button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="card-footer bg-light d-flex flex-wrap justify-content-center gap-2 p-3">
            <button className="btn btn-warning">Modify</button>
            <button className="btn btn-primary">New</button>
            <button className="btn btn-outline-secondary">Edit</button>
            <button className="btn btn-outline-success" disabled>Save</button>
            <button className="btn btn-outline-danger">Delete</button>
            <button className="btn btn-outline-dark">Undo</button>
            <button className="btn btn-outline-info">Print</button>
            <button className="btn btn-dark">Exit</button>
            <button className="btn btn-outline-secondary">Prev</button>
            <button className="btn btn-outline-secondary">Next</button>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default FinalBillingDetail;
