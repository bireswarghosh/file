// import { useState } from "react";
// import MasterLayout from "../../MasterLayout";
// import Breadcrumb from "../../Breadcrumb";

// const ReferralMaster = () => {
//   const [activeTab, setActiveTab] = useState("list");
//   const [selectedReferral, setSelectedReferral] = useState(null);

//   const [referralData] = useState([
//     { id: 1, name: "Dr. Anil Sharma", contactPerson: "Anil Sharma", phone: "9876543210", email: "anil.sharma@hospital.com", commissionRate: 5, active: true },
//     { id: 2, name: "City Hospital", contactPerson: "Rita Mehta", phone: "8765432109", email: "rita.mehta@cityhospital.com", commissionRate: 3, active: true },
//     { id: 3, name: "Health Agent Pvt Ltd", contactPerson: "Vikram Singh", phone: "7654321098", email: "vikram@healthagent.com", commissionRate: 7, active: false },
//   ]);

//   const [formData, setFormData] = useState({
//     name: "",
//     contactPerson: "",
//     phone: "",
//     email: "",
//     commissionRate: 0,
//   });

//   const handleReferralSelect = (referral) => {
//     setFormData({
//       name: referral.name,
//       contactPerson: referral.contactPerson,
//       phone: referral.phone,
//       email: referral.email,
//       commissionRate: referral.commissionRate,
//     });
//     setSelectedReferral(referral);
//     setActiveTab("detail");
//   };

//   const handleNewReferral = () => {
//     setFormData({
//       name: "",
//       contactPerson: "",
//       phone: "",
//       email: "",
//       commissionRate: 0,
//     });
//     setSelectedReferral(null);
//     setActiveTab("detail");
//   };

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleCloseDetail = () => {
//     setActiveTab("list");
//     setSelectedReferral(null);
//   };

//   return (
//     <MasterLayout>
//       <Breadcrumb title="Referral Master" />
//       <div className="container-fluid py-4">
//         {/* Referral List Tab */}
//         {activeTab === "list" && (
//           <div className="card shadow border-0 rounded-4">
//             <div className="card-header border-bottom d-flex justify-content-between align-items-center">
//               <h5 className="mb-0">👥 Referral Master - List</h5>
//               <button
//                 className="btn btn-gradient-primary px-4 py-2 rounded-pill shadow-lg"
//                 onClick={handleNewReferral}
//                 style={{
//                   background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
//                   border: "none",
//                   color: "white",
//                   fontWeight: "600",
//                   fontSize: "14px",
//                   transition: "all 0.3s ease",
//                   boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.target.style.transform = "translateY(-2px)";
//                   e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.6)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.transform = "translateY(0)";
//                   e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
//                 }}
//               >
//                 ✨ ADD REFERRAL
//               </button>
//             </div>

//             <div className="card-body">
//               <div className="table-responsive" style={{ maxHeight: "60vh", overflowY: "auto" }}>
//                 <table className="table table-bordered table-sm table-striped table-hover align-middle">
//                   <thead className="table-primary sticky-top">
//                     <tr>
//                       <th>Name</th>
//                       <th>Contact Person</th>
//                       <th className="text-end">Commission Rate (%)</th>
//                       <th className="text-center">Status</th>
//                       <th className="text-center">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {referralData.map((referral) => (
//                       <tr key={referral.id}>
//                         <td>{referral.name}</td>
//                         <td>{referral.contactPerson}</td>
//                         <td className="text-end">{referral.commissionRate}%</td>
//                         <td className="text-center">
//                           <span className={`badge ${referral.active ? 'bg-success' : 'bg-danger'}`}>
//                             {referral.active ? '🟢 Active' : '🔴 Inactive'}
//                           </span>
//                         </td>
//                         <td className="text-center">
//                           <button
//                             className="btn btn-outline-primary btn-sm"
//                             onClick={() => handleReferralSelect(referral)}
//                           >
//                             👁️ {selectedReferral === referral ? "Editing" : "View Details"}
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Referral Detail Tab */}
//         {activeTab === "detail" && selectedReferral !== null && (
//           <div
//             className="card shadow border-0 rounded-4"
//             style={{ background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}
//           >
//             <div
//               className="card-header text-white rounded-top-4"
//               style={{ background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)" }}
//             >
//               <div className="d-flex justify-content-between align-items-center">
//                 <h5 className="mb-0">👥 Referral Details</h5>
//                 <button className="btn btn-outline-light btn-sm" onClick={handleCloseDetail}>
//                   ✖️ Close
//                 </button>
//               </div>
//             </div>

//             <div className="card-body p-4">
//               {/* Referral Basic Info */}
//               <div className="row g-3 mb-4">
//                 <div className="col-md-6">
//                   <label className="form-label fw-bold text-primary">🏷️ Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={formData.name}
//                     onChange={(e) => handleInputChange("name", e.target.value)}
//                     style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label fw-bold text-primary">👤 Contact Person</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={formData.contactPerson}
//                     onChange={(e) => handleInputChange("contactPerson", e.target.value)}
//                     style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label fw-bold text-primary">📞 Phone</label>
//                   <input
//                     type="tel"
//                     className="form-control"
//                     value={formData.phone}
//                     onChange={(e) => handleInputChange("phone", e.target.value)}
//                     style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label fw-bold text-primary">📧 Email</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     value={formData.email}
//                     onChange={(e) => handleInputChange("email", e.target.value)}
//                     style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label fw-bold text-primary">💸 Commission Rate (%)</label>
//                   <div className="input-group">
//                     <input
//                       type="number"
//                       className="form-control"
//                       value={formData.commissionRate}
//                       onChange={(e) => handleInputChange("commissionRate", Number(e.target.value) || 0)}
//                       style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
//                     />
//                     <span
//                       className="input-group-text"
//                       style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3", color: "#1976d2" }}
//                     >
//                       %
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Commission Summary */}
//               <div
//                 className="card mb-4"
//                 style={{ background: "linear-gradient(45deg, #d4edda 0%, #c3e6cb 100%)", border: "3px solid #28a745" }}
//               >
//                 <div className="card-body text-center">
//                   <h6 className="card-title fw-bold text-success mb-2">💸 Commission Rate</h6>
//                   <h2 className="text-success fw-bold mb-0">
//                     {formData.commissionRate}% ({(formData.commissionRate / 100 * 1000).toLocaleString("en-IN", { minimumFractionDigits: 2 })} ₹ for ₹1000)
//                   </h2>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </MasterLayout>
//   );
// };

