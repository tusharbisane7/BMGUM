const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadVolunteer");

const {

    getVolunteers,

    getApprovedVolunteers,

    getVolunteerSummary,

    registerVolunteer,

    updateVolunteer,

    approveVolunteer,

    rejectVolunteer,

    deleteVolunteer

} = require("../controllers/volunteerController");

// ================= PUBLIC =================

// Register Volunteer

router.post(

    "/",

    upload.single("photo"),

    registerVolunteer

);

// Approved Volunteers List

router.get(

    "/approved",

    getApprovedVolunteers

);

// ================= ADMIN =================

// All Volunteers

router.get(

    "/",

    getVolunteers

);

// Summary Cards

router.get(

    "/summary",

    getVolunteerSummary

);

// Update Volunteer

router.put(

    "/:id",

    upload.single("photo"),

    updateVolunteer

);

// Approve Volunteer

router.put(

    "/approve/:id",

    approveVolunteer

);

// Reject Volunteer

router.put(

    "/reject/:id",

    rejectVolunteer

);

// Delete Volunteer

router.delete(

    "/:id",

    deleteVolunteer

);

module.exports = router;