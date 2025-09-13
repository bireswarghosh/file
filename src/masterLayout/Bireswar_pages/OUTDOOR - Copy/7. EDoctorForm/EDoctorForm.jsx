// import React from 'react';
// import MasterLayout from '../../../MasterLayout';
// import Breadcrumb from '../../../Breadcrumb';

// function ModernFantasticDoctorForm() {
//   // Example states for switches
//   const [isRMO, setIsRMO] = React.useState(false);
//   const [isIndoor, setIsIndoor] = React.useState(false);
//   const [inPanelList, setInPanelList] = React.useState(true);
//   const [calculateCommission, setCalculateCommission] = React.useState(false);
//   const [notRequiredPanel, setNotRequiredPanel] = React.useState(false);
//   const [profilePicturePreview, setProfilePicturePreview] = React.useState(null);

//   const handlePictureChange = (event) => {
//     if (event.target.files && event.target.files[0]) {
//       setProfilePicturePreview(URL.createObjectURL(event.target.files[0]));
//     } else {
//       setProfilePicturePreview(null);
//     }
//   };

//   return (
//     <MasterLayout>
//       <Breadcrumb title="Doctor Profile Management" />
//       <div className="container py-5">
//         <div className="card shadow-xl border-0 rounded-4 overflow-hidden">
          
//           <div className="card-header bg-gradient-primary text-white py-4">
//             <h3 className="mb-0 fw-bold d-flex align-items-center">
//               Doctor Profile Management
//             </h3>
//           </div>

//           <div className="card-body p-4 p-md-5">
//             {/* --- Section: Basic Information --- */}
//             <section className="mb-5">
//               <h5 className="text-primary fw-semibold mb-4 pb-2 border-bottom border-primary-subtle">
//                 Basic Information
//               </h5>
//               <div className="row g-4">
//                 <div className="col-md-2">
//                   <label htmlFor="doctorTitle" className="form-label fw-medium">Title</label>
//                   <select id="doctorTitle" className="form-select form-select-lg rounded-3">
//                     <option>Dr.</option>
//                     <option>Prof.</option>
//                   </select>
//                 </div>
//                 <div className="col-md-5">
//                   <label htmlFor="doctorName" className="form-label fw-medium">Full Name</label>
//                   <input type="text" className="form-control form-control-lg rounded-3" id="doctorName" placeholder="e.g., Johnathan Doe" />
//                 </div>
//                 <div className="col-md-5">
//                   <label htmlFor="createDate" className="form-label fw-medium">Profile Creation Date</label>
//                   <input type="date" className="form-control form-control-lg rounded-3" id="createDate" defaultValue="2025-05-24" />
//                 </div>
//                 <div className="col-12">
//                   <label htmlFor="identification" className="form-label fw-medium">Unique Identification (License No., etc.)</label>
//                   <input type="text" className="form-control form-control-lg rounded-3" id="identification" placeholder="Enter identification number" />
//                 </div>
//               </div>
//             </section>

//             {/* --- Section: Contact & Address --- */}
//             <section className="mb-5">
//               <h5 className="text-primary fw-semibold mb-4 pb-2 border-bottom border-primary-subtle">
//                 Contact & Location
//               </h5>
//               <div className="row g-4">
//                 <div className="col-12">
//                   <label htmlFor="address1" className="form-label fw-medium">Full Address</label>
//                   <input type="text" className="form-control form-control-lg rounded-3 mb-2" id="address1" placeholder="Street Address, Building, Apt No." />
//                   <input type="text" className="form-control form-control-lg rounded-3 mb-2" id="address2" placeholder="Area / Locality" />
//                   <input type="text" className="form-control form-control-lg rounded-3" id="address3" placeholder="City, State - Postal Code" />
//                 </div>
//                 <div className="col-md-6">
//                   <label htmlFor="phoneNo" className="form-label fw-medium">Primary Phone</label>
//                   <input type="tel" className="form-control form-control-lg rounded-3" id="phoneNo" placeholder="+XX XXXXXXXXXX" />
//                 </div>
//                 <div className="col-md-6">
//                   <label htmlFor="faxNo" className="form-label fw-medium">Fax Number (Optional)</label>
//                   <input type="tel" className="form-control form-control-lg rounded-3" id="faxNo" placeholder="+XX XXXXXXXXXX" />
//                 </div>
//                 <div className="col-md-6">
//                   <label htmlFor="area" className="form-label fw-medium">Primary Service Area/Region</label>
//                   <input type="text" className="form-control form-control-lg rounded-3" id="area" placeholder="e.g., Central District" />
//                 </div>
//                 <div className="col-md-6">
//                   <label htmlFor="registrationNo" className="form-label fw-medium">Medical Registration No.</label>
//                   <input type="text" className="form-control form-control-lg rounded-3" id="registrationNo" placeholder="Official Registration ID" />
//                 </div>
//               </div>
//             </section>