// export default ReferralMaster;
































import { useState } from "react";
import MasterLayout from "../../MasterLayout";
import Breadcrumb from "../../Breadcrumb";

const ReferralMaster = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [selectedReferral, setSelectedReferral] = useState(null);

  const [referralData] = useState([
    { id: 1, name: "Dr. Anil Sharma", contactPerson: "Anil Sharma", phone: "9876543210", email: "anil.sharma@hospital.com", commissionRate: 5, active: true },
    { id: 2, name: "City Hospital", contactPerson: "Rita Mehta", phone: "8765432109", email: "rita.mehta@cityhospital.com", commissionRate: 3, active: true },
    { id: 3, name: "Health Agent Pvt Ltd", contactPerson: "Vikram Singh", phone: "7654321098", email: "vikram@healthagent.com", commissionRate: 7, active: false },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    contactPerson: "",
    phone: "",
    email: "",
    commissionRate: 0,
  });

  const handleReferralSelect = (referral) => {
    setFormData({
      name: referral.name,
      contactPerson: referral.contactPerson,
      phone: referral.phone,
      email: referral.email,
      commissionRate: referral.commissionRate,
    });
    setSelectedReferral(referral);
    setActiveTab("detail");
  };

  const handleNewReferral = () => {
    setFormData({
      name: "",
      contactPerson: "",
      phone: "",
      email: "",
      commissionRate: 0,
    });
    setSelectedReferral(null);
    setActiveTab("detail"); // Switches to detail view
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCloseDetail = () => {
    setActiveTab("list");
    setSelectedReferral(null);
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Referral Master" />
      <div className="container-fluid py-4">
        {/* Referral List Tab */}
        {activeTab === "list" && (
          <div className="card shadow border-0 rounded-4">
            <div className="card-header border-bottom d-flex justify-content-between align-items-center">
              <h5 className="mb-0">👥 Referral Master - List</h5>
              <button
                className="btn btn-gradient-primary px-4 py-2 rounded-pill shadow-lg"
                onClick={handleNewReferral}
                style={{
                  background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                  color: "white",
                  fontWeight: "600",
                  fontSize: "14px",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
                }}
              >
                ✨ ADD REFERRAL 
              </button>
            </div>

            <div className="card-body">
              <div className="table-responsive" style={{ maxHeight: "60vh", overflowY: "auto" }}>
                <table className="table table-bordered table-sm table-striped table-hover align-middle">
                  <thead className="table-primary sticky-top">
                    <tr>
                      <th>Name</th>
                      <th>Contact Person</th>
                      <th className="text-end">Commission Rate (%)</th>
                      <th className="text-center">Status</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referralData.map((referral) => (
                      <tr key={referral.id}>
                        <td>{referral.name}</td>
                        <td>{referral.contactPerson}</td>
                        <td className="text-end">{referral.commissionRate}%</td>
                        <td className="text-center">
                          <span className={`badge ${referral.active ? 'bg-success' : 'bg-danger'}`}>
                            {referral.active ? '🟢 Active' : '🔴 Inactive'}
                          </span>
                        </td>
                        <td className="text-center">
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => handleReferralSelect(referral)}
                          >
                            👁️ {selectedReferral === referral ? "Editing" : "View Details"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Referral Detail Tab */}
        {activeTab === "detail" && (
          <div
            className="card shadow border-0 rounded-4"
            style={{ background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}
          >
            <div
              className="card-header text-white rounded-top-4"
              style={{ background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)" }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">👥 Referral Details</h5>
                <button className="btn btn-outline-light btn-sm" onClick={handleCloseDetail}>
                  ✖️ Close
                </button>
              </div>
            </div>

            <div className="card-body p-4">
              {/* Referral Basic Info */}
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label className="form-label fw-bold text-primary">🏷️ Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold text-primary">👤 Contact Person</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.contactPerson}
                    onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                    style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold text-primary">📞 Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold text-primary">📧 Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold text-primary">💸 Commission Rate (%)</label>
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      value={formData.commissionRate}
                      onChange={(e) => handleInputChange("commissionRate", Number(e.target.value) || 0)}
                      style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                    />
                    <span
                      className="input-group-text"
                      style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3", color: "#1976d2" }}
                    >
                      %
                    </span>
                  </div>
                </div>
              </div>

              {/* Commission Summary */}
              <div
                className="card mb-4"
                style={{ background: "linear-gradient(45deg, #d4edda 0%, #c3e6cb 100%)", border: "3px solid #28a745" }}
              >
                <div className="card-body text-center">
                  <h6 className="card-title fw-bold text-success mb-2">💸 Commission Rate</h6>
                  <h2 className="text-success fw-bold mb-0">
                    {formData.commissionRate}% ({(formData.commissionRate / 100 * 1000).toLocaleString("en-IN", { minimumFractionDigits: 2 })} ₹ for ₹1000)
                  </h2>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MasterLayout>
  );
};

export default ReferralMaster;
