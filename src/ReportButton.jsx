// import React from "react";
// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";

// pdfMake.vfs = pdfFonts.pdfMake.vfs;

// const ReportButton = () => {
//   const generateReport = () => {
//     const docDefinition = {
//       content: [
//         { text: "LORDS DIAGNOSTIC", style: "header", alignment: "center" },
//         { text: "13/3, CIRCULAR 2ND BYE LANE,", alignment: "center" },
//         { text: "DATE WISE VISIT TYPE WISE DETAIL", style: "subheader", alignment: "center" },
//         {
//           columns: [
//             { text: "Date: 09/Sep/2023", alignment: "left" },
//             { text: "To: 09/Sep/2025", alignment: "right" }
//           ]
//         },
//         {
//           style: "tableExample",
//           table: {
//             headerRows: 1,
//             widths: ["auto", "*", "*", "auto", "auto", "auto", "auto"],
//             body: [
//               [
//                 { text: "Visit No", bold: true },
//                 { text: "Patient Name", bold: true },
//                 { text: "Doctor Name", bold: true },
//                 { text: "DoctorCh", bold: true },
//                 { text: "ScCharge", bold: true },
//                 { text: "Rate", bold: true, color: "red" },
//                 { text: "Amount", bold: true }
//               ],
//               ["RRR00534", "BANI PALIT", "Dr. ABHRA MUKHOPADHYAY", 400, 50, 450, 450],
//               ["RRR00535", "SWETA KACHROO", "Dr. AGNIBHA MAITI", 400, 100, 500, 500],
//               ["RRR00536", "AVUB HALDER", "Dr. C.K. KUNDU", 700, 100, 800, 800],
//               [
//                 { text: "Day Total", colSpan: 6, alignment: "right", bold: true }, 
//                 {}, {}, {}, {}, {}, 
//                 { text: "6,500", bold: true }
//               ]
//             ]
//           }
//         }
//       ],
//       styles: {
//         header: { fontSize: 18, bold: true },
//         subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
//         tableExample: { margin: [0, 5, 0, 15] }
//       }
//     };

//     pdfMake.createPdf(docDefinition).download("report.pdf");
//   };

//   return (
//     <button 
//       onClick={generateReport} 
//       style={{ padding: "10px 20px", background: "blue", color: "white", borderRadius: "5px" }}
//     >
//       Download Report
//     </button>
//   );
// };

// export default ReportButton;
