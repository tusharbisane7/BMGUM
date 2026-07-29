const pool = require("../config/neon");
const bcrypt = require("bcrypt");

/* ==========================================================
   CHECK USERNAME
========================================================== */

const checkUsername = async (req, res) => {

    try {

        const username = req.params.username.trim().toLowerCase();

        if (!username) {

            return res.status(400).json({

                available: false,

                message: "Username is required"

            });

        }

        const result = await pool.query(

            "SELECT username FROM users WHERE username=$1",

            [username]

        );

        if (result.rows.length > 0) {

            return res.json({

                available: false,

                suggestions: [

                    username + "123",

                    username + "_01",

                    username + "2026",

                    username + Math.floor(Math.random() * 999)

                ]

            });

        }

        return res.json({

            available: true,

            suggestions: []

        });

    }

    catch (err) {

        console.error(err);

        return res.status(500).json({

            available: false,

            message: "Server Error"

        });

    }

};


/* ==========================================================
   REGISTER USER
========================================================== */

const registerUser = async (req, res) => {

    try {

        const {

            fullName,

            username,

            password,

            age,

            mobile,

            address,

            role

        } = req.body;

        if (

            !fullName ||

            !username ||

            !password ||

            !mobile ||

            !address

        ) {

            return res.status(400).json({

                success: false,

                message: "Please fill all required fields."

            });

        }

        const check = await pool.query(

            "SELECT id FROM users WHERE username=$1",

            [username.toLowerCase()]

        );

        if (check.rows.length > 0) {

            return res.status(400).json({

                success: false,

                message: "Username already exists."

            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);
                const result = await pool.query(

            `INSERT INTO users
            (
                full_name,
                username,
                password,
                age,
                mobile,
                address,
                role
            )
            VALUES
            ($1,$2,$3,$4,$5,$6,$7)
            RETURNING
            id,
            full_name,
            username,
            age,
            mobile,
            address,
            role,
            created_at`,

            [

                fullName,

                username.toLowerCase(),

                hashedPassword,

                age,

                mobile,

                address,

                role || "Member"

            ]

        );

        return res.status(201).json({

            success: true,

            message: "User registered successfully.",

            user: result.rows[0]

        });

    }

    catch (err) {

    console.error("REGISTER ERROR:");
    console.error(err);

    return res.status(500).json({
        success:false,
        message: err.message,
        error: err
    });



    }

};


/* ==========================================================
   GET ALL USERS
========================================================== */

const getUsers = async(req,res)=>{

    try{

        const result = await pool.query(

            `SELECT
                id,
                full_name,
                username,
                age,
                mobile,
                address,
                role,
                created_at
             FROM users
             ORDER BY created_at DESC`

        );

        return res.json(result.rows);

    }

    catch(err){

        console.error(err);

        return res.status(500).json({

            message:"Internal Server Error"

        });

    }

};


/* ==========================================================
   GET USER BY ID
========================================================== */

const getUserById = async(req,res)=>{

    try{

        const result = await pool.query(

            `SELECT
                id,
                full_name,
                username,
                age,
                mobile,
                address,
                role,
                created_at
             FROM users
             WHERE id=$1`,

            [req.params.id]

        );

        if(result.rows.length===0){

            return res.status(404).json({

                message:"User not found"

            });

        }

        return res.json(result.rows[0]);

    }

    catch(err){

        console.error(err);

        return res.status(500).json({

            message:"Internal Server Error"

        });

    }

};
/* ==========================================================
   UPDATE USER
========================================================== */

const updateUser = async (req, res) => {

    try {

        const {
            fullName,
            age,
            mobile,
            address,
            role
        } = req.body;

        const result = await pool.query(

            `UPDATE users
             SET
                full_name = $1,
                age = $2,
                mobile = $3,
                address = $4,
                role = $5
             WHERE id = $6
             RETURNING
                id,
                full_name,
                username,
                age,
                mobile,
                address,
                role,
                created_at`,

            [
                fullName,
                age,
                mobile,
                address,
                role,
                req.params.id
            ]

        );

        if (result.rows.length === 0) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }

        return res.json({

            success: true,

            message: "User updated successfully.",

            user: result.rows[0]

        });

    }

    catch (err) {

        console.error(err);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};


/* ==========================================================
   DELETE USER
========================================================== */

const deleteUser = async (req, res) => {

    try {

        const result = await pool.query(

            "DELETE FROM users WHERE id=$1 RETURNING id",

            [req.params.id]

        );

        if (result.rows.length === 0) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }

        return res.json({

            success: true,

            message: "User deleted successfully."

        });

    }

    catch (err) {

        console.error(err);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};


/* ==========================================================
   RESET PASSWORD
========================================================== */

const resetPassword = async (req, res) => {

    try {

        const { password } = req.body;

        if (!password) {

            return res.status(400).json({

                success: false,

                message: "Password is required."

            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(

            `UPDATE users
             SET password = $1
             WHERE id = $2
             RETURNING id`,

            [
                hashedPassword,
                req.params.id
            ]

        );

        if (result.rows.length === 0) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }

        return res.json({

            success: true,

            message: "Password updated successfully."

        });

    }

    catch (err) {

        console.error(err);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};


/* ==========================================================
   EXPORTS
========================================================== */

module.exports = {

    checkUsername,

    registerUser,

    getUsers,

    getUserById,

    updateUser,

    deleteUser,

    resetPassword

};