import React from 'react';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';

const DischargeAdvise = () => {
  return (
    <MasterLayout>
      <Breadcrumb title="Discharge and Advise" />
      <div className="container-fluid py-4">
        <div className="card shadow border-0 rounded-4 bg-white">
          <div className="card-header border-bottom">
            <ul className="nav nav-tabs">
              <li className="nav-item"><button className="nav-link">List</button></li>
              <li className="nav-item"><button className="nav-link">Detail</button></li>
              <li className="nav-item"><button className="nav-link active">Advices</button></li>
              <li className="nav-item"><button className="nav-link">MRD</button></li>
            </ul>
          </div>

          <div className="card-body">
            <div className="row g-3">
              {/* Left Side: Past History & Advice */}
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label fw-bold">Past History</label>
                  <textarea className="form-control" rows={2} defaultValue="1"></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Significant Findings</label>
                  <textarea className="form-control" rows={2} defaultValue="BP=190/100 MMHG&#10;PULSE = 110/MIN&#10;SPO2=98%R.A"></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Investigation Results</label>
                  <textarea className="form-control" rows={2} defaultValue="All reports enclosed."></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Treatment Done</label>
                  <textarea className="form-control" rows={2} defaultValue="1. Conservative."></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Procedure (If Any)</label>
                  <textarea className="form-control" rows={3} defaultValue="2. Gastroenterologist (Dr.Srikant Mohta) and General surgeon (Dr. Shashank Shukla) opinion were taken."></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Condition At Discharge</label>
                  <textarea className="form-control" rows={2} defaultValue="Hemodynamically stable."></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Follow Up Date</label>
                  <textarea className="form-control" rows={2} defaultValue="Follow up after 10 days at opd/or in case of any emergency please contact..."></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Advice on Discharge</label>
                  <table className="table table-bordered table-sm">
                    <thead className="table-light">
                      <tr><th>S.No</th><th>Type</th><th>Medicine</th><th>Dose</th><th>Unit</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>1</td><td>NORMAL DIET</td><td></td><td></td><td></td></tr>
                      <tr><td>2</td><td>CAPSULE</td><td>PAN-D</td><td>1 CAP. ODACX 2</td><td></td></tr>
                      <tr><td>3</td><td>TABLET</td><td>MAGNICLAV LB 625 MG</td><td>1 TAB. TDCX X 10</td><td></td></tr>
                      <tr><td>4</td><td>TABLET</td><td>CEFAKIND 500 MG</td><td>1 TAB BDPCX X 7</td><td></td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Side: Test Results */}
              <div className="col-lg-6">
                <div className="mb-4">
                  <h6 className="fw-bold text-primary">General Format</h6>
                  <div className="table-responsive" style={{ maxHeight: 220, overflowY: 'auto' }}>
                    <table className="table table-sm table-bordered text-center">
                      <thead className="table-light">
                        <tr><th>Test</th><th>Rate</th><th>TestPro</th><th>Provalue</th></tr>
                      </thead>
                      <tbody>
                        {Array.from({ length: 12 }).map((_, idx) => (
                          <tr key={idx}>
                            <td>CREATININE</td><td>250</td><td>CREATININ</td><td>{Math.random().toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mb-4">
                  <h6 className="fw-bold text-primary">Blood Format</h6>
                  <div className="table-responsive" style={{ maxHeight: 200 }}>
                    <table className="table table-sm table-bordered">
                      <thead className="table-light">
                        <tr><th>SNo</th><th>Pro Name</th><th>Value</th></tr>
                      </thead>
                      <tbody>
                        <tr><td>1</td><td>Hemoglobin1</td><td>14.5</td></tr>
                        <tr><td>2</td><td>Hemoglobin2</td><td>14.6</td></tr>
                        <tr><td>3</td><td>Hemoglobin3</td><td>100.68</td></tr>
                        <tr><td>4</td><td>Erythrocytes</td><td>5.35</td></tr>
                        <tr><td>5</td><td>Leucocytes</td><td>15000</td></tr>
                        <tr><td>6</td><td>Neutrophils</td><td>88</td></tr>
                        <tr><td>7</td><td>Lymphocytes</td><td>10</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <label className="form-label fw-bold">Notes / Narration</label>
                  <textarea className="form-control" rows={5}></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="card-footer bg-light d-flex flex-wrap justify-content-center gap-2 p-3">
            <button className="btn btn-primary">New</button>
            <button className="btn btn-outline-secondary">Edit</button>
            <button className="btn btn-outline-success">Save</button>
            <button className="btn btn-outline-danger">Delete</button>
            <button className="btn btn-outline-dark">Undo</button>
            <button className="btn btn-outline-warning">Print</button>
            <button className="btn btn-dark">Exit</button>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default DischargeAdvise;