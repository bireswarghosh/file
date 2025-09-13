import React, { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import MasterLayout from '../../../MasterLayout';
import Breadcrumb from '../../../Breadcrumb';

const DrRectVisitDetail = () => {
  const fromDateRef = useRef();
  const toDateRef = useRef();
  const [viewOption, setViewOption] = useState('DoctorWise');
  const [doctorSelect, setDoctorSelect] = useState('allDoctors');
  const [selectedDoctors, setSelectedDoctors] = useState([]);
  const [reportType, setReportType] = useState('');

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

  const handlePrintReport = () => {
    const doc = new jsPDF();

    // Define styles for better visual appearance
    const headerStyles = { fontSize: 16, fontWeight: 'bold', textColor: [0, 0, 0] };
    const subHeaderStyles = { fontSize: 12, textColor: [0, 0, 0] };
    const tableHeaderStyles = { fillColor: [220, 220, 220], textColor: [0, 0, 0], fontSize: 10, fontStyle: 'bold' };
    const tableRowStyles = { fontSize: 9, textColor: [0, 0, 0] };
    const totalStyles = { fontSize: 10, fontStyle: 'bold', textColor: [0, 0, 0] };

    let yPosition = 15;
    const margin = 10;

    // Company Information
    doc.setFontSize(headerStyles.fontSize);
    doc.setFont('helvetica', 'bold');
    doc.text(reportData.companyName, margin, yPosition);
    yPosition += 5;
    doc.setFontSize(subHeaderStyles.fontSize);
    doc.setFont('helvetica', 'normal');
    doc.text(reportData.companyAddress, margin, yPosition);
    yPosition += 10;

    // Report Title and Date Range
    doc.setFontSize(headerStyles.fontSize);
    doc.setFont('helvetica', 'bold');
    doc.text(reportData.title, margin, yPosition);
    yPosition += 7;
    doc.setFontSize(subHeaderStyles.fontSize);
    doc.setFont('helvetica', 'normal');
    doc.text(`Date: ${reportData.dateRange.from} To : ${reportData.dateRange.to}`, margin, yPosition);
    doc.text(reportData.pageNumber, doc.internal.pageSize.getWidth() - margin - doc.getTextWidth(reportData.pageNumber), yPosition);
    yPosition += 10;

    reportData.visits.forEach((visit) => {
      doc.setFontSize(subHeaderStyles.fontSize);
      doc.setFont('helvetica', 'bold');
      doc.text(visit.doctor, margin, yPosition);
      yPosition += 5;
      doc.setFont('helvetica', 'normal');
      doc.text(visit.category, margin, yPosition);
      yPosition += 7;

      // Table Headers
      const headers = ['Visit No', 'Patient Name', 'Prof.Chrg', 'Discount', 'Total Amt.', 'Rec. Amt.', 'Entry By'];
      const tableData = visit.patients.map((patient) => [
        patient.visitNo,
        patient.patientName,
        patient.profChrg.toFixed(2),
        patient.discount || '',
        patient.totalAmt.toFixed(2),
        patient.recAmt.toFixed(2),
        patient.entryBy,
      ]);

      doc.autoTable({
        head: [headers],
        body: tableData,
        startY: yPosition,
        margin: { left: margin, right: margin },
        styles: tableRowStyles,
        headStyles: tableHeaderStyles,
      });

      yPosition = doc.autoTable.previous.finalY + 5;

      // Paymode Total
      doc.setFontSize(totalStyles.fontSize);
      doc.setFont('helvetica', 'bold');
      doc.text(`Paymode Total:`, margin, yPosition, { align: 'left' });
      doc.text(visit.paymodeTotal.toFixed(2), margin + 100, yPosition, { align: 'left' });
      yPosition += 5;

      // Doctor Total
      doc.text(`Doctor Total:`, margin, yPosition, { align: 'left' });
      doc.text(visit.doctorTotal.toFixed(2), margin + 100, yPosition, { align: 'left' });
      yPosition += 10;
    });

    // Day Total
    doc.setFontSize(totalStyles.fontSize);
    doc.setFont('helvetica', 'bold');
    doc.text(`Day Total:`, margin, yPosition, { align: 'left' });
    doc.text(reportData.dayTotal.toFixed(2), margin + 100, yPosition, { align: 'left' });
    yPosition += 5;

    // Day Discount
    doc.text(`Day Discount:`, margin, yPosition, { align: 'left' });
    doc.text(reportData.dayDiscount.toFixed(2), margin + 100, yPosition, { align: 'left' });
    yPosition += 5;

    // Day Grand Total
    doc.text(`Day Grand Total:`, margin, yPosition, { align: 'left' });
    doc.text(reportData.dayGrandTotal.toFixed(2), margin + 100, yPosition, { align: 'left' });

    // Open PDF in new tab
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
                  'Only Doctor Ch.', 'Only Service Ch.', "Doctor's Ch. (Summary)",
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
              >
                Print Report
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