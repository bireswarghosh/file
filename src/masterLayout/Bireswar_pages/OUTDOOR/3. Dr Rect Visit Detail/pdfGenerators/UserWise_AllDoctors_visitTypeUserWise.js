import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateUserWiseAllDoctorsVisitTypeUserWisePDF = (data, fromDate, toDate) => {
  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let currentPage = 1;
  let totalPages = 1;
  
  const getUserName = (userId) => {
    const userMap = {
      '1': 'admin',
      '42': 'SANJAY ST.',
      '39': 'MADHU MISH',
      '43': 'LABONI'
    };
    return userMap[userId] || userId || '';
  };
  
  const getVisitTypeName = (visitTypeId) => {
    const visitTypeMap = {
      '1': 'CONSULTATION',
      '2': 'DIAGNOSIS',
      '3': 'REPORTING'
    };
    return visitTypeMap[visitTypeId] || visitTypeId || 'UNKNOWN';
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
    doc.text("DATE WISE VISIT TYPE WISE DETAIL FOR OUTDOOR", pageWidth / 2, 30, { align: "center" });
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.text(`Date : ${fromDate}`, 15, 40);
    doc.text(`To : ${toDate}`, 80, 40);
    doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - 30, 40);
    
    autoTable(doc, {
      head: [['Type of Visit', 'No of Visit', 'Rate', 'Amount', 'No of Cancel', 'Cancel Amt.', 'Adv. Amt', 'Discount', 'Amount']],
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
        0: { cellWidth: 25 },
        1: { cellWidth: 20 },
        2: { cellWidth: 20 },
        3: { cellWidth: 20 },
        4: { cellWidth: 20 },
        5: { cellWidth: 20 },
        6: { cellWidth: 20 },
        7: { cellWidth: 20 },
        8: { cellWidth: 20 }
      },
      margin: { left: 5, right: 5 }
    });
  };
  
  // Group data by visit type, then by user
  const groupedData = data.reduce((acc, visit) => {
    const visitType = getVisitTypeName(visit.VisitType);
    const userName = getUserName(visit.UserId);
    
    if (!acc[visitType]) {
      acc[visitType] = {};
    }
    if (!acc[visitType][userName]) {
      acc[visitType][userName] = [];
    }
    acc[visitType][userName].push(visit);
    return acc;
  }, {});
  
  let grandTotalVisits = 0;
  let grandTotalRate = 0;
  let grandTotalAmount = 0;
  let grandTotalCancel = 0;
  let grandTotalCancelAmt = 0;
  let grandTotalAdvAmt = 0;
  let grandTotalDiscount = 0;
  let grandTotalFinalAmount = 0;
  
  addHeader(currentPage);
  let currentY = doc.lastAutoTable.finalY + 5;
  
  // Visit Date header
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text(`Visit Date : ${fromDate}`, 10, currentY);
  currentY += 5;
  
  Object.keys(groupedData).forEach(visitType => {
    Object.keys(groupedData[visitType]).forEach(userName => {
      const userVisits = groupedData[visitType][userName];
      
      // Calculate totals for this user
      const visitCount = userVisits.length;
      const totalRate = userVisits.reduce((sum, visit) => sum + (visit.Rate || 0), 0);
      const totalAmount = userVisits.reduce((sum, visit) => sum + (visit.TotAmount || 0), 0);
      const cancelCount = userVisits.filter(visit => visit.Status === 'CANCELLED').length;
      const cancelAmt = 0; // Based on image, this appears to be 0
      const advAmt = userVisits.reduce((sum, visit) => sum + (visit.AdvanceAmount || 0), 0);
      const discount = userVisits.reduce((sum, visit) => sum + (visit.Discount || 0), 0);
      const finalAmount = totalAmount;
      
      // Add to grand totals
      grandTotalVisits += visitCount;
      grandTotalRate += totalRate;
      grandTotalAmount += totalAmount;
      grandTotalCancel += cancelCount;
      grandTotalCancelAmt += cancelAmt;
      grandTotalAdvAmt += advAmt;
      grandTotalDiscount += discount;
      grandTotalFinalAmount += finalAmount;
      
      // User header
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text(`User : ${userName}`, 10, currentY);
      currentY += 3;
      
      // Visit type row
      autoTable(doc, {
        body: [[
          visitType,
          visitCount.toString(),
          totalRate.toFixed(2),
          totalAmount.toFixed(2),
          cancelCount.toString(),
          cancelAmt.toFixed(2),
          advAmt.toFixed(2),
          discount.toFixed(2),
          finalAmount.toFixed(2)
        ]],
        startY: currentY,
        theme: 'grid',
        styles: { fontSize: 7, cellPadding: 1, halign: 'center' },
        columnStyles: {
          0: { cellWidth: 25, halign: 'left' },
          1: { cellWidth: 20 },
          2: { cellWidth: 20 },
          3: { cellWidth: 20 },
          4: { cellWidth: 20 },
          5: { cellWidth: 20 },
          6: { cellWidth: 20 },
          7: { cellWidth: 20 },
          8: { cellWidth: 20 }
        },
        margin: { left: 5, right: 5 }
      });
      
      currentY = doc.lastAutoTable.finalY + 2;
      
      // User total row
      autoTable(doc, {
        body: [[
          '',
          visitCount.toString(),
          totalRate.toFixed(2),
          totalAmount.toFixed(2),
          cancelCount.toString(),
          cancelAmt.toFixed(2),
          advAmt.toFixed(2),
          discount.toFixed(2),
          finalAmount.toFixed(2)
        ]],
        startY: currentY,
        theme: 'grid',
        styles: { fontSize: 7, cellPadding: 1, halign: 'center', lineColor: [0, 0, 0], lineWidth: 0.3 },
        columnStyles: {
          0: { cellWidth: 25 },
          1: { cellWidth: 20 },
          2: { cellWidth: 20 },
          3: { cellWidth: 20 },
          4: { cellWidth: 20 },
          5: { cellWidth: 20 },
          6: { cellWidth: 20 },
          7: { cellWidth: 20 },
          8: { cellWidth: 20 }
        },
        margin: { left: 5, right: 5 }
      });
      
      currentY = doc.lastAutoTable.finalY + 3;
    });
  });
  
  // Day Total
  autoTable(doc, {
    body: [[
      { content: `Day Total : (${fromDate})`, styles: { fontStyle: 'bold', halign: 'left', fillColor: [255, 255, 255] } },
      { content: grandTotalVisits.toString(), styles: { fontStyle: 'bold', halign: 'center', fillColor: [255, 255, 255] } },
      { content: grandTotalRate.toFixed(2), styles: { fontStyle: 'bold', halign: 'center', fillColor: [255, 255, 255] } },
      { content: grandTotalAmount.toFixed(2), styles: { fontStyle: 'bold', halign: 'center', fillColor: [255, 255, 255] } },
      { content: grandTotalCancel.toString(), styles: { fontStyle: 'bold', halign: 'center', fillColor: [255, 255, 255] } },
      { content: grandTotalCancelAmt.toFixed(2), styles: { fontStyle: 'bold', halign: 'center', fillColor: [255, 255, 255] } },
      { content: grandTotalAdvAmt.toFixed(2), styles: { fontStyle: 'bold', halign: 'center', fillColor: [255, 255, 255] } },
      { content: grandTotalDiscount.toFixed(2), styles: { fontStyle: 'bold', halign: 'center', fillColor: [255, 255, 255] } },
      { content: grandTotalFinalAmount.toFixed(2), styles: { fontStyle: 'bold', halign: 'center', fillColor: [255, 255, 255] } }
    ]],
    startY: currentY,
    theme: 'grid',
    styles: { fontSize: 7, cellPadding: 1, lineColor: [0, 0, 0], lineWidth: 0.5 },
    columnStyles: {
      0: { cellWidth: 25 },
      1: { cellWidth: 20 },
      2: { cellWidth: 20 },
      3: { cellWidth: 20 },
      4: { cellWidth: 20 },
      5: { cellWidth: 20 },
      6: { cellWidth: 20 },
      7: { cellWidth: 20 },
      8: { cellWidth: 20 }
    },
    margin: { left: 5, right: 5 }
  });
  
  currentY = doc.lastAutoTable.finalY + 2;
  
  // Grand Total
  autoTable(doc, {
    body: [[
      { content: 'Grand Total :', styles: { fontStyle: 'bold', halign: 'left', fillColor: [255, 255, 255] } },
      { content: grandTotalVisits.toString(), styles: { fontStyle: 'bold', halign: 'center', fillColor: [255, 255, 255] } },
      { content: grandTotalRate.toFixed(2), styles: { fontStyle: 'bold', halign: 'center', fillColor: [255, 255, 255] } },
      { content: grandTotalAmount.toFixed(2), styles: { fontStyle: 'bold', halign: 'center', fillColor: [255, 255, 255] } },
      { content: grandTotalCancel.toString(), styles: { fontStyle: 'bold', halign: 'center', fillColor: [255, 255, 255] } },
      { content: grandTotalCancelAmt.toFixed(2), styles: { fontStyle: 'bold', halign: 'center', fillColor: [255, 255, 255] } },
      { content: grandTotalAdvAmt.toFixed(2), styles: { fontStyle: 'bold', halign: 'center', fillColor: [255, 255, 255] } },
      { content: grandTotalDiscount.toFixed(2), styles: { fontStyle: 'bold', halign: 'center', fillColor: [255, 255, 255] } },
      { content: grandTotalFinalAmount.toFixed(2), styles: { fontStyle: 'bold', halign: 'center', fillColor: [255, 255, 255] } }
    ]],
    startY: currentY,
    theme: 'grid',
    styles: { fontSize: 7, cellPadding: 1, lineColor: [255, 0, 0], lineWidth: 1 },
    columnStyles: {
      0: { cellWidth: 25 },
      1: { cellWidth: 20 },
      2: { cellWidth: 20 },
      3: { cellWidth: 20 },
      4: { cellWidth: 20 },
      5: { cellWidth: 20 },
      6: { cellWidth: 20 },
      7: { cellWidth: 20 },
      8: { cellWidth: 20 }
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