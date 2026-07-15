const db = require("../config/db");

// ================= GET ALL EXPENSES =================

const getExpenses = (req, res) => {

    db.all(

        "SELECT * FROM expenses ORDER BY id DESC",

        [],

        (err, rows) => {

            if (err) {

                return res.status(500).json(err);

            }

            res.json(rows);

        }

    );

};

// ================= EXPENSE SUMMARY =================

const getExpenseSummary = (req, res) => {

    db.get(

        `SELECT
            IFNULL(SUM(amount),0) AS totalExpense,
            COUNT(*) AS totalEntries
         FROM expenses`,

        [],

        (err, total) => {

            if (err) {

                console.log(err);

                return res.status(500).json(err);

            }

            const today = new Date().toISOString().split("T")[0];

            db.get(

                `SELECT
                    IFNULL(SUM(amount),0) AS todayExpense
                 FROM expenses
                 WHERE date = ?`,

                [today],

                (err, todayData) => {

                    if (err) {

                        console.log(err);

                        return res.status(500).json(err);

                    }

                    res.json({

                        totalExpense: total.totalExpense || 0,

                        totalEntries: total.totalEntries || 0,

                        todayExpense: todayData.todayExpense || 0

                    });

                }

            );

        }

    );

};

// ================= ADD EXPENSE =================

const addExpense = (req, res) => {

    const {

        title,
        amount,
        category,
        description,
        date,
        time

    } = req.body;

    const bill = req.file ? req.file.filename : null;

    db.run(

        `INSERT INTO expenses
        (title,amount,category,description,date,time,bill)
        VALUES(?,?,?,?,?,?,?)`,

        [

            title,
            amount,
            category,
            description,
            date,
            time,
            bill

        ],

        function(err){

            if(err){

                console.log(err);

                return res.status(500).json(err);

            }

            res.json({

                success:true,

                message:"Expense Added",

                id:this.lastID

            });

        }

    );

};

// ================= UPDATE EXPENSE =================

const updateExpense = (req,res)=>{

    const{

        title,
        amount,
        category,
        description,
        date,
        time

    }=req.body;

    const bill=req.file ? req.file.filename : null;

    if(bill){

        db.run(

            `UPDATE expenses
            SET
            title=?,
            amount=?,
            category=?,
            description=?,
            date=?,
            time=?,
            bill=?
            WHERE id=?`,

            [

                title,
                amount,
                category,
                description,
                date,
                time,
                bill,
                req.params.id

            ],

            function(err){

                if(err){

                    return res.status(500).json(err);

                }

                res.json({

                    success:true,

                    message:"Expense Updated"

                });

            }

        );

    }

    else{

        db.run(

            `UPDATE expenses
            SET
            title=?,
            amount=?,
            category=?,
            description=?,
            date=?,
            time=?
            WHERE id=?`,

            [

                title,
                amount,
                category,
                description,
                date,
                time,
                req.params.id

            ],

            function(err){

                if(err){

                    console.log(err);

                    return res.status(500).json(err);

                }

                res.json({

                    success:true,

                    message:"Expense Updated"

                });

            }

        );

    }

};

// ================= DELETE EXPENSE =================

const deleteExpense=(req,res)=>{

    db.run(

        "DELETE FROM expenses WHERE id=?",

        [req.params.id],

        function(err){

            if(err){

                return res.status(500).json(err);

            }

            res.json({

                success:true,

                message:"Expense Deleted"

            });

        }

    );

};

module.exports={

    getExpenses,

    getExpenseSummary,

    addExpense,

    updateExpense,

    deleteExpense

};