const express = require("express");

const router = express.Router();

const {

    getAarti,

    addAarti,

    deleteAarti

} = require("../controllers/aartiController");

router.get("/", getAarti);

router.post("/", addAarti);

router.delete("/:id", deleteAarti);

module.exports = router;