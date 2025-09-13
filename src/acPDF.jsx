// // import { jsPDF } from "jspdf";
// // import autoTable from "jspdf-autotable";

// // export const generatePDF = () => {
// //   const doc = new jsPDF();

// //   // Header Info
// //   doc.setFontSize(12);
// //   doc.text("AGENT Name : DR ADITYA GHOSH", 14, 15);
// //   doc.text("From:", 150, 15);
// //   doc.text("To: 200117", 180, 15);

// //   // Table Data
// //   const tableData = [
// //     [
// //       "1617/013",
// //       "09-05-2016",
// //       "KALPANA KHOTEL / Dr. ABHIJIT MITRA",
// //       "USG WHOLE ABDOMEN (F)",
// //       "900.00",
// //       "200.00",
// //       "0.00",
// //       "0.00",
// //       "200.00",
// //       "0.00",
// //     ],
// //     [
// //       "1617/013",
// //       "09-05-2016",
// //       "HUMAYUN SIDDIQUE / CALCUTTA NATIONAL MEDICAL COLLE",
// //       "USG WHOLE ABDOMEN (M)",
// //       "900.00",
// //       "200.00",
// //       "0.00",
// //       "0.00",
// //       "200.00",
// //       "0.00",
// //     ],
// //     [
// //       "1617/014",
// //       "11-05-2016",
// //       "SANJIT MAKHLAI / MEDICAL COLLEGE & HOSPITAL",
// //       "USG WHOLE ABDOMEN (M)",
// //       "900.00",
// //       "200.00",
// //       "0.00",
// //       "0.00",
// //       "200.00",
// //       "0.00",
// //     ],
// //     [
// //       "1617/014",
// //       "11-05-2016",
// //       "MADHABI KARMAKAR / Dr. ASHIM BANERJEE",
// //       "USG WHOLE ABDOMEN (F)",
// //       "900.00",
// //       "200.00",
// //       "0.00",
// //       "0.00",
// //       "200.00",
// //       "0.00",
// //     ],
// //     [
// //       "1617/014",
// //       "11-05-2016",
// //       "PRITAM DAS / Dr. S K DAS",
// //       "USG KUB (MALE)",
// //       "600.00",
// //       "115.00",
// //       "100.00",
// //       "10.00",
// //       "15.00",
// //       "0.00",
// //     ],
// //   ];

// //   // Table Head
// //   const tableHead = [
// //     [
// //       "Case No",
// //       "Case Date",
// //       "Patient / Doctor",
// //       "Test",
// //       "Rate",
// //       "Comms",
// //       "Discount",
// //       "Doc-Dis",
// //       "Net Com",
// //       "Due Amt",
// //     ],
// //   ];

// //   // AutoTable
// //   const tableResult = autoTable(doc, {
// //     head: tableHead,
// //     body: tableData,
// //     startY: 25,
// //     styles: { fontSize: 8 },
// //     theme: "grid",
// //   });

// //   // Footer (Grand Total)
// //   const finalY = 25 + (tableData.length * 10) + 30;
// //   doc.setFontSize(10);
// //   doc.text("Grand Total : 4200.00", 14, finalY);
// //   doc.text("915.00", 120, finalY);
// //   doc.text("100.00", 150, finalY);
// //   doc.text("815.00", 180, finalY);

// //   // Save PDF
// //   doc.save("report.pdf");
// // };

// // const AcPDFDownload = () => {
// //   return (
// //     <button onClick={generatePDF} className="btn btn-primary">
// //       Download PDF
// //     </button>
// //   );
// // };

// // export default AcPDFDownload;


























// import { jsPDF } from "jspdf";
// import autoTable from "jspdf-autotable";

// export const generatePDF = () => {
//   const doc = new jsPDF();
//   const pageHeight = doc.internal.pageSize.height;

