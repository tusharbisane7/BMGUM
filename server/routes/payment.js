const express = require("express");
const crypto = require("crypto");
const razorpay = require("../config/razorpay");
const generateReceiptPDF = require("../utils/generateReceiptPDF");

const router = express.Router();

/* =====================================
   CREATE ORDER
===================================== */

router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid Amount",
      });
    }

    const options = {
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: "DONATION_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Unable to create Razorpay Order",
    });
  }
});

/* =====================================
   VERIFY PAYMENT
===================================== */

router.post("/verify-payment", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      donor,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment Verification Failed",
      });
    }

    console.log("✅ Payment Verified");

    const receiptNo =
      "BMGM-" +
      new Date().getFullYear() +
      "-" +
      Date.now();

    const donation = {
      receiptNo,
      paymentId: razorpay_payment_id,
      fullName: donor.fullName,
      marathiName: donor.marathiName,
      mobile: donor.mobile,
      address: donor.address,
      purpose: donor.purpose,
      amount: donor.amount,
    };

    // Generate PDF Receipt
    const pdfFile = generateReceiptPDF(donation);

    console.log("✅ Receipt Generated:", pdfFile);

    res.json({
      success: true,
      message: "Payment Verified Successfully",

      receiptNo,

      paymentId: razorpay_payment_id,

      pdfUrl: `https://bmgum.onrender.com/receipts/${pdfFile}`,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
});

module.exports = router;