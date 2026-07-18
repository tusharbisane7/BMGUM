import React from "react";
import ComplaintStatus from "./ComplaintStatus";

const ComplaintTracker = ({ complaint }) => {
  if (!complaint) return null;

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const currentStep =
    complaint.status === "Resolved"
      ? 3
      : complaint.status === "In Progress"
      ? 2
      : 1;

  return (
    <div className="tracker-card">

      {/* Header */}

      <div className="tracker-header">

        <div className="tracker-icon">
          📋
        </div>

        <div>

          <h2>तक्रारीची माहिती</h2>

          <p>
            तुमच्या तक्रारीची सद्यस्थिती खाली दिली आहे.
          </p>

        </div>

      </div>

      {/* Information Grid */}

      <div className="tracker-grid">

        <div className="tracker-item">
          <span className="tracker-label">
            🆔 Tracking ID
          </span>

          <span className="tracker-value tracking">
            {complaint.tracking_id}
          </span>
        </div>

        <div className="tracker-item">
          <span className="tracker-label">
            📂 तक्रारीचा प्रकार
          </span>

          <span className="tracker-value">
            {complaint.complaint_type}
          </span>
        </div>

        <div className="tracker-item">
          <span className="tracker-label">
            👤 नाव
          </span>

          <span className="tracker-value">
            {complaint.name}
          </span>
        </div>

        {complaint.mobile && (
          <div className="tracker-item">
            <span className="tracker-label">
              📱 मोबाईल
            </span>

            <span className="tracker-value">
              {complaint.mobile}
            </span>
          </div>
        )}

        <div className="tracker-item full-width">

          <span className="tracker-label">
            📝 तक्रार
          </span>

          <div className="message-box">
            {complaint.message}
          </div>

        </div>

        <div className="tracker-item">

          <span className="tracker-label">
            📅 दिनांक
          </span>

          <span className="tracker-value">
            {formatDate(complaint.created_at)}
          </span>

        </div>

        <div className="tracker-item">

          <span className="tracker-label">
            📢 स्थिती
          </span>

          <ComplaintStatus
            status={complaint.status}
          />

        </div>

      </div>

      {/* Admin Reply */}

      <div className="reply-card">

        <h3>
          💬 Admin उत्तर
        </h3>

        <div className="reply-box">

          {complaint.admin_reply
            ? complaint.admin_reply
            : "अद्याप उत्तर दिलेले नाही."}

        </div>

      </div>

      {/* Timeline */}

      <div className="timeline-card">

        <h3>
          🚀 तक्रार प्रगती
        </h3>

        <div className="timeline">

          <div className={`timeline-step ${currentStep >= 1 ? "active" : ""}`}>

            <div className="timeline-circle">
              1
            </div>

            <div className="timeline-content">

              <h4>
                तक्रार नोंदवली
              </h4>

              <p>
                तुमची तक्रार यशस्वीरित्या प्राप्त झाली.
              </p>

            </div>

          </div>

          <div className={`timeline-step ${currentStep >= 2 ? "active" : ""}`}>

            <div className="timeline-circle">
              2
            </div>

            <div className="timeline-content">

              <h4>
                तपासणी सुरू
              </h4>

              <p>
                स्वयंसेवक किंवा व्यवस्थापन तक्रार तपासत आहे.
              </p>

            </div>

          </div>

          <div className={`timeline-step ${currentStep >= 3 ? "active" : ""}`}>

            <div className="timeline-circle">
              3
            </div>

            <div className="timeline-content">

              <h4>
                तक्रार निकाली
              </h4>

              <p>
                तक्रारीवर कार्यवाही पूर्ण झाली.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ComplaintTracker;