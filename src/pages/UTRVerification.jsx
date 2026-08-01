import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/UTRVerification.css";

const API = "https://bmgum.onrender.com/api";

function UTRVerification() {

    const navigate = useNavigate();

    const location = useLocation();

    const donation = location.state;

    const token = localStorage.getItem("token");

    const [utr, setUtr] = useState("");

    const [loading, setLoading] = useState(false);

    /* =====================================
       CHECK DONATION DATA
    ===================================== */

    useEffect(() => {

        if (!donation) {

            navigate("/online-donation");

        }

    }, [donation, navigate]);

    /* =====================================
       VALIDATION
    ===================================== */

    const validate = () => {

        if (!utr.trim()) {

            alert("Please enter UTR Number.");

            return false;

        }

        if (utr.trim().length < 10) {

            alert("Please enter a valid UTR Number.");

            return false;

        }

        return true;

    };
        /* =====================================
       SUBMIT UTR
    ===================================== */

    const handleSubmit = async () => {

        if (!validate()) return;

        setLoading(true);

        try {

            const response = await axios.post(

                `${API}/upi-donations/submit`,

                {

                    donorname: donation.fullName,

                    marathiName: donation.marathiName,

                    mobile: donation.mobile,

                    address: donation.address,

                    purpose: donation.purpose,

                    amount: donation.amount,

                    utr: utr.trim(),

                    payment_method: "UPI",

                    status: "Pending"

                },

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            if (response.data.success) {

                alert(

                    "🙏 Thank you!\n\nYour donation has been submitted successfully.\n\nIt is now waiting for admin verification."

                );

                navigate("/my-donations");

            }

            else {

                alert(

                    response.data.message ||

                    "Unable to submit donation."

                );

            }

        }

        catch (err) {

            console.error(err);

            alert(

                err.response?.data?.message ||

                "Server Error"

            );

        }

        finally {

            setLoading(false);

        }

    };
        return (

        <div className="utrPage">

            <section className="utrHero">

                <h1>

                    💳 UPI Payment Verification

                </h1>

                <p>

                    Complete your donation by submitting your UTR Number.

                </p>

            </section>

            <div className="utrContainer">

                {/* ================= DONATION SUMMARY ================= */}

                <div className="summaryCard">

                    <h2>

                        Donation Summary

                    </h2>

                    <div className="summaryRow">

                        <span>Name</span>

                        <strong>

                            {donation?.fullName}

                        </strong>

                    </div>

                    <div className="summaryRow">

                        <span>Marathi Name</span>

                        <strong>

                            {donation?.marathiName}

                        </strong>

                    </div>

                    <div className="summaryRow">

                        <span>Mobile</span>

                        <strong>

                            {donation?.mobile}

                        </strong>

                    </div>

                    <div className="summaryRow">

                        <span>Purpose</span>

                        <strong>

                            {donation?.purpose}

                        </strong>

                    </div>

                    <div className="summaryRow">

                        <span>Donation Amount</span>

                        <strong>

                            ₹{donation?.amount}

                        </strong>

                    </div>

                </div>

                {/* ================= UTR FORM ================= */}

                <div className="utrCard">

                    <h2>

                        Verify Your Payment

                    </h2>

                    <p className="infoText">

                        After completing the UPI payment in Google Pay,

                        PhonePe, Paytm or BHIM, enter the UTR Number below.

                    </p>

                    <label>

                        UTR Number

                    </label>

                    <input

                        type="text"

                        placeholder="Example : 432189765432"

                        value={utr}

                        onChange={(e) =>

                            setUtr(e.target.value)

                        }

                    />

                    <div className="noteBox">

                        <strong>Note</strong>

                        <ul>

                            <li>

                                Submit the correct UTR Number.

                            </li>

                            <li>

                                Admin will verify your payment.

                            </li>

                            <li>

                                After approval your receipt will be generated.

                            </li>

                        </ul>

                    </div>

                    <button

                        className="submitBtn"

                        onClick={handleSubmit}

                        disabled={loading}

                    >

                        {

                            loading

                                ?

                                "Submitting..."

                                :

                                "Submit for Verification"

                        }

                    </button>

                </div>

            </div>
                    </div>

    );

}

export default UTRVerification;