import React, { useMemo } from "react";
// Install deps in your project:
// npm i jspdf jspdf-autotable
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * Bill Register PDF generator using jsPDF + autoTable.
 * Fixed JSX-escaping issues and ensured balanced braces/tags.
 */

/** Utility: Indian currency format */
const fmtINR = (n) =>
  typeof n === "number"
    ? n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : n;

/** Utility: date format dd-MMM-YYYY */
const fmtDate = (d) => {
  if (!d) return "";
  const date = new Date(d);
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  return `${date.getDate().toString().padStart(2, '0')}-${months[date.getMonth()]}-${date.getFullYear()}`;
};

/**
 * Compute grouped subtotals by party and a grand total.
 */
const groupAndTotal = (rows) => {
  const byParty = new Map();
  const grand = { taxable: 0, cgst: 0, sgst: 0, igst: 0, roundOff: 0, net: 0 };

  for (const r of rows) {
    const key = r.party || "(Unspecified)";
    if (!byParty.has(key)) byParty.set(key, []);
    byParty.get(key).push(r);
    grand.taxable += r.taxable || 0;
    grand.cgst += r.cgst || 0;
    grand.sgst += r.sgst || 0;
    grand.igst += r.igst || 0;
    grand.roundOff += r.roundOff || 0;
    grand.net += r.net || 0;
  }
  return { byParty, grand };
};

