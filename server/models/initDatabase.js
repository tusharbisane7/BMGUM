const db = require("../config/db");

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS users (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            username TEXT UNIQUE NOT NULL,

            password TEXT NOT NULL,

            role TEXT NOT NULL

        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS donations (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            donorName TEXT NOT NULL,

            mobile TEXT,

            amount INTEGER NOT NULL,

            pendingAmount INTEGER DEFAULT 0,

            date TEXT,

            time TEXT,

            receipt TEXT,

            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP

        )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS expenses(

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    title TEXT NOT NULL,

    amount INTEGER NOT NULL,

    category TEXT,

    description TEXT,

    date TEXT,

    time TEXT,

    bill TEXT,

    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP

);
    `);

    db.run(`
CREATE TABLE IF NOT EXISTS notices(

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    title TEXT NOT NULL,

    type TEXT,

    description TEXT,

    startDate TEXT,

    endDate TEXT,

    pinned INTEGER DEFAULT 0,

    status TEXT,

    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP

)

    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS committee (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            name TEXT,

            designation TEXT,

            photo TEXT

        )
    `);

   db.run(`
CREATE TABLE IF NOT EXISTS timeline(

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    title TEXT NOT NULL,

    icon TEXT,

    eventDate TEXT,

    description TEXT

)
`);
    
    db.run(`
    CREATE TABLE IF NOT EXISTS aarti (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        name TEXT NOT NULL,

        day TEXT NOT NULL,

        date TEXT NOT NULL,

        time TEXT NOT NULL,

        performedBy TEXT NOT NULL,

        type TEXT NOT NULL,

        status TEXT DEFAULT 'आगामी',

        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP

    )
`);

    console.log("✅ Database Tables Created");

});