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

          <h3>
            🙏 बाल मित्र गणेश उत्सव मंडळ
          </h3>

          <div className="info-box">

            <div className="info-item">
              <div className="icon">📍</div>
              <div>
                <strong>पत्ता</strong>
                <span>
                  श्री हनुमान मंदिर हॉल,<br />
                  खिरणीबागपुरा,<br />
                  अचलपूर - 444805
                </span>
              </div>
            </div>

            <div className="info-item">
              <div className="icon">📞</div>
              <div>
                <strong>संपर्क</strong>
                <span>+91 9673279153</span>
              </div>
            </div>

            <div className="info-item">
              <div className="icon">📧</div>
              <div>
                <strong>ई-मेल</strong>
                <span>baalmitraganesh@gmail.com</span>
              </div>
            </div>

            <div className="info-item">
              <div className="icon">🕘</div>
              <div>
                <strong>दर्शन वेळ</strong>
                <span>सकाळी ७:०० ते रात्री १०:००</span>
              </div>
            </div>

          </div>

          <a
            href="https://maps.google.com/?q=21.2648095,77.5062412"
            target="_blank"
            rel="noopener noreferrer"
            className="map-btn"
          >
            📍 Google Maps मध्ये उघडा
          </a>

        </div>

      </div>

    </section>
  );
}

export default Location;