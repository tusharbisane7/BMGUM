const pool = require("../config/neon");
const bcrypt = require("bcryptjs");

async function seed() {
    const users = [
        { username: "tushar", password: "2004", role: "Super Admin" },
        { username: "darshan", password: "2002", role: "Admin" },
        { username: "manish", password: "2003", role: "Admin" },
        { username: "vedant", password: "2003", role: "Admin" },
        { username: "gopal", password: "2005", role: "Admin" },
        { username: "pranay", password: "2006", role: "Admin" }
    ];

    for (const user of users) {
        const exists = await pool.query(
            "SELECT id FROM users WHERE username=$1",
            [user.username]
        );

        if (exists.rows.length === 0) {
            const hash = await bcrypt.hash(user.password, 10);

            await pool.query(
                `INSERT INTO users(username,password,role)
                 VALUES($1,$2,$3)`,
                [user.username, hash, user.role]
            );

            console.log(`✅ ${user.username} created`);
        }
    }

    console.log("✅ Default users seeded");
}

seed().catch(console.error);