const express = require("express");

const router = express.Router();

const {

    getVisitorCount,

    increaseVisitor,

    resetVisitor

} = require("../controllers/visitorController");

// ================= GET VISITOR COUNT =================

router.get(

    "/",

    getVisitorCount

);

// ================= INCREASE VISITOR =================

router.post(

    "/",

    increaseVisitor

);

// ================= RESET VISITOR =================

router.put(

    "/reset",

    resetVisitor

);

module.exports = router;