/** Render header (company + report title + date range) */
const renderHeader = (doc, companyInfo = {}, dateRange) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const { company, address, phone, gstin } = companyInfo;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(company || "Your Company Name", pageWidth / 2, 15, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  if (address) doc.text(address, pageWidth / 2, 20, { align: "center" });
  if (phone || gstin) {
    const line2 = [phone ? `Phone: ${phone}` : null, gstin ? `GSTIN: ${gstin}` : null]
      .filter(Boolean)
      .join("    •    ");
    if (line2) doc.text(line2, pageWidth / 2, 25, { align: "center" });
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("BILL REGISTER", pageWidth / 2, 33, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  const dr = dateRange ? `From ${fmtDate(dateRange.from)} to ${fmtDate(dateRange.to)}` : "";
  if (dr) doc.text(dr, pageWidth / 2, 38, { align: "center" });

  const now = new Date();
  const printedOn = `Printed on: ${fmtDate(now)} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  doc.text(printedOn, 14, 38);
};

/** Footer with page numbers and grand total (insert grand total on the last page) */
const renderFooter = (doc, grand) => {
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - 14, pageHeight - 8, { align: "right" });

    // Put grand total only on last page
    if (i === pageCount) {
      doc.setDrawColor(0);
      doc.setLineWidth(0.2);
      doc.line(14, pageHeight - 20, pageWidth - 14, pageHeight - 20);
      doc.setFont("helvetica", "bold");
      doc.text("GRAND TOTAL:", pageWidth - 120, pageHeight - 14);
      doc.setFont("helvetica", "normal");
      doc.text(`Taxable: ₹ ${fmtINR(grand.taxable)}`, pageWidth - 120, pageHeight - 10);
      doc.text(
        `CGST: ₹ ${fmtINR(grand.cgst)}    SGST: ₹ ${fmtINR(grand.sgst)}    IGST: ₹ ${fmtINR(grand.igst)}`,
        pageWidth - 120,
        pageHeight - 6
      );
      doc.setFont("helvetica", "bold");
      doc.text(`NET: ₹ ${fmtINR(grand.net)}`, pageWidth - 50, pageHeight - 10, { align: "right" });
    }
  }
};

/** Main PDF generator */
const generatePdf = ({ rows, companyInfo, dateRange }) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

  renderHeader(doc, companyInfo || {}, dateRange);

  const startY = 48; // space after header

  const { byParty, grand } = groupAndTotal(rows);

  // Column definitions
  const columns = [
    { header: "Date", dataKey: "date" },
    { header: "Bill No", dataKey: "billNo" },
    { header: "Party", dataKey: "party" },
    { header: "Desc", dataKey: "desc" },
    { header: "Taxable", dataKey: "taxable" },
    { header: "CGST", dataKey: "cgst" },
    { header: "SGST", dataKey: "sgst" },
    { header: "IGST", dataKey: "igst" },
    { header: "RoundOff", dataKey: "roundOff" },
    { header: "Net", dataKey: "net" },
  ];

  // For each Party group, print a heading, the table, and a subtotal row
  let currentY = startY;
  const pageWidth = doc.internal.pageSize.getWidth();
  const marginX = 14;

  for (const [party, items] of byParty.entries()) {
    // Group heading
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(`Party: ${party}`, marginX, currentY);

    const body = items.map((r) => ({
      date: fmtDate(r.date),
      billNo: r.billNo || "",
      party: r.party || "",
      desc: r.desc || "",
      taxable: fmtINR(r.taxable || 0),
      cgst: fmtINR(r.cgst || 0),
      sgst: fmtINR(r.sgst || 0),
      igst: fmtINR(r.igst || 0),
      roundOff: fmtINR(r.roundOff || 0),
      net: fmtINR(r.net || 0),
    }));

    // Use the autoTable plugin; we pass the doc instance as first arg
    autoTable(doc, {
      head: [columns.map((c) => c.header)],
      body: body.map((row) => columns.map((c) => row[c.dataKey])),
      startY: currentY + 6,
      margin: { left: marginX, right: marginX },
      styles: { fontSize: 9, cellPadding: 3, valign: "middle" },
      headStyles: { fillColor: [230, 230, 230] },
      columnStyles: {
        0: { cellWidth: 64 }, // Date
        1: { cellWidth: 70 }, // Bill No
        2: { cellWidth: 130 }, // Party
        3: { cellWidth: 140 }, // Desc
        4: { halign: "right" },
        5: { halign: "right" },
        6: { halign: "right" },
        7: { halign: "right" },
        8: { halign: "right" },
        9: { halign: "right" },
      },
      didDrawPage: (data) => {
        if (data.pageNumber === 1 && data.cursor.y < 50) {
          // if header was pushed by long table, redraw header on page 1
          renderHeader(doc, companyInfo || {}, dateRange);
        }
      },
    });

    // Subtotal line for the group
    const subtotal = items.reduce(
      (acc, r) => ({
        taxable: acc.taxable + (r.taxable || 0),
        cgst: acc.cgst + (r.cgst || 0),
        sgst: acc.sgst + (r.sgst || 0),
        igst: acc.igst + (r.igst || 0),
        roundOff: acc.roundOff + (r.roundOff || 0),
        net: acc.net + (r.net || 0),
      }),
      { taxable: 0, cgst: 0, sgst: 0, igst: 0, roundOff: 0, net: 0 }
    );

    const yAfter = (doc.lastAutoTable && doc.lastAutoTable.finalY) || currentY + 22;
    doc.setFont("helvetica", "bold");
    doc.text("Subtotal:", pageWidth - 240, yAfter + 16);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Taxable ₹ ${fmtINR(subtotal.taxable)}   CGST ₹ ${fmtINR(subtotal.cgst)}   SGST ₹ ${fmtINR(subtotal.sgst)}   IGST ₹ ${fmtINR(subtotal.igst)}   Net ₹ ${fmtINR(subtotal.net)}`,
      pageWidth - 240,
      yAfter + 16,
      { align: "left" }
    );

    currentY = (doc.lastAutoTable && doc.lastAutoTable.finalY ? doc.lastAutoTable.finalY : currentY) + 28;

    // If near bottom, add a page and reset Y
    const pageHeight = doc.internal.pageSize.getHeight();
    if (currentY > pageHeight - 80) {
      doc.addPage();
      currentY = 48; // reset below header on new page
    }
  }

  // Footer with page numbers + GRAND TOTAL
  renderFooter(doc, grand);

  const formatDateForFile = (d) => {
    if (!d) return "";
    const date = new Date(d);
    return `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
  };
  const safeFrom = dateRange?.from ? formatDateForFile(dateRange.from) : "start";
  const safeTo = dateRange?.to ? formatDateForFile(dateRange.to) : "end";

  doc.save(`BillRegister_${safeFrom}-${safeTo}.pdf`);
};

/**
 * Demo React component with sample data & a single button to generate PDF.
 */
export default function BillRegisterPdf({
  company = {
    name: "Dokeepo",
    address: "Howrah, West Bengal",
    phone: "+91-98765 43210",
    gstin: "19ABCDE1234F1Z5",
  },
  dateRange = { from: "2025-04-01", to: "2025-04-30" },
  data = [],
}) {
  // Map props to the generator's expected structure
  const rows = useMemo(() => {
    const sample = [
      {
        date: "2025-04-01",
        billNo: "INV-001",
        party: "ACME Traders",
        gstin: "19AAAFA9999A1Z5",
        desc: "Air Conditioner Repair",
        taxable: 4500,
        cgst: 405,
        sgst: 405,
        igst: 0,
        roundOff: -0.5,
        net: 5310.5,
      },
      {
        date: "2025-04-04",
        billNo: "INV-002",
        party: "ACME Traders",
        gstin: "19AAAFA9999A1Z5",
        desc: "Spare parts",
        taxable: 1200,
        cgst: 108,
        sgst: 108,
        igst: 0,
        roundOff: 0,
        net: 1416,
      },
      {
        date: "2025-04-06",
        billNo: "INV-010",
        party: "Sunrise Enterprises",
        gstin: "19BBBBB2222B1Z7",
        desc: "Installation",
        taxable: 3000,
        cgst: 270,
        sgst: 270,
        igst: 0,
        roundOff: 0,
        net: 3540,
      },
    ];
    const base = Array.isArray(data) && data.length ? data : sample;
    return base.map((r) => ({
      ...r,
      // ensure numeric
      taxable: Number(r.taxable) || 0,
      cgst: Number(r.cgst) || 0,
      sgst: Number(r.sgst) || 0,
      igst: Number(r.igst) || 0,
      roundOff: Number(r.roundOff) || 0,
      net: Number(r.net) || 0,
    }));
  }, [data]);

  const companyInfo = {
    company: company?.name || "",
    address: company?.address || "",
    phone: company?.phone || "",
    gstin: company?.gstin || "",
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-4">
        <h1 className="text-xl font-semibold">Bill Register (jsPDF)</h1>
        <p className="text-sm text-gray-600">Matches a typical Crystal Report layout: header, grouped details, subtotals, and grand total.</p>
      </div>

      <div className="grid gap-3">
        <div className="text-sm">
          <div><span className="font-medium">Company:</span> {companyInfo.company}</div>
          <div><span className="font-medium">Period:</span> {fmtDate(dateRange.from)} to {fmtDate(dateRange.to)}</div>
          <div className="text-gray-500">Sample rows used unless you pass your own data prop.</div>
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => generatePdf({ rows, companyInfo, dateRange })}
        >
          Download PDF
        </button>

        <div className="text-xs text-gray-500">
          <p>Tip: If your .rpt has different columns, edit the columns array in the generator and the mapping in body.</p>
          <p>For landscape A4, change new jsPDF orientation to "landscape" in generatePdf.</p>
        </div>
      </div>
    </div>
  );
}

// --- Helpful exports for quick testing in other files ---
export const SAMPLE_ROWS = [
  {
    date: "2025-04-01",
    billNo: "INV-001",
    party: "ACME Traders",
    desc: "Air Conditioner Repair",
    taxable: 4500,
    cgst: 405,
    sgst: 405,
    igst: 0,
    roundOff: -0.5,
    net: 5310.5,
  },
  {
    date: "2025-04-04",
    billNo: "INV-002",
    party: "ACME Traders",
    desc: "Spare parts",
    taxable: 1200,
    cgst: 108,
    sgst: 108,
    igst: 0,
    roundOff: 0,
    net: 1416,
  },
  {
    date: "2025-04-06",
    billNo: "INV-010",
    party: "Sunrise Enterprises",
    desc: "Installation",
    taxable: 3000,
    cgst: 270,
    sgst: 270,
    igst: 0,
    roundOff: 0,
    net: 3540,
  },
];