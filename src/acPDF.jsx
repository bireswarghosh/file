import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const generatePDF = () => {
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

  // ===== Date Range (next line) =====
  doc.setFontSize(9);
  doc.setTextColor(0, 0, 0);
  doc.text("Date : 01/Sep/2023", 15, 32);
  doc.text("To : 24/Sep/2023", 60, 32);
  doc.text("Page 1 of 22", pageWidth - 30, 32);

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
      fillColor: [0, 128, 0],   // medical green
      textColor: [255, 255, 255],
      fontStyle: "bold",
      halign: "center",
    },
    styles: { fontSize: 9, halign: "center", cellPadding: 2 },
    margin: { left: 15, right: 15 },
    tableWidth: "auto",
  });

  let currentY = doc.lastAutoTable.finalY + 5;

  // ===== Visit Date Row =====
  doc.setTextColor(128, 0, 128); // purple
  doc.setFontSize(9);
  doc.text("Visit Date : 01/09/2023", 15, currentY);
  currentY += 6;

  // ===== Consultant Row =====
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.text("Consultant Dr. MD.SALAHUDDIN", 15, currentY);
  currentY += 6;

  // ===== CASH Row =====
  doc.text("CASH", 15, currentY);
  currentY += 4;

  // ===== Patient Data Table =====
  const patientData = [
    ["RRR00351", "MOUSUMI SARKAR", "", "", "500.00", "", "600.00", "600.00", "SANJAY ST."],
  ];

  autoTable(doc, {
    head: [],
    body: patientData,
    startY: currentY,
    theme: "plain",
    styles: { fontSize: 9, halign: "center", cellPadding: 2 },
    margin: { left: 15, right: 15 },
    tableWidth: "auto",
  });

 // ===== Paymode Total Row (Red Box, no column division) =====
  autoTable(doc, {
    body: [[{ content:                 "Paymode Total :          500.00            600.00            600.00", styles: { fontStyle: "bold", halign: "left" } }]],
    theme: "plain",
    startY: doc.lastAutoTable.finalY + 3,
    styles: { fontSize: 9, cellPadding: 3 },
    bodyStyles: { lineColor: [255, 0, 0], lineWidth: 0.6 },
    margin: { left: 15, right: 15 },
    tableWidth: "auto",
  });

  // ===== Doctor Total Row (Red Box, no column division) =====
  autoTable(doc, {
    body: [[{ content:                 "Doctor Total :   500.00     0.00           600.00          600.00", styles: { fontStyle: "bold", halign: "left" } }]],
    theme: "plain",
    startY: doc.lastAutoTable.finalY + 2,
    styles: { fontSize: 9, cellPadding: 3 },
    bodyStyles: { lineColor: [255, 0, 0], lineWidth: 0.6 },
    margin: { left: 15, right: 15 },
    tableWidth: "auto",
  });

   

  // ===== Save PDF =====
  doc.save("DoctorWiseVisitReport.pdf");
};

 
const AcPDFDownload = () => {
  return (
    <button onClick={generatePDF} className="btn btn-primary">
      Download PDF
    </button>
  );
};

export default AcPDFDownload;
