const pool = require("../config/neon");

/* ===============================
        Get Notices
================================ */

const getNotices = async (req, res) => {

    try {

        const result = await pool.query(

            `SELECT * FROM notices
             ORDER BY id DESC`

        );

        res.json(result.rows);

    }

    catch (err) {

        console.log(err);

        res.status(500).json(err);

    }

};

/* ===============================
        Add Notice
================================ */

const addNotice = async (req, res) => {

    try {

        const {

            title,
            type,
            description,
            startDate,
            endDate,
            pinned,
            status

        } = req.body;

        const result = await pool.query(

            `INSERT INTO notices
            (title,type,description,startDate,endDate,pinned,status)
            VALUES($1,$2,$3,$4,$5,$6,$7)
            RETURNING id`,

            [

                title,
                type,
                description,
                startDate,
                endDate,
                pinned,
                status

            ]

        );

        res.json({

            success: true,

            message: "Notice Added",

            id: result.rows[0].id

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json(err);

    }

};

/* ===============================
        Update Notice
================================ */

const updateNotice = async (req, res) => {

    try {

        const {

            title,
            type,
            description,
            startDate,
            endDate,
            pinned,
            status

        } = req.body;

        await pool.query(

            `UPDATE notices
             SET
                title=$1,
                type=$2,
                description=$3,
                startDate=$4,
                endDate=$5,
                pinned=$6,
                status=$7
             WHERE id=$8`,

            [

                title,
                type,
                description,
                startDate,
                endDate,
                pinned,
                status,
                req.params.id

            ]

        );

        res.json({

            success: true,

            message: "Notice Updated"

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json(err);

    }

};

/* ===============================
        Delete Notice
================================ */

const deleteNotice = async (req, res) => {

    try {

        await pool.query(

            `DELETE FROM notices
             WHERE id=$1`,

            [

                req.params.id

            ]

        );

        res.json({

            success: true,

            message: "Notice Deleted"

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json(err);

    }

};

module.exports = {

    getNotices,

    addNotice,

    updateNotice,

    deleteNotice

};