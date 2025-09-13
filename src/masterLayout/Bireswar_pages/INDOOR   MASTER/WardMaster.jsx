






















// import { useState } from "react";
// import MasterLayout from "../../MasterLayout";
// import Breadcrumb from "../../Breadcrumb";

// const WardMaster = () => {
//   const [activeTab, setActiveTab] = useState("list");
//   const [selectedWard, setSelectedWard] = useState(null); // Still for Ward selection in list

//   // Ward data remains the same
//   const [wardData] = useState([
//     { id: 1, wardName: "ICU", capacity: 10, active: true },
//     { id: 2, wardName: "General Ward", capacity: 20, active: true },
//     { id: 3, wardName: "Pediatric Ward", capacity: 15, active: false },
//   ]);

//   // State for Batch details, mirroring the image
//   const [batchFormData, setBatchFormData] = useState({
//     itemName: "",
//     batchNo: "",
//     expDate: "", // Storing as string, consider Date object or specific date picker
//     vatInclusive: false,
//     mrpVatRate: 0,
//     mrp: 0,
//   });

//   const [showBatchModal, setShowBatchModal] = useState(false);
//   const [currentBatch, setCurrentBatch] = useState(null); // To store batch being edited

//   const handleWardSelect = (ward) => {
//     // When a ward is selected, we still show ward details first,
//     // but the intention is to manage batches within a ward or separately.
//     // For this example, I'll allow opening the batch modal from the ward detail or list.
//     setSelectedWard(ward);
//     setActiveTab("detail"); // Still goes to the ward detail view
//   };

//   const handleNewWard = () => {
//     setSelectedWard(null);
//     setActiveTab("detail"); // Switches to detail view for a new ward
//     // No batch specific action here initially, it's for ward creation
//     setBatchFormData({
//       itemName: "",
//       batchNo: "",
//       expDate: "",
//       vatInclusive: false,
//       mrpVatRate: 0,
//       mrp: 0,
//     });
//     setCurrentBatch(null); // Clear any previous batch selection
//   };

//   // Handler for Batch form input changes
//   const handleBatchInputChange = (field, value) => {
//     setBatchFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleCloseDetail = () => {
//     setActiveTab("list");
//     setSelectedWard(null);
//   };

//   // Functions for Batch Modal
//   const handleOpenBatchModal = (batch = null) => {
//     if (batch) {
//       setBatchFormData({
//         itemName: batch.itemName,
//         batchNo: batch.batchNo,
//         expDate: batch.expDate,
//         vatInclusive: batch.vatInclusive,
//         mrpVatRate: batch.mrpVatRate,
//         mrp: batch.mrp,
//       });
//       setCurrentBatch(batch);
//     } else {
//       setBatchFormData({
//         itemName: "",
//         batchNo: "",
//         expDate: "",
//         vatInclusive: false,
//         mrpVatRate: 0,
//         mrp: 0,
//       });
//       setCurrentBatch(null);
//     }
//     setShowBatchModal(true);
//   };

//   const handleCloseBatchModal = () => {
//     setShowBatchModal(false);
//     // Optionally reset batchFormData here if you always want it clear on close
//     setBatchFormData({
//       itemName: "",
//       batchNo: "",
//       expDate: "",
//       vatInclusive: false,
//       mrpVatRate: 0,
//       mrp: 0,
//     });
//     setCurrentBatch(null);
//   };

//   const handleSaveBatch = () => {
//     console.log("Saving Batch Data:", batchFormData);
//     // Here you would typically send batchFormData to an API
//     // or update a local state array of batches.
//     // For this example, we'll just close the modal.
//     handleCloseBatchModal();
//   };

