import "../styles/timeline.css";

function Timeline() {

  const events = [

    {
      id: 1,
      icon: "🚩",
      title: "गणेश मूर्ती आगमन व मिरवणूक",
      eventDate: "2026-09-14",
      time: "सायंकाळी ५:०० ते रात्री ९:००",
      description:
        "श्री गणेश मूर्तीचे आगमन व  मिरवणूक आयोजित करण्यात आली आहे. सर्व गणेश भक्तांनी मोठ्या संख्येने उपस्थित राहावे."
    },

    {
      id: 2,
      icon: "🎵",
      title: "भजन कार्यक्रम",
      eventDate: "2026-09-20",
      time: "सायंकाळी",
      description:
        "भक्तिमय भजन व कीर्तन कार्यक्रमाचे आयोजन करण्यात आले आहे. सर्वांनी सहभागी होऊन कार्यक्रमाची शोभा वाढवावी."
    },

    {
      id: 3,
      icon: "🍛",
      title: "महाप्रसाद",
      eventDate: "2026-09-24",
      time: "सायंकाळी ६:०० ते रात्री ११:००",
      description:
        "महाप्रसादाचे आयोजन करण्यात आले आहे. सर्व भाविकांनी महाप्रसादाचा लाभ घ्यावा."
    },

    {
      id: 4,
      icon: "🙏",
      title: "गणेश विसर्जन व मिरवणूक",
      eventDate: "2026-09-26",
      time: "संध्या ५ ते १० वाजेपर्यंत",
      description:
        "श्री गणेश विसर्जनाची भव्य मिरवणूक आयोजित करण्यात आली आहे. सर्वांनी भक्तिभावाने सहभागी व्हावे."
    }

  ];

  return (

    <section className="timeline-section container">

      <h2 className="timeline-title">

        📅 उत्सव वेळापत्रक

      </h2>

      <p className="timeline-subtitle">

        श्री बाल मित्र गणेश उत्सव मंडळ

      </p>

      <div className="timeline">

        {

          events.map((event) => (

            <div

              className="timeline-item"

              key={event.id}

            >

              <div className="timeline-icon">

                {event.icon}

              </div>

              <div className="timeline-content">

                <div className="timeline-date">

                  <span className="date">

                    📅 {

                      new Date(event.eventDate)

                        .toLocaleDateString("en-GB")

                    }

                  </span>

                  <span className="time">

                    ⏰ {event.time}

                  </span>

                </div>

                <h3>

                  {event.title}

                </h3>

                <p>

                  {event.description}

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