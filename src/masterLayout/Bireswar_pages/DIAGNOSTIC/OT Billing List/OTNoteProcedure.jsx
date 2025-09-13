import React from 'react';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';

const OTNoteProcedure = () => {
  return (
    <MasterLayout>
      <Breadcrumb title="O.T. Billing - OT Note Procedure" />
      <div className="container-fluid py-4">
        <div className="card shadow border-0 rounded-4 bg-white">
          {/* Tabs */}
          <div className="card-header border-bottom-0">
            <ul className="nav nav-tabs">
              <li className="nav-item"><button className="nav-link">List</button></li>
              <li className="nav-item"><button className="nav-link">Detail</button></li>
              <li className="nav-item"><button className="nav-link active">OT Note Procedure</button></li>
            </ul>
          </div>

          <div className="card-body bg-light">
            <h5 className="fw-bold text-primary mb-4">OT Note</h5>
            <div className="row g-4">
              <div className="col-md-6">
                <label>Incision</label>
                <input className="form-control" />
              </div>
              <div className="col-md-6">
                <label>Pre Operative Diagnostic</label>
                <input className="form-control" />
              </div>
              <div className="col-md-6">
                <label>Post Operative Diagnostic</label>
                <input className="form-control" />
              </div>
              <div className="col-12">
                <label>Findings</label>
                <textarea className="form-control" rows={3}></textarea>
              </div>
              <div className="col-12">
                <label>Steps</label>
                <textarea className="form-control" rows={3}></textarea>
              </div>
              <div className="col-12">
                <label>Closure</label>
                <textarea className="form-control" rows={2}></textarea>
              </div>
              <div className="col-md-6">
                <label>Operative Difficulties</label>
                <input className="form-control" />
              </div>
              <div className="col-md-6">
                <label>Count</label>
                <input className="form-control" />
              </div>
              <div className="col-md-6">
                <label>Blood Loss</label>
                <input className="form-control" />
              </div>
              <div className="col-md-6">
                <label>Transfusion</label>
                <input className="form-control" />
              </div>
            </div>
          </div>

          {/* Button Footer */}
          <div className="card-footer bg-light d-flex flex-wrap justify-content-between align-items-center p-3 mt-2">
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

export default OTNoteProcedure;
