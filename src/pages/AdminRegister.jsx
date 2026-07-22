import { Link } from "react-router-dom";
import "../styles/underConstruction.css";

function AdminRegister() {
  return (
    <div className="construction-page">

      <div className="construction-card">

        <div className="construction-icon">🛠️</div>

        <h1>प्रशासक नोंदणी</h1>

        <h2>ही सुविधा तयार होत आहे...</h2>

        <p>
          प्रशासक नोंदणी सुविधा सुरक्षेच्या दृष्टीने विकसित केली जात आहे.
          लवकरच उपलब्ध होईल.
        </p>

        <Link to="/" className="home-button">
          🏠 मुख्यपृष्ठावर जा
        </Link>

      </div>

    </div>
  );
}

export default AdminRegister;