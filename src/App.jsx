
import { Routes, Route } from "react-router-dom";

import PublicLayout from "./components/PublicLayout";

// ================= SCROLL =================

import ScrollToTop from "./components/ScrollToTop";

// ================= PUBLIC PAGES =================

import Home from "./pages/Home";
import Donation from "./pages/Donation";
import Expense from "./pages/Expense";
import AartiPage from "./pages/AartiPage";
import Login from "./pages/Login";
import VolunteerRegistration from "./pages/VolunteerRegistration";
import Complaint from "./pages/Complaint";
import PrintVolunteer from "./pages/PrintVolunteer";
import UserRegister from "./pages/UserRegister";
import AdminRegister from "./pages/AdminRegister";
import UserLogin from "./pages/UserLogin";
import UserProfile from "./pages/UserProfile";
import MyDonations from "./pages/MyDonations";
import UTRVerification from "./pages/UTRVerification";

// ================= COMPONENTS =================

import Volunteers from "./components/Volunteers";
import MeetingRoom from "./components/MeetingRoom";

// ================= ADMIN =================

import Dashboard from "./admin/Dashboard";
import DonationManagement from "./admin/DonationManagement";
import ExpenseManagement from "./admin/ExpenseManagement";
import NoticeManagement from "./admin/NoticeManagement";
import TimelineManagement from "./admin/TimelineManagement";
import AartiManagement from "./admin/AartiManagement";
import VolunteerManagement from "./admin/VolunteerManagement";
import SponsorManagement from "./admin/SponsorManagement";
import MeetingManagement from "./admin/MeetingManagement";
import ComplaintManagement from "./admin/ComplaintManagement";
import UnderConstruction from "./admin/UnderConstruction";
import ChangePassword from "./admin/ChangePassword";
import OnlineDonation from "./pages/Donation/OnlineDonation";
import UserManagement from "./admin/UserManagement";
import UPIDonationManagement from "./admin/UPIDonationManagement";


// ============================================================
// APP
// ============================================================

function App() {
    return (
        <>

            {/* ==================================================
                SCROLL TO TOP ON EVERY ROUTE CHANGE
            ================================================== */}

            <ScrollToTop />


            {/* ==================================================
                ALL ROUTES
            ================================================== */}

            <Routes>

                {/* ==================================================
                    PUBLIC WEBSITE
                ================================================== */}

                <Route element={<PublicLayout />}>

                    {/* ================= HOME ================= */}

                    <Route
                        path="/"
                        element={<Home />}
                    />


                    {/* ================= DONATION ================= */}

                    <Route
                        path="/donation"
                        element={<Donation />}
                    />


                    {/* ================= EXPENSE ================= */}

                    <Route
                        path="/expense"
                        element={<Expense />}
                    />


                    {/* ================= AARTI ================= */}

                    <Route
                        path="/aarti"
                        element={<AartiPage />}
                    />


                    {/* ================= VOLUNTEER REGISTRATION ================= */}

                    <Route
                        path="/volunteer-registration"
                        element={<VolunteerRegistration />}
                    />


                    {/* ================= VOLUNTEERS ================= */}

                    <Route
                        path="/volunteers"
                        element={<Volunteers />}
                    />


                    {/* ================= COMPLAINT ================= */}

                    <Route
                        path="/complaint"
                        element={<Complaint />}
                    />


                    {/* ================= PRINT VOLUNTEER ================= */}

                    <Route
                        path="/print-volunteer"
                        element={<PrintVolunteer />}
                    />


                    {/* ================= USER REGISTER ================= */}

                    <Route
                        path="/register-user"
                        element={<UserRegister />}
                    />


                    {/* ================= ADMIN REGISTER ================= */}

                    <Route
                        path="/register-admin"
                        element={<AdminRegister />}
                    />


                    {/* ================= ONLINE DONATION ================= */}

                    <Route
                        path="/online-donation"
                        element={<OnlineDonation />}
                    />


                    {/* ================= MY DONATIONS ================= */}

                    <Route
                        path="/my-donations"
                        element={<MyDonations />}
                    />


                    {/* ================= VERIFY PAYMENT ================= */}

                    <Route
                        path="/verify-payment"
                        element={<UTRVerification />}
                    />

                </Route>


                {/* ==================================================
                    LOGIN
                ================================================== */}

                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* ==================================================
                    USER LOGIN
                ================================================== */}

                <Route
                    path="/user-login"
                    element={<UserLogin />}
                />


                {/* ==================================================
                    USER PROFILE
                ================================================== */}

                <Route
                    path="/profile"
                    element={<UserProfile />}
                />


                {/* ==================================================
                    MEETING
                ================================================== */}

                <Route
                    path="/meeting/:roomName"
                    element={<MeetingRoom />}
                />


                {/* ==================================================
                    ADMIN PANEL
                ================================================== */}

                <Route
                    path="/admin/dashboard"
                    element={<Dashboard />}
                />


                <Route
                    path="/admin/donations"
                    element={<DonationManagement />}
                />


                <Route
                    path="/admin/expenses"
                    element={<ExpenseManagement />}
                />


                <Route
                    path="/admin/notices"
                    element={<NoticeManagement />}
                />


                <Route
                    path="/admin/timeline"
                    element={<TimelineManagement />}
                />


                <Route
                    path="/admin/aarti"
                    element={<AartiManagement />}
                />


                <Route
                    path="/admin/volunteers"
                    element={<VolunteerManagement />}
                />


                <Route
                    path="/admin/sponsors"
                    element={<SponsorManagement />}
                />


                <Route
                    path="/admin/meetings"
                    element={<MeetingManagement />}
                />


                <Route
                    path="/admin/complaints"
                    element={<ComplaintManagement />}
                />


                <Route
                    path="/admin/committee"
                    element={<UnderConstruction />}
                />


                <Route
                    path="/admin/users"
                    element={<UserManagement />}
                />


                <Route
                    path="/admin/change-password"
                    element={<ChangePassword />}
                />


                <Route
                    path="/admin/upi-donations"
                    element={<UPIDonationManagement />}
                />


                {/* ==================================================
                    404 PAGE
                ================================================== */}

                <Route
                    path="*"
                    element={
                        <div
                            style={{
                                minHeight: "100vh",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                                fontFamily: "Poppins",
                            }}
                        >
                            <h1>404</h1>

                            <h2>
                                पृष्ठ सापडले नाही
                            </h2>

                            <p>
                                आपण शोधत असलेले पृष्ठ उपलब्ध नाही.
                            </p>
                        </div>
                    }
                />

            </Routes>

        </>
    );
}


export default App;

