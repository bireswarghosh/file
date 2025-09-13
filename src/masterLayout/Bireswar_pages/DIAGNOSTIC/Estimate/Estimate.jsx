import React from 'react';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';

// --- Helper Components using only Bootstrap 5 classes ---

const BedStatusPill = ({ status, count }) => {
    let statusClasses = "";
    if (status === 'Occupied') statusClasses = "bg-danger-subtle text-danger-emphasis";
    else if (status === 'Vacant') statusClasses = "bg-success-subtle text-success-emphasis";
    return (
        <div className={`d-flex justify-content-between align-items-center p-2 rounded-3 mb-2 ${statusClasses}`}>
            <span className="small fw-bold">{status}</span>
            <span className="badge bg-dark rounded-pill">{count}</span>
        </div>
    );
};

const FormField = ({ label, type = 'text', defaultValue = '', icon, children, readOnly = false, placeholder = '' }) => (
    <div className="mb-3">
        <label className="form-label fw-semibold small">{label}</label>
        <div className="input-group">
            {icon && <span className="input-group-text bg-light"><i className={`bi ${icon}`}></i></span>}
            <input 
                type={type} 
                className={`form-control ${readOnly ? 'bg-light-subtle' : ''}`} 
                defaultValue={defaultValue} 
                placeholder={placeholder}
                readOnly={readOnly}
            />
            {children}
        </div>
    </div>
);

const CheckboxOption = ({ id, label, defaultChecked = false }) => (
    <div className="col-6 mb-2">
        <div className="form-check">
            <input className="form-check-input" type="checkbox" id={id} defaultChecked={defaultChecked} />
            <label className="form-check-label small" htmlFor={id}>{label}</label>
        </div>
    </div>
);


