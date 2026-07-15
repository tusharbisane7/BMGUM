const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = (req, res) => {

    const { username, password } = req.body;

    db.get(
        "SELECT * FROM users WHERE username=?",
        [username],
        async (err, user) => {

            if (err) {
                return res.status(500).json({ message: "Database Error" });
            }

            if (!user) {
                return res.status(401).json({ message: "Invalid Username" });
            }

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return res.status(401).json({ message: "Invalid Password" });
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
    );

};

const changePassword = (req, res) => {

    const {
        username,
        currentPassword,
        newPassword
    } = req.body;

    db.get(
        "SELECT * FROM users WHERE username=?",
        [username],
        async (err, user) => {

            if (err) {
                return res.status(500).json({
                    message: "Database Error"
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: "User Not Found"
                });
            }

            const match = await bcrypt.compare(
                currentPassword,
                user.password
            );

            if (!match) {
                return res.status(400).json({
                    message: "Current Password is Incorrect"
                });
            }

            const hashedPassword = await bcrypt.hash(
                newPassword,
                10
            );

            db.run(
                "UPDATE users SET password=? WHERE username=?",
                [hashedPassword, username],
                function (err) {

                    if (err) {
                        return res.status(500).json({
                            message: "Password Update Failed"
                        });
                    }

                    res.json({
                        success: true,
                        message: "Password Changed Successfully"
                    });

                }
            );

        }
    );

};

module.exports = {
    login,
    changePassword
};