//             {/* --- Section: Professional Details --- */}
//             <section className="mb-5">
//               <h5 className="text-primary fw-semibold mb-4 pb-2 border-bottom border-primary-subtle">
//                 Professional Details
//               </h5>
//               <div className="row g-4 align-items-center">
//                 <div className="col-12">
//                   <label htmlFor="qualification" className="form-label fw-medium">Qualifications & Specializations</label>
//                   <input type="text" className="form-control form-control-lg rounded-3" id="qualification" placeholder="e.g., MBBS, MD (Cardiology), FRCS" />
//                 </div>
//                 <div className="col-md-6">
//                   <div className="form-check form-switch form-check-lg p-3 border rounded-3 bg-light">
//                     <input className="form-check-input" type="checkbox" role="switch" id="rmoSwitch" checked={isRMO} onChange={() => setIsRMO(!isRMO)} />
//                     <label className="form-check-label fw-medium ms-2" htmlFor="rmoSwitch">Is R.M.O. (Resident Medical Officer)</label>
//                   </div>
//                 </div>
//                 <div className="col-md-6">
//                   <div className="form-check form-switch form-check-lg p-3 border rounded-3 bg-light">
//                     <input className="form-check-input" type="checkbox" role="switch" id="indoorSwitch" checked={isIndoor} onChange={() => setIsIndoor(!isIndoor)} />
//                     <label className="form-check-label fw-medium ms-2" htmlFor="indoorSwitch">Provides Indoor Patient Services</label>
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* --- Section: Standard Service Rates --- */}
//             <section className="mb-5">
//               <h5 className="text-primary fw-semibold mb-4 pb-2 border-bottom border-primary-subtle">
//                 Standard Service Rates
//               </h5>
//               <div className="row g-3">
//                 {[{label: 'Indoor Visit', id: 'indoorRate'}, {label: 'ICU Care', id: 'icuRate'}, {label: 'CAB Procedure', id: 'cabRate'}, {label: 'SUIT Therapy', id: 'suitRate'}].map(rate => (
//                   <div className="col-md-6 col-lg-3" key={rate.id}>
//                     <label htmlFor={rate.id} className="form-label fw-medium small text-muted">{rate.label} (Amt.)</label>
//                     <input type="number" className="form-control form-control-lg rounded-3 text-end" id={rate.id} defaultValue="0.00" step="0.01" placeholder="0.00"/>
//                   </div>
//                 ))}
//               </div>
//             </section>
            
