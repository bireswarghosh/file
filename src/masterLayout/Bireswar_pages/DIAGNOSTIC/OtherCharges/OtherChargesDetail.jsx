import React from 'react';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';

const charges = [
  { head: 'GLUCOMETER TEST', rate: 100, qty: 2, amount: 200 },
  { head: 'I.M.CHARGES', rate: 100, qty: 1, amount: 100 },
  { head: 'PULSE OXYMETER (PORT) PER USE', rate: 100, qty: 16, amount: 1600 },
  { head: 'BLOOD TRANSFUSION CHARGE', rate: 600, qty: 2, amount: 1200 },
  { head: 'REGISTRATION CHARGE', rate: 200, qty: 1, amount: 200 },
  { head: 'ATTENDANT CHARGES DAY', rate: 250, qty: 3, amount: 750 },
  { head: 'CRITICAL CARE DOCTOR CHARGE', rate: 300, qty: 4, amount: 1200 },
  { head: 'CRITICAL CARE FEES', rate: 600, qty: 2, amount: 1200 },
  { head: 'CARDIAC MONITER PER DAY', rate: 600, qty: 4, amount: 2400 },
  { head: 'INFUSION PUMP PER DAY', rate: 600, qty: 4, amount: 2400 },
  { head: 'DOCTOR VISIT', rate: 1500, qty: 5, amount: 7500 },
  { head: 'TAPPING CHARGES BY DOCTOR', rate: 3000, qty: 1, amount: 3000 }
];

const totalAmount = charges.reduce((sum, row) => sum + row.amount, 0);

const OtherChargesDetail = () => {
  return (
    <MasterLayout>
      <Breadcrumb title="Others Charges Detail" />
      <div className="container-fluid py-4">
        <div className="card shadow rounded-4 border-0 bg-white">
          <div className="card-header border-bottom-0 bg-warning-subtle">
            <h5 className="fw-bold text-danger mb-0">Others Charges</h5>
          </div>

          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-sm table-bordered text-center align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Other Charge Head</th>
                    <th>Rate</th>
                    <th>Qty</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {charges.map((row, i) => (
                    <tr key={i} className={row.head === 'TAPPING CHARGES BY DOCTOR' ? 'bg-success-subtle fw-bold' : 'bg-warning-subtle'}>
                      <td>{row.head}</td>
                      <td>{row.rate}</td>
                      <td>{row.qty}</td>
                      <td>{row.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card-footer d-flex justify-content-between align-items-center bg-light p-3">
            <div className="fw-bold text-dark">Total Amount:</div>
            <input type="text" className="form-control text-end fw-bold" style={{ maxWidth: '200px' }} value={totalAmount.toFixed(2)} readOnly />
            <button className="btn btn-outline-danger px-4">Exit</button>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default OtherChargesDetail;
