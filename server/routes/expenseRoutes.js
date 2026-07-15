const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const {

    getExpenses,
    getExpenseSummary,
    addExpense,
    updateExpense,
    deleteExpense

} = require("../controllers/expenseController");

const storage = multer.diskStorage({

    destination:"uploads/bills",

    filename:(req,file,cb)=>{

        cb(

            null,

            Date.now()+path.extname(file.originalname)

        );

    }

});

const upload = multer({

    storage

});

// ================= ROUTES =================

router.get("/", getExpenses);

router.get("/summary", getExpenseSummary);

router.post(

    "/",

    upload.single("bill"),

    addExpense

);

router.put(

    "/:id",

    upload.single("bill"),

    updateExpense

);

router.delete(

    "/:id",

    deleteExpense

);

module.exports = router;