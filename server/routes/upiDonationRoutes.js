const express = require("express");
const jwt = require("jsonwebtoken");
const pool = require("../config/neon");

const router = express.Router();

/* =====================================
   SUBMIT UPI DONATION
===================================== */

router.post("/submit", async (req, res) => {

    try {

        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {

            return res.status(401).json({

                success: false,

                message: "Unauthorized"

            });

        }

        const decoded = jwt.verify(

            token,

            process.env.JWT_SECRET

        );

        const {

            donorname,

            marathiName,

            mobile,

            address,

            purpose,

            amount,

            utr,

            payment_method,

            status

        } = req.body;

        if (

            !donorname ||

            !mobile ||

            !amount ||

            !utr

        ) {

            return res.status(400).json({

                success: false,

                message: "Please fill all required fields."

            });

        }

        const receiptNo =

            "UPI-" +

            new Date().getFullYear() +

            "-" +

            Date.now();

        const result = await pool.query(

            `
            INSERT INTO donations
            (
                user_id,
                donorname,
                mobile,
                amount,
                receipt,
                createdat,
                utr,
                payment_method,
                status
            )

            VALUES
            (
                $1,
                $2,
                $3,
                $4,
                $5,
                NOW(),
                $6,
                $7,
                $8
            )

            RETURNING *
            `,

            [

                decoded.id,

                donorname,

                mobile,

                amount,

                receiptNo,

                utr,

                payment_method || "UPI",

                status || "Pending"

            ]

        );

        res.json({

            success: true,

            message:

                "Donation submitted successfully. Waiting for admin verification.",

            donation: result.rows[0]

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: "Server Error",

            error: err.message

        });

    }

});
/* =====================================
   GET ALL UPI DONATIONS (ADMIN)
===================================== */

router.get("/", async (req, res) => {

    try {

        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {

            return res.status(401).json({

                success: false,

                message: "Unauthorized"

            });

        }

        jwt.verify(

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

            WHERE payment_method = 'UPI'

            ORDER BY createdat DESC
            `

        );

        res.json({

            success: true,

            donations: result.rows

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: "Unable to fetch UPI donations.",

            error: err.message

        });

    }

});
/* =====================================
   GET MY UPI DONATIONS
===================================== */

router.get("/my", async (req, res) => {

    try {

        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {

            return res.status(401).json({

                success: false,

                message: "Unauthorized"

            });

        }

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

            WHERE

                user_id = $1

                AND payment_method = 'UPI'

            ORDER BY createdat DESC
            `,

            [

                decoded.id

            ]

        );

        res.json({

            success: true,

            donations: result.rows

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: "Unable to fetch your donations.",

            error: err.message

        });

    }

});
/* =====================================
   APPROVE UPI DONATION
===================================== */

router.put("/approve/:id", async (req, res) => {

    try {

        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {

            return res.status(401).json({

                success: false,

                message: "Unauthorized"

            });

        }

        jwt.verify(

            token,

            process.env.JWT_SECRET

        );

        const { id } = req.params;

        const result = await pool.query(

            `
            UPDATE donations

            SET

                status = 'Success',

                payment_status = 'Success',

                verified_at = NOW()

            WHERE

                id = $1

                AND payment_method = 'UPI'

            RETURNING *
            `,

            [id]

        );

        if (result.rows.length === 0) {

            return res.status(404).json({

                success: false,

                message: "Donation not found."

            });

        }

        res.json({

            success: true,

            message: "Donation approved successfully.",

            donation: result.rows[0]

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: "Unable to approve donation.",

            error: err.message

        });

    }

});
/* =====================================
   REJECT UPI DONATION
===================================== */

router.put("/reject/:id", async (req, res) => {

    try {

        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {

            return res.status(401).json({

                success: false,

                message: "Unauthorized"

            });

        }

        jwt.verify(

            token,

            process.env.JWT_SECRET

        );

        const { id } = req.params;

        const result = await pool.query(

            `
            UPDATE donations

            SET

                status = 'Rejected',

                payment_status = 'Rejected',

                verified_at = NOW()

            WHERE

                id = $1

                AND payment_method = 'UPI'

            RETURNING *
            `,

            [id]

        );

        if (result.rows.length === 0) {

            return res.status(404).json({

                success: false,

                message: "Donation not found."

            });

        }

        res.json({

            success: true,

            message: "Donation rejected successfully.",

            donation: result.rows[0]

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: "Unable to reject donation.",

            error: err.message

        });

    }

});


/* =====================================
   EXPORT ROUTER
===================================== */

module.exports = router;