const pool = require("../config/neon");

// ================= GET VISITOR COUNT =================

const getVisitorCount = async (req, res) => {

    try {

        let result = await pool.query(

            `SELECT
                totalvisitors AS "totalVisitors"
             FROM visitor_counter
             LIMIT 1`

        );

        // Create first row automatically

        if(result.rows.length===0){

            await pool.query(

                `INSERT INTO visitor_counter
                (
                    totalvisitors
                )
                VALUES
                (
                    0
                )`

            );

            result = await pool.query(

                `SELECT
                    totalvisitors AS "totalVisitors"
                 FROM visitor_counter
                 LIMIT 1`

            );

        }

        res.json({

            success:true,

            totalVisitors:Number(

                result.rows[0].totalVisitors

            )

        });

    }

    catch(err){

        console.log(err);

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};

// ================= INCREASE VISITOR =================

// ================= INCREASE VISITOR =================

const increaseVisitor = async (req, res) => {

    try {

        let row = await pool.query(

            `SELECT
                id
             FROM visitor_counter
             LIMIT 1`

        );

        // If table is empty, create first row

        if(row.rows.length===0){

            await pool.query(

                `INSERT INTO visitor_counter
                (
                    totalvisitors
                )
                VALUES
                (
                    0
                )`

            );

        }

        await pool.query(

            `UPDATE visitor_counter
             SET
                totalvisitors = totalvisitors + 1,
                updatedat = NOW()`

        );

        const result = await pool.query(

            `SELECT
                totalvisitors AS "totalVisitors"
             FROM visitor_counter
             LIMIT 1`

        );

        res.json({

            success:true,

            totalVisitors:Number(

                result.rows[0].totalVisitors

            )

        });

    }

    catch(err){

        console.log(err);

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};

// ================= RESET VISITOR =================


const resetVisitor = async (req, res) => {

    try {

        let row = await pool.query(

            `SELECT
                id
             FROM visitor_counter
             LIMIT 1`

        );

        // If table is empty, create first row

        if(row.rows.length===0){

            await pool.query(

                `INSERT INTO visitor_counter
                (
                    totalvisitors
                )
                VALUES
                (
                    0
                )`

            );

        }

        await pool.query(

            `UPDATE visitor_counter
             SET
                totalvisitors = 0,
                updatedat = NOW()`

        );

        res.json({

            success:true,

            message:"Visitor Counter Reset Successfully"

        });

    }

    catch(err){

        console.log(err);

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};
module.exports = {

    getVisitorCount,

    increaseVisitor,

    resetVisitor

};