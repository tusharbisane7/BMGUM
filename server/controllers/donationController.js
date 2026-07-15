const db = require("../config/db");

// ================= GET ALL DONATIONS =================

const getDonations = (req, res) => {

    db.all(

        "SELECT * FROM donations ORDER BY id DESC",

        [],

        (err, rows) => {

            if (err) {

                return res.status(500).json(err);

            }

            res.json(rows);

        }

    );

};

// ================= DONATION SUMMARY =================

const getDonationSummary = (req, res) => {

    db.get(

        `SELECT
            IFNULL(SUM(amount),0) AS totalDonation,
            COUNT(*) AS totalDonors
         FROM donations`,

        [],

        (err, total) => {

            if (err) {

                console.log(err);

                return res.status(500).json(err);

            }

            const today = new Date().toISOString().split("T")[0];

            db.get(

                `SELECT
                    IFNULL(SUM(amount),0) AS todayDonation
                 FROM donations
                 WHERE date=?`,

                [today],

                (err, todayData) => {

                    if (err) {

                        console.log(err);

                        return res.status(500).json(err);

                    }

                    res.json({

                        totalDonation: total.totalDonation || 0,

                        totalDonors: total.totalDonors || 0,

                        todayDonation: todayData.todayDonation || 0

                    });

                }

            );

        }

    );

};

// ================= ADD DONATION =================

const addDonation = (req, res) => {

    const {

        donorName,

        amount,

        pendingAmount,

        date,

        time

    } = req.body;

    const receipt = req.file ? req.file.filename : null;

    db.run(

        `INSERT INTO donations
        (donorName,amount,pendingAmount,date,time,receipt)
        VALUES(?,?,?,?,?,?)`,

        [

            donorName,

            amount,

            pendingAmount,

            date,

            time,

            receipt

        ],

        function(err){

            if(err){

                console.log(err);

                return res.status(500).json({

                    message:err.message,

                    code:err.code

                });

            }

            res.json({

                success:true,

                message:"Donation Saved",

                id:this.lastID

            });

        }

    );

};

// ================= DELETE DONATION =================

const deleteDonation = (req,res)=>{

    db.run(

        "DELETE FROM donations WHERE id=?",

        [req.params.id],

        function(err){

            if(err){

                return res.status(500).json(err);

            }

            res.json({

                success:true,

                message:"Donation Deleted"

            });

        }

    );

};

module.exports={

    getDonations,

    getDonationSummary,

    addDonation,

    deleteDonation

};