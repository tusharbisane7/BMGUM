import { useEffect, useState } from "react";
import axios from "axios";

import {
    FaUsers,
    FaSearch,
    FaPhone,
    FaIdCard,
    FaBirthdayCake,
    FaMapMarkerAlt,
    FaVenusMars,
    FaPrint
} from "react-icons/fa";

import "../styles/volunteers.css";

const API = "https://bmgum.onrender.com";

function Volunteers(){

    const [volunteers,setVolunteers] = useState([]);

    const [filtered,setFiltered] = useState([]);

    const [loading,setLoading] = useState(true);

    const [search,setSearch] = useState("");

    // ================= LOAD APPROVED VOLUNTEERS =================

    const loadVolunteers = async()=>{

        try{

            const res = await axios.get(

                `${API}/api/volunteers/approved`

            );

            setVolunteers(res.data);

            setFiltered(res.data);

        }

        catch(err){

            console.log(err);

        }

        finally{

            setLoading(false);

        }

    };

    useEffect(()=>{

        loadVolunteers();

    },[]);

    // ================= SEARCH =================

    useEffect(()=>{

        const list = volunteers.filter((item)=>

            item.fullName
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )

            ||

            item.mobile.includes(search)

            ||

            item.volunteerId
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )

        );

        setFiltered(list);

    },[search,volunteers]);

    // ================= PRINT ID =================

    const printVolunteerId = (item)=>{

        const photo = item.photo
            ? `${API}/uploads/volunteers/${item.photo}`
            : "";

        const win = window.open("", "_blank");

        win.document.write(`

        <html>

        <head>

        <title>Volunteer ID Card</title>

        <style>

        body{

            font-family:Arial,sans-serif;

            background:#f2f2f2;

            display:flex;

            justify-content:center;

            align-items:center;

            padding:40px;

        }

        .card{

            width:420px;

            border-radius:18px;

            border:3px solid #ff9800;

            background:white;

            overflow:hidden;

            box-shadow:0 10px 25px rgba(0,0,0,.15);

        }

        .header{

            background:#ff9800;

            color:white;

            padding:20px;

            text-align:center;

        }

        .header h2{

            margin:0;

            font-size:24px;

        }

        .header h3{

            margin-top:8px;

            font-weight:500;

        }

        .photo{

            text-align:center;

            margin-top:20px;

        }

        .photo img{

            width:130px;

            height:130px;

            border-radius:50%;

            object-fit:cover;

            border:4px solid #ff9800;

        }

        .content{

            padding:20px;

        }

        .content p{

            margin:10px 0;

            font-size:16px;

        }

        .approved{

            margin-top:20px;

            color:green;

            font-weight:bold;

            text-align:center;

            font-size:18px;

        }

        .footer{

            margin-top:25px;

            border-top:1px solid #ddd;

            padding-top:15px;

            text-align:right;

        }

        </style>

        </head>

        <body>

        <div class="card">

            <div class="header">

                <h2>

                    बाल मित्र गणेश उत्सव मंडळ

                </h2>

                <h3>

                    VOLUNTEER ID CARD

                </h3>

            </div>

            <div class="photo">

                ${
                    photo
                    ?
                    `<img src="${photo}" />`
                    :
                    ""
                }

            </div>

            <div class="content">

                <p><b>Volunteer ID :</b> ${item.volunteerId}</p>

                <p><b>Name :</b> ${item.fullName}</p>

                <p><b>Mobile :</b> ${item.mobile}</p>

                <p><b>Age :</b> ${item.age}</p>

                <p><b>Gender :</b> ${item.gender}</p>

                <p><b>Address :</b> ${item.address}</p>

                <p><b>Approved By :</b> ${item.approvedBy || "Admin"}</p>

                <div class="approved">

                    ✔ APPROVED VOLUNTEER

                </div>

                <div class="footer">

                    Authorised Signatory

                </div>

            </div>

        </div>

        <script>

            window.onload=function(){

                window.print();

                window.close();

            }

        </script>

        </body>

        </html>

        `);

        win.document.close();

    };
    return(

    <div className="volunteers-page">

        <div className="page-header">

            <FaUsers className="header-icon"/>

            <div>

                <h1>

                    नोंदणीकृत स्वयंसेवक

                </h1>

                <p>

                    बाल मित्र गणेश उत्सव मंडळ

                </p>

            </div>

        </div>

        {/* SEARCH */}

        <div className="search-box">

            <FaSearch/>

            <input

                type="text"

                placeholder="Volunteer ID / नाव / मोबाईल नंबर शोधा..."

                value={search}

                onChange={(e)=>

                    setSearch(e.target.value)

                }

            />

        </div>

        {

            loading

            ?

            (

                <div className="loading">

                    स्वयंसेवक माहिती लोड होत आहे...

                </div>

            )

            :

            filtered.length===0

            ?

            (

                <div className="no-data">

                    कोणताही Approved स्वयंसेवक उपलब्ध नाही.

                </div>

            )

            :

            (

                <div className="volunteer-grid">

                    {

                        filtered.map((item)=>(

                            <div

                                className="volunteer-card"

                                key={item.volunteerId}

                            >

                                <div className="photo-box">

                                    {

                                        item.photo

                                        ?

                                        (

                                            <img

                                                src={`${API}/uploads/volunteers/${item.photo}`}

                                                alt={item.fullName}

                                                className="volunteer-photo"

                                            />

                                        )

                                        :

                                        (

                                            <div className="photo-placeholder">

                                                👤

                                            </div>

                                        )

                                    }

                                </div>

                                <h2>

                                    {item.fullName}

                                </h2>

                                <div className="info">

                                    <p>

                                        <FaIdCard/>

                                        <strong>

                                            ID :

                                        </strong>

                                        {item.volunteerId}

                                    </p>

                                    <p>

                                        <FaPhone/>

                                        <strong>

                                            मोबाईल :

                                        </strong>

                                        {item.mobile}

                                    </p>

                                    <p>

                                        <FaBirthdayCake/>

                                        <strong>

                                            वय :

                                        </strong>

                                        {item.age}

                                    </p>

                                    <p>

                                        <FaVenusMars/>

                                        <strong>

                                            लिंग :

                                        </strong>

                                        {

                                            item.gender==="Male"

                                            ?

                                            "पुरुष"

                                            :

                                            item.gender==="Female"

                                            ?

                                            "महिला"

                                            :

                                            "इतर"

                                        }

                                    </p>

                                    <p>

                                        <FaMapMarkerAlt/>

                                        <strong>

                                            पत्ता :

                                        </strong>

                                        {item.address}

                                    </p>

                                    <p>

                                        <strong>

                                            Approved By :

                                        </strong>

                                        {item.approvedBy || "Admin"}

                                    </p>
                                                                        <div className="volunteer-actions">

                                        <button

                                            className="print-btn"

                                            onClick={()=>

                                                printVolunteerId(item)

                                            }

                                        >

                                            <FaPrint />

                                            {" "}

                                            Print ID

                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))

                    }

                </div>

            )

        }

    </div>

);

}

export default Volunteers;