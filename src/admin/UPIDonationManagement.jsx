import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import "../styles/UPIDonationManagement.css";

const API = "https://bmgum.onrender.com/api";

// ============================================================
// MANDAL INFORMATION
// ============================================================

const MANDAL_NAME = "बाल मित्र गणेश उत्सव मंडळ";

const MANDAL_ADDRESS =
    "खिरणीबागपुरा , अचलपुर , भारत";


// ============================================================
// COMPONENT
// ============================================================

function UPIDonationManagement() {

    // ========================================================
    // AUTH
    // ========================================================

    const token =
        localStorage.getItem("token");


    // ========================================================
    // STATES
    // ========================================================

    const [loading, setLoading] =
        useState(true);

    const [donations, setDonations] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("All");

    const [selectedDonation, setSelectedDonation] =
        useState(null);


    // ========================================================
    // LOAD DONATIONS
    // ========================================================

    useEffect(() => {

        fetchDonations();

    }, []);


    const fetchDonations = async () => {

        setLoading(true);

        try {

            const res = await axios.get(

                `${API}/upi-donations`,

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }

            );


            if (res.data.success) {

                setDonations(
                    res.data.donations || []
                );

            }

            else {

                setDonations([]);

            }

        }

        catch (err) {

            console.error(err);

            alert(
                err.response?.data?.message ||
                "Unable to fetch UPI donations."
            );

        }

        finally {

            setLoading(false);

        }

    };


    // ========================================================
    // APPROVE DONATION
    // ========================================================

    const approveDonation = async (id) => {

        try {

            const res = await axios.put(

                `${API}/upi-donations/approve/${id}`,

                {},

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }

            );


            if (res.data.success) {

                alert(
                    "Donation Approved Successfully."
                );

                fetchDonations();

            }

            else {

                alert(
                    res.data.message
                );

            }

        }

        catch (err) {

            console.error(err);

            alert(
                err.response?.data?.message ||
                "Approval Failed."
            );

        }

    };


    // ========================================================
    // REJECT DONATION
    // ========================================================

    const rejectDonation = async (id) => {

        try {

            const res = await axios.put(

                `${API}/upi-donations/reject/${id}`,

                {},

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }

            );


            if (res.data.success) {

                alert(
                    "Donation Rejected Successfully."
                );

                fetchDonations();

            }

            else {

                alert(
                    res.data.message
                );

            }

        }

        catch (err) {

            console.error(err);

            alert(
                err.response?.data?.message ||
                "Reject Failed."
            );

        }

    };


    // ========================================================
    // FILTER DATA
    // ========================================================

    const filteredData = useMemo(() => {

        return donations.filter((item) => {

            const matchesSearch =

                item.donorname
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )

                ||

                item.utr
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )

                ||

                item.receipt
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );


            const matchesStatus =

                statusFilter === "All"

                ||

                item.status === statusFilter;


            return (
                matchesSearch &&
                matchesStatus
            );

        });

    }, [
        donations,
        search,
        statusFilter
    ]);


    // ========================================================
    // DASHBOARD STATS
    // ========================================================

    const totalAmount =
        filteredData.reduce(

            (sum, item) =>

                sum +
                Number(
                    item.amount || 0
                ),

            0

        );


    const pendingCount =
        filteredData.filter(
            (item) =>
                item.status === "Pending"
        ).length;


    const approvedCount =
        filteredData.filter(
            (item) =>
                item.status === "Success"
        ).length;


    const rejectedCount =
        filteredData.filter(
            (item) =>
                item.status === "Rejected"
        ).length;


    // ========================================================
    // PRINT HELPERS
    // ========================================================

    const formatAmount = (amount) => {

        return `₹${Number(
            amount || 0
        ).toLocaleString("en-IN")}`;

    };


    const formatDate = (date) => {

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
                year: "numeric"
            }
        );

    };


    const formatTime = (date) => {

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

        return parsedDate.toLocaleTimeString(
            "mr-IN",
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true
            }
        );

    };


    // ========================================================
    // GET ADMIN NAME
    // ========================================================

    const getAdminName = () => {

        return (

            localStorage.getItem(
                "adminName"
            )

            ||

            localStorage.getItem(
                "admin_name"
            )

            ||

            localStorage.getItem(
                "userName"
            )

            ||

            localStorage.getItem(
                "username"
            )

            ||

            localStorage.getItem(
                "name"
            )

            ||

            "प्रशासक"

        );

    };


    // ========================================================
    // PRINT ALL UPI DONATIONS
    // ========================================================

    const printAllDonations = () => {

        // ----------------------------------------------------
        // CHECK DATA
        // ----------------------------------------------------

        if (
            !donations ||
            donations.length === 0
        ) {

            alert(
                "प्रिंट करण्यासाठी कोणतीही UPI देणगी उपलब्ध नाही."
            );

            return;

        }


        // ----------------------------------------------------
        // OPEN PRINT WINDOW
        // ----------------------------------------------------

        const printWindow =
            window.open(
                "",
                "_blank",
                "width=1400,height=900"
            );


        if (!printWindow) {

            alert(
                "Print window उघडता आली नाही. कृपया browser popup allow करा."
            );

            return;

        }


        // ----------------------------------------------------
        // ADMIN
        // ----------------------------------------------------

        const adminName =
            getAdminName();


        // ----------------------------------------------------
        // GENERATION DATE / TIME
        // ----------------------------------------------------

        const now =
            new Date();


        const generatedDate =
            now.toLocaleDateString(
                "mr-IN",
                {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                }
            );


        const generatedTime =
            now.toLocaleTimeString(
                "mr-IN",
                {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true
                }
            );


        // ----------------------------------------------------
        // ALL DATA STATISTICS
        // ----------------------------------------------------

        const printTotalAmount =
            donations.reduce(

                (sum, item) =>

                    sum +
                    Number(
                        item.amount || 0
                    ),

                0

            );


        const printApprovedAmount =
            donations
                .filter(
                    (item) =>
                        item.status === "Success"
                )
                .reduce(

                    (sum, item) =>

                        sum +
                        Number(
                            item.amount || 0
                        ),

                    0

                );


        const printPendingAmount =
            donations
                .filter(
                    (item) =>
                        item.status === "Pending"
                )
                .reduce(

                    (sum, item) =>

                        sum +
                        Number(
                            item.amount || 0
                        ),

                    0

                );


        const printRejectedAmount =
            donations
                .filter(
                    (item) =>
                        item.status === "Rejected"
                )
                .reduce(

                    (sum, item) =>

                        sum +
                        Number(
                            item.amount || 0
                        ),

                    0

                );


        // ----------------------------------------------------
        // TABLE ROWS
        // ----------------------------------------------------

        const rows = donations
            .map(
                (item, index) => {

                    const statusClass =
                        item.status === "Success"
                            ? "success"
                            : item.status === "Pending"
                                ? "pending"
                                : item.status === "Rejected"
                                    ? "rejected"
                                    : "";


                    return `

                        <tr>

                            <td>
                                ${index + 1}
                            </td>

                            <td>
                                ${item.id ?? "-"}
                            </td>

                            <td>
                                ${item.receipt || "-"}
                            </td>

                            <td>
                                ${item.donorname || "-"}
                            </td>

                            <td>
                                ${item.mobile || "-"}
                            </td>

                            <td class="amount">
                                ${formatAmount(
                                    item.amount
                                )}
                            </td>

                            <td class="utr">
                                ${item.utr || "-"}
                            </td>

                            <td>
                                ${
                                    item.payment_method ||
                                    "UPI"
                                }
                            </td>

                            <td>

                                <span
                                    class="status ${statusClass}"
                                >
                                    ${item.status || "-"}
                                </span>

                            </td>

                            <td>
                                ${formatDate(
                                    item.createdat
                                )}
                            </td>

                            <td>
                                ${formatTime(
                                    item.createdat
                                )}
                            </td>

                        </tr>

                    `;

                }
            )
            .join("");


        // ----------------------------------------------------
        // PRINT DOCUMENT
        // ----------------------------------------------------

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
                    UPI देणगी अहवाल
                </title>


                <style>

                    /* ========================================
                       FONT
                    ======================================== */

                    @font-face {

                        font-family:
                            "Sahitya";

                        src:
                            url("/fonts/Sahitya-Regular.ttf")
                            format("truetype");

                        font-weight:
                            normal;

                        font-style:
                            normal;

                    }


                    /* ========================================
                       RESET
                    ======================================== */

                    * {

                        box-sizing:
                            border-box;

                    }


                    body {

                        margin:
                            0;

                        padding:
                            20px;

                        background:
                            #ffffff;

                        color:
                            #222;

                        font-family:
                            "Sahitya",
                            "Noto Sans Devanagari",
                            Arial,
                            sans-serif;

                    }


                    /* ========================================
                       HEADER
                    ======================================== */

                    .header {

                        text-align:
                            center;

                        padding:
                            0 0 14px;

                        margin-bottom:
                            15px;

                        border-bottom:
                            2px solid #8b4513;

                    }


                    .mandal-name {

                        margin:
                            0;

                        color:
                            #8b4513;

                        font-size:
                            28px;

                        font-weight:
                            700;

                    }


                    .mandal-address {

                        margin:
                            4px 0;

                        font-size:
                            14px;

                        color:
                            #444;

                    }


                    .report-title {

                        margin:
                            7px 0 2px;

                        font-size:
                            21px;

                        font-weight:
                            700;

                        color:
                            #8b4513;

                    }


                    /* ========================================
                       META
                    ======================================== */

                    .meta {

                        display:
                            flex;

                        justify-content:
                            space-between;

                        gap:
                            20px;

                        margin-bottom:
                            15px;

                        font-size:
                            12px;

                    }


                    /* ========================================
                       SUMMARY
                    ======================================== */

                    .summary {

                        display:
                            grid;

                        grid-template-columns:
                            repeat(4, 1fr);

                        gap:
                            10px;

                        margin-bottom:
                            18px;

                    }


                    .summary-box {

                        border:
                            1px solid #aaa;

                        border-radius:
                            7px;

                        padding:
                            10px;

                        text-align:
                            center;

                    }


                    .summary-label {

                        display:
                            block;

                        font-size:
                            11px;

                        margin-bottom:
                            5px;

                    }


                    .summary-value {

                        display:
                            block;

                        font-size:
                            17px;

                        font-weight:
                            700;

                    }


                    /* ========================================
                       TABLE
                    ======================================== */

                    table {

                        width:
                            100%;

                        border-collapse:
                            collapse;

                        font-size:
                            9px;

                    }


                    thead {

                        display:
                            table-header-group;

                    }


                    th {

                        background:
                            #8b4513;

                        color:
                            #ffffff;

                        padding:
                            7px 5px;

                        border:
                            1px solid #555;

                        text-align:
                            center;

                        font-weight:
                            700;

                        white-space:
                            nowrap;

                    }


                    td {

                        padding:
                            6px 5px;

                        border:
                            1px solid #777;

                        text-align:
                            center;

                        vertical-align:
                            middle;

                    }


                    tbody tr:nth-child(even) {

                        background:
                            #faf7f2;

                    }


                    .amount {

                        text-align:
                            right;

                        font-weight:
                            700;

                        white-space:
                            nowrap;

                    }


                    .utr {

                        font-family:
                            Arial,
                            sans-serif;

                        font-size:
                            8px;

                    }


                    /* ========================================
                       STATUS
                    ======================================== */

                    .status {

                        display:
                            inline-block;

                        padding:
                            3px 7px;

                        border-radius:
                            12px;

                        font-size:
                            8px;

                        font-weight:
                            700;

                    }


                    .status.success {

                        background:
                            #d9f4df;

                        color:
                            #16733b;

                    }


                    .status.pending {

                        background:
                            #fff1c7;

                        color:
                            #9a6b00;

                    }


                    .status.rejected {

                        background:
                            #ffdede;

                        color:
                            #a32121;

                    }


                    /* ========================================
                       FOOTER
                    ======================================== */

                    .footer {

                        margin-top:
                            25px;

                        padding-top:
                            10px;

                        border-top:
                            1px solid #999;

                        display:
                            flex;

                        justify-content:
                            space-between;

                        font-size:
                            11px;

                    }


                    .footer-admin {

                        font-weight:
                            700;

                    }


                    /* ========================================
                       PRINT
                    ======================================== */

                    @page {

                        size:
                            A4 landscape;

                        margin:
                            10mm;

                    }


                    @media print {

                        body {

                            padding:
                                0;

                        }


                        tr {

                            page-break-inside:
                                avoid;

                        }


                        .summary-box {

                            break-inside:
                                avoid;

                        }

                    }

                </style>

            </head>


            <body>


                <!-- =========================================
                     HEADER
                ========================================== -->

                <div class="header">

                    <h1 class="mandal-name">

                        ${MANDAL_NAME}

                    </h1>


                    <p class="mandal-address">

                        ${MANDAL_ADDRESS}

                    </p>


                    <h2 class="report-title">

                        UPI देणगी अहवाल

                    </h2>

                </div>


                <!-- =========================================
                     META
                ========================================== -->

                <div class="meta">

                    <span>

                        अहवाल तयार करण्याची तारीख :
                        ${generatedDate}

                    </span>


                    <span>

                        अहवाल तयार करण्याची वेळ :
                        ${generatedTime}

                    </span>

                </div>


                <!-- =========================================
                     SUMMARY
                ========================================== -->

                <div class="summary">


                    <div class="summary-box">

                        <span class="summary-label">

                            एकूण UPI देणगी नोंदी

                        </span>

                        <span class="summary-value">

                            ${donations.length}

                        </span>

                    </div>


                    <div class="summary-box">

                        <span class="summary-label">

                            एकूण जमा रक्कम

                        </span>

                        <span class="summary-value">

                            ${formatAmount(
                                printTotalAmount
                            )}

                        </span>

                    </div>


                    <div class="summary-box">

                        <span class="summary-label">

                            मंजूर रक्कम

                        </span>

                        <span class="summary-value">

                            ${formatAmount(
                                printApprovedAmount
                            )}

                        </span>

                    </div>


                    <div class="summary-box">

                        <span class="summary-label">

                            प्रलंबित रक्कम

                        </span>

                        <span class="summary-value">

                            ${formatAmount(
                                printPendingAmount
                            )}

                        </span>

                    </div>

                </div>


                <!-- =========================================
                     TABLE
                ========================================== -->

                <table>

                    <thead>

                        <tr>

                            <th>
                                क्र.
                            </th>

                            <th>
                                ID
                            </th>

                            <th>
                                पावती
                            </th>

                            <th>
                                देणगीदाराचे नाव
                            </th>

                            <th>
                                मोबाईल
                            </th>

                            <th>
                                रक्कम
                            </th>

                            <th>
                                UTR क्रमांक
                            </th>

                            <th>
                                पेमेंट पद्धत
                            </th>

                            <th>
                                स्थिती
                            </th>

                            <th>
                                दिनांक
                            </th>

                            <th>
                                वेळ
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        ${rows}

                    </tbody>

                </table>


                <!-- =========================================
                     REJECTED SUMMARY
                ========================================== -->

                <div
                    style="
                        margin-top:15px;
                        font-size:11px;
                    "
                >

                    <strong>
                        नाकारलेली रक्कम :
                    </strong>

                    ${formatAmount(
                        printRejectedAmount
                    )}

                </div>


                <!-- =========================================
                     FOOTER
                ========================================== -->

                <div class="footer">

                    <div>

                        अहवाल तयार करणारे :
                        <span class="footer-admin">

                            ${adminName}

                        </span>

                    </div>


                    <div>

                        एकूण नोंदी :
                        ${donations.length}

                    </div>

                </div>


                <!-- =========================================
                     PRINT SCRIPT
                ========================================== -->

                <script>

                    window.onload = function() {

                        setTimeout(
                            function() {

                                window.print();

                            },
                            500
                        );

                    };


                    window.onafterprint = function() {

                        setTimeout(
                            function() {

                                window.close();

                            },
                            300
                        );

                    };

                </script>


            </body>

            </html>

        `);


        printWindow.document.close();

    };


    // ========================================================
    // RETURN
    // ========================================================

    return (

        <div className="upiDonationPage">


            {/* ==================================================
                HERO
            ================================================== */}

            <div className="upiHero">

                <div className="overlay"></div>

                <div className="heroContent">

                    <h1>

                        💳 UPI Donation Management

                    </h1>

                    <p>

                        Verify UTR Payments & Manage Online Donations

                    </p>

                </div>

            </div>


            {/* ==================================================
                STATISTICS
            ================================================== */}

            <div className="statsGrid">


                <div className="statCard">

                    <span>
                        💰
                    </span>

                    <h2>

                        ₹
                        {totalAmount.toLocaleString()}

                    </h2>

                    <p>
                        Total Collection
                    </p>

                </div>


                <div className="statCard">

                    <span>
                        🟡
                    </span>

                    <h2>

                        {pendingCount}

                    </h2>

                    <p>
                        Pending
                    </p>

                </div>


                <div className="statCard">

                    <span>
                        ✅
                    </span>

                    <h2>

                        {approvedCount}

                    </h2>

                    <p>
                        Approved
                    </p>

                </div>


                <div className="statCard">

                    <span>
                        ❌
                    </span>

                    <h2>

                        {rejectedCount}

                    </h2>

                    <p>
                        Rejected
                    </p>

                </div>

            </div>


            {/* ==================================================
                SEARCH / FILTER / PRINT
            ================================================== */}

            <div className="toolbar">


                <input

                    type="text"

                    placeholder="Search Donor / Receipt / UTR"

                    value={search}

                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }

                />


                <select

                    value={statusFilter}

                    onChange={(e) =>
                        setStatusFilter(
                            e.target.value
                        )
                    }

                >

                    <option value="All">

                        All

                    </option>


                    <option value="Pending">

                        Pending

                    </option>


                    <option value="Success">

                        Success

                    </option>


                    <option value="Rejected">

                        Rejected

                    </option>

                </select>


                {/* ==============================================
                    PRINT ALL
                =============================================== */}

                <button

                    type="button"

                    className="printAllBtn"

                    onClick={
                        printAllDonations
                    }

                    disabled={
                        loading ||
                        donations.length === 0
                    }

                >

                    🖨️ Print All Donations

                </button>

            </div>


            {/* ==================================================
                CONTENT
            ================================================== */}

            {

                loading

                    ?

                    (

                        <div className="loadingBox">

                            Loading Donations...

                        </div>

                    )

                    :

                    filteredData.length === 0

                        ?

                        (

                            <div className="emptyBox">

                                <span>
                                    📭
                                </span>

                                <h2>

                                    No Donations Found

                                </h2>

                                <p>

                                    No UPI donations available.

                                </p>

                            </div>

                        )

                        :

                        (

                            <div className="tableWrapper">

                                <table
                                    className="upiTable"
                                >

                                    <thead>

                                        <tr>

                                            <th>
                                                #
                                            </th>

                                            <th>
                                                Receipt
                                            </th>

                                            <th>
                                                Donor
                                            </th>

                                            <th>
                                                Mobile
                                            </th>

                                            <th>
                                                Amount
                                            </th>

                                            <th>
                                                UTR
                                            </th>

                                            <th>
                                                Status
                                            </th>

                                            <th>
                                                Date
                                            </th>

                                            <th>
                                                Action
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {

                                            filteredData.map(
                                                (
                                                    item,
                                                    index
                                                ) => (

                                                    <tr
                                                        key={
                                                            item.id
                                                        }
                                                    >

                                                        <td>

                                                            {
                                                                index + 1
                                                            }

                                                        </td>


                                                        <td>

                                                            {
                                                                item.receipt
                                                            }

                                                        </td>


                                                        <td>

                                                            {
                                                                item.donorname
                                                            }

                                                        </td>


                                                        <td>

                                                            {
                                                                item.mobile
                                                            }

                                                        </td>


                                                        <td>

                                                            ₹
                                                            {
                                                                item.amount
                                                            }

                                                        </td>


                                                        <td>

                                                            {
                                                                item.utr
                                                            }

                                                        </td>


                                                        <td>

                                                            <span

                                                                className={
                                                                    `status ${
                                                                        item.status
                                                                            .toLowerCase()
                                                                    }`
                                                                }

                                                            >

                                                                {
                                                                    item.status
                                                                }

                                                            </span>

                                                        </td>


                                                        <td>

                                                            {

                                                                new Date(
                                                                    item.createdat
                                                                ).toLocaleDateString(
                                                                    "en-IN"
                                                                )

                                                            }

                                                        </td>


                                                        <td>

                                                            <div
                                                                className="actionButtons"
                                                            >

                                                                <button

                                                                    className="viewBtn"

                                                                    onClick={() =>
                                                                        setSelectedDonation(
                                                                            item
                                                                        )
                                                                    }

                                                                >

                                                                    👁

                                                                </button>


                                                                {

                                                                    item.status ===
                                                                        "Pending"

                                                                        &&

                                                                        <>

                                                                            <button

                                                                                className="approveBtn"

                                                                                onClick={() =>
                                                                                    approveDonation(
                                                                                        item.id
                                                                                    )
                                                                                }

                                                                            >

                                                                                ✅

                                                                            </button>


                                                                            <button

                                                                                className="rejectBtn"

                                                                                onClick={() =>
                                                                                    rejectDonation(
                                                                                        item.id
                                                                                    )
                                                                                }

                                                                            >

                                                                                ❌

                                                                            </button>

                                                                        </>

                                                                }

                                                            </div>

                                                        </td>

                                                    </tr>

                                                )
                                            )

                                        }

                                    </tbody>

                                </table>

                            </div>

                        )

            }


            {/* ==================================================
                MOBILE CARDS
            ================================================== */}

            <div className="mobileCards">

                {

                    filteredData.map(
                        (item) => (

                            <div

                                className="mobileCard"

                                key={
                                    item.id
                                }

                            >

                                <div className="cardHeader">

                                    <h3>

                                        {
                                            item.donorname
                                        }

                                    </h3>


                                    <span

                                        className={
                                            `status ${
                                                item.status.toLowerCase()
                                            }`
                                        }

                                    >

                                        {
                                            item.status
                                        }

                                    </span>

                                </div>


                                <p>

                                    <strong>
                                        Receipt :
                                    </strong>

                                    {
                                        item.receipt
                                    }

                                </p>


                                <p>

                                    <strong>
                                        Amount :
                                    </strong>

                                    ₹
                                    {
                                        item.amount
                                    }

                                </p>


                                <p>

                                    <strong>
                                        UTR :
                                    </strong>

                                    {
                                        item.utr
                                    }

                                </p>


                                <p>

                                    <strong>
                                        Mobile :
                                    </strong>

                                    {
                                        item.mobile
                                    }

                                </p>


                                <p>

                                    <strong>
                                        Payment :
                                    </strong>

                                    {
                                        item.payment_method ||
                                        "UPI"
                                    }

                                </p>


                                <p>

                                    <strong>
                                        Date :
                                    </strong>

                                    {

                                        new Date(
                                            item.createdat
                                        ).toLocaleDateString(
                                            "en-IN"
                                        )

                                    }

                                </p>


                                <div className="mobileActions">


                                    <button

                                        className="viewBtn"

                                        onClick={() =>
                                            setSelectedDonation(
                                                item
                                            )
                                        }

                                    >

                                        👁 View

                                    </button>


                                    {

                                        item.status ===
                                            "Pending"

                                            &&

                                            <>

                                                <button

                                                    className="approveBtn"

                                                    onClick={() =>
                                                        approveDonation(
                                                            item.id
                                                        )
                                                    }

                                                >

                                                    ✅ Approve

                                                </button>


                                                <button

                                                    className="rejectBtn"

                                                    onClick={() =>
                                                        rejectDonation(
                                                            item.id
                                                        )
                                                    }

                                                >

                                                    ❌ Reject

                                                </button>

                                            </>

                                    }

                                </div>

                            </div>

                        )
                    )

                }

            </div>


            {/* ==================================================
                DONATION DETAILS MODAL
            ================================================== */}

            {

                selectedDonation &&

                <div

                    className="modalOverlay"

                    onClick={() =>
                        setSelectedDonation(
                            null
                        )
                    }

                >

                    <div

                        className="donationModal"

                        onClick={(e) =>
                            e.stopPropagation()
                        }

                    >

                        <h2>

                            💳 Donation Details

                        </h2>


                        <div className="modalBody">


                            <p>

                                <strong>
                                    Receipt :
                                </strong>

                                {
                                    selectedDonation.receipt
                                }

                            </p>


                            <p>

                                <strong>
                                    Donor :
                                </strong>

                                {
                                    selectedDonation.donorname
                                }

                            </p>


                            <p>

                                <strong>
                                    Mobile :
                                </strong>

                                {
                                    selectedDonation.mobile
                                }

                            </p>


                            <p>

                                <strong>
                                    Amount :
                                </strong>

                                ₹
                                {
                                    selectedDonation.amount
                                }

                            </p>


                            <p>

                                <strong>
                                    UTR :
                                </strong>

                                {
                                    selectedDonation.utr
                                }

                            </p>


                            <p>

                                <strong>
                                    Payment Method :
                                </strong>

                                {
                                    selectedDonation.payment_method ||
                                    "UPI"
                                }

                            </p>


                            <p>

                                <strong>
                                    Status :
                                </strong>


                                <span

                                    className={
                                        `status ${
                                            selectedDonation.status.toLowerCase()
                                        }`
                                    }

                                >

                                    {
                                        selectedDonation.status
                                    }

                                </span>

                            </p>


                            <p>

                                <strong>
                                    Date :
                                </strong>

                                {

                                    new Date(
                                        selectedDonation.createdat
                                    ).toLocaleString(
                                        "en-IN"
                                    )

                                }

                            </p>

                        </div>


                        <div className="modalButtons">


                            {

                                selectedDonation.status ===
                                    "Pending"

                                    &&

                                    <>

                                        <button

                                            className="approveBtn"

                                            onClick={async () => {

                                                await approveDonation(
                                                    selectedDonation.id
                                                );

                                                setSelectedDonation(
                                                    null
                                                );

                                            }}

                                        >

                                            ✅ Approve

                                        </button>


                                        <button

                                            className="rejectBtn"

                                            onClick={async () => {

                                                await rejectDonation(
                                                    selectedDonation.id
                                                );

                                                setSelectedDonation(
                                                    null
                                                );

                                            }}

                                        >

                                            ❌ Reject

                                        </button>

                                    </>

                            }


                            <button

                                className="closeBtn"

                                onClick={() =>
                                    setSelectedDonation(
                                        null
                                    )
                                }

                            >

                                Close

                            </button>

                        </div>

                    </div>

                </div>

            }

        </div>

    );

}


export default UPIDonationManagement;