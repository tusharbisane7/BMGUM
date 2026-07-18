import React from "react";

const ComplaintStatus = ({ status }) => {
  let className = "";
  let text = "";

  switch (status) {
    case "Pending":
      className = "status pending";
      text = "🟡 प्रलंबित";
      break;

    case "In Progress":
      className = "status progress";
      text = "🔵 काम सुरू";
      break;

    case "Resolved":
      className = "status resolved";
      text = "🟢 निकाली काढली";
      break;

    default:
      className = "status pending";
      text = "🟡 प्रलंबित";
  }

  return (
    <div className={className}>
      <span className="status-dot"></span>
      <span>{text}</span>
    </div>
  );
};

export default ComplaintStatus;