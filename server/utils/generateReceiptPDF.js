const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generateReceiptPDF = (donation) => {

    const receiptDir = path.join(__dirname, "../receipts");

    if (!fs.existsSync(receiptDir)) {
        fs.mkdirSync(receiptDir);
    }

    const fileName = `${donation.receiptNo}.pdf`;

    const filePath = path.join(receiptDir, fileName);

    const doc = new PDFDocument({
        margin: 40,
    });

    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(22)
       .text("बाल मित्र गणेश उत्सव मंडळ", {
            align: "center",
       });

    doc.moveDown();

    doc.fontSize(18)
       .text("Donation Receipt", {
            align: "center",
       });

    doc.moveDown();

    doc.fontSize(13);

    doc.text(`Receipt No : ${donation.receiptNo}`);
    doc.text(`Date       : ${new Date().toLocaleString()}`);

    doc.moveDown();

    doc.text(`Donor Name : ${donation.fullName}`);
    doc.text(`Marathi    : ${donation.marathiName}`);
    doc.text(`Mobile     : ${donation.mobile}`);
    doc.text(`Address    : ${donation.address}`);
    doc.text(`Purpose    : ${donation.purpose}`);

    doc.moveDown();

    doc.fontSize(18);

    doc.text(`Donation Amount : ₹${donation.amount}`);

    doc.moveDown(2);

    doc.fontSize(12);

    doc.text(`Payment ID : ${donation.paymentId}`);

    doc.moveDown(2);

    doc.text("Cashier : Tushar Bisane");

    doc.moveDown(3);

    doc.text("Thank You For Your Donation ❤️", {
        align: "center",
    });

    doc.end();

    return fileName;

};

module.exports = generateReceiptPDF;