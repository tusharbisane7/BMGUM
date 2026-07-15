import { useState, useEffect } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import "../styles/aarti.css";

const API = "https://bmgum.onrender.com";

function Aarti() {

  const [aartiList, setAartiList] = useState([]);

  const [current, setCurrent] = useState(0);

  // ================= LOAD AARTI =================

  const loadAarti = async () => {

    try {

      const res = await axios.get(

        `${API}/api/aarti`

      );

      setAartiList(

        Array.isArray(res.data)

          ? res.data

          : []

      );

    }

    catch (err) {

      console.log(err);

      setAartiList([]);

    }

  };

  // ================= FETCH =================

  useEffect(() => {

    loadAarti();

    const refresh = setInterval(() => {

      loadAarti();

    }, 5000);

    return () => clearInterval(refresh);

  }, []);

  // ================= AUTO SLIDER =================

  useEffect(() => {

    if (aartiList.length === 0) return;

    const slider = setInterval(() => {

      setCurrent((prev) =>

        (prev + 1) % aartiList.length

      );

    }, 6000);

    return () => clearInterval(slider);

  }, [aartiList]);

  // ================= EMPTY =================

  if (aartiList.length === 0) {

    return (

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

  // ================= CURRENT ITEM =================

  const item = aartiList[current] || {};

  // PostgreSQL compatibility

  const performedBy =

    item.performedBy ??

    item.performedby ??

    "-";

  const formattedDate = item.date

    ? new Date(item.date).toLocaleDateString("en-GB")

    : "-";
    return (

  <section className="aarti-section container">

    <h2 className="title">

      🪔 आरती वेळापत्रक

    </h2>

    <div className="aarti-wrapper">

      <AnimatePresence mode="wait">

        <motion.div

          key={item.id || current}

          className="aarti-card"

          initial={{
            opacity: 0,
            x: 150,
            scale: 0.9
          }}

          animate={{
            opacity: 1,
            x: 0,
            scale: 1
          }}

          exit={{
            opacity: 0,
            x: -150,
            scale: 0.9
          }}

          transition={{
            duration: 0.8
          }}

        >

          <div className="aarti-icon">

            🪔

          </div>

          <h3>

            {item.name || "-"}

          </h3>

          <p>

            <strong>📅 तारीख :</strong>{" "}

            {formattedDate}

          </p>

          <p>

            <strong>📆 वार :</strong>{" "}

            {item.day || "-"}

          </p>

          <p>

            <strong>⏰ वेळ :</strong>{" "}

            {item.time || "-"}

          </p>

          <p>

            <strong>👤 आरती :</strong>{" "}

            {performedBy}

          </p>

          <p>

            <strong>🏷 प्रकार :</strong>{" "}

            {item.type || "-"}

          </p>

          <p>

            <strong>📌 स्थिती :</strong>{" "}

            {item.status || "-"}

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