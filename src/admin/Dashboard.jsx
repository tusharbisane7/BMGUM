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
  FaBullhorn,
  FaUserShield,
  FaSignOutAlt,
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

  /* =====================================
              DASHBOARD STATES
  ===================================== */

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

  const [currentDate, setCurrentDate] =
    useState("");

  const [currentTime, setCurrentTime] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  /* =====================================
          LOAD DASHBOARD DATA
  ===================================== */

  const loadDashboard = async () => {

    try {

      const res = await axios.get(

        "https://bmgum.onrender.com/api/dashboard"

      );

      setDashboardData(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  /* =====================================
          LOAD SERVER DATE & TIME
  ===================================== */

  const loadServerTime = async () => {

    try {

      const res = await axios.get(

        "https://bmgum.onrender.com/api/server-time"

      );

      setCurrentDate(res.data.date);

      setCurrentTime(res.data.time);

    } catch (err) {

      console.log(err);

    }

  };

  /* =====================================
              INITIAL LOAD
  ===================================== */

  useEffect(() => {

    const fetchDashboard = async () => {

      setLoading(true);

      await Promise.all([

        loadDashboard(),

        loadServerTime()

      ]);

      setLoading(false);

    };

    fetchDashboard();

    const interval = setInterval(() => {

      loadDashboard();

      loadServerTime();

    }, 1000);

    return () => clearInterval(interval);

  }, []);

  /* =====================================
                LOGOUT
  ===================================== */

  const logout = () => {

    localStorage.removeItem("adminLoggedIn");

    localStorage.removeItem("adminUser");

    localStorage.removeItem("token");

    navigate("/login");

  };

  /* =====================================
            LOADING SCREEN
  ===================================== */

  if (loading) {

    return (

      <div className="loading-page">

        <h2>

          Loading Dashboard...

        </h2>

      </div>

    );

  }

  return (

    <div className="dashboard-container">

      <main className="dashboard-main">

        {/* =====================================
                    HEADER
        ===================================== */}

        <div className="dashboard-header">

          <div className="header-left">

            <h1>

              🛕 बाल मित्र गणेश उत्सव मंडळ

            </h1>

            <p>

              खिरणीबागपुरा, अचलपूर

            </p>

          </div>

          <div className="header-right">

            <div className="user-card">

              <FaUserShield className="user-icon" />

              <div className="user-details">

                <h3>

                  {user.username}

                </h3>

                <span>

                  {user.role}

                </span>

              </div>

              <button

                className="header-logout"

                onClick={logout}

              >

                <FaSignOutAlt />

                <span>

                  Logout

                </span>

              </button>

            </div>

          </div>

        </div>

        {/* Statistics section starts in Part 2 */}
                {/* =====================================
                STATISTICS CARDS
        ===================================== */}

        <div className="cards-grid">

          <div className="dashboard-card donation">

            <FaDonate className="card-icon" />

            <div className="card-content">

              <span>एकूण देणगी</span>

              <h2>
                ₹{(dashboardData.totalDonation || 0).toLocaleString()}
              </h2>

            </div>

          </div>

          <div className="dashboard-card expense">

            <FaMoneyBillWave className="card-icon" />

            <div className="card-content">

              <span>एकूण खर्च</span>

              <h2>
                ₹{(dashboardData.totalExpense || 0).toLocaleString()}
              </h2>

            </div>

          </div>

          <div className="dashboard-card balance">

            <FaWallet className="card-icon" />

            <div className="card-content">

              <span>शिल्लक रक्कम</span>

              <h2>
                ₹{(dashboardData.balance || 0).toLocaleString()}
              </h2>

            </div>

          </div>

          <div className="dashboard-card donors">

            <FaUsers className="card-icon" />

            <div className="card-content">

              <span>देणगीदार</span>

              <h2>{dashboardData.totalDonors || 0}</h2>

            </div>

          </div>

          <div className="dashboard-card notice">

            <FaBullhorn className="card-icon" />

            <div className="card-content">

              <span>सक्रिय सूचना</span>

              <h2>{dashboardData.activeNotices || 0}</h2>

            </div>

          </div>

          <div className="dashboard-card clock">

            <div className="clock-icon">🕒</div>

            <div className="card-content">

              <span>सध्याची वेळ</span>

              <h2>{currentTime}</h2>

              <p>{currentDate}</p>

            </div>

          </div>

        </div>

        {/* =====================================
                ADMIN SERVICES
        ===================================== */}

        <div className="dashboard-section">

          <div className="section-header">

            <h2>⚙️ व्यवस्थापन सेवा</h2>

          </div>

          <div className="services-list">

            <button
              className="service-item"
              onClick={() => navigate("/admin/donations")}
            >
              <FaDonate />
              <span>देणगी व्यवस्थापन</span>
            </button>

            <button
              className="service-item"
              onClick={() => navigate("/admin/expenses")}
            >
              <FaMoneyBillWave />
              <span>खर्च व्यवस्थापन</span>
            </button>

            <button
              className="service-item"
              onClick={() => navigate("/admin/notices")}
            >
              <FaBullhorn />
              <span>सूचना व्यवस्थापन</span>
            </button>

            <button
              className="service-item"
              onClick={() => navigate("/admin/committee")}
            >
              <FaUsers />
              <span>कार्यकारिणी व्यवस्थापन</span>
            </button>

            <button
              className="service-item"
              onClick={() => navigate("/admin/aarti")}
            >
              🪔
              <span>आरती व्यवस्थापन</span>
            </button>

            <button
              className="service-item"
              onClick={() => navigate("/admin/users")}
            >
              <FaCog />
              <span>वापरकर्ता व्यवस्थापन</span>
            </button>

            <button
              className="service-item"
              onClick={() => navigate("/admin/meetings")}
            >
              <FaVideo />
              <span>मीटिंग व्यवस्थापन</span>
            </button>

            <button
              className="service-item"
              onClick={() => navigate("/admin/volunteers")}
            >
              <FaUserFriends />
              <span>स्वयंसेवक व्यवस्थापन</span>
            </button>

            <button
              className="service-item"
              onClick={() => navigate("/admin/sponsors")}
            >
              <FaHandshake />
              <span>प्रायोजक व्यवस्थापन</span>
            </button>

            <button
              className="service-item"
              onClick={() => navigate("/admin/complaints")}
            >
              <FaReceipt />
              <span>तक्रार व्यवस्थापन</span>
            </button>

            <button
              className="service-item"
              onClick={() => navigate("/admin/change-password")}
            >
              <FaKey />
              <span>पासवर्ड बदला</span>
            </button>

            {user.role === "Super Admin" && (

              <button
                className="service-item"
                onClick={() => navigate("/admin/users")}
              >
                <FaUserShield />
                <span>वापरकर्ता व्यवस्थापन</span>
              </button>

            )}

          </div>

        </div>

        {/* Table section starts in Part 3 */}
                {/* =====================================
                RECENT DONATIONS & EXPENSES
        ===================================== */}

        <div className="table-grid">

          {/* ================= DONATIONS ================= */}

          <div className="dashboard-section">

            <div className="section-header">

              <h2>💰 अलीकडील देणग्या</h2>

              <button
                className="view-btn"
                onClick={() => navigate("/admin/donations")}
              >
                सर्व पहा
              </button>

            </div>

            <table className="dashboard-table">

              <thead>

                <tr>

                  <th>ID</th>

                  <th>देणगीदार</th>

                  <th>रक्कम</th>

                  <th>दिनांक</th>

                  <th>पावती</th>

                </tr>

              </thead>

              <tbody>

                {(dashboardData.recentDonations || []).length === 0 ? (

                  <tr>

                    <td colSpan="5">

                      कोणतीही देणगी उपलब्ध नाही.

                    </td>

                  </tr>

                ) : (

                  dashboardData.recentDonations.map((item) => (

                    <tr key={item.id}>

                      <td>{item.id}</td>

                      <td>{item.donorName}</td>

                      <td>

                        ₹{Number(item.amount).toLocaleString()}

                      </td>

                      <td>{item.date}</td>

                      <td>

                        {item.receipt ? (

                          <a
                            href={`https://bmgum.onrender.com/uploads/receipts/${item.receipt}`}
                            target="_blank"
                            rel="noreferrer"
                          >

                            👁 View

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

          {/* ================= EXPENSES ================= */}

          <div className="dashboard-section">

            <div className="section-header">

              <h2>💸 अलीकडील खर्च</h2>

              <button
                className="view-btn"
                onClick={() => navigate("/admin/expenses")}
              >
                सर्व पहा
              </button>

            </div>

            <table className="dashboard-table">

              <thead>

                <tr>

                  <th>ID</th>

                  <th>खर्च</th>

                  <th>रक्कम</th>

                  <th>दिनांक</th>

                  <th>बिल</th>

                </tr>

              </thead>

              <tbody>

                {(dashboardData.recentExpenses || []).length === 0 ? (

                  <tr>

                    <td colSpan="5">

                      कोणताही खर्च उपलब्ध नाही.

                    </td>

                  </tr>

                ) : (

                  dashboardData.recentExpenses.map((item) => (

                    <tr key={item.id}>

                      <td>{item.id}</td>

                      <td>{item.title}</td>

                      <td>

                        ₹{Number(item.amount).toLocaleString()}

                      </td>

                      <td>{item.date}</td>

                      <td>

                        {item.bill ? (

                          <a
                            href={`https://bmgum.onrender.com/uploads/bills/${item.bill}`}
                            target="_blank"
                            rel="noreferrer"
                          >

                            👁 View

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

        </div>

        {/* Notice Board starts in Part 4 */}
                {/* =====================================
                NOTICE BOARD
        ===================================== */}

        <div className="dashboard-section">

          <div className="section-header">

            <h2>📢 सक्रिय सूचना फलक</h2>

          </div>

          {(dashboardData.notices || []).length === 0 ? (

            <div className="notice-empty">

              <h3>📭</h3>

              <p>

                सध्या कोणतीही सूचना उपलब्ध नाही.

              </p>

            </div>

          ) : (

            <div className="notice-grid">

              {(dashboardData.notices || []).map((notice) => (

                <div

                  key={notice.id}

                  className="notice-card"

                >

                  <div className="notice-top">

                    <span className="notice-badge">

                      📢 सूचना

                    </span>

                  </div>

                  <h3>

                    {notice.title}

                  </h3>

                  <p>

                    {notice.description}

                  </p>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* =====================================
                ADMIN PROFILE
        ===================================== */}

        <div className="dashboard-section">

          <div className="section-header">

            <h2>👤 प्रशासक माहिती</h2>

          </div>

          <div className="admin-profile">

            <div className="profile-item">

              <span>👤 Username</span>

              <strong>

                {user.username}

              </strong>

            </div>

            <div className="profile-item">

              <span>🛡 Role</span>

              <strong>

                {user.role}

              </strong>

            </div>

            <div className="profile-item">

              <span>🟢 Status</span>

              <strong
                style={{
                  color: "#16a34a"
                }}
              >

                Online

              </strong>

            </div>

            <div className="profile-item">

              <span>📅 Date</span>

              <strong>

                {currentDate}

              </strong>

            </div>

            <div className="profile-item">

              <span>🕒 Time</span>

              <strong>

                {currentTime}

              </strong>

            </div>

          </div>

        </div>

      </main>

    </div>

  );

}

export default Dashboard;