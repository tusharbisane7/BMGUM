const pool = require("../config/neon");

// ================= GET ALL VOLUNTEERS =================

const getVolunteers = async (req, res) => {

    try {

        const result = await pool.query(

            `SELECT
                id,
                volunteerid AS "volunteerId",
                photo,
                fullname AS "fullName",
                mobile,
                age,
                gender,
                address,
                status,
                approvedby AS "approvedBy",
                createdat AS "createdAt"
             FROM volunteers
             ORDER BY id DESC`

        );

        res.json(result.rows);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};

// ================= GET APPROVED =================

const getApprovedVolunteers = async (req, res) => {

    try {

        const result = await pool.query(

            `SELECT
                volunteerid AS "volunteerId",
                photo,
                fullname AS "fullName",
                mobile,
                age,
                gender,
                address
             FROM volunteers
             WHERE status='Approved'
             ORDER BY fullname ASC`

        );

        res.json(result.rows);

    }

    catch(err){

        console.log(err);

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};

// ================= SUMMARY =================

const getVolunteerSummary = async(req,res)=>{

    try{

        const total=await pool.query(

            "SELECT COUNT(*) total FROM volunteers"

        );

        const pending=await pool.query(

            "SELECT COUNT(*) total FROM volunteers WHERE status='Pending'"

        );

        const approved=await pool.query(

            "SELECT COUNT(*) total FROM volunteers WHERE status='Approved'"

        );

        const rejected=await pool.query(

            "SELECT COUNT(*) total FROM volunteers WHERE status='Rejected'"

        );

        res.json({

            total:Number(total.rows[0].total),

            pending:Number(pending.rows[0].total),

            approved:Number(approved.rows[0].total),

            rejected:Number(rejected.rows[0].total)

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

// ================= REGISTER =================

const registerVolunteer = async(req,res)=>{

    try{

        const{

            fullName,

            mobile,

            age,

            gender,

            address

        }=req.body;

        const photo=req.file

            ? req.file.filename

            : null;

        const count=await pool.query(

            "SELECT COUNT(*) total FROM volunteers"

        );

        const nextId=

            Number(count.rows[0].total)+1;

        const volunteerId=

            `BMGM-2026-${

                String(nextId).padStart(4,"0")

            }`;

        const result=await pool.query(

            `INSERT INTO volunteers
            (
                volunteerid,
                photo,
                fullname,
                mobile,
                age,
                gender,
                address
            )
            VALUES($1,$2,$3,$4,$5,$6,$7)
            RETURNING id`,

            [

                volunteerId,

                photo,

                fullName,

                mobile,

                age,

                gender,

                address

            ]

        );

        res.json({

            success:true,

            id:result.rows[0].id,

            volunteerId,

            message:

            "Volunteer Registered Successfully"

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
// ================= UPDATE VOLUNTEER =================

const updateVolunteer = async (req, res) => {

    try {

        const {

            fullName,

            mobile,

            age,

            gender,

            address,

            status

        } = req.body;

        const old = await pool.query(

            "SELECT photo FROM volunteers WHERE id=$1",

            [

                req.params.id

            ]

        );

        const photo = req.file

            ? req.file.filename

            : old.rows[0]?.photo || null;

        await pool.query(

            `UPDATE volunteers
             SET
                photo=$1,
                fullname=$2,
                mobile=$3,
                age=$4,
                gender=$5,
                address=$6,
                status=$7
             WHERE id=$8`,

            [

                photo,

                fullName,

                mobile,

                age,

                gender,

                address,

                status,

                req.params.id

            ]

        );

        res.json({

            success: true,

            message: "Volunteer Updated Successfully"

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

// ================= APPROVE =================

const approveVolunteer = async (req, res) => {

    try {

        const { approvedBy } = req.body;

        await pool.query(

            `UPDATE volunteers
             SET
                status='Approved',
                approvedby=$1
             WHERE id=$2`,

            [

                approvedBy || "Admin",

                req.params.id

            ]

        );

        res.json({

            success: true,

            message: "Volunteer Approved"

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

// ================= REJECT =================

const rejectVolunteer = async (req, res) => {

    try {

        await pool.query(

            `UPDATE volunteers
             SET status='Rejected'
             WHERE id=$1`,

            [

                req.params.id

            ]

        );

        res.json({

            success: true,

            message: "Volunteer Rejected"

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

// ================= DELETE =================

const deleteVolunteer = async (req, res) => {

    try {

        await pool.query(

            "DELETE FROM volunteers WHERE id=$1",

            [

                req.params.id

            ]

        );

        res.json({

            success: true,

            message: "Volunteer Deleted Successfully"

        });

    }

 catch(err){

    console.error("Volunteer Delete Error:");

    console.error(err);

    res.status(500).json({

        success:false,

        message:err.message

    });

}

};   // <-- Missing this closing brace for deleteVolunteer

// ================= EXPORTS =================

module.exports = {

    getVolunteers,

    getApprovedVolunteers,

    getVolunteerSummary,

    registerVolunteer,

    updateVolunteer,

    approveVolunteer,

    rejectVolunteer,

    deleteVolunteer

};