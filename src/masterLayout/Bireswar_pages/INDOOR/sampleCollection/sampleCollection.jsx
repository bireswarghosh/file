import React from 'react';
import MasterLayout from '../../../MasterLayout'; // Your existing component
import Breadcrumb from '../../../Breadcrumb';   // Your existing component

// --- Sample Data (In a real app, this would come from an API) ---
const mainSampleData = [
    // Data for the main table would be populated here dynamically
    { labNo: 'L-001', date: '2025-02-22', caseNo: 'OP/2425/08287', caseDate: '2025-02-22', patient: 'SUDIPA', department: 'Pathology' },
    { labNo: 'L-002', date: '2025-02-22', caseNo: 'IP/2425/08286', caseDate: '2025-02-22', patient: 'UJJWALA SAR', department: 'Cardiology' },
    // ... more rows
];

const patientList1 = [
    { caseNo: 'OP/2425/08287', name: 'SUDIPA' },
    { caseNo: 'IP/2425/08286', name: 'UJJWALA SAR' },
    { caseNo: 'OP/2425/08284', name: 'NIBHA DAS' },
    { caseNo: 'IP/2425/08283', name: 'NIRMAL' },
    { caseNo: 'OP/2425/08281', name: 'RADHA RANI' },
];

const patientList2 = [
    { caseNo: 'IP/2425/08285', name: 'NITA' },
    { caseNo: 'IP/2425/08282', name: 'SUBHADIP' },
    { caseNo: 'IP/2425/08280', name: 'NITA' },
    { caseNo: 'IP/2425/08271', name: 'RESHMA' },
];

