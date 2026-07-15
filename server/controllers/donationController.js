const pool = require("../config/neon");

// ================= GET ALL DONATIONS =================

const getDonations = async (req, res) => {

    try {

        const result = await pool.query(

            `SELECT * FROM donations
             ORDER BY id DESC`

        );

        res.json(result.rows);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

// ================= DONATION SUMMARY =================

const getDonationSummary = async (req, res) => {

    try {

        const total = await pool.query(

            `SELECT

                COALESCE(SUM(amount),0) AS totalDonation,

                COUNT(*) AS totalDonors

             FROM donations`

        );

        const today = new Date().toISOString().split("T")[0];

        const todayData = await pool.query(

            `SELECT

                COALESCE(SUM(amount),0) AS todayDonation

             FROM donations

             WHERE date=$1`,

            [today]

        );

        res.json({

            totalDonation: Number(

                total.rows[0].totaldonation

            ),

            totalDonors: Number(

                total.rows[0].totaldonors

            ),

            todayDonation: Number(

                todayData.rows[0].todaydonation

            )

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

// ================= ADD DONATION =================

const addDonation = async (req, res) => {

    try {

        const {

            donorName,

            amount,

            pendingAmount,

            date,

            time

        } = req.body;

        const receipt = req.file

            ? req.file.filename

            : null;

        const result = await pool.query(

            `INSERT INTO donations

            (

                donorName,

                amount,

                pendingAmount,

                date,

                time,

                receipt

            )

            VALUES($1,$2,$3,$4,$5,$6)

            RETURNING id`,

            [

                donorName,

                amount,

                pendingAmount,

                date,

                time,

                receipt

            ]

        );

        res.json({

            success: true,

            message: "Donation Saved",

            id: result.rows[0].id

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

// ================= UPDATE DONATION =================

const updateDonation = async (req, res) => {

    try {

        const {

            donorName,

            amount,

            pendingAmount,

            date,

            time

        } = req.body;

        let receipt = null;

        const oldData = await pool.query(

            "SELECT receipt FROM donations WHERE id=$1",

            [

                req.params.id

            ]

        );

        if (req.file) {

            receipt = req.file.filename;

        }

        else {

            receipt = oldData.rows[0]?.receipt || null;

        }

        await pool.query(

            `UPDATE donations

             SET

                donorName=$1,

                amount=$2,

                pendingAmount=$3,

                date=$4,

                time=$5,

                receipt=$6

             WHERE id=$7`,

            [

                donorName,

                amount,

                pendingAmount,

                date,

                time,

                receipt,

                req.params.id

            ]

        );

        res.json({

            success: true,

            message: "Donation Updated Successfully"

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

// ================= DELETE DONATION =================

const deleteDonation = async (req, res) => {

    try {

        await pool.query(

            `DELETE FROM donations

             WHERE id=$1`,

            [

                req.params.id

            ]

        );

        res.json({

            success: true,

            message: "Donation Deleted Successfully"

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

module.exports = {

    getDonations,

    getDonationSummary,

    addDonation,

    updateDonation,

    deleteDonation

};