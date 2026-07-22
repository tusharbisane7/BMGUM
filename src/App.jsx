import { Routes, Route } from "react-router-dom";

import PublicLayout from "./components/PublicLayout";

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


function App() {
  return (
    <Routes>

      {/* ================= PUBLIC WEBSITE ================= */}

      <Route element={<PublicLayout />}>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/donation"
          element={<Donation />}
        />

        <Route
          path="/expense"
          element={<Expense />}
        />

        <Route
          path="/aarti"
          element={<AartiPage />}
        />

        <Route
          path="/volunteer-registration"
          element={<VolunteerRegistration />}
        />

        <Route
          path="/volunteers"
          element={<Volunteers />}
        />

        <Route
          path="/complaint"
          element={<Complaint />}
        />

        <Route
          path="/print-volunteer"
          element={<PrintVolunteer />}
        />

        <Route
          path="/register-user"
          element={<UserRegister />}
        />

        <Route
          path="/register-admin"
          element={<AdminRegister />}
        />
<Route
    path="/online-donation"
    element={<OnlineDonation />}
/>

      </Route>

      {/* ================= LOGIN ================= */}

      <Route
        path="/login"
        element={<Login />}
      />

      {/* ================= MEETING ================= */}

      <Route
        path="/meeting/:roomName"
        element={<MeetingRoom />}
      />

      {/* ================= ADMIN PANEL ================= */}

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
        element={<UnderConstruction />}
      />

      <Route
        path="/admin/change-password"
        element={<ChangePassword />}
      />

      {/* ================= 404 PAGE ================= */}

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
            <h2>पृष्ठ सापडले नाही</h2>
          </div>
        }
      />

    </Routes>
  );
}

export default App;