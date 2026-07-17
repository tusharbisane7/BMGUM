import { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import {

    FaVideo,

    FaTimes,

    FaCircle

} from "react-icons/fa";

import "../styles/livemeetingpopup.css";

const API="https://bmgum.onrender.com";

function LiveMeetingPopup(){

    const navigate=useNavigate();

    const [meeting,setMeeting]=useState(null);

    const [showPopup,setShowPopup]=useState(false);

    const [showFloating,setShowFloating]=useState(false);

    const loadMeeting=async()=>{

        try{

            const res=await axios.get(

                `${API}/api/meetings/live`

            );

            if(

                res.data.live

            ){

                setMeeting(

                    res.data.meeting

                );

                const hidden=

                    sessionStorage.getItem(

                        "meeting_popup_hidden"

                    );

                if(

                    !hidden

                ){

                    setShowPopup(true);

                }

                else{

                    setShowFloating(true);

                }

            }

            else{

                setMeeting(null);

                setShowPopup(false);

                setShowFloating(false);

                sessionStorage.removeItem(

                    "meeting_popup_hidden"

                );

            }

        }

        catch(err){

            console.log(err);

        }

    };

    useEffect(()=>{

        loadMeeting();

        const interval=setInterval(

            loadMeeting,

            20000

        );

        return()=>clearInterval(

            interval

        );

    },[]);

    const closePopup=()=>{

        sessionStorage.setItem(

            "meeting_popup_hidden",

            "true"

        );

        setShowPopup(false);

        setShowFloating(true);

    };

    const joinMeeting=()=>{

        if(!meeting)return;

        navigate(

            `/meeting/${meeting.roomName}`

        );

    };
        if(!meeting){

        return null;

    }

    return(

        <>

            {

                showPopup &&

                (

                    <div className="meeting-overlay">

                        <div className="meeting-popup">

                            <button

                                className="close-btn"

                                onClick={closePopup}

                            >

                                <FaTimes/>

                            </button>

                            <div className="live-icon">

                                <FaCircle/>

                                <span>

                                    LIVE

                                </span>

                            </div>

                            <FaVideo className="video-icon"/>

                            <h2>

                                लाईव्ह मीटिंग सुरू आहे

                            </h2>

                            <h3>

                                {meeting.title}

                            </h3>

                            <p>

                                गणेश उत्सव मंडळाची ऑनलाइन बैठक सुरू आहे.

                            </p>

                            <div className="popup-buttons">

                                <button

                                    className="join-btn"

                                    onClick={joinMeeting}

                                >

                                    🎥 मीटिंगमध्ये सहभागी व्हा

                                </button>

                                <button

                                    className="later-btn"

                                    onClick={closePopup}

                                >

                                    नंतर

                                </button>

                            </div>

                        </div>

                    </div>

                )

            }

            {

                showFloating &&

                (

                    <button

                        className="floating-meeting-btn"

                        onClick={joinMeeting}

                    >

                        <FaCircle/>

                        <FaVideo/>

                        लाईव्ह मीटिंग

                    </button>

                )

            }

        </>

    );

}

export default LiveMeetingPopup;