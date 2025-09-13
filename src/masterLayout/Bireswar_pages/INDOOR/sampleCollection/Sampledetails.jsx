import React from 'react';
import MasterLayout from '../../../MasterLayout'; // Your existing component
import Breadcrumb from '../../../Breadcrumb';   // Your existing component

// Initial state for the form, capturing all fields from the image
const initialSampleData = {
    searchByCaseDate: '2025-02-22',
    collectionId: '',
    labReceivingDate: '2025-02-22',
    labReceivingTime: '11:51:09',
    regstNo: 'P/2425/08271',
    caseDate: '2025-02-22',
    patientName: 'RESHMA KHATUN',
    sex: 'F',
    age: '31',
    isYearAge: true, // Assuming the 'Y' means years
    department: 'PATHOLOGY',
    prePrintedBarCodeId: '',
    usePrePrintedBarcode: false,
    tests: [
        // This would be populated dynamically
        { test: '', collecDt: '', time: '', labRptDt: '', labRptTm: '', barCodeNo: '', profileName: '', sampleType: '', smplStNo: '' }
    ]
};

function SampleDetails() {
    const [formData, setFormData] = React.useState(initialSampleData);
    const [activeTab, setActiveTab] = React.useState('detail'); // 'list' or 'detail'

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

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
                        {/* --- Filter Bar --- */}
                        <div className="p-3 mb-4 rounded-3 bg-light border">
                            <div className="row g-3 align-items-end">
                                <div className="col-md-4">
                                    <label htmlFor="searchByCaseDate" className="form-label fw-medium">Search By Case Date</label>
                                    <input type="date" className="form-control" id="searchByCaseDate" name="searchByCaseDate" value={formData.searchByCaseDate} onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        {/* --- Main Details and Barcode Area --- */}
                        <div className="row g-4 mb-4">
                            <div className="col-lg-8">
                                <div className="p-4 border rounded-4 shadow-sm bg-white h-100">
                                    <h5 className="fw-bold text-primary-emphasis mb-3"><i className="bi bi-person-vcard-fill me-2"></i>Patient & Collection Details</h5>
                                    <div className="row g-3">
                                        <div className="col-md-4">
                                            <label htmlFor="collectionId" className="form-label">Collection ID</label>
                                            <input type="text" className="form-control" id="collectionId" name="collectionId" value={formData.collectionId} onChange={handleChange} />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="labReceivingDate" className="form-label">Lab Receiving Date</label>
                                            <input type="date" className="form-control" id="labReceivingDate" name="labReceivingDate" value={formData.labReceivingDate} onChange={handleChange} />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="labReceivingTime" className="form-label">Lab Receiving Time</label>
                                            <input type="time" className="form-control" id="labReceivingTime" name="labReceivingTime" value={formData.labReceivingTime} onChange={handleChange} step="1" />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="regstNo" className="form-label">Regst No</label>
                                            <input type="text" className="form-control" id="regstNo" name="regstNo" value={formData.regstNo} onChange={handleChange} />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="caseDate" className="form-label">Case Date</label>
                                            <input type="date" className="form-control" id="caseDate" name="caseDate" value={formData.caseDate} onChange={handleChange} />
                                        </div>
                                        <div className="col-md-7">
                                            <label htmlFor="patientName" className="form-label">Patient Name</label>
                                            <input type="text" className="form-control" id="patientName" name="patientName" value={formData.patientName} onChange={handleChange} />
                                        </div>
                                        <div className="col-md-2">
                                            <label htmlFor="sex" className="form-label">Sex</label>
                                            <select className="form-select" id="sex" name="sex" value={formData.sex} onChange={handleChange}><option>--</option><option value="M">M</option><option value="F">F</option></select>
                                        </div>
                                        <div className="col-md-3">
                                            <label htmlFor="age" className="form-label">Age</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" id="age" name="age" value={formData.age} onChange={handleChange} />
                                                <select className="form-select" style={{maxWidth: '60px'}} id="isYearAge" name="isYearAge" value={formData.isYearAge} onChange={handleChange}><option value={true}>Y</option><option value={false}>M</option></select>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="department" className="form-label">Department</label>
                                            <input type="text" className="form-control" id="department" name="department" value={formData.department} onChange={handleChange} />
                                        </div>
                                        <div className="col-12">
                                            <div className="input-group">
                                                <div className="input-group-text">
                                                    <input className="form-check-input mt-0" type="checkbox" id="usePrePrintedBarcode" name="usePrePrintedBarcode" checked={formData.usePrePrintedBarcode} onChange={handleChange} />
                                                </div>
                                                <label htmlFor="usePrePrintedBarcode" className="input-group-text">Pre Printed BarCode ID</label>
                                                <input type="text" className="form-control" id="prePrintedBarCodeId" name="prePrintedBarCodeId" value={formData.prePrintedBarCodeId} onChange={handleChange} disabled={!formData.usePrePrintedBarcode} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="p-4 border rounded-4 shadow-sm bg-light h-100 d-flex flex-column align-items-center justify-content-center">
                                    <h6 className="text-secondary fw-bold mb-3">BARCODE</h6>
                                    <div className="bg-white p-3 rounded-3">
                                        <img src={`https://barcode.tec-it.com/barcode.ashx?data=IP%2F2425%2F08271&code=Code128&dpi=96`} alt="Barcode" style={{maxWidth:'100%', height: 'auto'}}/>
                                        <p className="text-center fw-bold mb-0 mt-2">IP/2425/08271</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- Test Details Table --- */}
                        <div className="p-4 border rounded-4 shadow-sm bg-white">
                             <h5 className="fw-bold text-primary-emphasis mb-3"><i className="bi bi-journal-check me-2"></i>Test Details</h5>
                             <div className="table-responsive">
                                <table className="table table-bordered table-sm align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Test</th>
                                            <th>Collec Dt.</th>
                                            <th>Time</th>
                                            <th>LabRptDt.</th>
                                            <th>LabRptTm.</th>
                                            <th>BarCode No.</th>
                                            <th>Profile Name</th>
                                            <th>Sample Type</th>
                                            <th>SmplStNo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* In a real app, these rows would be added dynamically */}
                                        <tr><td colSpan="9" className="text-center text-muted p-5">No tests added for this collection.</td></tr>
                                    </tbody>
                                </table>
                             </div>
                        </div>
                    </div> {/* End card-body */}

                    {/* --- Action Buttons Footer --- */}
                    <div className="card-footer p-3 bg-light border-top">
                        <div className="d-flex flex-wrap justify-content-center justify-content-md-end gap-2">
                            <button type="button" className="btn btn-outline-secondary rounded-pill px-3"><i className="bi bi-file-earmark-plus me-1"></i>New</button>
                            <button type="button" className="btn btn-outline-primary rounded-pill px-3"><i className="bi bi-pencil-square me-1"></i>Edit</button>
                            <button type="button" className="btn btn-dark rounded-pill px-3"><i className="bi bi-floppy-fill me-1"></i>Save</button>
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

export default SampleDetails;


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
  
  .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.1);
  }
  .table-responsive {
    border-radius: 0.5rem;
    overflow: hidden;
  }
  thead {
    font-size: 0.85rem;
    text-transform: uppercase;
  }
*/