import React, { useState, useRef } from 'react';
import axiosInstance from '../../../../axiosInstance';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';
import { getPDFGenerator } from '../../../../utils/pdfGenerators';

const DrRectVisitDetail = () => {
  const fromDateRef = useRef();
  const toDateRef = useRef();
  const [viewOption, setViewOption] = useState('UserWise');
  const [doctorSelect, setDoctorSelect] = useState('allDoctors');
  const [selectedDoctors, setSelectedDoctors] = useState([]);
  const [reportType, setReportType] = useState('All');
  const [loading, setLoading] = useState(false);

  const doctorList = [
    'Dr. Emily Carter', 'Dr. Benjamin Lee', 'Dr. Olivia Rodriguez',
    'Dr. Samuel Knight', 'Dr. Ava Chen', 'Dr. William Garcia',
    'Dr. Sophia Miller', 'Dr. Jacob Wilson', 'Dr. Isabella Davis'
  ];

  const handleDoctorCheckboxChange = (doctor) => {
    setSelectedDoctors(prev => {
      if (prev.includes(doctor)) {
        return prev.filter(d => d !== doctor);
      } else {
        return [...prev, doctor];
      }
    });
  };

  // Convert dd/mm/yyyy to yyyy-mm-dd for API
  const convertDateForAPI = (dateString) => {
    if (!dateString) return '';
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  };

  const handlePrintReport = async () => {
    const fromDateInput = fromDateRef.current?.value;
    const toDateInput = toDateRef.current?.value;
    
    if (!fromDateInput || !toDateInput) {
      alert('Please select both From and To dates');
      return;
    }
    
    // Convert dd/mm/yyyy to yyyy-mm-dd for API
    const fromDate = convertDateForAPI(fromDateInput);
    const toDate = convertDateForAPI(toDateInput);
    
    if (viewOption !== 'UserWise' || doctorSelect !== 'allDoctors' || reportType !== 'All') {
      alert('Please select: View Options = UserWise, Doctor Selection = All Doctors, Report Type = All');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await axiosInstance.get(`/patient-visits/date-range?fromDate=${fromDate}&toDate=${toDate}`);
      const apiData = response.data.data;
      
      if (!apiData || apiData.length === 0) {
        alert('No data found for the selected date range');
        setLoading(false);
        return;
      }
      
      const pdfGenerator = getPDFGenerator(viewOption, doctorSelect, reportType);
      const doc = pdfGenerator(apiData, fromDateInput, toDateInput);
      window.open(doc.output('bloburl'), '_blank');
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data from server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MasterLayout>
      <style>
        {`
          input[type="date"] {
            position: relative;
          }
          input[type="date"]::-webkit-calendar-picker-indicator {
            position: absolute;
            right: 0;
            color: transparent;
            background: transparent;
            cursor: pointer;
            width: 20px;
            height: 20px;
          }
          input[type="date"]:before {
            content: attr(placeholder);
            color: #999;
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            pointer-events: none;
          }
          input[type="date"]:focus:before,
          input[type="date"]:valid:before {
            display: none;
          }
        `}
      </style>
      <Breadcrumb title="Doctor Rect Visit Detail" />

      <div className="container my-5">
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-body p-4 p-md-5">
            {/* Date Range */}
            <div className="row g-3 mb-4 align-items-center">
              <div className="col-md-2 text-md-end">
                <label className="form-label fw-semibold">Date Range:</label>
              </div>
              <div className="col-md-4">
                <div className="input-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    id="fromDate" 
                    ref={fromDateRef}
                    placeholder="dd/mm/yyyy"
                    pattern="\d{2}/\d{2}/\d{4}"
                    maxLength="10"
                    onInput={(e) => {
                      let value = e.target.value.replace(/[^0-9]/g, '');
                      if (value.length >= 2 && value.length < 4) {
                        value = value.substring(0,2) + '/' + value.substring(2);
                      } else if (value.length >= 4) {
                        value = value.substring(0,2) + '/' + value.substring(2,4) + '/' + value.substring(4,8);
                      }
                      e.target.value = value;
                    }}
                  />
                  <span className="input-group-text" style={{cursor: 'pointer'}} onClick={() => document.getElementById('hiddenFromDate').showPicker()}>
                    <i className="fas fa-calendar-alt"></i>
                  </span>
                  <input 
                    type="date" 
                    id="hiddenFromDate"
                    style={{position: 'absolute', left: '-9999px', opacity: 0}}
                    onChange={(e) => {
                      if (e.target.value) {
                        const [year, month, day] = e.target.value.split('-');
                        fromDateRef.current.value = `${day}/${month}/${year}`;
                      }
                    }}
                  />
                </div>
                <small className="text-muted">From Date (dd/mm/yyyy)</small>
              </div>
              <div className="col-md-1 text-center fw-semibold d-none d-md-block">- To -</div>
              <div className="col-md-4">
                <div className="input-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    id="toDate" 
                    ref={toDateRef}
                    placeholder="dd/mm/yyyy"
                    pattern="\d{2}/\d{2}/\d{4}"
                    maxLength="10"
                    onInput={(e) => {
                      let value = e.target.value.replace(/[^0-9]/g, '');
                      if (value.length >= 2 && value.length < 4) {
                        value = value.substring(0,2) + '/' + value.substring(2);
                      } else if (value.length >= 4) {
                        value = value.substring(0,2) + '/' + value.substring(2,4) + '/' + value.substring(4,8);
                      }
                      e.target.value = value;
                    }}
                  />
                  <span className="input-group-text" style={{cursor: 'pointer'}} onClick={() => document.getElementById('hiddenToDate').showPicker()}>
                    <i className="fas fa-calendar-alt"></i>
                  </span>
                  <input 
                    type="date" 
                    id="hiddenToDate"
                    style={{position: 'absolute', left: '-9999px', opacity: 0}}
                    onChange={(e) => {
                      if (e.target.value) {
                        const [year, month, day] = e.target.value.split('-');
                        toDateRef.current.value = `${day}/${month}/${year}`;
                      }
                    }}
                  />
                </div>
                <small className="text-muted">To Date (dd/mm/yyyy)</small>
              </div>
            </div>

            {/* View Options */}
            <div className="mb-4 border rounded-3 p-3 bg-light shadow-sm">
              <h6 className="fw-bold mb-3 text-dark">View Options</h6>
              <div className="row g-3">
                {['UserWise', 'DoctorWise', 'Visit Type', 'RefDoctorWise', 'Ref wise', 'Advance Booking'].map((opt, index) => (
                  <div className="col-md-6 col-lg-4" key={index}>
                    <div className="form-check">
                      <input 
                        className="form-check-input" 
                        type="radio" 
                        name="viewOption" 
                        id={`viewOpt-${index}`} 
                        checked={viewOption === opt}
                        onChange={() => setViewOption(opt)}
                      />
                      <label className="form-check-label" htmlFor={`viewOpt-${index}`}>
                        {opt}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Doctor Selection */}
            <div className="mb-4 border rounded-3 p-3 bg-light shadow-sm">
              <h6 className="fw-bold mb-3 text-dark">Doctor Selection</h6>
              <div className="mb-3">
                <div className="form-check form-check-inline me-4">
                  <input 
                    className="form-check-input" 
                    type="radio" 
                    name="doctorSelect" 
                    id="allDoctors" 
                    checked={doctorSelect === 'allDoctors'}
                    onChange={() => setDoctorSelect('allDoctors')}
                  />
                  <label className="form-check-label" htmlFor="allDoctors">All Doctors</label>
                </div>
                <div className="form-check form-check-inline">
                  <input 
                    className="form-check-input" 
                    type="radio" 
                    name="doctorSelect" 
                    id="selectiveDoctors" 
                    checked={doctorSelect === 'selectiveDoctors'}
                    onChange={() => setDoctorSelect('selectiveDoctors')}
                  />
                  <label className="form-check-label" htmlFor="selectiveDoctors">Selective Doctors</label>
                </div>
              </div>

              {doctorSelect === 'selectiveDoctors' && (
                <div className="row mt-2 g-2 overflow-auto border p-2 rounded" style={{ maxHeight: '180px' }}>
                  {doctorList.map((doctor, i) => (
                    <div className="col-md-6 col-lg-4" key={i}>
                      <div className="form-check">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          id={`doc-${i}`}
                          checked={selectedDoctors.includes(doctor)}
                          onChange={() => handleDoctorCheckboxChange(doctor)}
                        />
                        <label className="form-check-label" htmlFor={`doc-${i}`}>
                          {doctor}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Report Filters */}
            <div className="mb-4 border rounded-3 p-3 bg-light shadow-sm">
              <h6 className="fw-bold mb-3 text-dark">Report Type</h6>
              <div className="row g-3">
                {[
                  'All','Only Doctor Ch.', 'Only Service Ch.', "Doctor's Ch. (Summary)",
                  'Visit ID Wise', 'Visit Type Wise', 'Visit Type User Wise',
                  'Registration No Wise', 'Visit Type grp Wise', 'COMPANY WISE'
                ].map((opt, index) => (
                  <div className="col-md-6 col-lg-4" key={index}>
                    <div className="form-check">
                      <input 
                        className="form-check-input" 
                        type="radio" 
                        name="reportFilter" 
                        id={`filter-${index}`}
                        checked={reportType === opt}
                        onChange={() => setReportType(opt)}
                      />
                      <label className="form-check-label" htmlFor={`filter-${index}`}>
                        {opt}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="text-center text-md-end mt-4 pt-3 border-top">
              <button 
                type="button" 
                className="btn btn-primary me-2 px-4 py-2" 
                onClick={handlePrintReport}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Print Report'}
              </button>
              <button type="button" className="btn btn-outline-secondary px-4 py-2">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default DrRectVisitDetail;