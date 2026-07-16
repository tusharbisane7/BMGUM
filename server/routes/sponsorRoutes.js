const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadSponsor");

const {

    getSponsors,

    getActiveSponsors,

    getSponsorSummary,

    addSponsor,

    updateSponsor,

    deleteSponsor

} = require("../controllers/sponsorController");

// ================= GET ALL SPONSORS =================

router.get(

    "/",

    getSponsors

);

// ================= ACTIVE SPONSORS =================

router.get(

    "/active",

    getActiveSponsors

);

// ================= SUMMARY =================

router.get(

    "/summary",

    getSponsorSummary

);

// ================= ADD SPONSOR =================

router.post(

    "/",

    upload.single("logo"),

    addSponsor

);

// ================= UPDATE SPONSOR =================

router.put(

    "/:id",

    upload.single("logo"),

    updateSponsor

);

// ================= DELETE SPONSOR =================

router.delete(

    "/:id",

    deleteSponsor

);

module.exports = router;