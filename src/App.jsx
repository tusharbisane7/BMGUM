import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Location from "./components/Location";

import Home from "./pages/Home";
import Donation from "./pages/Donation";
import Expense from "./pages/Expense";
import AartiPage from "./pages/AartiPage";
import Login from "./pages/Login";
import VolunteerRegistration from "./pages/VolunteerRegistration";
import Complaint from "./pages/Complaint";

import Volunteers from "./components/Volunteers";
import MeetingRoom from "./components/MeetingRoom";

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
import PrintVolunteer from "./pages/PrintVolunteer";


function App() {
  return (
    <Routes>

      {/* ================= PUBLIC WEBSITE ================= */}

      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Home />
            <Location />
          </>
        }
      />

      <Route
        path="/donation"
        element={
          <>
            <Navbar />
            <Donation />
          </>
        }
      />

      <Route
        path="/expense"
        element={
          <>
            <Navbar />
            <Expense />
          </>
        }
      />

      <Route
        path="/aarti"
        element={
          <>
            <Navbar />
            <AartiPage />
          </>
        }
      />

      <Route
        path="/volunteer-registration"
        element={
          <>
            <Navbar />
            <VolunteerRegistration />
          </>
        }
      />

      <Route
        path="/volunteers"
        element={
          <>
            <Navbar />
            <Volunteers />
          </>
        }
      />

      <Route
        path="/meeting/:roomName"
        element={<MeetingRoom />}
      />

      <Route
        path="/complaint"
        element={
          <>
            <Navbar />
            <Complaint />
          </>
        }
      />

      <Route
    path="/print-volunteer"
    element={<PrintVolunteer />}
/>

      <Route path="/login" element={<Login />} />

      {/* ================= ADMIN PANEL ================= */}

      <Route path="/admin/dashboard" element={<Dashboard />} />

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

    </Routes>
  );
}

export default App;