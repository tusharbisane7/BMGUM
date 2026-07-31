import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./../styles/myDonations.css";

function MyDonations() {

    const [donations, setDonations] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    // ==========================
    // Fetch Donations
    // ==========================

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

                setDonations(result || []);

            }

            catch (err) {

                console.log(err);

            }

            finally {

                setLoading(false);

            }

        };

        fetchDonations();

    }, []);

    // ==========================
    // Search Filter
    // ==========================

    const filteredDonations = useMemo(() => {

        return donations.filter((item) => {

            return (

                item.receipt_no

                    ?.toLowerCase()

                    .includes(search.toLowerCase())

                ||

                item.payment_id

                    ?.toLowerCase()

                    .includes(search.toLowerCase())

                ||

                item.amount

                    ?.toString()

                    .includes(search)

            );

        });

    }, [donations, search]);

    // ==========================
    // Dashboard Stats
    // ==========================

    const totalDonation = donations.reduce(

        (sum, item) =>

            sum + Number(item.amount),

        0

    );

    const totalReceipts = donations.length;

    const latestDonation = donations.length

        ? donations[0].amount

        : 0;

    return (

        <div className="myDonationPage">

            {/* ================= HERO ================= */}

            <section className="donationHero">

                <div className="heroOverlay"></div>

                <div className="heroContent">

                    <h1>

                        🙏 My Online Donations

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

                    placeholder="Search Receipt / Payment ID..."

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
                        {/* ================= CONTENT ================= */}

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

                            You haven't made any online donations yet.

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

            {

                !loading && filteredDonations.length > 0 && (

                    <section className="donationTableWrapper">

                        <table className="donationTable">

                            <thead>

                                <tr>

                                    <th>Receipt</th>

                                    <th>Date</th>

                                    <th>Amount</th>

                                    <th>Status</th>

                                    <th>Payment ID</th>

                                    <th>Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    filteredDonations.map(

                                        (item) => (

                                            <tr

                                                key={item.id}

                                            >

                                                <td>

                                                    {

                                                        item.receipt_no

                                                    }

                                                </td>

                                                <td>

                                                    {

                                                        new Date(

                                                            item.created_at

                                                        ).toLocaleDateString(

                                                            "en-IN"

                                                        )

                                                    }

                                                </td>

                                                <td>

                                                    ₹

                                                    {

                                                        item.amount

                                                    }

                                                </td>

                                                <td>

                                                    <span className="status success">

                                                        {

                                                            item.payment_status ||

                                                            "Success"

                                                        }

                                                    </span>

                                                </td>

                                                <td>

                                                    {

                                                        item.payment_id

                                                    }

                                                </td>

                                                <td>

                                                    <div className="actionButtons">

                                                        <button

                                                            className="actionBtn download"

                                                        >

                                                            📄

                                                        </button>

                                                        <button

                                                            className="actionBtn whatsapp"

                                                            onClick={() => {

                                                                const msg =

`🙏 Donation Receipt

Receipt No: ${item.receipt_no}

Amount: ₹${item.amount}

Payment ID: ${item.payment_id}

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

                                        )

                                    )

                                }

                            </tbody>

                        </table>

                    </section>

                )

            }

            {/* ================= MOBILE CARDS ================= */}

            <section className="mobileDonationCards">

                {

                    filteredDonations.map(

                        (item) => (

                            <div

                                className="donationCard"

                                key={item.id}

                            >

                                <div className="cardTop">

                                    <h3>

                                        {

                                            item.receipt_no

                                        }

                                    </h3>

                                    <span className="status success">

                                        Success

                                    </span>

                                </div>

                                <p>

                                    💰 ₹

                                    {

                                        item.amount

                                    }

                                </p>

                                <p>

                                    💳

                                    {

                                        item.payment_id

                                    }

                                </p>

                                <p>

                                    📅

                                    {

                                        new Date(

                                            item.created_at

                                        ).toLocaleDateString(

                                            "en-IN"

                                        )

                                    }

                                </p>

                                <div className="mobileActions">

                                    <button className="download">

                                        📄 Download

                                    </button>

                                    <button

                                        className="whatsapp"

                                        onClick={() => {

                                            const msg =

`Receipt No: ${item.receipt_no}

Amount: ₹${item.amount}`;

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

                        )

                    )

                }

            </section>

        </div>

    );

}

export default MyDonations;