function SampleCollection() {
  const [activeTab, setActiveTab] = React.useState('list'); // 'list' or 'detail'

  return (
    <MasterLayout>
      <Breadcrumb title="Sample Collection" />
      <div className="container-fluid py-4 px-lg-4">
        <div className="card shadow-xl border-0 rounded-4 overflow-hidden">

          <div className="card-header p-0 border-bottom-0">
            {/* --- Modern Tab Navigation --- */}

            <ul className="nav nav-tabs nav-tabs-modern" role="tablist">
              <li className="nav-item" role="presentation">
                <button className={`nav-link ${activeTab === 'list' ? 'active' : ''}`} onClick={() => setActiveTab('list')} type="button">
                  <i className="bi bi-list-ul me-2"></i>List
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button className={`nav-link ${activeTab === 'detail' ? 'active' : ''}`} onClick={() => setActiveTab('detail')} type="button">
                  <i className="bi bi-file-earmark-text-fill me-2"></i>Detail
                </button>
              </li>
            </ul>
            
          </div>
          
          <div className="card-body p-3 p-md-4">
            {/* --- Filter Section --- */}
            <div className="p-3 mb-4 rounded-3 bg-light border">
              <div className="row g-3 align-items-center">
                <div className="col-lg-5">
                  <div className="d-flex flex-wrap align-items-center gap-3">
                    <span className="fw-bold text-secondary">Find By:</span>
                    <div className="form-check form-check-inline"><input className="form-check-input" type="radio" name="findOption" id="findByLabNo" defaultChecked /><label className="form-check-label" htmlFor="findByLabNo">Lab No.</label></div>
                    <div className="form-check form-check-inline"><input className="form-check-input" type="radio" name="findOption" id="findByCaseNo" /><label className="form-check-label" htmlFor="findByCaseNo">Case No.</label></div>
                    <div className="form-check form-check-inline"><input className="form-check-input" type="radio" name="findOption" id="findByBarcode" /><label className="form-check-label" htmlFor="findByBarcode">Barcode No.</label></div>
                  </div>
                </div>
                <div className="col-lg-4">
                   <div className="input-group">
                      <input type="text" className="form-control" placeholder="Enter Lab No..."/>
                      <button className="btn btn-primary"><i className="bi bi-search"></i> Find</button>
                   </div>
                </div>
              </div>
              <hr className="my-3" />
              <div className="row g-3 align-items-center">
                <div className="col-lg-5">
                  <div className="d-flex flex-wrap align-items-center gap-3">
                    <span className="fw-bold text-secondary">Status:</span>
                    <div className="form-check form-check-inline"><input className="form-check-input" type="radio" name="statusOption" id="statusAll" defaultChecked /><label className="form-check-label" htmlFor="statusAll">All</label></div>
                    <div className="form-check form-check-inline"><input className="form-check-input" type="radio" name="statusOption" id="statusPending" /><label className="form-check-label" htmlFor="statusPending">Pending</label></div>
                    <div className="form-check form-check-inline"><input className="form-check-input" type="radio" name="statusOption" id="statusComplete" /><label className="form-check-label" htmlFor="statusComplete">Complete</label></div>
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

            {/* --- Tables Section --- */}
            <div className="row g-4">
              {/* Main Table */}
              <div className="col-lg-8">
                <h5 className="fw-bold text-primary-emphasis mb-2">Sample Details List</h5>
                <div className="table-responsive shadow-sm" style={{maxHeight: '450px', border: '1px solid #dee2e6'}}>
                    <table className="table table-hover table-bordered table-striped align-middle mb-0">
                        <thead className="table-dark sticky-top">
                            <tr><th>Lab No</th><th>Date</th><th>Case No</th><th>Case Date</th><th>Patient</th><th>Department</th></tr>
                        </thead>
                        <tbody>
                            {mainSampleData.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.labNo}</td><td>{row.date}</td><td>{row.caseNo}</td><td>{row.caseDate}</td><td>{row.patient}</td><td>{row.department}</td>
                                </tr>
                            ))}
                            {/* If no data, show a placeholder */}
                            {mainSampleData.length === 1 && mainSampleData[0].labNo === '' && (
                                <tr><td colSpan="6" className="text-center text-muted p-5">No sample data found for the selected criteria.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
              </div>

              {/* Side Patient Lists */}
              <div className="col-lg-4">
                <div className="row g-4">
                    <div className="col-12 col-md-6 col-lg-12">
                        <h6 className="fw-bold text-primary-emphasis mb-2">Patient List on Date Range</h6>
                         <div className="table-responsive shadow-sm" style={{maxHeight: '210px', border: '1px solid #dee2e6'}}>
                            <table className="table table-sm table-striped">
                                <thead><tr><th>CaseNo</th><th>Name</th></tr></thead>
                                <tbody>{patientList1.map(p => (<tr key={p.caseNo}><td>{p.caseNo}</td><td>{p.name}</td></tr>))}</tbody>
                            </table>
                         </div>
                    </div>
                     <div className="col-12 col-md-6 col-lg-12">
                         <h6 className="fw-bold text-primary-emphasis mb-2">Patient List on Date Range</h6>
                         <div className="table-responsive shadow-sm" style={{maxHeight: '210px', border: '1px solid #dee2e6'}}>
                            <table className="table table-sm table-striped">
                                <thead><tr><th>CaseNo</th><th>Name</th></tr></thead>
                                <tbody>{patientList2.map(p => (<tr key={p.caseNo}><td>{p.caseNo}</td><td>{p.name}</td></tr>))}</tbody>
                            </table>
                         </div>
                    </div>
                </div>
              </div>
            </div>
          </div> {/* End card-body */}

          {/* --- Action Buttons Footer --- */}
          <div className="card-footer p-3 bg-light border-top">
            <div className="d-flex flex-wrap justify-content-center justify-content-md-end gap-2">
                <button type="button" className="btn btn-outline-secondary rounded-pill px-3"><i className="bi bi-file-earmark-plus me-1"></i>New</button>
                <button type="button" className="btn btn-outline-primary rounded-pill px-3"><i className="bi bi-pencil-square me-1"></i>Edit</button>
                <button type="button" className="btn btn-outline-dark rounded-pill px-3"><i className="bi bi-floppy-fill me-1"></i>Save</button>
                <button type="button" className="btn btn-outline-danger rounded-pill px-3"><i className="bi bi-trash2-fill me-1"></i>Delete</button>
                <button type="button" className="btn btn-outline-warning text-dark rounded-pill px-3"><i className="bi bi-arrow-counterclockwise me-1"></i>Undo</button>
                <button type="button" className="btn btn-outline-success rounded-pill px-3"><i className="bi bi-printer-fill me-1"></i>Print</button>
                <button type="button" className="btn btn-secondary rounded-pill px-3">PP-Print</button>
                <button type="button" className="btn btn-secondary rounded-pill px-3">F-Print</button>
                <button type="button" className="btn btn-info text-white rounded-pill px-3"><i className="bi bi-upc-scan me-1"></i>Dil Barcode Print</button>
                <button type="button" className="btn btn-dark rounded-pill px-3"><i className="bi bi-x-lg me-1"></i>Exit</button>
            </div>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
}

export default SampleCollection;

/*
  Add this to your main CSS file for the full "eye-catching" effect:

  body {
    background-color: #f0f2f5; 
  }
  .card.shadow-xl {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.20), 0 10px 15px -5px rgba(0, 0, 0, 0.1) !important;
  }
  .rounded-4 { border-radius: 1rem !important; }

  .nav-tabs-modern {
    border-bottom: 2px solid #dee2e6;
  }
  .nav-tabs-modern .nav-item {
    margin-bottom: -2px; 
  }
  .nav-tabs-modern .nav-link {
    border: 2px solid transparent;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    font-weight: 600;
    font-size: 1.1rem;
    color: #6c757d; 
    transition: all 0.2s ease-in-out;
    padding: 0.75rem 1.5rem;
  }
  .nav-tabs-modern .nav-link:hover {
    border-color: #e9ecef #e9ecef #dee2e6;
  }
  .nav-tabs-modern .nav-link.active {
    color: #0d6efd; 
    background-color: #fff;
    border-color: #dee2e6 #dee2e6 #fff;
  }
  
  .btn {
    transition: all 0.2s ease-in-out;
  }
  .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.1);
  }
  .table-responsive {
    border-radius: 0.5rem;
    overflow: hidden;
  }
  .table-dark {
    --bs-table-bg: hsl(210, 30%, 25%); // A nicer dark blue for headers
    --bs-table-border-color: hsl(210, 30%, 35%);
  }
*/