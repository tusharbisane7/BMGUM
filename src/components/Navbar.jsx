import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "../styles/navbar.css";
import GanpatiLogo from "../assets/images/ganpati.png";

function Navbar() {

    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {

        setMenuOpen(!menuOpen);

    };

    const closeMenu = () => {

        setMenuOpen(false);

    };

    useEffect(() => {

        const handleKey = (e) => {

            if (e.key === "Escape") {

                closeMenu();

            }

        };

        window.addEventListener("keydown", handleKey);

        return () => window.removeEventListener("keydown", handleKey);

    }, []);

    return (

        <>

            {/* NAVBAR */}

            <nav
                className="navbar"
                style={{
                    display:
                        menuOpen && window.innerWidth <= 900
                            ? "none"
                            : "flex"
                }}
            >

                <div className="navbar-left">

                    <button
                        className={`hamburger ${menuOpen ? "active" : ""}`}
                        onClick={toggleMenu}
                    >

                        <span></span>
                        <span></span>
                        <span></span>

                    </button>

                    <img
                        src={GanpatiLogo}
                        alt="Ganesh"
                        className="logo-img"
                    />

                    <div className="logo-text">

                        <h2>

                            बाल मित्र गणेश उत्सव मंडळ

                        </h2>

                        <p>

                            खिरणीबागपुरा, अचलपूर

                        </p>

                    </div>

                </div>

                <div className="desktop-menu">

                    <NavLink to="/">मुख्यपृष्ठ</NavLink>

                    <NavLink to="/aarti">आरती</NavLink>

                    <NavLink to="/volunteer-registration">
                        स्वयंसेवक बना
                    </NavLink>

                    <NavLink to="/volunteers">
                        स्वयंसेवक
                    </NavLink>

                    <NavLink to="/complaint">
                        तक्रार
                    </NavLink>

                </div>

                <button
                    className="login-btn"
                    onClick={() => navigate("/login")}
                >

                    Login

                </button>

            </nav>

            {/* Overlay */}

            <div
                className={`sidebar-overlay ${menuOpen ? "show" : ""}`}
                onClick={closeMenu}
            ></div>

            {/* Sidebar */}

            <aside
                className={`sidebar ${menuOpen ? "open" : ""}`}
            >

                <div className="sidebar-header">

                    <button
                        className="sidebar-close"
                        onClick={closeMenu}
                    >

                        ✕

                    </button>

                    <h3>

                        Menu

                    </h3>

                </div>

                <NavLink
                    to="/"
                    onClick={closeMenu}
                >

                    🏠 मुख्यपृष्ठ

                </NavLink>

                <NavLink
                    to="/aarti"
                    onClick={closeMenu}
                >

                    🪔 आरती

                </NavLink>

                <NavLink
                    to="/volunteer-registration"
                    onClick={closeMenu}
                >

                    🙋 स्वयंसेवक बना

                </NavLink>

                <NavLink
                    to="/volunteers"
                    onClick={closeMenu}
                >

                    👥 स्वयंसेवक

                </NavLink>

                <NavLink
                    to="/complaint"
                    onClick={closeMenu}
                >

                    📝 तक्रार

                </NavLink>

                <div className="sidebar-footer">

                    © 2026

                    <br />

                    बाल मित्र गणेश उत्सव मंडळ

                </div>

            </aside>

        </>

    );

}

export default Navbar;