import React from 'react';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';

// --- Main DischargeAndAdvise Component ---
const DischargeAndAdvise = () => {
    // In a real app, this would come from React.useState
    const [activeTab, setActiveTab] = React.useState('list'); 

    // Sample data from the screenshot
    const dischargeData = [
        {
            dischargeNo: 'D-002456/24-25',
            dischargeTime: '10:00 AM',
            dischargeDate: '22/02/2025',
            patientName: 'PRABIR MUKHERJEE',
            underDr: 'ABHRA',
            admissionNo: 'A-001006/24-25',
            phoneNo: '3381121385 M2',
            bedNo: '',
            status: 'warning' // for row color
        },
        {
            dischargeNo: 'D-002457/24-25',
            dischargeTime: '08:23 AM',
            dischargeDate: '22/02/2025',
            patientName: 'SALAUDDIN MOLLAH',
            underDr: 'RAMYAJIT LAHIRI',
            admissionNo: 'A-001032/24-25',
            phoneNo: '3292256156 M3',
            bedNo: '',
            status: 'warning'
        },
        {
            dischargeNo: 'D-002458/24-25',
            dischargeTime: '08:46 AM',
            dischargeDate: '22/02/2025',
            patientName: 'SK. MOSTAK AHAMMAD',
            underDr: 'ABHRA',
            admissionNo: 'A-001035/24-25',
            phoneNo: '9830348796 M1',
            bedNo: '',
            status: 'success' // for row color
        }
    ];

    // Reusable component for the tabs for clean code
    const TabButton = ({ tabName, activeTab, setActiveTab, icon, label }) => (
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

    return (
        <MasterLayout>
            <Breadcrumb title="Discharge And Advise" />
            <div className="container-fluid py-4">
                <div className="card shadow-xl border-0 rounded-4 overflow-hidden">
                    
                    {/* Card Header with a modern gradient */}
                    <div className="card-header text-white py-4 px-4" style={{ background: 'linear-gradient(135deg, hsl(210, 80%, 50%), hsl(260, 70%, 55%))' }}>
                        <div className="d-flex align-items-center">
                            <i className="bi bi-box-arrow-left display-4 me-3"></i>
                            <div>
                                <h2 className="mb-0 fw-bolder">Discharge And Advise</h2>
                                <p className="mb-0 opacity-75 small">View patient discharge history and manage advice</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Tabs */}
                    <div className="card-header p-0 border-bottom-0">
                         <ul className="nav nav-tabs nav-tabs-modern" role="tablist">
                            <TabButton tabName="list" activeTab={activeTab} setActiveTab={setActiveTab} icon="bi-list-ul" label="List"/>
                            <TabButton tabName="detail" activeTab={activeTab} setActiveTab={setActiveTab} icon="bi-file-earmark-person-fill" label="Detail"/>
                            <TabButton tabName="advice" activeTab={activeTab} setActiveTab={setActiveTab} icon="bi-file-earmark-medical-fill" label="Advice"/>
                            <TabButton tabName="mrd" activeTab={activeTab} setActiveTab={setActiveTab} icon="bi-folder-fill" label="MRD"/>
                        </ul>
                    </div>

                    <div className="card-body p-3 p-md-4">
                        {/* Filter Bar */}
                        <div className="p-3 mb-4 rounded-3 bg-light-subtle border">
                             <div className="row g-3 align-items-end">
                                <div className="col-md-5 col-lg-4">
                                    <label className="form-label fw-semibold small">Date Range</label>
                                    <div className="input-group">
                                        <span className="input-group-text">From</span>
                                        <input type="date" className="form-control" defaultValue="2025-02-22" />
                                        <span className="input-group-text">To</span>
                                        <input type="date" className="form-control" defaultValue="2025-02-22" />
                                    </div>
                                </div>
                                 <div className="col-md-auto ms-auto">
                                    <button className="btn btn-primary w-100"><i className="bi bi-search me-2"></i>Show Records</button>
                                 </div>
                             </div>
                        </div>

                        {/* Responsive Table */}
                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th>Discharge No.</th>
                                        <th>Discharge Time</th>
                                        <th>Discharge Date</th>
                                        <th>Patient Name</th>
                                        <th>Under Dr.</th>
                                        <th>Admission No.</th>
                                        <th>Phone No</th>
                                        <th>Bed No</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dischargeData.map((row, index) => (
                                        <tr key={index} className={`table-${row.status}`}>
                                            <td><span className="fw-bold">{row.dischargeNo}</span></td>
                                            <td>{row.dischargeTime}</td>
                                            <td>{row.dischargeDate}</td>
                                            <td>{row.patientName}</td>
                                            <td>{row.underDr}</td>
                                            <td>{row.admissionNo}</td>
                                            <td>{row.phoneNo}</td>
                                            <td>{row.bedNo}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className="card-footer p-3 bg-light border-top">
                        <div className="d-flex flex-wrap justify-content-center justify-content-md-end gap-2">
                            <button type="button" className="btn btn-outline-secondary rounded-pill px-4"><i className="bi bi-file-earmark-plus me-1"></i>New</button>
                            <button type="button" className="btn btn-outline-primary rounded-pill px-4"><i className="bi bi-pencil-square me-1"></i>Edit</button>
                            <button type="button" className="btn btn-dark rounded-pill px-4" disabled><i className="bi bi-floppy-fill me-1"></i>Save</button>
                            <button type="button" className="btn btn-outline-danger rounded-pill px-4"><i className="bi bi-trash2-fill me-1"></i>Delete</button>
                            <button type="button" className="btn btn-outline-warning text-dark rounded-pill px-4"><i className="bi bi-arrow-counterclockwise me-1"></i>Undo</button>
                            <button type="button" className="btn btn-outline-success rounded-pill px-4"><i className="bi bi-printer-fill me-1"></i>Print</button>
                            <button type="button" className="btn btn-dark rounded-pill px-4"><i className="bi bi-x-lg me-1"></i>Exit</button>
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>
    );
};

export default DischargeAndAdvise;

























