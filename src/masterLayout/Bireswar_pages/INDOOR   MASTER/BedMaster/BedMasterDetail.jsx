import React from 'react';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';

const BedMasterDetail = () => {
  return (
    <MasterLayout>
      <Breadcrumb title="Bed Master - Detail" />
      <div className="container-fluid py-4">
        <div className="card shadow rounded-4 border-0">
          <div className="card-header border-bottom d-flex gap-3">
            <ul className="nav nav-tabs">
              <li className="nav-item"><button className="nav-link">List</button></li>
              <li className="nav-item"><button className="nav-link active">Detail</button></li>
            </ul>
          </div>

          <div className="card-body row g-3 px-4">
            {/* Bed Detail Inputs */}
            <div className="col-md-4">
              <label className="form-label">Department</label>
              <input className="form-control" defaultValue="CCU" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Bed No.</label>
              <input className="form-control" defaultValue="CCU-1" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Short Name</label>
              <input className="form-control" defaultValue="CCU" />
            </div>

            <div className="col-md-4">
              <label className="form-label">Bed Charges</label>
              <input className="form-control" defaultValue="4900.00" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Nursing Charges</label>
              <input className="form-control" defaultValue="0.00" />
            </div>
            <div className="col-md-4">
              <label className="form-label">RMO Charges</label>
              <input className="form-control" defaultValue="0.00" />
            </div>

            <div className="col-md-4">
              <label className="form-label">Total Bed Charges</label>
              <input className="form-control" defaultValue="4900.00" readOnly />
            </div>
            <div className="col-md-4">
              <label className="form-label">BP (%)</label>
              <input className="form-control" defaultValue="0.00" />
            </div>
            <div className="col-md-4 d-flex align-items-end gap-3">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="serviceCharge" defaultChecked />
                <label className="form-check-label" htmlFor="serviceCharge">Service Charges (Y/N)</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="showFinalBill" defaultChecked />
                <label className="form-check-label" htmlFor="showFinalBill">Show in Final Bill (Y/N)</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="gst" />
                <label className="form-check-label" htmlFor="gst">GST</label>
              </div>
            </div>

            <div className="col-12 d-flex gap-3 align-items-center">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="rateEdit" defaultChecked />
                <label className="form-check-label" htmlFor="rateEdit">Rate Edit</label>
              </div>
              <button className="btn btn-outline-secondary">Occupied</button>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="card-footer bg-light d-flex flex-wrap justify-content-center gap-2 p-3">
            <button className="btn btn-success">New</button>
            <button className="btn btn-primary">Edit</button>
            <button className="btn btn-outline-secondary" disabled>Save</button>
            <button className="btn btn-outline-danger">Delete</button>
            <button className="btn btn-dark">Undo</button>
            <button className="btn btn-info text-white">Print</button>
            <button className="btn btn-secondary">Exit</button>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default BedMasterDetail;
