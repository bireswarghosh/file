import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateUserWiseAllDoctorsVisitTypeGrpWisePDF = (data, fromDate, toDate) => {
  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let currentPage = 1;
  let totalPages = 1;
  
  const getUserName = (visit) => {
    return visit.UserName || visit.UserId || '';
  };
  
  const getVisitTypeName = (visit) => {
    return visit.VisitTypeName || visit.VisitTypeId || 'UNKNOWN';
  };
  
  const addHeader = (pageNum) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("LORDS DIAGNOSTIC", pageWidth / 2, 15, { align: "center" });
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("13/3, CIRCULAR 2ND BYE LANE,", pageWidth / 2, 20, { align: "center" });
    
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 0, 0);
    doc.setFontSize(11);
    doc.text("DATE WISE VISIT TYPE WISE DETAIL", pageWidth / 2, 30, { align: "center" });
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.text(`Date : ${fromDate}`, 15, 40);
    doc.text(`To : ${toDate}`, 80, 40);
    doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - 30, 40);
    
    autoTable(doc, {
      head: [['Visit No', 'Patient Name', 'Doctor Name', 'DoctorCh', 'ScCharge', 'Rate', 'Adv. Amt', 'Discount', 'Amount', 'Entry By']],
      body: [],
      startY: 45,
      theme: 'grid',
      headStyles: {
        fillColor: [220, 220, 220],
        textColor: [0, 0, 0],
        fontStyle: 'bold',
        fontSize: 7,
        halign: 'center'
      },
      styles: { fontSize: 7, cellPadding: 1 },
      columnStyles: {
        0: { cellWidth: 15 },
        1: { cellWidth: 30 },
        2: { cellWidth: 30 },
        3: { cellWidth: 18 },
        4: { cellWidth: 18 },
        5: { cellWidth: 18 },
        6: { cellWidth: 18 },
        7: { cellWidth: 18 },
        8: { cellWidth: 18 },
        9: { cellWidth: 17 }
      },
      margin: { left: 5, right: 5 }
    });
  };
  
  // Group data by visit type
  const groupedData = data.reduce((acc, visit) => {
    const visitType = getVisitTypeName(visit);
    if (!acc[visitType]) {
      acc[visitType] = [];
    }
    acc[visitType].push(visit);
    return acc;
  }, {});
  
  let grandTotalDoctorCh = 0;
  let grandTotalScCharge = 0;
  let grandTotalRate = 0;
  let grandTotalAdvAmt = 0;
  let grandTotalDiscount = 0;
  let grandTotalAmount = 0;
  
  addHeader(currentPage);
  let currentY = doc.lastAutoTable.finalY + 5;
  
  // Visit Date header
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text(`Visit Date : ${fromDate}`, 10, currentY);
  currentY += 3;
  
  // Visit Type header
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text(`Visit Type : CONSULTATION`, 10, currentY);
  currentY += 5;
  
  Object.keys(groupedData).forEach((visitType, index) => {
    const visitTypeData = groupedData[visitType].map((visit, visitIndex) => {
      const doctorCh = visit.Rate || 0;
      const scCharge = visit.ServiceCharge || 0;
      const rate = visit.Rate || 0;
      const advAmt = visit.AdvanceAmount || 0;
      const discount = visit.Discount || 0;
      const amount = visit.TotAmount || 0;
      
      grandTotalDoctorCh += doctorCh;
      grandTotalScCharge += scCharge;
      grandTotalRate += rate;
      grandTotalAdvAmt += advAmt;
      grandTotalDiscount += discount;
      grandTotalAmount += amount;
      
      return [
        visit.VNo || '',
        visit.PatientName || '',
        visit.DoctorName || '',
        doctorCh.toFixed(2),
        scCharge.toFixed(2),
        rate.toFixed(2),
        advAmt.toFixed(2),
        discount.toFixed(2),
        amount.toFixed(2),
        getUserName(visit)
      ];
    });
    
    autoTable(doc, {
      body: visitTypeData,
      startY: currentY,
      theme: 'grid',
      styles: { fontSize: 7, cellPadding: 1, halign: 'center' },
      columnStyles: {
        0: { cellWidth: 15 },
        1: { cellWidth: 30, halign: 'left' },
        2: { cellWidth: 30, halign: 'left' },
        3: { cellWidth: 18 },
        4: { cellWidth: 18 },
        5: { cellWidth: 18 },
        6: { cellWidth: 18 },
        7: { cellWidth: 18 },
        8: { cellWidth: 18 },
        9: { cellWidth: 17, halign: 'center' }
      },
      margin: { left: 5, right: 5 }
    });
    
    currentY = doc.lastAutoTable.finalY + 2;
  });
  
  // Day Total
  autoTable(doc, {
    body: [[
      { content: 'Day Total :', colSpan: 3, styles: { fontStyle: 'bold', halign: 'right', fillColor: [255, 255, 255] } },
      { content: grandTotalDoctorCh.toFixed(2), styles: { fontStyle: 'bold', halign: 'center', fillColor: [255, 255, 255] } },
      { content: grandTotalScCharge.toFixed(2), styles: { fontStyle: 'bold', halign: 'center', fillColor: [255, 255, 255] } },
      { content: grandTotalRate.toFixed(2), styles: { fontStyle: 'bold', halign: 'center', fillColor: [255, 255, 255] } },
      { content: grandTotalAdvAmt.toFixed(2), styles: { fontStyle: 'bold', halign: 'center', fillColor: [255, 255, 255] } },
      { content: grandTotalDiscount.toFixed(2), styles: { fontStyle: 'bold', halign: 'center', fillColor: [255, 255, 255] } },
      { content: grandTotalAmount.toFixed(2), styles: { fontStyle: 'bold', halign: 'center', fillColor: [255, 255, 255] } },
      ''
    ]],
    startY: currentY,
    theme: 'grid',
    styles: { fontSize: 7, cellPadding: 1, lineColor: [0, 0, 0], lineWidth: 0.5 },
    columnStyles: {
      0: { cellWidth: 15 },
      1: { cellWidth: 30 },
      2: { cellWidth: 30 },
      3: { cellWidth: 18 },
      4: { cellWidth: 18 },
      5: { cellWidth: 18 },
      6: { cellWidth: 18 },
      7: { cellWidth: 18 },
      8: { cellWidth: 18 },
      9: { cellWidth: 17 }
    },
    margin: { left: 5, right: 5 }
  });
  
  currentY = doc.lastAutoTable.finalY + 2;
  
  // Grand Total
  autoTable(doc, {
    body: [[
      { content: 'Grand Total :', colSpan: 3, styles: { fontStyle: 'bold', halign: 'right', fillColor: [255, 255, 255] } },
      { content: grandTotalDoctorCh.toFixed(2), styles: { fontStyle: 'bold', halign: 'center', fillColor: [255, 255, 255] } },
      { content: grandTotalScCharge.toFixed(2), styles: { fontStyle: 'bold', halign: 'center', fillColor: [255, 255, 255] } },
      { content: grandTotalRate.toFixed(2), styles: { fontStyle: 'bold', halign: 'center', fillColor: [255, 255, 255] } },
      { content: grandTotalAdvAmt.toFixed(2), styles: { fontStyle: 'bold', halign: 'center', fillColor: [255, 255, 255] } },
      { content: grandTotalDiscount.toFixed(2), styles: { fontStyle: 'bold', halign: 'center', fillColor: [255, 255, 255] } },
      { content: grandTotalAmount.toFixed(2), styles: { fontStyle: 'bold', halign: 'center', fillColor: [255, 255, 255] } },
      ''
    ]],
    startY: currentY,
    theme: 'grid',
    styles: { fontSize: 7, cellPadding: 1, lineColor: [255, 0, 0], lineWidth: 1 },
    columnStyles: {
      0: { cellWidth: 15 },
      1: { cellWidth: 30 },
      2: { cellWidth: 30 },
      3: { cellWidth: 18 },
      4: { cellWidth: 18 },
      5: { cellWidth: 18 },
      6: { cellWidth: 18 },
      7: { cellWidth: 18 },
      8: { cellWidth: 18 },
      9: { cellWidth: 17 }
    },
    margin: { left: 5, right: 5 }
  });
  
  // Print Date & Time
  const now = new Date();
  const printDate = now.toLocaleDateString('en-GB');
  const printTime = now.toLocaleTimeString('en-GB', { hour12: false });
  
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);
  doc.text(`Print Date & Time : ${printDate} ${printTime}`, 10, pageHeight - 10);
  
  // Update page numbers
  totalPages = currentPage;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - 30, 40);
  }
  
  return doc;
};