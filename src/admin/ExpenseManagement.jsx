import { useState, useEffect } from "react";
import axios from "axios";

import {
  FaMoneyBillWave,
  FaSave,
  FaTrash,
  FaImage,
  FaUndo,
  FaEdit,
  FaSearch,
  FaPrint,
} from "react-icons/fa";

import "../styles/admin/expense.css";


// ============================================================
// API
// ============================================================

const API = "https://bmgum.onrender.com";


// ============================================================
// MANDAL INFORMATION
// ============================================================

const MANDAL_NAME = "बाल मित्र गणेश उत्सव मंडळ";

const MANDAL_ADDRESS =
  "महाजनपूर, महाराष्ट्र, भारत";


// ============================================================
// EXPENSE MANAGEMENT
// ============================================================

function ExpenseManagement() {

  // ==========================================================
  // EXPENSE STATE
  // ==========================================================

  const [expenses, setExpenses] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [preview, setPreview] = useState(null);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);


  // ==========================================================
  // CURRENT DATE / TIME
  // ==========================================================

  const now = new Date();


  // ==========================================================
  // FORM DATA
  // ==========================================================

  const [formData, setFormData] = useState({

    title: "",

    amount: "",

    category: "Decoration",

    description: "",

    date: now.toISOString().substring(0, 10),

    time: now.toLocaleTimeString(),

    bill: null,

  });


  // ==========================================================
  // LOAD EXPENSES
  // ==========================================================

  const loadExpenses = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
        `${API}/api/expenses`
      );

      setExpenses(
        Array.isArray(res.data)
          ? res.data
          : []
      );

    }

    catch (err) {

      console.log(err);

      setExpenses([]);

    }

    finally {

      setLoading(false);

    }

  };


  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {

    loadExpenses();

  }, []);


  // ==========================================================
  // HANDLE INPUT CHANGE
  // ==========================================================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };


  // ==========================================================
  // HANDLE BILL IMAGE
  // ==========================================================

  const handleImage = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setFormData({

      ...formData,

      bill: file,

    });

    setPreview(
      URL.createObjectURL(file)
    );

  };


  // ==========================================================
  // CLEAR FORM
  // ==========================================================

  const clearForm = () => {

    const d = new Date();

    setEditingId(null);

    setPreview(null);

    setFormData({

      title: "",

      amount: "",

      category: "Decoration",

      description: "",

      date: d
        .toISOString()
        .substring(0, 10),

      time:
        d.toLocaleTimeString(),

      bill: null,

    });

  };


  // ==========================================================
  // SAVE / UPDATE EXPENSE
  // ==========================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    const data = new FormData();

    data.append(
      "title",
      formData.title
    );

    data.append(
      "amount",
      formData.amount
    );

    data.append(
      "category",
      formData.category
    );

    data.append(
      "description",
      formData.description
    );

    data.append(
      "date",
      formData.date
    );

    data.append(
      "time",
      formData.time
    );

    if (formData.bill) {

      data.append(
        "bill",
        formData.bill
      );

    }


    try {

      if (editingId) {

        await axios.put(

          `${API}/api/expenses/${editingId}`,

          data

        );

        alert(
          "Expense Updated Successfully"
        );

      }

      else {

        await axios.post(

          `${API}/api/expenses`,

          data

        );

        alert(
          "Expense Added Successfully"
        );

      }

      clearForm();

      loadExpenses();

    }

    catch (err) {

      console.log(err);

      alert(

        err.response?.data?.message ||

        "Error Saving Expense"

      );

    }

  };


  // ==========================================================
  // ESCAPE HTML
  // Prevent special characters from breaking print HTML
  // ==========================================================

  const escapeHTML = (value) => {

    if (
      value === null ||
      value === undefined
    ) {

      return "-";

    }

    return String(value)

      .replace(
        /&/g,
        "&amp;"
      )

      .replace(
        /</g,
        "&lt;"
      )

      .replace(
        />/g,
        "&gt;"
      )

      .replace(
        /"/g,
        "&quot;"
      )

      .replace(
        /'/g,
        "&#039;"
      );

  };


  // ==========================================================
  // FORMAT DATE
  // ==========================================================

  const formatPrintDate = (date) => {

    if (!date) return "-";

    const parsedDate =
      new Date(date);

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
  // FORMAT CURRENCY
  // ==========================================================

  const formatCurrency = (amount) => {

    return `₹${Number(
      amount || 0
    ).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;

  };


  // ==========================================================
  // PRINT EXPENSE REPORT
  // ==========================================================

  const printExpenseReport = () => {

    // --------------------------------------------------------
    // CHECK DATA
    // --------------------------------------------------------

    if (
      !expenses ||
      expenses.length === 0
    ) {

      alert(
        "प्रिंट करण्यासाठी कोणताही खर्च उपलब्ध नाही."
      );

      return;

    }


    // --------------------------------------------------------
    // OPEN PRINT WINDOW
    // --------------------------------------------------------

    const printWindow =
      window.open(
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


    // --------------------------------------------------------
    // ADMIN NAME
    // --------------------------------------------------------

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
      ) ||

      "प्रशासक";


    // --------------------------------------------------------
    // GENERATION DATE / TIME
    // --------------------------------------------------------

    const generatedAt =
      new Date();


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


    // --------------------------------------------------------
    // TOTAL EXPENSE
    // --------------------------------------------------------

    const totalAmount =
      expenses.reduce(

        (sum, expense) =>

          sum +
          Number(
            expense.amount || 0
          ),

        0

      );


    // --------------------------------------------------------
    // TOTAL PROOFS
    // --------------------------------------------------------

    const totalProofs =
      expenses.filter(
        (expense) =>
          Boolean(expense.bill)
      ).length;


    // --------------------------------------------------------
    // TABLE ROWS
    // IMPORTANT:
    // PRINTS ALL EXPENSES
    // SEARCH FILTER IS NOT USED
    // --------------------------------------------------------

    const rows =
      expenses
        .map(
          (expense, index) => {

            const proofURL =
              expense.bill
                ? `${API}/uploads/bills/${encodeURIComponent(
                    expense.bill
                  )}`
                : "";


            return `

              <tr>

                <td class="serial">
                  ${index + 1}
                </td>

                <td>
                  ${escapeHTML(
                    expense.id
                  )}
                </td>

                <td class="expense-name">
                  ${escapeHTML(
                    expense.title
                  )}
                </td>

                <td>
                  ${escapeHTML(
                    expense.category
                  )}
                </td>

                <td class="amount">
                  ${formatCurrency(
                    expense.amount
                  )}
                </td>

                <td class="description">
                  ${escapeHTML(
                    expense.description ||
                    "-"
                  )}
                </td>

                <td>
                  ${formatPrintDate(
                    expense.date
                  )}
                </td>

                <td>
                  ${escapeHTML(
                    expense.time ||
                    "-"
                  )}
                </td>

                <td>

                  ${
                    expense.bill

                      ? `

                        <span class="proof available">
                          उपलब्ध
                        </span>

                        <div class="proof-file">
                          ${escapeHTML(
                            expense.bill
                          )}
                        </div>

                        <a
                          href="${proofURL}"
                          target="_blank"
                          class="proof-link"
                        >
                          पुरावा पहा
                        </a>

                      `

                      : `

                        <span class="proof unavailable">
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


    // --------------------------------------------------------
    // PRINT DOCUMENT
    // --------------------------------------------------------

    printWindow.document.write(`

      <!DOCTYPE html>

      <html lang="mr">

      <head>

        <meta charset="UTF-8">

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        >

        <title>
          ${escapeHTML(
            MANDAL_NAME
          )}
          - खर्च अहवाल
        </title>


        <style>

          /* ==================================================
             FONT
             ================================================== */

          @import url(
            'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap'
          );


          /* ==================================================
             RESET
             ================================================== */

          * {

            box-sizing:
              border-box;

          }


          html,
          body {

            margin:
              0;

            padding:
              0;

            background:
              #ffffff;

          }


          body {

            color:
              #222;

            font-family:
              "Noto Sans Devanagari",
              "Nirmala UI",
              "Mangal",
              Arial,
              sans-serif;

            font-size:
              11px;

            line-height:
              1.5;

          }


          /* ==================================================
             MAIN REPORT
             ================================================== */

          .report {

            width:
              100%;

          }


          /* ==================================================
             HEADER
             ================================================== */

          .report-header {

            position:
              relative;

            text-align:
              center;

            padding:
              8px 0 12px;

            margin-bottom:
              12px;

            border-bottom:
              3px solid #8b4513;

          }


          .mandal-name {

            margin:
              0;

            font-size:
              27px;

            font-weight:
              800;

            color:
              #8b4513;

            letter-spacing:
              0.3px;

          }


          .mandal-address {

            margin:
              3px 0 0;

            font-size:
              13px;

            color:
              #555;

          }


          .report-title {

            margin:
              7px 0 0;

            font-size:
              19px;

            font-weight:
              800;

            color:
              #333;

          }


          .report-subtitle {

            margin:
              2px 0 0;

            font-size:
              10px;

            color:
              #777;

          }


          /* ==================================================
             META INFORMATION
             ================================================== */

          .meta-grid {

            display:
              grid;

            grid-template-columns:
              repeat(3, 1fr);

            gap:
              8px;

            margin-bottom:
              12px;

          }


          .meta-box {

            border:
              1px solid #ddd;

            border-radius:
              7px;

            padding:
              7px 9px;

            background:
              #fafafa;

          }


          .meta-label {

            display:
              block;

            font-size:
              9px;

            color:
              #777;

            margin-bottom:
              2px;

          }


          .meta-value {

            display:
              block;

            font-size:
              11px;

            font-weight:
              700;

            color:
              #333;

          }


          /* ==================================================
             SUMMARY CARDS
             ================================================== */

          .summary-grid {

            display:
              grid;

            grid-template-columns:
              repeat(3, 1fr);

            gap:
              10px;

            margin-bottom:
              14px;

          }


          .summary-card {

            border:
              1px solid #d6d6d6;

            border-radius:
              8px;

            padding:
              9px;

            text-align:
              center;

            background:
              #ffffff;

          }


          .summary-label {

            display:
              block;

            font-size:
              10px;

            color:
              #666;

            margin-bottom:
              3px;

          }


          .summary-value {

            display:
              block;

            font-size:
              18px;

            font-weight:
              800;

            color:
              #8b4513;

          }


          /* ==================================================
             TABLE
             ================================================== */

          .expense-table {

            width:
              100%;

            border-collapse:
              collapse;

            table-layout:
              fixed;

            font-size:
              9px;

          }


          .expense-table thead {

            display:
              table-header-group;

          }


          .expense-table tfoot {

            display:
              table-footer-group;

          }


          .expense-table th {

            background:
              #8b4513;

            color:
              #ffffff;

            border:
              1px solid #6f3510;

            padding:
              7px 4px;

            text-align:
              center;

            vertical-align:
              middle;

            font-size:
              9px;

            font-weight:
              800;

          }


          .expense-table td {

            border:
              1px solid #bdbdbd;

            padding:
              6px 4px;

            text-align:
              center;

            vertical-align:
              middle;

            word-wrap:
              break-word;

            overflow-wrap:
              anywhere;

          }


          .expense-table tbody tr:nth-child(even) {

            background:
              #fcf9f6;

          }


          .expense-table tbody tr {

            page-break-inside:
              avoid;

          }


          /* ==================================================
             COLUMN WIDTHS
             ================================================== */

          .expense-table th:nth-child(1),
          .expense-table td:nth-child(1) {

            width:
              4%;

          }


          .expense-table th:nth-child(2),
          .expense-table td:nth-child(2) {

            width:
              7%;

          }


          .expense-table th:nth-child(3),
          .expense-table td:nth-child(3) {

            width:
              12%;

          }


          .expense-table th:nth-child(4),
          .expense-table td:nth-child(4) {

            width:
              9%;

          }


          .expense-table th:nth-child(5),
          .expense-table td:nth-child(5) {

            width:
              10%;

          }


          .expense-table th:nth-child(6),
          .expense-table td:nth-child(6) {

            width:
              23%;

          }


          .expense-table th:nth-child(7),
          .expense-table td:nth-child(7) {

            width:
              9%;

          }


          .expense-table th:nth-child(8),
          .expense-table td:nth-child(8) {

            width:
              9%;

          }


          .expense-table th:nth-child(9),
          .expense-table td:nth-child(9) {

            width:
              17%;

          }


          /* ==================================================
             SPECIAL CELLS
             ================================================== */

          .serial {

            font-weight:
              700;

          }


          .expense-name {

            font-weight:
              700;

            text-align:
              left !important;

          }


          .amount {

            font-weight:
              800;

            text-align:
              right !important;

            white-space:
              nowrap;

          }


          .description {

            text-align:
              left !important;

          }


          /* ==================================================
             PROOF
             ================================================== */

          .proof {

            display:
              inline-block;

            padding:
              2px 6px;

            border-radius:
              10px;

            font-size:
              8px;

            font-weight:
              700;

          }


          .available {

            background:
              #e1f5e8;

            color:
              #16723a;

          }


          .unavailable {

            background:
              #eeeeee;

            color:
              #666;

          }


          .proof-file {

            margin-top:
              3px;

            font-size:
              7px;

            color:
              #666;

            word-break:
              break-all;

          }


          .proof-link {

            display:
              block;

            margin-top:
              2px;

            color:
              #8b4513;

            font-size:
              7px;

            text-decoration:
              none;

          }


          /* ==================================================
             TOTAL
             ================================================== */

          .total-box {

            margin-top:
              12px;

            padding:
              10px 14px;

            border:
              2px solid #8b4513;

            border-radius:
              7px;

            text-align:
              right;

            background:
              #fffaf5;

            font-size:
              14px;

            font-weight:
              800;

          }


          .total-box strong {

            color:
              #8b4513;

            font-size:
              17px;

          }


          /* ==================================================
             FOOTER
             ================================================== */

          .report-footer {

            margin-top:
              20px;

            padding-top:
              10px;

            border-top:
              1px solid #aaa;

            display:
              flex;

            justify-content:
              space-between;

            align-items:
              flex-end;

            gap:
              20px;

            font-size:
              9px;

            color:
              #555;

          }


          .generated-by {

            text-align:
              left;

          }


          .admin-name {

            margin-top:
              3px;

            font-weight:
              800;

            color:
              #222;

          }


          .footer-right {

            text-align:
              right;

          }


          /* ==================================================
             PRINT SETTINGS
             ================================================== */

          @page {

            size:
              A4 landscape;

            margin:
              10mm;

          }


          @media print {

            html,
            body {

              width:
                100%;

              background:
                #ffffff;

            }


            body {

              padding:
                0;

            }


            .report {

              width:
                100%;

            }


            .expense-table {

              page-break-inside:
                auto;

            }


            .expense-table tr {

              page-break-inside:
                avoid;

              page-break-after:
                auto;

            }


            .expense-table thead {

              display:
                table-header-group;

            }


            .report-header {

              break-inside:
                avoid;

            }


            .summary-grid {

              break-inside:
                avoid;

            }


            .total-box {

              break-inside:
                avoid;

            }


            .report-footer {

              break-inside:
                avoid;

            }


            a {

              color:
                inherit;

              text-decoration:
                none;

            }

          }

        </style>

      </head>


      <body>


        <div class="report">


          <!-- ============================================
               HEADER
          ============================================= -->

          <div class="report-header">

            <h1 class="mandal-name">

              ${escapeHTML(
                MANDAL_NAME
              )}

            </h1>


            <div class="mandal-address">

              ${escapeHTML(
                MANDAL_ADDRESS
              )}

            </div>


            <h2 class="report-title">

              खर्चाचा संपूर्ण अहवाल

            </h2>


            <div class="report-subtitle">

              गणेशोत्सव मंडळ खर्च व्यवस्थापन अहवाल

            </div>

          </div>


          <!-- ============================================
               META INFORMATION
          ============================================= -->

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

                ${escapeHTML(
                  adminName
                )}

              </span>

            </div>


          </div>


          <!-- ============================================
               SUMMARY
          ============================================= -->

          <div class="summary-grid">


            <div class="summary-card">

              <span class="summary-label">

                एकूण खर्चाच्या नोंदी

              </span>


              <span class="summary-value">

                ${expenses.length}

              </span>

            </div>


            <div class="summary-card">

              <span class="summary-label">

                एकूण खर्चाची रक्कम

              </span>


              <span class="summary-value">

                ${formatCurrency(
                  totalAmount
                )}

              </span>

            </div>


            <div class="summary-card">

              <span class="summary-label">

                बिल / पुरावा असलेल्या नोंदी

              </span>


              <span class="summary-value">

                ${totalProofs}

              </span>

            </div>


          </div>


          <!-- ============================================
               EXPENSE TABLE
          ============================================= -->

          <table class="expense-table">


            <thead>

              <tr>

                <th>
                  क्र.
                </th>

                <th>
                  खर्च ID
                </th>

                <th>
                  खर्चाचे नाव
                </th>

                <th>
                  श्रेणी
                </th>

                <th>
                  रक्कम
                </th>

                <th>
                  वर्णन
                </th>

                <th>
                  दिनांक
                </th>

                <th>
                  वेळ
                </th>

                <th>
                  बिल / पुरावा
                </th>

              </tr>

            </thead>


            <tbody>

              ${rows}

            </tbody>


            <tfoot>

              <tr>

                <td
                  colspan="4"
                  style="
                    text-align:right;
                    font-weight:800;
                  "
                >

                  एकूण

                </td>


                <td
                  style="
                    text-align:right;
                    font-weight:800;
                    white-space:nowrap;
                  "
                >

                  ${formatCurrency(
                    totalAmount
                  )}

                </td>


                <td
                  colspan="4"
                >

                </td>

              </tr>

            </tfoot>


          </table>


          <!-- ============================================
               TOTAL
          ============================================= -->

          <div class="total-box">

            एकूण खर्च :

            <strong>

              ${formatCurrency(
                totalAmount
              )}

            </strong>

          </div>


          <!-- ============================================
               FOOTER
          ============================================= -->

          <div class="report-footer">


            <div class="generated-by">

              <div>

                अहवाल तयार करणारे :

              </div>


              <div class="admin-name">

                ${escapeHTML(
                  adminName
                )}

              </div>

            </div>


            <div class="footer-right">

              <div>

                एकूण नोंदी :
                <strong>
                  ${expenses.length}
                </strong>

              </div>


              <div>

                हा अहवाल मंडळाच्या
                खर्च नोंदींवर आधारित आहे.

              </div>

            </div>


          </div>


        </div>


        <!-- ==============================================
             PRINT SCRIPT
        =============================================== -->

        <script>

          window.onload = function() {

            setTimeout(
              function() {

                window.print();

              },
              700
            );

          };


          window.onafterprint = function() {

            setTimeout(
              function() {

                window.close();

              },
              400
            );

          };

        </script>


      </body>

      </html>

    `);


    printWindow.document.close();

  };


  // ==========================================================
  // FILTERED EXPENSES FOR SCREEN
  // ==========================================================

  const filteredExpenses =
    expenses.filter(
      (item) =>

        (item.title || "")
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

    );


  // ==========================================================
  // TOTAL AMOUNT
  // ==========================================================

  const totalAmount =
    expenses.reduce(

      (sum, item) =>

        sum +
        Number(
          item.amount || 0
        ),

      0

    );


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <div className="expense-page">


      {/* =====================================================
          TITLE
      ====================================================== */}

      <div className="page-title">

        <FaMoneyBillWave
          className="title-icon"
        />

        <div>

          <h1>
            Expense Management
          </h1>

          <p>
            Add, Edit & Manage Expenses
          </p>

        </div>

      </div>


      {/* =====================================================
          FORM
      ====================================================== */}

      <div className="expense-card">

        <form

          className="expense-form"

          onSubmit={
            handleSubmit
          }

          encType="multipart/form-data"

        >


          {/* =================================================
              EXPENSE NAME
          ================================================== */}

          <div className="form-group">

            <label>
              खर्चाचे नाव *
            </label>

            <input

              type="text"

              name="title"

              value={
                formData.title
              }

              onChange={
                handleChange
              }

              placeholder="Enter Expense Name"

              required

            />

          </div>


          {/* =================================================
              AMOUNT
          ================================================== */}

          <div className="form-group">

            <label>
              रक्कम *
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


          {/* =================================================
              CATEGORY
          ================================================== */}

          <div className="form-group">

            <label>
              Category
            </label>

            <select

              name="category"

              value={
                formData.category
              }

              onChange={
                handleChange
              }

            >

              <option>
                Decoration
              </option>

              <option>
                Food
              </option>

              <option>
                Sound
              </option>

              <option>
                Electricity
              </option>

              <option>
                Prize
              </option>

              <option>
                Advertisement
              </option>

              <option>
                Other
              </option>

            </select>

          </div>


          {/* =================================================
              DESCRIPTION
          ================================================== */}

          <div className="form-group">

            <label>
              Description
            </label>

            <textarea

              rows="4"

              name="description"

              value={
                formData.description
              }

              onChange={
                handleChange
              }

              placeholder="Expense Description"

            />

          </div>


          {/* =================================================
              DATE
          ================================================== */}

          <div className="form-group">

            <label>
              दिनांक
            </label>

            <input

              type="date"

              value={
                formData.date
              }

              readOnly

            />

          </div>


          {/* =================================================
              TIME
          ================================================== */}

          <div className="form-group">

            <label>
              वेळ
            </label>

            <input

              type="text"

              value={
                formData.time
              }

              readOnly

            />

          </div>


          {/* =================================================
              BILL UPLOAD
          ================================================== */}

          <div className="form-group">

            <label>

              <FaImage />

              Upload Bill / Proof

            </label>

            <input

              type="file"

              accept="image/*"

              onChange={
                handleImage
              }

            />

          </div>


          {/* =================================================
              PREVIEW
          ================================================== */}

          {preview && (

            <div className="preview-box">

              <img

                src={preview}

                alt="Bill Preview"

                style={{
                  maxWidth:
                    "220px",

                  borderRadius:
                    "8px",
                }}

              />

            </div>

          )}


          {/* =================================================
              FORM BUTTONS
          ================================================== */}

          <div className="button-group">


            <button

              type="submit"

              className="save-btn"

            >

              <FaSave />

              {

                editingId

                  ? " Update Expense"

                  : " Save Expense"

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


      {/* =====================================================
          SUMMARY
      ====================================================== */}

      <div className="summary-card">


        <div className="summary-box">

          <h3>
            Total Expenses
          </h3>

          <h2>
            {expenses.length}
          </h2>

        </div>


        <div className="summary-box">

          <h3>
            Total Amount
          </h3>

          <h2>

            ₹
            {totalAmount.toLocaleString(
              "en-IN"
            )}

          </h2>

        </div>


      </div>


      {/* =====================================================
          SEARCH
      ====================================================== */}

      <div className="search-box">

        <FaSearch />

        <input

          type="text"

          placeholder="Search Expense..."

          value={search}

          onChange={
            (e) =>
              setSearch(
                e.target.value
              )
          }

        />

      </div>


      {/* =====================================================
          TABLE
      ====================================================== */}

      <div className="table-card">


        <div className="table-header">


          <h2>
            Expense Records
          </h2>


          {/* =================================================
              PRINT BUTTON
          ================================================== */}

          <button

            type="button"

            className="print-expense-btn"

            onClick={
              printExpenseReport
            }

            disabled={
              loading ||
              expenses.length === 0
            }

            title="Print all expense records"

          >

            <FaPrint />

            Print Expense Report

          </button>


        </div>


        {/* ===================================================
            LOADING
        ==================================================== */}

        {loading ? (

          <div className="loading">

            Loading Expenses...

          </div>

        ) : (

          <table className="expense-table">


            <thead>

              <tr>

                <th>
                  ID
                </th>

                <th>
                  Expense
                </th>

                <th>
                  Category
                </th>

                <th>
                  Amount
                </th>

                <th>
                  Description
                </th>

                <th>
                  Date
                </th>

                <th>
                  Time
                </th>

                <th>
                  Proof
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>


            <tbody>


              {/* =================================================
                  NO DATA
              ================================================== */}

              {filteredExpenses.length === 0 ? (

                <tr>

                  <td

                    colSpan="9"

                    className="no-data"

                  >

                    No Expense Found

                  </td>

                </tr>

              ) : (


                /* ===============================================
                   EXPENSE ROWS
                ================================================ */

                filteredExpenses.map(
                  (expense) => (

                    <tr
                      key={
                        expense.id
                      }
                    >


                      {/* ID */}

                      <td>

                        {
                          expense.id
                        }

                      </td>


                      {/* EXPENSE */}

                      <td>

                        {
                          expense.title
                        }

                      </td>


                      {/* CATEGORY */}

                      <td>

                        {
                          expense.category
                        }

                      </td>


                      {/* AMOUNT */}

                      <td>

                        ₹
                        {
                          expense.amount
                        }

                      </td>


                      {/* DESCRIPTION */}

                      <td>

                        {
                          expense.description ||
                          "-"
                        }

                      </td>


                      {/* DATE */}

                      <td>

                        {

                          expense.date

                            ?

                            new Date(
                              expense.date
                            )
                              .toISOString()
                              .split(
                                "T"
                              )[0]

                            :

                            "-"

                        }

                      </td>


                      {/* TIME */}

                      <td>

                        {
                          expense.time
                        }

                      </td>


                      {/* PROOF */}

                      <td>

                        {

                          expense.bill

                            ?

                            (

                              <a

                                href={

                                  `${API}/uploads/bills/${expense.bill}`

                                }

                                target="_blank"

                                rel="noreferrer"

                              >

                                View Proof

                              </a>

                            )

                            :

                            "-"

                        }

                      </td>


                      {/* ACTION */}

                      <td>


                        <div className="action-buttons">


                          {/* ==================================
                              EDIT
                          =================================== */}

                          <button

                            className="edit-btn"

                            onClick={() => {

                              setEditingId(
                                expense.id
                              );


                              setFormData({

                                title:
                                  expense.title ||
                                  "",

                                amount:
                                  expense.amount ||
                                  "",

                                category:
                                  expense.category ||
                                  "Decoration",

                                description:
                                  expense.description ||
                                  "",

                                date:

                                  expense.date

                                    ?

                                    new Date(
                                      expense.date
                                    )
                                      .toISOString()
                                      .split(
                                        "T"
                                      )[0]

                                    :

                                    "",

                                time:
                                  expense.time ||
                                  "",

                                bill:
                                  null,

                              });


                              if (
                                expense.bill
                              ) {

                                setPreview(

                                  `${API}/uploads/bills/${expense.bill}`

                                );

                              }

                              else {

                                setPreview(
                                  null
                                );

                              }


                              window.scrollTo({

                                top: 0,

                                behavior:
                                  "smooth",

                              });

                            }}

                          >

                            <FaEdit />

                          </button>


                          {/* ==================================
                              DELETE
                          =================================== */}

                          <button

                            className="delete-btn"

                            onClick={

                              async () => {

                                if (

                                  !window.confirm(

                                    "Delete this expense?"

                                  )

                                ) {

                                  return;

                                }


                                try {

                                  await axios.delete(

                                    `${API}/api/expenses/${expense.id}`

                                  );


                                  alert(
                                    "Expense Deleted"
                                  );


                                  loadExpenses();

                                }

                                catch (err) {

                                  console.log(
                                    err
                                  );


                                  alert(
                                    "Delete Failed"
                                  );

                                }

                              }

                            }

                          >

                            <FaTrash />

                          </button>


                        </div>


                      </td>


                    </tr>

                  )

                )

              )}


            </tbody>


          </table>

        )}


      </div>


    </div>

  );

}


export default ExpenseManagement;