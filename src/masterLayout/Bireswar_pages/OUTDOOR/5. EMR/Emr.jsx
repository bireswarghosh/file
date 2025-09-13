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
            marginRight: '95px',
            marginLeft: 'auto',
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
                <h5 className="card-title mb-0">Patient History</h5>
                <div>
                  {/* <button type="button" className="btn btn-secondary btn-sm me-1">List</button>
                  <button type="button" className="btn btn-primary btn-sm me-1">Detail</button>
                  <button type="button" className="btn btn-success btn-sm">Document Save</button> */}
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
                      defaultValue={selectedPatient?.Sex || ""}
                    >
                      <option value="">Select...</option>
                      <option value="M">M</option>
                      <option value="F">F</option>
                    </select>
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">Guardian Name</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm" 
                      defaultValue={selectedPatient?.GurdianName || ""} 
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">Relation</label>
                    <select 
                      className="form-select form-select-sm" 
                      defaultValue={selectedPatient?.Relation || ""}
                    >
                      <option value="">Select...</option>
                      <option value="FATHER">FATHER</option>
                      <option value="HUSBAND">HUSBAND</option>
                      <option value="MOTHER">MOTHER</option>
                      <option value="WIFE">WIFE</option>
                    </select>
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">Phone No</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm" 
                      defaultValue={selectedPatient?.PhoneNo || ""} 
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">Address</label>
                    <textarea 
                      className="form-control form-control-sm" 
                      rows="2" 
                      defaultValue={selectedPatient?.Add1 || ""}
                    ></textarea>
                  </div>

                  {/* --- Medical History Section --- */}
                  <div className="col-12 mt-3">
                    <hr />
                    <h6>Medical History</h6>
                  </div>

                  {/* Past History */}
                  <div className="col-12">
                    <label className="form-label fw-bold">Past History</label>
                    <div className="table-responsive">
                      <table className="table table-bordered table-sm">
                        <tbody>
                          {pastHistoryRows.map((row) => (
                            <tr key={row.id}>
                              <td style={{ width: '90%' }}>
                                <input
                                  type="text"
                                  className="form-control form-control-sm border-0"
                                  value={row.value}
                                  onChange={(e) => handleRowChange(row.id, 'value', e.target.value, pastHistoryRows, setPastHistoryRows)}
                                  placeholder="Enter past history..."
                                />
                              </td>
                              <td className="text-center">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-success me-1"
                                  onClick={() => addRow(pastHistoryRows, setPastHistoryRows)}
                                >
                                  +
                                </button>
                                <IconButton
                                  size="small"
                                  onClick={() => deleteRow(row.id, pastHistoryRows, setPastHistoryRows)}
                                  disabled={pastHistoryRows.length === 1}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Chief Complaint */}
                  <div className="col-12 mt-3">
                    <label className="form-label fw-bold">Chief Complaint</label>
                    <div className="table-responsive">
                      <table className="table table-bordered table-sm">
                        <tbody>
                          {complaintRows.map((row) => (
                            <tr key={row.id}>
                              <td style={{ width: '90%' }}>
                                <input
                                  type="text"
                                  className="form-control form-control-sm border-0"
                                  value={row.value}
                                  onChange={(e) => handleRowChange(row.id, 'value', e.target.value, complaintRows, setComplaintRows)}
                                  placeholder="Enter chief complaint..."
                                />
                              </td>
                              <td className="text-center">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-success me-1"
                                  onClick={() => addRow(complaintRows, setComplaintRows)}
                                >
                                  +
                                </button>
                                <IconButton
                                  size="small"
                                  onClick={() => deleteRow(row.id, complaintRows, setComplaintRows)}
                                  disabled={complaintRows.length === 1}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Investigation */}
                  <div className="col-12 mt-3">
                    <label className="form-label fw-bold">Investigation</label>
                    <div className="table-responsive">
                      <table className="table table-bordered table-sm">
                        <tbody>
                          {investigationRows.map((row) => (
                            <tr key={row.id}>
                              <td style={{ width: '90%' }}>
                                <input
                                  type="text"
                                  className="form-control form-control-sm border-0"
                                  value={row.value}
                                  onChange={(e) => handleRowChange(row.id, 'value', e.target.value, investigationRows, setInvestigationRows)}
                                  placeholder="Enter investigation..."
                                />
                              </td>
                              <td className="text-center">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-success me-1"
                                  onClick={() => addRow(investigationRows, setInvestigationRows)}
                                >
                                  +
                                </button>
                                <IconButton
                                  size="small"
                                  onClick={() => deleteRow(row.id, investigationRows, setInvestigationRows)}
                                  disabled={investigationRows.length === 1}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Diagnosis */}
                  <div className="col-12 mt-3">
                    <label className="form-label fw-bold">Diagnosis</label>
                    <div className="table-responsive">
                      <table className="table table-bordered table-sm">
                        <tbody>
                          {diagnosisRows.map((row) => (
                            <tr key={row.id}>
                              <td style={{ width: '90%' }}>
                                <input
                                  type="text"
                                  className="form-control form-control-sm border-0"
                                  value={row.value}
                                  onChange={(e) => handleRowChange(row.id, 'value', e.target.value, diagnosisRows, setDiagnosisRows)}
                                  placeholder="Enter diagnosis..."
                                />
                              </td>
                              <td className="text-center">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-success me-1"
                                  onClick={() => addRow(diagnosisRows, setDiagnosisRows)}
                                >
                                  +
                                </button>
                                <IconButton
                                  size="small"
                                  onClick={() => deleteRow(row.id, diagnosisRows, setDiagnosisRows)}
                                  disabled={diagnosisRows.length === 1}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Medicine */}
                  <div className="col-12 mt-3">
                    <label className="form-label fw-bold">Medicine</label>
                    <div className="table-responsive">
                      <table className="table table-bordered table-sm">
                        <thead>
                          <tr>
                            <th>Medicine</th>
                            <th>Dose</th>
                            <th>Days</th>
                            <th>Unit</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {medicineRows.map((row) => (
                            <tr key={row.id}>
                              <td>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  value={row.medicine}
                                  onChange={(e) => handleRowChange(row.id, 'medicine', e.target.value, medicineRows, setMedicineRows)}
                                  placeholder="Medicine name..."
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  value={row.dose}
                                  onChange={(e) => handleRowChange(row.id, 'dose', e.target.value, medicineRows, setMedicineRows)}
                                  placeholder="Dose..."
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  value={row.days}
                                  onChange={(e) => handleRowChange(row.id, 'days', e.target.value, medicineRows, setMedicineRows)}
                                  placeholder="Days..."
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  value={row.unit}
                                  onChange={(e) => handleRowChange(row.id, 'unit', e.target.value, medicineRows, setMedicineRows)}
                                  placeholder="Unit..."
                                />
                              </td>
                              <td className="text-center">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-success me-1"
                                  onClick={() => addRow(medicineRows, setMedicineRows)}
                                >
                                  +
                                </button>
                                <IconButton
                                  size="small"
                                  onClick={() => deleteRow(row.id, medicineRows, setMedicineRows)}
                                  disabled={medicineRows.length === 1}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Advice */}
                  <div className="col-12 mt-3">
                    <label className="form-label fw-bold">Advice</label>
                    <div className="table-responsive">
                      <table className="table table-bordered table-sm">
                        <tbody>
                          {adviceRows.map((row) => (
                            <tr key={row.id}>
                              <td style={{ width: '90%' }}>
                                <input
                                  type="text"
                                  className="form-control form-control-sm border-0"
                                  value={row.value}
                                  onChange={(e) => handleRowChange(row.id, 'value', e.target.value, adviceRows, setAdviceRows)}
                                  placeholder="Enter advice..."
                                />
                              </td>
                              <td className="text-center">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-success me-1"
                                  onClick={() => addRow(adviceRows, setAdviceRows)}
                                >
                                  +
                                </button>
                                <IconButton
                                  size="small"
                                  onClick={() => deleteRow(row.id, adviceRows, setAdviceRows)}
                                  disabled={adviceRows.length === 1}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="col-12 mt-4">
                    <div className="d-flex gap-2">
                      <button type="button" className="btn btn-primary">Save EMR</button>
                      <button type="button" className="btn btn-success">Print</button>
                      <button type="button" className="btn btn-info">Export PDF</button>
                      <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleClose} variant="contained">Save Changes</Button>
        </DialogActions>
      </Dialog>
    </MasterLayout>
  );
};

export default Emr;