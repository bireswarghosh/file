import React from 'react';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';

// --- Sample Data (In a real app, this would come from an API) ---
const labTestData = [
    { testName: 'Complete Blood Count', reportDate: '2025-02-22', delivered: true, printed: true, prePrintBarCode: 'P01', user: 'Admin' },
    { testName: 'Lipid Profile', reportDate: '2025-02-22', delivered: true, printed: false, prePrintBarCode: 'P02', user: 'Admin' },
    { testName: 'Liver Function Test', reportDate: '2025-02-22', delivered: false, printed: false, prePrintBarCode: 'P03', user: 'Admin' },
];

const opdDoctorData = [
    { name: 'Dr. Evelyn Reed', qualification: 'MBBS, MD', speciality: 'Cardiology', remarks: 'By appointment only' },
    { name: 'Dr. Samuel Knight', qualification: 'MBBS, FRCS', speciality: 'Neurology', remarks: 'Available Mon, Wed, Fri' },
];

// Main Component
function UnifiedMedicalWorkspace() {
    const [activeTab, setActiveTab] = React.useState('lab'); // 'lab', 'opd', or 'doctor'

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'lab':
                return <LaboratoryQueryView />;
            case 'opd':
                return <OPDQueryView />;
            case 'doctor':
                return <DoctorProfileView />;
            default:
                return <LaboratoryQueryView />;
        }
    };

    return (
        <MasterLayout>
            <Breadcrumb title="Unified Medical Workspace" />
            <div className="container-fluid py-4 px-lg-4">
                <div className="card shadow-xl border-0 rounded-4 overflow-hidden">
                    <div className="card-header p-0 border-bottom-0">
                        {/* --- Modern Tab Navigation --- */}
                        <ul className="nav nav-tabs nav-tabs-modern" id="mainWorkspaceTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className={`nav-link ${activeTab === 'lab' ? 'active' : ''}`} onClick={() => setActiveTab('lab')} type="button">
                                    <i className="bi bi-droplet-half me-2"></i>Laboratory Query
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className={`nav-link ${activeTab === 'opd' ? 'active' : ''}`} onClick={() => setActiveTab('opd')} type="button">
                                    <i className="bi bi-hospital me-2"></i>OPD Query
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className={`nav-link ${activeTab === 'doctor' ? 'active' : ''}`} onClick={() => setActiveTab('doctor')} type="button">
                                    <i className="bi bi-person-badge-fill me-2"></i>Doctor Profile
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="card-body p-3 p-md-4">
                        {renderActiveTab()}
                    </div>
                    {/* --- Action Buttons Footer --- */}
                    <div className="card-footer p-3 bg-light border-top">
                        <div className="d-flex flex-wrap justify-content-center justify-content-md-end gap-2">
                            <button type="button" className="btn btn-outline-secondary rounded-pill px-4"><i className="bi bi-file-earmark-plus me-1"></i>New</button>
                            <button type="button" className="btn btn-outline-info rounded-pill px-4"><i className="bi bi-pencil-fill me-1"></i>Edit</button>
                            <button type="button" className="btn btn-outline-warning text-dark rounded-pill px-4"><i className="bi bi-arrow-counterclockwise me-1"></i>Undo</button>
                            <button type="button" className="btn btn-outline-success rounded-pill px-4"><i className="bi bi-printer-fill me-1"></i>Print</button>
                            <button type="button" className="btn btn-outline-danger rounded-pill px-4"><i className="bi bi-trash-fill me-1"></i>Delete</button>
                            <button type="button" className="btn btn-dark rounded-pill px-4"><i className="bi bi-x-circle-fill me-1"></i>Exit</button>
                            <button type="submit" className="btn btn-primary btn-lg rounded-pill px-5 fw-bolder shadow-lg ms-md-3">
                                <i className="bi bi-check-circle-fill me-2"></i>Save Record
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>
    );
}


