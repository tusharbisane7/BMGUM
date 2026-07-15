const pool = require("../config/neon");

// ================= HOME DATA =================

const getHomeData = async (req, res) => {

    try {

        const donation = await pool.query(`
            SELECT
                COALESCE(SUM(amount),0) AS "totalDonation",
                COUNT(*) AS "totalDonors"
            FROM donations
        `);

        const expense = await pool.query(`
            SELECT
                COALESCE(SUM(amount),0) AS "totalExpense"
            FROM expenses
        `);

        const notices = await pool.query(`
            SELECT
                id,
                title,
                description,
                startdate AS "startDate",
                enddate AS "endDate"
            FROM notices
            WHERE status='Active'
            ORDER BY id DESC
            LIMIT 5
        `);

        const recentDonations = await pool.query(`
            SELECT
                donorname AS "donorName",
                amount,
                date
            FROM donations
            ORDER BY id DESC
            LIMIT 5
        `);

        const recentExpenses = await pool.query(`
            SELECT
                title,
                amount,
                date
            FROM expenses
            ORDER BY id DESC
            LIMIT 5
        `);

        const totalDonation = Number(donation.rows[0].totalDonation);
        const totalExpense = Number(expense.rows[0].totalExpense);

        res.json({

            totalDonation,

            totalExpense,

            balance: totalDonation - totalExpense,

            totalDonors: Number(donation.rows[0].totalDonors),

            recentDonations: recentDonations.rows,

            recentExpenses: recentExpenses.rows,

            notices: notices.rows

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

    getHomeData

};