const pool = require("../config/neon");

// ================= GET ALL TIMELINE =================

const getTimeline = async (req, res) => {

    try {

        const result = await pool.query(

            `SELECT * FROM timeline
             ORDER BY eventDate ASC`

        );

        res.json(result.rows);

    }

    catch (err) {

        console.log(err);

        res.status(500).json(err);

    }

};

// ================= ADD TIMELINE =================

const addTimeline = async (req, res) => {

    try {

        const {

            title,
            eventDate,
            description

        } = req.body;

        const result = await pool.query(

            `INSERT INTO timeline
            (title, eventDate, description)
            VALUES ($1,$2,$3)
            RETURNING id`,

            [

                title,
                eventDate,
                description

            ]

        );

        res.json({

            success: true,

            message: "Timeline Added Successfully",

            id: result.rows[0].id

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json(err);

    }

};

// ================= UPDATE TIMELINE =================

const updateTimeline = async (req, res) => {

    try {

        const {

            title,
            eventDate,
            description

        } = req.body;

        await pool.query(

            `UPDATE timeline
             SET
                title=$1,
                eventDate=$2,
                description=$3
             WHERE id=$4`,

            [

                title,
                eventDate,
                description,
                req.params.id

            ]

        );

        res.json({

            success: true,

            message: "Timeline Updated Successfully"

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json(err);

    }

};

// ================= DELETE TIMELINE =================

const deleteTimeline = async (req, res) => {

    try {

        await pool.query(

            `DELETE FROM timeline
             WHERE id=$1`,

            [

                req.params.id

            ]

        );

        res.json({

            success: true,

            message: "Timeline Deleted Successfully"

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json(err);

    }

};

module.exports = {

    getTimeline,

    addTimeline,

    updateTimeline,

    deleteTimeline

};