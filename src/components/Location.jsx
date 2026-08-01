import "../styles/location.css";

function Location() {
  return (
    <section className="location-section">

      <div className="location-container">

        <div className="location-header">

          <h2>
            📍 मंडळाचे स्थान
          </h2>

          <p>
            गणपती बाप्पांच्या दर्शनासाठी व उत्सवात सहभागी होण्यासाठी आपले हार्दिक स्वागत.
          </p>

        </div>

        <div className="location-content">

          <div className="location-left">

            <h3>
              🙏 बाल मित्र गणेश उत्सव मंडळ
            </h3>

            <div className="location-info">

              <div className="location-item">

                <span className="location-icon">
                  📍
                </span>

                <div>

                  <h4>पत्ता</h4>

                  <p>
                    श्री हनुमान मंदिर हॉल,
                    <br />
                    खिरणीबागपुरा,
                    <br />
                    अचलपूर - 444805
                  </p>

                </div>

              </div>

              <div className="location-item">

                <span className="location-icon">
                  📞
                </span>

                <div>

                  <h4>संपर्क</h4>

                  <p>
                    +91 9673279153
                  </p>

                </div>

              </div>

              <div className="location-item">

                <span className="location-icon">
                  📧
                </span>

                <div>

                  <h4>ई-मेल</h4>

                  <p>
                    baalmitraganesh@gmail.com
                  </p>

                </div>

              </div>

              <div className="location-item">

                <span className="location-icon">
                  🕘
                </span>

                <div>

                  <h4>दर्शन वेळ</h4>

                  <p>
                    सकाळी ७:०० ते रात्री १०:००
                  </p>

                </div>

              </div>

            </div>

            <a
              href="https://maps.google.com/?q=21.2648095,77.5062412"
              target="_blank"
              rel="noopener noreferrer"
              className="location-btn"
            >
              📍 Google Maps मध्ये उघडा
            </a>

          </div>

          <div className="location-right">

            <iframe
              title="Bal Mitra Ganesh Utsav Mandal"
              src="https://maps.google.com/maps?q=21.2648095,77.5062412&z=16&output=embed"
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