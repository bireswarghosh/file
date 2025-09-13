import React from 'react';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';

const PatientAdmissionDetail = () => {
  return (
    <MasterLayout>
      <Breadcrumb title="Patient Admission - Detail" />
      <div className="container-fluid py-4">
        <div className="card shadow-lg border-0 rounded-4 bg-white">
          
          {/* Tabs */}
          <div className="card-header pb-0 border-bottom-0">
            <ul className="nav nav-tabs">
              <li className="nav-item"><button className="nav-link">List</button></li>
              <li className="nav-item"><button className="nav-link active">Detail</button></li>
              <li className="nav-item"><button className="nav-link">MRD</button></li>
            </ul>
          </div>

          <div className="card-body p-4">
            {/* Admission Detail */}
            <h5 className="text-primary fw-bold mb-3">Admission Detail</h5>
            <div className="row g-3">
              <div className="col-md-3"><label>Admission No</label><input className="form-control" defaultValue="A-001043/24-25" /></div>
              <div className="col-md-2"><label>Date</label><input type="date" className="form-control" defaultValue="2025-02-22" /></div>
              <div className="col-md-2"><label>Bill Time</label><input className="form-control" defaultValue="12:00 PM" /></div>
              <div className="col-md-2"><label>Admission Time</label><input className="form-control" defaultValue="07:51 AM" /></div>
              <div className="col-md-2"><label>O.P.D. [Y/N]</label><input className="form-control" defaultValue="S-019378/24-25" /></div>
              <div className="col-md-1"><label>Booking [Y/N]</label><input className="form-control" defaultValue="N" /></div>
            </div>

            {/* Barcode */}
            <div className="text-end mt-3">
              <img src="https://barcode.tec-it.com/barcode.ashx?data=A-001043%2F24-25&code=Code128" alt="barcode" />
              <div className="fw-bold">A-001043/24-25</div>
            </div>

            {/* Patient Detail */}
            <hr className="my-4" />
            <h5 className="text-primary fw-bold mb-3">Patient Detail</h5>
            <div className="row g-3">
              <div className="col-md-4"><label>Patient Name</label><input className="form-control" defaultValue="NITA BANERJEE" /></div>
              <div className="col-md-4"><label>Address</label><input className="form-control" defaultValue="42/1, RAM MOHAN MUKHERJEE LANE" /></div>
              <div className="col-md-4"><label>Area</label><input className="form-control" defaultValue="P.O.+P.S.-SHIBPUR" /></div>
              <div className="col-md-4"><label>Pin Code</label><input className="form-control" defaultValue="DIST.HOWRAH,PIN-711102" /></div>
              <div className="col-md-2"><label>DOB</label><input className="form-control" defaultValue="22/02/1960" /></div>
              <div className="col-md-1"><label>Age</label><input className="form-control" defaultValue="65" /></div>
              <div className="col-md-1"><label>Y</label><input className="form-control" defaultValue="0" /></div>
              <div className="col-md-1"><label>M</label><input className="form-control" defaultValue="0" /></div>
              <div className="col-md-1"><label>D</label><input className="form-control" defaultValue="0" /></div>
              <div className="col-md-2"><label>Sex</label><input className="form-control" defaultValue="F" /></div>
              <div className="col-md-2"><label>Marital Status</label><input className="form-control" defaultValue="M" /></div>
              <div className="col-md-3"><label>Phone</label><input className="form-control" defaultValue="9432248472" /></div>
              <div className="col-md-3"><label>ID Proof</label><input className="form-control" defaultValue="2270 7106 0089" /></div>
              <div className="col-md-2"><label>Religion</label><input className="form-control" defaultValue="HINDU" /></div>
              <div className="col-md-2"><label>PAN No</label><input className="form-control" defaultValue="N" /></div>
              <div className="col-md-2"><label>State</label><input className="form-control" defaultValue="Howrah" /></div>
              <div className="col-md-2"><label>Nationality</label><input className="form-control" defaultValue="INDIAN" /></div>
              <div className="col-md-2"><label>Weight</label><input className="form-control" defaultValue="0.000" /></div>
              <div className="col-md-2"><label>District / PS</label><input className="form-control" defaultValue="SHIBPUR" /></div>
              <div className="col-md-2"><label>URN</label><input className="form-control" /></div>
            </div>

            {/* Guardian Detail */}
            <hr className="my-4" />
            <h5 className="text-primary fw-bold mb-3">Guardian Detail</h5>
            <div className="row g-3">
              <div className="col-md-5"><label>W/O, S/O, D/O</label><input className="form-control" defaultValue="W/O TAPAN KUMAR BANERJEE" /></div>
              <div className="col-md-4"><label>Relative Name</label><input className="form-control" defaultValue="TAPAN KUMAR BANERJEE (HUSBAND)" /></div>
              <div className="col-md-2"><label>Relation</label><input className="form-control" defaultValue="HUSBAND" /></div>
              <div className="col-md-3"><label>Phone No</label><input className="form-control" defaultValue="8777751519" /></div>
              <div className="col-md-2"><label>Company [Y/N]</label><input className="form-control" defaultValue="N" /></div>
              <div className="col-md-2"><label>Admission Type</label><input className="form-control" defaultValue="None" /></div>
            </div>

            {/* Others Detail */}
            <hr className="my-4" />
            <h5 className="text-primary fw-bold mb-3">Other Details</h5>
            <div className="row g-3">
              <div className="col-md-4"><label>Department</label><input className="form-control" defaultValue="DELUX CABIN" /></div>
              <div className="col-md-3"><label>Under Care</label><input className="form-control" defaultValue="ABHRA MUKHOPADHYAY" /></div>
              <div className="col-md-2"><label>Doctor</label><input className="form-control" /></div>
              <div className="col-md-2"><label>Referral [Y/N]</label><input className="form-control" defaultValue="N" /></div>
              <div className="col-md-1"><label>Package [Y/N]</label><input className="form-control" defaultValue="N" /></div>

              <div className="col-md-2"><label>Valid Till</label><input className="form-control" defaultValue="01/01/1900" /></div>
              <div className="col-md-2"><label>Start Date</label><input className="form-control" defaultValue="01/01/1900" /></div>
              <div className="col-md-2"><label>Bed [Y/N]</label><input className="form-control" defaultValue="Y" /></div>
              <div className="col-md-2"><label>Cashless [Y/N]</label><input className="form-control" defaultValue="N" /></div>
              <div className="col-md-4"><label>Name of Insurance Company</label><input className="form-control" /></div>

              <div className="col-md-2"><label>Bed No.</label><input className="form-control" defaultValue="DC-3RD-(01)" /></div>
              <div className="col-md-2"><label>Bed Rate</label><input className="form-control" defaultValue="3500" /></div>
              <div className="col-md-2"><label>Nursing Charge</label><input className="form-control" defaultValue="0" /></div>
              <div className="col-md-2"><label>RMO Charge</label><input className="form-control" defaultValue="0" /></div>
              <div className="col-md-2"><label>Day Care [Y/N]</label><input className="form-control" defaultValue="N" /></div>
              <div className="col-md-2"><label>Particular</label><input className="form-control" /></div>
              <div className="col-md-2"><label>Day Care Bed Rate</label><input className="form-control" defaultValue="0.00" /></div>
              <div className="col-md-2"><label>Employee</label><input className="form-control" /></div>
              <div className="col-md-3"><label>Disease</label><input className="form-control" /></div>
              <div className="col-md-3"><label>R.M.O.</label><input className="form-control" defaultValue="MO KAPIL KUMAR SHAW" /></div>
              <div className="col-md-3"><label>Referring Doctor</label><input className="form-control" /></div>
              <div className="col-md-3"><label>Referring Doctor 2</label><input className="form-control" /></div>
              <div className="col-md-3"><label>Package Amount</label><input className="form-control" defaultValue="0.00" /></div>
              <div className="col-md-3"><label>Total Package</label><input className="form-control" /></div>
              <div className="col-md-3"><label>Card No</label><input className="form-control" /></div>
              <div className="col-md-3"><label>CCN No</label><input className="form-control" /></div>
              <div className="col-md-3"><label>Disease Code</label><input className="form-control" /></div>
              <div className="col-md-3"><label>Admission By</label><input className="form-control" defaultValue="SANJAY ST." /></div>
              <div className="col-md-3"><label>Current User</label><input className="form-control" defaultValue="Admin" /></div>
              <div className="col-md-3"><label>Operation Date</label><input type="date" className="form-control" defaultValue="2025-02-22" /></div>
              <div className="col-md-3"><label>Operation Time</label><input className="form-control" defaultValue="07:51 AM" /></div>
              <div className="col-md-12"><label>Remarks</label><textarea className="form-control" rows="2"></textarea></div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="card-footer p-3 bg-light d-flex flex-wrap justify-content-between gap-2">
            <div className="btn-group">
              {['New', 'Edit', 'Save', 'Delete', 'Undo', 'Print', 'Exit'].map(btn => (
                <button key={btn} className="btn btn-outline-primary">{btn}</button>
              ))}
            </div>
            <div className="btn-group">
              <button className="btn btn-outline-secondary">Barcode</button>
              <button className="btn btn-outline-secondary">H Risk Consent</button>
              <button className="btn btn-outline-secondary">Consent</button>
            </div>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default PatientAdmissionDetail;