// --- Laboratory Query Component ---
const LaboratoryQueryView = () => (
    <div>
        {/* Filter Section */}
        <div className="p-3 mb-4 rounded-3 bg-light border">
            <div className="row g-3 align-items-center">
                <div className="col-md-3">
                    <label className="form-label fw-medium small">Filter Type</label>
                    <select className="form-select"><option>[All]</option></select>
                </div>
                <div className="col-md-3">
                     <label className="form-label fw-medium small">Receipt Detail</label>
                    <select className="form-select"></select>
                </div>
                <div className="col-md-3">
                     <label className="form-label fw-medium small">Signatory</label>
                    <select className="form-select"><option>NONE</option></select>
                </div>
                <div className="col-md-3">
                    <div className="p-2 rounded-2 text-center" style={{background: 'linear-gradient(90deg, #28a745, #ffff00, #dc3545)', color: '#fff', textShadow: '1px 1px 2px #000'}}>
                        Reporting: Done | Partly Done | Pending
                    </div>
                </div>
            </div>
            <div className="row g-3 mt-1 align-items-center">
                 <div className="col-12">
                     <div className="d-flex flex-wrap gap-3 align-items-center">
                         <div className="form-check form-check-inline"><input type="radio" className="form-check-input" name="labQueryType" defaultChecked /><label>All</label></div>
                         <div className="form-check form-check-inline"><input type="radio" className="form-check-input" name="labQueryType" /><label>Pending Reporting</label></div>
                         <div className="form-check form-check-inline"><input type="radio" className="form-check-input" name="labQueryType" /><label>Pending Delivery</label></div>
                         <div className="form-check form-check-inline"><input type="radio" className="form-check-input" name="labQueryType" /><label>Pending Receipt</label></div>
                         <div className="form-check form-check-inline"><input type="radio" className="form-check-input" name="labQueryType" /><label>Abnormal Report</label></div>
                         <div className="form-check form-check-inline"><input type="checkbox" className="form-check-input" /><label>Previous case</label></div>
                         <div className="form-check form-check-inline"><input type="checkbox" className="form-check-input" /><label>Direct case</label></div>
                     </div>
                 </div>
            </div>
             <div className="row g-3 mt-1 align-items-end">
                <div className="col-md-2"><label className="form-label small">Date From</label><input type="date" className="form-control" defaultValue="2025-02-22" /></div>
                <div className="col-md-2"><label className="form-label small">Date To</label><input type="date" className="form-control" defaultValue="2025-02-22" /></div>
                <div className="col-md-auto"><h5 className="text-danger mb-1">Total Cases</h5></div>
                <div className="col-md-2"><label className="form-label small">Pre Prnt BarCode</label><input type="text" className="form-control" /></div>
                <div className="col-md-2"><label className="form-label small">Search By BarCode</label><input type="text" className="form-control" /></div>
                <div className="col-md-auto"><button className="btn btn-secondary w-100">All E Mail</button></div>
                <div className="col-md-auto"><button className="btn btn-secondary w-100">Pathologist Login</button></div>
                <div className="col-md-auto"><button className="btn btn-danger w-100">Pull Machine Data For LIS</button></div>
            </div>
        </div>

        {/* Main Table */}
        <div className="table-responsive">
            <table className="table table-hover align-middle">
                <thead>
                    <tr>
                        <th>Test Name</th>
                        <th>Report Date</th>
                        <th>Delivered</th>
                        <th>Printed</th>
                        <th>Pre-Print BarCode</th>
                        <th>User</th>
                    </tr>
                </thead>
                <tbody>
                    {labTestData.map((test, index) => (
                        <tr key={index}>
                            <td>{test.testName}</td>
                            <td>{test.reportDate}</td>
                            <td>{test.delivered ? 'Yes' : 'No'}</td>
                            <td>{test.printed ? 'Yes' : 'No'}</td>
                            <td>{test.prePrintBarCode}</td>
                            <td>{test.user}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

// --- OPD Query Component ---
const OPDQueryView = () => (
    <div>
        <div className="p-3 mb-4 rounded-3 bg-light border">
            <div className="row g-3 align-items-center">
                <div className="col-md-3">
                    <label className="form-label fw-medium small">Doctor</label>
                    <select className="form-select"><option>All Doctors</option></select>
                </div>
                <div className="col-md-3">
                    <label className="form-label fw-medium small">Date Range</label>
                    <div className="d-flex gap-2">
                        <input type="date" className="form-control" defaultValue="2025-02-22" />
                        <input type="date" className="form-control" defaultValue="2025-02-22" />
                    </div>
                </div>
                <div className="col-md-auto align-self-end">
                    <button className="btn btn-primary">Search</button>
                </div>
            </div>
        </div>
        
        <div className="table-responsive">
            <table className="table table-hover align-middle">
                <thead>
                    <tr>
                        <th>Doctor Name</th>
                        <th>Qualification</th>
                        <th>Speciality</th>
                        <th>Remarks</th>
                    </tr>
                </thead>
                <tbody>
                    {opdDoctorData.map((doctor, index) => (
                        <tr key={index}>
                            <td>{doctor.name}</td>
                            <td>{doctor.qualification}</td>
                            <td>{doctor.speciality}</td>
                            <td>{doctor.remarks}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

// --- Doctor Profile Component ---
const DoctorProfileView = () => (
    <div>
        <div className="p-3 mb-4 rounded-3 bg-light border">
            <div className="row g-3">
                <div className="col-md-6">
                    <label className="form-label fw-medium">Doctor Name</label>
                    <select className="form-select form-select-lg">
                        <option>Select Doctor</option>
                        {opdDoctorData.map((doctor, index) => (
                            <option key={index}>{doctor.name}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-6">
                    <label className="form-label fw-medium">Speciality</label>
                    <input type="text" className="form-control form-control-lg" placeholder="Speciality" />
                </div>
                <div className="col-md-6">
                    <label className="form-label fw-medium">Qualification</label>
                    <input type="text" className="form-control" placeholder="Qualification" />
                </div>
                <div className="col-md-6">
                    <label className="form-label fw-medium">Contact Number</label>
                    <input type="tel" className="form-control" placeholder="Contact Number" />
                </div>
                <div className="col-12">
                    <label className="form-label fw-medium">Remarks</label>
                    <textarea className="form-control" rows="3" placeholder="Additional remarks"></textarea>
                </div>
            </div>
        </div>
    </div>
);

export default UnifiedMedicalWorkspace;