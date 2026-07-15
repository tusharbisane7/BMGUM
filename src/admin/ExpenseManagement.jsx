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

function ExpenseManagement() {

  const today = new Date();

  const [expenses, setExpenses] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [preview, setPreview] = useState(null);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({

    title: "",

    amount: "",

    category: "Decoration",

    description: "",

    date: today.toLocaleDateString("en-GB"),

    time: today.toLocaleTimeString(),

    bill: null,

  });

  const loadExpenses = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
        "https://bmgum.onrender.com/api/expenses"
      );

      setExpenses(res.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadExpenses();

  }, []);

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  const handleImage = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setFormData({

      ...formData,

      bill: file,

    });

    setPreview(URL.createObjectURL(file));

  };

  const clearForm = () => {

    const now = new Date();

    setEditingId(null);

    setPreview(null);

    setFormData({

      title: "",

      amount: "",

      category: "Decoration",

      description: "",

      date: now.toLocaleDateString("en-GB"),

      time: now.toLocaleTimeString(),

      bill: null,

    });

  };

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
  `https://bmgum.onrender.com/api/expenses/${editingId}`,
  data
);

        alert("Expense Updated");

      } else {

        await axios.post(

          "https://bmgum.onrender.com/api/expenses",

          data

        );

        alert("Expense Added");

      }

      clearForm();

      loadExpenses();

    } catch (err) {

      console.log(err);

      alert("Error Saving Expense");

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
      onSubmit={handleSubmit}
      className="expense-form"
      encType="multipart/form-data"
    >

      {/* Expense Name */}

      <div className="form-group">

        <label>खर्चाचे नाव *</label>

        <input

          type="text"

          name="title"

          placeholder="Enter Expense Name"

          value={formData.title}

          onChange={handleChange}

          required

        />

      </div>

      {/* Amount */}

      <div className="form-group">

        <label>रक्कम *</label>

        <input

          type="number"

          name="amount"

          placeholder="Enter Amount"

          value={formData.amount}

          onChange={handleChange}

          required

        />

      </div>

      {/* Category */}

      <div className="form-group">

        <label>Category *</label>

        <select

          name="category"

          value={formData.category}

          onChange={handleChange}

        >

          <option>Decoration</option>

          <option>Sound</option>

          <option>Food</option>

          <option>Prize</option>

          <option>Electricity</option>

          <option>Advertisement</option>

          <option>Other</option>

        </select>

      </div>

      {/* Description */}

      <div className="form-group">

        <label>Description</label>

        <textarea

          name="description"

          rows="4"

          placeholder="Expense Description"

          value={formData.description}

          onChange={handleChange}

        ></textarea>

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

      {/* Bill Upload */}

      <div className="form-group">

        <label>

          <FaImage />

          Upload Bill

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

            ? "Update Expense"

            : "Save Expense"}

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

        ₹{

          expenses.reduce(

            (sum, item) =>

              sum + Number(item.amount),

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

            <th>Date</th>

            <th>Time</th>

            <th>Bill</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {expenses
            .filter((item) =>
              item.title
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .length === 0 ? (

            <tr>

              <td colSpan="8" className="no-data">

                No Expense Found

              </td>

            </tr>

          ) : (

            expenses
              .filter((item) =>
                item.title
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((expense) => (

                <tr key={expense.id}>

                  <td>{expense.id}</td>

                  <td>{expense.title}</td>

                  <td>{expense.category}</td>

                  <td>₹{expense.amount}</td>

                  <td>{expense.date}</td>

                  <td>{expense.time}</td>

                  <td>

                    {expense.bill ? (

                      <a

                        href={`https://bmgum.onrender.com/uploads/bills/${expense.bill}`}

                        target="_blank"

                        rel="noreferrer"

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

                        onClick={() => {

                          setEditingId(expense.id);

                          setFormData({

                            title: expense.title,

                            amount: expense.amount,

                            category: expense.category,

                            description: expense.description,

                            date: expense.date,

                            time: expense.time,

                            bill: null,

                          });

                          if (expense.bill) {

                            setPreview(

                              `https://bmgum.onrender.com/uploads/bills/${expense.bill}`

                            );

                          }

                          window.scrollTo({

                            top: 0,

                            behavior: "smooth",

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

                              "Delete Expense?"

                            )

                          )

                            return;

                          try {

                            await axios.delete(

                              `https://bmgum.onrender.com/api/expenses/${expense.id}`

                            );

                            alert(

                              "Expense Deleted"

                            );

                            loadExpenses();

                          } catch (err) {

                            console.log(err);

                          }

                        }}

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

export default ExpenseManagement;