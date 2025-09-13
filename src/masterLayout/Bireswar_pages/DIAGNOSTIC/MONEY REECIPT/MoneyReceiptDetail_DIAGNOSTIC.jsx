import React from 'react';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';

const MoneyReceiptDetail = () => {
  return (
    <MasterLayout>
      <Breadcrumb title="Money Receipt - Detail" />
      <div className="container-fluid py-4">
        <div className="row g-4">
          {/* Left Section */}
          <div className="col-lg-9">
            <div className="card shadow-lg border-0 rounded-4 bg-white">
              {/* Tabs */}
              <div className="card-header border-bottom-0">
                <ul className="nav nav-tabs">
                  <li className="nav-item"><button className="nav-link">List</button></li>
                  <li className="nav-item"><button className="nav-link active">Detail</button></li>
                </ul>
              </div>

              <div className="card-body p-4">
                {/* Receipt Info */}
                <div className="row g-3 mb-3">
                  <div className="col-md-4"><label>Receipt No</label><input className="form-control" defaultValue="R/002484/24-25" /></div>
                  <div className="col-md-4"><label>Date</label><input type="datetime-local" className="form-control" defaultValue="2025-02-22T12:16" /></div>
                  <div className="col-md-4"><label>Receipt Type</label><input className="form-control" defaultValue="Current" /></div>
                </div>

                <div className="row g-3 mb-4">
                  <div className="col-md-4"><label>Slip No</label><input className="form-control" /></div>
                  <div className="col-md-4"><label>Booking No</label><input className="form-control" defaultValue="A-001032/24-25" /></div>
                  <div className="col-md-4"><label>Patient Name</label><input className="form-control" defaultValue="SALAUDDIN MOLLAH" /></div>
                </div>

                {/* Patient Detail */}
                <div className="border rounded p-3 mb-4 bg-light-subtle">
                  <h6 className="fw-bold text-primary mb-3">Patient Detail</h6>
                  <div className="row g-3">
                    <div className="col-md-6"><label>Address</label><input className="form-control" defaultValue="8, CARRY ROAD, P.O. SANTRAGACHI" /></div>
                    <div className="col-md-6"><label>Area / P.S.</label><input className="form-control" defaultValue="CHATTERJEEHUT" /></div>
                    <div className="col-md-3"><label>PIN</label><input className="form-control" defaultValue="711104" /></div>
                    <div className="col-md-3"><label>Age</label><input className="form-control" defaultValue="57.00" /></div>
                    <div className="col-md-3"><label>Sex</label><input className="form-control" defaultValue="M" /></div>
                    <div className="col-md-3"><label>Marital Status</label><input className="form-control" defaultValue="M" /></div>
                    <div className="col-md-6"><label>Guardian</label><input className="form-control" defaultValue="S/O LATE SAUGAT ALI MOLLAH" /></div>
                    <div className="col-md-3"><label>Religion</label><input className="form-control" defaultValue="MUSLIM" /></div>
                    <div className="col-md-3"><label>Final Bill No</label><input className="form-control" /></div>
                  </div>
                </div>

                {/* Payment Detail */}
                <div className="border rounded p-3 mb-4 bg-light-subtle">
                  <h6 className="fw-bold text-primary mb-3">Payment Detail</h6>
                  <div className="row g-3">
                    <div className="col-md-3"><label>Amount</label><input className="form-control" defaultValue="35,000.00" /></div>
                    <div className="col-md-3"><label>TDS</label><input className="form-control" defaultValue="0.00" /></div>
                    <div className="col-md-6"><label>Remarks</label><input className="form-control" defaultValue="Final Payment" /></div>
                    <div className="col-md-3"><label>Payment Type</label><input className="form-control" defaultValue="CASH" /></div>
                    <div className="col-md-3"><label>Paid By</label><input className="form-control" /></div>
                    <div className="col-md-6"><label>Narration</label><input className="form-control" /></div>
                    <div className="col-md-3"><label>Cheque / CARD</label><input className="form-control" /></div>
                    <div className="col-md-3"><label>Bank Name</label><input className="form-control" /></div>
                    <div className="col-md-3"><label>Chq Rct Dt</label><input className="form-control" type="date" defaultValue="2025-02-22" /></div>
                    <div className="col-md-3"><label>Chq Date</label><input className="form-control" type="date" defaultValue="2025-02-22" /></div>
                    <div className="col-md-3"><label>Received By</label><input className="form-control" defaultValue="MANAGER" /></div>
                    <div className="col-md-3"><label>Current User</label><input className="form-control" defaultValue="Admin" /></div>
                    <div className="col-md-12"><label>Remarks</label><textarea className="form-control" rows="2"></textarea></div>
                  </div>
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

export default MoneyReceiptDetail;
