const pool = require("../config/neon");

const getDashboard = async (req,res)=>{

try{

const donation=await pool.query(`
SELECT
COALESCE(SUM(amount),0) AS "totalDonation",
COUNT(*) AS "totalDonors"
FROM donations
`);

const expense=await pool.query(`
SELECT
COALESCE(SUM(amount),0) AS "totalExpense"
FROM expenses
`);

const noticeCount=await pool.query(`
SELECT
COUNT(*) AS "activeNotices"
FROM notices
WHERE status='Active'
`);

const recentDonations=await pool.query(`
SELECT
id,
donorname AS "donorName",
amount,
pendingamount AS "pendingAmount",
date,
time,
receipt
FROM donations
ORDER BY id DESC
LIMIT 5
`);

const recentExpenses=await pool.query(`
SELECT
id,
title,
amount,
category,
date,
time,
bill
FROM expenses
ORDER BY id DESC
LIMIT 5
`);

const notices=await pool.query(`
SELECT
id,
title,
type,
description,
startdate AS "startDate",
enddate AS "endDate",
pinned,
status
FROM notices
ORDER BY id DESC
LIMIT 5
`);

const totalDonation=Number(donation.rows[0].totalDonation);

const totalExpense=Number(expense.rows[0].totalExpense);

res.json({

totalDonation,

totalExpense,

balance:totalDonation-totalExpense,

totalDonors:Number(donation.rows[0].totalDonors),

activeNotices:Number(noticeCount.rows[0].activeNotices),

recentDonations:recentDonations.rows,

recentExpenses:recentExpenses.rows,

notices:notices.rows

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

getDashboard

};