//   return (
//     <MasterLayout>
//       <Breadcrumb title="Ward Master" />
//       <div className="container-fluid py-4">
//         {/* Ward List Tab */}
//         {activeTab === "list" && (
//           <div className="card shadow border-0 rounded-4">
//             <div className="card-header border-bottom d-flex justify-content-between align-items-center">
//               <h5 className="mb-0">🏠 Ward Master - List</h5>
//               <button
//                 className="btn btn-gradient-primary px-4 py-2 rounded-pill shadow-lg"
//                 onClick={() => handleOpenBatchModal()}
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
//                 ✨ ADD WARD
//               </button>
//             </div>

//             <div className="card-body">
//               <div className="table-responsive" style={{ maxHeight: "60vh", overflowY: "auto" }}>
//                 <table className="table table-bordered table-sm table-striped table-hover align-middle">
//                   <thead className="table-primary sticky-top">
//                     <tr>
//                       <th>Ward Name</th>
//                       <th className="text-end">Capacity</th>
//                       <th className="text-center">Status</th>
//                       <th className="text-center">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {wardData.map((ward) => (
//                       <tr key={ward.id}>
//                         <td>{ward.wardName}</td>
//                         <td className="text-end">{ward.capacity}</td>
//                         <td className="text-center">
//                           <span className={`badge ${ward.active ? 'bg-success' : 'bg-danger'}`}>
//                             {ward.active ? '🟢 Active' : '🔴 Inactive'}
//                           </span>
//                         </td>
//                         <td className="text-center">
//                           <button
//                             className="btn btn-outline-primary btn-sm"
//                             onClick={() => handleOpenBatchModal(ward)}
//                           >
//                             ✏️ Edit
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

//         {/* Ward Detail Tab - Now modified to potentially include a button to open batch details */}
//         {activeTab === "detail" && (
//           <div
//             className="card shadow border-0 rounded-4"
//             style={{ background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}
//           >
//             <div
//               className="card-header text-white rounded-top-4"
//               style={{ background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)" }}
//             >
//               <div className="d-flex justify-content-between align-items-center">
//                 <h5 className="mb-0">
//                   🏠 Ward Details {selectedWard ? `- ${selectedWard.wardName}` : " - New Ward"}
//                 </h5>
//                 <button className="btn btn-outline-light btn-sm" onClick={handleCloseDetail}>
//                   ✖️ Close
//                 </button>
//               </div>
//             </div>

//             <div className="card-body p-4">
//               {/* Current Ward Basic Info (kept for context, you might remove these if batch is central) */}
//               <div className="row g-3 mb-4">
//                 <div className="col-md-6">
//                   <label className="form-label fw-bold text-primary">🏠 Ward Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={selectedWard ? selectedWard.wardName : ""}
//                     readOnly // Made readOnly as editing ward is not the focus now
//                     style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label fw-bold text-primary">📏 Capacity</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={selectedWard ? selectedWard.capacity : 0}
//                     readOnly // Made readOnly
//                     style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
//                   />
//                 </div>
//               </div>

//               <hr /> {/* Separator */}

//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h5 className="mb-0">📦 Batch Information</h5>
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => handleOpenBatchModal()}
//                 >
//                   ➕ Add New Batch (Modal)
//                 </button>
//               </div>

//               {/* Placeholder for a list of batches if they were associated with a ward */}
//               <div className="alert alert-info text-center">
//                 This section would list batches related to "{selectedWard?.wardName || 'this ward'}" if implemented.
//                 Click "Add New Batch (Modal)" to see the Batch Detail Form.
//               </div>

//             </div>
//           </div>
//         )}

//         {/* Batch Detail Modal (Replaces the inline detail view for Batch) */}
//         {showBatchModal && (
//           <div className="modal fade show d-block" tabIndex="-1" role="dialog">
//             <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
//               <div className="modal-content rounded-4 shadow-lg">
//                 <div
//                   className="modal-header text-white rounded-top-4"
//                   style={{ background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)" }}
//                 >
//                   <h5 className="modal-title">📦 Batch Details - {currentBatch ? "Edit" : "Add"} Batch</h5>
//                   <button
//                     type="button"
//                     className="btn-close btn-close-white"
//                     onClick={handleCloseBatchModal}
//                     aria-label="Close"
//                   ></button>
//                 </div>
//                 <div className="modal-body p-4" style={{ background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}>
//                   {/* Item Name */}
//                   <div className="mb-3">
//                     <label className="form-label fw-bold text-primary">🏷️ Item Name</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={batchFormData.itemName}
//                       onChange={(e) => handleBatchInputChange("itemName", e.target.value)}
//                       style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
//                     />
//                   </div>

