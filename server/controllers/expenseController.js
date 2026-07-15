const pool = require("../config/neon");

// ================= GET ALL EXPENSES =================

const getExpenses = async (req, res) => {

    try {

        const result = await pool.query(`
            SELECT
                id,
                title,
                amount,
                category,
                description,
                date,
                time,
                bill,
                createdat AS "createdAt"
            FROM expenses
            ORDER BY id DESC
        `);

        res.json(result.rows);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

// ================= EXPENSE SUMMARY =================

const getExpenseSummary = async (req, res) => {

    try {

        const total = await pool.query(`
            SELECT
                COALESCE(SUM(amount),0) AS "totalExpense",
                COUNT(*) AS "totalEntries"
            FROM expenses
        `);

        const today = new Date().toISOString().split("T")[0];

        const todayData = await pool.query(`
            SELECT
                COALESCE(SUM(amount),0) AS "todayExpense"
            FROM expenses
            WHERE date=$1
        `,[today]);

        res.json({

            totalExpense:Number(total.rows[0].totalExpense),

            totalEntries:Number(total.rows[0].totalEntries),

            todayExpense:Number(todayData.rows[0].todayExpense)

        });

    }

    catch(err){

        console.log(err);

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};

// ================= ADD EXPENSE =================

const addExpense = async (req,res)=>{

try{

const{

title,

amount,

category,

description,

date,

time

}=req.body;

const bill=req.file?req.file.filename:null;

const result=await pool.query(

`INSERT INTO expenses
(
title,
amount,
category,
description,
date,
time,
bill
)
VALUES($1,$2,$3,$4,$5,$6,$7)
RETURNING id`,

[
title,
Number(amount),
category,
description,
date,
time,
bill
]

);

res.json({

success:true,

message:"Expense Added Successfully",

id:result.rows[0].id

});

}

catch(err){

console.log(err);

res.status(500).json({

success:false,

message:err.message

});

}

};

// ================= UPDATE EXPENSE =================

const updateExpense = async(req,res)=>{

try{

const{

title,

amount,

category,

description,

date,

time

}=req.body;

const old=await pool.query(

"SELECT bill FROM expenses WHERE id=$1",

[req.params.id]

);

const bill=req.file

?req.file.filename

:(old.rows.length>0?old.rows[0].bill:null);

await pool.query(

`UPDATE expenses
SET
title=$1,
amount=$2,
category=$3,
description=$4,
date=$5,
time=$6,
bill=$7
WHERE id=$8`,

[
title,
Number(amount),
category,
description,
date,
time,
bill,
req.params.id
]

);

res.json({

success:true,

message:"Expense Updated Successfully"

});

}

catch(err){

console.log(err);

res.status(500).json({

success:false,

message:err.message

});

}

};

// ================= DELETE EXPENSE =================

const deleteExpense=async(req,res)=>{

try{

await pool.query(

"DELETE FROM expenses WHERE id=$1",

[req.params.id]

);

res.json({

success:true,

message:"Expense Deleted Successfully"

});

}

catch(err){

console.log(err);

res.status(500).json({

success:false,

message:err.message

});

}

};

module.exports={

getExpenses,

getExpenseSummary,

addExpense,

updateExpense,

deleteExpense

};