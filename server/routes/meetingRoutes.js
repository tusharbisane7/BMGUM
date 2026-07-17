const express = require("express");

const router = express.Router();

const {

    getLiveMeeting,

    getMeetings,

    createMeeting,

    updateMeeting,

    startMeeting,

    endMeeting,

    deleteMeeting,

    getMeetingLink

} = require("../controllers/meetingController");

// ================= LIVE MEETING =================

router.get(

    "/live",

    getLiveMeeting

);

// ================= ALL MEETINGS =================

router.get(

    "/",

    getMeetings

);

// ================= CREATE =================

router.post(

    "/",

    createMeeting

);

// ================= UPDATE =================

router.put(

    "/:id",

    updateMeeting

);

// ================= START =================

router.put(

    "/start/:id",

    startMeeting

);

// ================= END =================

router.put(

    "/end/:id",

    endMeeting

);

// ================= COPY LINK =================

router.get(

    "/link/:id",

    getMeetingLink

);

// ================= DELETE =================

router.delete(

    "/:id",

    deleteMeeting

);

module.exports = router;