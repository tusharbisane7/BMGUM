const pool = require("../config/neon");

// ================= DASHBOARD =================

const getDashboard = async (req, res) => {

    try {

        const dashboard = {

            totalDonation: 0,
            totalExpense: 0,
            balance: 0,
            totalDonors: 0,
            activeNotices: 0,
            recentDonations: [],
            recentExpenses: [],
            notices: []

        };

        // ================= DONATION =================

        const donation = await pool.query(

            `SELECT

                COALESCE(SUM(amount),0) AS totalDonation,

                COUNT(*) AS totalDonors

             FROM donations`

        );

        dashboard.totalDonation = Number(

            donation.rows[0].totaldonation

        );

        dashboard.totalDonors = Number(

            donation.rows[0].totaldonors

        );

        // ================= EXPENSE =================

        const expense = await pool.query(

            `SELECT

                COALESCE(SUM(amount),0) AS totalExpense

             FROM expenses`

        );

        dashboard.totalExpense = Number(

            expense.rows[0].totalexpense

        );

        dashboard.balance =

            dashboard.totalDonation -

            dashboard.totalExpense;

        // ================= NOTICES COUNT =================

        const noticeCount = await pool.query(

            `SELECT COUNT(*) AS activeNotices

             FROM notices`

        );

        dashboard.activeNotices = Number(

            noticeCount.rows[0].activenotices

        );

        // ================= RECENT DONATIONS =================

        const donations = await pool.query(

            `SELECT

                id,
                donorName,
                amount,
                pendingAmount,
                date,
                time,
                receipt

             FROM donations

             ORDER BY id DESC

             LIMIT 5`

        );

        dashboard.recentDonations = donations.rows;

        // ================= RECENT EXPENSES =================

        const expenses = await pool.query(

            `SELECT

                id,
                title,
                amount,
                category,
                date,
                time,
                bill

             FROM expenses

             ORDER BY id DESC

             LIMIT 5`

        );

        dashboard.recentExpenses = expenses.rows;

        // ================= RECENT NOTICES =================

        const notices = await pool.query(

            `SELECT

                id,
                title,
                type,
                description,
                startDate,
                endDate,
                pinned,
                status

             FROM notices

             ORDER BY id DESC

             LIMIT 5`

        );

        dashboard.notices = notices.rows;

        res.json(dashboard);

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

    getDashboard

};