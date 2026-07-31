import { useState } from "react";
import AmountSelector from "./AmountSelector";
import DonationSummary from "./DonationSummary";
import DonateButton from "./DonateButton";
import SuccessModal from "./SuccessModal";

// Get logged-in user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialFormData = {
  fullName: user?.full_name || "",
  marathiName: "",
  mobile: user?.mobile || "",
  address: user?.address || "",
  amount: "",
  purpose: "General Donation",
  agree: false,
};

function DonationForm() {
  const [formData, setFormData] = useState(initialFormData);

  const [showSuccess, setShowSuccess] = useState(false);

  const [successData, setSuccessData] = useState({
    receiptNo: "",
    paymentId: "",
    amount: "",
    donor: "",
    pdfUrl: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAmountSelect = (amount) => {
    setFormData((prev) => ({
      ...prev,
      amount,
    }));
  };

  const closeSuccessModal = () => {
    setShowSuccess(false);

    setFormData({
      ...initialFormData,
      marathiName: "",
      amount: "",
      purpose: "General Donation",
      agree: false,
    });

    setSuccessData({
      receiptNo: "",
      paymentId: "",
      amount: "",
      donor: "",
      pdfUrl: "",
    });
  };

  return (
    <>
      <div className="donation-layout">
        {/* LEFT SIDE */}

        <div className="donation-form-card">
          <h2>👤 Donor Information</h2>

          {/* Full Name */}

          <div className="form-group">
            <label>Full Name (English)</label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              readOnly
            />
          </div>

          {/* Marathi Name */}

          <div className="form-group">
            <label>मराठी नाव *</label>

            <input
              type="text"
              name="marathiName"
              placeholder="मराठी नाव"
              value={formData.marathiName}
              onChange={handleChange}
            />
          </div>

          {/* Mobile */}

          <div className="form-group">
            <label>📱 Mobile Number</label>

            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              readOnly
            />
          </div>

          {/* Address */}

          <div className="form-group">
            <label>🏠 Address</label>

            <textarea
              rows={4}
              name="address"
              value={formData.address}
              readOnly
            />
          </div>

          {/* Amount */}

          <div className="form-group">
            <label>💰 Donation Amount *</label>

            <input
              type="number"
              name="amount"
              placeholder="Enter donation amount"
              value={formData.amount}
              onChange={handleChange}
            />

            <AmountSelector
              amount={formData.amount}
              onSelect={handleAmountSelect}
            />
          </div>

          {/* Purpose */}

          <div className="form-group">
            <label>Donation Purpose</label>

            <select
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
            >
              <option value="General Donation">
                General Donation
              </option>

              <option value="Mahaprasad">
                Mahaprasad
              </option>

              <option value="Decoration">
                Decoration
              </option>

              <option value="Aarti">
                Aarti
              </option>

              <option value="Festival Fund">
                Festival Fund
              </option>

              <option value="Other">
                Other
              </option>
            </select>
          </div>

          {/* Terms */}

          <div className="checkbox-row">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
            />

            <span>
              I agree to the donation terms & conditions.
            </span>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="donation-summary-wrapper">
          <DonationSummary
            formData={formData}
            donateButton={
              <DonateButton
                formData={formData}
                setShowSuccess={setShowSuccess}
                setSuccessData={setSuccessData}
              />
            }
          />
        </div>
      </div>

      <SuccessModal
        open={showSuccess}
        onClose={closeSuccessModal}
        data={successData}
      />
    </>
  );
}

export default DonationForm;