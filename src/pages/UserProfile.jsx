
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserCircle,
  FaPhone,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaUserTag,
  FaCalendarAlt,
  FaEdit,
  FaLock,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";

const API = "https://bmgum.onrender.com/api/users";

function UserProfile() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const savedUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (!savedUser) {

      navigate("/user-login");

      return;

    }

    axios
      .get(`${API}/${savedUser.id}`)
      .then((res) => {

        setUser(res.data);

        setLoading(false);

      })
      .catch(() => {

        setLoading(false);

      });

  }, [navigate]);

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    localStorage.removeItem("userLoggedIn");

    navigate("/");

  };

  if (loading) {

    return (

      <div className="profile-loading">

        प्रोफाइल लोड होत आहे...

      </div>

    );

  }

  if (!user) {

    return (

      <div className="profile-loading">

        वापरकर्ता सापडला नाही.

      </div>

    );

  }
  return (

    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-top">

          <FaUserCircle className="profile-avatar" />

          <h2>{user.full_name}</h2>

          <span className="role-badge">
            {user.role}
          </span>

        </div>

        <div className="profile-body">

          <div className="profile-item">

            <FaUserTag className="icon" />

            <div>

              <h4>वापरकर्तानाव</h4>

              <p>{user.username}</p>

            </div>

          </div>

          <div className="profile-item">

            <FaPhone className="icon" />

            <div>

              <h4>मोबाईल क्रमांक</h4>

              <p>{user.mobile}</p>

            </div>

          </div>

          <div className="profile-item">

            <FaBirthdayCake className="icon" />

            <div>

              <h4>वय</h4>

              <p>{user.age} वर्ष</p>

            </div>

          </div>

          <div className="profile-item">

            <FaMapMarkerAlt className="icon" />

            <div>

              <h4>पत्ता</h4>

              <p>{user.address}</p>

            </div>

          </div>

          <div className="profile-item">

            <FaCalendarAlt className="icon" />

            <div>

              <h4>नोंदणी दिनांक</h4>

              <p>

                {new Date(user.created_at).toLocaleDateString("en-IN")}

              </p>

            </div>

          </div>

        </div>

        <div className="profile-buttons">

          <button
            className="edit-btn"
            onClick={() =>
              navigate(`/edit-profile/${user.id}`)
            }
          >

            <FaEdit />

            प्रोफाइल संपादित करा

          </button>

          <button
            className="password-btn"
            onClick={() =>
              navigate(`/change-password/${user.id}`)
            }
          >

            <FaLock />

            संकेतशब्द बदला

          </button>

          <button
            className="logout-btn"
            onClick={logout}
          >

            <FaSignOutAlt />

            लॉगआउट

          </button>

        </div>

      </div>

    </div>

  );

}

export default UserProfile;

