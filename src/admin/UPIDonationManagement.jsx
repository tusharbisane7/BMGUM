import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import "../styles/UPIDonationManagement.css";

const API = "https://bmgum.onrender.com/api";

function UPIDonationManagement() {

    const token = localStorage.getItem("token");

    const [loading, setLoading] = useState(true);

    const [donations, setDonations] = useState([]);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    const [selectedDonation, setSelectedDonation] = useState(null);

    /* =====================================
        LOAD DONATIONS
    ===================================== */

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

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            if (res.data.success) {

                setDonations(res.data.donations);

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
        /* =====================================
        APPROVE DONATION
    ===================================== */

    const approveDonation = async (id) => {

        try {

            const res = await axios.put(

                `${API}/upi-donations/approve/${id}`,

                {},

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            if (res.data.success) {

                alert("Donation Approved Successfully.");

                fetchDonations();

            } else {

                alert(res.data.message);

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



    /* =====================================
        REJECT DONATION
    ===================================== */

    const rejectDonation = async (id) => {

        try {

            const res = await axios.put(

                `${API}/upi-donations/reject/${id}`,

                {},

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            if (res.data.success) {

                alert("Donation Rejected Successfully.");

                fetchDonations();

            } else {

                alert(res.data.message);

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



    /* =====================================
        FILTER DATA
    ===================================== */

    const filteredData = useMemo(() => {

        return donations.filter((item) => {

            const matchesSearch =

                item.donorname

                    ?.toLowerCase()

                    .includes(search.toLowerCase())

                ||

                item.utr

                    ?.toLowerCase()

                    .includes(search.toLowerCase())

                ||

                item.receipt

                    ?.toLowerCase()

                    .includes(search.toLowerCase());



            const matchesStatus =

                statusFilter === "All"

                ||

                item.status === statusFilter;



            return matchesSearch && matchesStatus;

        });

    }, [

        donations,

        search,

        statusFilter

    ]);



    /* =====================================
        DASHBOARD STATS
    ===================================== */

    const totalAmount = filteredData.reduce(

        (sum, item) =>

            sum + Number(item.amount),

        0

    );



    const pendingCount = filteredData.filter(

        (item) => item.status === "Pending"

    ).length;



    const approvedCount = filteredData.filter(

        (item) => item.status === "Success"

    ).length;



    const rejectedCount = filteredData.filter(

        (item) => item.status === "Rejected"

    ).length;
        return (

        <div className="upiDonationPage">

            {/* ================= HERO ================= */}

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

            {/* ================= STATISTICS ================= */}

            <div className="statsGrid">

                <div className="statCard">

                    <span>💰</span>

                    <h2>

                        ₹{totalAmount.toLocaleString()}

                    </h2>

                    <p>Total Collection</p>

                </div>

                <div className="statCard">

                    <span>🟡</span>

                    <h2>

                        {pendingCount}

                    </h2>

                    <p>Pending</p>

                </div>

                <div className="statCard">

                    <span>✅</span>

                    <h2>

                        {approvedCount}

                    </h2>

                    <p>Approved</p>

                </div>

                <div className="statCard">

                    <span>❌</span>

                    <h2>

                        {rejectedCount}

                    </h2>

                    <p>Rejected</p>

                </div>

            </div>

            {/* ================= SEARCH ================= */}

            <div className="toolbar">

                <input

                    type="text"

                    placeholder="Search Donor / Receipt / UTR"

                    value={search}

                    onChange={(e)=>

                        setSearch(e.target.value)

                    }

                />

                <select

                    value={statusFilter}

                    onChange={(e)=>

                        setStatusFilter(e.target.value)

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

            </div>

            {/* ================= CONTENT ================= */}

            {

                loading ?

                (

                    <div className="loadingBox">

                        Loading Donations...

                    </div>

                )

                :

                filteredData.length===0 ?

                (

                    <div className="emptyBox">

                        <span>📭</span>

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

                        <table className="upiTable">

                            <thead>

                                <tr>

                                    <th>#</th>

                                    <th>Receipt</th>

                                    <th>Donor</th>

                                    <th>Mobile</th>

                                    <th>Amount</th>

                                    <th>UTR</th>

                                    <th>Status</th>

                                    <th>Date</th>

                                    <th>Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    filteredData.map((item,index)=>(

                                        <tr key={item.id}>

                                            <td>

                                                {index+1}

                                            </td>

                                            <td>

                                                {item.receipt}

                                            </td>

                                            <td>

                                                {item.donorname}

                                            </td>

                                            <td>

                                                {item.mobile}

                                            </td>

                                            <td>

                                                ₹{item.amount}

                                            </td>

                                            <td>

                                                {item.utr}

                                            </td>

                                            <td>

                                                <span

                                                    className={`status ${item.status.toLowerCase()}`}

                                                >

                                                    {item.status}

                                                </span>

                                            </td>

                                            <td>

                                                {

                                                    new Date(

                                                        item.createdat

                                                    ).toLocaleDateString("en-IN")

                                                }

                                            </td>

                                            <td>

                                                <div className="actionButtons">

                                                    <button

                                                        className="viewBtn"

                                                        onClick={()=>

                                                            setSelectedDonation(item)

                                                        }

                                                    >

                                                        👁

                                                    </button>

                                                    {

                                                        item.status==="Pending" &&

                                                        <>

                                                            <button

                                                                className="approveBtn"

                                                                onClick={()=>

                                                                    approveDonation(item.id)

                                                                }

                                                            >

                                                                ✅

                                                            </button>

                                                            <button

                                                                className="rejectBtn"

                                                                onClick={()=>

                                                                    rejectDonation(item.id)

                                                                }

                                                            >

                                                                ❌

                                                            </button>

                                                        </>

                                                    }

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    </div>

                )

            }
                        {/* ===============================
                MOBILE CARDS
            =============================== */}

            <div className="mobileCards">

                {

                    filteredData.map((item) => (

                        <div

                            className="mobileCard"

                            key={item.id}

                        >

                            <div className="cardHeader">

                                <h3>

                                    {item.donorname}

                                </h3>

                                <span

                                    className={`status ${item.status.toLowerCase()}`}

                                >

                                    {item.status}

                                </span>

                            </div>

                            <p>

                                <strong>Receipt :</strong>

                                {item.receipt}

                            </p>

                            <p>

                                <strong>Amount :</strong>

                                ₹{item.amount}

                            </p>

                            <p>

                                <strong>UTR :</strong>

                                {item.utr}

                            </p>

                            <p>

                                <strong>Mobile :</strong>

                                {item.mobile}

                            </p>

                            <p>

                                <strong>Payment :</strong>

                                {item.payment_method || "UPI"}

                            </p>

                            <p>

                                <strong>Date :</strong>

                                {

                                    new Date(

                                        item.createdat

                                    ).toLocaleDateString("en-IN")

                                }

                            </p>

                            <div className="mobileActions">

                                <button

                                    className="viewBtn"

                                    onClick={() =>

                                        setSelectedDonation(item)

                                    }

                                >

                                    👁 View

                                </button>

                                {

                                    item.status === "Pending" &&

                                    <>

                                        <button

                                            className="approveBtn"

                                            onClick={() =>

                                                approveDonation(item.id)

                                            }

                                        >

                                            ✅ Approve

                                        </button>

                                        <button

                                            className="rejectBtn"

                                            onClick={() =>

                                                rejectDonation(item.id)

                                            }

                                        >

                                            ❌ Reject

                                        </button>

                                    </>

                                }

                            </div>

                        </div>

                    ))

                }

            </div>
                        {/* ===============================
                DONATION DETAILS MODAL
            =============================== */}

            {

                selectedDonation &&

                <div

                    className="modalOverlay"

                    onClick={() =>

                        setSelectedDonation(null)

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

                                <strong>Receipt :</strong>

                                {selectedDonation.receipt}

                            </p>

                            <p>

                                <strong>Donor :</strong>

                                {selectedDonation.donorname}

                            </p>

                            <p>

                                <strong>Mobile :</strong>

                                {selectedDonation.mobile}

                            </p>

                            <p>

                                <strong>Amount :</strong>

                                ₹{selectedDonation.amount}

                            </p>

                            <p>

                                <strong>UTR :</strong>

                                {selectedDonation.utr}

                            </p>

                            <p>

                                <strong>Payment Method :</strong>

                                {selectedDonation.payment_method || "UPI"}

                            </p>

                            <p>

                                <strong>Status :</strong>

                                <span

                                    className={`status ${selectedDonation.status.toLowerCase()}`}

                                >

                                    {selectedDonation.status}

                                </span>

                            </p>

                            <p>

                                <strong>Date :</strong>

                                {

                                    new Date(

                                        selectedDonation.createdat

                                    ).toLocaleString("en-IN")

                                }

                            </p>

                        </div>

                        <div className="modalButtons">

                            {

                                selectedDonation.status === "Pending" &&

                                <>

                                    <button

                                        className="approveBtn"

                                        onClick={async () => {

                                            await approveDonation(

                                                selectedDonation.id

                                            );

                                            setSelectedDonation(null);

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

                                            setSelectedDonation(null);

                                        }}

                                    >

                                        ❌ Reject

                                    </button>

                                </>

                            }

                            <button

                                className="closeBtn"

                                onClick={() =>

                                    setSelectedDonation(null)

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