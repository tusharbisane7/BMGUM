import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import "../styles/myDonations.css";

function MyDonations() {

    const [donations, setDonations] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    /* ==========================
       FETCH MY DONATIONS
    ========================== */

    useEffect(() => {

        const fetchDonations = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await fetch(

                    "https://bmgum.onrender.com/api/donations/my",

                    {

                        headers: {

                            Authorization: `Bearer ${token}`

                        }

                    }

                );

                const result = await response.json();

                if (result.success) {

                    setDonations(result.donations);

                } else {

                    setDonations([]);

                }

            }

            catch (err) {

                console.log(err);

                setDonations([]);

            }

            finally {

                setLoading(false);

            }

        };

        fetchDonations();

    }, []);

    /* ==========================
       SEARCH FILTER
    ========================== */

    const filteredDonations = useMemo(() => {

        return donations.filter((item) => {

            return (

                item.receipt

                    ?.toLowerCase()

                    .includes(search.toLowerCase())

                ||

                item.utr

                    ?.toLowerCase()

                    .includes(search.toLowerCase())

                ||

                item.amount

                    ?.toString()

                    .includes(search)

            );

        });

    }, [donations, search]);



    /* ==========================
       DASHBOARD STATS
    ========================== */

    const totalDonation = donations.reduce(

        (sum, item) =>

            sum + Number(item.amount),

        0

    );

    const totalReceipts = donations.length;

    const latestDonation =

        donations.length > 0

            ? donations[0].amount

            : 0;
                return (

        <div className="myDonationPage">

            {/* ================= HERO ================= */}

            <section className="donationHero">

                <div className="heroOverlay"></div>

                <div className="heroContent">

                    <h1>

                        🙏 My Donations

                    </h1>

                    <p>

                        Thank you for supporting

                        <br />

                        <strong>

                            Bal Mitra Ganesh Utsav Mandal

                        </strong>

                    </p>

                </div>

            </section>

            {/* ================= DASHBOARD ================= */}

            <section className="statsSection">

                <div className="statCard">

                    <span>💰</span>

                    <h2>

                        ₹{totalDonation}

                    </h2>

                    <p>Total Donation</p>

                </div>

                <div className="statCard">

                    <span>🧾</span>

                    <h2>

                        {totalReceipts}

                    </h2>

                    <p>Total Receipts</p>

                </div>

                <div className="statCard">

                    <span>❤️</span>

                    <h2>

                        ₹{latestDonation}

                    </h2>

                    <p>Latest Donation</p>

                </div>

            </section>

            {/* ================= SEARCH ================= */}

            <section className="searchSection">

                <input

                    type="text"

                    placeholder="Search Receipt / UTR Number..."

                    value={search}

                    onChange={(e) =>

                        setSearch(e.target.value)

                    }

                />

            </section>

            {/* ================= LOADING ================= */}

            {

                loading && (

                    <div className="loadingBox">

                        Loading Donations...

                    </div>

                )

            }

            {/* ================= EMPTY ================= */}

            {

                !loading && filteredDonations.length === 0 && (

                    <div className="emptyDonation">

                        <div className="emptyIcon">

                            🙏

                        </div>

                        <h2>

                            No Donations Found

                        </h2>

                        <p>

                            You haven't submitted any donations yet.

                        </p>

                        <Link

                            to="/online-donation"

                            className="donateNowBtn"

                        >

                            💳 Donate Now

                        </Link>

                    </div>

                )

            }
                        {/* ================= DESKTOP TABLE ================= */}

            {

                !loading && filteredDonations.length > 0 && (

                    <section className="donationTableWrapper">

                        <table className="donationTable">

                            <thead>

                                <tr>

                                    <th>Receipt</th>

                                    <th>Date</th>

                                    <th>Amount</th>

                                    <th>UTR Number</th>

                                    <th>Method</th>

                                    <th>Status</th>

                                    <th>Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    filteredDonations.map((item) => (

                                        <tr key={item.id}>

                                            <td>

                                                {item.receipt}

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

                                                ₹{item.amount}

                                            </td>

                                            <td>

                                                {item.utr || "-"}

                                            </td>

                                            <td>

                                                {item.payment_method || "UPI"}

                                            </td>

                                            <td>

                                                <span

                                                    className={`status ${item.status?.toLowerCase()}`}

                                                >

                                                    {item.status}

                                                </span>

                                            </td>

                                            <td>

                                                <div className="actionButtons">

                                                  {
    item.status === "Success" ? (

        <a
            href={`https://bmgum.onrender.com/receipts/${item.receipt}.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="actionBtn download"
        >
            📄
        </a>

    ) : (

        <button
            className="actionBtn pending"
            onClick={() => {

                alert(
                    "Receipt download will be available after admin verification."
                );

            }}
        >
            ⏳
        </button>

    )
}

                                                    <button

                                                        className="actionBtn whatsapp"

                                                        onClick={() => {

                                                            const msg =

`🙏 Bal Mitra Ganesh Utsav Mandal

Receipt : ${item.receipt}

Amount : ₹${item.amount}

UTR : ${item.utr || "-"}

Status : ${item.status}

Payment Method : ${item.payment_method || "UPI"}

Thank You ❤️`;

                                                            window.open(

                                                                `https://wa.me/?text=${encodeURIComponent(msg)}`,

                                                                "_blank"

                                                            );

                                                        }}

                                                    >

                                                        📱

                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    </section>

                )

            }
                        {/* ================= MOBILE CARDS ================= */}

            {

                !loading && filteredDonations.length > 0 && (

                    <section className="mobileDonationCards">

                        {

                            filteredDonations.map((item) => (

                                <div

                                    className="donationCard"

                                    key={item.id}

                                >

                                    <div className="cardTop">

                                        <h3>

                                            {item.receipt}

                                        </h3>

                                        <span

                                            className={`status ${item.status?.toLowerCase()}`}

                                        >

                                            {item.status}

                                        </span>

                                    </div>

                                    <p>

                                        💰 <strong>Amount :</strong> ₹{item.amount}

                                    </p>

                                    <p>

                                        🆔 <strong>UTR :</strong> {item.utr || "-"}

                                    </p>

                                    <p>

                                        💳 <strong>Method :</strong> {item.payment_method || "UPI"}

                                    </p>

                                    <p>

                                        📅 <strong>Date :</strong>{" "}

                                        {

                                            new Date(item.createdat)

                                                .toLocaleDateString("en-IN")

                                        }

                                    </p>

                                    <div className="mobileActions">

                                       {
    item.status === "Success" ? (

       <a
    href={`https://bmgum.onrender.com/api/upi-donations/receipt/${item.receipt}`}
    target="_blank"
    rel="noopener noreferrer"
    className="download"
>
    📄 Download Receipt
</a>

    ) : (

        <button
            className="pending"
            onClick={() => {

                alert(
                    "Receipt download will be available after admin verification."
                );

            }}
        >
            ⏳ Pending Verification
        </button>

    )
}

                                        <button

                                            className="whatsapp"

                                            onClick={() => {

                                                const msg =

`🙏 Bal Mitra Ganesh Utsav Mandal

Receipt : ${item.receipt}

Amount : ₹${item.amount}

UTR : ${item.utr || "-"}

Status : ${item.status}

Payment Method : ${item.payment_method || "UPI"}

Thank You ❤️`;

                                                window.open(

                                                    `https://wa.me/?text=${encodeURIComponent(msg)}`,

                                                    "_blank"

                                                );

                                            }}

                                        >

                                            📱 WhatsApp

                                        </button>

                                    </div>

                                </div>

                            ))

                        }

                    </section>

                )

            }
                    </div>

    );

}

export default MyDonations;