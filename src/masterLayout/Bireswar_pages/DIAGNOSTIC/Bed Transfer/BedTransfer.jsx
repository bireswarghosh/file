import React from 'react';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';
import 'bootstrap/dist/css/bootstrap.min.css';

const BedTransfer = () => {
  return (
    <MasterLayout>
      <Breadcrumb title="Bed Transfer" />
      <div className="container-fluid py-4">
        <div className="card shadow border-0 rounded-4 bg-white">
          <div className="card-body">
            {/* Patient Information */}
            <h5 className="text-primary fw-bold mb-3">Patient Information</h5>
            <div className="row g-3 align-items-center">
              <div className="col-md-4">
                <label>Patient Name</label>
                <input className="form-control" defaultValue="MD YOUNUS" />
              </div>
              <div className="col-md-4">
                <label>Admission No</label>
                <input className="form-control" defaultValue="A-000014/16-17" />
              </div>
              <div className="col-md-4 d-flex align-items-end gap-3">
                <div className="form-check">
                  <input type="radio" className="form-check-input" name="find" defaultChecked />
                  <label className="form-check-label">Find By Name</label>
                </div>
                <div className="form-check">
                  <input type="radio" className="form-check-input" name="find" />
                  <label className="form-check-label">Find By No.</label>
                </div>
              </div>
            </div>

            {/* Current Date */}
            <h5 className="text-primary fw-bold mt-4 mb-3">Current Date</h5>
            <div className="row g-3">
              <div className="col-md-4">
                <label>Date</label>
                <input className="form-control" defaultValue="22/Feb/2025" />
              </div>
            </div>

            {/* Before Transfer Bed */}
            <h5 className="text-primary fw-bold mt-4 mb-3">Before Transfer Bed</h5>
            <div className="row g-3">
              <div className="col-md-4">
                <label>Department</label>
                <input className="form-control" defaultValue="ICU" />
              </div>
              <div className="col-md-4">
                <label>Bed No</label>
                <input className="form-control" defaultValue="32" />
              </div>
              <div className="col-md-4">
                <label>Rate</label>
                <input className="form-control" defaultValue="4000.00" />
              </div>
            </div>

            {/* Transfer Bed */}
            <h5 className="text-primary fw-bold mt-4 mb-3">Transfer Bed</h5>
            <div className="row g-3 align-items-end">
              <div className="col-md-3">
                <label>Department</label>
                <input className="form-control" defaultValue="GENERAL-WARD-FEMALE" />
              </div>
              <div className="col-md-2">
                <label>Bed No</label>
                <input className="form-control" defaultValue="13" />
              </div>
              <div className="col-md-2">
                <label>Rate</label>
                <input className="form-control" defaultValue="1000.00" />
              </div>
              <div className="col-md-2">
                <label>Time</label>
                <input className="form-control" defaultValue="05:01 PM" />
              </div>
              <div className="col-md-3">
                <label>To Day Rate</label>
                <input className="form-control" defaultValue="600.00" />
              </div>
            </div>

            {/* Transfer History */}
            <h5 className="text-primary fw-bold mt-5 mb-3">Transfer History</h5>
            <div className="table-responsive">
              <table className="table table-bordered text-center table-sm mb-0">
                <thead className="table-light">
                  <tr>
                    <th>A Date</th>
                    <th>A Time</th>
                    <th>Department</th>
                    <th>Bed No</th>
                    <th>Rate</th>
                    <th>R Date</th>
                    <th>R Time</th>
                    <th>To Day Rate</th>
                    <th>Entry By</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="table-danger">
                    <td>13/10/2017</td>
                    <td>05:24 PM</td>
                    <td>ICU</td>
                    <td>32</td>
                    <td>4000</td>
                    <td>15/10/2017</td>
                    <td>05:01 PM</td>
                    <td>2000.00</td>
                    <td>ADMIN</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Buttons */}
          <div className="card-footer d-flex flex-wrap justify-content-center gap-2 bg-light p-3">
            <button className="btn btn-primary">New</button>
            <button className="btn btn-outline-secondary">Edit</button>
            <button className="btn btn-outline-success">Save</button>
            <button className="btn btn-outline-danger">Delete</button>
            <button className="btn btn-outline-dark">Undo</button>
            <button className="btn btn-outline-info">Find</button>
            <button className="btn btn-dark">Exit</button>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default BedTransfer;