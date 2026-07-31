import jsPDF from "jspdf";

export const generateReceipt = (data) => {
  const doc = new jsPDF("p", "mm", "a4");

  // Colors
  const primary = [255, 102, 0];
  const dark = [40, 40, 40];
  const gray = [110, 110, 110];

  // ===============================
  // Header
  // ===============================

  doc.setFillColor(...primary);
  doc.rect(0, 0, 210, 28, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("BAL MITRA GANESH UTSAV MANDAL", 105, 12, {
    align: "center",
  });

  doc.setFontSize(11);
  doc.text("Official Donation Receipt", 105, 20, {
    align: "center",
  });

  // ===============================
  // Title
  // ===============================

  doc.setTextColor(...dark);
  doc.setFontSize(18);
  doc.text("DONATION RECEIPT", 105, 40, {
    align: "center",
  });

  // Line
  doc.setDrawColor(...primary);
  doc.setLineWidth(0.7);
  doc.line(20, 45, 190, 45);

  // ===============================
  // Donor Details
  // ===============================

  let y = 60;

  const writeRow = (label, value) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(label, 25, y);

    doc.setFont("helvetica", "normal");
    doc.text(String(value || "-"), 80, y);

    y += 12;
  };

  writeRow("Receipt No", data.receiptNo);
  writeRow("Donor Name", data.donor);
  writeRow("Donation Amount", `₹ ${data.amount}`);
  writeRow("Payment ID", data.paymentId);

  writeRow(
    "Date",
    new Date().toLocaleString("en-IN")
  );

  // ===============================
  // Thank You Box
  // ===============================

  doc.setFillColor(255, 248, 235);
  doc.roundedRect(20, y + 5, 170, 40, 4, 4, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(...primary);

  doc.text(
    "🙏 Thank You For Your Donation 🙏",
    105,
    y + 18,
    {
      align: "center",
    }
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...gray);

  doc.text(
    "Your contribution helps us organize",
    105,
    y + 28,
    {
      align: "center",
    }
  );

  doc.text(
    "Ganesh Utsav and various social activities.",
    105,
    y + 35,
    {
      align: "center",
    }
  );

  // ===============================
  // Footer
  // ===============================

  doc.setDrawColor(220);
  doc.line(20, 255, 190, 255);

  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.setTextColor(...gray);

  doc.text(
    "This is a computer generated receipt.",
    105,
    265,
    {
      align: "center",
    }
  );

  doc.text(
    "Thank you for supporting Bal Mitra Ganesh Utsav Mandal.",
    105,
    272,
    {
      align: "center",
    }
  );

  // ===============================
  // Save
  // ===============================

  doc.save(
    `Donation_Receipt_${data.receiptNo}.pdf`
  );
};