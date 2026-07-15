const db = require("../config/db");

const getDashboard = (req, res) => {

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

    // Total Donation
    db.get(
        "SELECT IFNULL(SUM(amount),0) AS totalDonation, COUNT(*) AS totalDonors FROM donations",
        [],
        (err, donation) => {

            if (err) {

                console.log(err);

                return res.status(500).json(err);

            }

            dashboard.totalDonation = donation.totalDonation || 0;
            dashboard.totalDonors = donation.totalDonors || 0;

            // Total Expense
            db.get(
                "SELECT IFNULL(SUM(amount),0) AS totalExpense FROM expenses",
                [],
                (err, expense) => {

                    if (err) {

                        console.log(err);

                        return res.status(500).json(err);

                    }

                    dashboard.totalExpense = expense.totalExpense || 0;

                    dashboard.balance =
                        dashboard.totalDonation -
                        dashboard.totalExpense;

                    // Notice Count
                    db.get(
                        "SELECT COUNT(*) AS activeNotices FROM notices",
                        [],
                        (err, noticeCount) => {

                            if (err) {

                                console.log(err);

                                return res.status(500).json(err);

                            }

                            dashboard.activeNotices =
                                noticeCount.activeNotices || 0;

                            // Recent Donations
                            db.all(
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
                                 LIMIT 5`,
                                [],
                                (err, donations) => {

                                    if (err) {

                                        console.log(err);

                                        return res.status(500).json(err);

                                    }

                                    dashboard.recentDonations = donations;

                                    // Recent Expenses
                                    db.all(
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
                                         LIMIT 5`,
                                        [],
                                        (err, expenses) => {

                                            if (err) {

                                                console.log(err);

                                                return res.status(500).json(err);

                                            }

                                            dashboard.recentExpenses = expenses;

                                            // Notices
                                            db.all(
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
                                                 LIMIT 5`,
                                                [],
                                                (err, notices) => {

                                                    if (err) {

                                                        console.log(err);

                                                        return res.status(500).json(err);

                                                    }

                                                    dashboard.notices = notices;

                                                    res.json(dashboard);

                                                }
                                            );

                                        }
                                    );

                                }
                            );

                        }
                    );

                }
            );

        }
    );

};

module.exports = {

    getDashboard

};