//             {/* --- Combined Section: Affiliations & Picture --- */}
//             <div className="row g-lg-5 mb-5">
//               {/* --- Sub-Section: Affiliations, Panel & Commission --- */}
//               <div className="col-lg-7">
//                 <section className="p-4 border rounded-4 bg-light-soft shadow-sm h-100">
//                   <h5 className="text-primary fw-semibold mb-4">Affiliations & Financials</h5>
//                   <div className="mb-3">
//                     <label htmlFor="marketingExec" className="form-label fw-medium">Associated Marketing Executive</label>
//                     <input type="text" className="form-control rounded-3" id="marketingExec" placeholder="Executive's Name or ID"/>
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="doctorCategory" className="form-label fw-medium">Doctor's Category/Tier</label>
//                     <input type="text" className="form-control rounded-3" id="doctorCategory" placeholder="e.g., Senior, Junior, Specialist"/>
//                   </div>
//                   <div className="mb-3 p-3 border rounded-3 bg-white">
//                     <div className="form-check form-switch form-check-lg">
//                       <input className="form-check-input" type="checkbox" role="switch" id="inPanelListSwitch" checked={inPanelList} onChange={() => setInPanelList(!inPanelList)} />
//                       <label className="form-check-label fw-medium ms-2" htmlFor="inPanelListSwitch">Listed in Insurance Panel</label>
//                     </div>
//                     {inPanelList && (
//                       <div className="mt-2 ps-3 row gx-2 align-items-center">
//                         <div className="col-auto">
//                           <label htmlFor="panelPercentage" className="form-label fw-medium mb-0 small">Panel %:</label>
//                         </div>
//                         <div className="col" style={{maxWidth: '100px'}}>
//                           <input type="number" className="form-control form-control-sm rounded-3" id="panelPercentage" placeholder="0.00" step="0.01" />
//                         </div>
//                         <div className="col-auto">
//                           <div className="form-check">
//                             <input className="form-check-input" type="checkbox" id="notRequiredPanelCheck" checked={notRequiredPanel} onChange={() => setNotRequiredPanel(!notRequiredPanel)} />
//                             <label className="form-check-label small" htmlFor="notRequiredPanelCheck">Not Required</label>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                   <div className="mb-3 form-check form-switch form-check-lg p-3 border rounded-3 bg-white">
//                     <input className="form-check-input" type="checkbox" role="switch" id="calcCommissionSwitch" checked={calculateCommission} onChange={() => setCalculateCommission(!calculateCommission)} />
//                     <label className="form-check-label fw-medium ms-2" htmlFor="calcCommissionSwitch">Enable Commission Calculation</label>
//                   </div>
//                   <div>
//                     <label htmlFor="fixedDiscount" className="form-label fw-medium">Fixed Discount for Specific Cases (%)</label>
//                     <input type="number" className="form-control rounded-3" id="fixedDiscount" defaultValue="0.00" step="0.01" placeholder="e.g., 5 for 5%"/>
//                   </div>
//                 </section>
//               </div>

//               {/* --- Sub-Section: Profile Picture --- */}
//               <div className="col-lg-5 mt-4 mt-lg-0">
//                 <section className="p-4 border rounded-4 bg-light-soft shadow-sm text-center h-100 d-flex flex-column justify-content-between">
//                   <div>
//                     <h5 className="text-primary fw-semibold mb-3">Profile Picture</h5>
//                     <div 
//                       className="border-2 border-dashed rounded-3 mb-3 d-flex align-items-center justify-content-center mx-auto" 
//                       style={{ 
//                         width: '200px', height: '200px', 
//                         borderColor: '#adb5bd',
//                         backgroundSize: 'cover', 
//                         backgroundPosition: 'center',
//                         backgroundImage: profilePicturePreview ? `url(${profilePicturePreview})` : 'none',
//                         backgroundColor: !profilePicturePreview ? '#e9ecef' : 'transparent'
//                       }}>
//                       {!profilePicturePreview && <span className="text-muted small">Image Preview</span>}
//                     </div>
//                   </div>
//                   <div>
//                     <input type="file" className="form-control rounded-3" id="profilePictureUpload" accept="image/*" onChange={handlePictureChange} />
//                     {profilePicturePreview && 
//                       <button 
//                         type="button" 
//                         className="btn btn-sm btn-outline-danger mt-2 w-100 rounded-pill" 
//                         onClick={() => { setProfilePicturePreview(null); document.getElementById('profilePictureUpload').value = null; }}>
//                         Remove
//                       </button>
//                     }
//                   </div>
//                 </section>
//               </div>
//             </div>

//             {/* --- Action Buttons --- */}
//             <div className="pt-4 mt-5 border-top">
//               <div className="d-flex flex-column flex-md-row justify-content-center justify-content-md-end gap-2">
//                 <button type="button" className="btn btn-outline-secondary btn-lg rounded-pill px-4">
//                   Exit
//                 </button>
//                 <button type="button" className="btn btn-info text-white btn-lg rounded-pill px-4">
//                   Print
//                 </button>
//                 <button type="button" className="btn btn-warning text-dark btn-lg rounded-pill px-4">
//                   Undo
//                 </button>
//                 <button type="button" className="btn btn-danger btn-lg rounded-pill px-4">
//                   Delete
//                 </button>
//                 <button type="button" className="btn btn-success btn-lg rounded-pill px-4">
//                   Edit
//                 </button>
//                 <button type="submit" className="btn btn-primary btn-lg rounded-pill px-5 fw-bold">
//                   Save Profile
//                 </button>
//               </div>
//             </div>

//           </div> {/* End card-body */}
//         </div> {/* End card */}
//       </div>
//     </MasterLayout>
//   );
// }

