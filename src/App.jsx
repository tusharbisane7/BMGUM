import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Location from "./components/Location";

import Home from "./pages/Home";
import Donation from "./pages/Donation";
import Expense from "./pages/Expense";
import AartiPage from "./pages/AartiPage";
import Login from "./pages/Login";
import DonationManagement from "./admin/DonationManagement";
import Dashboard from "./admin/Dashboard";
import ExpenseManagement from "./admin/ExpenseManagement";
import NoticeManagement from "./admin/NoticeManagement";
import UnderConstruction from "./admin/UnderConstruction";
import ChangePassword from "./admin/ChangePassword";
import AartiManagement from "./admin/AartiManagement";
import TimelineManagement from "./admin/TimelineManagement";
import VolunteerRegistration from "./pages/VolunteerRegistration";
import VolunteerManagement from "./admin/VolunteerManagement";
import Volunteers from "./components/Volunteers";
import SponsorManagement from "./admin/SponsorManagement";
import MeetingRoom from "./components/MeetingRoom";
import LiveMeetingPopup from "./components/LiveMeetingPopup";
import MeetingManagement from "./admin/MeetingManagement";


function App() {
  return (
    <Routes>

      {/* PUBLIC WEBSITE */}

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

      <Route path="/login" element={<Login />} />

      {/* ADMIN ONLY */}

      
<Route path="/admin/dashboard" element={<Dashboard />} />
<Route path="/admin/donations" element={<DonationManagement />} />
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
    element={<TimelineManagement  />}
  />
  <Route
    path="/admin/committee"
    element={<UnderConstruction  />}
  />
  <Route
    path="/admin/users"
    element={<UnderConstruction  />}
  />
 <Route
    path="/admin/change-password"
    element={<ChangePassword  />}
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

    </Routes>
  );
}

export default App;