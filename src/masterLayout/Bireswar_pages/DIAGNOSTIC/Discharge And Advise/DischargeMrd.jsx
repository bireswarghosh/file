import React from 'react';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';

const docSlots = Array.from({ length: 8 }, (_, i) => i + 1);

const DischargeMrd = () => {
  return (
    <MasterLayout>
      <Breadcrumb title="Discharge and Advise - MRD Documents" />
      <div className="container-fluid py-4">
        <div className="card shadow border-0 rounded-4">
          <div className="card-header border-bottom">
            <ul className="nav nav-tabs">
              <li className="nav-item"><button className="nav-link">List</button></li>
              <li className="nav-item"><button className="nav-link">Detail</button></li>
              <li className="nav-item"><button className="nav-link">Advice</button></li>
              <li className="nav-item"><button className="nav-link active">MRD</button></li>
            </ul>
          </div>

          <div className="card-body">
            <div className="row g-4">
              {docSlots.map((slot) => (
                <div className="col-md-4" key={slot}>
                  <div className="border rounded-3 p-3 bg-light text-center h-100 d-flex flex-column justify-content-between">
                    <h6 className="fw-bold mb-3">Load Doc {slot}</h6>
                    <div className="mb-3">
                      <input type="file" className="form-control mb-2" />
                      <button className="btn btn-success w-100 mb-2">Save</button>
                      <button className="btn btn-outline-primary w-100">Open Doc</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-footer bg-light d-flex flex-wrap justify-content-center gap-2 p-3">
            <button className="btn btn-primary">New</button>
            <button className="btn btn-outline-secondary">Edit</button>
            <button className="btn btn-outline-success" disabled>Save</button>
            <button className="btn btn-outline-danger">Delete</button>
            <button className="btn btn-outline-dark">Undo</button>
            <button className="btn btn-warning">Print</button>
            <button className="btn btn-dark">Exit</button>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default DischargeMrd;
