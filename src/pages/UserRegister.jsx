import { Link } from "react-router-dom";
import "../styles/underConstruction.css";

function UserRegister() {
  return (
    <div className="construction-page">

      <div className="construction-card">

        <div className="construction-icon">🚧</div>

        <h1>वापरकर्ता नोंदणी</h1>

        <h2>लवकरच उपलब्ध होणार...</h2>

        <p>
          वापरकर्ता नोंदणी सुविधा सध्या विकसित केली जात आहे.
          कृपया काही दिवसांनी पुन्हा भेट द्या.
        </p>

        <Link to="/" className="home-button">
          🏠 मुख्यपृष्ठावर जा
        </Link>

      </div>

    </div>
  );
}

export default UserRegister;