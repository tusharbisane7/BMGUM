import { useEffect, useState } from "react";
import axios from "axios";

import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaSave,
} from "react-icons/fa";

import "../styles/admin/aartimanagement.css";

function AartiManagement() {

  const [aartiList, setAartiList] = useState([]);

  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [summary, setSummary] = useState({

    total: 0,

    today: 0,

    special: 0,

    upcoming: 0

  });

  const [formData, setFormData] = useState({

    name: "",

    day: "",

    date: "",

    time: "",

    performedBy: "",

    type: "दैनिक",

    status: "आगामी"

  });

  // ================= LOAD DATA =================

  const loadAarti = async () => {

  try {

    const res = await axios.get(
      "https://bmgum.onrender.com/api/aarti"
    );

    setAartiList(
      Array.isArray(res.data) ? res.data : []
    );

  }

  catch (err) {

    console.log(err);

    setAartiList([]);

  }

};

  useEffect(() => {

    loadAarti();

  }, []);

  // ================= SUMMARY =================

 useEffect(() => {

  setSummary({

    total: aartiList.length,

    today: aartiList.filter(

      a => (a.status || "") === "आज"

    ).length,

    special: aartiList.filter(

      a => (a.type || "") === "विशेष"

    ).length,

    upcoming: aartiList.filter(

      a => (a.status || "") === "आगामी"

    ).length

  });

}, [aartiList]);

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };

  // ================= SAVE =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if(editingId){

       await axios.put(

`https://bmgum.onrender.com/api/aarti/${editingId}`,

formData

);

        alert("आरती अपडेट झाली.");

      }

      else{

        await axios.post(

          "https://bmgum.onrender.com/api/aarti",

          formData

        );

        alert("आरती जतन झाली.");

      }

      setFormData({

        name: "",

        day: "",

        date: "",

        time: "",

        performedBy: "",

        type: "दैनिक",

        status: "आगामी"

      });

      setEditingId(null);

      loadAarti();

    }

    catch(err){

      console.log(err);

      alert("डेटा जतन करण्यात त्रुटी.");

    }

  };

  return (

    <div className="aarti-page">

      <h1>

        🪔 आरती व्यवस्थापन

      </h1>

      {/* Dashboard Cards */}

      <div className="summary-grid">

        <div className="summary-card">

          <FaCalendarAlt />

          <h3>

            एकूण आरती

          </h3>

          <h2>

            {summary.total}

          </h2>

        </div>

        <div className="summary-card">

          <FaClock />

          <h3>

            आजच्या आरत्या

          </h3>

          <h2>

            {summary.today}

          </h2>

        </div>

        <div className="summary-card">

          ⭐

          <h3>

            विशेष आरती

          </h3>

          <h2>

            {summary.special}

          </h2>

        </div>

        <div className="summary-card">

          <FaUsers />

          <h3>

            आगामी आरती

          </h3>

          <h2>

            {summary.upcoming}

          </h2>

        </div>

      </div>

      {/* Form */}

      <form

        className="aarti-form"

        onSubmit={handleSubmit}

      >

        <h2>

          {editingId

            ? "✏️ आरती संपादित करा"

            : "➕ नवीन आरती"}

        </h2>

        <div className="form-grid">

          <input

            type="text"

            name="name"

            placeholder="आरतीचे नाव"

            value={formData.name}

            onChange={handleChange}

            required

          />

          <input

            type="text"

            name="day"

            placeholder="वार"

            value={formData.day}

            onChange={handleChange}

            required

          />

          <input

            type="date"

            name="date"

            value={formData.date}

            onChange={handleChange}

            required

          />

          <input

            type="time"

            name="time"

            value={formData.time}

            onChange={handleChange}

            required

          />

          <input

            type="text"

            name="performedBy"

            placeholder="आरती करणारे"

            value={formData.performedBy}

            onChange={handleChange}

            required

          />

          <select

            name="type"

            value={formData.type}

            onChange={handleChange}

          >

            <option>दैनिक</option>

            <option>विशेष</option>

            <option>महाप्रसाद</option>

          </select>

          <select

            name="status"

            value={formData.status}

            onChange={handleChange}

          >

            <option>आज</option>

            <option>आगामी</option>

          </select>

        </div>

        <button

          className="save-btn"

          type="submit"

        >

          <FaSave />

          {editingId

            ? " अपडेट करा"

            : " जतन करा"}

        </button>

      </form>
            {/* ================= SEARCH ================= */}

      <div className="search-bar">

        <FaSearch />

        <input

          type="text"

          placeholder="आरती शोधा..."

          value={search}

          onChange={(e) =>

            setSearch(e.target.value)

          }

        />

      </div>

      {/* ================= TABLE ================= */}

      <div className="table-container">

        <table className="aarti-table">

          <thead>

            <tr>

              <th>क्र.</th>

              <th>आरतीचे नाव</th>

              <th>वार</th>

              <th>तारीख</th>

              <th>वेळ</th>

              <th>आरती करणारे</th>

              <th>प्रकार</th>

              <th>स्थिती</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {

              aartiList
.filter((item)=>

(item.name || "")
.toLowerCase()
.includes(search.toLowerCase())

)

              .map((item,index)=>(

                <tr key={item.id}>

                  <td>

                    {index+1}

                  </td>

                  <td>

                    {item.name}

                  </td>

                  <td>

                    {item.day}

                  </td>

                  <td>

{

item.date

?

new Date(item.date)

.toLocaleDateString("en-GB")

:

"-"

}

</td>

                  <td>

                    {item.time}

                  </td>

                  <td>

{

item.performedBy ??

item.performedby ??

"-"

}

</td>

                  <td>

                    <span className="type-badge">

                      {item.type}

                    </span>

                  </td>

                  <td>

                    <span

                      className={

                        item.status==="आज"

                        ?

                        "status today"

                        :

                        "status upcoming"

                      }

                    >

                      {item.status}

                    </span>

                  </td>

                  <td>

                    <button

                      className="edit-btn"

                      onClick={()=>{

                        setEditingId(item.id);

                        setFormData({

  name: item.name || "",

  day: item.day || "",

  date:
    item.date
      ? item.date.substring(0,10)
      : "",

  time: item.time || "",

  performedBy:
    item.performedBy ??
    item.performedby ??
    "",

  type: item.type || "दैनिक",

  status: item.status || "आगामी"

});

                        window.scrollTo({

                          top:0,

                          behavior:"smooth"

                        });

                      }}

                    >

                      <FaEdit />

                    </button>

                    <button

                      className="delete-btn"

                      onClick={async()=>{

                        if(

                          !window.confirm(

                            "ही आरती हटवायची आहे का?"

                          )

                        )

                          return;

                        try{

                         await axios.delete(

`https://bmgum.onrender.com/api/aarti/${item.id}`

);

                          loadAarti();

                        }

                        catch(err){

                          console.log(err);

                          alert("Delete Failed");

                        }

                      }}

                    >

                      <FaTrash />

                    </button>

                  </td>

                </tr>

              ))

            }

            {

              aartiList.length===0 && (

                <tr>

                  <td

                    colSpan="9"

                    style={{

                      textAlign:"center",

                      padding:"20px"

                    }}

                  >

                    कोणतीही आरती उपलब्ध नाही.

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

export default AartiManagement;