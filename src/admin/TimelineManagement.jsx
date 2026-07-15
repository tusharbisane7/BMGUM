import { useState, useEffect } from "react";
import axios from "axios";

import {
  FaCalendarAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaSave,
  FaUndo
} from "react-icons/fa";

import "../styles/admin/timelinemanagement.css";

const API = "https://bmgum.onrender.com";

function TimelineManagement() {

  const [timeline, setTimeline] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({

    title: "",

    eventDate: "",

    description: ""

  });

  // ================= LOAD TIMELINE =================

  const fetchTimeline = async () => {

    try {

      setLoading(true);

      const res = await axios.get(

        `${API}/api/timeline`

      );

      setTimeline(

        Array.isArray(res.data)

          ? res.data

          : []

      );

    }

    catch (err) {

      console.log(err);

    }

    finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchTimeline();

  }, []);

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  };

  // ================= RESET FORM =================

  const clearForm = () => {

    setEditingId(null);

    setForm({

      title: "",

      eventDate: "",

      description: ""

    });

  };
    // ================= SAVE =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editingId) {

        await axios.put(

          `${API}/api/timeline/${editingId}`,

          {

            title: form.title,

            eventDate: form.eventDate,

            description: form.description

          }

        );

        alert("कार्यक्रम अपडेट झाला.");

      }

      else {

        await axios.post(

          `${API}/api/timeline`,

          {

            title: form.title,

            eventDate: form.eventDate,

            description: form.description

          }

        );

        alert("कार्यक्रम यशस्वीरित्या जोडला.");

      }

      clearForm();

      fetchTimeline();

    }

    catch (err) {

      console.log(err);

      alert(

        err.response?.data?.message ||

        "डेटा सेव्ह करण्यात त्रुटी आली."

      );

    }

  };

  // ================= EDIT =================

  const handleEdit = (item) => {

    setEditingId(item.id);

    setForm({

      title: item.title || "",

      eventDate:
item.eventDate
? new Date(item.eventDate)

              .toISOString()

              .split("T")[0]

          : "",

      description: item.description || ""

    });

    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });

  };

  // ================= DELETE =================

  const handleDelete = async (id) => {

    if (

      !window.confirm(

        "हा कार्यक्रम हटवायचा आहे का?"

      )

    )

      return;

    try {

      await axios.delete(

        `${API}/api/timeline/${id}`

      );

      alert("कार्यक्रम हटविण्यात आला.");

      fetchTimeline();

    }

    catch (err) {

      console.log(err);

      alert("Delete Failed");

    }

  };

  // ================= SEARCH =================

  const filteredTimeline = timeline.filter(

    (item) =>

      (item.title || "")

        .toLowerCase()

        .includes(search.toLowerCase())

  );

  return (

    <div className="timeline-page">      {/* ================= HEADER ================= */}

      <div className="page-title">

        <FaCalendarAlt className="title-icon" />

        <div>

          <h1>कार्यक्रम व्यवस्थापन</h1>

          <p>Add, Edit & Manage Timeline Events</p>

        </div>

      </div>

      {/* ================= SUMMARY ================= */}

      <div className="summary-card">

        <div className="summary-box">

          <FaCalendarAlt className="summary-icon" />

          <h3>Total Events</h3>

          <h2>{timeline.length}</h2>

        </div>

      </div>

      {/* ================= FORM ================= */}

      <div className="timeline-card">

        <form

          className="timeline-form"

          onSubmit={handleSubmit}

        >

          <h2>

            {

              editingId

              ?

              "✏️ कार्यक्रम अपडेट करा"

              :

              "➕ नवीन कार्यक्रम जोडा"

            }

          </h2>

          <div className="form-grid">

            {/* Title */}

            <div className="form-group">

              <label>कार्यक्रमाचे नाव</label>

              <input

                type="text"

                name="title"

                placeholder="कार्यक्रमाचे नाव"

                value={form.title}

                onChange={handleChange}

                required

              />

            </div>

            {/* Date */}

            <div className="form-group">

              <label>कार्यक्रमाची तारीख</label>

              <input

                type="date"

                name="eventDate"

                value={form.eventDate}

                onChange={handleChange}

                required

              />

            </div>

            {/* Description */}

            <div className="form-group full">

              <label>वर्णन</label>

              <textarea

                rows="5"

                name="description"

                placeholder="कार्यक्रमाचे वर्णन"

                value={form.description}

                onChange={handleChange}

                required

              />

            </div>

          </div>

          <div className="button-group">

            <button

              type="submit"

              className="save-btn"

            >

              <FaSave />

              {

                editingId

                ?

                " Update Event"

                :

                " Save Event"

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

      {/* ================= SEARCH ================= */}

      <div className="search-box">

        <FaSearch />

        <input

          type="text"

          placeholder="Search Event..."

          value={search}

          onChange={(e)=>

            setSearch(e.target.value)

          }

        />

      </div>      {/* ================= TABLE ================= */}

      <div className="table-card">

        <div className="table-header">

          <h2>Timeline Records</h2>

        </div>

        {

          loading

          ?

          (

            <div className="loading">

              Loading Timeline...

            </div>

          )

          :

          (

            <table className="timeline-table">

              <thead>

                <tr>

                  <th>ID</th>

                  <th>कार्यक्रम</th>

                  <th>तारीख</th>

                  <th>वर्णन</th>

                  <th>Action</th>

                </tr>

              </thead>

              <tbody>

                {

                  filteredTimeline.length === 0

                  ?

                  (

                    <tr>

                      <td

                        colSpan="5"

                        className="no-data"

                      >

                        कोणताही कार्यक्रम उपलब्ध नाही.

                      </td>

                    </tr>

                  )

                  :

                  (

                    filteredTimeline.map((item)=>(

                      <tr key={item.id}>

                        <td>

                          {item.id}

                        </td>

                        <td>

                          {item.title}

                        </td>

                        <td>

                          {

                            item.eventDate
?
new Date(item.eventDate)

                              .toLocaleDateString("en-GB")

                            :

                            "-"

                          }

                        </td>

                        <td>

                          {item.description}

                        </td>

                        <td>

                          <div className="action-buttons">

                            <button

                              type="button"

                              className="edit-btn"

                              onClick={()=>

                                handleEdit(item)

                              }

                            >

                              <FaEdit />

                            </button>

                            <button

                              type="button"

                              className="delete-btn"

                              onClick={()=>

                                handleDelete(item.id)

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

export default TimelineManagement;
