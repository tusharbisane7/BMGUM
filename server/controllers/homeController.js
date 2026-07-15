const pool = require("../config/neon");

// ================= HOME DATA =================

const getHomeData = async (req, res) => {

    try {

        const homeData = {

            totalDonation: 0,

            totalExpense: 0,

            balance: 0,

            totalDonors: 0,

            recentDonations: [],

            recentExpenses: [],

            notices: []

        };

        // ================= TOTAL DONATION =================

        const donation = await pool.query(

            `SELECT

                COALESCE(SUM(amount),0) AS totalDonation,

                COUNT(*) AS totalDonors

             FROM donations`

        );

        homeData.totalDonation = Number(

            donation.rows[0].totaldonation

        );

        homeData.totalDonors = Number(

            donation.rows[0].totaldonors

        );

        // ================= TOTAL EXPENSE =================

        const expense = await pool.query(

            `SELECT

                COALESCE(SUM(amount),0) AS totalExpense

             FROM expenses`

        );

        homeData.totalExpense = Number(

            expense.rows[0].totalexpense

        );

        homeData.balance =

            homeData.totalDonation -

            homeData.totalExpense;

        // ================= ACTIVE NOTICES =================

        const notices = await pool.query(

            `SELECT

                id,

                title,

                description,

                startDate,

                endDate

             FROM notices

             WHERE status='Active'

             ORDER BY id DESC

             LIMIT 5`

        );

        homeData.notices = notices.rows;

        // ================= RECENT DONATIONS =================

        const donations = await pool.query(

            `SELECT

                donorName,

                amount,

                date

             FROM donations

             ORDER BY id DESC

             LIMIT 5`

        );

        homeData.recentDonations = donations.rows;

        // ================= RECENT EXPENSES =================

        const expenses = await pool.query(

            `SELECT

                title,

                amount,

                date

             FROM expenses

             ORDER BY id DESC

             LIMIT 5`

        );

        homeData.recentExpenses = expenses.rows;

        res.json(homeData);

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