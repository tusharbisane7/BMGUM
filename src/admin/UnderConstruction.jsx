import { useNavigate } from "react-router-dom";
import {
  FaTools,
  FaHardHat,
  FaArrowLeft,
  FaClock,
} from "react-icons/fa";

import "../styles/admin/underconstruction.css";

function UnderConstruction({ title }) {

  const navigate = useNavigate();

  return (

    <div className="construction-page">

      <div className="construction-card">

        <div className="construction-icon">

          <FaTools />

        </div>

        <h1>{title}</h1>

        <h2>🚧 हे पृष्ठ तयार करण्याचे काम सुरू आहे 🚧</h2>

        <p>

          हे मॉड्यूल सध्या विकसित केले जात आहे.

          <br />

          लवकरच हे आपल्या सेवेसाठी उपलब्ध होईल.

        </p>

        <div className="construction-info">

          <div>

            <FaHardHat />

            <span>विकासाचे काम सुरू आहे</span>

          </div>

          <div>

            <FaClock />

            <span>कृपया काही दिवसांनी पुन्हा भेट द्या.</span>

          </div>

        </div>

        <button

          className="back-btn"

          onClick={() => navigate("/admin/dashboard")}

        >

          <FaArrowLeft />

          डॅशबोर्डवर परत जा

        </button>

      </div>

    </div>

  );

}

export default UnderConstruction;