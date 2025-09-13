import React from 'react';
import MasterLayout from '../../../MasterLayout'; // Assuming these are your components
import Breadcrumb from '../../../Breadcrumb';   // Assuming these are your components

// CSS for the component
const styles = `
/* --- Modern Tab Styling --- */
.nav-tabs-modern {
    border-bottom: 2px solid #dee2e6;
}
.nav-tabs-modern .nav-item {
    margin-bottom: -2px; /* Pulls the link down to overlap the main border */
}
.nav-tabs-modern .nav-link {
    border: 2px solid transparent;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    font-weight: 600;
    color: #6c757d; /* Muted color for inactive tabs */
    transition: all 0.2s ease-in-out;
}
.nav-tabs-modern .nav-link:hover {
    border-color: #e9ecef #e9ecef #dee2e6;
    isolation: isolate;
}
.nav-tabs-modern .nav-link.active {
    color: #0d6efd; /* Your primary color */
    background-color: #fff;
    border-color: #dee2e6 #dee2e6 #fff; /* Bottom border is white to blend with body */
}

/* --- Accordion Styling --- */
.accordion-button {
    background-color: #f8f9fa; /* Light background for headers */
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
}
.accordion-button:not(.collapsed) {
    color: #000;
    background-color: #f8f9fa;
    box-shadow: none;
}
.accordion-button:focus {
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
.accordion-item {
    border: 1px solid #dee2e6;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    overflow: hidden; /* Ensures children respect rounded corners */
}
.accordion-item:first-of-type, .accordion-item:last-of-type {
    border-radius: 0.5rem;
}

/* --- Creative Picture Uploader --- */
.profile-picture-uploader {
    height: 250px;
    width: 100%;
    border: 3px dashed #ced4da;
    transition: all 0.3s ease;
    cursor: pointer;
    background-color: #f8f9fa;
    background-size: cover;
    background-position: center;
}
.profile-picture-uploader:hover {
    border-color: #0d6efd;
    background-color: #e9ecef;
}

/* --- General Enhancements --- */
body {
    background-color: #eef2f7; /* Soft, cool page background */
}
.card.shadow-xl {
    box-shadow: 0 20px 45px -10px rgba(0, 0, 0, 0.15), 0 10px 20px -8px rgba(0, 0, 0, 0.1) !important;
}

.form-check-lg {
    font-size: 1.1rem;
}
.form-check-lg .form-check-input {
    height: 1.5em;
    width: 2.75em;
}
`;

// --- Sample Data (In a real app, this would come from an API) ---

const sampleDoctorList = [
    { id: 'D-001', name: 'Dr. Evelyn Reed', qualification: 'MBBS, MD', speciality: 'Cardiology', status: 'Active' },
    { id: 'D-002', name: 'Dr. Samuel Knight', qualification: 'MBBS, FRCS', speciality: 'Neurology', status: 'Active' },
    { id: 'D-003', name: 'Dr. Olivia Chen', qualification: 'BDS, MDS', speciality: 'Dentistry', status: 'On Leave' },
];

const initialDoctorData = {
    // From eDoctor & Refund Receipt
    title: 'Dr.',
    name: '',
    createDate: '2025-06-06',
    identification: '',
    address1: '',
    address2: '',
    address3: '',
    qualification: '',
    isRMO: false,
    isIndoor: false,
    faxNo: '',
    phoneNo: '',
    registrationNo: '',
    area: '',
    // From eDoctor Rates
    indoorVisitRate: '0.00',
    icuRate: '0.00',
    cabRate: '0.00',
    suitRate: '0.00',
    // From eDoctor Marketing
    marketingExec: '',
    doctorCategory: '',
    inPanelList: true,
    panelPercentage: '0.00',
    panelNotRequired: false,
    calculateCommission: false,
    fixedDiscount: '0.00',
    profilePicture: null,
    // From OPD Query (Visiting Hours)
    visitingHours: { SUN: false, MON: true, TUE: true, WED: false, THU: true, FRI: true, SAT: false, daysValue: '1', hoursValue: '450' },
    // From OPD Query (Rate Setup)
    rateSetup: [
        { visitType: 'CONSULTATION', rate: '500.00', serviceCh: '50.00', groupA: '', groupB: '', groupC: '', groupD: '' },
        { visitType: 'DIAGNOSIS', rate: '1500.00', serviceCh: '150.00', groupA: '', groupB: '', groupC: '', groupD: '' },
        { visitType: 'REPORTING', rate: '200.00', serviceCh: '0.00', groupA: '', groupB: '', groupC: '', groupD: '' }
    ]
};

