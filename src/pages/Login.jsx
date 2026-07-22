import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/auth";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await API.post("/auth/login", {
        username: username.trim().toLowerCase(),
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("adminLoggedIn", "true");
      localStorage.setItem(
        "adminUser",
        JSON.stringify(response.data.user)
      );

      navigate("/admin/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "❌ लॉगिन अयशस्वी. कृपया पुन्हा प्रयत्न करा."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* Animated Background */}
      <div className="bg-circle circle1"></div>
      <div className="bg-circle circle2"></div>
      <div className="bg-circle circle3"></div>

      <div className="login-card">

        <div className="login-header">

          <div className="ganesh-icon">
            🕉️
          </div>

          <h1>बाल मित्र गणेश उत्सव मंडळ</h1>

          <h2>प्रशासन पोर्टल</h2>

          <p>
            सुरक्षित लॉगिन करून प्रशासन पॅनेलमध्ये प्रवेश करा.
          </p>

        </div>

        <form onSubmit={handleLogin}>

          <div className="input-group">

            <label>वापरकर्तानाव</label>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

          </div>

          <div className="input-group">

            <label>संकेतशब्द</label>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          <label className="show-pass">

            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
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
            {loading ? "लॉगिन सुरू आहे..." : "🔐 प्रशासक लॉगिन"}
          </button>

        </form>

        <div className="divider">
          <span>किंवा</span>
        </div>

        <div className="portal-buttons">

          <Link
            to="/"
            className="portal-btn home-btn"
          >
            🏠 मुख्यपृष्ठ
          </Link>

          <Link
            to="/register-user"
            className="portal-btn user-btn"
          >
            👤 वापरकर्ता नोंदणी
          </Link>

          <Link
            to="/register-admin"
            className="portal-btn admin-btn"
          >
            🛡️ प्रशासक नोंदणी
          </Link>

        </div>

        <div className="footer-text">

          © {new Date().getFullYear()}<br />

          बाल मित्र गणेश उत्सव मंडळ

        </div>

      </div>

    </div>
  );
}

export default Login;