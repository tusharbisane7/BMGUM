const bcrypt = require("bcryptjs");
const db = require("../config/db");

const users = [
  { username: "tushar", password: "2004", role: "Super Admin" },
  { username: "darshan", password: "2002", role: "Admin" },
  { username: "manish", password: "2003", role: "Admin" },
  { username: "vedant", password: "2003", role: "Admin" },
  { username: "gopal", password: "2005", role: "Admin" },
  { username: "pranay", password: "2006", role: "Admin" }
];

users.forEach(async (user) => {

  const hash = await bcrypt.hash(user.password, 10);

  db.run(
    `INSERT OR IGNORE INTO users(username,password,role)
     VALUES(?,?,?)`,
    [user.username, hash, user.role]
  );

});

console.log("✅ Default Admin Users Created");