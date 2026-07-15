import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../styles/noticeboard.css";

function NoticeBoard({ notices = [] }) {

  const [currentNotice, setCurrentNotice] = useState(0);

  useEffect(() => {

    if (notices.length === 0) return;

    const interval = setInterval(() => {

      setCurrentNotice((prev) =>

        (prev + 1) % notices.length

      );

    }, 5000);

    return () => clearInterval(interval);

  }, [notices]);

  if (notices.length === 0) {

    return (

      <section className="notice-section container">

        <h2 className="title">
          📢 सूचना फलक
        </h2>

        <div className="notice-wrapper">

          <div className="notice-card">

            <h3>सध्या कोणतीही सूचना उपलब्ध नाही.</h3>

          </div>

        </div>

      </section>

    );

  }

  const notice = notices[currentNotice];

  return (

    <section className="notice-section container">

      <h2 className="title">
        📢 सूचना फलक
      </h2>

      <div className="notice-wrapper">

        <AnimatePresence mode="wait">

          <motion.div

            key={notice.id}

            className="notice-card"

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
              duration:0.7
            }}

          >

            <span className="notice-date">

              {

                notice.startdate

                ?

                new Date(notice.startdate)

                .toLocaleDateString("en-GB")

                :

                "-"

              }

            </span>

            <h3>

              {notice.title || "-"}

            </h3>

            <p>

              {notice.description || "-"}

            </p>

            {

              notice.type &&

              <span className="notice-type">

                {notice.type}

              </span>

            }

            <div className="progress-bar">

              <div className="progress-fill"></div>

            </div>

          </motion.div>

        </AnimatePresence>

      </div>

    </section>

  );

}

export default NoticeBoard;