//   // ---- Sample Data ----
//   const agents = [
//     {
//       name: "DR ADITYA GHOSH",
//       from: "",
//       to: "200117",
//       cases: [
//         {
//           caseId: "1617/013",
//           date: "09-05-2016",
//           patient: "KALPANA KHOTEL / Dr. ABHIJIT MITRA",
//           test: "USG WHOLE ABDOMEN (F)",
//           rate: 900, comm: 200, discount: 0, docDis: 0, netCom: 200, due: 0
//         },
//         {
//           caseId: "1617/013",
//           date: "09-05-2016",
//           patient: "HUMAYUN SIDDIQUE / CALCUTTA NATIONAL MEDICAL COLLE",
//           test: "USG WHOLE ABDOMEN (M)",
//           rate: 900, comm: 200, discount: 0, docDis: 0, netCom: 200, due: 0
//         },
//         {
//           caseId: "1617/014",
//           date: "11-05-2016",
//           patient: "SANJIT MAKHAL / MEDICAL COLLEGE & HOSPITAL",
//           test: "USG WHOLE ABDOMEN (M)",
//           rate: 900, comm: 200, discount: 0, docDis: 0, netCom: 200, due: 0
//         },
//         {
//           caseId: "1617/014",
//           date: "11-05-2016",
//           patient: "MADHABI KARMAKAR / Dr. ASHIM BANERJEE",
//           test: "USG WHOLE ABDOMEN (F)",
//           rate: 900, comm: 200, discount: 0, docDis: 0, netCom: 200, due: 0
//         },
//         {
//           caseId: "1617/014",
//           date: "11-05-2016",
//           patient: "PRITAM DAS / Dr. S K DAS",
//           test: "USG KUB (MALE)",
//           rate: 600, comm: 115, discount: 0, docDis: 100, netCom: 100, due: 15
//         }
//       ],
//       totals: { rate: 4200, comm: 915, discount: 0, docDis: 100, netCom: 815, due: 15 }
//     },
//     {
//       name: "LALJANA",
//       from: "",
//       to: "200117",
//       cases: [
//         {
//           caseId: "1617/015",
//           date: "11-05-2016",
//           patient: "RAJIV CHAKRABORTY / Dr. SHEEMA LEBRA",
//           test: "X-RAY LS SPINE (LAT)",
//           rate: 600, comm: 120, discount: 0, docDis: 0, netCom: 120, due: 0
//         },
//         {
//           caseId: "1617/016",
//           date: "11-05-2016",
//           patient: "RUKHMINI DEVI / Dr. JOHN PRATAP",
//           test: "USG WHOLE ABDOMEN (M)",
//           rate: 900, comm: 200, discount: 0, docDis: 0, netCom: 200, due: 0
//         }
//       ],
//       totals: { rate: 1500, comm: 320, discount: 0, docDis: 0, netCom: 320, due: 0 }
//     }
//   ];

//   let y = 15;

//   agents.forEach((agent) => {
//     if (y > pageHeight - 60) {
//       doc.addPage();
//       y = 15;
//     }

//     // 🔹 Agent Header
//     doc.setFontSize(11);
//     doc.setTextColor(200, 0, 0);
//     doc.text(`AGENT Name : ${agent.name}`, 14, y);
//     doc.setTextColor(0, 0, 0);
//     doc.text(`From: ${agent.from}   To: ${agent.to}`, 150, y);
//     y += 5;

//     // 🔹 Table Head
//     const head = [[
//       "Case No", "Case Date", "Patient / Doctor", "Test",
//       "Rate", "Comms", "Discount", "Doc-Dis", "Net Com", "Due Amt"
//     ]];

//     // 🔹 Table Body
//     const body = [];
//     agent.cases.forEach(c => {
//       body.push([
//         c.caseId, c.date, c.patient, c.test,
//         c.rate.toFixed(2), c.comm.toFixed(2), c.discount.toFixed(2),
//         c.docDis.toFixed(2), c.netCom.toFixed(2), c.due.toFixed(2)
//       ]);

