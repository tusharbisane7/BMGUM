import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DonateButton({
  formData,
  setShowSuccess,
  setSuccessData,
}) {

  const navigate = useNavigate();

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

      alert("Please enter a valid 10 digit mobile number.");

      return false;

    }

    if (!formData.address.trim()) {

      alert("Please enter your address.");

      return false;

    }

    if (!formData.amount || Number(formData.amount) <= 0) {

      alert("Please enter donation amount.");

      return false;

    }

    if (!formData.agree) {

      alert("Please accept Terms & Conditions.");

      return false;

    }

    return true;

  };



  const handleDonate = () => {

    if (!validateForm()) return;

    const token = localStorage.getItem("token");

    if (!token) {

      alert("Please login first.");

      return;

    }

    setLoading(true);

    // Replace with your own UPI ID
    const upiId = "gitabisane-3@oksbi";

    const name = encodeURIComponent(
      "Bal Mitra Ganesh Utsav Mandal"
    );

    const amount = formData.amount;

    const note = encodeURIComponent(
      formData.purpose
    );

    const upiUrl =

      `upi://pay?pa=${upiId}` +

      `&pn=${name}` +

      `&am=${amount}` +

      `&cu=INR` +

      `&tn=${note}`;

    window.location.href = upiUrl;

    setTimeout(() => {

      setLoading(false);

      navigate(

        "/verify-payment",

        {

          state:{

            ...formData

          }

        }

      );

    },3000);

  };
    return (

    <button

      className="donate-btn"

      onClick={handleDonate}

      disabled={loading}

    >

      {

        loading ?

        (

          <>

            <span className="spinner"></span>

            Opening UPI...

          </>

        )

        :

        (

          <>

            💳 Pay ₹{formData.amount || 0} with UPI

          </>

        )

      }

    </button>

  );

}

export default DonateButton;