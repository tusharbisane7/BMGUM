require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

/* SQLite (Current Backend) */





/* Neon Connection (for migrated modules) */
require("./config/neon");

/* Routes */
const authRoutes = require("./routes/authRoutes");
const donationRoutes = require("./routes/donationRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const homeRoutes = require("./routes/homeRoutes");
const aartiRoutes = require("./routes/aartiRoutes");
const timelineRoutes = require("./routes/timelineRoutes");
const sponsorRoutes = require("./routes/sponsorRoutes");
const volunteerRoutes = require("./routes/volunteerRoutes");
const visitorRoutes = require("./routes/visitorRoutes");
const meetingRoutes = require("./routes/meetingRoutes");
const complaintRoutes = require("./routes/complaintRoutes");


app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/aarti", aartiRoutes);
app.use("/api/timeline", timelineRoutes);
app.use("/api/sponsors", sponsorRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/visitor", visitorRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/complaints", complaintRoutes);


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

app.listen(process.env.PORT || 5000, () => {

    console.log(`🚀 Server Running on Port ${process.env.PORT || 5000}`);

});