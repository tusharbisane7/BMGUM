const db = require("../config/db");

// ================= GET ALL AARTI =================

const getAarti = (req, res) => {

    db.all(

        "SELECT * FROM aarti ORDER BY date ASC",

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

// ================= ADD AARTI =================

const addAarti = (req, res) => {

    const {

        name,

        day,

        date,

        time,

        performedBy,

        type,

        status

    } = req.body;

    db.run(

        `INSERT INTO aarti
        (name,day,date,time,performedBy,type,status)
        VALUES(?,?,?,?,?,?,?)`,

        [

            name,

            day,

            date,

            time,

            performedBy,

            type,

            status

        ],

        function(err){

            if(err){

                console.log(err);

                return res.status(500).json(err);

            }

            res.json({

                success:true,

                message:"Aarti Added",

                id:this.lastID

            });

        }

    );

};

// ================= DELETE =================

const deleteAarti = (req,res)=>{

    db.run(

        "DELETE FROM aarti WHERE id=?",

        [req.params.id],

        function(err){

            if(err){

                return res.status(500).json(err);

            }

            res.json({

                success:true,

                message:"Aarti Deleted"

            });

        }

    );

};

module.exports={

    getAarti,

    addAarti,

    deleteAarti

};