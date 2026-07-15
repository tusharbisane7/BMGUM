import { useState, useEffect } from "react";
import axios from "axios";

import {
  FaBullhorn,
  FaSave,
  FaUndo,
  FaEdit,
  FaTrash,
  FaSearch,
  FaThumbtack,
} from "react-icons/fa";

import "../styles/admin/notice.css";

function NoticeManagement() {

  const [notices, setNotices] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({

    title: "",

    type: "Information",

    description: "",

    startDate: "",

    endDate: "",

    pinned: false,

    status: "Active",

  });

  const loadNotices = async () => {

    try {

      setLoading(true);

      const res = await axios.get(

        "https://bmgum.onrender.com/api/notices"

      );

      setNotices(res.data);

    }

    catch(err){

      console.log(err);

    }

    finally{

      setLoading(false);

    }

  };

  useEffect(()=>{

    loadNotices();

  },[]);

  const handleChange=(e)=>{

    const {name,value,type,checked}=e.target;

    setFormData({

      ...formData,

      [name]:

      type==="checkbox"

      ? checked

      : value

    });

  };

  const clearForm=()=>{

    setEditingId(null);

    setFormData({

      title:"",

      type:"Information",

      description:"",

      startDate:"",

      endDate:"",

      pinned:false,

      status:"Active"

    });

  };

  const handleSubmit=async(e)=>{

    e.preventDefault();

    try{

      if(editingId){

        await axios.put(

          `http://localhost:5000/api/notices/${editingId}`,

          formData

        );

        alert("Notice Updated");

      }

      else{

        await axios.post(

          "https://bmgum.onrender.com/api/notices",

          formData

        );

        alert("Notice Added");

      }

      clearForm();

      loadNotices();

    }

    catch(err){

      console.log(err);

      alert("Error Saving Notice");

    }

  };

  return(
    <div className="notice-page">

  {/* ================= TITLE ================= */}

  <div className="page-title">

    <FaBullhorn className="title-icon"/>

    <div>

      <h1>Notice Management</h1>

      <p>Add, Edit & Manage Notices</p>

    </div>

  </div>

  {/* ================= FORM ================= */}

  <div className="notice-card">

    <form
      className="notice-form"
      onSubmit={handleSubmit}
    >

      <div className="form-group">

        <label>Notice Title *</label>

        <input

          type="text"

          name="title"

          placeholder="Enter Notice Title"

          value={formData.title}

          onChange={handleChange}

          required

        />

      </div>

      <div className="form-group">

        <label>Notice Type</label>

        <select

          name="type"

          value={formData.type}

          onChange={handleChange}

        >

          <option>Information</option>

          <option>Announcement</option>

          <option>Event</option>

          <option>Emergency</option>

        </select>

      </div>

      <div className="form-group full">

        <label>Description</label>

        <textarea

          rows="5"

          name="description"

          value={formData.description}

          onChange={handleChange}

          placeholder="Enter Notice Description"

        />

      </div>

      <div className="form-group">

        <label>Start Date</label>

        <input

          type="date"

          name="startDate"

          value={formData.startDate}

          onChange={handleChange}

        />

      </div>

      <div className="form-group">

        <label>End Date</label>

        <input

          type="date"

          name="endDate"

          value={formData.endDate}

          onChange={handleChange}

        />

      </div>

      <div className="form-group">

        <label>Status</label>

        <select

          name="status"

          value={formData.status}

          onChange={handleChange}

        >

          <option>Active</option>

          <option>Inactive</option>

        </select>

      </div>

      <div className="form-group checkbox">

        <label>

          <input

            type="checkbox"

            name="pinned"

            checked={formData.pinned}

            onChange={handleChange}

          />

          <FaThumbtack />

          Pin Notice

        </label>

      </div>

      <div className="button-group">

        <button

          type="submit"

          className="save-btn"

        >

          <FaSave/>

          {editingId

            ? "Update Notice"

            : "Save Notice"}

        </button>

        <button

          type="button"

          className="clear-btn"

          onClick={clearForm}

        >

          <FaUndo/>

          Clear

        </button>

      </div>

    </form>

  </div>

  {/* ================= SUMMARY ================= */}

  <div className="summary-card">

    <div className="summary-box">

      <h3>Total Notices</h3>

      <h2>{notices.length}</h2>

    </div>

    <div className="summary-box">

      <h3>Active</h3>

      <h2>

        {

          notices.filter(

            n=>n.status==="Active"

          ).length

        }

      </h2>

    </div>

    <div className="summary-box">

      <h3>Pinned</h3>

      <h2>

        {

          notices.filter(

            n=>n.pinned

          ).length

        }

      </h2>

    </div>

  </div>

  {/* ================= SEARCH ================= */}

  <div className="search-box">

    <FaSearch/>

    <input

      type="text"

      placeholder="Search Notice..."

      value={search}

      onChange={(e)=>setSearch(e.target.value)}

    />

  </div>

  {/* ================= TABLE ================= */}

  <div className="table-card">

    <table className="notice-table">

      <thead>

        <tr>

          <th>ID</th>

          <th>Title</th>

          <th>Type</th>

          <th>Status</th>

          <th>Start</th>

          <th>End</th>

          <th>Pinned</th>

          <th>Action</th>

        </tr>

      </thead>

      <tbody>

        {

          notices

          .filter(item=>

            item.title

            .toLowerCase()

            .includes(search.toLowerCase())

          )

          .length===0 ?

          (

            <tr>

              <td

                colSpan="8"

                className="no-data"

              >

                No Notice Found

              </td>

            </tr>

          )

          :

          notices

          .filter(item=>

            item.title

            .toLowerCase()

            .includes(search.toLowerCase())

          )

          .map(notice=>(

            <tr key={notice.id}>

              <td>{notice.id}</td>

              <td>{notice.title}</td>

              <td>{notice.type}</td>

              <td>{notice.status}</td>

              <td>{notice.startDate}</td>

              <td>{notice.endDate}</td>

              <td>

                {

                  notice.pinned

                  ?

                  "📌"

                  :

                  "-"

                }

              </td>

              <td>

                <div className="action-buttons">

                  <button

                    className="edit-btn"

                    onClick={()=>{

                      setEditingId(notice.id);

                      setFormData({

                        title:notice.title,

                        type:notice.type,

                        description:notice.description,

                        startDate:notice.startDate,

                        endDate:notice.endDate,

                        pinned:notice.pinned,

                        status:notice.status

                      });

                    }}

                  >

                    <FaEdit/>

                  </button>

                  <button

                    className="delete-btn"

                    onClick={async()=>{

                      if(!window.confirm("Delete Notice?")) return;

                      await axios.delete(

                        `http://localhost:5000/api/notices/${notice.id}`

                      );

                      loadNotices();

                    }}

                  >

                    <FaTrash/>

                  </button>

                </div>

              </td>

            </tr>

          ))

        }

      </tbody>

    </table>

  </div>

</div>

);

}

export default NoticeManagement;