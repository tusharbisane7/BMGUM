import { useState, useEffect } from "react";
import {
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import "../styles/navbar.css";
import GanpatiLogo from "../assets/images/ganpati.png";

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Load logged in user

  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {

      try {

        setUser(JSON.parse(storedUser));

      } catch {

        localStorage.removeItem("user");

      }

    }

  }, []);

  // Close sidebar on route change

  useEffect(() => {

    setMenuOpen(false);

    setShowProfileMenu(false);

  }, [location]);

  // Navbar scroll shadow

  useEffect(() => {

    const handleScroll = () => {

      setScrolled(window.scrollY > 20);

    };

    const handleKey = (e) => {

      if (e.key === "Escape") {

        setMenuOpen(false);

        setShowProfileMenu(false);

      }

    };

    window.addEventListener("scroll", handleScroll);

    window.addEventListener("keydown", handleKey);

    return () => {

      window.removeEventListener("scroll", handleScroll);

      window.removeEventListener("keydown", handleKey);

    };

  }, []);

  // Logout

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    localStorage.removeItem("userLoggedIn");

    navigate("/");

    window.location.reload();

  };

  return (

    <>

      {/* ================= NAVBAR ================= */}

      <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>

        <div className="navbar-container">

          {/* Logo */}

          <NavLink
            to="/"
            className="logo-section"
          >

            <img
              src={GanpatiLogo}
              alt="Ganpati"
              className="logo-img"
            />

            <div className="logo-text">

              <h2>बाल मित्र गणेश उत्सव मंडळ</h2>

              <p>खिरणीबागपुरा, अचलपूर</p>

            </div>

          </NavLink>

          {/* Desktop Menu */}

          <nav className="desktop-menu">
                        <NavLink to="/">
              मुख्यपृष्ठ
            </NavLink>

            <NavLink to="/aarti">
              आरती
            </NavLink>

            <NavLink
              to="/online-donation"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              💳 ऑनलाइन देणगी
            </NavLink>

            <NavLink to="/volunteer-registration">
              🙋 स्वयंसेवक बना
            </NavLink>

            <NavLink to="/volunteers">
              👥 स्वयंसेवक
            </NavLink>

            <NavLink to="/complaint">
              📝 तक्रार
            </NavLink>

            {/* ================= USER SECTION ================= */}

            {!user ? (

              <>

                <NavLink to="/user-login">
                  👤 वापरकर्ता लॉगिन
                </NavLink>

                <NavLink to="/login">
                  🔐 Admin Login
                </NavLink>

              </>

            ) : (

              <div className="profile-menu">

                <button
                  className="profile-btn"
                  onClick={() =>
                    setShowProfileMenu(!showProfileMenu)
                  }
                >

                  <span className="profile-avatar">

                    👤

                  </span>

                  <span className="profile-name">

                    {user.full_name}

                  </span>

                  <span className="profile-arrow">

                    ▼

                  </span>

                </button>

                {showProfileMenu && (

                  <div className="profile-dropdown">

                    <NavLink
                      to="/profile"
                      onClick={() =>
                        setShowProfileMenu(false)
                      }
                    >

                      👤 माझे प्रोफाइल

                    </NavLink>

                    <button
                      onClick={logout}
                    >

                      🚪 लॉगआउट

                    </button>

                  </div>

                )}

              </div>

            )}

          </nav>

          {/* ================= HAMBURGER ================= */}

          <button
            className={`hamburger ${menuOpen ? "active" : ""}`}
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
          >

            <span></span>

            <span></span>

            <span></span>

          </button>

        </div>

      </header>

      {/* ================= OVERLAY ================= */}

      <div
        className={`sidebar-overlay ${
          menuOpen ? "show" : ""
        }`}
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`sidebar ${
          menuOpen ? "open" : ""
        }`}
      >

        <div className="sidebar-top">

          <img
            src={GanpatiLogo}
            alt=""
            className="sidebar-logo"
          />

          <button
            className="sidebar-close"
            onClick={() =>
              setMenuOpen(false)
            }
          >

            ✕

          </button>

        </div>

        <div className="sidebar-title">

          <h2>

            बाल मित्र गणेश उत्सव मंडळ

          </h2>

          <p>

            खिरणीबागपुरा, अचलपूर

          </p>

        </div>
                <NavLink to="/">
          🏠 मुख्यपृष्ठ
        </NavLink>

        <NavLink to="/aarti">
          🪔 आरती
        </NavLink>

        <NavLink to="/online-donation">
          💳 ऑनलाइन देणगी
        </NavLink>

        <NavLink to="/volunteer-registration">
          🙋 स्वयंसेवक बना
        </NavLink>

        <NavLink to="/volunteers">
          👥 स्वयंसेवक
        </NavLink>

        <NavLink to="/complaint">
          📝 तक्रार
        </NavLink>

        {/* ================= USER SECTION ================= */}

        {!user ? (

          <>

            <NavLink to="/user-login">
              👤 वापरकर्ता लॉगिन
            </NavLink>

            <NavLink to="/login">
              🔐 Admin Login
            </NavLink>

          </>

        ) : (

          <>

            <div className="sidebar-user-card">

              <div className="sidebar-user-avatar">

                👤

              </div>

              <div className="sidebar-user-info">

                <h3>

                  {user.full_name}

                </h3>

                <p>

                  @{user.username}

                </p>

              </div>

            </div>

            <NavLink
              to="/profile"
              onClick={() => setMenuOpen(false)}
            >

              👤 माझे प्रोफाइल

            </NavLink>

            <button
              className="sidebar-logout"
              onClick={logout}
            >

              🚪 लॉगआउट

            </button>

          </>

        )}

        <div className="sidebar-footer">

          <h4>

            बाल मित्र गणेश उत्सव मंडळ

          </h4>

          <p>

            © 2026 All Rights Reserved

          </p>

        </div>

      </aside>

    </>

  );

}

export default Navbar;