import { useState } from "react";
import axios from "axios";

import {
  FaEye,
  FaEyeSlash,
  FaKey,
  FaSave,
} from "react-icons/fa";

import "../styles/admin/changepassword.css";

function ChangePassword() {

  const user = JSON.parse(localStorage.getItem("adminUser"));

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {

      alert("नवीन पासवर्ड आणि पुष्टीकरण पासवर्ड जुळत नाही.");

      return;

    }

    try {

      const res = await axios.put(

        "https://bmgum.onrender.com/api/auth/change-password",

        {

          username: user.username,

          currentPassword: formData.currentPassword,

          newPassword: formData.newPassword,

        }

      );

      alert(res.data.message);

      setFormData({

        currentPassword: "",

        newPassword: "",

        confirmPassword: "",

      });

    }

    catch (err) {

      alert(

        err.response?.data?.message ||

        "पासवर्ड बदलण्यात अयशस्वी."

      );

    }

  };

  return (

    <div className="password-page">

      <div className="password-card">

        <h1>

          <FaKey />

          पासवर्ड बदला

        </h1>

        <form onSubmit={handleSubmit}>

          {/* Current Password */}

          <div className="form-group">

            <label>सध्याचा पासवर्ड</label>

            <div className="password-input">

              <input

                type={showOld ? "text" : "password"}

                name="currentPassword"

                value={formData.currentPassword}

                onChange={handleChange}

                placeholder="सध्याचा पासवर्ड टाका"

                required

              />

              <span onClick={() => setShowOld(!showOld)}>

                {

                  showOld

                    ? <FaEyeSlash />

                    : <FaEye />

                }

              </span>

            </div>

          </div>

          {/* New Password */}

          <div className="form-group">

            <label>नवीन पासवर्ड</label>

            <div className="password-input">

              <input

                type={showNew ? "text" : "password"}

                name="newPassword"

                value={formData.newPassword}

                onChange={handleChange}

                placeholder="नवीन पासवर्ड टाका"

                required

              />

              <span onClick={() => setShowNew(!showNew)}>

                {

                  showNew

                    ? <FaEyeSlash />

                    : <FaEye />

                }

              </span>

            </div>

          </div>

          {/* Confirm Password */}

          <div className="form-group">

            <label>नवीन पासवर्ड पुन्हा टाका</label>

            <div className="password-input">

              <input

                type={showConfirm ? "text" : "password"}

                name="confirmPassword"

                value={formData.confirmPassword}

                onChange={handleChange}

                placeholder="नवीन पासवर्ड पुन्हा टाका"

                required

              />

              <span onClick={() => setShowConfirm(!showConfirm)}>

                {

                  showConfirm

                    ? <FaEyeSlash />

                    : <FaEye />

                }

              </span>

            </div>

          </div>

          <button

            type="submit"

            className="save-password-btn"

          >

            <FaSave />

            पासवर्ड बदला

          </button>

        </form>

      </div>

    </div>

  );

}

export default ChangePassword;