// --- Main Estimate Component ---
const Estimate = () => {
    // Data from the provided image
    const bedList = [
        '01 ICU', '1 ICU', '1 ISOL CABIN', '1010', '11 ISOL CABIN', '11 GWF', '110 GWM A/C', '115 GWM A/C',
        '12 GWM A/C', '12 ICU', '122 GWM A/C', '134 GWM A/C', '136 GWM A/C', '141 GWM A/C',
        '148 GWM A/C', '15 GWM A/C', '150 GWM A/C', '151 GWM A/C', '154 GWM A/C',
        '16 ISOL CABIN', '18 ICU', '184 GWM A/C', '20 ICU', '219 GWM A/C', '24 ICU',
        '35 ICU', '36 ICU', '38 ICU', '43 ISOL CABIN', '45 ICU'
    ];
    
    const billHeadData = [
        { head: 'Bed Charges', amount: '130900.00' },
        { head: 'Others Charges', amount: '18250.00' },
        { head: 'O.T. Charges', amount: '0.00' },
        { head: 'Doctor Charges', amount: '0.00' },
        { head: 'Diagnostic Charges', amount: '0.00' },
        { head: 'Medicine Charges', amount: '0.00' },
        { head: 'Service Charges', amount: '132390.00' },
        { head: 'GST Amount', amount: '0.00' },
        { head: 'Less Advance Receipt', amount: '24920.00' }
    ];

    const bedHistoryData = [
        { date: '11/01/2020', bed: '1 ICU', rate: '700.00', attendant: '0', rmo: '0' },
        { date: '12/01/2020', bed: '1 ICU', rate: '700.00', attendant: '0', rmo: '0' },
        { date: '13/01/2020', bed: '1 ICU', rate: '700.00', attendant: '0', rmo: '0' },
        { date: '14/01/2020', bed: '1 ICU', rate: '700.00', attendant: '0', rmo: '0' },
        { date: '15/01/2020', bed: '1 ICU', rate: '700.00', attendant: '0', rmo: '0' },
        { date: '16/01/2020', bed: '1 ICU', rate: '700.00', attendant: '0', rmo: '0' },
        { date: '17/01/2020', bed: '1 ICU', rate: '700.00', attendant: '0', rmo: '0' },
        { date: '18/01/2020', bed: '1 ICU', rate: '700.00', attendant: '0', rmo: '0' },
        { date: '19/01/2020', bed: '1 ICU', rate: '700.00', attendant: '0', rmo: '0' },
        { date: '20/01/2020', bed: '1 ICU', rate: '700.00', attendant: '0', rmo: '0' },
        { date: '21/01/2020', bed: '1 ICU', rate: '700.00', attendant: '0', rmo: '0' },
    ];


    return (
        <MasterLayout>
            <Breadcrumb title="Estimate" />
            <div className="container-fluid py-4">
                <div className="row g-3">

                    {/* --- LEFT COLUMN: Bed Status List --- */}
                    <div className="col-lg-2 d-none d-lg-block">
                        <div className="card shadow-sm h-100">
                            <div className="card-body d-flex flex-column">
                                <h6 className="fw-bold mb-3"><i className="bi bi-door-closed-fill me-2 text-primary"></i>Bed Status</h6>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control form-control-sm" placeholder="Search Bed..." />
                                    <button className="btn btn-outline-secondary btn-sm" type="button"><i className="bi bi-search"></i></button>
                                </div>
                                <div className="list-group list-group-flush overflow-auto flex-grow-1">
                                    {bedList.map((bed, i) => (
                                        <a key={i} className={`list-group-item list-group-item-action py-1 px-2 ${bed === '01 ICU' ? 'active' : ''}`} href="#">{bed}</a>
                                    ))}
                                </div>
                                <hr/>
                                <BedStatusPill status="Occupied" count={206} />
                                <BedStatusPill status="Vacant" count={675} />
                                <hr/>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="onlyCashless"/>
                                    <label className="form-check-label small" htmlFor="onlyCashless">Only Cashless</label>
                                </div>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="onlyPPN"/>
                                    <label className="form-check-label small" htmlFor="onlyPPN">Only PPN</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- CENTER COLUMN: Main Form --- */}
                    <div className="col-lg-7">
                        <div className="card shadow-sm h-100">
                            <div className="card-header bg-light d-flex flex-wrap justify-content-between align-items-center">
                                <h5 className="fw-bolder mb-0 me-3"><i className="bi bi-file-earmark-medical-fill me-2 text-primary"></i>Estimate</h5>
                                <div className="d-flex align-items-center gap-2 flex-wrap">
                                    <input type="time" className="form-control form-control-sm w-auto" defaultValue="12:13" />
                                    <input type="date" className="form-control form-control-sm w-auto" defaultValue="2025-02-22" />
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" role="switch" id="unbilSwitch" defaultChecked />
                                        <label className="form-check-label small" htmlFor="unbilSwitch">Unbil</label>
                                    </div>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" role="switch" id="emrSwitch" defaultChecked />
                                        <label className="form-check-label small" htmlFor="emrSwitch">EMR</label>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="accordion accordion-flush" id="estimateAccordion">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePatient">
                                                Patient Intel
                                            </button>
                                        </h2>
                                        <div id="collapsePatient" className="accordion-collapse collapse show" data-bs-parent="#estimateAccordion">
                                            <div className="accordion-body">
                                                <div className="row g-3">
                                                    <div className="col-md-6"><FormField label="Patient's Name" defaultValue="CHAPALA NASKAR" icon="bi-person"/></div>
                                                    <div className="col-md-6"><FormField label="Admission No" defaultValue="A-000832/19-20" icon="bi-hash"/></div>
                                                    <div className="col-md-4"><FormField label="Age" defaultValue="94.00 Y" /></div>
                                                    <div className="col-md-4"><FormField label="Sex"><select className="form-select" defaultValue="F"><option>F</option><option>M</option></select></FormField></div>
                                                    <div className="col-md-4"><FormField label="Marital Status (U/M)" defaultValue="M" /></div>
                                                    <div className="col-12"><label className="form-label fw-medium small text-muted">Address</label><textarea className="form-control" rows="2" defaultValue="166/3 ANDUL ROAD B. GARDEN, HOWRAH-711103"></textarea></div>
                                                    <div className="col-md-6"><FormField label="Phone" defaultValue="8777257411" icon="bi-telephone"/></div>
                                                    <div className="col-md-6"><FormField label="Bed No." defaultValue="1 ICU" icon="bi-door-closed"/></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCare">
                                                Care Team & Referral
                                            </button>
                                        </h2>
                                        <div id="collapseCare" className="accordion-collapse collapse" data-bs-parent="#estimateAccordion">
                                            <div className="accordion-body">
                                                <div className="row g-3">
                                                    <div className="col-md-6"><FormField label="Under Care Dr." defaultValue="AGNIBHA MAITY" /></div>
                                                    <div className="col-md-6"><FormField label="Referring Dr." /></div>
                                                    <div className="col-12"><FormField label="Referral"/></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                     <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseBillHead">
                                                Bill Head Detail
                                            </button>
                                        </h2>
                                        <div id="collapseBillHead" className="accordion-collapse collapse" data-bs-parent="#estimateAccordion">
                                            <div className="accordion-body">
                                                <div className="row g-3">
                                                    <div className="col-md-6">
                                                        <ul className="list-group">{billHeadData.map((item, i) => <li key={i} className="list-group-item d-flex justify-content-between"><span>{item.head}</span> <span className="fw-bold">{item.amount}</span></li>)}</ul>
                                                    </div>
                                                    <div className="col-md-6 table-responsive" style={{maxHeight: '300px'}}>
                                                        <table className="table table-sm table-striped">
                                                            <thead><tr><th>Date</th><th>Bed</th><th className="text-end">Rate</th><th className="text-end">Attendant</th><th className="text-end">RMO</th></tr></thead>
                                                            <tbody>
                                                                {bedHistoryData.map((item, i) => (
                                                                    <tr key={i}><td>{item.date}</td><td>{item.bed}</td><td className="text-end">{item.rate}</td><td className="text-end">{item.attendant}</td><td className="text-end">{item.rmo}</td></tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseRemarks">
                                                Remarks
                                            </button>
                                        </h2>
                                        <div id="collapseRemarks" className="accordion-collapse collapse" data-bs-parent="#estimateAccordion">
                                            <div className="accordion-body">
                                                <textarea className="form-control" placeholder="Enter remarks..." rows="4"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer bg-light">
                                <div className="d-flex justify-content-center flex-wrap gap-2">
                                     {['New', 'Edit', 'Save', 'Delete', 'Undo'].map(btn => (
                                        <button key={btn} className="btn btn-outline-primary flex-grow-1">{btn}</button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN: Financial Summary & Actions --- */}
                    <div className="col-lg-3">
                        <div className="card shadow-sm h-100">
                             <div className="card-body d-flex flex-column justify-content-between">
                                <div>
                                    <h6 className="fw-bold mb-3"><i className="bi bi-calculator-fill me-2 text-primary"></i>Financial Summary</h6>
                                    <table className="table table-sm table-borderless">
                                        <tbody>
                                            <tr><td>Bill Amount</td><td className="text-end fw-bold">1,453,640.00</td></tr>
                                            <tr><td>Net Balance</td><td className="text-end fw-bold">1,434,720.00</td></tr>
                                            <tr><td>Rec Amt</td><td className="text-end fw-bold">24,920.00</td></tr>
                                            <tr><td>GST Amount</td><td className="text-end fw-bold">0.00</td></tr>
                                            <tr><td>Discount Amt</td><td className="text-end fw-bold">0.00</td></tr>
                                        </tbody>
                                    </table>
                                    <hr/>
                                    <table className="table table-sm table-borderless">
                                        <tbody>
                                            <tr><td>Approval amt</td><td className="text-end fw-bold">0.00</td></tr>
                                            <tr><td>Patient Pay</td><td className="text-end fw-bold">0.00</td></tr>
                                        </tbody>
                                    </table>
                                    <div className="row g-2">
                                        <div className="col-12"><FormField label="Company" /></div>
                                        <div className="col-12"><FormField label="TPA%" /></div>
                                        <div className="col-md-6"><FormField label="Admission Date" type="date" defaultValue="2020-01-11"/></div>
                                        <div className="col-md-6"><FormField label="Admission Time" type="text" defaultValue="12:34 PM"/></div>
                                        <div className="col-md-6"><FormField label="Package Date" type="date" defaultValue="2000-01-01"/></div>
                                        <div className="col-md-6"><FormField label="Cash Less" /></div>
                                        <div className="col-md-6"><FormField label="Expected Discharge Date" type="date"/></div>
                                        <div className="col-md-6"><FormField label="Approval Amount" defaultValue="0.00"/></div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h6 className="fw-bold mb-3">Charge Options</h6>
                                    <div className="row g-2">
                                        <CheckboxOption id="patientCopy" label="Patient Copy"/>
                                        <CheckboxOption id="otherCharges" label="Other Charges"/>
                                        <CheckboxOption id="approvalCopy" label="Approval Copy"/>
                                        <CheckboxOption id="packagePPN" label="Package [PPN]"/>
                                        <CheckboxOption id="doctorVisit" label="Doctor Visit"/>
                                        <CheckboxOption id="packageBill" label="Package Bill"/>
                                        <CheckboxOption id="medicine" label="Medicine"/>
                                        <CheckboxOption id="packageDetail" label="Package detail"/>
                                    </div>
                                    <hr/>
                                    <div className="d-grid gap-2">
                                         <button className="btn btn-success"><i className="bi bi-arrow-clockwise me-2"></i>Update Remarks & TPA%</button>
                                         <button className="btn btn-primary"><i className="bi bi-eye-fill me-2"></i>Show</button>
                                         <button className="btn btn-outline-primary"><i className="bi bi-printer-fill me-2"></i>Print</button>
                                         <button className="btn btn-outline-primary"><i className="bi bi-receipt me-2"></i>PrintMRct</button>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>

                </div>
            </div>
        </MasterLayout>
    );
};

export default Estimate;
