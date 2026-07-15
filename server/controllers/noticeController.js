const db = require("../config/db");

/* ===============================
        Get Notices
================================ */

const getNotices = (req, res) => {

    db.all(

        "SELECT * FROM notices ORDER BY id DESC",

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

/* ===============================
        Add Notice
================================ */

const addNotice = (req, res) => {

    const {

        title,

        type,

        description,

        startDate,

        endDate,

        pinned,

        status

    } = req.body;

    db.run(

        `INSERT INTO notices
        (title,type,description,startDate,endDate,pinned,status)
        VALUES(?,?,?,?,?,?,?)`,

        [

            title,

            type,

            description,

            startDate,

            endDate,

            pinned ? 1 : 0,

            status

        ],

        function (err) {

            if (err) {

                console.log(err);

                return res.status(500).json(err);

            }

            res.json({

                success: true,

                message: "Notice Added",

                id: this.lastID

            });

        }

    );

};

/* ===============================
        Update Notice
================================ */

const updateNotice = (req, res) => {

    const {

        title,

        type,

        description,

        startDate,

        endDate,

        pinned,

        status

    } = req.body;

    db.run(

        `UPDATE notices
        SET
        title=?,
        type=?,
        description=?,
        startDate=?,
        endDate=?,
        pinned=?,
        status=?
        WHERE id=?`,

        [

            title,

            type,

            description,

            startDate,

            endDate,

            pinned ? 1 : 0,

            status,

            req.params.id

        ],

        function (err) {

            if (err) {

                console.log(err);

                return res.status(500).json(err);

            }

            res.json({

                success: true,

                message: "Notice Updated"

            });

        }

    );

};

/* ===============================
        Delete Notice
================================ */

const deleteNotice = (req, res) => {

    db.run(

        "DELETE FROM notices WHERE id=?",

        [req.params.id],

        function (err) {

            if (err) {

                console.log(err);

                return res.status(500).json(err);

            }

            res.json({

                success: true,

                message: "Notice Deleted"

            });

        }

    );

};

module.exports = {

    getNotices,

    addNotice,

    updateNotice,

    deleteNotice

};