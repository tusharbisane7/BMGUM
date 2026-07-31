import React from "react";
import { generateReceipt } from "../../utils/receiptGenerator";

function SuccessModal({ open, onClose, data }) {

    if (!open || !data) return null;

    const handleDownload = () => {

        generateReceipt(data);

    };

    const handleShare = () => {

        const message = `🙏 *बाल मित्र गणेश उत्सव मंडळ*

🎉 Donation Successful

🧾 Receipt No: ${data.receiptNo}

👤 Donor: ${data.donor}

💰 Amount: ₹${data.amount}

💳 Payment ID: ${data.paymentId}

🙏 Thank you for your generous donation.

🌐 Visit Again`;

        window.open(

            `https://wa.me/?text=${encodeURIComponent(message)}`,

            "_blank"

        );

    };

    return (

        <div className="success-overlay">

            <div className="success-modal">

                <div className="success-icon">

                    ✅

                </div>

                <h2>

                    Payment Successful

                </h2>

                <p>

                    Thank you for your donation.

                </p>

                <div className="receipt-box">

                    <p>

                        <strong>Receipt No :</strong>{" "}

                        {data.receiptNo}

                    </p>

                    <p>

                        <strong>Donor :</strong>{" "}

                        {data.donor}

                    </p>

                    <p>

                        <strong>Amount :</strong>{" "}

                        ₹{data.amount}

                    </p>

                    <p>

                        <strong>Payment ID :</strong>{" "}

                        {data.paymentId}

                    </p>

                </div>

                <div className="success-actions">

                    <button

                        className="download-btn"

                        onClick={handleDownload}

                    >

                        📄 Download Receipt

                    </button>

                    <button

                        className="whatsapp-btn"

                        onClick={handleShare}

                    >

                        📱 Share WhatsApp

                    </button>

                    <button

                        className="close-btn"

                        onClick={onClose}

                    >

                        ❌ Close

                    </button>

                </div>

            </div>

        </div>

    );

}

export default SuccessModal;