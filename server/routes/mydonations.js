const express = require("express");
const router = express.Router();
const pool = require("../config/neon"); // change if your db file has a different name

router.get("/my", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM donations ORDER BY createdat DESC"
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch donations",
    });
  }
});

module.exports = router;