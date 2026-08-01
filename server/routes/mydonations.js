const express = require("express");
const jwt = require("jsonwebtoken");
const pool = require("../config/neon");

const router = express.Router();

/* =====================================
   MY DONATIONS
===================================== */

router.get("/my", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const result = await pool.query(
      `
      SELECT
        id,
        user_id,
        donorname,
        mobile,
        amount,
        receipt,
        utr,
        payment_method,
        status,
        payment_id,
        payment_status,
        createdat,
        verified_at
      FROM donations
      WHERE user_id = $1
      ORDER BY createdat DESC
      `,
      [decoded.id]
    );

    return res.status(200).json({
      success: true,
      donations: result.rows,
    });

  } catch (err) {

    console.error("MY DONATIONS ERROR:", err);

    if (
      err.name === "JsonWebTokenError" ||
      err.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid or Expired Token",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to fetch donations",
      error: err.message,
    });
  }
});

module.exports = router;