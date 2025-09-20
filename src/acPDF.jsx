import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const generatePDF = () => {
  const doc = new jsPDF("p", "mm", "a4");
  const margin = { top: 15, left: 15, right: 15 };
  const pageWidth = doc.internal.pageSize.getWidth();

  // Title Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("LORDS HEALTH CARE", pageWidth / 2, margin.top, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(
    "13/3, Circular 2nd Bye Lane, Kona Expressway, (Near Jumanabala Balika Vidyalaya)\nShibpur, Howrah - 711 102, W.B.",
    pageWidth / 2,
    margin.top + 6,
    { align: "center" }
  );
  doc.text(
    "Phone No.: 8272904444 HELPLINE - 7003378414 Toll Free: 1800-309-0895\nE-mail: patientdesk@lordshealthcare.org | Website: www.lordshealthcare.org",
    pageWidth / 2,
    margin.top + 16,
    { align: "center" }
  );

  // Main Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("ADVANCE BOOKING - MONEY RECEIPT", pageWidth / 2, margin.top + 28, {
    align: "center",
  });

  // Patient & Booking Details (with borders)
  let details = [
    ["Serial No :", "1", "Registration Date :", "01/09/2023"],
    ["Visit Date :", "01/09/2023", "Visit ID :", "RRR00351"],
    ["Registration ID :", "S-004018/23-24", "Visit Time :", "08:20 AM"],
    ["Booking Time :", "08:20 AM", "Sex :", "Female"],
    ["Age :", "Y57", "Patient Name :", "MOUSUMI SARKAR"],
    ["Phone No :", "9804600046", "Address :", "HOWRAH"],
  ];

  autoTable(doc, {
    startY: margin.top + 34,
    body: details,
    theme: "grid", // 🔹 enable borders
    styles: { fontSize: 9, cellPadding: 2, lineWidth: 0.2 },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 35 },
      2: { fontStyle: "bold", cellWidth: 40 },
    },
  });

  // Doctor & Department (with border)
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 4,
    body: [["CONSULTANT :", "MD. SALAHUDDIN", "Department :", "ORTHOPAEDIC"]],
    theme: "grid", // 🔹 enable borders
    styles: { fontSize: 9, cellPadding: 2, lineWidth: 0.2 },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 35 },
      2: { fontStyle: "bold", cellWidth: 30 },
    },
  });

  // Charges Table (with header highlight + borders)
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 8,
    head: [["Amount (Rs.)", "Particulars / Description"]],
    body: [
      ["100.00", "Service Charge"],
      ["500.00", "CONSULTATION - Professional Charge"],
    ],
    theme: "grid", // 🔹 visible borders
    styles: { fontSize: 10, cellPadding: 3, lineWidth: 0.3 },
    headStyles: {
      fillColor: [200, 200, 200],
      textColor: [0, 0, 0],
      fontStyle: "bold",
    },
  });

  // Highlight Total in Red Box
  let y = doc.lastAutoTable.finalY + 6;
  doc.setDrawColor(255, 0, 0);
  doc.setLineWidth(0.5);
  doc.rect(margin.left, y, pageWidth - margin.left * 2, 10);
  doc.setFont("helvetica", "bold");
  doc.text("TOTAL : 600.00", pageWidth - margin.right - 10, y + 7, {
    align: "right",
  });

  // Footer Section
  y += 18;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(
    "Received With Thanks For CONSULTATION Charges From MOUSUMI SARKAR",
    margin.left,
    y
  );
  doc.text("Received By : SANJAY ST.", margin.left, y + 6);

  y += 14;
  doc.setFont("helvetica", "bold");
  doc.text("PAID : Rupees Six Hundred & Zero Paise Only (600.00)", margin.left, y);

 


  // Save PDF
  doc.save("report.pdf");
};

const AcPDFDownload = () => {
  return (
    <button onClick={generatePDF} className="btn btn-primary">
      Download PDF
    </button>
  );
};

export default AcPDFDownload;
