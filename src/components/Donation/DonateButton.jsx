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

      const token = localStorage.getItem("token");


      const response = await axios.post(

        "https://bmgum.onrender.com/api/payment/verify-payment",

        {
          donor: formData,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );


      if (response.data.success) {


        setSuccessData({

          receiptNo: response.data.receiptNo,

          paymentId: response.data.paymentId,

          amount: formData.amount,

          donor: formData.fullName,

          pdfUrl: response.data.pdfUrl,

        });


        setShowSuccess(true);


      } 
      else {

        alert("Donation Failed");

      }


    } 
    catch (err) {


      console.error(err);


      alert(

        err.response?.data?.message ||

        err.response?.data?.error ||

        "Unable to save donation"

      );


    } 
    finally {


      setLoading(false);


    }

  };


  return (

    <button

      className="donate-btn"

      onClick={handleDonate}

      disabled={loading}

    >

      {

        loading ? (

          <>

            <span className="spinner"></span>

            Processing...

          </>

        ) : (

          <>
            ❤️ Donate ₹{formData.amount || 0}
          </>

        )

      }

    </button>

  );

}


export default DonateButton;