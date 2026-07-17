import { useNavigate } from "react-router-dom";
import "../styles/hero.css";

function Hero() {

  const navigate = useNavigate();

  return (

    <section className="hero">

      <div className="container hero-content">

        <span className="tag">

          🙏 श्री गणेशाय नमः 🙏

        </span>

        <p>

          गणपती बाप्पा मोरया!

          <br />

          सर्व भाविकांचे हार्दिक स्वागत.

          <br />

          श्री गणेशाच्या कृपेने सर्वांच्या जीवनात

          सुख, शांती आणि समृद्धी नांदो.

        </p>

        <div className="hero-buttons">

          <button
            className="btn"
            onClick={() => navigate("/donation")}
          >
            💰 देणगी पहा
          </button>

          <button
            className="btn outline"
            onClick={() => navigate("/expense")}
          >
            💸 खर्च पहा
          </button>

        </div>

      </div>

    </section>

  );

}

export default Hero;