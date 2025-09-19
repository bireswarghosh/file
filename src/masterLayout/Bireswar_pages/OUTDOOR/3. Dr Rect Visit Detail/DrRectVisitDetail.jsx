import React, { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import axiosInstance from '../../../../axiosInstance';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';

const DrRectVisitDetail = () => {
  const fromDateRef = useRef();
  const toDateRef = useRef();
  const [viewOption, setViewOption] = useState('UserWise');
  const [doctorSelect, setDoctorSelect] = useState('allDoctors');
  const [selectedDoctors, setSelectedDoctors] = useState([]);
  const [reportType, setReportType] = useState('All');
  const [loading, setLoading] = useState(false);

  // Sample dynamic data (replace with your actual data fetching logic)
  const reportData = {
    title: 'DATE WISE DOCTOR VISIT (ALL_DETAIL)',
    companyName: 'LORDS DIAGNOSTIC',
    companyAddress: '13/1, CIRCULAR 2ND BYE LANE',
    dateRange: {
      from: '22/Feb/2025', // These could be dynamically set
      to: '22/Feb/2025',
    },
    pageNumber: 'Page 1 of 2', // This might need dynamic calculation for multi-page reports
    visits: [
      {
        doctor: 'Consultant Dr. ABHIJIT MUKHOPADHYAY',
        category: 'CASH',
        patients: [
          { visitNo: 'RRR00450', patientName: 'RDHA RANI GANGULY', profChrg: 450.00, discount: '', totalAmt: 500.00, recAmt: 500.00, entryBy: 'SUSANITA' },
          { visitNo: 'RRR00460', patientName: 'NASHIA KHATUN', profChrg: 450.00, discount: '', totalAmt: 500.00, recAmt: 500.00, entryBy: 'SUSANITA' },
          { visitNo: 'RRR00460', patientName: 'BARNALI BHATTERJEE', profChrg: 450.00, discount: '', totalAmt: 500.00, recAmt: 500.00, entryBy: 'SANJAY ST.' },
        ],
        paymodeTotal: 1350.00,
        doctorTotal: 1350.00,
      },
      {
        doctor: 'Consultant Dr. MD PAYEL CHAKRABORTY',
        category: 'CASH',
        patients: [
          { visitNo: 'RRR00460', patientName: 'NIBHA DAS', profChrg: 200.00, discount: '', totalAmt: 300.00, recAmt: 300.00, entryBy: 'SONALI BANERJI' },
          { visitNo: 'RRR00460', patientName: 'ARIA SINGH', profChrg: 200.00, discount: '', totalAmt: 300.00, recAmt: 300.00, entryBy: 'SONALI BANERJI' },
          { visitNo: 'RRR00460', patientName: 'ULY DAS', profChrg: 200.00, discount: '', totalAmt: 300.00, recAmt: 300.00, entryBy: 'SONALI BANERJI' },
        ],
        paymodeTotal: 600.00,
        doctorTotal: 600.00,
      },
      {
        doctor: 'Consultant Dr. RAJ NARAYAN ROY',
        category: 'CASH',
        patients: [
          { visitNo: 'RRR00460', patientName: 'SAMIR NASKAR', profChrg: 600.00, discount: '', totalAmt: 650.00, recAmt: 650.00, entryBy: 'SANJAY ST.' },
          { visitNo: 'RRR00460', patientName: 'SOMA JATI', profChrg: 600.00, discount: '', totalAmt: 650.00, recAmt: 650.00, entryBy: 'SANJAY ST.' },
          { visitNo: 'RRR00460', patientName: 'RABIN GHORUI', profChrg: 600.00, discount: '', totalAmt: 650.00, recAmt: 650.00, entryBy: 'SANJAY ST.' },
          { visitNo: 'RRR00460', patientName: 'REHANA SULTANA', profChrg: 600.00, discount: '', totalAmt: 650.00, recAmt: 650.00, entryBy: 'SANJAY ST.' },
        ],
        paymodeTotal: 2400.00,
        doctorTotal: 2400.00,
      },
    ],
    dayTotal: 4350.00,
    dayDiscount: 0.00,
    dayGrandTotal: 5000.00,
  };

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

  const handlePrintReport = async () => {
    const fromDate = fromDateRef.current?.value;
    const toDate = toDateRef.current?.value;
    
    if (!fromDate || !toDate) {
      alert('Please select both From and To dates');
      return;
    }
    
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
      
      generatePDFWithData(apiData, fromDate, toDate);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data from server');
    } finally {
      setLoading(false);
    }
  };
  
  const generatePDFWithData = (data, fromDate, toDate) => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();

    // ===== Clinic Header =====
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("LORDS DIAGNOSTIC", pageWidth / 2, 12, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("13/3, CIRCULAR 2ND BYE LANE,", pageWidth / 2, 17, { align: "center" });

    // ===== Report Title =====
    doc.setFont("helvetica", "bold");
    doc.setTextColor(200, 0, 0);
    doc.setFontSize(11);
    doc.text("DATE WISE DOCTOR WISE VISIT (ALL_DETAIL)", pageWidth / 2, 25, { align: "center" });

    // ===== Date Range =====
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    doc.text(`Date : ${fromDate}`, 15, 32);
    doc.text(`To : ${toDate}`, 60, 32);
    doc.text(`Page 1 of 1`, pageWidth - 30, 32);

    // ===== Table Header =====
    const head = [
      ["Visit No", "Patient Name", "Cancel", "Booking", "Prof.Chrg", "Discount", "Total Amt.", "recamt", "Entry By"],
    ];

    autoTable(doc, {
      head: head,
      body: [],
      theme: "plain",
      startY: 38,
      headStyles: {
        fillColor: [0, 128, 0],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        halign: "center",
      },
      styles: { fontSize: 9, halign: "center", cellPadding: 2 },
      margin: { left: 15, right: 15 },
      tableWidth: "auto",
    });

    let currentY = doc.lastAutoTable.finalY + 5;
    
    // Group data by doctor
    const groupedByDoctor = data.reduce((acc, visit) => {
      const doctorName = visit.DoctorName || 'Unknown Doctor';
      if (!acc[doctorName]) {
        acc[doctorName] = [];
      }
      acc[doctorName].push(visit);
      return acc;
    }, {});
    
    let totalProfChrg = 0;
    let totalDiscount = 0;
    let totalAmount = 0;
    let totalRecAmt = 0;
    
    Object.entries(groupedByDoctor).forEach(([doctorName, visits]) => {
      // ===== Visit Date Row =====
      doc.setTextColor(128, 0, 128);
      doc.setFontSize(9);
      doc.text(`Visit Date : ${fromDate}`, 15, currentY);
      currentY += 6;

      // ===== Consultant Row =====
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "bold");
      doc.text(`Consultant ${doctorName}`, 15, currentY);
      currentY += 6;

      // ===== CASH Row =====
      doc.text("CASH", 15, currentY);
      currentY += 4;

      // ===== Patient Data Table =====
      const patientData = visits.map(visit => [
        visit.RegistrationNo || '',
        visit.PatientName || '',
        visit.CancelYN || '',
        visit.BookingYN || '',
        (visit.Rate || 0).toFixed(2),
        (visit.Discount || 0).toFixed(2),
        (visit.TotAmount || 0).toFixed(2),
        (visit.RecAmt || 0).toFixed(2),
        visit.UserId || ''
      ]);

      autoTable(doc, {
        head: [],
        body: patientData,
        startY: currentY,
        theme: "plain",
        styles: { fontSize: 9, halign: "center", cellPadding: 2 },
        margin: { left: 15, right: 15 },
        tableWidth: "auto",
      });
      
      // Calculate totals for this doctor
      const doctorProfChrg = visits.reduce((sum, v) => sum + (v.Rate || 0), 0);
      const doctorDiscount = visits.reduce((sum, v) => sum + (v.Discount || 0), 0);
      const doctorTotalAmt = visits.reduce((sum, v) => sum + (v.TotAmount || 0), 0);
      const doctorRecAmt = visits.reduce((sum, v) => sum + (v.RecAmt || 0), 0);
      
      totalProfChrg += doctorProfChrg;
      totalDiscount += doctorDiscount;
      totalAmount += doctorTotalAmt;
      totalRecAmt += doctorRecAmt;

      // ===== Paymode Total Row =====
      autoTable(doc, {
        body: [[{ content: `Paymode Total : ${doctorProfChrg.toFixed(2)} ${doctorDiscount.toFixed(2)} ${doctorTotalAmt.toFixed(2)} ${doctorRecAmt.toFixed(2)}`, styles: { fontStyle: "bold", halign: "left" } }]],
        theme: "plain",
        startY: doc.lastAutoTable.finalY + 3,
        styles: { fontSize: 9, cellPadding: 3 },
        bodyStyles: { lineColor: [255, 0, 0], lineWidth: 0.6 },
        margin: { left: 15, right: 15 },
        tableWidth: "auto",
      });

      // ===== Doctor Total Row =====
      autoTable(doc, {
        body: [[{ content: `Doctor Total : ${doctorProfChrg.toFixed(2)} ${doctorDiscount.toFixed(2)} ${doctorTotalAmt.toFixed(2)} ${doctorRecAmt.toFixed(2)}`, styles: { fontStyle: "bold", halign: "left" } }]],
        theme: "plain",
        startY: doc.lastAutoTable.finalY + 2,
        styles: { fontSize: 9, cellPadding: 3 },
        bodyStyles: { lineColor: [255, 0, 0], lineWidth: 0.6 },
        margin: { left: 15, right: 15 },
        tableWidth: "auto",
      });
      
      currentY = doc.lastAutoTable.finalY + 10;
    });
    
    // ===== Grand Total =====
    autoTable(doc, {
      body: [[{ content: `Grand Total : ${totalProfChrg.toFixed(2)} ${totalDiscount.toFixed(2)} ${totalAmount.toFixed(2)} ${totalRecAmt.toFixed(2)}`, styles: { fontStyle: "bold", halign: "left", fontSize: 10 } }]],
      theme: "plain",
      startY: currentY,
      styles: { fontSize: 10, cellPadding: 4 },
      bodyStyles: { lineColor: [0, 0, 255], lineWidth: 1 },
      margin: { left: 15, right: 15 },
      tableWidth: "auto",
    });

    // ===== Open PDF in new tab =====
    window.open(doc.output('bloburl'), '_blank');
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Doctor Rect Visit Detail" />

      <div className="container my-5">
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-body p-4 p-md-5">
            {/* Date Range */}
            <div className="row g-3 mb-4 align-items-center">
              <div className="col-md-2 text-md-end">
                <label htmlFor="fromDate" className="form-label fw-semibold">Date Range:</label>
              </div>
              <div className="col-md-4">
                <div className="form-floating">
                  <input 
                    type="date" 
                    className="form-control" 
                    id="fromDate" 
                    placeholder="Date From" 
                    ref={fromDateRef}
                  />
                  <label htmlFor="fromDate">From</label>
                </div>
              </div>
              <div className="col-md-1 text-center fw-semibold d-none d-md-block">- To -</div>
              <div className="col-md-4">
                <div className="form-floating">
                  <input 
                    type="date" 
                    className="form-control" 
                    id="toDate" 
                    placeholder="Date To" 
                    ref={toDateRef}
                  />
                  <label htmlFor="toDate">To</label>
                </div>
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