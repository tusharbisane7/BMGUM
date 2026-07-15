import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/timeline.css";

function Timeline() {

  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(true);

  const loadTimeline = async () => {

    try {

      const res = await axios.get(

        "https://bmgum.onrender.com/api/timeline"

      );

      setEvents(res.data);

    }

    catch(err){

      console.log(err);

    }

    finally{

      setLoading(false);

    }

  };

  useEffect(() => {

    loadTimeline();

    const interval = setInterval(() => {

      loadTimeline();

    },3000);

    return ()=>clearInterval(interval);

  },[]);

  if(loading){

    return(

      <section className="timeline-section container">

        <h2 className="title">

          📅 उत्सव वेळापत्रक

        </h2>

        <p style={{textAlign:"center"}}>

          माहिती लोड होत आहे...

        </p>

      </section>

    );

  }

  return (

    <section className="timeline-section container">

      <h2 className="title">

        📅 उत्सव वेळापत्रक

      </h2>

      <div className="timeline">

        {

          events.length===0 ?

          (

            <div

              style={{

                textAlign:"center",

                width:"100%"

              }}

            >

              कोणतेही कार्यक्रम उपलब्ध नाहीत.

            </div>

          )

          :

          events.map((event) => (

  <div
    className="timeline-item"
    key={event.id}
  >

    <div className="timeline-icon">
      {event.icon || "📅"}
    </div>

    <div className="timeline-content">

      <span>

        {
          event.eventDate
            ? new Date(event.eventDate).toLocaleDateString("en-GB")
            : event.eventdate
            ? new Date(event.eventdate).toLocaleDateString("en-GB")
            : "-"
        }

      </span>

      <h3>

        {event.title || ""}

      </h3>

      <p>

        {event.description || ""}

      </p>

    </div>

  </div>



          ))

        }

      </div>

    </section>

  );

}

export default Timeline;