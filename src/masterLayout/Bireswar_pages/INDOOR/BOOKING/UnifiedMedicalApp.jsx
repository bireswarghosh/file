import React from 'react';
// In a real app, you would have your MasterLayout and Breadcrumb components
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';

// --- Reusable Section Component ---
const SectionHeader = ({ title, iconClass }) => (
    <div className="d-flex align-items-center mb-4">
        <i className={`${iconClass} fs-2 me-3 text-primary`}></i>
        <h4 className="mb-0 fw-bolder text-primary-emphasis">{title}</h4>
    </div>
);


// --- Main Application Component ---
function UnifiedMedicalApp() {
    const [activeTab, setActiveTab] = React.useState('booking'); // 'booking', 'doctor', 'query'

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'booking': return <BookingView />;
            case 'doctor': return <DoctorProfileView />;
            case 'query': return <OpdLabQueryView />;
            default: return <BookingView />;
        }
    };

    return (
        <MasterLayout>
         <Breadcrumb title="Unified Medical Workspace" />
        <div className="container-fluid py-4 px-lg-4">
            <div className="card shadow-xl border-0 rounded-4 overflow-hidden">
                <div className="card-header p-0 border-bottom-0">
                    <ul className="nav nav-tabs nav-tabs-modern" id="mainWorkspaceTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className={`nav-link ${activeTab === 'booking' ? 'active' : ''}`} onClick={() => setActiveTab('booking')} type="button">
                                <i className="bi bi-calendar-plus-fill me-2"></i>Booking
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className={`nav-link ${activeTab === 'doctor' ? 'active' : ''}`} onClick={() => setActiveTab('doctor')} type="button">
                                <i className="bi bi-person-badge-fill me-2"></i>Doctor Profile
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className={`nav-link ${activeTab === 'query' ? 'active' : ''}`} onClick={() => setActiveTab('query')} type="button">
                                <i className="bi bi-file-earmark-medical-fill me-2"></i>OPD & Lab Query
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="card-body p-3 p-md-4">
                    {renderActiveTab()}
                </div>
            </div>
        </div>
         </MasterLayout>
    );
}

// --- Booking View Component (from image_2c9cd2.png) ---
const BookingView = () => {
    // State for this specific form would go here
    return (
        <div>
            {/* Top Filter Bar */}
            <div className="row g-3 align-items-center p-3 mb-4 bg-light border rounded-3">
                <div className="col-md-2"><label className="form-label">OPD</label><select className="form-select"><option>Y</option><option>N</option></select></div>
                <div className="col-md-3"><label className="form-label">List</label><input type="text" className="form-control"/></div>
                <div className="col-md-3"><label className="form-label">Doctor Name</label><input type="text" className="form-control" /></div>
            </div>

            <div className="row g-4">
                {/* --- Left Column: Patient & Booking Details --- */}
                <div className="col-lg-5">
                    <div className="p-4 border rounded-4 shadow-sm bg-white mb-4">
                        <h5 className="fw-bold text-primary-emphasis mb-3"><i className="bi bi-person-circle me-2"></i>Patient & Booking Info</h5>
                        <div className="row g-3">
                            <div className="col-md-6"><label className="form-label">Date</label><input type="date" className="form-control" defaultValue="2025-02-22"/></div>
                            <div className="col-md-6"><label className="form-label">Time</label><input type="time" className="form-control" defaultValue="11:48"/></div>
                            <div className="col-md-6"><label className="form-label">Card No</label><input type="text" className="form-control"/></div>
                            <div className="col-md-6"><label className="form-label">Booking No</label><input type="text" className="form-control"/></div>
                             <div className="col-12"><label className="form-label">Patient Name</label><input type="text" className="form-control"/></div>
                            <div className="col-md-6"><label className="form-label">Age</label><input type="text" className="form-control"/></div>
                            <div className="col-md-6"><label className="form-label">Sex</label><select className="form-select"><option>M</option><option>F</option></select></div>
                            <div className="col-12"><label className="form-label">Address</label><textarea className="form-control" rows="2"></textarea></div>
                             <div className="col-md-6"><label className="form-label">Company</label><input type="text" className="form-control"/></div>
                            <div className="col-md-6"><label className="form-label">Doctor Name</label><input type="text" className="form-control"/></div>
                        </div>
                    </div>
                     <div className="p-4 border rounded-4 shadow-sm bg-white">
                        <h5 className="fw-bold text-primary-emphasis mb-3"><i className="bi bi-wallet2 me-2"></i>Payment</h5>
                         <div className="row g-3">
                            <div className="col-md-6"><label className="form-label">Payment Mode</label><select className="form-select"><option>[C]ash</option><option>[B]ank</option><option>[D]Card</option></select></div>
                            <div className="col-md-6"><label className="form-label">Bank Name</label><input type="text" className="form-control"/></div>
                            <div className="col-12"><label className="form-label">Cheque/Card</label><input type="text" className="form-control"/></div>
                         </div>
                     </div>
                </div>

                {/* --- Right Column: Order & Billing Details --- */}
                <div className="col-lg-7">
                     <div className="p-4 border rounded-4 shadow-sm bg-white h-100">
                        <h5 className="fw-bold text-primary-emphasis mb-3"><i className="bi bi-journal-text me-2"></i>Order & Billing Details</h5>
                        <div className="table-responsive mb-3" style={{maxHeight: '250px'}}>
                            <table className="table table-sm">
                                <thead><tr><th>Pr</th><th>N</th><th>Test Name</th><th className="text-end">Rate</th></tr></thead>
                                <tbody>{/* Test rows would be added dynamically here */}</tbody>
                            </table>
                        </div>
                        <hr/>
                        <div className="row g-3 justify-content-end">
                            <div className="col-md-6">
                                 <div className="d-flex justify-content-between py-1"><span className="fw-medium">Total:</span><span className="fw-bold">0.00</span></div>
                                 <div className="d-flex justify-content-between py-1"><span className="fw-medium">Service Chg:</span><span className="fw-bold">0.00</span></div>
                                 <div className="d-flex justify-content-between align-items-center py-1">
                                     <span className="fw-medium">Discount:</span>
                                     <div className="d-flex gap-1 align-items-center" style={{width: '60%'}}>
                                        <input type="text" className="form-control form-control-sm text-end" defaultValue="0.00"/>
                                        <span className="fw-bold">%</span>
                                        <input type="text" className="form-control form-control-sm text-end fw-bold" defaultValue="0.00"/>
                                     </div>
                                 </div>
                                 <hr className="my-1"/>
                                 <div className="d-flex justify-content-between py-1 fs-5"><span className="fw-bold text-primary">Grand Total:</span><span className="fw-bolder text-primary">0.00</span></div>
                                 <div className="d-flex justify-content-between py-1"><span className="fw-medium">Advance:</span><span className="fw-bold">0.00</span></div>
                            </div>
                        </div>
                        <hr/>
                        <div className="mt-3">
                            <label className="form-label fw-medium">Remarks</label>
                            <textarea className="form-control" rows="2"></textarea>
                        </div>
                     </div>
                </div>
            </div>
             {/* --- Action Buttons Footer for Booking --- */}
            <div className="pt-4 mt-4 border-top">
                <div className="d-flex flex-wrap justify-content-center justify-content-md-end gap-2">
                    <button type="button" className="btn btn-outline-secondary rounded-pill px-3"><i className="bi bi-arrow-left-circle me-1"></i>Prev</button>
                    <button type="button" className="btn btn-outline-secondary rounded-pill px-3">Next<i className="bi bi-arrow-right-circle ms-1"></i></button>
                    <button type="button" className="btn btn-info text-white rounded-pill px-4"><i className="bi bi-receipt me-1"></i>Bill</button>
                    <button type="button" className="btn btn-success text-white rounded-pill px-4"><i className="bi bi-window-stack me-1"></i>Bill Win</button>
                    <button type="submit" className="btn btn-primary btn-lg rounded-pill px-5 fw-bolder shadow-lg ms-md-3"><i className="bi bi-check-circle-fill me-2"></i>Save Booking</button>
                </div>
            </div>
        </div>
    )
};


