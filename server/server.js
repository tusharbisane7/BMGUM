require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const app = express();
const donationRoutes=require("./routes/donationRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const homeRoutes = require("./routes/homeRoutes");
const aartiRoutes = require("./routes/aartiRoutes");
const timelineRoutes=require("./routes/timelineRoutes");

require("./config/db");
require("./models/initDatabase");
require("./models/seedUsers");

app.use(cors());

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/expenses", expenseRoutes);
app.use("/api/donations",donationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/aarti", aartiRoutes);
app.use("/api/timeline",timelineRoutes);


app.get("/", (req, res) => {

    res.send("BMGM Backend Running 🚀");

});

app.get("/api/server-time", (req, res) => {

    const now = new Date();

    res.json({

        date: now.toLocaleDateString("en-GB"),

        time: now.toLocaleTimeString("en-IN", {

            hour: "2-digit",

            minute: "2-digit",

            second: "2-digit",

            hour12: true

        })

    });

});
app.listen(process.env.PORT, () => {

    console.log(`Server Running on Port ${process.env.PORT}`);

});