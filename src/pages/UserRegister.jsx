import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUser,
  FaUserShield,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaLock,
  FaCheckCircle,
  FaTimesCircle,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";
import "../styles/UserRegister.css";

function UserRegister() {

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    age: "",
    mobile: "",
    address: "",
    role: "Volunteer"
  });

  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  /* ===============================
        Handle Input Change
  =============================== */

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

  };

  /* ===============================
       Username Availability
  =============================== */

  useEffect(() => {

    if (formData.username.trim().length < 4) {
      setUsernameAvailable(null);
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {

      try {

        setCheckingUsername(true);

        const res = await axios.get(
          `http://localhost:5000/api/users/check-username/${formData.username}`
        );

        setUsernameAvailable(res.data.available);

        if (!res.data.available) {
          setSuggestions(res.data.suggestions || []);
        } else {
          setSuggestions([]);
        }

      } catch (err) {

        console.log(err);

      } finally {

        setCheckingUsername(false);

      }

    }, 600);

    return () => clearTimeout(timer);

  }, [formData.username]);

  /* ===============================
          Validation
  =============================== */

  const validate = () => {

    let newErrors = {};

    if (!formData.fullName.trim())
      newErrors.fullName = "पूर्ण नाव आवश्यक आहे.";

    if (!formData.username.trim())
      newErrors.username = "वापरकर्ता नाव आवश्यक आहे.";

    if (formData.password.length < 8)
      newErrors.password = "पासवर्ड किमान 8 अक्षरांचा असावा.";

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "पासवर्ड जुळत नाही.";

    if (!/^[0-9]{10}$/.test(formData.mobile))
      newErrors.mobile = "वैध मोबाईल क्रमांक टाका.";

    if (!formData.address.trim())
      newErrors.address = "पत्ता आवश्यक आहे.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };

  /* ===============================
            Register User
  =============================== */

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validate()) return;

    try {

      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/users/register",
        formData
      );

      alert("वापरकर्ता यशस्वीरित्या नोंदणीकृत झाला.");

      setFormData({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        age: "",
        mobile: "",
        address: "",
        role: "Volunteer"
      });

      setUsernameAvailable(null);
      setSuggestions([]);

    } catch (err) {

      alert(
        err.response?.data?.message || "नोंदणी अयशस्वी."
      );

    } finally {

      setLoading(false);

    }

  };
    return (
    <div className="register-container">

      <div className="register-card">

        <div className="register-header">
          <h1>👤 वापरकर्ता नोंदणी</h1>
          <p>बाल मित्र गणेश उत्सव मंडळ</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">

          {/* Full Name */}

          <div className="form-group">
            <label>👤 पूर्ण नाव</label>

            <div className="input-box">
              <FaUser />
              <input
                type="text"
                name="fullName"
                placeholder="पूर्ण नाव"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            {errors.fullName && (
              <small className="error">{errors.fullName}</small>
            )}
          </div>

          {/* Username */}

          <div className="form-group">

            <label>🆔 वापरकर्ता नाव</label>

            <div className="input-box">

              <FaUserShield />

              <input
                type="text"
                name="username"
                placeholder="वापरकर्ता नाव"
                value={formData.username}
                onChange={handleChange}
              />

              {checkingUsername && (
                <span className="checking">
                  तपासत आहे...
                </span>
              )}

              {usernameAvailable === true && (
                <FaCheckCircle className="success-icon" />
              )}

              {usernameAvailable === false && (
                <FaTimesCircle className="error-icon" />
              )}

            </div>

            {usernameAvailable === false && (

              <div className="suggestions">

                <p>हे नाव उपलब्ध नाही.</p>

                <strong>सूचना :</strong>

                {suggestions.map((item, index) => (

                  <button
                    type="button"
                    key={index}
                    className="suggestion-btn"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        username: item
                      })
                    }
                  >
                    {item}
                  </button>

                ))}

              </div>

            )}

          </div>

          {/* Password */}

          <div className="form-group">

            <label>🔒 पासवर्ड</label>

            <div className="input-box">

              <FaLock />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="पासवर्ड"
                value={formData.password}
                onChange={handleChange}
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>

            {errors.password && (
              <small className="error">{errors.password}</small>
            )}

          </div>

          {/* Confirm Password */}

          <div className="form-group">

            <label>🔐 पासवर्डची पुष्टी</label>

            <div className="input-box">

              <FaLock />

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="पासवर्ड पुन्हा टाका"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

            {errors.confirmPassword && (
              <small className="error">
                {errors.confirmPassword}
              </small>
            )}

          </div>

          {/* Age */}

          <div className="form-group">

            <label>🎂 वय</label>

            <input
              type="number"
              name="age"
              placeholder="वय"
              value={formData.age}
              onChange={handleChange}
            />

          </div>

          {/* Mobile */}

          <div className="form-group">

            <label>📱 मोबाईल क्रमांक</label>

            <div className="input-box">

              <FaPhoneAlt />

              <input
                type="text"
                name="mobile"
                placeholder="मोबाईल क्रमांक"
                value={formData.mobile}
                onChange={handleChange}
              />

            </div>

            {errors.mobile && (
              <small className="error">
                {errors.mobile}
              </small>
            )}

          </div>

          {/* Address */}

          <div className="form-group">

            <label>🏠 पत्ता</label>

            <div className="input-box">

              <FaMapMarkerAlt />

              <textarea
                rows="3"
                name="address"
                placeholder="संपूर्ण पत्ता"
                value={formData.address}
                onChange={handleChange}
              />

            </div>

            {errors.address && (
              <small className="error">
                {errors.address}
              </small>
            )}

          </div>

          {/* Role */}

          <div className="form-group">

            <label>👨‍💼 भूमिका</label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="Admin">प्रशासक</option>
              <option value="Volunteer">स्वयंसेवक</option>
              <option value="Sponsor">प्रायोजक</option>
              <option value="Member">सदस्य</option>
            </select>

          </div>

          <button
            type="submit"
            className="register-btn"
            disabled={loading}
          >
            {loading
              ? "नोंदणी सुरू आहे..."
              : "✅ वापरकर्ता नोंदणी करा"}
          </button>

        </form>

      </div>

    </div>
  );

}

export default UserRegister;