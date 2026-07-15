const db = require("../config/db");

// ================= GET ALL TIMELINE =================

const getTimeline = (req, res) => {

    db.all(

        "SELECT * FROM timeline ORDER BY eventDate ASC",

        [],

        (err, rows) => {

            if (err) {

                console.log(err);

                return res.status(500).json(err);

            }

            res.json(rows);

        }

    );

};

// ================= ADD TIMELINE =================

const addTimeline = (req, res) => {

    const {

        title,
        eventDate,
        description

    } = req.body;

    db.run(

        `INSERT INTO timeline
        (title, eventDate, description)
        VALUES (?,?,?)`,

        [

            title,
            eventDate,
            description

        ],

        function (err) {

            if (err) {

                console.log(err);

                return res.status(500).json(err);

            }

            res.json({

                success: true,

                message: "Timeline Added Successfully",

                id: this.lastID

            });

        }

    );

};

// ================= UPDATE TIMELINE =================

const updateTimeline = (req, res) => {

    const {

        title,
        eventDate,
        description

    } = req.body;

    db.run(

        `UPDATE timeline
        SET
            title=?,
            eventDate=?,
            description=?
        WHERE id=?`,

        [

            title,
            eventDate,
            description,
            req.params.id

        ],

        function (err) {

            if (err) {

                console.log(err);

                return res.status(500).json(err);

            }

            res.json({

                success: true,

                message: "Timeline Updated Successfully"

            });

        }

    );

};

// ================= DELETE TIMELINE =================

const deleteTimeline = (req, res) => {

    db.run(

        "DELETE FROM timeline WHERE id=?",

        [req.params.id],

        function (err) {

            if (err) {

                console.log(err);

                return res.status(500).json(err);

            }

            res.json({

                success: true,

                message: "Timeline Deleted Successfully"

            });

        }

    );

};

module.exports = {

    getTimeline,

    addTimeline,

    updateTimeline,

    deleteTimeline

};