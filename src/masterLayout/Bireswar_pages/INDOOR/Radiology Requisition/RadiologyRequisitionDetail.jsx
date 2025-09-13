import React from 'react';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';

const RadiologyRequisitionDetail = () => {
  return (
    <MasterLayout>
      <Breadcrumb title="Radiology Requisition - Detail" />
      <div className="container-fluid py-4 px-lg-4">
        <div className="card shadow-xl border-0 rounded-4 overflow-hidden">
          {/* Header Tab */}
          <div className="card-header p-0 border-bottom-0">
            <ul className="nav nav-tabs nav-tabs-modern" role="tablist">
              <li className="nav-item">
                <button className="nav-link" disabled>List</button>
              </li>
              <li className="nav-item">
                <button className="nav-link active">Detail</button>
              </li>
            </ul>
          </div>

          {/* Body */}
          <div className="card-body p-3 p-md-4 bg-light">
            <div className="row g-3 mb-4">
              {/* Left Section */}
              <div className="col-lg-8">
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">Search By Case Date</label>
                    <input type="date" className="form-control" defaultValue="2025-02-26" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Collection ID</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Lab Receiving Date</label>
                    <input type="date" className="form-control" defaultValue="2025-02-26" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Regst No</label>
                    <input type="text" className="form-control" defaultValue="OP/2425/08288" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Case Date</label>
                    <input type="date" className="form-control" defaultValue="2025-02-26" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Lab Receiving Time</label>
                    <input type="time" className="form-control" defaultValue="11:56:00" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Patient Name</label>
                    <input type="text" className="form-control" defaultValue="LILY DAS" />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Age</label>
                    <input type="text" className="form-control" defaultValue="65" />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Sex</label>
                    <div className="d-flex gap-2 mt-1">
                      <div className="form-check">
                        <input type="radio" className="form-check-input" name="gender" id="genderF" defaultChecked />
                        <label className="form-check-label" htmlFor="genderF">F</label>
                      </div>
                      <div className="form-check">
                        <input type="radio" className="form-check-input" name="gender" id="genderM" />
                        <label className="form-check-label" htmlFor="genderM">M</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Department</label>
                    <select className="form-select">
                      <option>X-RAY</option>
                      <option>CT-SCAN</option>
                      <option>USG</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Pre Printed Barcode ID</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
              </div>

              {/* Right: Barcode Preview */}
              <div className="col-lg-4 text-center">
                <div className="p-3 border rounded bg-white shadow-sm">
                  <img
                    src="https://barcode.tec-it.com/barcode.ashx?data=OP%2F2425%2F08288&code=Code128&dpi=96"
                    alt="Barcode"
                    className="img-fluid mb-2"
                  />
                  <div className="fw-bold">OP/2425/08288</div>
                </div>
              </div>
            </div>

            {/* Table Below */}
            <div className="table-responsive shadow-sm">
              <table className="table table-hover table-bordered align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Test</th>
                    <th>Procedure Dt.</th>
                    <th>Time</th>
                    <th>RadReqRptDt</th>
                    <th>RadReqRptTm</th>
                    <th>BarCode No.</th>
                    <th>Profile Name</th>
                    <th>Sample Type</th>
                    <th>SampleType1</th>
                    <th>SmplSlNo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="10" className="text-center text-muted py-4">No test procedures added.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="card-footer p-3 bg-light border-top">
            <div className="d-flex flex-wrap justify-content-center justify-content-md-end gap-2">
              <button className="btn btn-outline-secondary rounded-pill px-3">New</button>
              <button className="btn btn-outline-primary rounded-pill px-3">Edit</button>
              <button className="btn btn-success rounded-pill px-3">Save</button>
              <button className="btn btn-danger rounded-pill px-3">Delete</button>
              <button className="btn btn-warning text-dark rounded-pill px-3">Undo</button>
              <button className="btn btn-dark rounded-pill px-3">Print</button>
              <button className="btn btn-secondary rounded-pill px-3">PP-Print</button>
              <button className="btn btn-secondary rounded-pill px-3">F-Print</button>
              <button className="btn btn-info text-white rounded-pill px-3">Dtl Barcode Print</button>
              <button className="btn btn-dark rounded-pill px-3">Exit</button>
            </div>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default RadiologyRequisitionDetail;