const pool = require("../config/neon");

async function createTables() {

    try {

        // ================= USERS =================

        await pool.query(`

            CREATE TABLE IF NOT EXISTS users(

                id SERIAL PRIMARY KEY,

                username VARCHAR(100) UNIQUE NOT NULL,

                password TEXT NOT NULL,

                role VARCHAR(50) NOT NULL

            )

        `);

        // ================= DONATIONS =================

        await pool.query(`

            CREATE TABLE IF NOT EXISTS donations(

                id SERIAL PRIMARY KEY,

                donorName VARCHAR(150) NOT NULL,

                mobile VARCHAR(20),

                amount INTEGER NOT NULL,

                pendingAmount INTEGER DEFAULT 0,

                date DATE,

                time VARCHAR(20),

                receipt TEXT,

                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP

            )

        `);

        // ================= EXPENSES =================

        await pool.query(`

            CREATE TABLE IF NOT EXISTS expenses(

                id SERIAL PRIMARY KEY,

                title VARCHAR(200) NOT NULL,

                amount INTEGER NOT NULL,

                category VARCHAR(100),

                description TEXT,

                date DATE,

                time VARCHAR(20),

                bill TEXT,

                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP

            )

        `);

        // ================= NOTICES =================

        await pool.query(`

            CREATE TABLE IF NOT EXISTS notices(

                id SERIAL PRIMARY KEY,

                title VARCHAR(200) NOT NULL,

                type VARCHAR(100),

                description TEXT,

                startDate DATE,

                endDate DATE,

                pinned BOOLEAN DEFAULT FALSE,

                status VARCHAR(50),

                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP

            )

        `);

        // ================= COMMITTEE =================

        await pool.query(`

            CREATE TABLE IF NOT EXISTS committee(

                id SERIAL PRIMARY KEY,

                name VARCHAR(150),

                designation VARCHAR(150),

                photo TEXT

            )

        `);

        // ================= TIMELINE =================

        await pool.query(`

            CREATE TABLE IF NOT EXISTS timeline(

                id SERIAL PRIMARY KEY,

                title VARCHAR(200),

                eventDate DATE,

                description TEXT

            )

        `);

        // ================= AARTI =================

        await pool.query(`

            CREATE TABLE IF NOT EXISTS aarti(

                id SERIAL PRIMARY KEY,

                name VARCHAR(200),

                day VARCHAR(50),

                date DATE,

                time VARCHAR(50),

                performedBy VARCHAR(150),

                type VARCHAR(100),

                status VARCHAR(50),

                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP

            )

        `);

        console.log("✅ All Neon Tables Created Successfully");

        process.exit();

    }

    catch(err){

        console.log(err);

        process.exit(1);

    }

}

createTables();