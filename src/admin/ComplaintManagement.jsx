import { useEffect, useState } from "react";
import {
  getAllComplaints,
  updateComplaint,
  deleteComplaint,
} from "../services/complaintService";

import "../styles/admin/complaintmanagement.css";

const ComplaintManagement = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const [reply, setReply] = useState("");

  const [status, setStatus] = useState("");

  // ===========================
  // Load Complaints
  // ===========================

  const fetchComplaints = async () => {
    try {
      const res = await getAllComplaints();

      setComplaints(res.complaints);

      setFilteredComplaints(res.complaints);

    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Auto Refresh Every 15 sec

  useEffect(() => {
    const interval = setInterval(() => {
      fetchComplaints();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // ===========================
  // Search + Filter
  // ===========================

  useEffect(() => {

    let data = [...complaints];

    if (search) {

      data = data.filter((item) =>
        item.tracking_id
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        item.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        item.complaint_type
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "All") {

      data = data.filter(
        (item) => item.status === statusFilter
      );
    }

    setFilteredComplaints(data);

  }, [search, statusFilter, complaints]);

  // ===========================
  // Open Reply Modal
  // ===========================

  const openComplaint = (complaint) => {

    setSelectedComplaint(complaint);

    setReply(complaint.admin_reply || "");

    setStatus(complaint.status);

  };

  // ===========================
  // Save Reply
  // ===========================

  const handleSave = async () => {

    if (!selectedComplaint) return;

    try {

      await updateComplaint(selectedComplaint.id, {

        status,

        admin_reply: reply,

      });

      alert("Complaint Updated Successfully");

      fetchComplaints();

      setSelectedComplaint(null);

    } catch (err) {

      console.log(err);

    }

  };

  // ===========================
  // Delete Complaint
  // ===========================

  const handleDelete = async (id) => {

    const ok = window.confirm(
      "ही तक्रार Delete करायची आहे?"
    );

    if (!ok) return;

    try {

      await deleteComplaint(id);

      fetchComplaints();

    } catch (err) {

      console.log(err);

    }

  };
    if (loading) {
    return (
      <div className="loading">
        तक्रारी लोड होत आहेत...
      </div>
    );
  }

  return (
    <div className="complaint-management">

      <h1>📋 Complaint Management</h1>

      <div className="top-bar">

        <input
          type="text"
          placeholder="Tracking ID, Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">सर्व</option>
          <option value="Pending">प्रलंबित</option>
          <option value="In Progress">काम सुरू</option>
          <option value="Resolved">निकाली</option>
        </select>

      </div>

      <div className="table-container">

  <table className="complaint-table">

    <thead>

      <tr>

        <th>Tracking ID</th>
        <th>नाव</th>
        <th>प्रकार</th>
        <th>स्थिती</th>
        <th>दिनांक</th>
        <th>Action</th>

      </tr>

    </thead>

    <tbody>

      {filteredComplaints.length === 0 ? (

        <tr>

          <td colSpan="6">
            कोणतीही तक्रार उपलब्ध नाही.
          </td>

        </tr>

      ) : (

        filteredComplaints.map((item) => (

          <tr key={item.id}>

            <td>{item.tracking_id}</td>

            <td>{item.name}</td>

            <td>{item.complaint_type}</td>

            <td>
              <span
                className={`status ${
                  item.status === "Pending"
                    ? "pending"
                    : item.status === "In Progress"
                    ? "progress"
                    : "resolved"
                }`}
              >
                {item.status}
              </span>
            </td>

            <td>
              {new Date(item.created_at).toLocaleDateString()}
            </td>

            <td>

              <button
                className="view-btn"
                onClick={() => openComplaint(item)}
              >
                View
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>

            </td>

          </tr>

        ))

      )}

    </tbody>

  </table>

</div>

      {selectedComplaint && (

        <div className="modal-overlay">

          <div className="modal">

            <h2>Complaint Details</h2>

            <p>
              <strong>Tracking ID:</strong>{" "}
              {selectedComplaint.tracking_id}
            </p>

            <p>
              <strong>नाव:</strong>{" "}
              {selectedComplaint.name}
            </p>

            <p>
              <strong>प्रकार:</strong>{" "}
              {selectedComplaint.complaint_type}
            </p>

            <p>
              <strong>तक्रार:</strong>
            </p>

            <textarea
              readOnly
              value={selectedComplaint.message}
              rows="4"
            />

            <label>Status</label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Pending">
                Pending
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Resolved">
                Resolved
              </option>

            </select>

            <label>Admin Reply</label>

            <textarea
              rows="5"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />

            <div className="modal-buttons">

              <button
                className="save-btn"
                onClick={handleSave}
              >
                Save
              </button>

              <button
                className="cancel-btn"
                onClick={() =>
                  setSelectedComplaint(null)
                }
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default ComplaintManagement;