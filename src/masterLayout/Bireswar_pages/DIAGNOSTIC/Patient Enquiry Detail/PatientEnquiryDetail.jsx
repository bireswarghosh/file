import React from 'react';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';

const PatientEnquiryDetail = () => {
  return (
    <MasterLayout>
      <Breadcrumb title="Patient Enquiry - Detail" />

      <div className="container-fluid py-4">
        <div className="card shadow border-0 rounded-4">
          <div className="card-header border-bottom d-flex gap-3">
            <ul className="nav nav-tabs">
              <li className="nav-item"><button className="nav-link">List</button></li>
              <li className="nav-item"><button className="nav-link active">Detail</button></li>
            </ul>
          </div>

          <div className="card-body row g-4">
            {/* Left Content */}
            <div className="col-md-9">
              {/* Bill Details */}
              <div className="border p-3 rounded mb-3">
                <h6 className="fw-bold text-primary mb-3">Bill Detail</h6>
                <div className="row g-2">
                  <div className="col-md-3"><input className="form-control" placeholder="Bill No" /></div>
                  <div className="col-md-3"><input type="date" className="form-control" /></div>
                  <div className="col-md-3"><input type="time" className="form-control" placeholder="Bill Time" /></div>
                  <div className="col-md-3"><input type="time" className="form-control" placeholder="Discharge Time" /></div>
                </div>
              </div>

              {/* Patient Detail */}
              <div className="border p-3 rounded mb-3">
                <h6 className="fw-bold text-primary mb-3">Patient Detail</h6>
                <div className="row g-2">
                  <div className="col-md-4"><input className="form-control" placeholder="Patient Name" /></div>
                  <div className="col-md-4"><input className="form-control" placeholder="Admission No" /></div>
                  <div className="col-md-2"><input className="form-control" type="number" placeholder="Age" /></div>
                  <div className="col-md-2">
                    <select className="form-select"><option>Sex</option><option>M</option><option>F</option></select>
                  </div>
                  <div className="col-md-4"><input className="form-control" placeholder="Marital Status" /></div>
                  <div className="col-md-4"><input className="form-control" placeholder="Admission Date" /></div>
                  <div className="col-md-4"><input className="form-control" placeholder="Admission Time" /></div>
                  <div className="col-12"><input className="form-control" placeholder="Address" /></div>
                  <div className="col-md-4"><input className="form-control" placeholder="Phone No." /></div>
                  <div className="col-md-4"><input className="form-control" placeholder="Referral" /></div>
                  <div className="col-md-4"><input className="form-control" placeholder="Company" /></div>
                  <div className="col-md-4"><input className="form-control" placeholder="Cashless" /></div>
                  <div className="col-12"><input className="form-control" placeholder="Remarks" /></div>
                </div>
              </div>

              {/* Bill Head Detail */}
              <div className="border p-3 rounded mb-3">
                <h6 className="fw-bold text-primary mb-3">Bill Head Detail</h6>
                <div className="table-responsive" style={{ maxHeight: '150px' }}>
                  <table className="table table-bordered table-sm">
                    <thead>
                      <tr><th>Head</th><th>Amount</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>Bed Charges</td><td>0.00</td></tr>
                      <tr><td>Doctor Charges</td><td>0.00</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="row g-2 mt-3">
                  <div className="col-md-3"><input className="form-control" placeholder="Net Balance" /></div>
                  <div className="col-md-3"><input className="form-control" placeholder="Approval Amt" /></div>
                  <div className="col-md-3"><input className="form-control" placeholder="Patient Party" /></div>
                  <div className="col-md-3"><input className="form-control" placeholder="Discount" /></div>
                  <div className="col-md-3"><input className="form-control" placeholder="Receipt Amt" /></div>
                  <div className="col-md-3"><input className="form-control" placeholder="Service Tax" /></div>
                  <div className="col-md-3"><input className="form-control" placeholder="Corp. Payable" /></div>
                  <div className="col-md-3"><input className="form-control" placeholder="TDS" /></div>
                  <div className="col-md-3">
                    <div className="form-check mt-2">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label">Tax Inclusive</label>
                    </div>
                  </div>
                  <div className="col-md-3"><input className="form-control" placeholder="Due" /></div>
                </div>
              </div>

              {/* After Final Bill Detail */}
              <div className="border p-3 rounded mb-3">
                <h6 className="fw-bold text-primary mb-3">After Final Bill Detail</h6>
                <div className="row g-3">
                  <div className="col-md-6">
                    <table className="table table-sm table-bordered">
                      <thead><tr><th>Head</th><th>Amount</th></tr></thead>
                      <tbody><tr><td>Other Charges</td><td>0.00</td></tr></tbody>
                    </table>
                  </div>
                  <div className="col-md-3"><input className="form-control" placeholder="Corporate Due" /></div>
                  <div className="col-md-3"><input className="form-control" placeholder="Party Due" /></div>
                </div>
              </div>
            </div>

            {/* Right Panel (Optionally add barcode image or actions) */}
            <div className="col-md-3 d-flex flex-column gap-2 bg-light p-3 rounded">
              <h6 className="text-center fw-bold text-secondary">Quick Actions</h6>
              <button className="btn btn-primary">Search</button>
              <button className="btn btn-success">Save</button>
              <button className="btn btn-danger">Delete</button>
              <button className="btn btn-secondary">Print</button>
              <button className="btn btn-dark">Exit</button>
            </div>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default PatientEnquiryDetail;
