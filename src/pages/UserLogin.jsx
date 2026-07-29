import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/auth";
import "../styles/userLogin.css";

function UserLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/user-login", {
        username: username.trim().toLowerCase(),
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("userLoggedIn", "true");

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "❌ चुकीचे वापरकर्तानाव किंवा संकेतशब्द."
      );
    } finally {
      setLoading(false);
    }
  };
    return (
    <div className="login-page">

      {/* Background Animation */}
      <div className="bg-circle circle1"></div>
      <div className="bg-circle circle2"></div>
      <div className="bg-circle circle3"></div>

      <div className="login-card">

        <div className="login-header">

          <div className="ganesh-icon">
            🙏
          </div>

          <h1>बाल मित्र गणेश उत्सव मंडळ</h1>

          <h2>वापरकर्ता लॉगिन</h2>

          <p>
            आपल्या खात्यात सुरक्षितपणे लॉगिन करा.
          </p>

        </div>

        <form onSubmit={handleLogin}>

          <div className="input-group">

            <label>वापरकर्तानाव</label>

            <input
              type="text"
              placeholder="वापरकर्तानाव प्रविष्ट करा"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

          </div>

          <div className="input-group">

            <label>संकेतशब्द</label>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="संकेतशब्द प्रविष्ट करा"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          <label className="show-pass">

            <input
              type="checkbox"
              checked={showPassword}
              onChange={() =>
                setShowPassword(!showPassword)
              }
            />

            संकेतशब्द दाखवा

          </label>

          {error && (

            <div className="error-box">

              {error}

            </div>

          )}

          <button
            className="login-btn"
            type="submit"
            disabled={loading}
          >

            {loading
              ? "लॉगिन सुरू आहे..."
              : "🔐 लॉगिन करा"}

          </button>

        </form>

       <div className="divider">
                  <span>किंवा</span>
        </div>

        <div className="portal-buttons">

          <Link
            to="/register-user"
            className="portal-btn user-btn"
          >
            📝 नवीन वापरकर्ता? नोंदणी करा
          </Link>

          <Link
            to="/login"
            className="portal-btn admin-btn"
          >
            🛡️ प्रशासक लॉगिन
          </Link>

          <Link
            to="/"
            className="portal-btn home-btn"
          >
            🏠 मुख्यपृष्ठ
          </Link>

        </div>

        <div className="footer-text">

          <p>
            लॉगिन केल्यानंतर आपण आपले प्रोफाइल,
            देणगी इतिहास, पावत्या व इतर सुविधांचा
            लाभ घेऊ शकता.
          </p>

          <br />

          © {new Date().getFullYear()} <br />
          <strong>बाल मित्र गणेश उत्सव मंडळ</strong>

        </div>

      </div>

    </div>
  );
}

export default UserLogin;