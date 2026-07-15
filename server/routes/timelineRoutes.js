const express = require("express");
const router = express.Router();

const {
    getTimeline,
    addTimeline,
    updateTimeline,
    deleteTimeline
} = require("../controllers/timelineController");

router.get("/", getTimeline);

router.post("/", addTimeline);

router.put("/:id", updateTimeline);

router.delete("/:id", deleteTimeline);

module.exports = router;