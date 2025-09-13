// import React from 'react'
import MasterLayout from '../../../MasterLayout'
import Breadcrumb from '../../../Breadcrumb'


import React, { useState } from 'react';

const Other_chearges = () => {

  const [data, setData] = useState({ /* … your form state … */ });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setData(d => ({ ...d, [name]: type === 'checkbox' ? checked : value }));
  };



  return (
    <MasterLayout>
        <Breadcrumb title="Other Charges" />





<div className="col-lg-12">
  <div className="card">
    <div className="card-header">
      {/* Added a title based on the image content */}
      <h5 className="card-title mb-0">Patient Registration Details</h5>
    </div>
    <div className="card-body">
      <form className="row g-3 needs-validation" noValidate="">

        {/* --- Registration Detail Section --- */}
        <div className="col-md-3">
           <label className="form-label">Date</label>
           <input
               type="text"
               className="form-control"
               defaultValue="22/Feb/2025"
               readOnly // Assuming this is display only based on context
           />
        </div>
        <div className="col-md-3">
           <label className="form-label">Time</label>
           <input
               type="text"
               className="form-control"
               defaultValue="12:02 PM"
               readOnly // Assuming this is display only
           />
        </div>
         <div className="col-md-6 text-end"> {/* Placeholder for Registration Form Button */}
             <button type="button" className="btn btn-success mt-4">Registration Form</button>
         </div>

        <div className="col-md-4">
          <label className="form-label">Patient's Name</label>
          <input
            type="text"
            className="form-control"
            defaultValue="SOMA JATI"
            required=""
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Registration No</label>
          <input
            type="text"
            className="form-control"
            defaultValue="S-019384/24-25"
            readOnly // Usually registration numbers are read-only after generation
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">C Registration No</label>
          <input
            type="text"
            className="form-control"
            defaultValue=""
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Company Name</label>
          <input
            type="text" // Could be a select if 'N' is an option code
            className="form-control"
            defaultValue="N"
          />
        </div>

        {/* --- Patient Detail Section --- */}
         <div className="col-12">
            <hr/> {/* Separator */}
            <h6>Patient Detail</h6>
         </div>

        <div className="col-md-2">
            <label className="form-label">Age</label>
            <div className="input-group">
                <input
                type="number"
                className="form-control"
                defaultValue="42"
                required=""
                />
                <span className="input-group-text">Y</span>
            </div>
        </div>
        <div className="col-md-2">
            <label className="form-label">Sex</label>
            <select className="form-select" defaultValue="F" required="">
                <option value="F">F</option>
                <option value="M">M</option>
                <option value="O">Other</option>
            </select>
        </div>
        <div className="col-md-2">
          <label className="form-label">Marital Status</label>
          <select className="form-select" defaultValue="M" required="">
                <option value="M">M</option>
                <option value="S">S</option>
                {/* Add other options as needed */}
            </select>
        </div>
         <div className="col-md-6">
            <label className="form-label">Phone</label>
            <input
                type="tel"
                className="form-control"
                defaultValue="9007098937"
                required=""
            />
         </div>

        <div className="col-md-6">
            <label className="form-label">Address</label>
            <input
                type="text"
                className="form-control"
                defaultValue="HOWRAH"
                required=""
            />
        </div>
         <div className="col-md-3">
            <label className="form-label">Religion</label>
            <input
                type="text"
                className="form-control"
                defaultValue="HINDU"
            />
         </div>
         <div className="col-md-3">
            <label className="form-label">Area/P.S.</label>
            <input
                type="text"
                className="form-control"
                defaultValue=""
            />
         </div>


        {/* --- Department/Doctor/Bill Section --- */}
         <div className="col-12">
            <hr/> {/* Separator */}
         </div>

        <div className="col-md-3">
            <label className="form-label">Department</label>
            <input type="text" className="form-control" defaultValue="" />
        </div>
        <div className="col-md-3">
            <label className="form-label">Doctor</label>
            <input type="text" className="form-control" defaultValue="" />
        </div>
         <div className="col-md-3">
            <label className="form-label">Bill No</label>
            <input type="text" className="form-control" defaultValue="DPDO/0214" readOnly/>
        </div>
         <div className="col-md-3">
            <label className="form-label">Bill Date</label>
            <input type="text" className="form-control" defaultValue="22/Feb/2025" readOnly/>
        </div>

        <div className="col-md-3">
            <label className="form-label">Assistant</label>
            <input type="text" className="form-control" defaultValue="" />
        </div>
         <div className="col-md-3">
            <label className="form-label">Ref Doctor</label>
            <input type="text" className="form-control" defaultValue="" />
        </div>
        <div className="col-md-3">
            <label className="form-label">Anesthesian</label>
            <input type="text" className="form-control" defaultValue="" />
        </div>


        {/* --- OT Booking Section --- */}
         <div className="col-md-3">
            <label className="form-label">Ot BookDate</label>
            <input type="text" className="form-control" defaultValue="01/Jan/1900" />
         </div>
         <div className="col-md-3">
             <label className="form-label">Book time</label>
             <div className="input-group">
                <input type="text" className="form-control" placeholder="HH:MM" defaultValue="" />
                <span className="input-group-text">AM</span> {/* Or make this a select */}
             </div>
         </div>

        {/* --- Billing Items Section --- */}
        {/* This represents the table - simplified here */}
        <div className="col-12">
             <hr/>
             <h6>Billing Items</h6>
        </div>
         <div className="col-md-5">
            <label className="form-label">Particular</label>
            <input type="text" className="form-control" defaultValue="DRESSING (L)" readOnly/>
         </div>
         <div className="col-md-1">
            <label className="form-label">Unit</label>
            <input type="number" className="form-control" defaultValue="1" readOnly/>
         </div>
          <div className="col-md-2">
            <label className="form-label">Rate</label>
            <input type="number" step="0.01" className="form-control" defaultValue="400" readOnly/>
         </div>
          <div className="col-md-1">
            <label className="form-label">Qty</label>
            <input type="number" className="form-control" defaultValue="1" readOnly/>
         </div>
         <div className="col-md-3">
            <label className="form-label">Amount</label>
            <input type="number" step="0.01" className="form-control" defaultValue="3500" readOnly/>
         </div>
         {/* Add more rows if needed */}


         {/* --- Financial Summary Section --- */}
         <div className="col-12">
            <hr/> {/* Separator */}
         </div>
         {/* Add spacer or adjust columns to align totals to the right */}
         <div className="col-md-6"></div> {/* Spacer */}

         <div className="col-md-2">
            <label className="form-label">Total</label>
            <input type="number" step="0.01" className="form-control text-end" defaultValue="3500.00" readOnly/>
         </div>
         <div className="col-md-2">
            <label className="form-label">Paid</label>
            <input type="number" step="0.01" className="form-control text-end" defaultValue="3500.00" readOnly/>
         </div>
         <div className="col-md-2"></div> {/* Spacer */}


         <div className="col-md-6"></div> {/* Spacer */}
         <div className="col-md-2">
            <label className="form-label">Discount</label>
            <input type="number" step="0.01" className="form-control text-end" defaultValue="0.00" readOnly/>
         </div>
          <div className="col-md-2">
            <label className="form-label">Due</label>
            <input type="number" step="0.01" className="form-control text-end" defaultValue="0.00" readOnly/>
         </div>
         <div className="col-md-2"></div> {/* Spacer */}


          <div className="col-md-6"></div> {/* Spacer */}
          <div className="col-md-4">
            <label className="form-label fw-bold">Grand Total</label>
            <input type="number" step="0.01" className="form-control text-end fw-bold" defaultValue="3500.00" readOnly/>
          </div>
          <div className="col-md-2"></div> {/* Spacer */}


        {/* --- User & Payment Details Section --- */}
        <div className="col-12">
             <hr/>
        </div>
        <div className="col-md-3">
            <label className="form-label">Registration By</label>
            <input type="text" className="form-control" defaultValue="SANJAY ST." readOnly/>
        </div>
         <div className="col-md-3">
            <label className="form-label">Current User</label>
            <input type="text" className="form-control" defaultValue="Admin" readOnly/>
         </div>
         <div className="col-md-3">
            <label className="form-label">Receipt Type</label>
             <select className="form-select" defaultValue="CASH">
                <option value="CASH">CASH</option>
                <option value="CARD">CARD</option>
                {/* Add other types */}
            </select>
         </div>
          <div className="col-md-3">
            <label className="form-label">Bank Name</label>
            <input type="text" className="form-control" defaultValue="" />
         </div>
         <div className="col-md-9"></div> {/* Spacer */}
         <div className="col-md-3 text-end">
              <button type="button" className="btn btn-secondary">Cheque / CARD</button>
         </div>


        {/* --- Action Buttons --- */}
        <div className="col-12 mt-4 pt-3 border-top">
            <button className="btn btn-primary me-1" type="button">New</button>
            <button className="btn btn-info me-1" type="button">Edit</button>
            <button className="btn btn-success me-1" type="submit">Save</button> {/* Assuming Save is submit */}
            <button className="btn btn-danger me-1" type="button">Delete</button>
            <button className="btn btn-warning me-1" type="button">Undo</button>
            <button className="btn btn-light me-1" type="button">Print</button>
            <button className="btn btn-dark" type="button">Exit</button>
        </div>

      </form>
    </div>
  </div>
</div>










      
    </MasterLayout>
  )
}

export default Other_chearges
