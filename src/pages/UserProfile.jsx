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
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";

const API = "https://bmgum.onrender.com/api/users";

function UserProfile() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({

    full_name: "",

    mobile: "",

    age: "",

    address: "",

  });

  useEffect(() => {

    const savedUser = JSON.parse(

      localStorage.getItem("user")

    );

    if (!savedUser) {

      navigate("/user-login");

      return;

    }

    const loadProfile = async () => {

      try {

        const res = await axios.get(

          `${API}/${savedUser.id}`

        );

        setUser(res.data);

        setFormData({

          full_name: res.data.full_name || "",

          mobile: res.data.mobile || "",

          age: res.data.age || "",

          address: res.data.address || "",

        });

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    };

    loadProfile();

  }, [navigate]);
  const handleChange = (e) => {

  const { name, value } = e.target;

  setFormData((prev) => ({

    ...prev,

    [name]: value,

  }));

};

const saveProfile = async () => {

  try {

    const response = await axios.put(

      `${API}/${user.id}`,

      {

        full_name: formData.full_name,

        mobile: formData.mobile,

        age: formData.age,

        address: formData.address,

      }

    );

    if (response.data.success) {

      const updatedUser = response.data.user;

      setUser(updatedUser);

      localStorage.setItem(

        "user",

        JSON.stringify(updatedUser)

      );

      setFormData({

        full_name: updatedUser.full_name,

        mobile: updatedUser.mobile,

        age: updatedUser.age,

        address: updatedUser.address,

      });

      setEditMode(false);

      alert("प्रोफाइल यशस्वीरित्या अपडेट झाली.");

    }

  }

  catch (err) {

    console.error(err);

    alert(

      err.response?.data?.message ||

      "प्रोफाइल अपडेट करता आली नाही."

    );

  }

};

const cancelEdit = () => {

  if (!user) return;

  setFormData({

    full_name: user.full_name || "",

    mobile: user.mobile || "",

    age: user.age || "",

    address: user.address || "",

  });

  setEditMode(false);

};

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

        <div className="profile-header-details">

          {

            editMode ? (

              <input

                type="text"

                name="full_name"

                value={formData.full_name}

                onChange={handleChange}

                className="profile-input profile-name-input"

                placeholder="पूर्ण नाव"

              />

            ) : (

              <h2>{user.full_name}</h2>

            )

          }

          <span className="role-badge">

            {user.role}

          </span>

        </div>

      </div>

      <div className="profile-body">

  {/* Username */}

  <div className="profile-item">

    <FaUserTag className="icon" />

    <div className="profile-content">

      <h4>वापरकर्तानाव</h4>

      <p>{user.username}</p>

    </div>

  </div>

  {/* Mobile */}

  <div className="profile-item">

    <FaPhone className="icon" />

    <div className="profile-content">

      <h4>मोबाईल क्रमांक</h4>

      {

        editMode ? (

          <input

            type="text"

            name="mobile"

            value={formData.mobile}

            onChange={handleChange}

            className="profile-input"

            placeholder="मोबाईल क्रमांक"

          />

        ) : (

          <p>{user.mobile}</p>

        )

      }

    </div>

  </div>

  {/* Age */}

  <div className="profile-item">

    <FaBirthdayCake className="icon" />

    <div className="profile-content">

      <h4>वय</h4>

      {

        editMode ? (

          <input

            type="number"

            name="age"

            value={formData.age}

            onChange={handleChange}

            className="profile-input"

            placeholder="वय"

          />

        ) : (

          <p>{user.age} वर्ष</p>

        )

      }

    </div>

  </div>

  {/* Address */}

  <div className="profile-item">

    <FaMapMarkerAlt className="icon" />

    <div className="profile-content">

      <h4>पत्ता</h4>

      {

        editMode ? (

          <textarea

            name="address"

            value={formData.address}

            onChange={handleChange}

            rows="3"

            className="profile-input"

            placeholder="पत्ता"

          />

        ) : (

          <p>{user.address}</p>

        )

      }

    </div>

  </div>

  {/* Registration Date */}

  <div className="profile-item">

    <FaCalendarAlt className="icon" />

    <div className="profile-content">

      <h4>नोंदणी दिनांक</h4>

      <p>

        {

          user.created_at

            ? new Date(user.created_at).toLocaleDateString(

                "en-IN",

                {

                  day: "2-digit",

                  month: "long",

                  year: "numeric",

                }

              )

            : "-"

        }

      </p>

    </div>

  </div>

</div>
<div className="profile-buttons">

  {

    !editMode ? (

      <button
        className="edit-btn"
        onClick={() => setEditMode(true)}
      >

        <FaEdit />

        प्रोफाइल संपादित करा

      </button>

    ) : (

      <>

        <button
          className="edit-btn"
          onClick={saveProfile}
        >

          <FaSave />

          बदल जतन करा

        </button>

        <button
          className="cancel-btn"
          onClick={cancelEdit}
        >

          <FaTimes />

          रद्द करा

        </button>

      </>

    )

  }

 

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