import { useState, useEffect } from "react";
import {
  submitComplaint,
  trackComplaint,
} from "../services/complaintService";

import ComplaintForm from "../components/ComplaintForm";
import ComplaintTracker from "../components/ComplaintTracker";

import "../styles/complaint.css";

const Complaint = () => {
  const [formData, setFormData] = useState({
    complaint_type: "",
    name: "",
    mobile: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [trackingId, setTrackingId] = useState("");

  const [trackingInput, setTrackingInput] = useState("");

  const [complaint, setComplaint] = useState(null);

  const [error, setError] = useState("");

  // =============================
  // Submit Complaint
  // =============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    setError("");

    try {
      const res = await submitComplaint(formData);

      setSuccess(true);

      setTrackingId(res.trackingId);

      setTrackingInput(res.trackingId);

      await fetchComplaint(res.trackingId);

      setFormData({
        complaint_type: "",
        name: "",
        mobile: "",
        message: "",
      });

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "तक्रार नोंदविण्यात अडचण आली."
      );

    }

    setLoading(false);

  };

  // =============================
  // Fetch Complaint
  // =============================

  const fetchComplaint = async (id = trackingInput) => {

    if (!id) return;

    try {

      const res = await trackComplaint(id);

      setComplaint(res.complaint);

      setError("");

    } catch {

      setComplaint(null);

      setError("Tracking ID सापडला नाही.");

    }

  };

  // =============================
  // Track Button
  // =============================

  const handleTrack = () => {

    fetchComplaint();

  };

  // =============================
  // Auto Refresh
  // =============================

  useEffect(() => {

    if (!trackingInput) return;

    const interval = setInterval(() => {

      fetchComplaint(trackingInput);

    },15000);

    return ()=>clearInterval(interval);

  },[trackingInput]);

  // =============================
  // Copy Tracking ID
  // =============================

  const copyTrackingId = ()=>{

    navigator.clipboard.writeText(trackingId);

    alert("Tracking ID कॉपी झाला.");

  };

  return (

<div className="complaint-page">

<div className="complaint-container">

{/* ================= HEADER ================= */}

<div className="complaint-header">

<h1>📝 तक्रार नोंदणी</h1>

<p>

मंडळाशी संबंधित कोणतीही तक्रार येथे नोंदवा.

तक्रार नोंदवल्यानंतर तुम्हाला Tracking ID मिळेल.

</p>

</div>

{/* ================= SUCCESS CARD ================= */}

{success && (

<div className="success-card">

<div className="success-icon">

✅

</div>

<div className="success-content">

<h3>

तक्रार यशस्वीरित्या नोंदविण्यात आली.

</h3>

<p>

कृपया तुमचा Tracking ID सुरक्षित ठेवा.

</p>

<div className="tracking-card">

<div className="track-left">

<span className="track-label">

Tracking ID

</span>

<span className="track-id">

{trackingId}

</span>

</div>

<button

className="copy-btn"

onClick={copyTrackingId}

>

📋 Copy

</button>

</div>

</div>

</div>

)}

{/* ================= FORM ================= */}

<ComplaintForm

formData={formData}

setFormData={setFormData}

handleSubmit={handleSubmit}

loading={loading}

/>

<div className="divider"></div>

{/* ================= TRACK ================= */}

<div className="track-container">

<h2 className="track-title">

🔍 तक्रार ट्रॅक करा

</h2>

<div className="track-search">

<input

className="form-control"

placeholder="Tracking ID"

value={trackingInput}

onChange={(e)=>setTrackingInput(e.target.value)}

/>

<button onClick={handleTrack}>

शोधा

</button>

</div>

{error && (

<div className="alert alert-error">

<div>

❌

</div>

<div>

<h3>

त्रुटी

</h3>

<p>

{error}

</p>

</div>

</div>

)}

{complaint && (

<ComplaintTracker

complaint={complaint}

/>

)}

</div>

</div>

</div>

  );
};

export default Complaint;