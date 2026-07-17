import { NavLink, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import GanpatiLogo from "../assets/images/ganpati.png";

function Navbar() {

  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("adminLoggedIn");

  return (

    <nav className="navbar">

      {/* ================= LEFT LOGO ================= */}

      <div className="logo">

        <img
          src={GanpatiLogo}
          alt="Ganesh"
          className="logo-img"
        />

        <div className="logo-text">

          <div className="logo-heading">

            <h2>

              बाल मित्र गणेश उत्सव मंडळ

            </h2>

            {

              

               <span
  className="admin-lock"
  title="Admin Login"
  onClick={() => navigate("/login")}
>
  🔒
</span>
              

            }

          </div>

          <p className="location">

            खिरणीबागपुरा, अचलपूर

          </p>

        </div>

      </div>

      {/* ================= MENU ================= */}

      <ul className="nav-links">


          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >

            मुख्यपृष्ठ

          </NavLink>


          <NavLink
            to="/aarti"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >

            आरती

          </NavLink>

      
<NavLink
            to="/volunteer-registration"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >

             स्वयंसेवक बना

          </NavLink>
        

          <NavLink
            to="/volunteers"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >

             स्वयंसेवक

          </NavLink>

        

      </ul>

    </nav>

  );

}

export default Navbar;