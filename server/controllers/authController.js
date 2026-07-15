const pool = require("../config/neon");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= LOGIN =================

const login = async (req, res) => {

    try {

        const { username, password } = req.body;

        const result = await pool.query(

            `SELECT * FROM users
             WHERE username=$1`,

            [username]

        );

        if (result.rows.length === 0) {

            return res.status(401).json({

                success: false,

                message: "Invalid Username"

            });

        }

        const user = result.rows[0];

        const match = await bcrypt.compare(

            password,

            user.password

        );

        if (!match) {

            return res.status(401).json({

                success: false,

                message: "Invalid Password"

            });

        }

        const token = jwt.sign(

            {

                id: user.id,

                role: user.role

            },

            process.env.JWT_SECRET,

            {

                expiresIn: "1d"

            }

        );

        res.json({

            success: true,

            token,

            user: {

                id: user.id,

                username: user.username,

                role: user.role

            }

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

// ================= CHANGE PASSWORD =================

const changePassword = async (req, res) => {

    try {

        const {

            username,

            currentPassword,

            newPassword

        } = req.body;

        const result = await pool.query(

            `SELECT * FROM users
             WHERE username=$1`,

            [username]

        );

        if (result.rows.length === 0) {

            return res.status(404).json({

                success: false,

                message: "User Not Found"

            });

        }

        const user = result.rows[0];

        const match = await bcrypt.compare(

            currentPassword,

            user.password

        );

        if (!match) {

            return res.status(400).json({

                success: false,

                message: "Current Password is Incorrect"

            });

        }

        const hashedPassword = await bcrypt.hash(

            newPassword,

            10

        );

        await pool.query(

            `UPDATE users
             SET password=$1
             WHERE username=$2`,

            [

                hashedPassword,

                username

            ]

        );

        res.json({

            success: true,

            message: "Password Changed Successfully"

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

    login,

    changePassword

};