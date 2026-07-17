import { useEffect, useState } from "react";

import axios from "axios";

import {

    FaVideo,

    FaPlus,

    FaEdit,

    FaTrash,

    FaPlay,

    FaStop,

    FaCopy,

    FaShareAlt,

    FaSearch,

    FaCircle

} from "react-icons/fa";

import "../styles/admin/meetingmanagement.css";

const API = "https://bmgum.onrender.com";

function MeetingManagement() {

    const [meetings,setMeetings]=useState([]);

    const [search,setSearch]=useState("");

    const [loading,setLoading]=useState(true);

    const [editingId,setEditingId]=useState(null);

    const [formData,setFormData]=useState({

        title:"",

        roomName:""

    });

    // ================= LOAD =================

    const loadMeetings=async()=>{

        try{

            setLoading(true);

            const res=await axios.get(

                `${API}/api/meetings`

            );

            setMeetings(res.data);

        }

        catch(err){

            console.log(err);

        }

        finally{

            setLoading(false);

        }

    };

    useEffect(()=>{

        loadMeetings();

    },[]);

    // ================= HANDLE =================

    const handleChange=(e)=>{

        setFormData({

            ...formData,

            [e.target.name]:

            e.target.value

        });

    };

    // ================= RESET =================

    const resetForm=()=>{

        setEditingId(null);

        setFormData({

            title:"",

            roomName:""

        });

    };
        // ================= SAVE =================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingId) {

                await axios.put(

                    `${API}/api/meetings/${editingId}`,

                    formData

                );

                alert("Meeting Updated Successfully");

            }

            else {

                await axios.post(

                    `${API}/api/meetings`,

                    formData

                );

                alert("Meeting Created Successfully");

            }

            resetForm();

            loadMeetings();

        }

        catch (err) {

            console.log(err);

            alert("Something went wrong");

        }

    };

    // ================= EDIT =================

    const handleEdit = (item) => {

        setEditingId(item.id);

        setFormData({

            title: item.title,

            roomName: item.roomName

        });

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    };

    // ================= START =================

    const startMeeting = async (id) => {

        try {

            await axios.put(

                `${API}/api/meetings/start/${id}`

            );

            alert("Meeting Started");

            loadMeetings();

        }

        catch (err) {

            console.log(err);

        }

    };

    // ================= END =================

    const endMeeting = async (id) => {

        try {

            await axios.put(

                `${API}/api/meetings/end/${id}`

            );

            alert("Meeting Ended");

            loadMeetings();

        }

        catch (err) {

            console.log(err);

        }

    };

    // ================= DELETE =================

    const deleteMeeting = async (id) => {

        if (

            !window.confirm(

                "Delete this meeting?"

            )

        )

            return;

        try {

            await axios.delete(

                `${API}/api/meetings/${id}`

            );

            alert("Meeting Deleted");

            loadMeetings();

        }

        catch (err) {

            console.log(err);

        }

    };

    // ================= COPY LINK =================

    const copyLink = async (id) => {

        try {

            const res = await axios.get(

                `${API}/api/meetings/link/${id}`

            );

            const link =

                `${window.location.origin}${res.data.meetingLink}`;

            await navigator.clipboard.writeText(link);

            alert("Meeting Link Copied");

        }

        catch (err) {

            console.log(err);

        }

    };

    // ================= SHARE =================

    const shareLink = async (id) => {

        try {

            const res = await axios.get(

                `${API}/api/meetings/link/${id}`

            );

            const link =

                `${window.location.origin}${res.data.meetingLink}`;

            if (navigator.share) {

                await navigator.share({

                    title: "Live Meeting",

                    text: "Join Live Meeting",

                    url: link

                });

            }

            else {

                await navigator.clipboard.writeText(link);

                alert("Meeting Link Copied");

            }

        }

        catch (err) {

            console.log(err);

        }

    };

    // ================= SEARCH =================

    const filteredMeetings = meetings.filter(

        (item) =>

            item.title

                .toLowerCase()

                .includes(

                    search.toLowerCase()

                ) ||

            item.roomName

                .toLowerCase()

                .includes(

                    search.toLowerCase()

                )

    );
        return (

        <div className="meeting-page">

            {/* ================= PAGE HEADER ================= */}

            <div className="page-header">

                <div>

                    <h1>

                        🎥 Meeting Management

                    </h1>

                    <p>

                        Create, Start and Manage Live Meetings

                    </p>

                </div>

            </div>

            {/* ================= FORM ================= */}

            <div className="meeting-form-card">

                <h2>

                    {

                        editingId

                        ?

                        "✏ Edit Meeting"

                        :

                        "➕ Create New Meeting"

                    }

                </h2>

                <form

                    onSubmit={handleSubmit}

                    className="meeting-form"

                >

                    <div className="form-group">

                        <label>

                            Meeting Title

                        </label>

                        <input

                            type="text"

                            name="title"

                            placeholder="Ganesh Utsav Committee Meeting"

                            value={formData.title}

                            onChange={handleChange}

                            required

                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Room Name

                        </label>

                        <input

                            type="text"

                            name="roomName"

                            placeholder="ganesh2026"

                            value={formData.roomName}

                            onChange={handleChange}

                            required

                        />

                    </div>

                    <div className="button-group">

                        <button

                            type="submit"

                            className="save-btn"

                        >

                            {

                                editingId

                                ?

                                "💾 Update Meeting"

                                :

                                "➕ Create Meeting"

                            }

                        </button>

                        {

                            editingId &&

                            (

                                <button

                                    type="button"

                                    className="cancel-btn"

                                    onClick={resetForm}

                                >

                                    Cancel

                                </button>

                            )

                        }

                    </div>

                </form>

            </div>

            {/* ================= SEARCH ================= */}

            <div className="search-box">

                <FaSearch />

                <input

                    type="text"

                    placeholder="Search Meeting..."

                    value={search}

                    onChange={(e)=>

                        setSearch(

                            e.target.value

                        )

                    }

                />

            </div>

            {/* ================= TABLE ================= */}

            <div className="table-card">

                <table className="meeting-table">

                    <thead>

                        <tr>

                            <th>Status</th>

                            <th>Title</th>

                            <th>Room</th>

                            <th>Meeting Link</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>                        {

                            loading ?

                            (

                                <tr>

                                    <td

                                        colSpan="5"

                                        className="no-data"

                                    >

                                        Loading Meetings...

                                    </td>

                                </tr>

                            )

                            :

                            filteredMeetings.length===0 ?

                            (

                                <tr>

                                    <td

                                        colSpan="5"

                                        className="no-data"

                                    >

                                        No Meetings Found

                                    </td>

                                </tr>

                            )

                            :

                            filteredMeetings.map((item)=>(

                                <tr key={item.id}>

                                    <td>

                                        {

                                            item.status==="Live"

                                            ?

                                            (

                                                <span className="status live">

                                                    <FaCircle/>

                                                    Live

                                                </span>

                                            )

                                            :

                                            (

                                                <span className="status offline">

                                                    Offline

                                                </span>

                                            )

                                        }

                                    </td>

                                    <td>

                                        {item.title}

                                    </td>

                                    <td>

                                        {item.roomName}

                                    </td>

                                    <td>

                                        <a

                                            href={`${window.location.origin}${item.meetingLink}`}

                                            target="_blank"

                                            rel="noreferrer"

                                        >

                                            Open Link

                                        </a>

                                    </td>

                                    <td>

                                        <div className="action-buttons">

                                            {

                                                item.status==="Offline"

                                                &&

                                                <button

                                                    className="start-btn"

                                                    onClick={()=>

                                                        startMeeting(

                                                            item.id

                                                        )

                                                    }

                                                    title="Start Meeting"

                                                >

                                                    <FaPlay/>

                                                </button>

                                            }

                                            {

                                                item.status==="Live"

                                                &&

                                                <button

                                                    className="stop-btn"

                                                    onClick={()=>

                                                        endMeeting(

                                                            item.id

                                                        )

                                                    }

                                                    title="End Meeting"

                                                >

                                                    <FaStop/>

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

                                                className="copy-btn"

                                                onClick={()=>

                                                    copyLink(item.id)

                                                }

                                                title="Copy Link"

                                            >

                                                <FaCopy/>

                                            </button>

                                            <button

                                                className="share-btn"

                                                onClick={()=>

                                                    shareLink(item.id)

                                                }

                                                title="Share Link"

                                            >

                                                <FaShareAlt/>

                                            </button>

                                            <button

                                                className="delete-btn"

                                                onClick={()=>

                                                    deleteMeeting(item.id)

                                                }

                                                title="Delete"

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

export default MeetingManagement;