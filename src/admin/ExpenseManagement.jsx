import { useState, useEffect } from "react";
import axios from "axios";

import {
  FaMoneyBillWave,
  FaSave,
  FaTrash,
  FaImage,
  FaUndo,
  FaEdit,
  FaSearch,
} from "react-icons/fa";

import "../styles/admin/expense.css";

const API = "https://bmgum.onrender.com";

function ExpenseManagement() {

  const [expenses, setExpenses] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [preview, setPreview] = useState(null);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const now = new Date();

  const [formData, setFormData] = useState({

    title: "",

    amount: "",

    category: "Decoration",

    description: "",

    date: now.toISOString().substring(0, 10),

    time: now.toLocaleTimeString(),

    bill: null

  });

  // ================= LOAD =================

  const loadExpenses = async () => {

    try {

      setLoading(true);

      const res = await axios.get(

        `${API}/api/expenses`

      );

      setExpenses(

        Array.isArray(res.data)

          ? res.data

          : []

      );

    }

    catch (err) {

      console.log(err);

      setExpenses([]);

    }

    finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadExpenses();

  }, []);

  // ================= CHANGE =================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };

  // ================= IMAGE =================

  const handleImage = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setFormData({

      ...formData,

      bill: file

    });

    setPreview(

      URL.createObjectURL(file)

    );

  };

  // ================= CLEAR =================

  const clearForm = () => {

    const d = new Date();

    setEditingId(null);

    setPreview(null);

    setFormData({

      title: "",

      amount: "",

      category: "Decoration",

      description: "",

      date: d.toISOString().substring(0, 10),

      time: d.toLocaleTimeString(),

      bill: null

    });

  };

  // ================= SAVE =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    const data = new FormData();

    data.append("title", formData.title);

    data.append("amount", formData.amount);

    data.append("category", formData.category);

    data.append("description", formData.description);

    data.append("date", formData.date);

    data.append("time", formData.time);

    if (formData.bill) {

      data.append("bill", formData.bill);

    }

    try {

      if (editingId) {

        await axios.put(

          `${API}/api/expenses/${editingId}`,

          data

        );

        alert("Expense Updated Successfully");

      }

      else {

        await axios.post(

          `${API}/api/expenses`,

          data

        );

        alert("Expense Added Successfully");

      }

      clearForm();

      loadExpenses();

    }

    catch (err) {

      console.log(err);

      alert(

        err.response?.data?.message ||

        "Error Saving Expense"

      );

    }

  };
  return (

<div className="expense-page">

  {/* ================= TITLE ================= */}

  <div className="page-title">

    <FaMoneyBillWave className="title-icon" />

    <div>

      <h1>Expense Management</h1>

      <p>Add, Edit & Manage Expenses</p>

    </div>

  </div>

  {/* ================= FORM ================= */}

  <div className="expense-card">

    <form

      className="expense-form"

      onSubmit={handleSubmit}

      encType="multipart/form-data"

    >

      {/* Expense Name */}

      <div className="form-group">

        <label>खर्चाचे नाव *</label>

        <input

          type="text"

          name="title"

          value={formData.title}

          onChange={handleChange}

          placeholder="Enter Expense Name"

          required

        />

      </div>

      {/* Amount */}

      <div className="form-group">

        <label>रक्कम *</label>

        <input

          type="number"

          name="amount"

          value={formData.amount}

          onChange={handleChange}

          placeholder="Enter Amount"

          required

        />

      </div>

      {/* Category */}

      <div className="form-group">

        <label>Category</label>

        <select

          name="category"

          value={formData.category}

          onChange={handleChange}

        >

          <option>Decoration</option>

          <option>Food</option>

          <option>Sound</option>

          <option>Electricity</option>

          <option>Prize</option>

          <option>Advertisement</option>

          <option>Other</option>

        </select>

      </div>

      {/* Description */}

      <div className="form-group">

        <label>Description</label>

        <textarea

          rows="4"

          name="description"

          value={formData.description}

          onChange={handleChange}

          placeholder="Expense Description"

        />

      </div>

      {/* Date */}

      <div className="form-group">

        <label>दिनांक</label>

        <input

          type="date"

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

      {/* Upload Bill */}

      <div className="form-group">

        <label>

          <FaImage />

          Upload Bill / Proof

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

            alt="Bill Preview"

            style={{

              maxWidth: "220px",

              borderRadius: "8px"

            }}

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

          {

            editingId

              ? " Update Expense"

              : " Save Expense"

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

      <h3>Total Expenses</h3>

      <h2>{expenses.length}</h2>

    </div>

    <div className="summary-box">

      <h3>Total Amount</h3>

      <h2>

        ₹

        {

          expenses.reduce(

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

      placeholder="Search Expense..."

      value={search}

      onChange={(e)=>setSearch(e.target.value)}

    />

  </div>
    {/* ================= TABLE ================= */}

  <div className="table-card">

    <div className="table-header">

      <h2>Expense Records</h2>

    </div>

    {loading ? (

      <div className="loading">

        Loading Expenses...

      </div>

    ) : (

      <table className="expense-table">

        <thead>

          <tr>

            <th>ID</th>

            <th>Expense</th>

            <th>Category</th>

            <th>Amount</th>

            <th>Description</th>

            <th>Date</th>

            <th>Time</th>

            <th>Proof</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {

            expenses

            .filter(item =>

              (item.title || "")

              .toLowerCase()

              .includes(search.toLowerCase())

            )

            .length === 0

            ? (

              <tr>

                <td

                  colSpan="9"

                  className="no-data"

                >

                  No Expense Found

                </td>

              </tr>

            )

            : (

              expenses

              .filter(item =>

                (item.title || "")

                .toLowerCase()

                .includes(search.toLowerCase())

              )

              .map((expense) => (

                <tr key={expense.id}>

                  <td>{expense.id}</td>

                  <td>{expense.title}</td>

                  <td>{expense.category}</td>

                  <td>

                    ₹{expense.amount}

                  </td>

                  <td>

                    {expense.description || "-"}

                  </td>

                  <td>

                    {

                      expense.date

                        ?

                        new Date(expense.date)

                        .toISOString()

                        .split("T")[0]

                        :

                        "-"

                    }

                  </td>

                  <td>{expense.time}</td>

                  <td>

                    {

                      expense.bill

                      ?

                      <a

                        href={`https://bmgum.onrender.com/uploads/bills/${expense.bill}`}

                        target="_blank"

                        rel="noreferrer"

                      >

                        View Proof

                      </a>

                      :

                      "-"

                    }

                  </td>

                  <td>

                    <div className="action-buttons">

                      <button

                        className="edit-btn"

                        onClick={() => {

                          setEditingId(expense.id);

                          setFormData({

                            title: expense.title || "",

                            amount: expense.amount || "",

                            category: expense.category || "Decoration",

                            description: expense.description || "",

                            date: expense.date

                              ? new Date(expense.date)

                                  .toISOString()

                                  .split("T")[0]

                              : "",

                            time: expense.time || "",

                            bill: null

                          });

                          if (expense.bill) {

                            setPreview(

                              `https://bmgum.onrender.com/uploads/bills/${expense.bill}`

                            );

                          } else {

                            setPreview(null);

                          }

                          window.scrollTo({

                            top: 0,

                            behavior: "smooth"

                          });

                        }}

                      >

                        <FaEdit />

                      </button>

                      <button

                        className="delete-btn"

                        onClick={async () => {

                          if (

                            !window.confirm(

                              "Delete this expense?"

                            )

                          ) return;

                          try {

                            await axios.delete(

                              `https://bmgum.onrender.com/api/expenses/${expense.id}`

                            );

                            alert(

                              "Expense Deleted"

                            );

                            loadExpenses();

                          }

                          catch(err){

                            console.log(err);

                            alert(

                              "Delete Failed"

                            );

                          }

                        }}

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

    )}

  </div>
  </div>

);

}

export default ExpenseManagement;