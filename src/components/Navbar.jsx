import {

    useState,

    useEffect,

    useRef,

} from "react";

import {

    NavLink,

    useLocation,

    useNavigate,

} from "react-router-dom";

import LoginPopup from "./LoginPopup";

import "../styles/navbar.css";

import GanpatiLogo from "../assets/images/ganpati.png";

import DefaultProfile from "../assets/images/profile.jpg";

function Navbar() {

    const navigate = useNavigate();

    const location = useLocation();

    const dropdownRef = useRef(null);

    /*==================================
            STATES
    ==================================*/

    const [menuOpen, setMenuOpen] = useState(false);

    const [scrolled, setScrolled] = useState(false);

    const [user, setUser] = useState(null);

    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const [showLoginPopup, setShowLoginPopup] = useState(false);

    /*==================================
            LOAD USER
    ==================================*/

    useEffect(() => {

        const storedUser = localStorage.getItem("user");

        if (storedUser) {

            try {

                setUser(JSON.parse(storedUser));

            }

            catch {

                localStorage.removeItem("user");

            }

        }

    }, []);

    /*==================================
        CLOSE MENUS ON ROUTE CHANGE
    ==================================*/

    useEffect(() => {

        setMenuOpen(false);

        setShowProfileMenu(false);

    }, [location]);

    /*==================================
            NAVBAR SCROLL
    ==================================*/

    useEffect(() => {

        const handleScroll = () => {

            setScrolled(window.scrollY > 20);

        };

        window.addEventListener(

            "scroll",

            handleScroll

        );

        return () =>

            window.removeEventListener(

                "scroll",

                handleScroll

            );

    }, []);

    /*==================================
        CLOSE PROFILE DROPDOWN
    ==================================*/

    useEffect(() => {

        const handleOutsideClick = (e) => {

            if (

                dropdownRef.current &&

                !dropdownRef.current.contains(e.target)

            ) {

                setShowProfileMenu(false);

            }

        };

        document.addEventListener(

            "mousedown",

            handleOutsideClick

        );

        return () =>

            document.removeEventListener(

                "mousedown",

                handleOutsideClick

            );

    }, []);

    /*==================================
            LOGOUT
    ==================================*/

    const logout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        localStorage.removeItem("userLoggedIn");

        setUser(null);

        setShowProfileMenu(false);

        navigate("/");

    };

    /*==================================
        ONLINE DONATION
    ==================================*/

    const handleOnlineDonation = (e) => {

        e.preventDefault();

        if (!user) {

            setShowLoginPopup(true);

            return;

        }

        navigate("/online-donation");

    };

    /*==================================
            PROFILE IMAGE
    ==================================*/

    const profileImage =

        user?.profile_image ||

        DefaultProfile;
            return (

        <>

            {/* ================= NAVBAR ================= */}

            <header

                className={`navbar ${

                    scrolled

                        ? "navbar-scrolled"

                        : ""

                }`}

            >

                <div className="navbar-container">

                    {/*================ LOGO ================*/}

                    <NavLink

                        to="/"

                        className="logo-section"

                    >

                        {user ? (

                            <img

                                src={profileImage}

                                alt="Profile"

                                className="navbar-profile-logo"

                            />

                        ) : (

                            <img

                                src={GanpatiLogo}

                                alt="Ganpati"

                                className="logo-img"

                            />

                        )}

                        <div className="logo-text">

                            {user ? (

                                <>

                                    <span className="welcome-back">

                                        👋 स्वागत आहे

                                    </span>

                                    <h2>

                                        {user.full_name}

                                    </h2>

                                    <p>

                                        @{user.username}

                                    </p>

                                </>

                            ) : (

                                <>

                                    <h2>

                                        बाल मित्र गणेश उत्सव मंडळ

                                    </h2>

                                    <p>

                                        खिरणीबागपुरा, अचलपूर

                                    </p>

                                </>

                            )}

                        </div>

                    </NavLink>

                    {/*================ DESKTOP MENU ================*/}

                    <nav className="desktop-menu">

                        <NavLink to="/">

                            मुख्यपृष्ठ

                        </NavLink>

                        <NavLink to="/aarti">

                            🪔 आरती

                        </NavLink>

                        {/* Protected Donation */}

                        <button

                            className="nav-link-btn"

                            onClick={handleOnlineDonation}

                        >

                            💳 ऑनलाइन देणगी

                        </button>

                        <NavLink

                            to="/volunteer-registration"

                        >

                            🙋 स्वयंसेवक बना

                        </NavLink>

                        <NavLink

                            to="/volunteers"

                        >

                            👥 स्वयंसेवक

                        </NavLink>

                        <NavLink

                            to="/complaint"

                        >

                            📝 तक्रार

                        </NavLink>

                        {!user ? (

                            <>

                                <NavLink

                                    to="/user-login"

                                >

                                    👤 वापरकर्ता लॉगिन

                                </NavLink>

                                <NavLink

                                    to="/login"

                                >

                                    🔐 Admin Login

                                </NavLink>

                            </>

                        ) : (

                            <div

                                className="profile-menu"

                                ref={dropdownRef}

                            >

                                <button

                                    className="profile-btn"

                                    onClick={() =>

                                        setShowProfileMenu(

                                            !showProfileMenu

                                        )

                                    }

                                >

                                    <img

                                        src={profileImage}

                                        alt="Profile"

                                        className="profile-avatar-img"

                                    />

                                    <div className="profile-text">

                                        <span className="welcome-text">

                                            👋 स्वागत आहे

                                        </span>

                                        <span className="profile-name">

                                            {user.full_name}

                                        </span>

                                    </div>

                                    <span

                                        className={`profile-arrow ${

                                            showProfileMenu

                                                ? "rotate"

                                                : ""

                                        }`}

                                    >

                                        ▼

                                    </span>

                                </button>
                                                                {showProfileMenu && (

                                    <div className="profile-dropdown">

                                        <div className="dropdown-header">

                                            <img

                                                src={profileImage}

                                                alt="Profile"

                                                className="dropdown-avatar"

                                            />

                                            <div className="dropdown-user-info">

                                                <h4>

                                                    {user.full_name}

                                                </h4>

                                                <p>

                                                    @{user.username}

                                                </p>

                                                <span className="role-chip">

                                                    {user.role}

                                                </span>

                                            </div>

                                        </div>

                                        <NavLink

                                            to="/profile"

                                            className="dropdown-link"

                                            onClick={() =>

                                                setShowProfileMenu(false)

                                            }

                                        >

                                            👤 माझे प्रोफाइल

                                        </NavLink>

<NavLink
    to="/my-donations"
    className="dropdown-link"
    onClick={() => setShowProfileMenu(false)}
>
    💰 माझ्या ऑनलाइन देणग्या
</NavLink>
                                        <button

                                            className="dropdown-logout"

                                            onClick={logout}

                                        >

                                            🚪 लॉगआउट

                                        </button>

                                    </div>

                                )}

                            </div>

                        )}

                    </nav>

                    {/*================ HAMBURGER =================*/}

                    <button

                        className={`hamburger ${

                            menuOpen ? "active" : ""

                        }`}

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

            {/*================ OVERLAY =================*/}

            <div

                className={`sidebar-overlay ${

                    menuOpen ? "show" : ""

                }`}

                onClick={() =>

                    setMenuOpen(false)

                }

            />
                  {/*================ SIDEBAR =================*/}

      <aside
        className={`sidebar ${menuOpen ? "open" : ""}`}
      >
        {/*================ SIDEBAR HEADER =================*/}

        <div className="sidebar-top">
          <button
            className="sidebar-close"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>
        </div>

        {/*================ USER HEADER =================*/}

        {user ? (
          <div className="mobile-user-header">
            <div className="mobile-profile-wrapper">
              <img
                src={profileImage}
                alt="Profile"
                className="mobile-profile-image"
              />

              <span className="online-indicator"></span>
            </div>

            <span className="mobile-welcome">
              👋 स्वागत आहे
            </span>

            <h2>{user.full_name}</h2>

            <p>@{user.username}</p>

            <span className="mobile-role">
              {user.role}
            </span>
          </div>
        ) : (
          <div className="mobile-logo-header">

           

            <h3>
             
            </h3>

            <p>
             Ganpati Bappa Morya!
            </p>

          </div>
        )}

        {/*================ MENU =================*/}

        <NavLink
          to="/"
          onClick={() => setMenuOpen(false)}
        >
          🏠 मुख्यपृष्ठ
        </NavLink>

        <NavLink
          to="/aarti"
          onClick={() => setMenuOpen(false)}
        >
          🪔 आरती
        </NavLink>

        <button
          className="sidebar-nav-btn"
          onClick={(e) => {

            setMenuOpen(false);

            handleOnlineDonation(e);

          }}
        >
          💳 ऑनलाइन देणगी
        </button>

        <NavLink
          to="/volunteer-registration"
          onClick={() => setMenuOpen(false)}
        >
          🙋 स्वयंसेवक बना
        </NavLink>

        <NavLink
          to="/volunteers"
          onClick={() => setMenuOpen(false)}
        >
          👥 स्वयंसेवक
        </NavLink>

        <NavLink
          to="/complaint"
          onClick={() => setMenuOpen(false)}
        >
          📝 तक्रार
        </NavLink>

        {!user ? (

          <>

            <NavLink
              to="/user-login"
              onClick={() => setMenuOpen(false)}
            >
              👤 वापरकर्ता लॉगिन
            </NavLink>

           

            <NavLink
              to="/login"
              onClick={() => setMenuOpen(false)}
            >
              🔐 Admin Login
            </NavLink>

          </>

        ) : (

          <>

            <NavLink
              to="/profile"
              onClick={() => {

                setMenuOpen(false);

                setShowProfileMenu(false);

              }}
            >
              👤 माझे प्रोफाइल
            </NavLink>

<NavLink
    to="/my-donations"
    onClick={() => setMenuOpen(false)}
>
    💰 माझ्या ऑनलाइन देणग्या
</NavLink>
            <button
              className="sidebar-logout"
              onClick={() => {

                setMenuOpen(false);

                logout();

              }}
            >
              🚪 लॉगआउट
            </button>

          </>

        )}

        {/*================ FOOTER =================*/}

        <div className="sidebar-footer">

          <img
            src={GanpatiLogo}
            alt="Ganpati"
            className="footer-logo"
          />

          <h4>
            बाल मित्र गणेश उत्सव मंडळ
          </h4>

          <p>
            खिरणीबागपुरा, अचलपूर
          </p>

          <small>

            © {new Date().getFullYear()} All Rights Reserved

          </small>

        </div>

      </aside>

      {/*================ LOGIN POPUP =================*/}

      <LoginPopup

        isOpen={showLoginPopup}

        onClose={() =>

          setShowLoginPopup(false)

        }

        onLogin={() => {

          setShowLoginPopup(false);

          navigate("/user-login");

        }}

        onRegister={() => {

          setShowLoginPopup(false);

          navigate("/user-register");

        }}

      />

    </>

  );

}

export default Navbar;