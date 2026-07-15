const express = require("express");

const router = express.Router();

const multer = require("multer");

const path = require("path");

const {

    getDonations,

    getDonationSummary,

    addDonation,

    deleteDonation

} = require("../controllers/donationController");

const storage = multer.diskStorage({

    destination:"uploads/receipts",

    filename:(req,file,cb)=>{

        cb(

            null,

            Date.now()+path.extname(file.originalname)

        );

    }

});

const upload = multer({

    storage

});

// ================= ROUTES =================

router.get("/", getDonations);

router.get("/summary", getDonationSummary);

router.post("/", upload.single("receipt"), addDonation);

router.delete("/:id", deleteDonation);

module.exports = router;