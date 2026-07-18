const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const {
    getDonations,
    getDonationSummary,
    getRecentDonations,
    addDonation,
    updateDonation,
    deleteDonation,
} = require("../controllers/donationController");

// ================= MULTER STORAGE =================

const storage = multer.diskStorage({
    destination: "uploads/receipts",

    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage,
});

// ================= ROUTES =================

// Get All Donations
router.get("/", getDonations);

// Donation Summary
router.get("/summary", getDonationSummary);

// Add Donation
router.post("/", upload.single("receipt"), addDonation);

// Update Donation
router.put("/:id", upload.single("receipt"), updateDonation);

// Delete Donation
router.delete("/:id", deleteDonation);

// recent donations
router.get("/recent", getRecentDonations);

module.exports = router;