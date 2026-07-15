import { useState, useEffect } from "react";
import axios from "axios";

import {
  FaCalendarAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch
} from "react-icons/fa";

import "../styles/admin/timelinemanagement.css";

const API = "https://bmgum.onrender.com";

function TimelineManagement() {

  const [timeline, setTimeline] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    eventDate: "",
    description: ""
  });

  // ================= FETCH =================

  const fetchTimeline = async () => {

    try {

      const res = await axios.get(`${API}/api/timeline`);

      setTimeline(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    fetchTimeline();

  }, []);

  // ================= INPUT =================

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  };

  // ================= SAVE =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editingId) {

        await axios.put(

          `${API}/api/timeline/${editingId}`,

          form

        );

        alert("कार्यक्रम अपडेट झाला.");

      } else {

        await axios.post(

          `${API}/api/timeline`,

          form

        );

        alert("कार्यक्रम यशस्वीरित्या जोडला.");

      }

      setForm({

        title: "",
        eventDate: "",
        description: ""

      });

      setEditingId(null);

      fetchTimeline();

    } catch (err) {

      console.log(err);

      alert("डेटा सेव्ह करण्यात त्रुटी आली.");

    }

  };

  // ================= EDIT =================

  const handleEdit = (item) => {

  setEditingId(item.id);

  setForm({

    title: item.title || "",

    eventDate: item.eventdate
      ? item.eventdate.substring(0,10)
      : item.eventDate
      ? item.eventDate.substring(0,10)
      : "",

    description: item.description || ""

  });

  window.scrollTo({

    top:0,

    behavior:"smooth"

  });

};

  // ================= DELETE =================

  const handleDelete = async (id) => {

    const ok = window.confirm("हा कार्यक्रम हटवायचा आहे का?");

    if (!ok) return;

    try {

      await axios.delete(

        `${API}/api/timeline/${id}`

      );

      alert("कार्यक्रम हटविण्यात आला.");

      fetchTimeline();

    } catch (err) {

      console.log(err);

      alert("Delete Failed");

    }

  };

  // ================= SEARCH =================

const filteredTimeline = timeline.filter(

  (item)=>

    (item.title || "")

      .toLowerCase()

      .includes(search.toLowerCase())

);

  return (

    <div className="timeline-page">

      <h1>📅 कार्यक्रम व्यवस्थापन</h1>

      {/* Summary */}

      <div className="summary-grid">

        <div className="summary-card">

          <FaCalendarAlt />

          <h3>एकूण कार्यक्रम</h3>

          <h2>{timeline.length}</h2>

        </div>

      </div>

      {/* Form */}

      <form
        className="timeline-form"
        onSubmit={handleSubmit}
      >

        <h2>

          {editingId

            ? "✏️ कार्यक्रम अपडेट करा"

            : "➕ नवीन कार्यक्रम जोडा"}

        </h2>

        <div className="form-grid">

          <input

            type="text"

            name="title"

            placeholder="कार्यक्रमाचे नाव"

            value={form.title}

            onChange={handleChange}

            required

          />

          <input

            type="date"

            name="eventDate"

            value={form.eventDate}

            onChange={handleChange}

            required

          />

          <textarea

            name="description"

            placeholder="कार्यक्रमाचे वर्णन"

            rows="4"

            value={form.description}

            onChange={handleChange}

            required

          />

        </div>

        <button
          type="submit"
          className="save-btn"
        >

          <FaPlus />

          {editingId

            ? " अपडेट करा"

            : " कार्यक्रम जोडा"}

        </button>

      </form>

      {/* Search */}

      <div className="search-bar">

        <FaSearch />

        <input

          type="text"

          placeholder="कार्यक्रम शोधा..."

          value={search}

          onChange={(e) => setSearch(e.target.value)}

        />

      </div>

      {/* Table */}

      <div className="table-container">

        <table className="timeline-table">

          <thead>

            <tr>

              <th>क्र.</th>

              <th>कार्यक्रम</th>

              <th>तारीख</th>

              <th>वर्णन</th>

              <th>क्रिया</th>

            </tr>

          </thead>

          <tbody>

{

filteredTimeline.length>0 ?

(

filteredTimeline.map((item)=>(

<tr key={item.id}>

<td>{item.id}</td>

<td>{item.title}</td>

<td>

{

item.eventdate

?

new Date(item.eventdate)

.toLocaleDateString("en-GB")

:

item.eventDate

?

new Date(item.eventDate)

.toLocaleDateString("en-GB")

:

"-"

}

</td>

<td>{item.description}</td>

<td>

<button

type="button"

className="edit-btn"

onClick={()=>handleEdit(item)}

>

<FaEdit/>

</button>

<button

type="button"

className="delete-btn"

onClick={()=>handleDelete(item.id)}

>

<FaTrash/>

</button>

</td>

</tr>

))

)

:

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

}

</tbody>

        </table>

      </div>

    </div>

  );

}

export default TimelineManagement;