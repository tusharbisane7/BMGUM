import { useState, useEffect } from "react";
import axios from "axios";

import {
  FaDonate,
  FaSave,
  FaTrash,
  FaImage,
  FaUndo,
  FaEdit,
  FaSearch,
  FaFilePdf,
} from "react-icons/fa";

import "../styles/admin/donation.css";

// ============================================================
// API
// ============================================================

const API = "https://bmgum.onrender.com";

// ============================================================
// MANDAL INFORMATION
// ============================================================

const MANDAL_NAME = "बाल मित्र गणेश उत्सव मंडळ";

const MANDAL_ADDRESS =
  "खिरणीबागपुरा , अचलपुर , महाराष्ट्र ";

// ============================================================
// DONATION MANAGEMENT
// ============================================================

function DonationManagement() {

  // ==========================================================
  // CURRENT DATE / TIME
  // ==========================================================

  const today = new Date();

  // ==========================================================
  // STATES
  // ==========================================================

  const [donations, setDonations] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [preview, setPreview] = useState(null);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const [pdfLoading, setPdfLoading] = useState(false);

  // ==========================================================
  // FORM DATA
  // ==========================================================

  const [formData, setFormData] = useState({
    donorName: "",
    amount: "",
    pendingAmount: 0,

    date:
      today
        .toISOString()
        .split("T")[0],

    time:
      today.toLocaleTimeString(
        "en-IN",
        {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }
      ),

    receipt: null,
  });

  // ==========================================================
  // LOAD DONATIONS
  // ==========================================================

  const loadDonations = async () => {

    try {

      setLoading(true);

      const res =
        await axios.get(
          `${API}/api/donations`
        );

      setDonations(
        Array.isArray(res.data)
          ? res.data
          : []
      );

    }

    catch (err) {

      console.error(
        "Donation loading error:",
        err
      );

      setDonations([]);

    }

    finally {

      setLoading(false);

    }

  };

  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {

    loadDonations();

  }, []);

  // ==========================================================
  // INPUT CHANGE
  // ==========================================================

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setFormData(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );

  };

  // ==========================================================
  // IMAGE UPLOAD
  // ==========================================================

  const handleImage = (e) => {

    const file =
      e.target.files?.[0];

    if (!file) return;

    setFormData(
      (previous) => ({
        ...previous,
        receipt: file,
      })
    );

    setPreview(
      URL.createObjectURL(file)
    );

  };

  // ==========================================================
  // CLEAR FORM
  // ==========================================================

  const clearForm = () => {

    const now =
      new Date();

    setEditingId(null);

    setPreview(null);

    setFormData({
      donorName: "",
      amount: "",
      pendingAmount: 0,

      date:
        now
          .toISOString()
          .split("T")[0],

      time:
        now.toLocaleTimeString(
          "en-IN",
          {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          }
        ),

      receipt: null,
    });

  };

  // ==========================================================
  // SAVE / UPDATE DONATION
  // ==========================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    const data =
      new FormData();

    data.append(
      "donorName",
      formData.donorName
    );

    data.append(
      "amount",
      formData.amount
    );

    data.append(
      "pendingAmount",
      formData.pendingAmount === ""
        ? 0
        : formData.pendingAmount
    );

    data.append(
      "date",
      formData.date
    );

    data.append(
      "time",
      formData.time
    );

    if (formData.receipt) {

      data.append(
        "receipt",
        formData.receipt
      );

    }

    try {

      // ======================================================
      // UPDATE
      // ======================================================

      if (editingId) {

        await axios.put(
          `${API}/api/donations/${editingId}`,
          data
        );

        alert(
          "Donation Updated Successfully"
        );

      }

      // ======================================================
      // CREATE
      // ======================================================

      else {

        await axios.post(
          `${API}/api/donations`,
          data
        );

        alert(
          "Donation Added Successfully"
        );

      }

      clearForm();

      await loadDonations();

    }

    catch (err) {

      console.error(
        "Donation save error:",
        err
      );

      alert(
        err.response?.data?.message ||
        "Something went wrong"
      );

    }

  };

  // ==========================================================
  // DELETE DONATION
  // ==========================================================

  const deleteDonation = async (id) => {

    if (
      !window.confirm(
        "Delete this donation?"
      )
    ) {

      return;

    }

    try {

      await axios.delete(
        `${API}/api/donations/${id}`
      );

      alert(
        "Donation Deleted Successfully"
      );

      await loadDonations();

    }

    catch (err) {

      console.error(
        "Delete error:",
        err
      );

      alert(
        "Delete Failed"
      );

    }

  };

  // ==========================================================
  // EDIT DONATION
  // ==========================================================

  const editDonation = (donation) => {

    setEditingId(
      donation.id
    );

    setFormData({
      donorName:
        donation.donorName || "",

      amount:
        donation.amount || "",

      pendingAmount:
        donation.pendingAmount ?? 0,

      date:
        donation.date
          ? new Date(
              donation.date
            )
              .toISOString()
              .split("T")[0]
          : "",

      time:
        donation.time || "",

      receipt: null,
    });

    if (donation.receipt) {

      setPreview(
        `${API}/uploads/receipts/${donation.receipt}`
      );

    }

    else {

      setPreview(null);

    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

  // ==========================================================
  // SEARCH
  // ==========================================================

  const filteredDonations =
    donations.filter(
      (item) =>
        (item.donorName || "")
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  // ==========================================================
  // TOTAL COLLECTED
  // ==========================================================

  const totalCollected =
    donations.reduce(
      (sum, item) =>
        sum +
        Number(
          item.amount || 0
        ),
      0
    );

  // ==========================================================
  // TOTAL PENDING
  // ==========================================================

  const totalPending =
    donations.reduce(
      (sum, item) =>
        sum +
        Number(
          item.pendingAmount || 0
        ),
      0
    );

  // ==========================================================
  // TOTAL COMMITMENT
  // ==========================================================

  const totalDonation =
    totalCollected +
    totalPending;

  // ==========================================================
  // GET ADMIN NAME
  // ==========================================================

  const getAdminName = () => {

    const adminName =
      localStorage.getItem(
        "adminName"
      ) ||
      localStorage.getItem(
        "admin_name"
      ) ||
      localStorage.getItem(
        "userName"
      ) ||
      localStorage.getItem(
        "username"
      ) ||
      localStorage.getItem(
        "name"
      );

    return (
      adminName ||
      "प्रशासक"
    );

  };

  // ==========================================================
  // FORMAT CURRENCY
  // ==========================================================

  const formatCurrency = (
    amount
  ) => {

    return `₹${Number(
      amount || 0
    ).toLocaleString(
      "en-IN"
    )}`;

  };

  // ==========================================================
  // FORMAT DATE
  // ==========================================================

  const formatDate = (
    date
  ) => {

    if (!date) {

      return "-";

    }

    const parsedDate =
      new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {

      return "-";

    }

    return parsedDate.toLocaleDateString(
      "mr-IN",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );

  };


  // ==========================================================
  // ESCAPE HTML FOR PRINT REPORT
  // ==========================================================

  const escapeHTML = (value) => {

    if (
      value === null ||
      value === undefined
    ) {

      return "-";

    }

    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  };

  // ==========================================================
  // PRINT DATE
  // ==========================================================

  const formatPrintDate = (date) => {

    if (!date) return "-";

    const parsedDate = new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {

      return escapeHTML(date);

    }

    return parsedDate.toLocaleDateString(
      "mr-IN",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );

  };

  // ==========================================================
  // PRINT DONATION REPORT - SAME APPROACH AS EXPENSE MANAGEMENT
  // Browser Print -> Save as PDF
  // Noto Sans Devanagari + Nirmala UI + Mangal fallbacks
  // ==========================================================

  const generateDonationPDF = () => {

    if (
      !donations ||
      donations.length === 0
    ) {

      alert(
        "छापण्यासाठी देणगीची कोणतीही नोंद उपलब्ध नाही."
      );

      return;

    }

    const printWindow = window.open(
      "",
      "_blank",
      "width=1500,height=950"
    );

    if (!printWindow) {

      alert(
        "Print window उघडता आली नाही. कृपया browser popup allow करा."
      );

      return;

    }

    try {

      setPdfLoading(true);

      const adminName = getAdminName();
      const generatedAt = new Date();

      const generatedDate =
        generatedAt.toLocaleDateString(
          "mr-IN",
          {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }
        );

      const generatedTime =
        generatedAt.toLocaleTimeString(
          "mr-IN",
          {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          }
        );

      const fileDate =
        generatedAt
          .toISOString()
          .split("T")[0];

      const rows = donations
        .map(
          (donation, index) => {

            const receiptURL = donation.receipt
              ? `${API}/uploads/receipts/${encodeURIComponent(
                  donation.receipt
                )}`
              : "";

            return `
              <tr>
                <td class="serial">
                  ${index + 1}
                </td>

                <td>
                  ${escapeHTML(
                    donation.id ?? "-"
                  )}
                </td>

                <td class="donor-name">
                  ${escapeHTML(
                    donation.donorName || "-"
                  )}
                </td>

                <td class="amount collected">
                  ${formatCurrency(
                    donation.amount
                  )}
                </td>

                <td class="amount pending">
                  ${formatCurrency(
                    donation.pendingAmount
                  )}
                </td>

                <td>
                  ${formatPrintDate(
                    donation.date
                  )}
                </td>

                <td>
                  ${escapeHTML(
                    donation.time || "-"
                  )}
                </td>

                <td>
                  ${
                    donation.receipt
                      ? `
                        <span class="receipt available">
                          उपलब्ध
                        </span>

                        <div class="receipt-file">
                          ${escapeHTML(
                            donation.receipt
                          )}
                        </div>

                        <a
                          href="${receiptURL}"
                          target="_blank"
                          class="receipt-link"
                          rel="noreferrer"
                        >
                          पावती पहा
                        </a>
                      `
                      : `
                        <span class="receipt unavailable">
                          उपलब्ध नाही
                        </span>
                      `
                  }
                </td>
              </tr>
            `;

          }
        )
        .join("");

      printWindow.document.open();

      printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="mr">

        <head>
          <meta charset="UTF-8" />

          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          <title>
            ${escapeHTML(
              `देणगी_अहवाल_${fileDate}`
            )}
          </title>

          <style>
            @import url(
              'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap'
            );

            * {
              box-sizing: border-box;
            }

            html,
            body {
              margin: 0;
              padding: 0;
              background: #ffffff;
            }

            body {
              color: #222;
              font-family:
                "Noto Sans Devanagari",
                "Nirmala UI",
                "Mangal",
                Arial,
                sans-serif;
              font-size: 11px;
              line-height: 1.5;
            }

            .report {
              width: 100%;
            }

            .report-header {
              position: relative;
              text-align: center;
              padding: 8px 0 12px;
              margin-bottom: 12px;
              border-bottom: 3px solid #8b4513;
            }

            .mandal-name {
              margin: 0;
              font-size: 27px;
              font-weight: 800;
              color: #8b4513;
              letter-spacing: 0.3px;
            }

            .mandal-address {
              margin: 3px 0 0;
              font-size: 13px;
              color: #555;
            }

            .report-title {
              margin: 7px 0 0;
              font-size: 19px;
              font-weight: 800;
              color: #333;
            }

            .report-subtitle {
              margin: 2px 0 0;
              font-size: 10px;
              color: #777;
            }

            .meta-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 8px;
              margin-bottom: 12px;
            }

            .meta-box {
              border: 1px solid #ddd;
              border-radius: 7px;
              padding: 7px 9px;
              background: #fafafa;
            }

            .meta-label {
              display: block;
              font-size: 9px;
              color: #777;
              margin-bottom: 2px;
            }

            .meta-value {
              display: block;
              font-size: 11px;
              font-weight: 700;
              color: #333;
            }

            .summary-grid {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 10px;
              margin-bottom: 14px;
            }

            .summary-card {
              border: 1px solid #d6d6d6;
              border-radius: 8px;
              padding: 9px;
              text-align: center;
              background: #ffffff;
            }

            .summary-label {
              display: block;
              font-size: 10px;
              color: #666;
              margin-bottom: 3px;
            }

            .summary-value {
              display: block;
              font-size: 18px;
              font-weight: 800;
              color: #8b4513;
            }

            .donation-table {
              width: 100%;
              border-collapse: collapse;
              table-layout: fixed;
              font-size: 9px;
            }

            .donation-table thead {
              display: table-header-group;
            }

            .donation-table tfoot {
              display: table-footer-group;
            }

            .donation-table th {
              background: #8b4513;
              color: #ffffff;
              border: 1px solid #6f3510;
              padding: 7px 4px;
              text-align: center;
              vertical-align: middle;
              font-size: 9px;
              font-weight: 800;
            }

            .donation-table td {
              border: 1px solid #bdbdbd;
              padding: 6px 4px;
              text-align: center;
              vertical-align: middle;
              word-wrap: break-word;
              overflow-wrap: anywhere;
            }

            .donation-table tbody tr:nth-child(even) {
              background: #fcf9f6;
            }

            .donation-table tbody tr {
              page-break-inside: avoid;
            }

            .donation-table th:nth-child(1),
            .donation-table td:nth-child(1) {
              width: 5%;
            }

            .donation-table th:nth-child(2),
            .donation-table td:nth-child(2) {
              width: 9%;
            }

            .donation-table th:nth-child(3),
            .donation-table td:nth-child(3) {
              width: 19%;
            }

            .donation-table th:nth-child(4),
            .donation-table td:nth-child(4) {
              width: 13%;
            }

            .donation-table th:nth-child(5),
            .donation-table td:nth-child(5) {
              width: 13%;
            }

            .donation-table th:nth-child(6),
            .donation-table td:nth-child(6) {
              width: 11%;
            }

            .donation-table th:nth-child(7),
            .donation-table td:nth-child(7) {
              width: 12%;
            }

            .donation-table th:nth-child(8),
            .donation-table td:nth-child(8) {
              width: 18%;
            }

            .serial {
              font-weight: 700;
            }

            .donor-name {
              font-weight: 700;
              text-align: left !important;
            }

            .amount {
              font-weight: 800;
              text-align: right !important;
              white-space: nowrap;
            }

            .collected {
              color: #16723a;
            }

            .pending {
              color: #9a5b00;
            }

            .receipt {
              display: inline-block;
              padding: 2px 6px;
              border-radius: 10px;
              font-size: 8px;
              font-weight: 700;
            }

            .available {
              background: #e1f5e8;
              color: #16723a;
            }

            .unavailable {
              background: #eeeeee;
              color: #666;
            }

            .receipt-file {
              margin-top: 3px;
              font-size: 7px;
              color: #666;
              word-break: break-all;
            }

            .receipt-link {
              display: block;
              margin-top: 2px;
              color: #8b4513;
              font-size: 7px;
              text-decoration: none;
            }

            .total-box {
              margin-top: 12px;
              padding: 10px 14px;
              border: 2px solid #8b4513;
              border-radius: 7px;
              text-align: right;
              background: #fffaf5;
              font-size: 14px;
              font-weight: 800;
            }

            .total-box strong {
              color: #8b4513;
              font-size: 17px;
            }

            .report-footer {
              margin-top: 20px;
              padding-top: 10px;
              border-top: 1px solid #aaa;
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              gap: 20px;
              font-size: 9px;
              color: #555;
            }

            .generated-by {
              text-align: left;
            }

            .admin-name {
              margin-top: 3px;
              font-weight: 800;
              color: #222;
            }

            .footer-right {
              text-align: right;
            }

            @page {
              size: A4 landscape;
              margin: 10mm;
            }

            @media print {

              html,
              body {
                width: 100%;
                background: #ffffff;
              }

              body {
                padding: 0;
              }

              .report {
                width: 100%;
              }

              .donation-table {
                page-break-inside: auto;
              }

              .donation-table tr {
                page-break-inside: avoid;
                page-break-after: auto;
              }

              .donation-table thead {
                display: table-header-group;
              }

              .report-header,
              .meta-grid,
              .summary-grid,
              .total-box,
              .report-footer {
                break-inside: avoid;
              }

              a {
                color: inherit;
                text-decoration: none;
              }
            }
          </style>
        </head>

        <body>
          <div class="report">

            <div class="report-header">
              <h1 class="mandal-name">
                ${escapeHTML(MANDAL_NAME)}
              </h1>

              <div class="mandal-address">
                ${escapeHTML(MANDAL_ADDRESS)}
              </div>

              <h2 class="report-title">
                देणगीचा संपूर्ण अहवाल
              </h2>

              <div class="report-subtitle">
                गणेशोत्सव मंडळ देणगी व्यवस्थापन अहवाल
              </div>
            </div>

            <div class="meta-grid">
              <div class="meta-box">
                <span class="meta-label">
                  अहवाल तयार करण्याची तारीख
                </span>
                <span class="meta-value">
                  ${generatedDate}
                </span>
              </div>

              <div class="meta-box">
                <span class="meta-label">
                  अहवाल तयार करण्याची वेळ
                </span>
                <span class="meta-value">
                  ${generatedTime}
                </span>
              </div>

              <div class="meta-box">
                <span class="meta-label">
                  अहवाल तयार करणारे
                </span>
                <span class="meta-value">
                  ${escapeHTML(adminName)}
                </span>
              </div>
            </div>

            <div class="summary-grid">
              <div class="summary-card">
                <span class="summary-label">
                  एकूण देणगी नोंदी
                </span>
                <span class="summary-value">
                  ${donations.length}
                </span>
              </div>

              <div class="summary-card">
                <span class="summary-label">
                  आजपर्यंत जमा झालेली एकूण देणगी
                </span>
                <span class="summary-value">
                  ${formatCurrency(totalCollected)}
                </span>
              </div>

              <div class="summary-card">
                <span class="summary-label">
                  एकूण प्रलंबित रक्कम
                </span>
                <span class="summary-value">
                  ${formatCurrency(totalPending)}
                </span>
              </div>

              <div class="summary-card">
                <span class="summary-label">
                  एकूण देणगी
                </span>
                <span class="summary-value">
                  ${formatCurrency(totalDonation)}
                </span>
              </div>
            </div>

            <table class="donation-table">
              <thead>
                <tr>
                  <th>क्र.</th>
                  <th>देणगी ID</th>
                  <th>देणगीदाराचे नाव</th>
                  <th>जमा देणगी</th>
                  <th>प्रलंबित रक्कम</th>
                  <th>दिनांक</th>
                  <th>वेळ</th>
                  <th>पावती / पुरावा</th>
                </tr>
              </thead>

              <tbody>
                ${rows}
              </tbody>

              <tfoot>
                <tr>
                  <td
                    colspan="3"
                    style="text-align:right;font-weight:800;"
                  >
                    एकूण
                  </td>

                  <td
                    style="text-align:right;font-weight:800;white-space:nowrap;"
                  >
                    ${formatCurrency(totalCollected)}
                  </td>

                  <td
                    style="text-align:right;font-weight:800;white-space:nowrap;"
                  >
                    ${formatCurrency(totalPending)}
                  </td>

                  <td colspan="3"></td>
                </tr>
              </tfoot>
            </table>

            <div class="total-box">
              एकूण देणगी :
              <strong>
                ${formatCurrency(totalDonation)}
              </strong>
            </div>

            <div class="report-footer">
              <div class="generated-by">
                <div>
                  अहवाल तयार करणारे :
                </div>

                <div class="admin-name">
                  ${escapeHTML(adminName)}
                </div>
              </div>

              <div class="footer-right">
                <div>
                  एकूण नोंदी :
                  <strong>${donations.length}</strong>
                </div>

                <div>
                  हा अहवाल मंडळाच्या देणगी नोंदींवर आधारित आहे.
                </div>
              </div>
            </div>

          </div>

          <script>
            (function () {
              let printed = false;

              function doPrint() {
                if (printed) return;
                printed = true;
                window.print();
              }

              window.addEventListener("load", function () {

                if (document.fonts && document.fonts.ready) {
                  document.fonts.ready
                    .then(function () {
                      setTimeout(doPrint, 250);
                    })
                    .catch(function () {
                      setTimeout(doPrint, 700);
                    });
                } else {
                  setTimeout(doPrint, 700);
                }

              });

              window.onafterprint = function () {
                setTimeout(function () {
                  window.close();
                }, 400);
              };
            })();
          </script>
        </body>
        </html>
      `);

      printWindow.document.close();

      setTimeout(() => {
        setPdfLoading(false);
      }, 1500);

    }

    catch (error) {

      console.error(
        "Donation report print error:",
        error
      );

      setPdfLoading(false);

      try {
        printWindow.close();
      } catch {
        // Ignore print window close errors.
      }

      alert(
        "देणगी अहवाल तयार करताना त्रुटी आली."
      );

    }

  };

  // ==========================================================
  // UI
  // ==========================================================

  return (

    <div className="donation-page">

      {/* ======================================================
          TITLE
      ====================================================== */}

      <div className="page-title">

        <FaDonate
          className="title-icon"
        />

        <div>

          <h1>
            Donation Management
          </h1>

          <p>
            Add, Edit & Manage Donations
          </p>

        </div>

      </div>


      {/* ======================================================
          FORM
      ====================================================== */}

      <div className="donation-card">

        <form
          className="donation-form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >

          {/* ================= DONOR NAME ================= */}

          <div className="form-group">

            <label>
              Donor Name *
            </label>

            <input
              type="text"
              name="donorName"
              value={
                formData.donorName
              }
              onChange={
                handleChange
              }
              placeholder="Enter Donor Name"
              required
            />

          </div>


          {/* ================= AMOUNT ================= */}

          <div className="form-group">

            <label>
              Amount *
            </label>

            <input
              type="number"
              name="amount"
              value={
                formData.amount
              }
              onChange={
                handleChange
              }
              placeholder="Enter Amount"
              required
            />

          </div>


          {/* ================= PENDING ================= */}

          <div className="form-group">

            <label>
              Pending Amount
            </label>

            <input
              type="number"
              name="pendingAmount"
              value={
                formData.pendingAmount
              }
              onChange={
                handleChange
              }
            />

          </div>


          {/* ================= DATE ================= */}

          <div className="form-group">

            <label>
              Date
            </label>

            <input
              type="date"
              value={
                formData.date
              }
              readOnly
            />

          </div>


          {/* ================= TIME ================= */}

          <div className="form-group">

            <label>
              Time
            </label>

            <input
              type="text"
              value={
                formData.time
              }
              readOnly
            />

          </div>


          {/* ================= RECEIPT ================= */}

          <div className="form-group">

            <label>

              <FaImage />

              Upload Receipt

            </label>

            <input
              type="file"
              accept="image/*"
              onChange={
                handleImage
              }
            />

          </div>


          {/* ================= PREVIEW ================= */}

          {preview && (

            <div className="preview-box">

              <img
                src={preview}
                alt="Receipt"
                style={{
                  maxWidth:
                    "220px",

                  borderRadius:
                    "8px",
                }}
              />

            </div>

          )}


          {/* ================= BUTTONS ================= */}

          <div className="button-group">

            <button
              type="submit"
              className="save-btn"
            >

              <FaSave />

              {
                editingId
                  ? " Update Donation"
                  : " Save Donation"
              }

            </button>


            <button
              type="button"
              className="clear-btn"
              onClick={
                clearForm
              }
            >

              <FaUndo />

              Clear

            </button>

          </div>

        </form>

      </div>


      {/* ======================================================
          SUMMARY
      ====================================================== */}

      <div className="summary-card">

        <div className="summary-box">

          <h3>
            Total Donations
          </h3>

          <h2>
            {donations.length}
          </h2>

        </div>


        <div className="summary-box">

          <h3>
            Total Collected Till Date
          </h3>

          <h2>
            {formatCurrency(
              totalCollected
            )}
          </h2>

        </div>


        <div className="summary-box">

          <h3>
            Total Pending
          </h3>

          <h2>
            {formatCurrency(
              totalPending
            )}
          </h2>

        </div>


        <div className="summary-box">

          <h3>
            Total Donation
          </h3>

          <h2>
            {formatCurrency(
              totalDonation
            )}
          </h2>

        </div>

      </div>


      {/* ======================================================
          SEARCH
      ====================================================== */}

      <div className="search-box">

        <FaSearch />

        <input
          type="text"
          placeholder="Search Donor..."
          value={search}
          onChange={
            (e) =>
              setSearch(
                e.target.value
              )
          }
        />

      </div>


      {/* ======================================================
          TABLE
      ====================================================== */}

      <div className="table-card">

        {/* ================= TABLE HEADER ================= */}

        <div className="table-header">

          <div>

            <h2>
              Donation Records
            </h2>

            <p>
              Complete donation transaction history
            </p>

          </div>


          <button
            type="button"
            className="pdf-btn"
            onClick={
              generateDonationPDF
            }
            disabled={
              pdfLoading ||
              loading ||
              donations.length === 0
            }
          >

            <FaFilePdf />

            {
              pdfLoading
                ? " Opening Print..."
                : " Print Donation Report"
            }

          </button>

        </div>


        {/* ==================================================
            TABLE CONTENT
        ================================================== */}

        {

          loading

            ?

            (

              <div className="loading">

                Loading Donations...

              </div>

            )

            :

            (

              <table
                className="donation-table"
              >

                <thead>

                  <tr>

                    <th>
                      ID
                    </th>

                    <th>
                      Donor Name
                    </th>

                    <th>
                      Amount
                    </th>

                    <th>
                      Pending
                    </th>

                    <th>
                      Date
                    </th>

                    <th>
                      Time
                    </th>

                    <th>
                      Receipt
                    </th>

                    <th>
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {

                    filteredDonations.length ===
                    0

                      ?

                      (

                        <tr>

                          <td
                            colSpan="8"
                            className="no-data"
                          >
                            No Donation Found
                          </td>

                        </tr>

                      )

                      :

                      (

                        filteredDonations.map(
                          (donation) => (

                            <tr
                              key={
                                donation.id
                              }
                            >

                              <td>

                                {
                                  donation.id
                                }

                              </td>


                              <td>

                                {
                                  donation.donorName
                                }

                              </td>


                              <td>

                                {
                                  formatCurrency(
                                    donation.amount
                                  )
                                }

                              </td>


                              <td>

                                {
                                  formatCurrency(
                                    donation.pendingAmount
                                  )
                                }

                              </td>


                              <td>

                                {

                                  donation.date

                                    ?

                                    new Date(
                                      donation.date
                                    )
                                      .toISOString()
                                      .split(
                                        "T"
                                      )[0]

                                    :

                                    "-"

                                }

                              </td>


                              <td>

                                {
                                  donation.time
                                }

                              </td>


                              <td>

                                {

                                  donation.receipt

                                    ?

                                    (

                                      <a
                                        href={`${API}/uploads/receipts/${donation.receipt}`}
                                        target="_blank"
                                        rel="noreferrer"
                                      >

                                        View Receipt

                                      </a>

                                    )

                                    :

                                    "-"

                                }

                              </td>


                              <td>

                                <div className="action-buttons">

                                  <button
                                    className="edit-btn"
                                    type="button"
                                    onClick={() =>
                                      editDonation(
                                        donation
                                      )
                                    }
                                  >

                                    <FaEdit />

                                  </button>


                                  <button
                                    className="delete-btn"
                                    type="button"
                                    onClick={() =>
                                      deleteDonation(
                                        donation.id
                                      )
                                    }
                                  >

                                    <FaTrash />

                                  </button>

                                </div>

                              </td>

                            </tr>

                          )
                        )

                      )

                  }

                </tbody>

              </table>

            )

        }

      </div>

    </div>

  );

}

export default DonationManagement;