// export default ModernFantasticDoctorForm;











import React from 'react';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';

// For a real app, ensure Bootstrap Icons CSS is linked, or use an icon library
// Example: <i className="bi bi-person-badge-fill"></i>

function CreativeDoctorProfileForm() {
  // Example states for switches
  const [isRMO, setIsRMO] = React.useState(false);
  const [isIndoor, setIsIndoor] = React.useState(false);
  const [inPanelList, setInPanelList] = React.useState(true);
  const [calculateCommission, setCalculateCommission] = React.useState(false);
  const [notRequiredPanel, setNotRequiredPanel] = React.useState(false);
  const [profilePicturePreview, setProfilePicturePreview] = React.useState(null);

  const handlePictureChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePicturePreview(URL.createObjectURL(event.target.files[0]));
    } else {
      setProfilePicturePreview(null);
    }
  };

  const SectionHeader = ({ title, iconClass }) => (
    <div className="d-flex align-items-center mb-4">
      <span className="bg-gradient-purple rounded-start-pill" style={{width: '10px', height: '36px', display: 'inline-block'}}></span>
      <h4 className="fw-bolder mb-0 ps-3 text-purple-dark"> {/* Custom text color class */}
        {iconClass && <i className={`${iconClass} me-2 fs-4 align-middle`}></i>}
        {title}
      </h4>
    </div>
  );


  return (
    <MasterLayout>
      <Breadcrumb title="Doctor Profile Management" />
      <div className="container py-5 creative-form-page"> {/* Added class for page-level styling */}
        <div className="card shadow-xl border-0 rounded-5 overflow-hidden"> {/* Even more rounded */}
          
          <div className="card-header text-white py-4 px-4 px-md-5" style={{ background: 'linear-gradient(135deg, hsl(260, 70%, 55%) 0%, hsl(260, 90%, 40%) 100%)' }}> {/* Custom Purple Gradient */}
            <div className="d-flex align-items-center">
              <i className="bi bi-heart-pulse-fill display-4 me-3"></i> {/* BS Icon */}
              <div>
                <h2 className="mb-0 fw-bolder">Doctor Profile</h2>
                <p className="mb-0 opacity-75 small">Comprehensive details and configuration</p>
              </div>
            </div>
          </div>

          <div className="card-body p-4 p-md-5">
            {/* --- Section: Basic Information --- */}
            <section className="mb-5">
              <SectionHeader title="Basic & Identification" iconClass="bi bi-person-badge-fill" />
              <div className="row g-4">
                <div className="col-md-2">
                  <label htmlFor="doctorTitle" className="form-label fw-medium">Title</label>
                  <select id="doctorTitle" className="form-select form-select-lg rounded-3">
                    <option>Dr.</option>
                    <option>Prof.</option>
                  </select>
                </div>
                <div className="col-md-5">
                  <label htmlFor="doctorName" className="form-label fw-medium">Full Name</label>
                  <input type="text" className="form-control form-control-lg rounded-3" id="doctorName" placeholder="e.g., Dr. Evelyn Reed" />
                </div>
                <div className="col-md-5">
                  <label htmlFor="createDate" className="form-label fw-medium">Profile Since</label>
                  <input type="date" className="form-control form-control-lg rounded-3" id="createDate" defaultValue="2025-05-24" />
                </div>
                <div className="col-12">
                  <label htmlFor="identification" className="form-label fw-medium">Unique Identification (License No.)</label>
                  <input type="text" className="form-control form-control-lg rounded-3" id="identification" placeholder="Enter license or unique ID" />
                </div>
              </div>
            </section>

            {/* --- Section: Contact & Address --- */}
            <section className="mb-5">
              <SectionHeader title="Contact & Location" iconClass="bi bi-geo-alt-fill" />
              <div className="row g-4">
                <div className="col-12">
                  <label htmlFor="address1" className="form-label fw-medium">Full Address</label>
                  <input type="text" className="form-control form-control-lg rounded-3 mb-2" id="address1" placeholder="Street Address, Building, Apt No." />
                  <input type="text" className="form-control form-control-lg rounded-3 mb-2" id="address2" placeholder="Area / Locality" />
                  <input type="text" className="form-control form-control-lg rounded-3" id="address3" placeholder="City, State - Postal Code" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="phoneNo" className="form-label fw-medium">Primary Phone</label>
                  <div className="input-group input-group-lg">
                    <span className="input-group-text bg-light border-end-0 rounded-start-3"><i className="bi bi-telephone-fill text-purple"></i></span>
                    <input type="tel" className="form-control border-start-0 rounded-end-3" id="phoneNo" placeholder="+XX XXXXXXXXXX" />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="faxNo" className="form-label fw-medium">Fax Number (Optional)</label>
                  <div className="input-group input-group-lg">
                    <span className="input-group-text bg-light border-end-0 rounded-start-3"><i className="bi bi-printer-fill text-purple"></i></span>
                    <input type="tel" className="form-control border-start-0 rounded-end-3" id="faxNo" placeholder="+XX XXXXXXXXXX" />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="area" className="form-label fw-medium">Primary Service Area/Region</label>
                  <input type="text" className="form-control form-control-lg rounded-3" id="area" placeholder="e.g., Central District" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="registrationNo" className="form-label fw-medium">Medical Registration No.</label>
                  <input type="text" className="form-control form-control-lg rounded-3" id="registrationNo" placeholder="Official Registration ID" />
                </div>
              </div>
            </section>

            {/* --- Section: Professional Details --- */}
            <section className="mb-5">
              <SectionHeader title="Professional Status" iconClass="bi bi-briefcase-fill" />
              <div className="row g-4 align-items-center">
                <div className="col-12">
                  <label htmlFor="qualification" className="form-label fw-medium">Qualifications & Specializations</label>
                  <textarea className="form-control form-control-lg rounded-3" id="qualification" rows="3" placeholder="e.g., MBBS, MD (Cardiology), FRCS&#10;List multiple separated by comma or new line"></textarea>
                </div>
                <div className="col-md-6">
                  <div className="p-3 rounded-4 shadow-sm border bg-white creative-switch-box">
                    <div className="form-check form-switch form-check-lg">
                      <input className="form-check-input" type="checkbox" role="switch" id="rmoSwitch" checked={isRMO} onChange={() => setIsRMO(!isRMO)} />
                      <label className="form-check-label fw-semibold ms-2" htmlFor="rmoSwitch">R.M.O. Status</label>
                    </div>
                    <small className="d-block text-muted mt-1 ms-5 ps-1">Is Resident Medical Officer</small>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-3 rounded-4 shadow-sm border bg-white creative-switch-box">
                    <div className="form-check form-switch form-check-lg">
                      <input className="form-check-input" type="checkbox" role="switch" id="indoorSwitch" checked={isIndoor} onChange={() => setIsIndoor(!isIndoor)} />
                      <label className="form-check-label fw-semibold ms-2" htmlFor="indoorSwitch">Indoor Services</label>
                    </div>
                    <small className="d-block text-muted mt-1 ms-5 ps-1">Provides Indoor Patient Services</small>
                  </div>
                </div>
              </div>
            </section>

            {/* --- Section: Standard Service Rates --- */}
            <section className="mb-5">
              <SectionHeader title="Standard Service Rates" iconClass="bi bi-tags-fill" />
              <div className="row g-3">
                {[{label: 'Indoor Visit', id: 'indoorRate', icon: 'bi-clipboard-pulse'}, {label: 'ICU Care', id: 'icuRate', icon: 'bi-activity'}, {label: 'CAB Procedure', id: 'cabRate', icon: 'bi-bandaid-fill'}, {label: 'SUIT Therapy', id: 'suitRate', icon: 'bi-lungs-fill'}].map(rate => (
                  <div className="col-md-6 col-lg-3" key={rate.id}>
                    <label htmlFor={rate.id} className="form-label fw-medium small text-muted">{rate.label}</label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-text bg-light border-end-0 rounded-start-3"><i className={`bi ${rate.icon} text-purple-dark`}></i></span>
                      <input type="number" className="form-control border-start-0 rounded-end-3 text-end" id={rate.id} defaultValue="0.00" step="0.01" placeholder="0.00"/>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            
            {/* --- Combined Section: Affiliations & Picture --- */}
            <div className="row g-lg-4 mb-5">
              <div className="col-lg-7">
                <div className="p-4 border rounded-4 shadow-sm h-100 bg-light-purple-soft"> {/* Custom light bg */}
                  <SectionHeader title="Affiliations & Financials" iconClass="bi bi-bank2" />
                  <div className="mb-3">
                    <label htmlFor="marketingExec" className="form-label fw-medium">Associated Marketing Executive</label>
                    <input type="text" className="form-control form-control-lg rounded-3" id="marketingExec" placeholder="Executive's Name or ID"/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="doctorCategory" className="form-label fw-medium">Doctor's Category/Tier</label>
                    <input type="text" className="form-control form-control-lg rounded-3" id="doctorCategory" placeholder="e.g., Senior, Junior, Specialist"/>
                  </div>
                  <div className="p-3 mb-3 rounded-3 border bg-white shadow-sm creative-switch-box-nested">
                    <div className="form-check form-switch form-check-lg">
                      <input className="form-check-input" type="checkbox" role="switch" id="inPanelListSwitch" checked={inPanelList} onChange={() => setInPanelList(!inPanelList)} />
                      <label className="form-check-label fw-semibold ms-2" htmlFor="inPanelListSwitch">Insurance Panel Listing</label>
                    </div>
                    {inPanelList && (
                      <div className="mt-2 ps-4 row gx-2 align-items-center">
                        <div className="col-auto">
                          <label htmlFor="panelPercentage" className="form-label fw-medium mb-0 small">Panel %:</label>
                        </div>
                        <div className="col" style={{maxWidth: '100px'}}>
                          <input type="number" className="form-control form-control-sm rounded-3" id="panelPercentage" placeholder="0.00" step="0.01" />
                        </div>
                        <div className="col-auto">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="notRequiredPanelCheck" checked={notRequiredPanel} onChange={() => setNotRequiredPanel(!notRequiredPanel)} />
                            <label className="form-check-label small" htmlFor="notRequiredPanelCheck">Not Required</label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-3 mb-3 rounded-3 border bg-white shadow-sm creative-switch-box-nested">
                    <div className="form-check form-switch form-check-lg">
                      <input className="form-check-input" type="checkbox" role="switch" id="calcCommissionSwitch" checked={calculateCommission} onChange={() => setCalculateCommission(!calculateCommission)} />
                      <label className="form-check-label fw-semibold ms-2" htmlFor="calcCommissionSwitch">Commission Calculation</label>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="fixedDiscount" className="form-label fw-medium">Fixed Discount (%)</label>
                    <input type="number" className="form-control form-control-lg rounded-3" id="fixedDiscount" defaultValue="0.00" step="0.01" placeholder="e.g., 5 for 5%"/>
                  </div>
                </div>
              </div>

              <div className="col-lg-5 mt-4 mt-lg-0">
                <div className="p-4 border rounded-4 shadow-sm text-center h-100 d-flex flex-column justify-content-center align-items-center bg-light-purple-soft profile-upload-area">
                   <h5 className="text-purple-dark fw-semibold mb-3"><i className="bi bi-image-fill me-2"></i>Profile Image</h5>
                  <label htmlFor="profilePictureUploadCreative" className="profile-picture-uploader rounded-circle d-flex align-items-center justify-content-center mb-3"
                    style={{ 
                      width: '200px', height: '200px', 
                      border: '4px dashed #a29bfe', /* Softer dashed border */
                      backgroundImage: profilePicturePreview ? `url(${profilePicturePreview})` : 'none',
                      backgroundSize: 'cover', backgroundPosition: 'center',
                      cursor: 'pointer',
                      backgroundColor: !profilePicturePreview ? 'rgba(223, 217, 255, 0.3)' : 'transparent', /* Very light purple tint */
                      transition: 'all 0.3s ease'
                    }}>
                    {!profilePicturePreview && (
                      <div className="text-center text-purple-dark-muted">
                        <i className="bi bi-cloud-arrow-up-fill display-3 mb-2"></i>
                        <p className="mb-0 fw-semibold">Click or Drag Image</p>
                        <small className="d-block">Max 5MB. JPG, PNG</small>
                      </div>
                    )}
                  </label>
                  <input type="file" className="d-none" id="profilePictureUploadCreative" accept="image/*" onChange={handlePictureChange} />
                  {profilePicturePreview && 
                    <button type="button" className="btn btn-sm btn-outline-danger rounded-pill w-75" 
                      onClick={() => { setProfilePicturePreview(null); document.getElementById('profilePictureUploadCreative').value = null; }}>
                      <i className="bi bi-trash3-fill me-1"></i> Remove Image
                    </button>
                  }
                </div>
              </div>
            </div>

            {/* --- Action Buttons --- */}
            <div className="pt-5 mt-5 border-top border-2 border-light-subtle"> {/* Softer border */}
              <div className="d-flex flex-column flex-md-row justify-content-end gap-3"> {/* justify-content-end and gap-3 */}
                <button type="button" className="btn btn-outline-secondary btn-lg rounded-pill px-4 py-2 fw-medium">
                  <i className="bi bi-x-circle me-2"></i>Exit
                </button>
                <button type="button" className="btn btn-outline-info btn-lg rounded-pill px-4 py-2 fw-medium">
                  <i className="bi bi-printer me-2"></i>Print
                </button>
                <button type="button" className="btn btn-danger btn-lg rounded-pill px-4 py-2 fw-medium">
                   <i className="bi bi-trash3 me-2"></i>Delete
                </button>
                <button type="submit" className="btn btn-lg rounded-pill px-5 py-2 fw-bolder shadow-lg text-white" style={{background: 'linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)', border: 'none'}}> {/* Vibrant Save Button */}
                  <i className="bi bi-check-circle-fill me-2"></i>Save Doctor Profile
                </button>
              </div>
            </div>
          </div> {/* End card-body */}
        </div> {/* End card */}
      </div>
    </MasterLayout>
  );
}

export default CreativeDoctorProfileForm;

/*
  CSS Customizations (place in your CSS file for .creative-form-page and sub-elements):

  .creative-form-page body { // If you want to scope font to this page via a parent class
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; // Example: Poppins
  }

  .bg-gradient-purple { // For section header accent bar
    background-image: linear-gradient(135deg, hsl(260, 70%, 65%) 0%, hsl(260, 90%, 50%) 100%) !important;
  }
  .text-purple-dark {
    color: hsl(260, 60%, 35%) !important;
  }
  .text-purple-dark-muted {
    color: hsl(260, 40%, 55%) !important;
  }
  .text-purple {
    color: hsl(260, 70%, 55%) !important;
  }
  .bg-light-purple-soft {
      background-color: hsla(260, 80%, 97%, 1) !important;
  }

  .form-control-lg, .form-select-lg {
    // font-size: 0.95rem; // Slightly smaller than default BS lg if needed
    // box-shadow: 0 2px 5px rgba(0,0,0,0.03) inset; // Subtle inset shadow
  }

  .form-control:focus, .form-select:focus {
    border-color: hsl(260, 70%, 60%);
    box-shadow: 0 0 0 0.25rem hsla(260, 70%, 60%, 0.25);
  }

  .input-group-text {
    // border-color: #ced4da; // Ensure consistent border
  }
  .input-group-lg > .form-control,
  .input-group-lg > .input-group-text,
  .input-group-lg > .form-select {
    // border-radius: 0.5rem !important; // Ensure consistent rounding with .rounded-3 on input
  }
   .input-group-lg .input-group-text:first-child { border-top-right-radius: 0 !important; border-bottom-right-radius: 0 !important;}
   .input-group-lg .form-control:not(:first-child) { border-top-left-radius: 0 !important; border-bottom-left-radius: 0 !important;}


  .creative-switch-box {
    transition: all 0.3s ease;
    // background-color: #ffffff;
  }
  .creative-switch-box:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.15) !important;
  }
  .creative-switch-box-nested { // For switches inside affiliation box
     transition: all 0.2s ease;
  }
  .creative-switch-box-nested:hover {
     background-color: #f8f9fa !important; // Slightly different hover
     transform: scale(1.02);
  }


  .profile-picture-uploader:hover {
    border-color: hsl(260, 70%, 55%) !important;
    background-color: hsla(260, 80%, 90%, 0.5) !important;
  }
  .profile-picture-uploader:hover .text-purple-dark-muted {
     color: hsl(260, 70%, 55%) !important;
  }


  .btn {
    // letter-spacing: 0.5px;
  }
  .btn-lg.rounded-pill {
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
  }
  .btn-primary { // Example primary button styling override
    // background-color: hsl(260, 70%, 55%);
    // border-color: hsl(260, 70%, 55%);
  }
  .btn-primary:hover {
    // background-color: hsl(260, 70%, 45%);
    // border-color: hsl(260, 70%, 45%);
  }
*/