//                   {/* Batch No. */}
//                   <div className="mb-3">
//                     <label className="form-label fw-bold text-primary">🔢 Batch No.</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={batchFormData.batchNo}
//                       onChange={(e) => handleBatchInputChange("batchNo", e.target.value)}
//                       style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
//                     />
//                   </div>

//                   {/* Exp. Date */}
//                   <div className="mb-3">
//                     <label className="form-label fw-bold text-primary">📅 Exp. Date</label>
//                     <div className="input-group">
//                       <input
//                         type="text" // Can be type="date" for a date picker
//                         className="form-control"
//                         placeholder="DD/MM/YYYY"
//                         value={batchFormData.expDate}
//                         onChange={(e) => handleBatchInputChange("expDate", e.target.value)}
//                         style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
//                       />
//                       {/* Placeholder for calendar icon - if using date input, browser handles this */}
//                       <span className="input-group-text bg-primary text-white" style={{ border: "2px solid #2196f3" }}>
//                         🗓️
//                       </span>
//                     </div>
//                   </div>

//                   {/* Vat Inclusive Checkbox */}
//                   <div className="form-check mb-3">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       id="vatInclusiveCheck"
//                       checked={batchFormData.vatInclusive}
//                       onChange={(e) => handleBatchInputChange("vatInclusive", e.target.checked)}
//                     />
//                     <label className="form-check-label fw-bold text-primary" htmlFor="vatInclusiveCheck">
//                       VAT Inclusive
//                     </label>
//                   </div>

//                   {/* MRP+Vat Rate and M.R.P. */}
//                   <div className="row g-3">
//                     <div className="col-md-6">
//                       <label className="form-label fw-bold text-primary">💲 (MRP+Vat) Rate</label>
//                       <input
//                         type="number"
//                         className="form-control"
//                         value={batchFormData.mrpVatRate}
//                         onChange={(e) => handleBatchInputChange("mrpVatRate", Number(e.target.value) || 0)}
//                         style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <label className="form-label fw-bold text-primary">💰 M.R.P.</label>
//                       <input
//                         type="number"
//                         className="form-control"
//                         value={batchFormData.mrp}
//                         onChange={(e) => handleBatchInputChange("mrp", Number(e.target.value) || 0)}
//                         style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="modal-footer d-flex justify-content-between align-items-center">
//                   <button type="button" className="btn btn-secondary" onClick={handleCloseBatchModal}>
//                     Close
//                   </button>
//                   <button type="button" className="btn btn-success" onClick={handleSaveBatch}>
//                     {currentBatch ? "Update Batch" : "Save Batch"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Modal Backdrop */}
//         {showBatchModal && <div className="modal-backdrop fade show"></div>}
//       </div>
//     </MasterLayout>
//   );
// };

// export default WardMaster;



























import { useState } from "react";
import MasterLayout from "../../MasterLayout";
import Breadcrumb from "../../Breadcrumb";

