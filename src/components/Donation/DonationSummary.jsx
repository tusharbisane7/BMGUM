function DonationSummary({ formData, donateButton }) {
  const today = new Date();

  const date = today.toLocaleDateString("en-IN");

  const time = today.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const amount = Number(formData.amount || 0);

  return (
    <div className="summary-card">

      <div className="summary-header">

        <h2>💳 Donation Summary</h2>

        <p>Review your donation details before payment</p>

      </div>

     

      <div className="summary-total">

        <small>Total Donation</small>

        <h1>₹{amount.toLocaleString("en-IN")}</h1>

      </div>

      

      <div className="summary-button">
        {donateButton}
      </div>

    </div>
  );
}

export default DonationSummary;