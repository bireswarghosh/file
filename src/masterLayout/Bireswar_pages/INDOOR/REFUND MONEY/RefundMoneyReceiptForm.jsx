


import React from 'react';
import MasterLayout from '../../../MasterLayout'; // Assuming these are your components
import Breadcrumb from '../../../Breadcrumb';   // Assuming these are your components

// Initial state for the form data, capturing all fields from the image
const initialRefundData = {
  receiptNo: 'M-011086/24-25',
  receiptDate: '2025-02-22',
  findOption: 'name', // 'name' or 'number'
  isRefund: true,
  bookingOption: 'N',
  bookingValue: '',
  caseOption: 'Y',
  caseValue: '',
  dateValue: '',
  patientName: 'UJJWAL DAS',
  age: '48',
  sex: 'Male',
  receivedBy: 'SUMIYA NASRIN',
  currentUser: 'Admin',
  billAmount: '0.00',
  receivedAmount: '0.00',
  refundAmount: '0.00',
  discountAmount: '0.00',
  modeOfPayment: 'C',
  bankChequeCardNo: '',
  narration: ''
};


function RefundMoneyReceiptForm() {
  const [formData, setFormData] = React.useState(initialRefundData);

  // Handler for form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Refund Money Receipt" />
      <div className="container-fluid py-3 px-lg-3">
        <div className="card shadow-sm border" style={{ backgroundColor: '#FFF0F5', fontSize: '0.9rem' }}> {/* Light pinkish background for the whole window */}
          
          {/* Tabs */}
          <div className="card-header p-0 border-bottom-0" style={{ backgroundColor: '#FFE4E1' }}>
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a className="nav-link" href="#" style={{ color: '#444' }}>List</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active fw-bold" aria-current="page" href="#" style={{ backgroundColor: '#FFEBEE', color: 'black', border: '1px solid #D1C4E9', borderBottomColor: '#FFEBEE' }}>Detail</a>
              </li>
            </ul>
          </div>

          <div className="card-body p-3" style={{ backgroundColor: '#FFEBEE' }}> {/* Pink background for the form area */}
            
            {/* Header Bar: Receipt No, Date, Find Options */}
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3 p-2 border rounded" style={{backgroundColor: '#FFE4E1'}}>
                <div className="d-flex align-items-center gap-2">
                    <label htmlFor="receiptNo" className="form-label mb-0 fw-bold small">Receipt</label>
                    <input type="text" className="form-control form-control-sm" style={{width: '180px'}} id="receiptNo" name="receiptNo" value={formData.receiptNo} onChange={handleChange} />
                </div>
                <div className="d-flex align-items-center gap-2">
                    <label htmlFor="receiptDate" className="form-label mb-0 fw-bold small">Receipt Date</label>
                    <input type="date" className="form-control form-control-sm" style={{width: '160px'}} id="receiptDate" name="receiptDate" value={formData.receiptDate} onChange={handleChange} />
                </div>
                <div className="d-flex align-items-center gap-3">
                    <div className="form-check form-check-inline mb-0">
                        <input className="form-check-input" type="radio" name="findOption" id="findByName" value="name" checked={formData.findOption === 'name'} onChange={handleChange} />
                        <label className="form-check-label fw-bold small" htmlFor="findByName">Find By Name</label>
                    </div>
                    <div className="form-check form-check-inline mb-0">
                        <input className="form-check-input" type="radio" name="findOption" id="findByNo" value="number" checked={formData.findOption === 'number'} onChange={handleChange} />
                        <label className="form-check-label fw-bold small" htmlFor="findByNo">Find By No.</label>
                    </div>
                </div>
            </div>

            {/* Refund Section */}
            <div className="p-3 border rounded-3 mb-3 shadow-sm bg-white">
              <div className="form-check mb-3">
                <input className="form-check-input" type="checkbox" id="isRefund" name="isRefund" checked={formData.isRefund} onChange={handleChange} />
                <label className="form-check-label fw-bold fs-6" htmlFor="isRefund">
                  Refund
                </label>
              </div>
              <div className="row g-3 align-items-center">
                <div className="col-md-6 d-flex align-items-center">
                  <label htmlFor="bookingOption" className="form-label fw-bold mb-0 me-2" style={{minWidth: '60px'}}>Booking</label>
                  <select id="bookingOption" name="bookingOption" value={formData.bookingOption} onChange={handleChange} className="form-select form-select-sm me-2" style={{width: '70px'}}>
                    <option value="N">N</option>
                    <option value="Y">Y</option>
                  </select>
                  <input type="text" id="bookingValue" name="bookingValue" value={formData.bookingValue} onChange={handleChange} className="form-control form-control-sm" />
                </div>
                <div className="col-md-6 d-flex align-items-center">
                  <label htmlFor="caseOption" className="form-label fw-bold mb-0 me-2" style={{minWidth: '60px'}}>Case</label>
                  <select id="caseOption" name="caseOption" value={formData.caseOption} onChange={handleChange} className="form-select form-select-sm me-2" style={{width: '70px'}}>
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                  </select>
                  <input type="text" id="caseValue" name="caseValue" value={formData.caseValue} onChange={handleChange} className="form-control form-control-sm" />
                </div>
                <div className="col-md-6 d-flex align-items-center">
                  <label htmlFor="dateValue" className="form-label fw-bold mb-0 me-2" style={{minWidth: '60px'}}>Date</label>
                  <input type="date" id="dateValue" name="dateValue" value={formData.dateValue} onChange={handleChange} className="form-control form-control-sm" />
                </div>
              </div>
            </div>
            
            {/* Patient & User Details */}
            <div className="p-3 border rounded-3 mb-3 shadow-sm bg-white">
               <div className="row g-3">
                    <div className="col-md-6 col-lg-5">
                        <label htmlFor="patientName" className="form-label fw-bold">Patient Name</label>
                        <input type="text" className="form-control form-control-sm" id="patientName" name="patientName" value={formData.patientName} onChange={handleChange}/>
                    </div>
                    <div className="col-md-3 col-lg-2">
                        <label htmlFor="age" className="form-label fw-bold">Age</label>
                        <input type="number" className="form-control form-control-sm" id="age" name="age" value={formData.age} onChange={handleChange}/>
                    </div>
                    <div className="col-md-3 col-lg-2">
                        <label htmlFor="sex" className="form-label fw-bold">Sex</label>
                        <select className="form-select form-select-sm" id="sex" name="sex" value={formData.sex} onChange={handleChange}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
               </div>
               <div className="row g-3 mt-1">
                    <div className="col-md-6 col-lg-5">
                        <label htmlFor="receivedBy" className="form-label fw-bold">Received By</label>
                        <input type="text" className="form-control form-control-sm" id="receivedBy" name="receivedBy" value={formData.receivedBy} onChange={handleChange}/>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <label htmlFor="currentUser" className="form-label fw-bold">Current User</label>
                        <input type="text" className="form-control form-control-sm bg-light" id="currentUser" name="currentUser" value={formData.currentUser} readOnly/>
                    </div>
               </div>
            </div>

            {/* Refund Details */}
            <div className="p-3 border rounded-3 mb-3 shadow-sm bg-white">
                <h6 className="fw-bolder text-decoration-underline mb-3">Refund Details</h6>
                <div className="row g-3 justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="row g-2 align-items-center mb-2">
                            <label htmlFor="billAmount" className="col-sm-4 col-form-label fw-bold text-sm-end">Bill Amount</label>
                            <div className="col-sm-8">
                                <input type="number" id="billAmount" name="billAmount" value={formData.billAmount} onChange={handleChange} className="form-control form-control-sm text-end" placeholder="0.00" step="0.01" />
                            </div>
                        </div>
                        <div className="row g-2 align-items-center mb-2">
                            <label htmlFor="receivedAmount" className="col-sm-4 col-form-label fw-bold text-sm-end">Received Amount</label>
                            <div className="col-sm-8">
                                <input type="number" id="receivedAmount" name="receivedAmount" value={formData.receivedAmount} onChange={handleChange} className="form-control form-control-sm text-end" placeholder="0.00" step="0.01" />
                            </div>
                        </div>
                        <div className="row g-2 align-items-center mb-2">
                            <label htmlFor="refundAmount" className="col-sm-4 col-form-label fw-bold text-danger text-sm-end">Refund</label>
                            <div className="col-sm-8">
                                <input type="number" id="refundAmount" name="refundAmount" value={formData.refundAmount} onChange={handleChange} className="form-control form-control-sm text-end" placeholder="0.00" step="0.01" />
                            </div>
                        </div>
                        <div className="row g-2 align-items-center">
                            <label htmlFor="discountAmount" className="col-sm-4 col-form-label fw-bold text-sm-end">Discount</label>
                            <div className="col-sm-8">
                                <input type="number" id="discountAmount" name="discountAmount" value={formData.discountAmount} onChange={handleChange} className="form-control form-control-sm text-end" placeholder="0.00" step="0.01" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Mode and Narration */}
            <div className="p-3 border rounded-3 mb-3 shadow-sm bg-white">
                <div className="row g-3">
                    <div className="col-md-6 d-flex align-items-center">
                         <label htmlFor="modeOfPayment" className="form-label fw-bold mb-0 me-2">Mode of Payment</label>
                         <select className="form-select form-select-sm" id="modeOfPayment" name="modeOfPayment" value={formData.modeOfPayment} onChange={handleChange} style={{width: '200px'}}>
                            <option value="C">[C]ash</option>
                            <option value="B">[B]ank</option>
                            <option value="D">[D]Credit Card</option>
                         </select>
                    </div>
                     <div className="col-md-6 d-flex align-items-center">
                        <label htmlFor="bankChequeCardNo" className="form-label fw-bold mb-0 me-2">Bank Cheque/ Card No.</label>
                        <input type="text" id="bankChequeCardNo" name="bankChequeCardNo" value={formData.bankChequeCardNo} onChange={handleChange} className="form-control form-control-sm" disabled={formData.modeOfPayment === 'C'}/>
                    </div>
                    <div className="col-12">
                         <label htmlFor="narration" className="form-label fw-bold">Narration</label>
                         <textarea id="narration" name="narration" value={formData.narration} onChange={handleChange} className="form-control form-control-sm" rows="2"></textarea>
                    </div>
                </div>
            </div>

          </div> {/* End card-body */}

          {/* Bottom Button Bar */}
          <div className="card-footer p-2" style={{ backgroundColor: '#FFE4E1', borderTop: '1px solid #D1C4E9' }}>
            <div className="d-flex justify-content-center flex-wrap gap-1">
              {['New', 'Edit', 'Save', 'Delete', 'Undo', 'Print', 'Find', 'Exit'].map(btnText => (
                <button type="button" className="btn btn-secondary btn-sm px-3" key={btnText}>
                  {btnText}
                </button>
              ))}
            </div>
          </div>
        </div> {/* End main card */}
      </div>
    </MasterLayout>
  );
}

export default RefundMoneyReceiptForm;