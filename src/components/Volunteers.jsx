import { useEffect, useState } from "react";

import axios from "axios";

import {

    FaUsers,

    FaSearch,

    FaPhone,

    FaIdCard,

    FaBirthdayCake,

    FaMapMarkerAlt,

    FaVenusMars

} from "react-icons/fa";

import "../styles/volunteers.css";

const API="https://bmgum.onrender.com";

function Volunteers(){

    const[volunteers,setVolunteers]=useState([]);

    const[filtered,setFiltered]=useState([]);

    const[loading,setLoading]=useState(true);

    const[search,setSearch]=useState("");

    const loadVolunteers=async()=>{

        try{

            const res=await axios.get(

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

    useEffect(()=>{

        const list=volunteers.filter((item)=>

            item.fullName

            .toLowerCase()

            .includes(

                search.toLowerCase()

            )

            ||

            item.mobile

            .includes(search)

        );

        setFiltered(list);

    },[search,volunteers]);
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

            {/* ================= SEARCH ================= */}

            <div className="search-box">

                <FaSearch/>

                <input

                    type="text"

                    placeholder="नाव किंवा मोबाईल नंबर शोधा..."

                    value={search}

                    onChange={(e)=>

                        setSearch(

                            e.target.value

                        )

                    }

                />

            </div>

            {/* ================= LOADING ================= */}

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

                        कोणताही स्वयंसेवक उपलब्ध नाही.

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

                                            <FaIdCard />

                                            <strong>

                                                ID :

                                            </strong>

                                            {item.volunteerId}

                                        </p>

                                        <p>

                                            <FaPhone />

                                            <strong>

                                                मोबाईल :

                                            </strong>

                                            {item.mobile}

                                        </p>

                                        <p>

                                            <FaBirthdayCake />

                                            <strong>

                                                वय :

                                            </strong>

                                            {item.age}

                                        </p>

                                        <p>

                                            <FaVenusMars />

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

                                            <FaMapMarkerAlt />

                                            <strong>

                                                पत्ता :

                                            </strong>

                                            {item.address}

                                        </p>

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