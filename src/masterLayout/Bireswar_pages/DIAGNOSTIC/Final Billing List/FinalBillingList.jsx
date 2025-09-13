import React from 'react';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';

const FinalBillingList = () => {
  const billingData = [
    { billNo: 'F-001043/24-25', billDate: '22/02/2025', billTime: '11:09 AM', admissionNo: 'A-001035/24-25', patientName: 'SK MOSTAK AHMAMD' },
    { billNo: 'F-001044/24-25', billDate: '22/02/2025', billTime: '11:57 AM', admissionNo: 'A-001032/24-25', patientName: 'SALAUDDIN MOLLAH' },
    { billNo: 'F-001045/24-25', billDate: '22/02/2025', billTime: '11:50 AM', admissionNo: 'A-001036/24-25', patientName: 'PRABIR MUKHERJEE' }
  ];

  return (
    <MasterLayout>
      <Breadcrumb title="Final Billing" />
      <div className="container-fluid py-4">
        <div className="card shadow rounded-4 border-0">
          <div className="card-header border-bottom">
            <ul className="nav nav-tabs">
              <li className="nav-item"><button className="nav-link active">List</button></li>
              <li className="nav-item"><button className="nav-link">Detail</button></li>
            </ul>
          </div>

          <div className="card-body">
            <div className="row g-3">
              {/* Filters */}
              <div className="col-md-8">
                <div className="row g-2">
                  <div className="col-md-3">
                    <label>Date From</label>
                    <input type="date" className="form-control" defaultValue="2025-02-22" />
                  </div>
                  <div className="col-md-3">
                    <label>Date To</label>
                    <input type="date" className="form-control" defaultValue="2025-02-22" />
                  </div>
                  <div className="col-md-6 d-flex align-items-end gap-2">
                    <div className="form-check"><input className="form-check-input" type="radio" name="searchType" defaultChecked /> <label className="form-check-label">Bill No Wise</label></div>
                    <div className="form-check"><input className="form-check-input" type="radio" name="searchType" /> <label className="form-check-label">Admission No Wise</label></div>
                    <div className="form-check"><input className="form-check-input" type="radio" name="searchType" /> <label className="form-check-label">Patient Name Wise</label></div>
                  </div>
                </div>
                <div className="d-flex align-items-center mt-3">
                  <input type="text" className="form-control me-2" placeholder="Search..." />
                  <button className="btn btn-primary">Show</button>
                </div>
              </div>

              {/* Right Side Panel */}
              <div className="col-md-4 bg-light p-3 rounded shadow-sm">
                <div className="text-center mb-3">
                  <img src="https://via.placeholder.com/150x50?text=Barcode" alt="Barcode" className="img-fluid mb-1" />
                  <div className="fw-bold">A-001035/24-25</div>
                </div>
                <div className="mb-2">
                  <label className="text-danger fw-bold">Diagnostic Adv Rcvd</label>
                  <input type="text" className="form-control" defaultValue="3120.00" />
                </div>
                <div className="mb-2">
                  <label className="text-danger fw-bold">Med Adv Received</label>
                  <input type="text" className="form-control" defaultValue="0.00" />
                </div>
                <div className="mb-3">
                  <label className="text-danger fw-bold">Remarks</label>
                  <textarea className="form-control" rows={4}></textarea>
                </div>
                <div className="mb-2">
                  <button className="btn btn-secondary w-100 mb-2">All Money Receipt</button>
                  <button className="btn btn-dark w-100">Print MRet</button>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="submitted" />
                  <label className="form-check-label" htmlFor="submitted">Submitted</label>
                </div>
                <div className="mt-2">
                  <input type="text" className="form-control mb-2" placeholder="User/Note" />
                  <button className="btn btn-info text-white w-100">Update</button>
                </div>
              </div>
            </div>

            {/* Billing Table */}
            <div className="table-responsive mt-4">
              <table className="table table-bordered table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>Bill No</th>
                    <th>Bill Date</th>
                    <th>Bill Time</th>
                    <th>Admission No</th>
                    <th>Patient Name</th>
                    <th>BillType</th>
                    <th>Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {billingData.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.billNo}</td>
                      <td>{row.billDate}</td>
                      <td>{row.billTime}</td>
                      <td>{row.admissionNo}</td>
                      <td>{row.patientName}</td>
                      <td></td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Buttons */}
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

export default FinalBillingList;
