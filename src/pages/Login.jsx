import { useState } from "react";
import { useNavigate } from "react-router-dom";
import adminCredentials from "../data/admin";
import "../styles/login.css";
import API from "../api/auth";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

 const handleLogin = async (e) => {

  e.preventDefault();

  setError("");

  try {

    const response = await API.post("/auth/login", {

      username: username.toLowerCase(),

      password

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

      "❌ Login Failed"

    );

  }

};
  return (
    <div className="login-page">

      <div className="login-card">

        <h1>🔐 Admin Login</h1>

        <p>बाल मित्र गणेश उत्सव मंडळ</p>

        <form onSubmit={handleLogin}>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <label className="show-pass">

            <input
              type="checkbox"
              onChange={()=>setShowPassword(!showPassword)}
            />

            Show Password

          </label>

          {error && <p className="error">{error}</p>}

          <button type="submit">
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;