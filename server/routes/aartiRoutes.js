const express = require("express");

const router = express.Router();

const {

    getAarti,
    addAarti,
    updateAarti,
    deleteAarti

} = require("../controllers/aartiController");

router.get("/", getAarti);

router.post("/", addAarti);

router.put("/:id", updateAarti);

router.delete("/:id", deleteAarti);

module.exports = router;