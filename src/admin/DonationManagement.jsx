import { useState, useEffect } from "react";
import axios from "axios";

import {
  FaDonate,
  FaSave,
  FaTrash,
  FaImage,
  FaUndo,
  FaEdit,
  FaSearch,
} from "react-icons/fa";

import "../styles/admin/donation.css";

function DonationManagement() {

  const today = new Date();

  const [donations, setDonations] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [preview, setPreview] = useState(null);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({

    donorName: "",

    amount: "",

    pendingAmount: "",

    date: today.toLocaleDateString("en-GB"),

    time: today.toLocaleTimeString(),

    receipt: null,

  });

  /* ===========================
          LOAD DONATIONS
  ============================ */

  const loadDonations = async () => {

    try {

      setLoading(true);

      const res = await axios.get(

        "http://localhost:5000/api/donations"

      );

      setDonations(res.data);

    }

    catch (err) {

      console.log(err);

    }

    finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadDonations();

  }, []);

  /* ===========================
          INPUT CHANGE
  ============================ */

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  /* ===========================
          RECEIPT IMAGE
  ============================ */

  const handleImage = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setFormData({

      ...formData,

      receipt: file,

    });

    setPreview(

      URL.createObjectURL(file)

    );

  };

  /* ===========================
          CLEAR FORM
  ============================ */

  const clearForm = () => {

    const now = new Date();

    setEditingId(null);

    setPreview(null);

    setFormData({

      donorName: "",

      amount: "",

      pendingAmount: "",

      date: now.toLocaleDateString("en-GB"),

      time: now.toLocaleTimeString(),

      receipt: null,

    });

  };

  /* ===========================
          SAVE DONATION
  ============================ */

  const handleSubmit = async (e) => {

    e.preventDefault();

    const data = new FormData();

    data.append(

      "donorName",

      formData.donorName

    );

    data.append(

      "amount",

      formData.amount

    );

    data.append(

      "pendingAmount",

      formData.pendingAmount

    );

    data.append(

      "date",

      formData.date

    );

    data.append(

      "time",

      formData.time

    );

    if (formData.receipt) {

      data.append(

        "receipt",

        formData.receipt

      );

    }

    try {

      if (editingId) {

        await axios.put(

          `http://localhost:5000/api/donations/${editingId}`,

          data

        );

        alert("Donation Updated Successfully");

      }

      else {

        await axios.post(

          "http://localhost:5000/api/donations",

          data

        );

        alert("Donation Added Successfully");

      }

      clearForm();

      loadDonations();

    }

  catch (err) {

  console.error(err);

  console.log(err.response?.data);

  alert(err.response?.data?.message || err.message);

}

  };

  /* ===========================
          DELETE DONATION
  ============================ */

  const deleteDonation = async (id) => {

    const confirmDelete = window.confirm(

      "Are you sure you want to delete this donation?"

    );

    if (!confirmDelete) return;

    try {

      await axios.delete(

        `http://localhost:5000/api/donations/${id}`

      );

      alert("Donation Deleted");

      loadDonations();

    }

    catch (err) {

      console.log(err);

    }

  };

  /* ===========================
          EDIT DONATION
  ============================ */

  const editDonation = (donation) => {

    setEditingId(donation.id);

    setFormData({

      donorName: donation.donorName,

      amount: donation.amount,

      pendingAmount: donation.pendingAmount,

      date: donation.date,

      time: donation.time,

      receipt: null,

    });

    if (donation.receipt) {

      setPreview(

        `http://localhost:5000/uploads/receipts/${donation.receipt}`

      );

    }

    window.scrollTo({

      top: 0,

      behavior: "smooth",

    });

  };

  /* ===========================
          SEARCH
  ============================ */

  const filteredDonations = donations.filter(

    (item) =>

      item.donorName

        .toLowerCase()

        .includes(

          search.toLowerCase()

        )

  );

  return (
    <div className="donation-page">

  {/* ================= HEADER ================= */}

  <div className="page-title">

    <FaDonate className="title-icon" />

    <div>

      <h1>Donation Management</h1>

      <p>Add, Edit & Manage Donations</p>

    </div>

  </div>

  {/* ================= FORM CARD ================= */}

  <div className="donation-card">

    <form
      onSubmit={handleSubmit}
      className="donation-form"
      encType="multipart/form-data"
    >

      {/* Donor Name */}

      <div className="form-group">

        <label>देणगीचे नाव *</label>

        <input
          type="text"
          name="donorName"
          placeholder="Enter Donor Name"
          value={formData.donorName}
          onChange={handleChange}
          required
        />

      </div>

      {/* Amount */}

      <div className="form-group">

        <label>रक्कम (₹) *</label>

        <input
          type="number"
          name="amount"
          placeholder="Enter Amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />

      </div>

      {/* Pending */}

      <div className="form-group">

        <label>बाकी रक्कम</label>

        <input
          type="number"
          name="pendingAmount"
          placeholder="Optional"
          value={formData.pendingAmount}
          onChange={handleChange}
        />

      </div>

      {/* Date */}

      <div className="form-group">

        <label>दिनांक</label>

        <input

          type="text"

          value={formData.date}

          readOnly

        />

      </div>

      {/* Time */}

      <div className="form-group">

        <label>वेळ</label>

        <input

          type="text"

          value={formData.time}

          readOnly

        />

      </div>

      {/* Receipt */}

      <div className="form-group">

        <label>

          <FaImage />

          Upload Receipt

        </label>

        <input

          type="file"

          accept="image/*"

          onChange={handleImage}

        />

      </div>

      {/* Preview */}

      {preview && (

        <div className="preview-box">

          <img

            src={preview}

            alt="Receipt"

          />

        </div>

      )}

      {/* Buttons */}

      <div className="button-group">

        <button

          type="submit"

          className="save-btn"

        >

          <FaSave />

          {editingId

            ? "Update Donation"

            : "Save Donation"}

        </button>

        <button

          type="button"

          className="clear-btn"

          onClick={clearForm}

        >

          <FaUndo />

          Clear

        </button>

      </div>

    </form>

  </div>

  {/* ================= SUMMARY ================= */}

  <div className="summary-card">

    <div className="summary-box">

      <h4>Total Donations</h4>

      <h2>{donations.length}</h2>

    </div>

    <div className="summary-box">

      <h4>Total Amount</h4>

      <h2>

        ₹

        {donations.reduce(

          (sum, item) =>

            sum +

            Number(item.amount),

          0

        )}

      </h2>

    </div>

  </div>

  {/* ================= SEARCH ================= */}

  <div className="search-box">

    <FaSearch />

    <input

      type="text"

      placeholder="Search Donor..."

      value={search}

      onChange={(e) =>

        setSearch(e.target.value)

      }

    />

  </div>
    {/* ================= DONATION TABLE ================= */}

  <div className="table-card">

    <div className="table-header">

      <h2>Donation Records</h2>

    </div>

    {loading ? (

      <div className="loading">

        Loading Donations...

      </div>

    ) : (

      <table className="donation-table">

        <thead>

          <tr>

            <th>ID</th>

            <th>देणगीचे नाव</th>

            <th>रक्कम</th>

            <th>बाकी</th>

            <th>दिनांक</th>

            <th>वेळ</th>

            <th>Receipt</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {filteredDonations.length === 0 ? (

            <tr>

              <td colSpan="8" className="no-data">

                No Donation Found

              </td>

            </tr>

          ) : (

            filteredDonations.map((donation) => (

              <tr key={donation.id}>

                <td>{donation.id}</td>

                <td>{donation.donorName}</td>

                <td>₹{donation.amount}</td>

                <td>

                  ₹{donation.pendingAmount || 0}

                </td>

                <td>{donation.date}</td>

                <td>{donation.time}</td>

                <td>

                  {donation.receipt ? (

                    <a

                      href={`http://localhost:5000/uploads/receipts/${donation.receipt}`}

                      target="_blank"

                      rel="noreferrer"

                      className="receipt-link"

                    >

                      View

                    </a>

                  ) : (

                    "-"

                  )}

                </td>

                <td>

                  <div className="action-buttons">

                    <button

                      className="edit-btn"

                      onClick={() =>

                        editDonation(donation)

                      }

                    >

                      <FaEdit />

                    </button>

                    <button

                      className="delete-btn"

                      onClick={() =>

                        deleteDonation(donation.id)

                      }

                    >

                      <FaTrash />

                    </button>

                  </div>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    )}

  </div>

</div>

);

}

export default DonationManagement;