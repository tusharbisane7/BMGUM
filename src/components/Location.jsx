import "../styles/location.css";

function Location() {
  return (
    <section className="location-section">

      <div className="container">

        <h2 className="title">
          📍 मंडळाचे स्थान
        </h2>

        <p className="subtitle">
          गणपती बाप्पांच्या दर्शनासाठी व उत्सवात सहभागी होण्यासाठी आपले हार्दिक स्वागत.
        </p>

        <div className="location-card">

          <div className="location-details">

            <h3>
              🙏 बाल मित्र गणेश उत्सव मंडळ
            </h3>

            <div className="info-box">

              <div className="info-item">
                📍
                <span>
                  श्री हनुमान मंदिर हॉल,<br />
                  खिरणीबागपुरा, अचलपूर - 444805
                </span>
              </div>

              <div className="info-item">
                📞
                <span>
                  +91 9671279153
                </span>
              </div>

              <div className="info-item">
                📧
                <span>
                  baalmitraganesh@gmail.com
                </span>
              </div>

              <div className="info-item">
                🕘
                <span>
                  सकाळी ७:०० ते रात्री १०:००
                </span>
              </div>

            </div>

            <a
              href="https://maps.google.com/?q=21.2648095,77.5062412"
              target="_blank"
              rel="noreferrer"
              className="map-btn"
            >
              📍 Google Maps मध्ये उघडा
            </a>

          </div>

          <div className="map-box">

            <iframe
              title="Baal Mitra Ganesh Utsav Mandal"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d232.38551102432854!2d77.50624121011455!3d21.264809530991105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1783973757085!5m2!1sen!2sin"
              loading="lazy"
              allowFullScreen
            ></iframe>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Location;