import { useEffect, useRef, useState } from "react";
import { getRecentDonations } from "../services/donationService";
import "../styles/recentdonations.css";

const RecentDonations = () => {
  const [currentDonation, setCurrentDonation] = useState(null);
  const [visible, setVisible] = useState(false);

  // Stores donation IDs already shown
  const shownDonations = useRef(new Set());

  // Prevents overlapping notifications
  const showing = useRef(false);

  const loadDonations = async () => {
    try {
      const res = await getRecentDonations();

      const donations = res.donations || [];

      if (showing.current) return;

      const nextDonation = donations.find(
        (item) => !shownDonations.current.has(item.id)
      );

      if (!nextDonation) return;

      showing.current = true;

      shownDonations.current.add(nextDonation.id);

      setCurrentDonation(nextDonation);

      setVisible(true);

      // Hide after 2 sec
      setTimeout(() => {
        setVisible(false);
      }, 2000);

      // Remove after animation
      setTimeout(() => {
        setCurrentDonation(null);
        showing.current = false;
      }, 2600);

    } catch (err) {
      console.log(err);
    }
  };

  // First Load
  useEffect(() => {
    loadDonations();
  }, []);

  // Check every 15 sec
  useEffect(() => {
    const interval = setInterval(() => {
      loadDonations();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  if (!currentDonation) return null;

  return (
    <div className={`recent-popup ${visible ? "show" : "hide"}`}>

      <div className="popup-icon">
        💰
      </div>

      <div className="popup-content">

        <span className="popup-title">
          नवीन देणगी
        </span>

        <h4>
          {currentDonation.is_anonymous
            ? "🙏 Anonymous Donor"
            : currentDonation.donor_name}
        </h4>

        <h3>
          ₹ {Number(currentDonation.amount).toLocaleString("en-IN")}
        </h3>

        <p>
          {new Date(
            currentDonation.donation_date
          ).toLocaleDateString("en-IN")}
        </p>

      </div>

    </div>
  );
};

export default RecentDonations;