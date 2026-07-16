import { useEffect, useState } from "react";

import axios from "axios";

import {

    FaUsers,

    FaCheckCircle,

    FaClock,

    FaTimesCircle,

    FaEdit,

    FaTrash,

    FaSearch,

    FaPrint,

    FaUserCheck,

    FaUserTimes

} from "react-icons/fa";

import "../styles/admin/volunteermanagement.css";

const API = "https://bmgum.onrender.com";

function VolunteerManagement() {

    const [volunteers,setVolunteers]=useState([]);

    const [summary,setSummary]=useState({

        total:0,

        approved:0,

        pending:0,

        rejected:0

    });

    const [search,setSearch]=useState("");

    const [loading,setLoading]=useState(true);

    const [editingId,setEditingId]=useState(null);

    const [preview,setPreview]=useState(null);

    const [formData,setFormData]=useState({

        fullName:"",

        mobile:"",

        age:"",

        gender:"Male",

        address:"",

        status:"Pending",

        photo:null

    });

    // ================= LOAD VOLUNTEERS =================

    const loadVolunteers=async()=>{

        try{

            setLoading(true);

            const res=await axios.get(

                `${API}/api/volunteers`

            );

            setVolunteers(res.data);

        }

        catch(err){

            console.log(err);

        }

        finally{

            setLoading(false);

        }

    };

    // ================= LOAD SUMMARY =================

    const loadSummary=async()=>{

        try{

            const res=await axios.get(

                `${API}/api/volunteers/summary`

            );

            setSummary(res.data);

        }

        catch(err){

            console.log(err);

        }

    };

    useEffect(()=>{

        loadVolunteers();

        loadSummary();

    },[]);
        // ================= HANDLE CHANGE =================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    // ================= PHOTO =================

    const handlePhoto = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setFormData({

            ...formData,

            photo: file

        });

        setPreview(

            URL.createObjectURL(file)

        );

    };

    // ================= EDIT =================

    const handleEdit = (item) => {

        setEditingId(item.id);

        setFormData({

            fullName: item.fullName,

            mobile: item.mobile,

            age: item.age,

            gender: item.gender,

            address: item.address,

            status: item.status,

            photo: null

        });

        if (item.photo) {

            setPreview(

                `${API}/uploads/volunteers/${item.photo}`

            );

        }

        else {

            setPreview(null);

        }

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    };

    // ================= UPDATE =================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!editingId) return;

        const data = new FormData();

        data.append("fullName", formData.fullName);

        data.append("mobile", formData.mobile);

        data.append("age", formData.age);

        data.append("gender", formData.gender);

        data.append("address", formData.address);

        data.append("status", formData.status);

        if (formData.photo) {

            data.append(

                "photo",

                formData.photo

            );

        }

        try {

            await axios.put(

                `${API}/api/volunteers/${editingId}`,

                data,

                {

                    headers: {

                        "Content-Type":

                            "multipart/form-data"

                    }

                }

            );

            alert(

                "Volunteer Updated Successfully"

            );

            setEditingId(null);

            setPreview(null);

            loadVolunteers();

            loadSummary();

        }

        catch (err) {

            console.log(err);

        }

    };

    // ================= APPROVE =================

    const approveVolunteer = async (id) => {

        try {

            await axios.put(

                `${API}/api/volunteers/approve/${id}`,

                {

                    approvedBy:

                    "Admin"

                }

            );

            alert(

                "Volunteer Approved"

            );

            loadVolunteers();

            loadSummary();

        }

        catch (err) {

            console.log(err);

        }

    };

    // ================= REJECT =================

    const rejectVolunteer = async (id) => {

        try {

            await axios.put(

                `${API}/api/volunteers/reject/${id}`

            );

            alert(

                "Volunteer Rejected"

            );

            loadVolunteers();

            loadSummary();

        }

        catch (err) {

            console.log(err);

        }

    };

    // ================= DELETE =================

    const deleteVolunteer = async (id) => {

        if (

            !window.confirm(

                "Delete this Volunteer?"

            )

        )

            return;

        try {

            await axios.delete(

                `${API}/api/volunteers/${id}`

            );

            alert(

                "Volunteer Deleted"

            );

            loadVolunteers();

            loadSummary();

        }

        catch (err) {

            console.log(err);

        }

    };

    // ================= SEARCH =================

    const filteredVolunteers = volunteers.filter(

        (item) =>

            item.fullName

                .toLowerCase()

                .includes(

                    search.toLowerCase()

                ) ||

            item.mobile

                .includes(search)

    );
        return (

        <div className="volunteer-management">

            {/* ================= TITLE ================= */}

            <div className="page-header">

                <h1>

                    🙋 Volunteer Management

                </h1>

                <p>

                    Manage All Registered Volunteers

                </p>

            </div>

            {/* ================= SUMMARY ================= */}

            <div className="summary-grid">

                <div className="summary-card">

                    <FaUsers />

                    <div>

                        <h3>

                            Total Volunteers

                        </h3>

                        <h2>

                            {summary.total}

                        </h2>

                    </div>

                </div>

                <div className="summary-card approved">

                    <FaCheckCircle />

                    <div>

                        <h3>

                            Approved

                        </h3>

                        <h2>

                            {summary.approved}

                        </h2>

                    </div>

                </div>

                <div className="summary-card pending">

                    <FaClock />

                    <div>

                        <h3>

                            Pending

                        </h3>

                        <h2>

                            {summary.pending}

                        </h2>

                    </div>

                </div>

                <div className="summary-card rejected">

                    <FaTimesCircle />

                    <div>

                        <h3>

                            Rejected

                        </h3>

                        <h2>

                            {summary.rejected}

                        </h2>

                    </div>

                </div>

            </div>

            {/* ================= SEARCH ================= */}

            <div className="search-box">

                <FaSearch />

                <input

                    type="text"

                    placeholder="Search Volunteer..."

                    value={search}

                    onChange={(e)=>

                        setSearch(

                            e.target.value

                        )

                    }

                />

            </div>

            {/* ================= EDIT FORM ================= */}

            {

                editingId &&

                (

                    <div className="edit-card">

                        <h2>

                            ✏ Edit Volunteer

                        </h2>

                        <form

                            onSubmit={handleSubmit}

                            className="edit-form"

                            encType="multipart/form-data"

                        >

                            <input

                                type="text"

                                name="fullName"

                                placeholder="Full Name"

                                value={formData.fullName}

                                onChange={handleChange}

                                required

                            />

                            <input

                                type="text"

                                name="mobile"

                                placeholder="Mobile"

                                value={formData.mobile}

                                onChange={handleChange}

                                required

                            />

                            <input

                                type="number"

                                name="age"

                                placeholder="Age"

                                value={formData.age}

                                onChange={handleChange}

                            />

                            <select

                                name="gender"

                                value={formData.gender}

                                onChange={handleChange}

                            >

                                <option>

                                    Male

                                </option>

                                <option>

                                    Female

                                </option>

                                <option>

                                    Other

                                </option>

                            </select>

                            <textarea

                                rows="3"

                                name="address"

                                placeholder="Address"

                                value={formData.address}

                                onChange={handleChange}

                            />

                            <select

                                name="status"

                                value={formData.status}

                                onChange={handleChange}

                            >

                                <option>

                                    Pending

                                </option>

                                <option>

                                    Approved

                                </option>

                                <option>

                                    Rejected

                                </option>

                            </select>

                            <input

                                type="file"

                                accept="image/*"

                                onChange={handlePhoto}

                            />

                            {

                                preview &&

                                (

                                    <img

                                        src={preview}

                                        alt="Preview"

                                        className="preview"

                                    />

                                )

                            }

                            <button

                                type="submit"

                                className="save-btn"

                            >

                                Save Changes

                            </button>

                        </form>

                    </div>

                )

            }
                        {/* ================= VOLUNTEER TABLE ================= */}

            <div className="table-card">

                <table className="volunteer-table">

                    <thead>

                        <tr>

                            <th>Photo</th>

                            <th>Volunteer ID</th>

                            <th>Name</th>

                            <th>Mobile</th>

                            <th>Age</th>

                            <th>Gender</th>

                            <th>Status</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            loading ?

                            (

                                <tr>

                                    <td

                                        colSpan="8"

                                        className="no-data"

                                    >

                                        Loading...

                                    </td>

                                </tr>

                            )

                            :

                            filteredVolunteers.length===0 ?

                            (

                                <tr>

                                    <td

                                        colSpan="8"

                                        className="no-data"

                                    >

                                        No Volunteers Found

                                    </td>

                                </tr>

                            )

                            :

                            filteredVolunteers.map((item)=>(

                                <tr key={item.id}>

                                    <td>

                                        {

                                            item.photo ?

                                            (

                                                <img

                                                    src={`${API}/uploads/volunteers/${item.photo}`}

                                                    alt={item.fullName}

                                                    className="table-photo"

                                                />

                                            )

                                            :

                                            "—"

                                        }

                                    </td>

                                    <td>

                                        {item.volunteerId}

                                    </td>

                                    <td>

                                        {item.fullName}

                                    </td>

                                    <td>

                                        {item.mobile}

                                    </td>

                                    <td>

                                        {item.age}

                                    </td>

                                    <td>

                                        {item.gender}

                                    </td>

                                    <td>

                                        <span

                                            className={`status ${

                                                item.status.toLowerCase()

                                            }`}

                                        >

                                            {item.status}

                                        </span>

                                    </td>

                                    <td>

                                        <div className="action-buttons">

                                            {

                                                item.status==="Pending"

                                                &&

                                                <button

                                                    className="approve-btn"

                                                    onClick={()=>

                                                        approveVolunteer(

                                                            item.id

                                                        )

                                                    }

                                                    title="Approve"

                                                >

                                                    <FaUserCheck/>

                                                </button>

                                            }

                                            {

                                                item.status!=="Rejected"

                                                &&

                                                <button

                                                    className="reject-btn"

                                                    onClick={()=>

                                                        rejectVolunteer(

                                                            item.id

                                                        )

                                                    }

                                                    title="Reject"

                                                >

                                                    <FaUserTimes/>

                                                </button>

                                            }

                                            <button

                                                className="edit-btn"

                                                onClick={()=>

                                                    handleEdit(item)

                                                }

                                                title="Edit"

                                            >

                                                <FaEdit/>

                                            </button>

                                            <button

                                                className="delete-btn"

                                                onClick={()=>

                                                    deleteVolunteer(item.id)

                                                }

                                                title="Delete"

                                            >

                                                <FaTrash/>

                                            </button>

                                            {

                                                item.status==="Approved"

                                                &&

                                                <button

                                                    className="print-btn"

                                                    onClick={()=>

                                                        window.print()

                                                    }

                                                    title="Print ID"

                                                >

                                                    <FaPrint/>

                                                </button>

                                            }

                                        </div>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>
                        {/* ================= PRINTABLE VOLUNTEER ID ================= */}

            <div

                id="printVolunteerCard"

                className="print-card"

            >

                <div className="card-header">

                    <img

                        src="/logo.png"

                        alt="Mandal"

                        className="mandal-logo"

                    />

                    <div>

                        <h2>

                            बाल मित्र गणेश उत्सव मंडळ

                        </h2>

                        <p>

                            अचलपूर, जि. अमरावती

                        </p>

                    </div>

                </div>

                <hr/>

                {

                    filteredVolunteers

                    .filter(

                        (v)=>

                        v.status==="Approved"

                    )

                    .map((item)=>(

                        <div

                            key={item.id}

                            className="id-card"

                        >

                            <div className="id-left">

                                {

                                    item.photo ?

                                    (

                                        <img

                                            src={`${API}/uploads/volunteers/${item.photo}`}

                                            alt={item.fullName}

                                            className="id-photo"

                                        />

                                    )

                                    :

                                    (

                                        <div className="id-placeholder">

                                            👤

                                        </div>

                                    )

                                }

                            </div>

                            <div className="id-right">

                                <h3>

                                    स्वयंसेवक ओळखपत्र

                                </h3>

                                <table>

                                    <tbody>

                                        <tr>

                                            <td>

                                                <strong>

                                                    आयडी

                                                </strong>

                                            </td>

                                            <td>

                                                {item.volunteerId}

                                            </td>

                                        </tr>

                                        <tr>

                                            <td>

                                                <strong>

                                                    नाव

                                                </strong>

                                            </td>

                                            <td>

                                                {item.fullName}

                                            </td>

                                        </tr>

                                        <tr>

                                            <td>

                                                <strong>

                                                    मोबाईल

                                                </strong>

                                            </td>

                                            <td>

                                                {item.mobile}

                                            </td>

                                        </tr>

                                        <tr>

                                            <td>

                                                <strong>

                                                    वय

                                                </strong>

                                            </td>

                                            <td>

                                                {item.age}

                                            </td>

                                        </tr>

                                        <tr>

                                            <td>

                                                <strong>

                                                    लिंग

                                                </strong>

                                            </td>

                                            <td>

                                                {item.gender}

                                            </td>

                                        </tr>

                                        <tr>

                                            <td>

                                                <strong>

                                                    पत्ता

                                                </strong>

                                            </td>

                                            <td>

                                                {item.address}

                                            </td>

                                        </tr>

                                    </tbody>

                                </table>

                                <div className="signature">

                                    ______________________

                                    <br/>

                                    अधिकृत स्वाक्षरी

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default VolunteerManagement;