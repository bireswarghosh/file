



import React, { useState } from 'react';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';
import DataTable from "../DataTable/DataTable";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

const Emr = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [open, setOpen] = useState(false);
  
  // State for table rows
  const [pastHistoryRows, setPastHistoryRows] = useState([{ id: 1, value: "" }]);
  const [diagnosisRows, setDiagnosisRows] = useState([{ id: 1, value: "" }]);
  const [investigationRows, setInvestigationRows] = useState([{ id: 1, value: "" }]);
  const [complaintRows, setComplaintRows] = useState([{ id: 1, value: "" }]);
  const [adviceRows, setAdviceRows] = useState([{ id: 1, value: "" }]);
  const [medicineRows, setMedicineRows] = useState([{ id: 1, medicine: "", dose: "", days: "", unit: "" }]);

  const handleRowClick = (params) => {
    setSelectedPatient(params.row);
    setOpen(true);
    console.log("Selected Patient:", params.row);
    console.log("open emr table");
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPatient(null);
  };
  
  // Generic handlers for adding and deleting rows
  const addRow = (rows, setRows) => {
    const newId = rows.length > 0 ? Math.max(...rows.map(row => row.id)) + 1 : 1;
    if (rows[0].medicine !== undefined) {
      setRows([...rows, { id: newId, medicine: "", dose: "", days: "", unit: "" }]);
    } else {
      setRows([...rows, { id: newId, value: "" }]);
    }
  };
  
  const deleteRow = (id, rows, setRows) => {
    if (rows.length > 1) {
      setRows(rows.filter(row => row.id !== id));
    }
  };
  
  // Handle input change
  const handleRowChange = (id, field, value, rows, setRows) => {
    setRows(rows.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  return (
    <MasterLayout>
      <Breadcrumb title="EMR" />
      <DataTable onRowClick={handleRowClick} />









      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="lg" 
        fullWidth 
        PaperProps={{
          sx: {
            marginRight: '95px',    // Move to the right (increase for more right shift)
            marginLeft: 'auto',     // Align to right side
            // 
          }
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          {selectedPatient ? `Patient Details: ${selectedPatient.PatientName || 'Unknown'}` : 'Patient Details'}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
            size="large"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      





<DialogContent dividers>
  <div className="col-lg-12">
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        {/* Header elements */}
        <h5 className="card-title mb-0">Patient History</h5>
        <div>
          <button type="button" className="btn btn-secondary btn-sm me-1">List</button>
          <button type="button" className="btn btn-primary btn-sm me-1">Detail</button>
          <button type="button" className="btn btn-success btn-sm">Document Save</button>
        </div>
      </div>
      <div className="card-body">
        <form className="row g-3 needs-validation" noValidate="">
          {/* --- Registration Detail Section --- */}
          <div className="col-12">
            <h6>Registration Detail</h6>
          </div>
          <div className="col-md-3">
            <label className="form-label">Admission No</label>
            <input type="text" className="form-control form-control-sm" defaultValue="" />
          </div>
          <div className="col-md-3">
            <label className="form-label">Registration No</label>
            <input 
              type="text" 
              className="form-control form-control-sm" 
              defaultValue={selectedPatient?.AdmitionNo || "S-019384/24-25"} 
              readOnly 
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Date</label>
            <input 
              type="text" 
              className="form-control form-control-sm" 
              defaultValue={selectedPatient?.AdmitionDate ? new Date(selectedPatient.AdmitionDate).toLocaleDateString() : "22/Feb/2025"} 
              readOnly 
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Time</label>
            <div className="input-group input-group-sm">
              <input 
                type="text" 
                className="form-control form-control-sm" 
                placeholder="HH:MM" 
                defaultValue={selectedPatient?.AdmitionTime || ""} 
              />
              <span className="input-group-text">AM</span>
            </div>
          </div>
          <div className="col-md-2">
            <label className="form-label">Weight</label>
            <input 
              type="number" 
              step="0.001" 
              className="form-control form-control-sm" 
              defaultValue={selectedPatient?.Weight || "0.000"} 
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Department</label>
            <input 
              type="text" 
              className="form-control form-control-sm" 
              defaultValue={selectedPatient?.dept || ""} 
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Doctor Name</label>
            <input 
              type="text" 
              className="form-control form-control-sm" 
              defaultValue={selectedPatient?.docName || ""} 
            />
          </div>
          <div className="col-md-1">
            <label className="form-label">Hight</label>
            <input type="number" className="form-control form-control-sm" defaultValue="0" />
          </div>
          <div className="col-md-1">
            <label className="form-label">Temp</label>
            <input type="number" step="0.1" className="form-control form-control-sm" defaultValue="0" />
          </div>
          <div className="col-md-1">
            <label className="form-label">BP Min</label>
            <input type="number" className="form-control form-control-sm" defaultValue="0" />
          </div>
          <div className="col-md-1">
            <label className="form-label">BP Max</label>
            <input type="number" className="form-control form-control-sm" defaultValue="0" />
          </div>
          <div className="col-md-2">
            <label className="form-label">Patient</label>
            <div className="mt-1">
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="patientInOut" id="patientIn" value="In" defaultChecked={true} />
                <label className="form-check-label" htmlFor="patientIn">In</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="patientInOut" id="patientOut" value="Out" />
                <label className="form-check-label" htmlFor="patientOut">Out</label>
              </div>
            </div>
          </div>
          {/* --- Patient Detail Section --- */}
          <div className="col-12 mt-3">
            <hr />
            <h6>Patient Detail</h6>
          </div>
          <div className="col-md-4">
            <label className="form-label">Patient's Name</label>
            <input 
              type="text" 
              className="form-control form-control-sm" 
              defaultValue={selectedPatient?.PatientName || "SOMA JATI"} 
              required="" 
              readOnly 
            />
          </div>
          <div className="col-md-1">
            <label className="form-label">Age</label>
            <div className="input-group input-group-sm">
              <input 
                type="number" 
                step="0.01" 
                className="form-control form-control-sm" 
                defaultValue={selectedPatient?.Age || "42.00"} 
                required="" 
              />
              <span className="input-group-text">Y</span>
            </div>
          </div>
          <div className="col-md-1">
            <label className="form-label">Sex</label>
            <select 
              className="form-select form-select-sm" 
              defaultValue={selectedPatient?.Sex || "F"} 
              required=""
            >
              <option value="F">F</option>
              <option value="M">M</option>
              <option value="O">Other</option>
            </select>
          </div>
          <div className="col-md-2">
            <label className="form-label">Marital Status</label>
            <select 
              className="form-select form-select-sm" 
              defaultValue={selectedPatient?.MStatus || "M"} 
              required=""
            >
              <option value="M">M</option>
              <option value="U">U</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Address</label>
            <input 
              type="text" 
              className="form-control form-control-sm" 
              defaultValue={selectedPatient?.Add1 || "HOWRAH"} 
              required="" 
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Phone</label>
            <input 
              type="tel" 
              className="form-control form-control-sm" 
              defaultValue={selectedPatient?.PhoneNo || "9007098937"} 
              required="" 
            />
          </div>
          <div className="col-md-1">
            <label className="form-label">Visit No</label>
            <input 
              type="number" 
              className="form-control form-control-sm" 
              defaultValue={selectedPatient?.visitNo || "1"} 
              required="" 
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Date</label>
            <input 
              type="text" 
              className="form-control form-control-sm" 
              defaultValue={selectedPatient?.AdmitionDate ? new Date(selectedPatient.AdmitionDate).toLocaleDateString() : "22/Feb/2025"} 
              required="" 
              readOnly 
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Review Dt</label>
            <input type="text" className="form-control form-control-sm" placeholder="DD/MM/YYYY" defaultValue="//" />
          </div>
          <div className="col-md-1">
            <label className="form-label">Hospital</label>
            <select className="form-select form-select-sm" defaultValue="">
              <option value="">Select</option>
            </select>
          </div>
          {/* --- Patient History Section --- */}
          <div className="col-12 mt-3">
            <hr />
            <h6>Patient History</h6>
          </div>
          <div className="col-md-1">
            <label className="form-label">Diabetic</label>
            <select className="form-select form-select-sm" defaultValue="">
              <option value="">?</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="col-md-1">
            <label className="form-label">Alcholic</label>
            <select className="form-select form-select-sm" defaultValue="">
              <option value="">?</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="col-md-1">
            <label className="form-label">Tobacco</label>
            <select className="form-select form-select-sm" defaultValue="">
              <option value="">?</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="col-md-1">
            <label className="form-label">Appetite</label>
            <select className="form-select form-select-sm" defaultValue="">
              <option value="">?</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
          </div>
          <div className="col-md-8">
            <label className="form-label">Doctor Advice</label>
            <textarea className="form-control form-control-sm" rows="3" defaultValue=""></textarea>
          </div>
          {/* --- Table-like Sections --- */}
          <div className="col-md-6 mt-3">
            {/* Past History Table */}
            <div className="border p-2 rounded">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <h6 className="mb-0">Past History</h6>
                <button 
                  type="button" 
                  className="btn btn-success btn-sm"
                  onClick={() => addRow(pastHistoryRows, setPastHistoryRows)}
                >
                  Add
                </button>
              </div>
              <div className="row gx-2 fw-bold border-bottom mb-1 pb-1">
                <div className="col-2">SlNo</div>
                <div className="col-8">Past History</div>
                <div className="col-2">Action</div>
              </div>
              {/* Row Data */}
              {pastHistoryRows.map((row, index) => (
                <div className="row gx-2 align-items-center mb-1" key={row.id}>
                  <div className="col-2">
                    <input 
                      type="text" 
                      className="form-control form-control-sm" 
                      value={index + 1} 
                      readOnly 
                    />
                  </div>
                  <div className="col-8">
                    <textarea 
                      className="form-control form-control-sm" 
                      value={row.value} 
                      rows="2"
                      onChange={(e) => handleRowChange(row.id, 'value', e.target.value, pastHistoryRows, setPastHistoryRows)}
                    ></textarea>
                  </div>
                  <div className="col-2">
                    {pastHistoryRows.length > 1 && (
                      <IconButton 
                        size="small" 
                        color="error" 
                        onClick={() => deleteRow(row.id, pastHistoryRows, setPastHistoryRows)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Diagnosis Table */}
            <div className="border p-2 rounded mt-2">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <h6 className="mb-0">Diagnosis</h6>
                <button 
                  type="button" 
                  className="btn btn-success btn-sm"
                  onClick={() => addRow(diagnosisRows, setDiagnosisRows)}
                >
                  Add
                </button>
              </div>
              <div className="row gx-2 fw-bold border-bottom mb-1 pb-1">
                <div className="col-2">SlNo</div>
                <div className="col-8">Diagnosis</div>
                <div className="col-2">Action</div>
              </div>
              {/* Row Data */}

              {diagnosisRows.map((row, index) => ( 
                <div className="row gx-2 align-items-center mb-1" key={row.id}>
                  <div className="col-2">
                    <input 
                      type="text" 
                      className="form-control form-control-sm" 
                      value={index + 1} 
                      readOnly 
                    />
                  </div>
                  <div className="col-8">
                    <textarea 
                      className="form-control form-control-sm" 
                      value={row.value} 
                      rows="2"
                      onChange={(e) => handleRowChange(row.id, 'value', e.target.value, diagnosisRows, setDiagnosisRows)}
                    ></textarea>
                  </div>
                  <div className="col-2">
                    {diagnosisRows.length > 1 && (
                      <IconButton 
                        size="small" 
                        color="error" 
                        onClick={() => deleteRow(row.id, diagnosisRows, setDiagnosisRows)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Investigation Table */}
            <div className="border p-2 rounded mt-2">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <h6 className="mb-0">Investigation</h6>
                <button 
                  type="button" 
                  className="btn btn-success btn-sm"
                  onClick={() => addRow(investigationRows, setInvestigationRows)}
                >
                  Add
                </button>
              </div>
              <div className="row gx-2 fw-bold border-bottom mb-1 pb-1">
                <div className="col-2">SlNo</div>
                <div className="col-8">Investigation</div>
                <div className="col-2">Action</div>
              </div>
              {/* Row Data */}
              {investigationRows.map((row, index) => (
                <div className="row gx-2 align-items-center mb-1" key={row.id}>
                  <div className="col-2">
                    <input 
                      type="text" 
                      className="form-control form-control-sm" 
                      value={index + 1} 
                      readOnly 
                    />
                  </div>
                  <div className="col-8">
                    <textarea 
                      className="form-control form-control-sm" 
                      value={row.value} 
                      rows="2"
                      onChange={(e) => handleRowChange(row.id, 'value', e.target.value, investigationRows, setInvestigationRows)}
                    ></textarea>
                  </div>
                  <div className="col-2">
                    {investigationRows.length > 1 && (
                      <IconButton 
                        size="small" 
                        color="error" 
                        onClick={() => deleteRow(row.id, investigationRows, setInvestigationRows)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-6 mt-3">
            {/* Chief Complaint Table */}
            <div className="border p-2 rounded">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <h6 className="mb-0">Chief Complaint</h6>
                <button 
                  type="button" 
                  className="btn btn-success btn-sm"
                  onClick={() => addRow(complaintRows, setComplaintRows)}
                >
                  Add
                </button>
              </div>
              <div className="row gx-2 fw-bold border-bottom mb-1 pb-1">
                <div className="col-2">SlNo</div>
                <div className="col-8">Chief Complaint</div>
                <div className="col-2">Action</div>
              </div>
              {/* Row Data */}
              {complaintRows.map((row, index) => (
                <div className="row gx-2 align-items-center mb-1" key={row.id}>
                  <div className="col-2">
                    <input 
                      type="text" 
                      className="form-control form-control-sm" 
                      value={index + 1} 
                      readOnly 
                    />
                  </div>
                  <div className="col-8">
                    <textarea 
                      className="form-control form-control-sm" 
                      value={row.value} 
                      rows="2"
                      onChange={(e) => handleRowChange(row.id, 'value', e.target.value, complaintRows, setComplaintRows)}
                    ></textarea>
                  </div>
                  <div className="col-2">
                    {complaintRows.length > 1 && (
                      <IconButton 
                        size="small" 
                        color="error" 
                        onClick={() => deleteRow(row.id, complaintRows, setComplaintRows)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Advice Table */}
            <div className="border p-2 rounded mt-2">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <h6 className="mb-0">Advice</h6>
                <button 
                  type="button" 
                  className="btn btn-success btn-sm"
                  onClick={() => addRow(adviceRows, setAdviceRows)}
                >
                  Add
                </button>
              </div>
              <div className="row gx-2 fw-bold border-bottom mb-1 pb-1">
                <div className="col-2">SlNo</div>
                <div className="col-8">Advice</div>
                <div className="col-2">Action</div>
              </div>
              {/* Row Data */}
              {adviceRows.map((row, index) => (
                <div className="row gx-2 align-items-center mb-1" key={row.id}>
                  <div className="col-2">
                    <input 
                      type="text" 
                      className="form-control form-control-sm" 
                      value={index + 1} 
                      readOnly 
                    />
                  </div>
                  <div className="col-8">
                    <textarea 
                      className="form-control form-control-sm" 
                      value={row.value} 
                      rows="2"
                      onChange={(e) => handleRowChange(row.id, 'value', e.target.value, adviceRows, setAdviceRows)}
                    ></textarea>
                  </div>
                  <div className="col-2">
                    {adviceRows.length > 1 && (
                      <IconButton 
                        size="small" 
                        color="error" 
                        onClick={() => deleteRow(row.id, adviceRows, setAdviceRows)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Medicine Table */}
            <div className="border p-2 rounded mt-2">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <h6 className="mb-0">Medicine</h6>
                <button 
                  type="button" 
                  className="btn btn-success btn-sm"
                  onClick={() => addRow(medicineRows, setMedicineRows)}
                >
                  Add
                </button>
              </div>
              <div className="row gx-1 fw-bold border-bottom mb-1 pb-1 text-center">
                <div className="col-1">SlNo</div>
                <div className="col-4">Medicine</div>
                <div className="col-2">Dose</div>
                <div className="col-2">Days</div>
                <div className="col-2">Unit</div>
                <div className="col-1">Action</div>
              </div>
              {/* Row Data */}
              {medicineRows.map((row, index) => (
                <div className="row gx-1 align-items-center mb-1" key={row.id}>
                  <div className="col-1">
                    <input 
                      type="text" 
                      className="form-control form-control-sm" 
                      value={index + 1} 
                      readOnly 
                    />
                  </div>
                  <div className="col-4">
                    <textarea 
                      className="form-control form-control-sm" 
                      value={row.medicine} 
                      rows="2"
                      onChange={(e) => handleRowChange(row.id, 'medicine', e.target.value, medicineRows, setMedicineRows)}
                    ></textarea>
                  </div>
                  <div className="col-2">
                    <input 
                      type="text" 
                      className="form-control form-control-sm" 
                      value={row.dose} 
                      onChange={(e) => handleRowChange(row.id, 'dose', e.target.value, medicineRows, setMedicineRows)}
                    />
                  </div>
                  <div className="col-2">
                    <input 
                      type="text" 
                      className="form-control form-control-sm" 
                      value={row.days} 
                      onChange={(e) => handleRowChange(row.id, 'days', e.target.value, medicineRows, setMedicineRows)}
                    />
                  </div>
                  <div className="col-2">
                    <input 
                      type="text" 
                      className="form-control form-control-sm" 
                      value={row.unit} 
                      onChange={(e) => handleRowChange(row.id, 'unit', e.target.value, medicineRows, setMedicineRows)}
                    />
                  </div>
                  <div className="col-1">
                    {medicineRows.length > 1 && (
                      <IconButton 
                        size="small" 
                        color="error" 
                        onClick={() => deleteRow(row.id, medicineRows, setMedicineRows)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* --- Bottom Action Buttons --- */}
          <div className="col-12 mt-4 pt-3 border-top text-center">
            <button className="btn btn-success me-2" type="submit">Save</button>
            <button className="btn btn-info me-2" type="button">Diagnosis Print</button>
            <button className="btn btn-primary me-2" type="button">Prescription</button>
            <button className="btn btn-secondary" type="button">Prescription 2</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</DialogContent>











        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>


    </MasterLayout>
  );
};

export default Emr;