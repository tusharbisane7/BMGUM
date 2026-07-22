import "../styles/pageLoader.css";

function PageLoader({ logo }) {
  return (
    <div className="page-loader">

      <div className="loader-card">

        <img
          src={logo}
          alt="Logo"
          className="loader-logo"
        />

        <h1>🙏 गणपती बाप्पा मोरया 🙏</h1>

        <p>पृष्ठ लोड होत आहे...</p>

        <div className="loader-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>

    </div>
  );
}

export default PageLoader;