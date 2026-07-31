const express = require("express");
const jwt = require("jsonwebtoken");

const pool = require("../config/neon");
const generateReceiptPDF = require("../utils/generateReceiptPDF");

const router = express.Router();


/* =====================================
   CREATE ORDER (TEMPORARY)
   Razorpay disabled
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


    res.json({

      success:true,

      amount:Number(amount),

      message:"Test order created"

    });


  } catch(err){

    console.log(err);

    res.status(500).json({

      success:false,

      message:"Server Error"

    });

  }

});



/* =====================================
   VERIFY PAYMENT (TEMP DIRECT SAVE)

   No Razorpay verification
===================================== */

router.post("/verify-payment", async (req,res)=>{


  try {


    const token =
      req.headers.authorization?.split(" ")[1];


    if(!token){

      return res.status(401).json({

        success:false,

        message:"Unauthorized"

      });

    }



    const decoded = jwt.verify(

      token,

      process.env.JWT_SECRET

    );



    const { donor } = req.body;



    if(!donor){

      return res.status(400).json({

        success:false,

        message:"Donor data missing"

      });

    }



    const receiptNo =

      "BMGM-" +

      new Date().getFullYear() +

      "-" +

      Date.now();



    console.log(
      "Saving Donation:",
      donor
    );


    console.log(
      "User:",
      decoded
    );



    // SAVE DONATION

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

        "TEST_PAYMENT",

        "Success",

        receiptNo

      ]

    );



    const donation = {


      receiptNo,


      paymentId:"TEST_PAYMENT",


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


      message:"Donation Saved Successfully",


      receiptNo,


      paymentId:"TEST_PAYMENT",


      pdfUrl:

      `https://bmgum.onrender.com/receipts/${pdfFile}`


    });



  }

  catch(err){


    console.log(
      "PAYMENT ERROR:",
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