const WardMaster = () => {
  // We'll primarily work with batch data now, so activeTab will mostly be 'list'.
  // The 'detail' view will be replaced by a modal.
  const [activeTab, setActiveTab] = useState("list"); // Still needed for showing the list container

  // Dummy Batch data to populate the list, mimicking the image_77d2de.png
  const [batchListData, setBatchListData] = useState([
    {
      id: 1,
      itemName: "Medicine A",
      batchNo: "BATCH001",
      expDate: "12/2025",
      mrp: 150.00,
      vatInclusive: true, // Example data, not shown in list table but used in detail
      mrpVatRate: 150.00, // Example data
    },
    {
      id: 2,
      itemName: "Surgical Mask",
      batchNo: "MASK2024",
      expDate: "06/2024",
      mrp: 50.50,
      vatInclusive: false,
      mrpVatRate: 50.50,
    },
    {
      id: 3,
      itemName: "Gloves (Sterile)",
      batchNo: "GLVSET03",
      expDate: "03/2026",
      mrp: 200.00,
      vatInclusive: true,
      mrpVatRate: 200.00,
    },
  ]);

  // State for Batch details, mirroring the image_767d87.png
  const [batchFormData, setBatchFormData] = useState({
    itemName: "",
    batchNo: "",
    expDate: "",
    vatInclusive: false,
    mrpVatRate: 0,
    mrp: 0,
  });

  const [showBatchModal, setShowBatchModal] = useState(false);
  const [currentBatch, setCurrentBatch] = useState(null); // To store batch being edited

  // Function to open the Batch Modal for adding a new batch
  const handleAddBatchFromList = () => {
    setBatchFormData({
      itemName: "",
      batchNo: "",
      expDate: "",
      vatInclusive: false,
      mrpVatRate: 0,
      mrp: 0,
    });
    setCurrentBatch(null); // No batch selected for editing
    setShowBatchModal(true);
  };

  // Function to open the Batch Modal for editing an existing batch
  const handleEditBatch = (batch) => {
    setBatchFormData({
      itemName: batch.itemName,
      batchNo: batch.batchNo,
      expDate: batch.expDate,
      vatInclusive: batch.vatInclusive,
      mrpVatRate: batch.mrpVatRate,
      mrp: batch.mrp,
    });
    setCurrentBatch(batch);
    setShowBatchModal(true);
  };

  // Handler for Batch form input changes (within the modal)
  const handleBatchInputChange = (field, value) => {
    setBatchFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCloseBatchModal = () => {
    setShowBatchModal(false);
    // Optionally reset batchFormData here if you always want it clear on close
    setBatchFormData({
      itemName: "",
      batchNo: "",
      expDate: "",
      vatInclusive: false,
      mrpVatRate: 0,
      mrp: 0,
    });
    setCurrentBatch(null);
  };

  const handleSaveBatch = () => {
    console.log("Saving Batch Data:", batchFormData);
    // Logic to add new batch or update existing batch in batchListData
    if (currentBatch) {
      // Update existing batch
      setBatchListData((prevData) =>
        prevData.map((batch) =>
          batch.id === currentBatch.id ? { ...batch, ...batchFormData } : batch
        )
      );
    } else {
      // Add new batch (generate a new ID)
      const newId = batchListData.length > 0 ? Math.max(...batchListData.map(b => b.id)) + 1 : 1;
      setBatchListData((prevData) => [...prevData, { id: newId, ...batchFormData }]);
    }
    handleCloseBatchModal();
  };

  // The 'detail' tab logic for WardMaster is now gone, replaced by the modal for Batch
  // The Breadcrumb title remains "Ward Master" as this is still the context,
  // but the content within the page now focuses on "Batch" management.

  return (
    <MasterLayout>
      <Breadcrumb title="Ward Master" /> {/* Title remains as per original context */}
      <div className="container-fluid py-4">
        {/* Batch List Tab - This is now the primary view */}
        <div className="card shadow border-0 rounded-4">
          <div className="card-header border-bottom d-flex justify-content-between align-items-center">
            <h5 className="mb-0">📦 Batch - List</h5>{" "}
            {/* Changed title to Batch List */}
            <button
              className="btn btn-gradient-primary px-4 py-2 rounded-pill shadow-lg"
              onClick={handleAddBatchFromList}
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
              ✨ ADD BATCH
            </button>
          </div>

          <div className="card-body">
            <div className="table-responsive" style={{ maxHeight: "60vh", overflowY: "auto" }}>
              <table className="table table-bordered table-sm table-striped table-hover align-middle">
                <thead className="table-primary sticky-top">
                  <tr>
                    <th>Item Name</th> {/* From Batch image */}
                    <th>Batch No.</th> {/* From Batch image */}
                    <th>Exp. Date</th> {/* From Batch image */}
                    <th className="text-end">M.R.P</th> {/* From Batch image */}
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {batchListData.map((batch) => (
                    <tr key={batch.id}>
                      <td>{batch.itemName}</td>
                      <td>{batch.batchNo}</td>
                      <td>{batch.expDate}</td>
                      <td className="text-end">₹ {batch.mrp.toFixed(2)}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => handleEditBatch(batch)} // Now edits a batch
                        >
                          ✏️ Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Batch Detail Modal (This is the "detail" part that appears on "add" or "edit") */}
        {showBatchModal && (
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
              <div className="modal-content rounded-4 shadow-lg">
                <div
                  className="modal-header text-white rounded-top-4"
                  style={{ background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)" }}
                >
                  <h5 className="modal-title">📦 Batch Details - {currentBatch ? "Edit" : "Add"} Batch</h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={handleCloseBatchModal}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body p-4" style={{ background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}>
                  {/* Item Name */}
                  <div className="mb-3">
                    <label className="form-label fw-bold text-primary">🏷️ Item Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={batchFormData.itemName}
                      onChange={(e) => handleBatchInputChange("itemName", e.target.value)}
                      style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                    />
                  </div>

                  {/* Batch No. */}
                  <div className="mb-3">
                    <label className="form-label fw-bold text-primary">🔢 Batch No.</label>
                    <input
                      type="text"
                      className="form-control"
                      value={batchFormData.batchNo}
                      onChange={(e) => handleBatchInputChange("batchNo", e.target.value)}
                      style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                    />
                  </div>

                  {/* Exp. Date */}
                  <div className="mb-3">
                    <label className="form-label fw-bold text-primary">📅 Exp. Date</label>
                    <div className="input-group">
                      <input
                        type="text" // Can be type="date" for a date picker
                        className="form-control"
                        placeholder="MM/YYYY" // Changed placeholder for Exp. Date format
                        value={batchFormData.expDate}
                        onChange={(e) => handleBatchInputChange("expDate", e.target.value)}
                        style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                      />
                      <span className="input-group-text bg-primary text-white" style={{ border: "2px solid #2196f3" }}>
                        🗓️
                      </span>
                    </div>
                  </div>

                  {/* Vat Inclusive Checkbox */}
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="vatInclusiveCheck"
                      checked={batchFormData.vatInclusive}
                      onChange={(e) => handleBatchInputChange("vatInclusive", e.target.checked)}
                    />
                    <label className="form-check-label fw-bold text-primary" htmlFor="vatInclusiveCheck">
                      VAT Inclusive
                    </label>
                  </div>

                  {/* MRP+Vat Rate and M.R.P. */}
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-bold text-primary">💲 (MRP+Vat) Rate</label>
                      <input
                        type="number"
                        className="form-control"
                        value={batchFormData.mrpVatRate}
                        onChange={(e) => handleBatchInputChange("mrpVatRate", Number(e.target.value) || 0)}
                        style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold text-primary">💰 M.R.P.</label>
                      <input
                        type="number"
                        className="form-control"
                        value={batchFormData.mrp}
                        onChange={(e) => handleBatchInputChange("mrp", Number(e.target.value) || 0)}
                        style={{ backgroundColor: "#e3f2fd", border: "2px solid #2196f3" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer d-flex justify-content-between align-items-center">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseBatchModal}>
                    Close
                  </button>
                  <button type="button" className="btn btn-success" onClick={handleSaveBatch}>
                    {currentBatch ? "Update Batch" : "Save Batch"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Backdrop */}
        {showBatchModal && <div className="modal-backdrop fade show"></div>}
      </div>
    </MasterLayout>
  );
};

export default WardMaster;