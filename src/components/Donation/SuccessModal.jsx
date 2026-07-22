import React from "react";

function SuccessModal({ open, onClose, data }) {

    if (!open) return null;

    return (

        <div className="success-overlay">

            <div className="success-modal">

                <div className="success-icon">

                    ✅

                </div>

                <h2>Payment Successful</h2>

                <p>Thank you for your donation.</p>

                <div className="receipt-box">

                    <p>

                        <strong>Receipt No:</strong>

                        {data.receiptNo}

                    </p>

                    <p>

                        <strong>Amount:</strong>

                        ₹{data.amount}

                    </p>

                    <p>

                        <strong>Donor:</strong>

                        {data.donor}

                    </p>

                    <p>

                        <strong>Payment ID:</strong>

                        {data.paymentId}

                    </p>

                </div>

               <div className="success-actions">
  <button className="download-btn">
    📄 Download Receipt
  </button>

  <button className="whatsapp-btn">
    📱 Share WhatsApp
  </button>

  <button className="close-btn" onClick={onClose}>
    ❌ Close
  </button>
</div>

            </div>

        </div>

    );

}

export default SuccessModal;