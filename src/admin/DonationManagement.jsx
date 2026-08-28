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

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import sahityaFontUrl from "../assets/Sahitya-Regular.ttf?url";

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
  // LOAD SAHITYA FONT INTO jsPDF
  // ==========================================================

  const loadSahityaFont =
    async (doc) => {

      const response =
        await fetch(
          sahityaFontUrl
        );

      if (!response.ok) {

        throw new Error(
          "Sahitya-Regular.ttf could not be loaded."
        );

      }

      const arrayBuffer =
        await response.arrayBuffer();

      const uint8Array =
        new Uint8Array(
          arrayBuffer
        );

      let binary = "";

      const chunkSize =
        0x8000;

      for (
        let i = 0;
        i < uint8Array.length;
        i += chunkSize
      ) {

        binary +=
          String.fromCharCode(
            ...uint8Array.subarray(
              i,
              Math.min(
                i + chunkSize,
                uint8Array.length
              )
            )
          );

      }

      const base64Font =
        btoa(binary);

      doc.addFileToVFS(
        "Sahitya-Regular.ttf",
        base64Font
      );

      doc.addFont(
        "Sahitya-Regular.ttf",
        "Sahitya",
        "normal"
      );

      doc.setFont(
        "Sahitya",
        "normal"
      );

    };

  // ==========================================================
  // ADD PDF FOOTER TO ALL PAGES
  // ==========================================================

  const addPDFFooter = (
    doc,
    adminName
  ) => {

    const pageCount =
      doc.internal.getNumberOfPages();

    const pageWidth =
      doc.internal.pageSize.getWidth();

    const pageHeight =
      doc.internal.pageSize.getHeight();

    for (
      let page = 1;
      page <= pageCount;
      page++
    ) {

      doc.setPage(page);

      doc.setDrawColor(
        210,
        210,
        210
      );

      doc.line(
        10,
        pageHeight - 14,
        pageWidth - 10,
        pageHeight - 14
      );

      doc.setFont(
        "Sahitya",
        "normal"
      );

      doc.setFontSize(8);

      doc.setTextColor(
        90,
        90,
        90
      );

      doc.text(
        `अहवाल तयार करणारे admin  : ${adminName}`,
        10,
        pageHeight - 7
      );

      doc.text(
        `पृष्ठ ${page} / ${pageCount}`,
        pageWidth - 10,
        pageHeight - 7,
        {
          align: "right",
        }
      );

    }

  };

  // ==========================================================
  // GENERATE DONATION PDF
  // ==========================================================

  const generateDonationPDF =
    async () => {

      if (
        !donations ||
        donations.length === 0
      ) {

        alert(
          "छापण्यासाठी देणगीची कोणतीही नोंद उपलब्ध नाही."
        );

        return;

      }

      try {

        setPdfLoading(true);

        // ====================================================
        // CREATE PDF
        // ====================================================

        const doc =
          new jsPDF({
            orientation:
              "landscape",
            unit: "mm",
            format: "a4",
          });

        // ====================================================
        // LOAD MARATHI FONT
        // ====================================================

        await loadSahityaFont(
          doc
        );

        doc.setFont(
          "Sahitya",
          "normal"
        );

        // ====================================================
        // PAGE SIZE
        // ====================================================

        const pageWidth =
          doc.internal.pageSize.getWidth();

        const pageHeight =
          doc.internal.pageSize.getHeight();

        // ====================================================
        // CURRENT DATE / TIME
        // ====================================================

        const now =
          new Date();

        const generatedDate =
          now.toLocaleDateString(
            "mr-IN",
            {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }
          );

        const generatedTime =
          now.toLocaleTimeString(
            "mr-IN",
            {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            }
          );

        // ====================================================
        // ADMIN
        // ====================================================

        const adminName =
          getAdminName();

        // ====================================================
        // HEADER BACKGROUND
        // ====================================================

        doc.setFillColor(
          255,
          248,
          238
        );

        doc.rect(
          0,
          0,
          pageWidth,
          42,
          "F"
        );

        // ====================================================
        // HEADER BORDER
        // ====================================================

        doc.setDrawColor(
          220,
          120,
          40
        );

        doc.setLineWidth(
          0.5
        );

        doc.line(
          10,
          42,
          pageWidth - 10,
          42
        );

        // ====================================================
        // MANDAL NAME
        // ====================================================

        doc.setFont(
          "Sahitya",
          "normal"
        );

        doc.setFontSize(
          19
        );

        doc.setTextColor(
          120,
          55,
          10
        );

        doc.text(
          MANDAL_NAME,
          pageWidth / 2,
          11,
          {
            align: "center",
          }
        );

        // ====================================================
        // ADDRESS
        // ====================================================

        doc.setFontSize(
          10
        );

        doc.setTextColor(
          70,
          70,
          70
        );

        doc.text(
          MANDAL_ADDRESS,
          pageWidth / 2,
          18,
          {
            align: "center",
          }
        );

        // ====================================================
        // REPORT TITLE
        // ====================================================

        doc.setFontSize(
          15
        );

        doc.setTextColor(
          120,
          55,
          10
        );

        doc.text(
          "देणगी अहवाल",
          pageWidth / 2,
          27,
          {
            align: "center",
          }
        );

        // ====================================================
        // GENERATED DATE
        // ====================================================

        doc.setFontSize(
          8
        );

        doc.setTextColor(
          80,
          80,
          80
        );

        doc.text(
          `अहवाल तयार करण्याची तारीख : ${generatedDate}`,
          10,
          36
        );

        // ====================================================
        // GENERATED TIME
        // ====================================================

        doc.text(
          `अहवाल तयार करण्याची वेळ : ${generatedTime}`,
          pageWidth - 10,
          36,
          {
            align: "right",
          }
        );

        // ====================================================
        // SUMMARY
        // ====================================================

        doc.setFont(
          "Sahitya",
          "normal"
        );

        doc.setFontSize(
          9
        );

        doc.setTextColor(
          45,
          45,
          45
        );

        doc.text(
          `एकूण देणगी नोंदी : ${donations.length}`,
          10,
          49
        );

        doc.text(
          `आजपर्यंत जमा झालेली एकूण देणगी : ${formatCurrency(
            totalCollected
          )}`,
          75,
          49
        );

        doc.text(
          `एकूण प्रलंबित रक्कम : ${formatCurrency(
            totalPending
          )}`,
          180,
          49
        );

        doc.text(
          `एकूण देणगी : ${formatCurrency(
            totalDonation
          )}`,
          pageWidth - 10,
          49,
          {
            align: "right",
          }
        );

        // ====================================================
        // TABLE DATA
        // ====================================================

        const tableData =
          donations.map(
            (
              donation,
              index
            ) => {

              return [

                String(
                  donation.id ??
                  index + 1
                ),

                donation.donorName ||
                  "-",

                formatCurrency(
                  donation.amount
                ),

                formatCurrency(
                  donation.pendingAmount
                ),

                formatDate(
                  donation.date
                ),

                donation.time ||
                  "-",

                donation.receipt
                  ? donation.receipt
                  : "नाही",

              ];

            }
          );

        // ====================================================
        // DONATION TABLE
        // ====================================================

        autoTable(
          doc,
          {

            startY: 55,

            head: [[

              "आयडी",

              "देणगीदाराचे नाव",

              "जमा देणगी",

              "प्रलंबित रक्कम",

              "दिनांक",

              "वेळ",

              "पावती",

            ]],

            body:
              tableData,

            theme:
              "grid",

            styles: {

              font:
                "Sahitya",

              fontStyle:
                "normal",

              fontSize: 8,

              cellPadding: 3,

              valign:
                "middle",

              textColor: [
                45,
                45,
                45,
              ],

              overflow:
                "linebreak",

            },

            headStyles: {

              font:
                "Sahitya",

              fontStyle:
                "normal",

              fontSize: 9,

              fillColor: [
                120,
                55,
                10,
              ],

              textColor: [
                255,
                255,
                255,
              ],

              halign:
                "center",

              valign:
                "middle",

            },

            bodyStyles: {

              font:
                "Sahitya",

              fontStyle:
                "normal",

            },

            alternateRowStyles: {

              fillColor: [
                250,
                247,
                242,
              ],

            },

            columnStyles: {

              0: {

                halign:
                  "center",

                cellWidth:
                  20,

              },

              1: {

                cellWidth:
                  62,

              },

              2: {

                halign:
                  "right",

                cellWidth:
                  38,

              },

              3: {

                halign:
                  "right",

                cellWidth:
                  43,

              },

              4: {

                halign:
                  "center",

                cellWidth:
                  32,

              },

              5: {

                halign:
                  "center",

                cellWidth:
                  32,

              },

              6: {

                cellWidth:
                  48,

              },

            },

            margin: {

              left: 10,

              right: 10,

              bottom: 22,

            },

            didParseCell:
              (data) => {

                if (
                  data.section ===
                  "head"
                ) {

                  data.cell.styles.font =
                    "Sahitya";

                  data.cell.styles.fontStyle =
                    "normal";

                }

                if (
                  data.section ===
                  "body"
                ) {

                  data.cell.styles.font =
                    "Sahitya";

                  data.cell.styles.fontStyle =
                    "normal";

                }

              },

          }
        );

        // ====================================================
        // FINAL SUMMARY
        // ====================================================

        let finalY =
          doc.lastAutoTable?.finalY ||
          55;

        finalY += 9;

        if (
          finalY >
          pageHeight - 25
        ) {

          doc.addPage();

          finalY = 20;

        }

        // ====================================================
        // FINAL SUMMARY TITLE
        // ====================================================

        doc.setFont(
          "Sahitya",
          "normal"
        );

        doc.setFontSize(
          11
        );

        doc.setTextColor(
          120,
          55,
          10
        );

        doc.text(
          "देणगीचा एकूण आर्थिक सारांश",
          10,
          finalY
        );

        finalY += 7;

        // ====================================================
        // FINAL TOTALS
        // ====================================================

        doc.setFontSize(
          9
        );

        doc.setTextColor(
          55,
          55,
          55
        );

        doc.text(
          `आजपर्यंत जमा झालेली एकूण देणगी : ${formatCurrency(
            totalCollected
          )}`,
          10,
          finalY
        );

        doc.text(
          `एकूण प्रलंबित रक्कम : ${formatCurrency(
            totalPending
          )}`,
          105,
          finalY
        );

        doc.text(
          `एकूण देणगी : ${formatCurrency(
            totalDonation
          )}`,
          205,
          finalY
        );

        // ====================================================
        // FOOTER ON ALL PAGES
        // ====================================================

        addPDFFooter(
          doc,
          adminName
        );

        // ====================================================
        // FILE NAME
        // ====================================================

        const fileDate =
          now
            .toISOString()
            .split("T")[0];

        doc.save(
          `देणगी_अहवाल_${fileDate}.pdf`
        );

      }

      catch (error) {

        console.error(
          "PDF generation error:",
          error
        );

        alert(
          "PDF तयार करताना त्रुटी आली. कृपया Browser Console तपासा."
        );

      }

      finally {

        setPdfLoading(false);

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
                ? " Generating PDF..."
                : " Print as PDF"
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