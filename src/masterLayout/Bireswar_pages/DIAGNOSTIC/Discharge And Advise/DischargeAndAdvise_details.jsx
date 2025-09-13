




import React from 'react';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';

// --- Helper Components using only Bootstrap 5 classes for a clean structure ---
const FormField = ({ label, type = 'text', defaultValue = '', icon, children, readOnly = false }) => (
    <div>
        <label className="form-label fw-semibold small text-muted">{label}</label>
        <div className="input-group">
            {icon && <span className="input-group-text bg-light"><i className={`bi ${icon}`}></i></span>}
            <input type={type} className={`form-control ${readOnly ? 'bg-light-subtle' : ''}`} defaultValue={defaultValue} readOnly={readOnly}/>
            {children}
        </div>
    </div>
);

const FormSelect = ({ label, defaultValue, options }) => (
     <div>
        <label className="form-label fw-semibold small text-muted">{label}</label>
        <select className="form-select" defaultValue={defaultValue}>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);

// --- Main DischargeAndAdvise_details_details Component ---
const DischargeAndAdvise_details = () => {
    const [activeTab, setActiveTab] = React.useState('detail'); 

    // Reusable component for the tabs
    const TabButton = ({ tabName, icon, label }) => (
        <li className="nav-item" role="presentation">
            <button 
                className={`nav-link fs-6 fw-bold ${activeTab === tabName ? 'active' : ''}`} 
                onClick={() => setActiveTab(tabName)} 
                type="button"
            >
                {icon && <i className={`bi ${icon} me-2`}></i>}
                {label}
            </button>
        </li>
    );

    // Placeholder data from the new screenshot
    const diagnosisData = [
        { slno: 1, diagnosis: 'Calculous cholecystitis' },
        { slno: 2, diagnosis: 'Jaundice (resolved)' },
    ];
    const complaintsData = [
        { slno: 1, complaint: 'Admitted with c/o severe pain in abdomen mainly right hypochondriac and epigastric region with nausea, vomiting.' },
    ];

    return (
        <MasterLayout>
            <Breadcrumb title="Discharge And Advise" />
            <div className="container-fluid py-4">
                <div className="card shadow-xl border-0 rounded-4 overflow-hidden">
                    
                    <div className="card-header text-white py-4 px-4" style={{ background: 'linear-gradient(135deg, hsl(210, 80%, 50%), hsl(260, 70%, 55%))' }}>
                        <div className="d-flex align-items-center">
                            <i className="bi bi-box-arrow-left display-4 me-3"></i>
                            <div>
                                <h2 className="mb-0 fw-bolder">Discharge And Advise</h2>
                                <p className="mb-0 opacity-75 small">Manage patient discharge and medical advice</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-header p-0 border-bottom-0">
                         <ul className="nav nav-tabs nav-tabs-modern" role="tablist">
                            <TabButton tabName="list" icon="bi-list-ul" label="List"/>
                            <TabButton tabName="detail" icon="bi-file-earmark-person-fill" label="Detail"/>
                            <TabButton tabName="advice" icon="bi-file-earmark-medical-fill" label="Advice"/>
                            <TabButton tabName="mrd" icon="bi-folder-fill" label="MRD"/>
                        </ul>
                    </div>

                    <div className="card-body p-3 p-md-4">
                       {/* --- Top Information Bar --- */}
                       <div className="p-3 mb-4 rounded-3 bg-light-subtle border">
                            <div className="row g-3 align-items-end">
                                <div className="col-md-3"><FormField label="Advice No." defaultValue="D-002456/24-25" /></div>
                                <div className="col-md-3"><FormField label="Discharge Time" type="time" defaultValue="10:00" /></div>
                                <div className="col-md-3"><FormField label="Discharge Date" type="date" defaultValue="2025-02-22" /></div>
                            </div>
                        </div>

                        <div className="row g-4">
                            {/* --- Left Column: Patient & Care Details --- */}
                            <div className="col-lg-8">
                                <div className="accordion" id="dischargeAccordion">
                                    {/* Patient Detail Section */}
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePatient">
                                                <i className="bi bi-person-vcard-fill fs-4 me-3 text-primary"></i>
                                                <span className="fw-bold">Patient Detail</span>
                                            </button>
                                        </h2>
                                        <div id="collapsePatient" className="accordion-collapse collapse show" data-bs-parent="#dischargeAccordion">
                                            <div className="accordion-body">
                                                <div className="row g-3">
                                                    <div className="col-md-6"><FormField label="Patient Name" defaultValue="PRABIR MUKHERJEE" /></div>
                                                    <div className="col-md-4"><FormField label="Admission No." defaultValue="A-001006/24-25" /></div>
                                                    <div className="col-md-2"><FormField label="Bed" defaultValue="M2" /></div>
                                                    <div className="col-md-3">
                                                        <label className="form-label fw-semibold small text-muted">Age</label>
                                                        <div className="input-group">
                                                            <input type="text" className="form-control" defaultValue="63.00"/>
                                                            <select className="form-select" style={{maxWidth: '70px'}}><option>Y</option><option>M</option></select>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3"><FormSelect label="Sex" defaultValue="M" options={['M', 'F']} /></div>
                                                    <div className="col-md-3"><FormField label="Admission Time" type="text" defaultValue="08:07 AM"/></div>
                                                    <div className="col-12"><FormField label="Address" defaultValue="8,AMBIKA GHOSHAL LANE, P.O+P.S-SHIBPUR, DIST.HOWRAH,PIN-711102" /></div>
                                                    <div className="col-md-4"><FormField label="Phone" defaultValue="8981121985" icon="bi-telephone" /></div>
                                                    <div className="col-md-4"><FormSelect label="Marital Status" defaultValue="M" options={['M', 'U']} /></div>
                                                    <div className="col-md-4"><FormField label="Admission Date" type="date" defaultValue="2025-02-12" /></div>
                                                    <div className="col-md-6"><FormField label="W/O S/O D/O" defaultValue="S/O LATE RABINDRA NATH MUKHERJEE" /></div>
                                                    <div className="col-md-6"><FormField label="Relation" defaultValue="FATHER" /></div>
                                                    <div className="col-md-4"><FormField label="Nationality" defaultValue="INDIAN"/></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Care & Discharge Section */}
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCare">
                                                 <i className="bi bi-heart-pulse-fill fs-4 me-3 text-primary"></i>
                                                <span className="fw-bold">Care & Discharge Details</span>
                                            </button>
                                        </h2>
                                        <div id="collapseCare" className="accordion-collapse collapse" data-bs-parent="#dischargeAccordion">
                                             <div className="accordion-body">
                                                <div className="row g-3">
                                                    <div className="col-md-6"><FormField label="Under Care Dr." defaultValue="ABHRA MUKHOPADHYAY" /></div>
                                                    <div className="col-md-6"><FormField label="Referral" /></div>
                                                    <div className="col-md-6"><FormField label="Corporate" /></div>
                                                    <div className="col-md-6"><FormField label="Reason Discharge" defaultValue="Normal Discharge" /></div>
                                                    <div className="col-md-6"><FormField label="OT Date" type="date" /></div>
                                                    <div className="col-md-6"><FormField label="O.T. Type" /></div>
                                                </div>
                                             </div>
                                        </div>
                                    </div>
                                    {/* Remarks */}
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseRemarks">
                                                 <i className="bi bi-chat-left-text-fill fs-4 me-3 text-primary"></i>
                                                <span className="fw-bold">Remarks</span>
                                            </button>
                                        </h2>
                                        <div id="collapseRemarks" className="accordion-collapse collapse" data-bs-parent="#dischargeAccordion">
                                             <div className="accordion-body">
                                                 <textarea className="form-control" rows="4"></textarea>
                                             </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* --- Right Column: Barcode & Medical Info --- */}
                            <div className="col-lg-4">
                                <div className="p-3 border rounded-4 shadow-sm text-center bg-light-subtle mb-4">
                                    <img src="https://barcode.tec-it.com/barcode.ashx?data=A-001006%2F24-25&code=Code128" alt="barcode" className="img-fluid"/>
                                    <p className="fw-bold text-dark mb-0 mt-2">A-001006/24-25</p>
                                </div>
                                <div className="p-3 border rounded-4 shadow-sm bg-white">
                                    <h6 className="fw-bold">Discharged By</h6>
                                    <p>ROM</p>
                                    <h6 className="fw-bold mt-3">Current User</h6>
                                    <p>Admin</p>
                                </div>
                            </div>
                        </div>

                        {/* --- Diagnosis & Complaints Section --- */}
                        <div className="mt-4 p-4 border rounded-4 shadow-sm bg-white">
                            <div className="row g-4">
                                <div className="col-lg-6">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <h5 className="fw-bold text-primary-emphasis mb-0">Diagnosis</h5>
                                        <button className="btn btn-outline-primary btn-sm"><i className="bi bi-arrow-down-circle me-1"></i>Load EMR</button>
                                    </div>
                                    <ul className="list-group">
                                        {diagnosisData.map(item => (
                                            <li key={item.slno} className="list-group-item d-flex">
                                                <span className="fw-bold me-3">{item.slno}.</span>
                                                <span>{item.diagnosis}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="col-lg-6">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <h5 className="fw-bold text-primary-emphasis mb-0">Present Complaints</h5>
                                        <button className="btn btn-outline-primary btn-sm"><i className="bi bi-arrow-down-circle me-1"></i>Load Disc Adv Word</button>
                                    </div>
                                     <ul className="list-group">
                                        {complaintsData.map(item => (
                                            <li key={item.slno} className="list-group-item d-flex">
                                                <span className="fw-bold me-3">{item.slno}.</span>
                                                <span>{item.complaint}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="col-lg-6">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <h5 className="fw-bold text-primary-emphasis mb-0">Diet</h5>
                                        <button className="btn btn-outline-primary btn-sm"><i className="bi bi-arrow-down-circle me-1"></i>Load Diet</button>
                                    </div>
                                    <div className="p-3 bg-light-subtle rounded-3 border" style={{minHeight: '100px'}}></div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <h5 className="fw-bold text-primary-emphasis mb-0">Complaints (Reason for Admission)</h5>
                                        <button className="btn btn-outline-primary btn-sm"><i className="bi bi-arrow-down-circle me-1"></i>Load Disc Adv</button>
                                    </div>
                                    <div className="p-3 bg-light-subtle rounded-3 border" style={{minHeight: '100px'}}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className="card-footer p-3 bg-light border-top">
                        <div className="d-flex flex-wrap justify-content-center justify-content-md-end gap-2">
                             {['New', 'Edit', 'Save', 'Delete', 'Undo', 'Print', 'Exit'].map(btn => {
                                let icon = 'question-circle';
                                if (btn === 'New') icon = 'file-earmark-plus';
                                if (btn === 'Edit') icon = 'pencil-square';
                                if (btn === 'Save') icon = 'check-circle';
                                if (btn === 'Delete') icon = 'trash2';
                                if (btn === 'Undo') icon = 'arrow-counterclockwise';
                                if (btn === 'Print') icon = 'printer';
                                if (btn === 'Exit') icon = 'x-lg';
                                return (
                                    <button key={btn} className="btn btn-outline-primary rounded-pill px-4">
                                        <i className={`bi bi-${icon} me-1`}></i>{btn}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>
    );
};

export default DischargeAndAdvise_details;


























