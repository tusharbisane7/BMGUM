import { useState, useEffect } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import "../styles/aarti.css";

const API = "https://bmgum.onrender.com";

function Aarti() {

    const [aartiList, setAartiList] = useState([]);

    const [current, setCurrent] = useState(0);

    /*=========================================
                LOAD AARTI
    =========================================*/

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

            console.error(err);

            setAartiList([]);

        }

    };

    /*=========================================
                FETCH DATA
    =========================================*/

    useEffect(() => {

        loadAarti();

        const refresh = setInterval(() => {

            loadAarti();

        }, 5000);

        return () => clearInterval(refresh);

    }, []);

    /*=========================================
                AUTO SLIDER
    =========================================*/

    useEffect(() => {

        if (aartiList.length === 0) return;

        const slider = setInterval(() => {

            setCurrent((prev) =>

                (prev + 1) % aartiList.length

            );

        }, 6000);

        return () => clearInterval(slider);

    }, [aartiList]);

    /*=========================================
                EMPTY
    =========================================*/

    if (aartiList.length === 0) {

        return (

            <section className="aarti-section container">

                <h2 className="title">

                    🪔 आरती वेळापत्रक

                </h2>

                <div className="aarti-wrapper">

                    <div className="aarti-card">

                        <div className="aarti-header">

                            <div className="aarti-icon">

                                🪔

                            </div>

                            <h3>

                                कोणतीही आरती उपलब्ध नाही.

                            </h3>

                        </div>

                    </div>

                </div>

            </section>

        );

    }

    /*=========================================
            CURRENT AARTI
    =========================================*/

    const item = aartiList[current] || {};

    const performedBy =

        item.performedBy ??

        item.performedby ??

        "-";

    const formattedDate =

        item.date

            ? new Date(item.date).toLocaleDateString(

                "en-GB"

            )

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
                    opacity:0,
                    x:120,
                    scale:.9
                }}

                animate={{
                    opacity:1,
                    x:0,
                    scale:1
                }}

                exit={{
                    opacity:0,
                    x:-120,
                    scale:.9
                }}

                transition={{
                    duration:.7,
                    ease:"easeInOut"
                }}

            >

                <div className="shine"></div>

                <div className="particle one"></div>

                <div className="particle two"></div>

                <div className="particle three"></div>

                <div className="today-badge">

                    🙏 Today's Aarti

                </div>

                <div className="aarti-header">

                    <div className="aarti-icon">

                        🪔

                    </div>

                    <h3>

                        {item.name || "आरती"}

                    </h3>

                </div>

                <div className="aarti-details">

                    <div className="info-row">

                        <div className="info-left">

                            <div className="info-icon">

                                📅

                            </div>

                            <div>

                                <div className="info-label">

                                    Date

                                </div>

                                <div className="info-value">

                                    {formattedDate}

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="info-row">

                        <div className="info-left">

                            <div className="info-icon">

                                📆

                            </div>

                            <div>

                                <div className="info-label">

                                    Day

                                </div>

                                <div className="info-value">

                                    {item.day || "-"}

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="info-row">

                        <div className="info-left">

                            <div className="info-icon">

                                ⏰

                            </div>

                            <div>

                                <div className="info-label">

                                    Time

                                </div>

                                <div className="info-value">

                                    {item.time || "-"}

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="info-row">

                        <div className="info-left">

                            <div className="info-icon">

                                👤

                            </div>

                            <div>

                                <div className="info-label">

                                    Performed By

                                </div>

                                <div className="info-value">

                                    {performedBy}

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="info-row">

                        <div className="info-left">

                            <div className="info-icon">

                                🏷️

                            </div>

                            <div>

                                <div className="info-label">

                                    Type

                                </div>

                                <div className="info-value">

                                    {item.type || "-"}

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="info-row">

                        <div className="info-left">

                            <div className="info-icon">

                                📌

                            </div>

                            <div>

                                <div className="info-label">

                                    Status

                                </div>

                                <div className="info-value">

                                    {item.status || "-"}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="aarti-status">

                    <div className="status-top">

                        <div className="status-title">

                            <div className="live-dot"></div>

                            Ganesh Utsav Aarti

                        </div>

                        <div className="status-percent">

                            Live

                        </div>

                    </div>

                    <div className="progress-bar">

                        <div className="progress-fill"></div>

                    </div>

                </div>

                

            </motion.div>

        </AnimatePresence>

    </div>

</section>

);
}

export default Aarti;