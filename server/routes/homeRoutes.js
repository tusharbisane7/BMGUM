const express = require("express");

const router = express.Router();

const {
    getHomeData
} = require("../controllers/homeController");

// ================= HOME PAGE =================

router.get("/", getHomeData);

module.exports = router;