import React, { useState } from 'react';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';

const patientList1 = [
  { caseNo: 'OP/2425/08288', name: 'LILY DAS' },
  { caseNo: 'OP/2425/08287', name: 'SUDIPA' },
  { caseNo: 'OP/2425/08286', name: 'UJALA SAR' },
  { caseNo: 'OP/2425/08284', name: 'NIBHA DAS' },
  { caseNo: 'OP/2425/08283', name: 'NIRMAL' },
  { caseNo: 'OP/2425/08281', name: 'RADHA RANI' },
  { caseNo: 'OP/2425/08280', name: 'SHAGUFTA' },
  { caseNo: 'OP/2425/08279', name: 'SAMIR' },
  { caseNo: 'OP/2425/08278', name: 'NABA KUMAR' },
  { caseNo: 'OP/2425/08277', name: 'PRABHAT' },
  { caseNo: 'OP/2425/08275', name: 'SWARNALI' },
  { caseNo: 'OP/2425/08274', name: 'SUNITA' },
  { caseNo: 'OP/2425/08273', name: 'PRIYANKA' },
  { caseNo: 'OP/2425/08272', name: 'UJAWAL DAS' },
];

const patientList2 = [
  { caseNo: 'IP/2425/08285', name: 'NITA' },
  { caseNo: 'IP/2425/08282', name: 'SUBHADIP' },
  { caseNo: 'IP/2425/08280', name: 'NITA' },
  { caseNo: 'IP/2425/08271', name: 'RESHMA' },
];

const RadiologyRequisition = () => {
  const [activeTab, setActiveTab] = useState('list');

  return (
    <MasterLayout>
      <Breadcrumb title="Radiology Requisition" />
      <div className="container-fluid py-4 px-lg-4">
        <div className="card shadow-xl border-0 rounded-4 overflow-hidden">
          <div className="card-header p-0 border-bottom-0">
            <ul className="nav nav-tabs nav-tabs-modern" role="tablist">
              <li className="nav-item">
                <button className={`nav-link ${activeTab === 'list' ? 'active' : ''}`} onClick={() => setActiveTab('list')}>
                  List
                </button>
              </li>
              <li className="nav-item">
                <button className={`nav-link ${activeTab === 'detail' ? 'active' : ''}`} onClick={() => setActiveTab('detail')}>
                  Detail
                </button>
              </li>
            </ul>
          </div>

          <div className="card-body p-3 p-md-4">
            <div className="p-3 mb-4 rounded-3 bg-light border">
              <div className="row g-3 align-items-center">
                <div className="col-lg-5">
                  <div className="d-flex flex-wrap align-items-center gap-3">
                    <span className="fw-bold text-secondary">Find By:</span>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="findOption" id="labNo" defaultChecked />
                      <label className="form-check-label" htmlFor="labNo">Lab No.</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="findOption" id="caseNo" />
                      <label className="form-check-label" htmlFor="caseNo">Case No.</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="findOption" id="barcode" />
                      <label className="form-check-label" htmlFor="barcode">Barcode No.</label>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Enter Lab No..." />
                    <button className="btn btn-primary">Find</button>
                  </div>
                </div>
              </div>

              <hr className="my-3" />

              <div className="row g-3 align-items-center">
                <div className="col-lg-5">
                  <div className="d-flex flex-wrap align-items-center gap-3">
                    <span className="fw-bold text-secondary">Status:</span>
                    <div className="form-check form-check-inline"><input className="form-check-input" type="radio" name="status" defaultChecked /><label className="form-check-label">All</label></div>
                    <div className="form-check form-check-inline"><input className="form-check-input" type="radio" name="status" /><label className="form-check-label">Pending</label></div>
                    <div className="form-check form-check-inline"><input className="form-check-input" type="radio" name="status" /><label className="form-check-label">Complete</label></div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="input-group">
                    <span className="input-group-text">From</span>
                    <input type="date" className="form-control" defaultValue="2025-02-22" />
                    <span className="input-group-text">To</span>
                    <input type="date" className="form-control" defaultValue="2025-02-22" />
                  </div>
                </div>
              </div>
            </div>

            <div className="row g-4">
              <div className="col-lg-8">
                <h5 className="fw-bold text-primary-emphasis mb-2">Radiology Requests</h5>
                <div className="table-responsive shadow-sm" style={{ maxHeight: '450px', border: '1px solid #dee2e6' }}>
                  <table className="table table-hover table-bordered table-striped align-middle mb-0">
                    <thead className="table-dark sticky-top">
                      <tr>
                        <th>RadReq No</th><th>Date</th><th>Case No</th><th>Case Date</th><th>Patient</th><th>Department</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Add dynamic rows here or leave empty */}
                      <tr><td colSpan="6" className="text-center text-muted p-5">No requisition data loaded.</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="row g-4">
                  <div className="col-12 col-md-6 col-lg-12">
                    <h6 className="fw-bold text-primary-emphasis mb-2">Patient List on Date Range</h6>
                    <div className="table-responsive shadow-sm" style={{ maxHeight: '210px', border: '1px solid #dee2e6' }}>
                      <table className="table table-sm table-striped">
                        <thead><tr><th>CaseNo</th><th>Name</th></tr></thead>
                        <tbody>{patientList1.map((p, i) => (<tr key={i}><td>{p.caseNo}</td><td>{p.name}</td></tr>))}</tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-12">
                    <h6 className="fw-bold text-primary-emphasis mb-2">Patient List on Date Range</h6>
                    <div className="table-responsive shadow-sm" style={{ maxHeight: '210px', border: '1px solid #dee2e6' }}>
                      <table className="table table-sm table-striped">
                        <thead><tr><th>CaseNo</th><th>Name</th></tr></thead>
                        <tbody>{patientList2.map((p, i) => (<tr key={i}><td>{p.caseNo}</td><td>{p.name}</td></tr>))}</tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="card-footer p-3 bg-light border-top">
            <div className="d-flex flex-wrap justify-content-center justify-content-md-end gap-2">
              <button className="btn btn-outline-secondary rounded-pill px-3">New</button>
              <button className="btn btn-outline-primary rounded-pill px-3">Edit</button>
              <button className="btn btn-outline-success rounded-pill px-3">Save</button>
              <button className="btn btn-outline-danger rounded-pill px-3">Delete</button>
              <button className="btn btn-outline-warning rounded-pill px-3">Undo</button>
              <button className="btn btn-outline-dark rounded-pill px-3">Print</button>
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

export default RadiologyRequisition;
