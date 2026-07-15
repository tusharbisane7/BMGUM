require("dotenv").config();

const pool = require("../config/neon");
const bcrypt = require("bcryptjs");
async function seedUsers() {
  try {
    const users = [
      {
        username: "tushar",
        password: "2004",
        role: "Super Admin",
      },
      {
        username: "darshan",
        password: "2002",
        role: "Admin",
      },
      {
        username: "manish",
        password: "2003",
        role: "Admin",
      },
      {
        username: "vedant",
        password: "2003",
        role: "Admin",
      },
      {
        username: "gopal",
        password: "2005",
        role: "Admin",
      },
      {
        username: "pranay",
        password: "2006",
        role: "Admin",
      },
    ];

    for (const user of users) {
      const hash = await bcrypt.hash(user.password, 10);

      await pool.query(
        `
        INSERT INTO users (username, password, role)
        VALUES ($1,$2,$3)
        ON CONFLICT (username) DO NOTHING
        `,
        [user.username, hash, user.role]
      );

      console.log(`✅ ${user.username} added`);
    }

    console.log("🎉 All users created successfully.");

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedUsers();