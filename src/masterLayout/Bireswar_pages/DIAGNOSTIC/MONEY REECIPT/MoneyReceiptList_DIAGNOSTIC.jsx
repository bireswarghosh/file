import React from 'react';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';

const receiptData = [
  {
    receiptNo: 'R/002484/24-25',
    date: '22/02/2025',
    type: 'Current',
    admissionNo: 'A-001032/24-25',
    payment: 'CASH',
    patient: 'SALAUDDIN MOLLAH',
    age: '57-Y',
    sex: 'M',
    amount: 350
  },
  {
    receiptNo: 'R/002482/24-25',
    date: '22/02/2025',
    type: 'Current',
    admissionNo: 'A-001035/24-25',
    payment: 'CASH',
    patient: 'SK MOSTAK AHMAMD',
    age: '58-Y',
    sex: 'M',
    amount: 700
  },
  {
    receiptNo: 'R/002483/24-25',
    date: '22/02/2025',
    type: 'Current',
    admissionNo: 'A-001044/24-25',
    payment: 'CASH',
    patient: 'PRABHAT KUMAR MONDAL',
    age: '88-Y',
    sex: 'M',
    amount: 500
  }
];

const MoneyReceiptList = () => {
  return (
    <MasterLayout>
      <Breadcrumb title="Money Receipt - List" />
      <div className="container-fluid py-4">
        <div className="row g-3">
          {/* Main Section */}
          <div className="col-lg-9">
            <div className="card shadow rounded-4 border-0 bg-white">
              {/* Tabs */}
              <div className="card-header border-bottom-0">
                <ul className="nav nav-tabs">
                  <li className="nav-item"><button className="nav-link active">List</button></li>
                  <li className="nav-item"><button className="nav-link">Detail</button></li>
                </ul>
              </div>

              <div className="card-body">
                {/* Filters */}
                <div className="row g-3 mb-3 align-items-center">
                  <div className="col-md-3 d-flex align-items-center gap-2">
                    <label>Date From</label>
                    <input type="date" className="form-control" defaultValue="2025-02-22" />
                  </div>
                  <div className="col-md-3 d-flex align-items-center gap-2">
                    <label>To</label>
                    <input type="date" className="form-control" defaultValue="2025-02-22" />
                  </div>
                  <div className="col-md-6 d-flex gap-3">
                    <div className="form-check"><input className="form-check-input" type="radio" name="view" defaultChecked /><label className="form-check-label">Receipt Date Wise</label></div>
                    <div className="form-check"><input className="form-check-input" type="radio" name="view" /><label className="form-check-label">Admission No Wise</label></div>
                    <div className="form-check"><input className="form-check-input" type="radio" name="view" /><label className="form-check-label">Patient Name Wise</label></div>
                  </div>
                </div>

                <div className="row g-3 align-items-center mb-3">
                  <div className="col-md-3">
                    <label className="form-label fw-bold text-primary">Receipt Type</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-md-2 d-flex align-items-end">
                    <button className="btn btn-primary w-100">Show</button>
                  </div>
                </div>

                {/* Table */}
                <div className="table-responsive border rounded">
                  <table className="table table-bordered table-sm table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Receipt No</th><th>Date</th><th>Receipt Type</th><th>Admission No</th>
                        <th>Payment</th><th>Patient Name</th><th>Age</th><th>Sex</th><th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {receiptData.map((r, i) => (
                        <tr key={i}>
                          <td>{r.receiptNo}</td><td>{r.date}</td><td>{r.type}</td><td>{r.admissionNo}</td>
                          <td>{r.payment}</td><td>{r.patient}</td><td>{r.age}</td><td>{r.sex}</td><td>{r.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="card-footer bg-light p-3 d-flex flex-wrap justify-content-between">
                <div className="btn-group">
                  {['New', 'Edit', 'Save', 'Delete', 'Undo', 'Print', 'Exit'].map(btn => (
                    <button key={btn} className="btn btn-outline-primary">{btn}</button>
                  ))}
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-outline-dark">Prev</button>
                  <button className="btn btn-outline-dark">Next</button>
                  <input type="date" className="form-control" style={{ maxWidth: 160 }} defaultValue="2025-02-22" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="col-lg-3">
            <div className="card bg-light border-0 shadow-sm rounded-4">
              <div className="card-body text-center">
                <img
                  src="https://barcode.tec-it.com/barcode.ashx?data=A-001032%2F24-25&code=Code128"
                  alt="barcode"
                  className="img-fluid mb-2"
                />
                <div className="fw-bold mb-3">A-001032/24-25</div>
                <h6 className="text-secondary">Doctor Charges:</h6>
                <p className="fw-bold text-primary">Label32</p>
                <div className="bg-white border rounded p-3 mt-2" style={{ minHeight: 100 }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default MoneyReceiptList;
