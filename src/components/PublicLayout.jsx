import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Location from "./Location";
import PageTransition from "./PageTransition";

function PublicLayout() {
  return (
    <PageTransition>
      <Navbar />
      <Outlet />
      <Location />
    </PageTransition>
  );
}

export default PublicLayout;