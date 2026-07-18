const express = require("express");
const router = express.Router();

const {
  createComplaint,
  getAllComplaints,
  getComplaintByTrackingId,
  updateComplaint,
  deleteComplaint,
} = require("../controllers/complaintController");

// =======================
// User Routes
// =======================

// Submit Complaint
router.post("/", createComplaint);

// Track Complaint by Tracking ID
router.get("/track/:trackingId", getComplaintByTrackingId);

// =======================
// Admin Routes
// =======================

// Get All Complaints
router.get("/", getAllComplaints);

// Update Complaint Status / Reply
router.put("/:id", updateComplaint);

// Delete Complaint
router.delete("/:id", deleteComplaint);

module.exports = router;