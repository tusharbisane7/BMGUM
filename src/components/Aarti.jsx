import { useState, useEffect } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import "../styles/aarti.css";

const API = "https://bmgum.onrender.com";

function Aarti() {

    /*=========================================
                STATES
    =========================================*/

    const [aartiList, setAartiList] = useState([]);

    const [current, setCurrent] = useState(0);

    const [loading, setLoading] = useState(true);

    /*=========================================
                LOAD AARTI
    =========================================*/

    const loadAarti = async () => {

        try {

            const res = await axios.get(
                `${API}/api/aarti`
            );

            const data = Array.isArray(res.data)
                ? res.data
                : [];

            setAartiList(data);

            if (current >= data.length) {
                setCurrent(0);
            }

        }

        catch (err) {

            console.error(err);

            setAartiList([]);

        }

        finally {

            setLoading(false);

        }

    };

    /*=========================================
                INITIAL LOAD
    =========================================*/

    useEffect(() => {

        loadAarti();

        const refresh = setInterval(() => {

            loadAarti();

        }, 10000);

        return () => clearInterval(refresh);

    }, []);

    /*=========================================
                AUTO SLIDER
    =========================================*/

    useEffect(() => {

        if (aartiList.length <= 1) return;

        const timer = setInterval(() => {

            setCurrent(prev =>

                (prev + 1) % aartiList.length

            );

        }, 6000);

        return () => clearInterval(timer);

    }, [aartiList]);

    /*=========================================
            LOADING
    =========================================*/

    if (loading) {

        return (

            <section className="aarti-section container">

                <div className="aarti-loading">

                    <div className="loader-ring"></div>

                    <h3>आरती लोड होत आहे...</h3>

                </div>

            </section>

        );

    }

    /*=========================================
            EMPTY
    =========================================*/

    if (aartiList.length === 0) {

        return (

            <section className="aarti-section container">

                <div className="aarti-empty">

                    <div className="empty-icon">

                        🪔

                    </div>

                    <h2>

                        आरती उपलब्ध नाही

                    </h2>

                    <p>

                        कृपया नंतर पुन्हा प्रयत्न करा.

                    </p>

                </div>

            </section>

        );

    }

    /*=========================================
            CURRENT ITEM
    =========================================*/

    const item = aartiList[current];

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

    <AnimatePresence mode="wait">

        <motion.div

            key={item.id || current}

            className="premium-aarti-card"

            initial={{
                opacity:0,
                y:60,
                scale:.92
            }}

            animate={{
                opacity:1,
                y:0,
                scale:1
            }}

            exit={{
                opacity:0,
                y:-60,
                scale:.92
            }}

            transition={{
                duration:.65,
                ease:"easeInOut"
            }}

        >

            {/* Background Effects */}

            <div className="shine"></div>

            <div className="blur-circle circle1"></div>

            <div className="blur-circle circle2"></div>

            <div className="particle p1"></div>

            <div className="particle p2"></div>

            <div className="particle p3"></div>

            {/* Header */}

            <div className="aarti-top">

                <div className="aarti-icon-box">

                    🪔

                </div>

                <div>

                    <h2>

                        {item.name || "गणेश आरती"}

                    </h2>

                    <span>

                        Ganesh Utsav Aarti

                    </span>

                </div>

                <div className="live-badge">

                    LIVE

                </div>

            </div>

            {/* Content */}

            <div className="aarti-grid">

                <motion.div

                    whileHover={{scale:1.05}}

                    className="info-box"

                >

                    <div className="icon">

                        📅

                    </div>

                    <span>

                        Date

                    </span>

                    <h4>

                        {formattedDate}

                    </h4>

                </motion.div>

                <motion.div

                    whileHover={{scale:1.05}}

                    className="info-box"

                >

                    <div className="icon">

                        👤

                    </div>

                    <span>

                        Performed By

                    </span>

                    <h4>

                        {performedBy}

                    </h4>

                </motion.div>

                <motion.div

                    whileHover={{scale:1.05}}

                    className="info-box"

                >

                    <div className="icon">

                        🏷️

                    </div>

                    <span>

                        Aarti Type

                    </span>

                    <h4>

                        {item.type || "-"}

                    </h4>

                </motion.div>

            </div>

          

            {/* Progress */}

            <div className="progress-area">

                <div className="progress-bar">

                    <motion.div

                        className="progress-fill"

                        initial={{width:0}}

                        animate={{width:"100%"}}

                        transition={{

                            duration:5,

                            repeat:Infinity

                        }}

                    />

                </div>

            </div>

            {/* Slider */}

            {aartiList.length>1 && (

            <div className="slider-dots">

                {aartiList.map((_,index)=>(

                    <button

                        key={index}

                        onClick={()=>setCurrent(index)}

                        className={

                            current===index

                            ? "dot active"

                            : "dot"

                        }

                    />

                ))}

            </div>

            )}

        </motion.div>

    </AnimatePresence>

</section>

);
}

export default Aarti;