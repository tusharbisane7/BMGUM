import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import "../styles/navbar.css";
import GanpatiLogo from "../assets/images/ganpati.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

  // Close sidebar whenever route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Navbar shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <>
      {/* ================= NAVBAR ================= */}

      <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>

        <div className="navbar-container">

          {/* Logo */}

          <NavLink to="/" className="logo-section">

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
              स्वयंसेवक बना
            </NavLink>

            <NavLink to="/volunteers">
              स्वयंसेवक
            </NavLink>

            <NavLink to="/complaint">
              तक्रार
            </NavLink>

          </nav>

          {/* Hamburger */}

          <button
            className={`hamburger ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >

            <span></span>

            <span></span>

            <span></span>

          </button>

        </div>

      </header>

      {/* ================= Overlay ================= */}

      <div
        className={`sidebar-overlay ${menuOpen ? "show" : ""}`}
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* ================= Sidebar ================= */}

      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>

        <div className="sidebar-top">

          <img
            src={GanpatiLogo}
            alt=""
            className="sidebar-logo"
          />

          <button
            className="sidebar-close"
            onClick={() => setMenuOpen(false)}
          >

            ✕

          </button>

        </div>

        <div className="sidebar-title">

          <h2>बाल मित्र गणेश उत्सव मंडळ</h2>

          <p>खिरणीबागपुरा, अचलपूर</p>

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

        <NavLink to="/login">
          🔐 Admin Login
        </NavLink>

        <div className="sidebar-footer">

          <h4>बाल मित्र गणेश उत्सव मंडळ</h4>

          <p>© 2026 All Rights Reserved</p>

        </div>

      </aside>
    </>
  );
}

export default Navbar;