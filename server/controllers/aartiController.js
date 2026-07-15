const pool = require("../config/neon");

// ================= GET ALL AARTI =================

const getAarti = async (req, res) => {

    try {

        const result = await pool.query(`
            SELECT
                id,
                name,
                day,
                date,
                time,
                performedby AS "performedBy",
                type,
                status,
                createdat AS "createdAt"
            FROM aarti
            ORDER BY date ASC
        `);

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

// ================= ADD AARTI =================

const addAarti = async (req, res) => {

    try {

        const {

            name,

            day,

            date,

            time,

            performedBy,

            type,

            status

        } = req.body;

        const result = await pool.query(

            `INSERT INTO aarti
            (
                name,
                day,
                date,
                time,
                performedby,
                type,
                status
            )
            VALUES($1,$2,$3,$4,$5,$6,$7)
            RETURNING id`,

            [

                name,

                day,

                date,

                time,

                performedBy,

                type,

                status

            ]

        );

        res.json({

            success: true,

            message: "Aarti Added Successfully",

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

// ================= UPDATE AARTI =================

const updateAarti = async (req, res) => {

    try {

        const {

            name,

            day,

            date,

            time,

            performedBy,

            type,

            status

        } = req.body;

        await pool.query(

            `UPDATE aarti
             SET
                name=$1,
                day=$2,
                date=$3,
                time=$4,
                performedby=$5,
                type=$6,
                status=$7
             WHERE id=$8`,

            [

                name,

                day,

                date,

                time,

                performedBy,

                type,

                status,

                req.params.id

            ]

        );

        res.json({

            success: true,

            message: "Aarti Updated Successfully"

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

// ================= DELETE AARTI =================

const deleteAarti = async (req, res) => {

    try {

        await pool.query(

            "DELETE FROM aarti WHERE id=$1",

            [

                req.params.id

            ]

        );

        res.json({

            success: true,

            message: "Aarti Deleted Successfully"

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

    getAarti,

    addAarti,

    updateAarti,

    deleteAarti

};