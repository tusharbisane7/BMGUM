import { useState, useEffect } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import "../styles/aarti.css";

function Aarti() {

  const [aartiList, setAartiList] = useState([]);

  const [current, setCurrent] = useState(0);

  const loadAarti = async () => {

    try {

      const res = await axios.get(

        "http://localhost:5000/api/aarti"

      );

      setAartiList(res.data);

    }

    catch(err){

      console.log(err);

    }

  };

  useEffect(() => {

    loadAarti();

    const refresh = setInterval(() => {

      loadAarti();

    }, 5000);

    return () => clearInterval(refresh);

  }, []);

  useEffect(() => {

    if(aartiList.length===0) return;

    const slider = setInterval(() => {

      setCurrent((prev)=>

        (prev+1)%aartiList.length

      );

    },6000);

    return ()=>clearInterval(slider);

  },[aartiList]);

  if(aartiList.length===0){

    return(

      <section className="aarti-section container">

        <h2 className="title">

          🪔 आरती वेळापत्रक

        </h2>

        <div className="aarti-wrapper">

          <div className="aarti-card">

            <h3>

              कोणतीही आरती उपलब्ध नाही.

            </h3>

          </div>

        </div>

      </section>

    );

  }

  const item = aartiList[current];

  return (

    <section className="aarti-section container">

      <h2 className="title">

        🪔 आरती वेळापत्रक

      </h2>

      <div className="aarti-wrapper">

        <AnimatePresence mode="wait">

          <motion.div

            key={item.id}

            className="aarti-card"

            initial={{

              opacity:0,

              x:150,

              scale:0.9

            }}

            animate={{

              opacity:1,

              x:0,

              scale:1

            }}

            exit={{

              opacity:0,

              x:-150,

              scale:0.9

            }}

            transition={{

              duration:0.8

            }}

          >

            <div className="aarti-icon">

              🪔

            </div>

            <h3>

              {item.name}

            </h3>

            <p>

              <strong>📅 तारीख :</strong>

              {" "}

              {item.date}

            </p>

            <p>

              <strong>📆 वार :</strong>

              {" "}

              {item.day}

            </p>

            <p>

              <strong>⏰ वेळ :</strong>

              {" "}

              {item.time}

            </p>

            <p>

              <strong>👤 आरती :</strong>

              {" "}

              {item.performedBy}

            </p>

            <p>

              <strong>🏷 प्रकार :</strong>

              {" "}

              {item.type}

            </p>

            <p>

              <strong>📌 स्थिती :</strong>

              {" "}

              {item.status}

            </p>

            <div className="progress-bar">

              <div className="progress-fill"></div>

            </div>

          </motion.div>

        </AnimatePresence>

      </div>

    </section>

  );

}

export default Aarti;