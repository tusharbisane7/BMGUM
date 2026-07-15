import { useEffect, useState } from "react";
import axios from "axios";

import DonationTable from "../components/DonationTable";
import "../styles/donation.css";

function Donation() {

  const [summary, setSummary] = useState({

    totalDonation: 0,

    totalDonors: 0,

    todayDonation: 0

  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadDonationSummary();

  }, []);

  const loadDonationSummary = async () => {

    try {

      const res = await axios.get(

        "https://bmgum.onrender.com/api/donations/summary"

      );

      setSummary(res.data);

    }

    catch(err){

      console.log(err);

    }

    finally{

      setLoading(false);

    }

  };

  if(loading){

    return(

      <div className="container">

        <h2>माहिती लोड होत आहे...</h2>

      </div>

    );

  }

  return (

    <section className="container donation-page">

      <h1 className="title">

        💰 देणगी

      </h1>

      <div className="top-cards">

        <div className="top-card">

          <h3>एकूण देणगी</h3>

          <h2>

            ₹ {summary.totalDonation.toLocaleString()}

          </h2>

        </div>

        <div className="top-card">

          <h3>देणगीदार</h3>

          <h2>

            {summary.totalDonors}

          </h2>

        </div>

        <div className="top-card">

          <h3>आजची देणगी</h3>

          <h2>

            ₹ {summary.todayDonation.toLocaleString()}

          </h2>

        </div>

      </div>

      <DonationTable />

    </section>

  );

}

export default Donation;