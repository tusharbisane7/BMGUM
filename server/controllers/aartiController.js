const pool = require("../config/neon");

// ================= GET ALL AARTI =================

const getAarti = async (req, res) => {

    try {

        const result = await pool.query(

            `SELECT * FROM aarti
             ORDER BY date ASC`

        );

        res.json(result.rows);

    }

    catch (err) {

        console.log(err);

        res.status(500).json(err);

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
            (name, day, date, time, performedBy, type, status)
            VALUES ($1,$2,$3,$4,$5,$6,$7)
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

            message: "Aarti Added",

            id: result.rows[0].id

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json(err);

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
                performedBy=$5,
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

            message: "Aarti Updated"

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json(err);

    }

};

// ================= DELETE =================

const deleteAarti = async (req, res) => {

    try {

        await pool.query(

            `DELETE FROM aarti
             WHERE id=$1`,

            [

                req.params.id

            ]

        );

        res.json({

            success: true,

            message: "Aarti Deleted"

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json(err);

    }

};

module.exports = {

    getAarti,

    addAarti,

    updateAarti,

    deleteAarti

};