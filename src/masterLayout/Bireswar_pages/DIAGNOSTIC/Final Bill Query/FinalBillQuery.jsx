import React from 'react';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';

const FinalBillQuery = () => {
  return (
    <MasterLayout>
      <Breadcrumb title="Final Bill Query" />
      <div className="container-fluid py-4">
        <div className="card shadow border-0 rounded-4">
          <div className="card-body row g-4">

            {/* Left Column */}
            <div className="col-lg-7">
              {/* Filter & Patient Info */}
              <div className="border p-3 rounded bg-light mb-4">
                <h6 className="fw-bold mb-3">Bill Detail</h6>
                <div className="row g-2">
                  <div className="col-md-4"><input className="form-control" placeholder="Name/Bill No" /></div>
                  <div className="col-md-4"><input className="form-control" placeholder="Bill No" /></div>
                  <div className="col-md-2"><input type="date" className="form-control" /></div>
                  <div className="col-md-2"><input type="time" className="form-control" placeholder="Bill Time" /></div>
                  <div className="col-md-2"><input type="time" className="form-control" placeholder="Discharge Time" /></div>
                </div>
              </div>

              {/* Patient Info */}
              <div className="border p-3 rounded mb-4">
                <h6 className="fw-bold mb-3">Patient Detail</h6>
                <div className="row g-2">
                  <div className="col-md-4"><input className="form-control" placeholder="Admission No" /></div>
                  <div className="col-md-2"><input type="number" className="form-control" placeholder="Age" /></div>
                  <div className="col-md-2"><select className="form-select"><option>Male</option><option>Female</option></select></div>
                  <div className="col-md-2"><input className="form-control" placeholder="Status" /></div>
                  <div className="col-md-2"><input type="date" className="form-control" placeholder="Admission Date" /></div>
                  <div className="col-md-4"><input type="time" className="form-control" placeholder="Admission Time" /></div>
                  <div className="col-12"><textarea className="form-control" rows={2} placeholder="Address"></textarea></div>
                  <div className="col-md-6"><input className="form-control" placeholder="Phone No" /></div>
                </div>
              </div>

              {/* Bill Head Details */}
              <div className="border p-3 rounded mb-4">
                <h6 className="fw-bold mb-3">Bill Head Detail</h6>
                <div className="table-responsive" style={{ maxHeight: '180px' }}>
                  <table className="table table-sm table-bordered table-striped">
                    <thead className="table-primary"><tr><th>Head</th><th>Amount</th></tr></thead>
                    <tbody>
                      <tr><td>Bed Charges</td><td>3600.00</td></tr>
                      <tr><td>Other Charges</td><td>9640.00</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Totals Section */}
              <div className="border p-3 rounded">
                <div className="row g-2">
                  <div className="col-md-4"><input className="form-control" placeholder="Total Amount" defaultValue="0.00" /></div>
                  <div className="col-md-4"><input className="form-control" placeholder="Receipt" defaultValue="0.00" /></div>
                  <div className="col-md-4 d-flex align-items-center">
                    <input type="checkbox" className="form-check-input me-2" /> <label>Tax Inclusive (Y/N)</label>
                  </div>
                  <div className="col-md-4"><input className="form-control" placeholder="Net Balance" defaultValue="0.00" /></div>
                  <div className="col-md-4"><input className="form-control" placeholder="Approval Amt" defaultValue="0.00" /></div>
                  <div className="col-md-4"><input className="form-control" placeholder="Service Tax" defaultValue="0.00" /></div>
                  <div className="col-md-4"><input className="form-control" placeholder="Patient Party" defaultValue="0.00" /></div>
                  <div className="col-md-4"><input className="form-control" placeholder="Corp. Payable" defaultValue="0.00" /></div>
                  <div className="col-md-4"><input className="form-control" placeholder="TDS" defaultValue="0.00" /></div>
                  <div className="col-md-4"><input className="form-control" placeholder="Discount" defaultValue="0.00" /></div>
                  <div className="col-md-4"><input className="form-control" placeholder="Receipt Amt" defaultValue="0.00" /></div>
                  <div className="col-md-4"><input className="form-control" placeholder="Due" defaultValue="0.00" /></div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-lg-5">
              {/* Payment Party & After Final Bill Detail */}
              <div className="border p-3 rounded mb-4">
                <h6 className="fw-bold mb-3">Payment Party</h6>
                <div className="table-responsive" style={{ maxHeight: '150px' }}>
                  <table className="table table-sm table-bordered">
                    <thead><tr><th>Party</th><th>Amount</th></tr></thead>
                    <tbody>
                      <tr><td>Insurance</td><td>0.00</td></tr>
                      <tr><td>Private</td><td>0.00</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="border p-3 rounded">
                <h6 className="fw-bold mb-3">After Final Bill Detail</h6>
                <div className="row g-2">
                  <div className="col-md-6"><input className="form-control" placeholder="Corporate Due" defaultValue="0.00" /></div>
                  <div className="col-md-6"><input className="form-control" placeholder="Party Due" defaultValue="0.00" /></div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="card-footer p-3 bg-light d-flex justify-content-center gap-2">
            <button className="btn btn-primary">New</button>
            <button className="btn btn-secondary">Edit</button>
            <button className="btn btn-success">Save</button>
            <button className="btn btn-danger">Delete</button>
            <button className="btn btn-warning">Undo</button>
            <button className="btn btn-dark">Print</button>
            <button className="btn btn-outline-dark">Exit</button>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default FinalBillQuery;

