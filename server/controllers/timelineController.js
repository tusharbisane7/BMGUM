const pool = require("../config/neon");

// ================= GET ALL TIMELINE =================

const getTimeline = async (req, res) => {

    try {

        const result = await pool.query(`
            SELECT
                id,
                title,
                icon,
                eventdate AS "eventDate",
                description
            FROM timeline
            ORDER BY eventdate ASC
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

// ================= ADD TIMELINE =================

const addTimeline = async (req, res) => {

    try {

        const {

            title,

            icon,

            eventDate,

            description

        } = req.body;

        const result = await pool.query(

            `INSERT INTO timeline
            (
                title,
                icon,
                eventdate,
                description
            )
            VALUES($1,$2,$3,$4)
            RETURNING id`,

            [

                title,

                icon,

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

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

// ================= UPDATE TIMELINE =================

const updateTimeline = async (req, res) => {

    try {

        const {

            title,

            icon,

            eventDate,

            description

        } = req.body;

        await pool.query(

            `UPDATE timeline
             SET
                title=$1,
                icon=$2,
                eventdate=$3,
                description=$4
             WHERE id=$5`,

            [

                title,

                icon,

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

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

// ================= DELETE TIMELINE =================

const deleteTimeline = async (req, res) => {

    try {

        await pool.query(

            "DELETE FROM timeline WHERE id=$1",

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

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

module.exports = {

    getTimeline,

    addTimeline,

    updateTimeline,

    deleteTimeline

};