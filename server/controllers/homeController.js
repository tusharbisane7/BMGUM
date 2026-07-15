const db = require("../config/db");

const getHomeData = (req, res) => {

    const homeData = {

        totalDonation: 0,

        totalExpense: 0,

        balance: 0,

        totalDonors: 0,

        recentDonations: [],

        recentExpenses: [],

        notices: []

    };

    // ================= TOTAL DONATION & DONORS =================

    db.get(

        `SELECT
            IFNULL(SUM(amount),0) AS totalDonation,
            COUNT(*) AS totalDonors
         FROM donations`,

        [],

        (err, donation) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    message: "Database Error"
                });

            }

            homeData.totalDonation = donation.totalDonation || 0;

            homeData.totalDonors = donation.totalDonors || 0;

            // ================= TOTAL EXPENSE =================

            db.get(

                `SELECT
                    IFNULL(SUM(amount),0) AS totalExpense
                 FROM expenses`,

                [],

                (err, expense) => {

                    if (err) {

                        console.log(err);

                        return res.status(500).json({
                            message: "Database Error"
                        });

                    }

                    homeData.totalExpense = expense.totalExpense || 0;

                    homeData.balance =
                        homeData.totalDonation -
                        homeData.totalExpense;

                    // ================= ACTIVE NOTICES =================

                    db.all(

                        `SELECT
                            id,
                            title,
                            description,
                            startDate,
                            endDate
                         FROM notices
                         WHERE status='Active'
                         ORDER BY id DESC
                         LIMIT 5`,

                        [],

                        (err, notices) => {

                            if (err) {

                                console.log(err);

                                return res.status(500).json({
                                    message: "Database Error"
                                });

                            }

                            homeData.notices = notices;

                            // ================= RECENT DONATIONS =================

                            db.all(

                                `SELECT
                                    donorName,
                                    amount,
                                    date
                                 FROM donations
                                 ORDER BY id DESC
                                 LIMIT 5`,

                                [],

                                (err, donations) => {

                                    if (err) {

                                        console.log(err);

                                        return res.status(500).json({
                                            message: "Database Error"
                                        });

                                    }

                                    homeData.recentDonations = donations;

                                    // ================= RECENT EXPENSES =================

                                    db.all(

                                        `SELECT
                                            title,
                                            amount,
                                            date
                                         FROM expenses
                                         ORDER BY id DESC
                                         LIMIT 5`,

                                        [],

                                        (err, expenses) => {

                                            if (err) {

                                                console.log(err);

                                                return res.status(500).json({
                                                    message: "Database Error"
                                                });

                                            }

                                            homeData.recentExpenses = expenses;

                                            res.json(homeData);

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

    getHomeData

};