function UnifiedMedicalForm() {
    const [activeTab, setActiveTab] = React.useState('detail'); // 'list' or 'detail'
    const [formData, setFormData] = React.useState(initialDoctorData);
    const [profilePicturePreview, setProfilePicturePreview] = React.useState(null);
    
    // Add the styles to the document
    React.useEffect(() => {
        const styleElement = document.createElement('style');
        styleElement.innerHTML = styles;
        document.head.appendChild(styleElement);
        
        return () => {
            document.head.removeChild(styleElement);
        };
    }, []);

    // --- Handlers ---
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handlePictureChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, profilePicture: file }));
            setProfilePicturePreview(URL.createObjectURL(file));
        }
    };

    // --- Reusable Section Component ---
    const SectionHeader = ({ title, iconClass }) => (
        <div className="d-flex align-items-center">
            <i className={`${iconClass} fs-2 me-3 text-primary`}></i>
            <h4 className="mb-0 fw-bolder text-primary-emphasis">{title}</h4>
        </div>
    );
    
    return (
        <MasterLayout>
            <Breadcrumb title="Doctor & OPD Management" />
            <div className="container-fluid py-4 px-lg-4">
                <div className="card shadow-xl border-0 rounded-4 overflow-hidden">
                    <div className="card-header p-0 border-bottom-0">
                        {/* --- Modern Tab Navigation --- */}
                        <ul className="nav nav-tabs nav-tabs-modern" id="mainTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className={`nav-link ${activeTab === 'list' ? 'active' : ''}`} onClick={() => setActiveTab('list')} type="button">
                                    <i className="bi bi-list-ul me-2"></i>Doctor List
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className={`nav-link ${activeTab === 'detail' ? 'active' : ''}`} onClick={() => setActiveTab('detail')} type="button">
                                    <i className="bi bi-person-lines-fill me-2"></i>Doctor Profile Details
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div className="card-body p-3 p-md-4">
                        {/* --- Tab Content --- */}
                        {activeTab === 'list' && (
                            <div className="tab-pane-list-view">
                                {/* Filter Bar inspired by image_d28c55.png */}
                                <div className="p-3 mb-4 rounded-3 bg-light border">
                                    <div className="row g-3 align-items-center">
                                        <div className="col-md-auto fw-bold">Filter By:</div>
                                        <div className="col-md-3">
                                            <input type="date" className="form-control" defaultValue="2025-02-22" />
                                        </div>
                                        <div className="col-md-3">
                                            <input type="date" className="form-control" defaultValue="2025-02-22" />
                                        </div>
                                        <div className="col-md-auto">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="allReceiptCheck" defaultChecked/>
                                                <label className="form-check-label" htmlFor="allReceiptCheck">All Records</label>
                                            </div>
                                        </div>
                                        <div className="col-md-auto">
                                            <button className="btn btn-primary"><i className="bi bi-search me-1"></i> Apply</button>
                                        </div>
                                    </div>
                                </div>
                                {/* Responsive Table */}
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle">
                                        <thead>
                                            <tr>
                                                <th>Doctor ID</th>
                                                <th>Name</th>
                                                <th>Qualification</th>
                                                <th>Speciality</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sampleDoctorList.map(doc => (
                                                <tr key={doc.id}>
                                                    <td>{doc.id}</td>
                                                    <td><span className="fw-bold">{doc.name}</span></td>
                                                    <td>{doc.qualification}</td>
                                                    <td>{doc.speciality}</td>
                                                    <td><span className={`badge ${doc.status === 'Active' ? 'bg-success-subtle text-success-emphasis' : 'bg-warning-subtle text-warning-emphasis'}`}>{doc.status}</span></td>
                                                    <td><button className="btn btn-sm btn-outline-primary"><i className="bi bi-pencil-square"></i></button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'detail' && (
                            <div className="tab-pane-detail-view">
                                <div className="accordion" id="doctorProfileAccordion">
                                    
                                    {/* --- Accordion Item 1: Personal & Professional Info --- */}
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                                                <SectionHeader title="Personal & Professional Information" iconClass="bi bi-person-badge-fill" />
                                            </button>
                                        </h2>
                                        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#doctorProfileAccordion">
                                            <div className="accordion-body">
                                                <div className="row g-4">
                                                    <div className="col-lg-8">
                                                        <div className="row g-4">
                                                            <div className="col-md-3">
                                                                <label className="form-label fw-medium">Title</label>
                                                                <select name="title" className="form-select form-select-lg">
                                                                    <option>Dr.</option><option>Prof.</option>
                                                                </select>
                                                            </div>
                                                            <div className="col-md-9">
                                                                <label className="form-label fw-medium">Name</label>
                                                                <input type="text" name="name" className="form-control form-control-lg" />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label className="form-label fw-medium">Identification</label>
                                                                <input type="text" name="identification" className="form-control form-control-lg" />
                                                            </div>
                                                             <div className="col-md-6">
                                                                <label className="form-label fw-medium">Create Date</label>
                                                                <input type="date" name="createDate" className="form-control form-control-lg" defaultValue="2025-06-06" />
                                                            </div>
                                                            <div className="col-12">
                                                                <label className="form-label fw-medium">Address</label>
                                                                <textarea name="address1" className="form-control" rows="3"></textarea>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label className="form-label fw-medium">Phone No</label>
                                                                <input type="tel" name="phoneNo" className="form-control" />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label className="form-label fw-medium">Registration No</label>
                                                                <input type="text" name="registrationNo" className="form-control" />
                                                            </div>
                                                             <div className="col-12">
                                                                <label className="form-label fw-medium">Qualification</label>
                                                                <input type="text" name="qualification" className="form-control" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <label className="form-label fw-medium text-center d-block">Profile Picture</label>
                                                        <label htmlFor="profilePictureUpload" className="profile-picture-uploader rounded-4 d-flex align-items-center justify-content-center text-center">
                                                            {!profilePicturePreview && <div><i className="bi bi-camera-fill fs-1"></i><p>Click to Upload</p></div>}
                                                            <input type="file" id="profilePictureUpload" name="profilePicture" onChange={handlePictureChange} className="d-none" />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* --- Accordion Item 2: Settings & Status --- */}
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                                                <SectionHeader title="Settings & Status" iconClass="bi bi-toggles" />
                                            </button>
                                        </h2>
                                        <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#doctorProfileAccordion">
                                            <div className="accordion-body">
                                                <div className="row g-4">
                                                    <div className="col-md-4"><div className="form-check form-switch form-check-lg"><input className="form-check-input" type="checkbox" name="isRMO" /><label className="form-check-label">R.M.O. (Y/N)</label></div></div>
                                                    <div className="col-md-4"><div className="form-check form-switch form-check-lg"><input className="form-check-input" type="checkbox" name="isIndoor" /><label className="form-check-label">Indoor (Y/N)</label></div></div>
                                                    <div className="col-md-4"><div className="form-check form-switch form-check-lg"><input className="form-check-input" type="checkbox" name="inPanelList" defaultChecked /><label className="form-check-label">In Panel List (Y/N)</label></div></div>
                                                    <div className="col-md-6"><div className="form-check form-switch form-check-lg"><input className="form-check-input" type="checkbox" name="calculateCommission" /><label className="form-check-label">Calculate Commission (Y/N)</label></div></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* --- Accordion Item 3: Consultation & Service Rates --- */}
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                                                <SectionHeader title="Consultation & Service Rates" iconClass="bi bi-cash-coin" />
                                            </button>
                                        </h2>
                                        <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#doctorProfileAccordion">
                                            <div className="accordion-body">
                                                <div className="row g-3 mb-4">
                                                    <div className="col-md-3"><label className="form-label">Indoor Visit Rate</label><input type="number" name="indoorVisitRate" className="form-control text-end" defaultValue="0.00" /></div>
                                                    <div className="col-md-3"><label className="form-label">ICU Rate</label><input type="number" name="icuRate" className="form-control text-end" defaultValue="0.00" /></div>
                                                    <div className="col-md-3"><label className="form-label">CAB Rate</label><input type="number" name="cabRate" className="form-control text-end" defaultValue="0.00" /></div>
                                                    <div className="col-md-3"><label className="form-label">SUIT Rate</label><input type="number" name="suitRate" className="form-control text-end" defaultValue="0.00" /></div>
                                                </div>
                                                <h6>Detailed Rate Setup</h6>
                                                <div className="table-responsive">
                                                    <table className="table table-bordered table-sm">
                                                        <thead><tr><th>Visit Type</th><th>Rate</th><th>Service Ch</th><th>Group-A</th><th>Group-B</th><th>Group-C</th><th>Group-D</th></tr></thead>
                                                        <tbody>
                                                            {formData.rateSetup.map((rate, index) => (
                                                                <tr key={index}>
                                                                    <td><input type="text" className="form-control form-control-sm" defaultValue={rate.visitType} /></td>
                                                                    <td><input type="text" className="form-control form-control-sm text-end" defaultValue={rate.rate} /></td>
                                                                    <td><input type="text" className="form-control form-control-sm text-end" defaultValue={rate.serviceCh} /></td>
                                                                    <td><input type="text" className="form-control form-control-sm" /></td>
                                                                    <td><input type="text" className="form-control form-control-sm" /></td>
                                                                    <td><input type="text" className="form-control form-control-sm" /></td>
                                                                    <td><input type="text" className="form-control form-control-sm" /></td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* --- Accordion Item 4: Visiting Hours Setup --- */}
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour">
                                                <SectionHeader title="Visiting Hours Setup" iconClass="bi bi-calendar-week-fill" />
                                            </button>
                                        </h2>
                                        <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#doctorProfileAccordion">
                                            <div className="accordion-body">
                                                <table className="table table-bordered align-middle">
                                                    <tbody>
                                                        <tr>
                                                            <td className="fw-bold">Days</td>
                                                            <td><input type="number" className="form-control" defaultValue={formData.visitingHours.daysValue} /></td>
                                                            <td><input type="number" className="form-control" defaultValue={formData.visitingHours.hoursValue} /></td>
                                                        </tr>
                                                        {Object.keys(formData.visitingHours).filter(day => day.length === 3).map(day => (
                                                             <tr key={day}>
                                                                <td className="fw-bold">{day}</td>
                                                                <td><input type="checkbox" className="form-check-input" defaultChecked={formData.visitingHours[day]} /></td>
                                                                <td><input type="checkbox" className="form-check-input" /></td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}
                    </div> {/* end card-body */}
                    
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

                </div> {/* end card */}
            </div>
        </MasterLayout>
    );
}

export default UnifiedMedicalForm;