//       body.push([
//         "", "", "", "Case Total :",
//         c.rate.toFixed(2), c.comm.toFixed(2), c.discount.toFixed(2),
//         c.docDis.toFixed(2), c.netCom.toFixed(2), c.due.toFixed(2)
//       ]);
//     });

//     // 🔹 Grand Total
//     body.push([
//       "", "", "", "Grand Total :",
//       agent.totals.rate.toFixed(2),
//       agent.totals.comm.toFixed(2),
//       agent.totals.discount.toFixed(2),
//       agent.totals.docDis.toFixed(2),
//       agent.totals.netCom.toFixed(2),
//       agent.totals.due.toFixed(2)
//     ]);

//     // 🔹 Render Table
//     autoTable(doc, {
//       head,
//       body,
//       startY: y,
//       styles: { fontSize: 8, halign: "right" },
//       headStyles: { fillColor: [240, 240, 240], textColor: 0, halign: "center" },
//       bodyStyles: { valign: "middle" },
//       theme: "grid",
//       margin: { bottom: 20 },
//       pageBreak: "auto",
//       didParseCell: (data) => {
//         if (data.row.raw[3] === "Case Total :" || data.row.raw[3] === "Grand Total :") {
//           data.cell.styles.fontStyle = "bold";
//           data.cell.styles.fillColor = [250, 250, 250];
//         }
//       },
//       didDrawPage: (data) => {
//         y = data.cursor.y + 15;
//       }
//     });
//   });

//   doc.save("agent-report.pdf");
// };

// const AcPDFDownload = () => {
//   return (
//     <button onClick={generatePDF} className="btn btn-primary">
//       Download PDF
//     </button>
//   );
// };

// export default AcPDFDownload;





























import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const generatePDF = () => {
  const doc = new jsPDF("p", "mm", "a4");
  const margin = { top: 20, left: 15, right: 15 };
  const pageWidth = doc.internal.pageSize.getWidth();
 
  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("DATE WISE DOCTOR WISE VISIT (DOCTORS' DETAIL)", pageWidth / 2, 15, {
    align: "center",
  });

  // Header info
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("To : ____________", 15, 25);
  doc.text("Date : ____________", pageWidth - 60, 25);
  doc.text("Visit Date : ____________", 15, 32);
  doc.text("Consultant : ____________________", 100, 32);

  // Table
  autoTable(doc, {
    startY: 40,
    head: [
      [
        "Visit No",
        "Patient Name",
        "Doctor",
        "Charge",
        "Discount",
        "Amount",
        "Entry By",
      ],
    ],
    body: [
      ["1001", "John Smith", "Dr. Patel", "500", "50", "450", "Admin"],
      ["1002", "Emma Brown", "Dr. Roy", "600", "0", "600", "Admin"],
      [
        { content: "Doctor Total :", colSpan: 6, styles: { halign: "right", fillColor: [255, 230, 230], textColor: [200, 0, 0] } },
        { content: "1050", styles: { fillColor: [255, 230, 230], textColor: [200, 0, 0] } },
      ],
      [
        { content: "Day Total :", colSpan: 6, styles: { halign: "right", fillColor: [255, 180, 180], textColor: [200, 0, 0], fontStyle: "bold" } },
        { content: "1050", styles: { fillColor: [255, 180, 180], textColor: [200, 0, 0], fontStyle: "bold" } },
      ],
      [
        { content: "Grand Total :", colSpan: 6, styles: { halign: "right", fillColor: [255, 150, 150], textColor: [200, 0, 0], fontStyle: "bold" } },
        { content: "1050", styles: { fillColor: [255, 150, 150], textColor: [200, 0, 0], fontStyle: "bold" } },
      ],
    ],
    theme: "grid",
    styles: {
      fontSize: 9,
      cellPadding: 2,
    },
    headStyles: {
      fillColor: [200, 0, 0],
      textColor: [255, 255, 255],
      halign: "center",
    },
  });

  // Footer
  const finalY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(9);
  doc.text(`Print Date & Time : ${new Date().toLocaleString()}`, 15, finalY);


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