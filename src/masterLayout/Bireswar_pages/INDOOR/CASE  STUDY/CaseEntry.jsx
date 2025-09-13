import React, { useState } from 'react';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';

const caseRows = [
  { caseNo: 'OP/2425/082', slip: 18, date: '22/02/2025', name: 'LILY DAS', branch: 'DIRECT', doctor: 'MO PAYEL', address: '', regNo: 'S-019402', total: 320, adv: 0 },
  { caseNo: 'OP/2425/081', slip: 17, date: '22/02/2025', name: 'SUDIPA SARKAR', branch: 'PRIYANGSHU', doctor: 'ABHIRA', address: '', regNo: 'S-019398', total: 450, adv: 0 },
  // ... More data rows here
];

const CaseEntry = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [selectedDate, setSelectedDate] = useState('2025-02-22');

  return (
    <MasterLayout>
      <Breadcrumb title="Case Entry" />
      <div className="container-fluid py-4 px-lg-4">
        <div className="card border-0 rounded-4 shadow-xl overflow-hidden">
          {/* Header Tabs */}
          <div className="card-header p-0 border-bottom-0">
            <ul className="nav nav-tabs nav-tabs-modern">
              <li className="nav-item">
                <button className={`nav-link ${activeTab === 'list' ? 'active' : ''}`} onClick={() => setActiveTab('list')}>List</button>
              </li>
              <li className="nav-item">
                <button className="nav-link">Detail</button>
              </li>
              <li className="nav-item">
                <button className="nav-link">Estimate</button>
              </li>
              <li className="nav-item">
                <button className="nav-link">MRD</button>
              </li>
            </ul>
          </div>

          {/* Filters */}
          <div className="card-body p-3 bg-light">
            <div className="row g-2 align-items-center">
              <div className="col-lg-7 d-flex flex-wrap gap-3 align-items-center">
                <span className="fw-bold text-danger">Searching By</span>
                {['Case No', 'Registration No', 'Patient', 'Doctor', 'Month Id'].map((label, i) => (
                  <div className="form-check" key={i}>
                    <input className="form-check-input" type="radio" name="searchBy" id={`by${label.replace(/\s/g, '')}`} defaultChecked={i === 0} />
                    <label className="form-check-label" htmlFor={`by${label.replace(/\s/g, '')}`}>{label}</label>
                  </div>
                ))}
              </div>
              <div className="col-lg-5 d-flex flex-wrap gap-2">
                <input type="date" className="form-control" defaultValue="2025-02-22" />
                <input type="date" className="form-control" defaultValue="2025-02-22" />
                <button className="btn btn-primary">Total</button>
              </div>
            </div>

            {/* Input Filters */}
            <div className="row mt-3 g-2">
              <div className="col-md-3"><input type="text" className="form-control" placeholder="Patient Name" /></div>
              <div className="col-md-3"><input type="text" className="form-control" placeholder="Patient Phone No" /></div>
              <div className="col-md-3"><input type="text" className="form-control" placeholder="Reg No" /></div>
              <div className="col-md-3"><input type="text" className="form-control" placeholder="Case No" /></div>
            </div>
          </div>

          {/* Data and Sidebar */}
          <div className="row g-0">
            {/* Data Table */}
            <div className="col-lg-8 p-3">
              <div className="table-responsive" style={{ maxHeight: '390px' }}>
                <table className="table table-bordered table-hover table-sm align-middle mb-0">
                  <thead className="table-primary sticky-top">
                    <tr>
                      <th>Case No</th><th>Slip</th><th>Case Date</th><th>Patient Name</th>
                      <th>Branch</th><th>Doctor</th><th>Address</th><th>Reg. No</th><th>Total</th><th>Adv</th>
                    </tr>
                  </thead>
                  <tbody>
                    {caseRows.map((row, idx) => (
                      <tr key={idx} className={idx === caseRows.length - 1 ? 'table-warning' : ''}>
                        <td>{row.caseNo}</td>
                        <td>{row.slip}</td>
                        <td>{row.date}</td>
                        <td>{row.name}</td>
                        <td>{row.branch}</td>
                        <td>{row.doctor}</td>
                        <td>{row.address}</td>
                        <td>{row.regNo}</td>
                        <td>{row.total}</td>
                        <td>{row.adv}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4 bg-light p-3 border-start">
              <div className="text-center mb-3">
                <img
                  src="https://barcode.tec-it.com/barcode.ashx?data=OP%2F2425%2F08288&code=Code128&dpi=96"
                  alt="Barcode"
                  className="img-fluid mb-2"
                  style={{ maxHeight: '70px' }}
                />
                <div className="fw-bold">OP/2425/08288</div>
              </div>

              <div className="mb-3">
                <h6 className="text-primary fw-bold">Test Instruction</h6>
                <div className="text-muted small">* → Mandatory Field</div>
                <div className="text-muted small">PHP → Phone Search</div>
                <div className="text-muted small">Name? → Patient Name Search</div>
              </div>

              <div className="row g-2">
                <div className="col-md-6">
                  <label className="form-label">Total No of Test</label>
                  <input type="number" className="form-control" defaultValue="1" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Collector</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Collector Dt.</label>
                  <input type="date" className="form-control" defaultValue="2025-02-22" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Area</label>
                  <input type="text" className="form-control" defaultValue="GOALTOR" />
                </div>
              </div>

              <div className="mt-3">
                <table className="table table-sm table-bordered">
                  <thead className="table-secondary"><tr><th>Service Type</th><th>Service Rate</th></tr></thead>
                  <tbody><tr><td>Blood</td><td>0.00</td></tr></tbody>
                </table>
              </div>

              <div className="d-flex align-items-center justify-content-between mt-3 bg-warning p-2 rounded">
                <div className="d-flex align-items-center gap-2">
                  <label className="form-label mb-0">No of Copy</label>
                  <input type="number" className="form-control" style={{ width: 60 }} defaultValue="1" />
                </div>
                <button className="btn btn-dark">BarCode Print</button>
              </div>
            </div>
          </div>

          {/* Footer Totals and Buttons */}
          <div className="card-footer bg-light border-top p-3">
            <div className="row g-3 align-items-center mb-3">
              <div className="col-auto"><strong>Total Amt:</strong></div>
              <div className="col"><input type="text" className="form-control" disabled value="0.00" /></div>
              <div className="col-auto"><strong>Adv Amt:</strong></div>
              <div className="col"><input type="text" className="form-control" disabled value="0.00" /></div>
              <div className="col-auto"><strong>Discount:</strong></div>
              <div className="col"><input type="text" className="form-control" disabled value="0.00" /></div>
              <div className="col-auto"><strong>C Amt:</strong></div>
              <div className="col"><input type="text" className="form-control" disabled value="0.00" /></div>
              <div className="col-auto"><strong>Total Due:</strong></div>
              <div className="col"><input type="text" className="form-control" disabled value="0.00" /></div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex flex-wrap justify-content-center justify-content-md-between gap-2">
              <div className="d-flex gap-2 flex-wrap">
                {['New', 'Edit', 'Save', 'Delete', 'Undo', 'Bill', 'Com Bill', 'Dep Print', 'Exit'].map(btn => (
                  <button key={btn} className={`btn btn-outline-${btn === 'Save' ? 'success' : btn === 'Delete' ? 'danger' : 'primary'} rounded-pill px-3`}>
                    {btn}
                  </button>
                ))}
              </div>
              <div className="d-flex gap-2 flex-wrap">
                {['Work Sheet', 'D-Work Sheet', 'F-Form', 'Prev', 'Next'].map(btn => (
                  <button key={btn} className="btn btn-outline-dark rounded-pill px-3">{btn}</button>
                ))}
                <div className="btn-group">
                  <button className="btn btn-outline-secondary">IP</button>
                  <button className="btn btn-outline-secondary">OP</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default CaseEntry;













// import React from 'react';
// import MasterLayout from '../../../MasterLayout';
// import Breadcrumb from '../../../Breadcrumb';

// const CaseEntry = () => {
//   return (
//     <MasterLayout>
//       <Breadcrumb title="Case Entry" />
//       <div className="container-fluid py-4">
//         <div className="card shadow border-0 rounded-4 bg-white">
//           {/* Tabs */}
//           <div className="card-header border-bottom-0">
//             <ul className="nav nav-pills gap-3">
//               <li className="nav-item"><button className="nav-link active">List</button></li>
//               <li className="nav-item"><button className="nav-link">Detail</button></li>
//               <li className="nav-item"><button className="nav-link">Estimate</button></li>
//               <li className="nav-item"><button className="nav-link">MRD</button></li>
//             </ul>
//           </div>

//           {/* Filters */}
//           <div className="card-body border-bottom bg-light-subtle">
//             <div className="row g-3 align-items-center">
//               <div className="col-md-6 d-flex gap-3 flex-wrap">
//                 <strong>Search By:</strong>
//                 {["Case No", "Reg. No", "Patient", "Doctor", "Month"].map((label, i) => (
//                   <div className="form-check" key={i}>
//                     <input className="form-check-input" type="radio" name="searchBy" id={`filter${i}`} defaultChecked={i === 0} />
//                     <label className="form-check-label" htmlFor={`filter${i}`}>{label}</label>
//                   </div>
//                 ))}
//               </div>
//               <div className="col-md-6 d-flex gap-2">
//                 <input type="date" className="form-control" defaultValue="2025-02-22" />
//                 <input type="date" className="form-control" defaultValue="2025-02-22" />
//                 <button className="btn btn-outline-primary">Total</button>
//               </div>
//             </div>

//             <div className="row mt-3 g-2">
//               {["Patient Name", "Phone No", "Reg No", "Case No"].map((ph, i) => (
//                 <div className="col-md-3" key={i}>
//                   <input type="text" className="form-control" placeholder={ph} />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Content */}
//           <div className="row g-0">
//             {/* Table */}
//             <div className="col-lg-8 p-3">
//               <div className="table-responsive rounded border">
//                 <table className="table table-hover table-bordered align-middle table-sm mb-0">
//                   <thead className="table-secondary sticky-top">
//                     <tr>
//                       <th>Case No</th><th>Slip</th><th>Date</th><th>Patient</th>
//                       <th>Branch</th><th>Doctor</th><th>Reg No</th><th>Total</th><th>Adv</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr className="table-light">
//                       <td>OP/2425/082</td><td>18</td><td>22/02/2025</td><td>LILY DAS</td>
//                       <td>DIRECT</td><td>MO PAYEL</td><td>S-019402</td><td>₹320</td><td>0</td>
//                     </tr>
//                     {/* Add more rows as needed */}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Sidebar */}
//             <div className="col-lg-4 p-3 bg-white border-start">
//               <div className="text-center mb-3">
//                 <img src="https://barcode.tec-it.com/barcode.ashx?data=OP%2F2425%2F08288&code=Code128&dpi=96" alt="barcode" className="img-fluid" />
//                 <div className="fw-bold mt-1">OP/2425/08288</div>
//               </div>

//               <div className="bg-light p-3 rounded mb-3">
//                 <h6 className="fw-semibold text-primary mb-2">Instructions</h6>
//                 <ul className="list-unstyled small mb-0">
//                   <li>* Mandatory fields</li>
//                   <li>PH? → Phone search</li>
//                   <li>Name? → Patient name search</li>
//                 </ul>
//               </div>

//               <div className="row g-2">
//                 <div className="col-6"><label className="form-label">Total Tests</label><input className="form-control" type="number" defaultValue="1" /></div>
//                 <div className="col-6"><label className="form-label">Collector</label><input className="form-control" /></div>
//                 <div className="col-6"><label className="form-label">Date</label><input className="form-control" type="date" defaultValue="2025-02-22" /></div>
//                 <div className="col-6"><label className="form-label">Area</label><input className="form-control" defaultValue="GOALTOR" /></div>
//               </div>

//               <div className="table-responsive mt-3">
//                 <table className="table table-sm table-bordered mb-0">
//                   <thead><tr><th>Service</th><th>Rate</th></tr></thead>
//                   <tbody><tr><td>Blood Test</td><td>₹0.00</td></tr></tbody>
//                 </table>
//               </div>

//               <div className="d-flex align-items-center gap-2 mt-3 bg-warning-subtle p-2 rounded">
//                 <input type="number" className="form-control" placeholder="No. of Copy" style={{ width: 80 }} defaultValue={1} />
//                 <button className="btn btn-dark flex-grow-1">Print Barcode</button>
//               </div>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="card-footer bg-light p-3">
//             <div className="row g-3 align-items-center mb-2">
//               {['Total Amt', 'Adv Amt', 'Discount', 'C Amt', 'Total Due'].map((label, i) => (
//                 <div className="col-md" key={i}>
//                   <label className="form-label fw-bold">{label}</label>
//                   <input className="form-control" disabled value="0.00" />
//                 </div>
//               ))}
//             </div>

//             <div className="d-flex flex-wrap justify-content-between gap-2 mt-3">
//               <div className="d-flex gap-2 flex-wrap">
//                 {['New', 'Edit', 'Save', 'Delete', 'Undo', 'Bill', 'Com Bill', 'Dep Print', 'Exit'].map(btn => (
//                   <button key={btn} className="btn btn-outline-primary rounded-pill">{btn}</button>
//                 ))}
//               </div>
//               <div className="d-flex gap-2 flex-wrap">
//                 {['Work Sheet', 'D-Work Sheet', 'F-Form', 'Prev', 'Next'].map(btn => (
//                   <button key={btn} className="btn btn-outline-secondary rounded-pill">{btn}</button>
//                 ))}
//                 <div className="btn-group">
//                   <button className="btn btn-outline-dark">IP</button>
//                   <button className="btn btn-outline-dark">OP</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </MasterLayout>
//   );
// };

// export default CaseEntry;
