import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  FaDonate,
  FaMoneyBillWave,
  FaWallet,
  FaUsers,
  FaUserFriends,
  FaHandshake,
  FaEye,
  FaBullhorn,
  FaUserShield,
  FaSignOutAlt,
  FaPlusCircle,
  FaReceipt,
  FaCog,
  FaKey,
  FaVideo
} from "react-icons/fa";

import "../styles/admin/dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("adminUser")) || {};

  /* ===============================
            STATES
  =============================== */

  const [dashboardData, setDashboardData] = useState({

    totalDonation: 0,

    totalExpense: 0,

    balance: 0,

    totalDonors: 0,

    activeNotices: 0,

    recentDonations: [],

    recentExpenses: [],

    notices: []

  });

  const [currentDate, setCurrentDate] = useState("");

  const [currentTime, setCurrentTime] = useState("");

  const [loading, setLoading] = useState(true);

  /* ===============================
          LOAD DASHBOARD
  =============================== */

  const loadDashboard = async () => {

    try {

      const res = await axios.get(

        "https://bmgum.onrender.com/api/dashboard"

      );

      setDashboardData(res.data);

    }

    catch (err) {

      console.log(err);

    }

  };

  /* ===============================
        SERVER DATE & TIME
  =============================== */

  const loadServerTime = async () => {

    try {

      const res = await axios.get(

        "https://bmgum.onrender.com/api/server-time"

      );

      setCurrentDate(res.data.date);

      setCurrentTime(res.data.time);

    }

    catch (err) {

      console.log(err);

    }

  };

  /* ===============================
            LOAD DATA
  =============================== */

  useEffect(() => {

    const fetchAll = async () => {

      setLoading(true);

      await Promise.all([

        loadDashboard(),

        loadServerTime()

      ]);

      setLoading(false);

    };

    fetchAll();

    const interval = setInterval(() => {

      loadDashboard();

      loadServerTime();

    }, 1000);

    return () => clearInterval(interval);

  }, []);

  /* ===============================
            LOGOUT
  =============================== */

  const logout = () => {

    localStorage.removeItem("adminLoggedIn");

    localStorage.removeItem("adminUser");

    localStorage.removeItem("token");

    navigate("/login");

  };

  if (loading) {

    return (

      <div className="loading-page">

        <h2>Loading Dashboard...</h2>

      </div>

    );

  }

  return (

    <div className="dashboard">
            {/* ================= HEADER ================= */}

      <div className="dashboard-header">

        <div>

          <h1>🛕 बाल मित्र गणेश उत्सव मंडळ</h1>

          <p>खिरणीबागपुरा, अचलपूर </p>

          <div className="live-date">

            📅 {currentDate}

            <span> | </span>

            🕒 {currentTime}

          </div>

        </div>

        <div className="header-right">

          <div className="user-card">

            <FaUserShield />

            <div>

              <h3>{user.username}</h3>

              <span>{user.role}</span>

            </div>

          </div>

          <button

            className="logout-btn"

            onClick={logout}

          >

            <FaSignOutAlt />

            लॉगआउट 

          </button>

        </div>

      </div>

      {/* ================= DASHBOARD CARDS ================= */}

      <div className="cards-grid">

        <div className="dashboard-card donation">

          <FaDonate className="card-icon"/>

          <h4>एकूण देणगी</h4>

          <h2>

            ₹{(dashboardData.totalDonation || 0).toLocaleString()}

          </h2>

        </div>

        <div className="dashboard-card expense">

          <FaMoneyBillWave className="card-icon"/>

          <h4>एकूण खर्च </h4>

          <h2>

            ₹{(dashboardData.totalExpense || 0).toLocaleString()}

          </h2>

        </div>

        <div className="dashboard-card balance">

          <FaWallet className="card-icon"/>

          <h4>जमा रक्कम </h4>

          <h2>

           ₹{(dashboardData.balance || 0).toLocaleString()}

          </h2>

        </div>

        <div className="dashboard-card donors">

          <FaUsers className="card-icon"/>

          <h4>एकूण देणगीदार </h4>

          <h2>

            {dashboardData.totalDonors || 0}

          </h2>

        </div>

        <div className="dashboard-card notice">

          <FaBullhorn className="card-icon"/>

          <h4>सक्रिय सूचना फलक </h4>

          <h2>

            {dashboardData.activeNotices || 0}

          </h2>

        </div>

      </div>

      {/* ================= QUICK ACTIONS ================= */}

      <div className="quick-section">

        <h2>

          ⚡ झटपट कृती 

        </h2>

        <div className="quick-grid">

  <button

            onClick={() =>

              navigate("/")

            }

          >

            <FaUsers />

            मुख्य पेज 

          </button>

          <button

            onClick={() =>

              navigate("/admin/donations")

            }

          >

            <FaPlusCircle />

            नवीन देणगी जोडा 

          </button>

          <button

            onClick={() =>

              navigate("/admin/expenses")

            }

          >

            <FaReceipt />

            नवीन खर्च जोडा 

          </button>

          <button

            onClick={() =>

              navigate("/admin/notices")

            }

          >

            <FaBullhorn />

            नवीन सूचना जोडा 

          </button>

          <button

            onClick={() =>

              navigate("/admin/committee")

            }

          >

            <FaUsers />

            पंचकमिटी 

          </button>

<button
  onClick={() => navigate("/admin/meetings")}
>
  <FaVideo />
  मीटिंग व्यवस्थापन
</button>

         <button
  onClick={() =>
    navigate("/admin/timeline")
  }
>
  <FaCog />
  कार्यक्रम वेळपत्र जोडा 
</button>

          <button
  onClick={() => navigate("/admin/aarti")}
>
  🪔
  नवीन आरत्या जोडा  
</button>

          <button

            onClick={() =>

              navigate("/admin/change-password")

            }

          >

            <FaKey />

           पासवर्ड बदला 

          </button>

          <button
  onClick={() => navigate("/admin/volunteers")}
>

  <FaUserFriends />

  स्वयंसेवक व्यवस्थापन

</button>

<button
  onClick={() => navigate("/admin/sponsors")}
>

  <FaHandshake />

  प्रायोजक व्यवस्थापन

</button>

<button
  onClick={() => navigate("/admin/complaints")}
>

  <FaHandshake />

  📋 Complaint Management

</button>

          {

            user.role === "Super Admin" && (

              <button

                className="super-btn"

                onClick={() =>

                  navigate("/admin/users")

                }

              >

                <FaUserShield />

                यूजर मॅनेजमेंट 

              </button>

            )

          }

        </div>

      </div>
            {/* ================= RECENT DONATIONS ================= */}

      <div className="dashboard-section">

        <div className="section-header">

          <h2>💰 Recent Donations</h2>

          <button
            className="view-btn"
            onClick={() => navigate("/admin/donations")}
          >
            सर्व देणगी पहा 
          </button>

        </div>

        <table className="dashboard-table">

          <thead>

            <tr>

              <th>ID</th>

              <th>Donor</th>

              <th>Amount</th>

              <th>Date</th>

              <th>Receipt</th>

            </tr>

          </thead>

          <tbody>

  {(dashboardData?.recentDonations?.length ?? 0) === 0 ? (

    <tr>

      <td colSpan="5">

        No Donations Found

      </td>

    </tr>

  ) : (

    (dashboardData?.recentDonations || []).map((item) => (

      <tr key={item.id}>

        <td>{item.id}</td>

        <td>{item.donorName}</td>

        <td>₹{item.amount}</td>

        <td>{item.date}</td>

        <td>

          {item.receipt ? (

            <a
              href={`https://bmgum.onrender.com/uploads/receipts/${item.receipt}`}
              target="_blank"
              rel="noreferrer"
            >
              View
            </a>

          ) : (

            "-"

          )}

        </td>

      </tr>

    ))

  )}

</tbody>

        </table>

      </div>

      {/* ================= RECENT EXPENSES ================= */}

      <div className="dashboard-section">

        <div className="section-header">

          <h2>💸 Recent Expenses</h2>

          <button

            className="view-btn"

            onClick={() => navigate("/admin/expenses")}

          >

            सर्व खर्च पहा 

          </button>

        </div>

        <table className="dashboard-table">

          <thead>

            <tr>

              <th>ID</th>

              <th>Expense</th>

              <th>Amount</th>

              <th>Date</th>

              <th>Bill</th>

            </tr>

          </thead>

         <tbody>

  {(dashboardData?.recentExpenses?.length ?? 0) === 0 ? (

    <tr>

      <td colSpan="5">

        No Expenses Found

      </td>

    </tr>

  ) : (

    (dashboardData?.recentExpenses || []).map((item) => (

      <tr key={item.id}>

        <td>{item.id}</td>

        <td>{item.title}</td>

        <td>₹{item.amount}</td>

        <td>{item.date}</td>

        <td>

          {item.bill ? (

            <a
              href={`https://bmgum.onrender.com/uploads/bills/${item.bill}`}
              target="_blank"
              rel="noreferrer"
            >
              View
            </a>

          ) : (

            "-"

          )}

        </td>

      </tr>

    ))

  )}

</tbody>

        </table>

      </div>

      

      {/* ================= ACTIVE NOTICES ================= */}

<div className="dashboard-section">

  <div className="section-header">

    <h2>📢 Active Notices</h2>

  </div>

  {(dashboardData.notices || []).length === 0 ? (

    <div className="notice-box">

      No Active Notice

    </div>

  ) : (

    (dashboardData.notices || []).map((notice) => (

      <div
        className="notice-box"
        key={notice.id}
      >

        <h3>{notice.title}</h3>

        <p>{notice.description}</p>

      </div>

    ))

  )}

</div>
      {/* ================= ADMIN PROFILE ================= */}

      <div className="dashboard-section">

        <div className="section-header">

          <h2>👤 Logged In User</h2>

        </div>

        <div className="admin-profile">

          <div>

            <strong>Username</strong>

            <p>{user.username}</p>

          </div>

          <div>

            <strong>Role</strong>

            <p>{user.role}</p>

          </div>

          <div>

            <strong>Status</strong>

            <p style={{color:"green"}}>

              ● Online

            </p>

          </div>

          <div>

            <strong>Date</strong>

            <p>{currentDate}</p>

          </div>

          <div>

            <strong>Time</strong>

            <p>{currentTime}</p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;