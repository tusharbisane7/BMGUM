import { useEffect, useState } from "react";
import axios from "axios";

import Hero from "../components/Hero";
import DashboardCard from "../components/DashboardCard";
import NoticeBoard from "../components/NoticeBoard";
import Committee from "../components/Committee";

import Aarti from "../components/Aarti";
import Location from "../components/Location";
import Sponsors from "../components/Sponsors";
import VisitorCounter from "../components/VisitorCounter";
import LiveMeetingPopup from "../components/LiveMeetingPopup";
import RecentDonations from "../components/RecentDonations";


function Home() {

  const [homeData, setHomeData] = useState({

    totalDonation: 0,

    totalExpense: 0,

    balance: 0,

    totalDonors: 0,

    recentDonations: [],

    recentExpenses: [],

    notices: []

  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchHomeData();

  }, []);

  const fetchHomeData = async () => {

    try {

      const res = await axios.get(

        "https://bmgum.onrender.com/api/home"

      );

      setHomeData(res.data);

    }

    catch (err) {

      console.log(err);

    }

    finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <div className="container">

        <h2>माहिती लोड होत आहे...</h2>

      </div>

    );

  }

  return (

    <>

    <RecentDonations />
<LiveMeetingPopup/>
      {/* Hero Section */}

      <Hero />

      {/* Dashboard */}

      <section className="container">

        <h2 className="title">

          मंडळाचा आढावा

        </h2>

        <div className="dashboard-grid">

          <DashboardCard

            title="एकूण देणगी"

            value={`₹ ${homeData.totalDonation.toLocaleString()}`}

            color="#ff6b00"

            icon="💰"

          />

          <DashboardCard

            title="एकूण खर्च"

            value={`₹ ${homeData.totalExpense.toLocaleString()}`}

            color="#0077b6"

            icon="💸"

          />

          <DashboardCard

            title="शिल्लक"

            value={`₹ ${homeData.balance.toLocaleString()}`}

            color="#2e7d32"

            icon="🏦"

          />

          <DashboardCard

            title="देणगीदार"

            value={homeData.totalDonors}

            color="#9c27b0"

            icon="👥"

          />

        </div>

      </section>

      {/* Notice Board */}

      <NoticeBoard notices={homeData.notices} />

    

      {/* Aarti */}

      <Aarti />

      {/* Committee */}

      <Committee />

      <Sponsors />
<VisitorCounter />
      {/* Location */}

      

    </>

  );

}

export default Home;