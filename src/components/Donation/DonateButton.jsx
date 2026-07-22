import { useState } from "react";
import axios from "axios";

function DonateButton({
  formData,
  setShowSuccess,
  setSuccessData,
}) {
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      alert("Please enter your full name.");
      return false;
    }

    if (!formData.marathiName.trim()) {
      alert("Please enter your Marathi name.");
      return false;
    }

    if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return false;
    }

    if (!formData.address.trim()) {
      alert("Please enter your address.");
      return false;
    }

    if (!formData.amount || Number(formData.amount) < 1) {
      alert("Please enter a valid donation amount.");
      return false;
    }

    if (!formData.agree) {
      alert("Please accept Terms & Conditions.");
      return false;
    }

    return true;
  };

  const handleDonate = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const { data } = await axios.post(
        "https://bmgum.onrender.com/api/payment/create-order",
        {
          amount: Number(formData.amount),
        }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,

        amount: data.amount,
        currency: data.currency,
        order_id: data.id,

        name: "बाल मित्र गणेश उत्सव मंडळ",
        description: "Online Donation",

        image: "/logo.png",

        prefill: {
          name: formData.fullName,
          contact: formData.mobile,
        },

        notes: {
          marathiName: formData.marathiName,
          address: formData.address,
          purpose: formData.purpose,
        },

        theme: {
          color: "#ff6b00",
        },

        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },

        handler: async function (response) {
          try {
            const verify = await axios.post(
              "https://bmgum.onrender.com/api/payment/verify-payment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                donor: formData,
              }
            );

            if (verify.data.success) {
             setSuccessData({
  receiptNo: verify.data.receiptNo,
  paymentId: verify.data.paymentId,
  amount: formData.amount,
  donor: formData.fullName,
  pdfUrl: verify.data.pdfUrl,
});

              setShowSuccess(true);
            } else {
              alert("Payment Verification Failed.");
            }
          } catch (err) {
  console.error(err);

  alert(
    err.response?.data?.message ||
    err.response?.data?.error ||
    err.message
  );
}
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (err) {
      console.error(err);
      alert("Unable to initiate payment.");
      setLoading(false);
    }
  };

  return (
    <button
      className="donate-btn"
      onClick={handleDonate}
      disabled={loading}
    >
      {loading ? (
        <>
          <span className="spinner"></span>
          Processing...
        </>
      ) : (
        <>❤️ Donate ₹{formData.amount || 0}</>
      )}
    </button>
  );
}

export default DonateButton;