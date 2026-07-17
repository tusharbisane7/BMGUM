const pool = require("../config/neon");

// ================= GET LIVE MEETING =================

const getLiveMeeting = async (req, res) => {

    try {

        const result = await pool.query(

            `SELECT
                id,
                title,
                roomname AS "roomName",
                meetinglink AS "meetingLink",
                status,
                startedat AS "startedAt"
             FROM meetings
             WHERE status='Live'
             ORDER BY id DESC
             LIMIT 1`

        );

        if (result.rows.length === 0) {

            return res.json({

                success: true,

                live: false

            });

        }

        res.json({

            success: true,

            live: true,

            meeting: result.rows[0]

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

// ================= GET ALL MEETINGS =================

const getMeetings = async (req, res) => {

    try {

        const result = await pool.query(

            `SELECT
                id,
                title,
                roomname AS "roomName",
                meetinglink AS "meetingLink",
                status,
                createdat AS "createdAt",
                startedat AS "startedAt",
                endedat AS "endedAt"
             FROM meetings
             ORDER BY id DESC`

        );

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

// ================= CREATE MEETING =================

const createMeeting = async (req, res) => {

    try {

        const {

            title,

            roomName

        } = req.body;

        const meetingLink =

            `/meeting/${roomName}`;

        const result = await pool.query(

            `INSERT INTO meetings
            (
                title,
                roomname,
                meetinglink
            )
            VALUES($1,$2,$3)
            RETURNING id`,

            [

                title,

                roomName,

                meetingLink

            ]

        );

        res.json({

            success: true,

            id: result.rows[0].id,

            message:

            "Meeting Created Successfully"

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

// ================= UPDATE MEETING =================

const updateMeeting = async (req, res) => {

    try {

        const {

            title,

            roomName

        } = req.body;

        await pool.query(

            `UPDATE meetings
             SET
                title=$1,
                roomname=$2,
                meetinglink=$3
             WHERE id=$4`,

            [

                title,

                roomName,

                `/meeting/${roomName}`,

                req.params.id

            ]

        );

        res.json({

            success: true,

            message:

            "Meeting Updated Successfully"

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
// ================= START MEETING =================

const startMeeting = async (req, res) => {

    try {

        await pool.query(

            "UPDATE meetings SET status='Offline'"

        );

        await pool.query(

            `UPDATE meetings
             SET
                status='Live',
                startedat=NOW(),
                endedat=NULL
             WHERE id=$1`,

            [

                req.params.id

            ]

        );

        res.json({

            success:true,

            message:"Meeting Started Successfully"

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

// ================= END MEETING =================

const endMeeting = async (req,res)=>{

    try{

        await pool.query(

            `UPDATE meetings
             SET
                status='Offline',
                endedat=NOW()
             WHERE id=$1`,

            [

                req.params.id

            ]

        );

        res.json({

            success:true,

            message:"Meeting Ended Successfully"

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

// ================= DELETE MEETING =================

const deleteMeeting = async (req,res)=>{

    try{

        await pool.query(

            "DELETE FROM meetings WHERE id=$1",

            [

                req.params.id

            ]

        );

        res.json({

            success:true,

            message:"Meeting Deleted Successfully"

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

// ================= COPY LINK =================

const getMeetingLink = async (req,res)=>{

    try{

        const result=await pool.query(

            `SELECT
                meetinglink AS "meetingLink"
             FROM meetings
             WHERE id=$1`,

            [

                req.params.id

            ]

        );

        if(result.rows.length===0){

            return res.status(404).json({

                success:false,

                message:"Meeting Not Found"

            });

        }

        res.json({

            success:true,

            meetingLink:result.rows[0].meetingLink

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

// ================= EXPORTS =================

module.exports={

    getLiveMeeting,

    getMeetings,

    createMeeting,

    updateMeeting,

    startMeeting,

    endMeeting,

    deleteMeeting,

    getMeetingLink

};
