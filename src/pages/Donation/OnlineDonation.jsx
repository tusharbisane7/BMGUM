import DonationHero from "../../components/Donation/DonationHero";
import DonationForm from "../../components/Donation/DonationForm";

import "../../styles/onlineDonation.css";

function OnlineDonation() {
  return (
    <div className="online-donation-page">

      <DonationHero />

      <div className="donation-container">

        <DonationForm />

      </div>

    </div>
  );
}

export default OnlineDonation;