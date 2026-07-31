const express = require("express");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const razorpay = require("../config/razorpay");
const pool = require("../config/neon");
const generateReceiptPDF = require("../utils/generateReceiptPDF");

const router = express.Router();


/* =====================================
   CREATE RAZORPAY ORDER
===================================== */

router.post("/create-order", async (req, res) => {

  try {

    const { amount } = req.body;


    if (!amount || Number(amount) <= 0) {

      return res.status(400).json({

        success:false,
        message:"Invalid Amount"

      });

    }


    const options = {

      amount:Number(amount) * 100,

      currency:"INR",

      receipt:"DONATION_" + Date.now()

    };


    const order =
      await razorpay.orders.create(options);



    res.json(order);


  }

  catch(err){

    console.log(err);


    res.status(500).json({

      success:false,

      message:"Unable to create order"

    });

  }

});




/* =====================================
   VERIFY RAZORPAY PAYMENT
===================================== */

router.post("/verify-payment", async(req,res)=>{


  try {


    const token =
      req.headers.authorization?.split(" ")[1];



    if(!token){

      return res.status(401).json({

        success:false,

        message:"Unauthorized"

      });

    }



    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );



    const {

      razorpay_order_id,

      razorpay_payment_id,

      razorpay_signature,

      donor


    } = req.body;



    const body =
      razorpay_order_id +
      "|" +
      razorpay_payment_id;



    const expectedSignature =
      crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_SECRET
      )
      .update(body)
      .digest("hex");



    if(expectedSignature !== razorpay_signature){


      return res.status(400).json({

        success:false,

        message:"Payment Verification Failed"

      });


    }



    const receiptNo =

      "BMGM-" +

      new Date().getFullYear() +

      "-" +

      Date.now();



    // SAVE ONLY AFTER VERIFIED PAYMENT

    await pool.query(

      `
      INSERT INTO donations
      (
        user_id,
        donorname,
        mobile,
        amount,
        payment_id,
        payment_status,
        receipt,
        createdat
      )

      VALUES

      ($1,$2,$3,$4,$5,$6,$7,NOW())

      `,

      [

        decoded.id,

        donor.fullName,

        donor.mobile,

        donor.amount,

        razorpay_payment_id,

        "Success",

        receiptNo

      ]

    );




    const donation = {


      receiptNo,

      paymentId:razorpay_payment_id,

      fullName:donor.fullName,

      marathiName:donor.marathiName,

      mobile:donor.mobile,

      address:donor.address,

      purpose:donor.purpose,

      amount:donor.amount


    };



    const pdfFile =
      generateReceiptPDF(donation);



    res.json({

      success:true,

      message:"Payment Verified Successfully",

      receiptNo,

      paymentId:razorpay_payment_id,

      pdfUrl:

      `https://bmgum.onrender.com/receipts/${pdfFile}`


    });



  }

  catch(err){


    console.log(
      "VERIFY ERROR:",
      err
    );


    res.status(500).json({

      success:false,

      message:"Server Error",

      error:err.message

    });


  }


});



module.exports = router;