const pool = require("../config/neon");

// ================= GET VISITOR COUNT =================

const getVisitorCount = async (req, res) => {

    try {

        const result = await pool.query(

            `SELECT
                totalvisitors AS "totalVisitors"
             FROM visitor_counter
             LIMIT 1`

        );

        res.json({

            success: true,

            totalVisitors: Number(

                result.rows[0].totalVisitors

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

// ================= INCREASE VISITOR =================

const increaseVisitor = async (req, res) => {

    try {

        await pool.query(

            `UPDATE visitor_counter
             SET
                totalvisitors = totalvisitors + 1,
                updatedat = NOW()
             WHERE id = 1`

        );

        const result = await pool.query(

            `SELECT
                totalvisitors AS "totalVisitors"
             FROM visitor_counter
             WHERE id = 1`

        );

        res.json({

            success: true,

            totalVisitors: Number(

                result.rows[0].totalVisitors

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

// ================= RESET VISITOR =================

const resetVisitor = async (req, res) => {

    try {

        await pool.query(

            `UPDATE visitor_counter
             SET
                totalvisitors = 0,
                updatedat = NOW()
             WHERE id = 1`

        );

        res.json({

            success: true,

            message: "Visitor Counter Reset Successfully"

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

    getVisitorCount,

    increaseVisitor,

    resetVisitor

};