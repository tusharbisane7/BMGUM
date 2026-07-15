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

const API = "https://bmgum.onrender.com";

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

    pendingAmount: 0,

    date: today.toISOString().split("T")[0],

    time: today.toLocaleTimeString("en-IN", {

      hour: "2-digit",

      minute: "2-digit",

      second: "2-digit",

      hour12: true,

    }),

    receipt: null,

  });

  // ================= LOAD DONATIONS =================

  const loadDonations = async () => {

    try {

      setLoading(true);

      const res = await axios.get(`${API}/api/donations`);

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

  // ================= INPUT =================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  // ================= IMAGE =================

  const handleImage = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setFormData({

      ...formData,

      receipt: file,

    });

    setPreview(URL.createObjectURL(file));

  };

  // ================= CLEAR =================

  const clearForm = () => {

    const now = new Date();

    setEditingId(null);

    setPreview(null);

    setFormData({

      donorName: "",

      amount: "",

      pendingAmount: 0,

      date: now.toISOString().split("T")[0],

      time: now.toLocaleTimeString("en-IN", {

        hour: "2-digit",

        minute: "2-digit",

        second: "2-digit",

        hour12: true,

      }),

      receipt: null,

    });

  };

  // ================= SAVE =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    const data = new FormData();

    data.append("donorName", formData.donorName);

    data.append("amount", formData.amount);

    data.append(

      "pendingAmount",

      formData.pendingAmount === ""

        ? 0

        : formData.pendingAmount

    );

    data.append("date", formData.date);

    data.append("time", formData.time);

    if (formData.receipt) {

      data.append("receipt", formData.receipt);

    }

    try {

      if (editingId) {

        await axios.put(

          `${API}/api/donations/${editingId}`,

          data

        );

        alert("Donation Updated Successfully");

      }

      else {

        await axios.post(

          `${API}/api/donations`,

          data

        );

        alert("Donation Added Successfully");

      }

      clearForm();

      loadDonations();

    }

    catch (err) {

      console.log(err);

      alert(

        err.response?.data?.message ||

        "Something went wrong"

      );

    }

  };
    // ================= DELETE =================

  const deleteDonation = async (id) => {

    if (!window.confirm("Delete this donation?")) return;

    try {

      await axios.delete(

        `${API}/api/donations/${id}`

      );

      alert("Donation Deleted Successfully");

      loadDonations();

    }

    catch (err) {

      console.log(err);

      alert("Delete Failed");

    }

  };

  // ================= EDIT =================

  const editDonation = (donation) => {

    setEditingId(donation.id);

    setFormData({

      donorName: donation.donorName || "",

      amount: donation.amount || "",

      pendingAmount: donation.pendingAmount ?? 0,

      date: donation.date

        ? new Date(donation.date)

            .toISOString()

            .split("T")[0]

        : "",

      time: donation.time || "",

      receipt: null,

    });

    if (donation.receipt) {

      setPreview(

        `${API}/uploads/receipts/${donation.receipt}`

      );

    }

    else {

      setPreview(null);

    }

    window.scrollTo({

      top: 0,

      behavior: "smooth",

    });

  };

  // ================= SEARCH =================

  const filteredDonations = donations.filter(

    (item) =>

      (item.donorName || "")

        .toLowerCase()

        .includes(search.toLowerCase())

  );

  return (

<div className="donation-page">

  {/* ================= TITLE ================= */}

  <div className="page-title">

    <FaDonate className="title-icon" />

    <div>

      <h1>Donation Management</h1>

      <p>Add, Edit & Manage Donations</p>

    </div>

  </div>

  {/* ================= FORM ================= */}

  <div className="donation-card">

    <form

      className="donation-form"

      onSubmit={handleSubmit}

      encType="multipart/form-data"

    >

      <div className="form-group">

        <label>Donor Name *</label>

        <input

          type="text"

          name="donorName"

          value={formData.donorName}

          onChange={handleChange}

          placeholder="Enter Donor Name"

          required

        />

      </div>

      <div className="form-group">

        <label>Amount *</label>

        <input

          type="number"

          name="amount"

          value={formData.amount}

          onChange={handleChange}

          placeholder="Enter Amount"

          required

        />

      </div>

      <div className="form-group">

        <label>Pending Amount</label>

        <input

          type="number"

          name="pendingAmount"

          value={formData.pendingAmount}

          onChange={handleChange}

        />

      </div>

      <div className="form-group">

        <label>Date</label>

        <input

          type="date"

          value={formData.date}

          readOnly

        />

      </div>

      <div className="form-group">

        <label>Time</label>

        <input

          type="text"

          value={formData.time}

          readOnly

        />

      </div>

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

      {preview && (

        <div className="preview-box">

          <img

            src={preview}

            alt="Receipt"

            style={{

              maxWidth: "220px",

              borderRadius: "8px"

            }}

          />

        </div>

      )}

      <div className="button-group">

        <button

          type="submit"

          className="save-btn"

        >

          <FaSave />

          {

            editingId

              ? " Update Donation"

              : " Save Donation"

          }

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

      <h3>Total Donations</h3>

      <h2>{donations.length}</h2>

    </div>

    <div className="summary-box">

      <h3>Total Amount</h3>

      <h2>

        ₹

        {

          donations.reduce(

            (sum, item) =>

              sum + Number(item.amount || 0),

            0

          )

        }

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

      onChange={(e)=>setSearch(e.target.value)}

    />

  </div>
    {/* ================= TABLE ================= */}

  <div className="table-card">

    <div className="table-header">

      <h2>Donation Records</h2>

    </div>

    {

      loading

      ?

      (

        <div className="loading">

          Loading Donations...

        </div>

      )

      :

      (

        <table className="donation-table">

          <thead>

            <tr>

              <th>ID</th>

              <th>Donor Name</th>

              <th>Amount</th>

              <th>Pending</th>

              <th>Date</th>

              <th>Time</th>

              <th>Receipt</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {

              filteredDonations.length === 0

              ?

              (

                <tr>

                  <td

                    colSpan="8"

                    className="no-data"

                  >

                    No Donation Found

                  </td>

                </tr>

              )

              :

              (

                filteredDonations.map((donation) => (

                  <tr key={donation.id}>

                    <td>{donation.id}</td>

                    <td>{donation.donorName}</td>

                    <td>

                      ₹{donation.amount}

                    </td>

                    <td>

                      ₹{donation.pendingAmount || 0}

                    </td>

                    <td>

                      {

                        donation.date

                        ?

                        new Date(donation.date)

                        .toISOString()

                        .split("T")[0]

                        :

                        "-"

                      }

                    </td>

                    <td>

                      {donation.time}

                    </td>

                    <td>

                      {

                        donation.receipt

                        ?

                        (

                          <a

                            href={`${API}/uploads/receipts/${donation.receipt}`}

                            target="_blank"

                            rel="noreferrer"

                          >

                            View Receipt

                          </a>

                        )

                        :

                        "-"

                      }

                    </td>

                    <td>

                      <div className="action-buttons">

                        <button

                          className="edit-btn"

                          type="button"

                          onClick={() =>

                            editDonation(donation)

                          }

                        >

                          <FaEdit />

                        </button>

                        <button

                          className="delete-btn"

                          type="button"

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

              )

            }

          </tbody>

        </table>

      )

    }

  </div>
  </div>

);

}

export default DonationManagement;