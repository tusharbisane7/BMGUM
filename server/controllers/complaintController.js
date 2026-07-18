const pool = require("../config/neon");

// Generate Tracking ID
const generateTrackingId = async () => {
  const result = await pool.query(
    "SELECT id FROM complaints ORDER BY id DESC LIMIT 1"
  );

  const nextId =
    result.rows.length > 0
      ? result.rows[0].id + 1
      : 1;

  return `B-${nextId}`;
};

// ===============================
// Create Complaint
// ===============================

exports.createComplaint = async (req, res) => {
  try {
    const { complaint_type, name, mobile, message } = req.body;

    if (!complaint_type || !name || !message) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    const trackingId = await generateTrackingId();

    const result = await pool.query(
      `INSERT INTO complaints
      (tracking_id, complaint_type, name, mobile, message)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [
        trackingId,
        complaint_type,
        name,
        mobile,
        message,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Complaint submitted successfully",
      trackingId,
      complaint: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===============================
// Get All Complaints
// ===============================

exports.getAllComplaints = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM complaints ORDER BY created_at DESC"
    );

    res.json({
      success: true,
      complaints: result.rows,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// ===============================
// Get Complaint By Tracking ID
// ===============================

exports.getComplaintByTrackingId = async (req, res) => {
  try {
    const { trackingId } = req.params;

    const result = await pool.query(
      "SELECT * FROM complaints WHERE tracking_id=$1",
      [trackingId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    res.json({
      success: true,
      complaint: result.rows[0],
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// ===============================
// Update Complaint
// ===============================

exports.updateComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, admin_reply } = req.body;

    const result = await pool.query(
      `UPDATE complaints
       SET status = $1,
           admin_reply = $2
       WHERE id = $3
       RETURNING *`,
      [status, admin_reply, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    res.json({
      success: true,
      message: "Complaint updated successfully",
      complaint: result.rows[0],
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// ===============================
// Delete Complaint
// ===============================

exports.deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM complaints WHERE id=$1",
      [id]
    );

    res.json({
      success: true,
      message: "Complaint deleted successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};