// --- Doctor Profile Component (from image_0beaf3.png) ---
const DoctorProfileView = () => (
    <div className="accordion" id="doctorProfileAccordion">
        {/* Accordion Item 1: Personal & Professional Info */}
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDocOne">
                    <SectionHeader title="Personal & Professional Information" iconClass="bi bi-person-badge-fill" />
                </button>
            </h2>
            <div id="collapseDocOne" className="accordion-collapse collapse show" data-bs-parent="#doctorProfileAccordion">
                <div className="accordion-body">
                    {/* Content from previous Doctor Profile View response */}
                    <p>Doctor personal and professional information form fields would go here, structured similarly to the previous detailed response.</p>
                </div>
            </div>
        </div>
        {/* Additional accordion items for Rates, Settings, etc. would go here */}
    </div>
);


// --- OPD & Lab Query Component (from image_d1c52d.png & image_64778a.png) ---
const OpdLabQueryView = () => (
    <div className="accordion" id="queryAccordion">
        {/* Accordion Item 1: Laboratory Query */}
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseLabQuery">
                    <SectionHeader title="Laboratory Query" iconClass="bi bi-droplet-half" />
                </button>
            </h2>
            <div id="collapseLabQuery" className="accordion-collapse collapse show" data-bs-parent="#queryAccordion">
                <div className="accordion-body">
                     {/* Content from Laboratory Query View response */}
                     <p>The detailed laboratory query filter bar, tables, and bottom section form fields would go here.</p>
                </div>
            </div>
        </div>
         {/* Accordion Item 2: OPD Query */}
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOpdQuery">
                    <SectionHeader title="OPD Query & Setup" iconClass="bi bi-hospital" />
                </button>
            </h2>
            <div id="collapseOpdQuery" className="accordion-collapse collapse" data-bs-parent="#queryAccordion">
                <div className="accordion-body">
                     {/* Content from OPD Query View response */}
                     <p>The OPD Query filters, doctor list, Visiting Hours setup, and Rate Setup tables would go here.</p>
                </div>
            </div>
        </div>
    </div>
);

export default UnifiedMedicalApp;

/*
  Add this to your main CSS file for the full "eye-catching" effect:

  body {
    background-color: #f0f2f5; 
  }
  .card.shadow-xl {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.20), 0 10px 15px -5px rgba(0, 0, 0, 0.1) !important;
  }
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
  .accordion-button {
    background-color: #f8f9fa; 
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }
  .accordion-button:not(.collapsed) {
    color: #000;
    background-color: #f8f9fa;
    box-shadow: none;
  }
  .accordion-item {
    border: 1px solid #dee2e6;
    border-radius: 0.75rem;
    margin-bottom: 1rem;
    overflow: hidden;
  }
  .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.1);
  }
  .profile-picture-uploader {
    height: 100%;
    min-height: 200px;
    width: 100%;
    border: 3px dashed #ced4da;
    transition: all 0.3s ease;
    cursor: pointer;
    background-color: #f8f9fa;
    background-size: cover;
    background-position: center;
    background-image: var(--profile-pic-url); 
  }
  .profile-picture-uploader:hover {
    border-color: #0d6efd;
    background-color: #e9ecef;
  }
*/