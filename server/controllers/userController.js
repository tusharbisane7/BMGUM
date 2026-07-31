const pool = require("../config/neon");
const bcrypt = require("bcrypt");

/* ==========================================================
   CHECK USERNAME
========================================================== */

const checkUsername = async (req, res) => {

    try {

        const username = req.params.username
            .trim()
            .toLowerCase();

        if (!username) {

            return res.status(400).json({

                available: false,

                message: "Username is required"

            });

        }

        const result = await pool.query(

            "SELECT username FROM users WHERE username = $1",

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

            "SELECT id FROM users WHERE username = $1",

            [

                username.toLowerCase()

            ]

        );

        if (check.rows.length > 0) {

            return res.status(400).json({

                success: false,

                message: "Username already exists."

            });

        }

        const hashedPassword = await bcrypt.hash(

            password,

            10

        );

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
            (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7
            )
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

                age || null,

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

        console.error("REGISTER ERROR");

        console.error(err);

        return res.status(500).json({

            success: false,

            message: err.message,

            error: err

        });

    }

};



/* ==========================================================
   GET ALL USERS
========================================================== */
/* ==========================================================
   GET ALL USERS
========================================================== */

const getUsers = async (req, res) => {

    try {

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

        return res.status(200).json(result.rows);

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
   GET USER BY ID
========================================================== */
/* ==========================================================
   GET USER BY ID
========================================================== */

const getUserById = async (req, res) => {

    try {

        const { id } = req.params;

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
             WHERE id = $1`,

            [id]

        );

        if (result.rows.length === 0) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }

        return res.status(200).json(result.rows[0]);

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
   UPDATE USER
========================================================== */
/* ==========================================================
   UPDATE USER
========================================================== */

const updateUser = async (req, res) => {

    try {

        const { id } = req.params;

        const {

            full_name,

            mobile,

            age,

            address

        } = req.body;

        if (

            !full_name ||

            !mobile ||

            !address

        ) {

            return res.status(400).json({

                success: false,

                message: "Please fill all required fields."

            });

        }

        const result = await pool.query(

            `UPDATE users
             SET
                full_name = $1,
                mobile = $2,
                age = $3,
                address = $4
             WHERE id = $5
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

                full_name,

                mobile,

                age || null,

                address,

                id

            ]

        );

        if (result.rows.length === 0) {

            return res.status(404).json({

                success: false,

                message: "User not found."

            });

        }

        return res.status(200).json({

            success: true,

            message: "Profile updated successfully.",

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
/* ==========================================================
   DELETE USER
========================================================== */

const deleteUser = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(

            `DELETE FROM users
             WHERE id = $1
             RETURNING id`,

            [

                id

            ]

        );

        if (result.rows.length === 0) {

            return res.status(404).json({

                success: false,

                message: "User not found."

            });

        }

        return res.status(200).json({

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
/* ==========================================================
   RESET PASSWORD
========================================================== */

const resetPassword = async (req, res) => {

    try {

        const { password } = req.body;

        const { id } = req.params;

        if (!password) {

            return res.status(400).json({

                success: false,

                message: "Password is required."

            });

        }

        const hashedPassword = await bcrypt.hash(

            password,

            10

        );

        const result = await pool.query(

            `UPDATE users
             SET
                password = $1
             WHERE id = $2
             RETURNING id`,

            [

                hashedPassword,

                id

            ]

        );

        if (result.rows.length === 0) {

            return res.status(404).json({

                success: false,

                message: "User not found."

            });

        }

        return res.status(200).json({

            success: true,

            message: "Password updated successfully."

        });

    }

  catch (err) {

    console.error("UPDATE USER ERROR");
    console.error(err);

    return res.status(500).json({
        success: false,
        message: err.message,
        error: err
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